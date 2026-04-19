#!/usr/bin/env node

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getIntrospectionQuery } from 'graphql';

const DEFAULT_SPORTS_API_URL = 'https://www.sports.ru';
const DEFAULT_SPORTS_API_PATH = '/gql/graphql/';
const DEFAULT_OUTPUT_PATH = 'schemas/sports.json';
const DEFAULT_TIMEOUT_MS = 30000;

const scriptPath = fileURLToPath(import.meta.url);
const projectRoot = path.resolve(path.dirname(scriptPath), '..');

function resolveEndpoint() {
  if (process.env.SPORTS_SCHEMA_URL) {
    return process.env.SPORTS_SCHEMA_URL;
  }

  const apiUrl = process.env.SPORTS_API_URL || DEFAULT_SPORTS_API_URL;
  const apiPath = process.env.SPORTS_API_PATH || DEFAULT_SPORTS_API_PATH;
  return new URL(apiPath, apiUrl).toString();
}

function resolveTimeoutMs() {
  const timeoutMs = Number.parseInt(
    process.env.SPORTS_SCHEMA_TIMEOUT_MS || '',
    10,
  );

  if (Number.isFinite(timeoutMs) && timeoutMs > 0) {
    return timeoutMs;
  }

  return DEFAULT_TIMEOUT_MS;
}

async function updateSportsSchema() {
  const endpoint = resolveEndpoint();
  const timeoutMs = resolveTimeoutMs();
  const outputPath = path.resolve(
    projectRoot,
    process.env.SPORTS_SCHEMA_OUTPUT || DEFAULT_OUTPUT_PATH,
  );
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    console.log(`Fetching Sports.ru GraphQL schema from ${endpoint}`);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Uranabot schema updater',
      },
      body: JSON.stringify({
        query: getIntrospectionQuery({
          descriptions: true,
          directiveIsRepeatable: true,
          inputValueDeprecation: true,
          schemaDescription: true,
          specifiedByUrl: true,
        }),
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Sports.ru schema request failed: ${response.status}`);
    }

    const payload = await response.json();

    if (payload.errors?.length) {
      throw new Error(
        `Sports.ru schema request returned errors: ${JSON.stringify(payload.errors)}`,
      );
    }

    if (!payload.data?.__schema) {
      throw new Error('Sports.ru schema response did not include data.__schema');
    }

    await mkdir(path.dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify({ data: payload.data })}\n`);

    console.log(`Updated ${path.relative(projectRoot, outputPath)}`);
    console.log('Next steps:');
    console.log('- inspect the schema diff');
    console.log('- run npm run codegen:fix');
    console.log('- run npm run test:unit');
    console.log('- run npm run test:integration or the manual Integration Tests workflow');
  } finally {
    clearTimeout(timeout);
  }
}

updateSportsSchema().catch((error) => {
  if (error instanceof Error && error.name === 'AbortError') {
    console.error('Sports.ru schema request timed out');
  } else {
    console.error(error);
  }

  process.exitCode = 1;
});
