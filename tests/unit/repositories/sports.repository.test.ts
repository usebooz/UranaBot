import { afterEach, beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { SportsRepository } from '../../../src/repositories/sports.repository.js';
import type { SportsGraphQLClient } from '../../../src/repositories/sports.repository.js';
import type { RequestDocument, Variables } from 'graphql-request';
import { logger } from '../../../src/utils/logger.js';

class TestSportsRepository extends SportsRepository {
  constructor(client: SportsGraphQLClient) {
    super(client);
  }

  async testQuery<T>(
    query: RequestDocument,
    variables?: Variables,
  ): Promise<T | null> {
    return this.executeQuery<T>(query, variables);
  }

  testGetOperationName(query: RequestDocument): string | undefined {
    return this.getOperationName(query);
  }
}

describe('SportsRepository', () => {
  let originalLogger: typeof logger;

  beforeEach(() => {
    originalLogger = { ...logger };
    Object.assign(logger, {
      debug: () => {},
      error: () => {},
    });
  });

  afterEach(() => {
    Object.assign(logger, originalLogger);
  });

  it('extracts operation name from GraphQL document nodes', () => {
    const repository = new TestSportsRepository({
      request: async <T>(): Promise<T> => ({}) as T,
    });
    const query = {
      definitions: [
        {
          kind: 'OperationDefinition',
          name: { value: 'TestQuery' },
        },
      ],
    } as RequestDocument;

    assert.strictEqual(repository.testGetOperationName(query), 'TestQuery');
  });

  it('returns undefined when operation name cannot be extracted', () => {
    const repository = new TestSportsRepository({
      request: async <T>(): Promise<T> => ({}) as T,
    });
    const queries = [
      'query TestQuery { test }',
      {},
      { definitions: [] },
      { definitions: [{ kind: 'FragmentDefinition' }] },
      { definitions: [{ kind: 'OperationDefinition', name: null }] },
    ] as RequestDocument[];

    for (const query of queries) {
      assert.strictEqual(repository.testGetOperationName(query), undefined);
    }
  });

  it('delegates successful GraphQL requests to the configured client', async () => {
    const query = 'query TestQuery { test }';
    const variables = { id: '123' };
    let requestedQuery: RequestDocument | undefined;
    let requestedVariables: Variables | undefined;
    const repository = new TestSportsRepository({
      request: async <T>(
        requestQuery: RequestDocument,
        requestVariables?: Variables,
      ): Promise<T> => {
        requestedQuery = requestQuery;
        requestedVariables = requestVariables;
        return { data: { ok: true } } as T;
      },
    });

    const result = await repository.testQuery(query, variables);

    assert.deepStrictEqual(result, { data: { ok: true } });
    assert.strictEqual(requestedQuery, query);
    assert.deepStrictEqual(requestedVariables, variables);
  });

  it('returns null when the configured client rejects', async () => {
    const repository = new TestSportsRepository({
      request: async (): Promise<never> => {
        throw new Error('Network failure');
      },
    });

    const result = await repository.testQuery('query TestQuery { test }');

    assert.strictEqual(result, null);
  });
});
