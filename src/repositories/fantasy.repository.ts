import {
  TOURNAMENT_QUERY,
  type TournamentQuery,
  FantasyIdSource,
} from '../gql/index.js';
import { SportsRuRepository } from './base.repository.js';
import { Scalars, TournamentQueryVariables } from '../gql/generated/graphql.js';

// Type alias for convenience
type Tournament = TournamentQuery['fantasyQueries']['tournament'];

/**
 * Repository for Fantasy Sports data from Sports.ru API
 * Handles fantasy-specific API operations
 */
export class FantasyRepository extends SportsRuRepository {
  /**
   * Fetch tournament information from Sports.ru API
   * @returns Raw tournament data from API
   */
  async getTournamentByWebname(
    webname: Scalars['ID']['input'],
  ): Promise<Tournament> {
    const variables: TournamentQueryVariables = {
      source: FantasyIdSource.Hru,
      id: webname,
    };

    const response = await this.executeQuery<TournamentQuery>(
      TOURNAMENT_QUERY,
      variables,
    );

    const tournament = response?.fantasyQueries?.tournament || null;
    return tournament;
  }
}

// Export singleton instance
export const fantasyRepository = new FantasyRepository();
