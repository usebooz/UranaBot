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

// // Type alias for convenience
// type Tournament = GetTournamentQuery['fantasyQueries']['tournament'];
// type League = GetLeagueQuery['fantasyQueries']['league'];
// type LeagueSquads = GetLeagueSquadsQuery['fantasyQueries']['rating']['squads'];

/**
 * Repository for Fantasy Sports data from Sports.ru API
 * Handles fantasy-specific API operations
 */
export class FantasyRepository extends SportsRepository {
  /**
   * Fetch tournament from Sports.ru API
   * @returns Raw tournament data from API
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
   * Fetch league from Sports.ru API
   * @returns Raw league data from API
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
   * Fetch league squads with rating from Sports.ru API
   * @returns Squads with rating from API
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
