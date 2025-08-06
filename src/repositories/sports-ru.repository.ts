import { GraphQLClient } from 'graphql-request';
import { logger } from '../utils/logger';
import { config } from '../config';
import { TournamentQuery, TournamentVariables } from '../gql';
import type { GetTournamentQuery } from '../gql';

/**
 * Repository for Sports.ru API
 * Handles direct API communication and data fetching
 */
export class SportsRuRepository {
  private readonly client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(config.sportsApiUrl, {
      headers: {
        'User-Agent': 'Uranabot/1.0',
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Fetch tournament information from Sports.ru API
   * @returns Raw tournament data from API
   */
  async getTournamentInfo(): Promise<GetTournamentQuery> {
    try {
      logger.debug('Making GraphQL request to Sports.ru API');

      const response = await this.client.request<GetTournamentQuery>(
        TournamentQuery,
        TournamentVariables,
      );

      logger.debug('Sports.ru API response received', {
        tournamentId: response.fantasyQueries.tournament?.id,
      });

      return response;
    } catch (error) {
      logger.error('Sports.ru API request failed', { error });
      throw new Error(`Sports.ru API request failed: ${error}`);
    }
  }
}

// Export singleton instance
export const sportsRuRepository = new SportsRuRepository();
