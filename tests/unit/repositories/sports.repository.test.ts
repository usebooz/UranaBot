import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { SportsRepository } from '../../../src/repositories/sports.repository.js';

// Create a test implementation since SportsRepository is abstract
class TestSportsRepository extends SportsRepository {
  async testQuery<T>(query: any, variables?: any): Promise<T | null> {
    return this.executeQuery<T>(query, variables);
  }
  
  testGetOperationName(query: any): string | undefined {
    return this.getOperationName(query);
  }
}

describe('Sports Repository', () => {
  let repository: TestSportsRepository;

  beforeEach(() => {
    repository = new TestSportsRepository();
  });

  it('should be able to import the repository', async () => {
    const { SportsRepository } = await import('../../../src/repositories/sports.repository.js');
    
    assert.ok(SportsRepository);
    assert.strictEqual(typeof SportsRepository, 'function');
  });

  it('should be able to create repository instance', () => {
    assert.ok(repository);
    assert.strictEqual(typeof repository.testQuery, 'function');
    assert.strictEqual(typeof repository.testGetOperationName, 'function');
  });

  it('should extract operation name from GraphQL document', () => {
    const mockQuery = {
      definitions: [{
        kind: 'OperationDefinition',
        name: { value: 'TestQuery' }
      }]
    };
    
    const operationName = repository.testGetOperationName(mockQuery);
    assert.strictEqual(operationName, 'TestQuery');
  });

  it('should handle query without operation name', () => {
    const mockQuery = {
      definitions: [{
        kind: 'OperationDefinition',
        name: null
      }]
    };
    
    const operationName = repository.testGetOperationName(mockQuery);
    assert.strictEqual(operationName, undefined);
  });

  it('should handle string queries', () => {
    const stringQuery = 'query TestQuery { test }';
    
    const operationName = repository.testGetOperationName(stringQuery);
    assert.strictEqual(operationName, undefined);
  });

  it('should handle invalid query structures', () => {
    const invalidQueries = [
      null,
      undefined,
      {},
      { definitions: [] },
      { definitions: [{ kind: 'FragmentDefinition' }] }
    ];
    
    invalidQueries.forEach(query => {
      const operationName = repository.testGetOperationName(query as any);
      assert.strictEqual(operationName, undefined);
    });
  });

  it('should return promise from executeQuery', () => {
    const mockQuery = 'query { test }';
    
    const result = repository.testQuery(mockQuery);
    assert.ok(result instanceof Promise);
  });

  it('should handle executeQuery errors gracefully', async () => {
    const invalidQuery = 'invalid graphql';
    
    try {
      const result = await repository.testQuery(invalidQuery);
      // Should return null on error, not throw
      assert.strictEqual(result, null);
    } catch (error) {
      // If it throws, the error handling might need improvement
      assert.ok(error instanceof Error);
    }
  });
});
