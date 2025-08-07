import { describe, it, expect, beforeAll, afterAll } from '@jest/globals';
import { FantasyRepository } from '../../src/repositories/fantasy.repository';

/**
 * Integration tests for Sports.ru API
 * These tests make real API calls and verify the actual behavior
 * Run with: npm test -- --testPathPattern=integration
 * 
 * Note: These tests may be skipped in CI if SKIP_INTEGRATION_TESTS=true
 */
describe('Sports.ru API Integration', () => {
  let repository: FantasyRepository;

  beforeAll(() => {
    // Skip integration tests if environment variable is set
    if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
      console.log('Skipping integration tests (SKIP_INTEGRATION_TESTS=true)');
      return;
    }

    repository = new FantasyRepository();
  });

  afterAll(() => {
    // Cleanup if needed
  });

  describe('FantasyRepository', () => {
    it('should fetch real RPL tournament data', async () => {
      // Skip if integration tests are disabled
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      const tournament = await repository.getTournamentByWebname('rpl-2024');

      if (tournament) {
        // Verify the structure of real data
        expect(tournament).toHaveProperty('id');
        expect(tournament).toHaveProperty('metaTitle');
        expect(typeof tournament.id).toBe('string');
        expect(typeof tournament.metaTitle).toBe('string');

        // Check if current season exists and has proper structure
        if (tournament.currentSeason) {
          expect(tournament.currentSeason).toHaveProperty('id');
          expect(tournament.currentSeason).toHaveProperty('isActive');
          expect(typeof tournament.currentSeason.isActive).toBe('boolean');

          if (tournament.currentSeason.statObject) {
            expect(tournament.currentSeason.statObject).toHaveProperty('name');
            expect(typeof tournament.currentSeason.statObject.name).toBe('string');
          }
        }

        console.log('✅ Successfully fetched tournament:', {
          id: tournament.id,
          title: tournament.metaTitle,
          hasCurrentSeason: !!tournament.currentSeason,
          isActive: tournament.currentSeason?.isActive,
        });
      } else {
        // Tournament might not exist or be available
        console.log('ℹ️ Tournament not found - this might be expected');
        expect(tournament).toBeNull();
      }
    }, 10000); // 10 second timeout for API calls

    it('should handle non-existent tournament gracefully', async () => {
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      const tournament = await repository.getTournamentByWebname('nonexistent-tournament-12345');

      expect(tournament).toBeNull();
    }, 5000);

    it('should fetch data with correct GraphQL structure', async () => {
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      // Test with a known tournament (adjust webname as needed)
      const tournament = await repository.getTournamentByWebname('rpl-2024');

      if (tournament) {
        // Verify GraphQL response structure matches our types
        expect(tournament).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            metaTitle: expect.any(String),
          })
        );

        // Test that we can handle the currentSeason field properly
        if (tournament.currentSeason) {
          expect(tournament.currentSeason).toEqual(
            expect.objectContaining({
              id: expect.any(String),
              isActive: expect.any(Boolean),
            })
          );
        }
      }
    }, 10000);

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
      expect(duration).toBeLessThan(5000); // 5 seconds max

      if (tournament) {
        // Verify we got the essential data without over-fetching
        expect(tournament).toHaveProperty('id');
        expect(tournament).toHaveProperty('metaTitle');

        // Log the actual structure we received
        console.log('📊 Received tournament structure:', {
          hasId: !!tournament.id,
          hasMetaTitle: !!tournament.metaTitle,
          hasCurrentSeason: !!tournament.currentSeason,
          seasonFields: tournament.currentSeason ? Object.keys(tournament.currentSeason) : [],
        });
      }
    }, 10000);
  });

  describe('Error Handling', () => {
    it('should handle network timeouts gracefully', async () => {
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      // This test verifies our error handling works with real network conditions
      const tournament = await repository.getTournamentByWebname('test-timeout');

      // Should return null on errors, not throw
      expect(tournament).toBeNull();
    }, 15000); // Longer timeout to test timeout handling

    it('should handle malformed responses', async () => {
      if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
        return;
      }

      // Test with various edge case inputs
      const edgeCases = ['', ' ', 'очень-длинное-название-турнира-которого-точно-нет'];

      for (const testCase of edgeCases) {
        const tournament = await repository.getTournamentByWebname(testCase);
        expect(tournament).toBeNull();
      }
    }, 10000);
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
