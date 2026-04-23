import 'dotenv/config';
import { mkdirSync } from 'node:fs';
import { TelegramClient } from '@mtcute/node';

const STORAGE_PATH = 'tmp/telegram-test-mtcute.session';

const HELP_TEXT = `
Usage:
  NODE_ENV=test node scripts/telegram-mtcute-connectivity.js

Required env:
  TELEGRAM_TEST_API_ID
  TELEGRAM_TEST_API_HASH
  TELEGRAM_TEST_PHONE

Test phone note:
  Telegram test phone numbers follow the 99966XYYYY pattern, where X is the
  DC number. The confirmation code is the DC number repeated five or six times.

Notes:
  - This is a connectivity probe only, not an e2e command test.
  - It verifies that mtcute can connect and authorize an MTProto user session.
  - It only runs with NODE_ENV=test and then uses Telegram test servers.
  - Session storage is fixed to ${STORAGE_PATH}.
  - On the first run it asks for the test login code unless the session already exists.
`.trim();

function parseInteger(value) {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    throw new Error(`Expected integer value, got: ${value}`);
  }

  return parsed;
}

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getConfig() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error(
      'This probe only runs with NODE_ENV=test to avoid connecting to production Telegram servers.',
    );
  }

  return {
    apiId: parseInteger(requiredEnv('TELEGRAM_TEST_API_ID')),
    apiHash: requiredEnv('TELEGRAM_TEST_API_HASH'),
    phone: requiredEnv('TELEGRAM_TEST_PHONE'),
  };
}

function getStartOptions(client, phone) {
  return {
    phone: async () => phone,
    code: () => client.input('Code > '),
  };
}

async function main() {
  if (process.argv.includes('--help')) {
    console.log(HELP_TEXT);
    return;
  }

  const config = getConfig();
  mkdirSync('tmp', { recursive: true });

  const client = new TelegramClient({
    apiId: config.apiId,
    apiHash: config.apiHash,
    storage: STORAGE_PATH,
    testMode: true,
  });

  try {
    console.log(
      `Starting mtcute connectivity probe (testMode=true, storage=${STORAGE_PATH})`,
    );

    const self = await client.start(getStartOptions(client, config.phone));

    console.log('Connected and authorized successfully.');
    console.log(`Self: id=${self.id} username=${self.username ?? '<none>'}`);
  } finally {
    await client.disconnect().catch(() => {});
    await client.destroy().catch(() => {});
  }
}

await main();
