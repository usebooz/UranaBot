import { logger } from '../utils/logger';
import { fantasyRepository } from '../repositories/fantasy.repository';
import type { TournamentQuery } from '../gql';
import { config } from '../config';

// Type alias for convenience
type Tournament = NonNullable<TournamentQuery['fantasyQueries']['tournament']>;

/**
 * Service for working with RPL Fantasy tournament
 * Implements singleton pattern with lazy initialization
 */
export class FantasyRplService {
  private static instance: FantasyRplService | null = null;
  private tournament: Tournament | null = null;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  /**
   * Get singleton instance
   */
  public static getInstance(): FantasyRplService {
    FantasyRplService.instance ??= new FantasyRplService();
    return FantasyRplService.instance;
  }

  /**
   * Initialize tournament data from repository
   * This method is called automatically on first access to tournament data
   */
  private async initialize(): Promise<void> {
    if (this.isInitialized || this.initializationPromise) {
      return this.initializationPromise || Promise.resolve();
    }

    this.initializationPromise = this.loadTournament();
    await this.initializationPromise;
    this.isInitialized = true;
  }

  /**
   * Load tournament data from repository
   */
  private async loadTournament(): Promise<void> {
    try {
      logger.info('Initializing RPL Fantasy tournament data', {
        webname: config.sportsTournamentRpl,
      });

      const response = await fantasyRepository.getTournamentByWebname(
        config.sportsTournamentRpl,
      );

      this.tournament = response.fantasyQueries.tournament || null;

      if (!this.tournament) {
        logger.warn('No RPL tournament data available in API response');
        return;
      }

      logger.info('RPL Fantasy tournament initialized successfully', {
        tournamentId: this.tournament.id,
        seasonId: this.tournament.currentSeason?.id,
        currentTour: this.tournament.currentSeason?.currentTour?.name,
        tourStatus: this.tournament.currentSeason?.currentTour?.status,
      });
    } catch (error) {
      logger.error('Failed to initialize RPL Fantasy tournament', { error });
      this.tournament = null;
    }
  }

  /**
   * Get current tournament information
   * Initializes tournament data on first call
   * @returns Tournament data or null if not available
   */
  async getTournament(): Promise<Tournament | null> {
    await this.initialize();
    return this.tournament;
  }

  /**
   * Refresh tournament data from repository
   * @returns Updated tournament data or null if not available
   */
  async refreshTournament(): Promise<Tournament | null> {
    this.isInitialized = false;
    this.initializationPromise = null;
    await this.initialize();
    return this.tournament;
  }

  /**
   * Validate if tournament is in active state for fantasy operations
   */
  async isTournamentActive(): Promise<boolean> {
    const tournament = await this.getTournament();
    if (!tournament) return false;

    return (
      tournament.currentSeason?.isActive === true &&
      tournament.currentSeason?.currentTour !== null
    );
  }

  /**
   * Get tournament status summary for business logic
   */
  async getTournamentStatus(): Promise<{
    isActive: boolean;
    hasActiveTour: boolean;
    status: string;
  }> {
    const tournament = await this.getTournament();

    if (!tournament) {
      return {
        isActive: false,
        hasActiveTour: false,
        status: 'tournament_not_found',
      };
    }

    const isActive =
      tournament.currentSeason?.isActive === true &&
      tournament.currentSeason?.currentTour !== null;
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

  /**
   * Get current tour information
   */
  async getCurrentTour(): Promise<{
    name: string;
    status: string;
  } | null> {
    const tournament = await this.getTournament();
    if (!tournament?.currentSeason?.currentTour) return null;

    const tour = tournament.currentSeason.currentTour;
    return {
      name: tour.name,
      status: tour.status,
    };
  }
}

// Export singleton instance getter
export const fantasyRplService = FantasyRplService.getInstance();
