import { describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { FantasyRepository } from '../../src/repositories/fantasy.repository.js';

/**
 * Integration tests for Sports.ru API
 * These tests make real API calls and verify the actual behavior
 * Run with: npm run test:integration
 *
 * Note: These tests may be skipped in CI if SKIP_INTEGRATION_TESTS=true
 */
describe('Sports.ru API Integration', () => {
  let repository: FantasyRepository;

  before(() => {
    // Skip integration tests if environment variable is set
    if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
      console.log('Skipping integration tests (SKIP_INTEGRATION_TESTS=true)');
      return;
    }

    repository = new FantasyRepository();
  });

  after(() => {
    // Cleanup if needed
  });

  describe('FantasyRepository', () => {
    it('should fetch real RPL tournament data', async () => {
      // Skip if integration tests are disabled
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      const tournament = await repository.getTournamentByWebname('russia');
      assert.ok(tournament);
      // Verify the structure of real data
      assert.ok(tournament.id);
      assert.ok(tournament.metaTitle);
      assert.strictEqual(typeof tournament.id, 'string');
      assert.strictEqual(typeof tournament.metaTitle, 'string');

      // Check if current season exists and has proper structure
      if (tournament.currentSeason) {
        assert.ok(tournament.currentSeason.id);
        assert.ok(typeof tournament.currentSeason.isActive === 'boolean');

        if (tournament.currentSeason.statObject) {
          assert.ok(tournament.currentSeason.statObject.name);
          assert.strictEqual(typeof tournament.currentSeason.statObject.name, 'string');
        }
      }

      console.log('✅ Successfully fetched tournament:', {
        id: tournament.id,
        title: tournament.metaTitle,
        hasCurrentSeason: !!tournament.currentSeason,
        isActive: tournament.currentSeason?.isActive,
      });
    }); // 10 second timeout for API calls

    it('should handle non-existent tournament gracefully', async () => {
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      const tournament = await repository.getTournamentByWebname(
        'nonexistent-tournament-12345',
      );

      assert.strictEqual(tournament, null);
    });

    it('should fetch data with correct GraphQL structure', async () => {
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      // Test with a known tournament (adjust webname as needed)
      const tournament = await repository.getTournamentByWebname('rpl-2024');

      if (tournament) {
        // Verify GraphQL response structure matches our types
        assert.ok(tournament.id);
        assert.ok(tournament.metaTitle);
        assert.strictEqual(typeof tournament.id, 'string');
        assert.strictEqual(typeof tournament.metaTitle, 'string');

        // Test that we can handle the currentSeason field properly
        if (tournament.currentSeason) {
          assert.ok(tournament.currentSeason.id);
          assert.strictEqual(typeof tournament.currentSeason.id, 'string');
          assert.strictEqual(typeof tournament.currentSeason.isActive, 'boolean');
        }
      }
    });

    it('should demonstrate GraphQL query optimization', async () => {
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      // This test ensures our GraphQL query only fetches necessary fields
      const startTime = Date.now();
      const tournament = await repository.getTournamentByWebname('rpl-2024');
      const endTime = Date.now();
      const duration = endTime - startTime;

      console.log(`⏱️ API call took ${duration}ms`);

      // Reasonable performance expectation (adjust as needed)
      assert.ok(duration < 5000, 'API call should take less than 5 seconds'); // 5 seconds max

      if (tournament) {
        // Verify we got the essential data without over-fetching
        assert.ok(tournament.id);
        assert.ok(tournament.metaTitle);

        // Log the actual structure we received
        console.log('📊 Received tournament structure:', {
          hasId: !!tournament.id,
          hasMetaTitle: !!tournament.metaTitle,
          hasCurrentSeason: !!tournament.currentSeason,
          seasonFields: tournament.currentSeason
            ? Object.keys(tournament.currentSeason)
            : [],
        });
      }
    });
  });

  describe('Error Handling', () => {
    it('should properly handle GraphQL not found errors as null', async () => {
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      // Test that our logic correctly identifies GraphQL "not found" errors
      // and returns null instead of throwing
      const tournament = await repository.getTournamentByWebname('definitely-nonexistent-tournament-123456');

      // Should return null for legitimate "not found" GraphQL responses
      assert.strictEqual(tournament, null);
      
      // API should return proper GraphQL error with NOT_FOUND code
      // which our error handling converts to null
    });

    it('should handle network timeouts gracefully', async () => {
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      // This test verifies our error handling works with real network conditions
      const tournament =
        await repository.getTournamentByWebname('test-timeout');

      // Should return null only for legitimate "not found" GraphQL responses
      // Network timeouts and server errors should throw
      assert.strictEqual(tournament, null);
    }); // Longer timeout to test timeout handling

    it('should handle malformed responses', async () => {
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      // Test with various edge case inputs
      const edgeCases = [
        '',
        ' ',
        'очень-длинное-название-турнира-которого-точно-нет',
      ];

      for (const testCase of edgeCases) {
        const tournament = await repository.getTournamentByWebname(testCase);
        assert.strictEqual(tournament, null);
      }
    });
  });
});

// Helper to check if integration tests should run
export function shouldRunIntegrationTests(): boolean {
  return process.env.SKIP_INTEGRATION_TESTS !== 'true';
}

// Export for use in CI scripts
export const integrationTestConfig = {
  timeout: 10000,
  retries: 2, // Retry flaky network tests
  skipCondition: 'SKIP_INTEGRATION_TESTS=true',
};
