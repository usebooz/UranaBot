import {
  League,
  LeagueSquads,
  Tournament,
  TOURNAMENT_QUERY,
  type GetTournamentQuery,
} from '../gql/index.js';
import { SportsRepository } from './sports.repository.js';
import {
  Scalars,
  GetTournamentQueryVariables,
  GetLeagueQuery,
  GetLeagueQueryVariables,
  GetLeagueSquadsQuery,
  GetLeagueSquadsQueryVariables,
  FantasyRatingEntityType,
} from '../gql/generated/graphql.js';
import {
  LEAGUE_QUERY,
  LEAGUE_SQUADS_QUERY,
} from '../gql/queries/league.query.js';

/**
 * Repository for Fantasy Sports data from Sports.ru API
 * Handles fantasy-specific API operations
 */
export class FantasyRepository extends SportsRepository {
  /**
   * Fetches tournament data from Sports.ru API by webname
   * @param webname - The tournament webname identifier
   * @returns Tournament data from API or null if not found
   */
  async getTournament(webname: Scalars['ID']['input']): Promise<Tournament> {
    const variables: GetTournamentQueryVariables = { id: webname };

    const response = await this.executeQuery<GetTournamentQuery>(
      TOURNAMENT_QUERY,
      variables,
    );

    const tournament = response?.fantasyQueries?.tournament || null;
    return tournament;
  }

  /**
   * Fetches league data from Sports.ru API by ID
   * @param id - The league ID identifier
   * @returns League data from API or null if not found
   */
  async getLeague(id: Scalars['ID']['input']): Promise<League> {
    const variables: GetLeagueQueryVariables = { id };

    const response = await this.executeQuery<GetLeagueQuery>(
      LEAGUE_QUERY,
      variables,
    );

    const league = response?.fantasyQueries?.league || null;
    return league;
  }

  /**
   * Fetches league squads with rating from Sports.ru API
   * @param leagueId - The league ID
   * @param entityType - The rating entity type (Season, Tour, etc.)
   * @param entityId - The entity ID for rating calculation
   * @returns Array of squads with rating data
   */
  async getLeagueSquads(
    leagueId: Scalars['ID']['input'],
    entityType: FantasyRatingEntityType,
    entityId: Scalars['ID']['input'],
  ): Promise<LeagueSquads> {
    const variables: GetLeagueSquadsQueryVariables = {
      leagueId,
      entityType,
      entityId,
    };

    const response = await this.executeQuery<GetLeagueSquadsQuery>(
      LEAGUE_SQUADS_QUERY,
      variables,
    );

    const leagueSquads = response?.fantasyQueries?.rating?.squads?.list || [];
    return leagueSquads;
  }
}

// Export singleton instance
export const fantasyRepository = new FantasyRepository();
