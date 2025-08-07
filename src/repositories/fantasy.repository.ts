import {
  TOURNAMENT_QUERY,
  type TournamentQuery,
  FantasyIdSource,
} from '../gql';
import { SportsRuRepository } from './base.repository';
import { config } from '../config';

/**
 * Repository for Fantasy Sports data from Sports.ru API
 * Handles fantasy-specific API operations
 */
export class FantasyRepository extends SportsRuRepository {
  /**
   * Fetch tournament information from Sports.ru API
   * @returns Raw tournament data from API
   */
  async getTournamentRpl(): Promise<TournamentQuery> {
    const variables = {
      source: FantasyIdSource.Hru,
      id: config.sportsTournamentRpl,
    };

    return this.executeQuery<TournamentQuery>(
      TOURNAMENT_QUERY,
      variables,
      'getTournamentRpl',
    );
  }
}

// Export singleton instance
export const fantasyRepository = new FantasyRepository();
