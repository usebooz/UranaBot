import {
  TOURNAMENT_QUERY,
  type TournamentQuery,
  FantasyIdSource,
} from '../gql';
import { SportsRuRepository } from './base.repository';
import { Scalars, TournamentQueryVariables } from '../gql/generated/graphql';

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
  ): Promise<TournamentQuery> {
    const variables: TournamentQueryVariables = {
      source: FantasyIdSource.Hru,
      id: webname,
    };

    return this.executeQuery<TournamentQuery>(TOURNAMENT_QUERY, variables);
  }
}

// Export singleton instance
export const fantasyRepository = new FantasyRepository();
