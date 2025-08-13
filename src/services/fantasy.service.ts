import { fantasyRepository } from '../repositories/fantasy.repository.js';
import { config } from '../utils/config.js';
import {
  FantasyLeagueType,
  FantasyRatingEntityType,
} from '../gql/generated/graphql.js';
import { League, LeagueSquads, Tournament } from '../gql/index.js';

/**
 * Service for working with RPL Fantasy
 * Provides methods to fetch and validate fantasy data
 */
export class FantasyService {
  protected readonly rplWebname: string;

  constructor() {
    this.rplWebname = config.sportsTournamentRpl;
  }

  /**
   * Fetches the RPL tournament data from the repository
   * @returns Tournament data or null if not available
   */
  async readRplTournament(): Promise<Tournament> {
    const tournament = await fantasyRepository.getTournament(this.rplWebname);
    return tournament;
  }

  /**
   * Checks if the tournament has an active season
   * @param tournament - The tournament object to check
   * @returns True if the tournament has an active season, otherwise false
   */
  hasTournamentActiveSeason(tournament: Tournament): boolean {
    return !!tournament?.currentSeason?.isActive;
  }

  /**
   * Fetches league data from the repository by ID
   * @param id - The ID of the league to fetch
   * @returns League data or null if not available
   */
  async readLeague(id: string): Promise<League> {
    const league = await fantasyRepository.getLeague(id);
    return league;
  }

  /**
   * Checks if the league belongs to the active RPL season
   * @param league - The league object to check
   * @returns True if the league is from the active RPL season, otherwise false
   */
  isLeagueFromActiveRplSeason(league: League): boolean {
    return !!(
      league?.season?.isActive &&
      league?.season?.tournament?.webName === this.rplWebname
    );
  }

  /**
   * Checks if it's a user league
   * @param league - The league object to check
   * @returns True if the league created by user
   */
  isUserLeague(league: League): boolean {
    return league?.type === FantasyLeagueType.User;
  }

  /**
   * Fetches league squads with season rating from the repository
   * @param leagueId - The ID of the league
   * @param seasonId - The ID of the season
   * @returns LeagueSquads data
   */
  async readLeagueSquadsWithSeasonRating(
    leagueId: string,
    seasonId: string,
  ): Promise<LeagueSquads> {
    const leagueSquads = await fantasyRepository.getLeagueSquads(
      leagueId,
      FantasyRatingEntityType.Season,
      seasonId,
    );
    return leagueSquads;
  }
}

// Export instance
export const fantasyService = new FantasyService();
