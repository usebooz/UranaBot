import { logger } from '../utils/logger';
import { fantasyRepository } from '../repositories/fantasy.repository';
import type { TournamentQuery } from '../gql';

// Type alias for convenience
type Tournament = NonNullable<TournamentQuery['fantasyQueries']['tournament']>;

/**
 * Service for working with Sports.ru Fantasy data
 * Handles business logic and data processing
 */
export class SportsFantasyService {
  /**
   * Get current tournament information with validation
   * @returns Processed tournament data or null if not available
   */
  async getCurrentTournament(): Promise<Tournament | null> {
    try {
      logger.info('Processing tournament request');

      const response = await fantasyRepository.getTournamentRpl();
      const tournament = response.fantasyQueries.tournament;

      if (!tournament) {
        logger.warn('No tournament data available in API response');
        return null;
      }

      logger.info('Tournament information processed successfully', {
        tournamentId: tournament.id,
        seasonId: tournament.currentSeason?.id,
        currentTour: tournament.currentSeason?.currentTour?.name,
        tourStatus: tournament.currentSeason?.currentTour?.status,
      });

      return tournament;
    } catch (error) {
      logger.error('Failed to process tournament information', { error });
      return null;
    }
  }

  /**
   * Validate if tournament is in active state for fantasy operations
   */
  isTournamentActive(tournament: Tournament): boolean {
    return (
      tournament.currentSeason?.isActive === true &&
      tournament.currentSeason?.currentTour !== null
    );
  }

  /**
   * Get tournament status summary for business logic
   */
  getTournamentStatus(tournament: Tournament): {
    isActive: boolean;
    hasActiveTour: boolean;
    status: string;
  } {
    const isActive = this.isTournamentActive(tournament);
    const hasActiveTour = tournament.currentSeason?.currentTour !== null;

    let status: string;
    if (!tournament.currentSeason?.isActive) {
      status = 'season_inactive';
    } else if (!hasActiveTour) {
      status = 'no_active_tour';
    } else {
      status = tournament.currentSeason?.currentTour?.status || 'unknown';
    }

    return { isActive, hasActiveTour, status };
  }
}

// Export singleton instance
export const sportsFantasyService = new SportsFantasyService();
