import { GraphQLClient } from 'graphql-request';
import type { RequestDocument, Variables } from 'graphql-request';
import { logger } from '../utils/logger';
import { config } from '../config';

/**
 * Base repository class for Sports.ru API
 * Provides common GraphQL client setup and logging functionality
 */
export abstract class SportsRuRepository {
  protected readonly client: GraphQLClient;

  constructor() {
    this.client = new GraphQLClient(config.sportsApiUrl, {
      headers: {
        'User-Agent': 'Uranabot/1.0',
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Execute GraphQL request with logging
   * @param query GraphQL query document
   * @param variables Query variables
   * @param operationName Name of the operation for logging
   */
  protected async executeQuery<T>(
    query: RequestDocument,
    variables?: Variables,
    operationName?: string,
  ): Promise<T> {
    try {
      logger.debug('Making GraphQL request to Sports.ru API', {
        operation: operationName,
        variables,
      });

      const response = await this.client.request<T>(query, variables);

      logger.debug('Sports.ru API response received', {
        operation: operationName,
      });

      return response;
    } catch (error) {
      logger.error('Sports.ru API request failed', {
        operation: operationName,
        error,
      });
      throw new Error(`Sports.ru API request failed: ${error}`);
    }
  }
}
