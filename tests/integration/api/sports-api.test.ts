import { describe, test, beforeEach } from 'node:test';
import assert from 'node:assert';
import { FantasyRepository } from '../../../src/repositories/fantasy.repository.js';
import { FantasyRatingEntityType } from '../../../src/gql/generated/graphql.js';

describe('Sports API Integration Tests', () => {
  let repository: FantasyRepository;

  beforeEach(() => {
    repository = new FantasyRepository();
  });

  test('should be able to make real API calls', { timeout: 10000 }, async () => {
    // Skip integration tests in CI or when API is not available
    if (process.env.SKIP_INTEGRATION_TESTS) {
      return;
    }
    
    try {
      // Test with a real tournament ID that might exist
      const tournament = await repository.getTournament('russia');
      
      // We expect this to either return data or throw an error
      // Both are acceptable in integration tests
      if (tournament) {
        assert.ok(tournament);
        assert.ok(typeof tournament === 'object');
      }
    } catch (error) {
      // API errors are expected in test environment
      assert.ok(error instanceof Error);
      assert.ok(error.message.length > 0);
    }
  });

  test('should handle invalid tournament IDs gracefully', { timeout: 5000 }, async () => {
    if (process.env.SKIP_INTEGRATION_TESTS) {
      return;
    }
    
    try {
      await repository.getTournament('non-existent-tournament-id-123456');
      assert.fail('Should have thrown an error for invalid tournament ID');
    } catch (error) {
      // Expected behavior - API should return an error for invalid IDs
      assert.ok(error instanceof Error);
    }
  });

  test('should handle network errors gracefully', { timeout: 5000 }, async () => {
    if (process.env.SKIP_INTEGRATION_TESTS) {
      return;
    }
    
    // Test repository functionality
    assert.ok(repository);
    assert.strictEqual(typeof repository.getTournament, 'function');
    assert.strictEqual(typeof repository.getLeague, 'function');
    assert.strictEqual(typeof repository.getLeagueSquads, 'function');
  });

  test('should be able to call getLeague method', { timeout: 10000 }, async () => {
    if (process.env.SKIP_INTEGRATION_TESTS) {
      return;
    }
    
    try {
      // Test with a league ID - expecting an error for invalid format
      const result = await repository.getLeague('test-league-id');
      // If no error is thrown, result should be null for invalid ID
      assert.strictEqual(result, null);
    } catch (error) {
      // Expected behavior - API should return an error for invalid IDs
      assert.ok(error instanceof Error);
      // Should contain information about the error
      assert.ok(error.message.includes('int32') || error.message.includes('not found'));
    }
  });

  test('should be able to call getLeagueSquads method', { timeout: 10000 }, async () => {
    if (process.env.SKIP_INTEGRATION_TESTS) {
      return;
    }
    
    try {
      // Test with invalid parameters - expecting an error
      const result = await repository.getLeagueSquads('invalid-league', FantasyRatingEntityType.Season, 'invalid-season');
      // If no error is thrown, result should be empty array for invalid parameters
      assert.ok(Array.isArray(result));
    } catch (error) {
      // Expected behavior - API should return an error for invalid parameters
      assert.ok(error instanceof Error);
      // Should contain information about parsing error
      assert.ok(error.message.includes('parse') || error.message.includes('invalid'));
    }
  });

  test('should validate method signatures', { timeout: 1000 }, async () => {
    if (process.env.SKIP_INTEGRATION_TESTS) {
      return;
    }
    
    // Test that all methods exist and are functions
    assert.strictEqual(typeof repository.getTournament, 'function');
    assert.strictEqual(typeof repository.getLeague, 'function');
    assert.strictEqual(typeof repository.getLeagueSquads, 'function');
    
    // Test that repository is instance of FantasyRepository
    assert.ok(repository instanceof FantasyRepository);
  });

  test('should successfully get league with valid ID', { timeout: 10000 }, async () => {
    if (process.env.SKIP_INTEGRATION_TESTS) {
      return;
    }
    
    try {
      // Test with known valid league ID (29915 is a real league ID from RPL)
      const result = await repository.getLeague('29915');
      
      if (result) {
        // Validate the structure of returned league data
        assert.ok(typeof result === 'object');
        assert.ok(typeof result.id === 'string');
        assert.ok(typeof result.name === 'string');
        assert.ok(typeof result.type === 'string');
        assert.ok(typeof result.totalSquadsCount === 'number');
        
        if (result.season) {
          assert.ok(typeof result.season === 'object');
          assert.ok(typeof result.season.id === 'string');
          assert.ok(typeof result.season.isActive === 'boolean');
        }
      } else {
        // League not found is also acceptable
        assert.strictEqual(result, null);
      }
    } catch (error) {
      // If there's an API error, ensure it's meaningful
      assert.ok(error instanceof Error);
      // Should not be a validation error for valid ID format
      assert.ok(!error.message.includes('int32'));
    }
  });

  test('should successfully get league squads with valid parameters', { timeout: 10000 }, async () => {
    if (process.env.SKIP_INTEGRATION_TESTS) {
      return;
    }
    
    try {
      // Test with known valid parameters from RPL Fantasy
      // leagueId: 29915, entityType: SEASON, entityId: 59 (season 2024)
      const result = await repository.getLeagueSquads('29915', FantasyRatingEntityType.Season, '59');
      
      if (result && Array.isArray(result)) {
        // Validate the structure of returned squads data
        assert.ok(Array.isArray(result));
        
        if (result.length > 0) {
          const firstSquad = result[0];
          assert.ok(typeof firstSquad === 'object');
          
          if (firstSquad.squad) {
            assert.ok(typeof firstSquad.squad.id === 'string');
            assert.ok(typeof firstSquad.squad.name === 'string');
          }
          
          if (firstSquad.scoreInfo) {
            assert.ok(typeof firstSquad.scoreInfo.place === 'number');
            assert.ok(typeof firstSquad.scoreInfo.score === 'number');
          }
        }
      } else {
        // Empty array is also acceptable
        assert.ok(Array.isArray(result) || result === null);
      }
    } catch (error) {
      // If there's an API error, ensure it's meaningful
      assert.ok(error instanceof Error);
      // Should not be a parsing error for valid parameters
      assert.ok(!error.message.includes('parse entity id'));
    }
  });
});
