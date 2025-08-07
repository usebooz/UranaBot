import { fantasyRepository } from '../repositories/fantasy.repository';
import { config } from '../config';
import { TournamentQuery } from '../gql';

type Tournament = TournamentQuery['fantasyQueries']['tournament'];

/**
 * Service for working with RPL Fantasy tournament
 * Simple class for fetching tournament data
 */
export class FantasyService {
  /**
   * Get tournament information from repository
   * @returns Tournament data or null if not available
   */
  async getTournamentRpl(): Promise<Tournament> {
    const tournament = await fantasyRepository.getTournamentByWebname(
      config.sportsTournamentRpl,
    );
    return tournament;
  }
}

// Export instance
export const fantasyRplService = new FantasyService();
