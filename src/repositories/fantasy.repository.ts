import { TOURNAMENT_QUERY, TOURNAMENT_VARIABLES } from '../gql';
import type { TournamentQuery } from '../gql';
import { SportsRuRepository } from './base.repository';

/**
 * Repository for Fantasy Sports data from Sports.ru API
 * Handles fantasy-specific API operations
 */
export class FantasyRepository extends SportsRuRepository {
  /**
   * Fetch tournament information from Sports.ru API
   * @returns Raw tournament data from API
   */
  async getTournament(): Promise<TournamentQuery> {
    return this.executeQuery<TournamentQuery>(
      TOURNAMENT_QUERY,
      TOURNAMENT_VARIABLES,
      'getTournament',
    );
  }
}

// Export singleton instance
export const fantasyRepository = new FantasyRepository();
