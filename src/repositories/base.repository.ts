import { GraphQLClient } from 'graphql-request';
import type { RequestDocument, Variables } from 'graphql-request';
import { logger } from '../utils/logger.js';
import { config } from '../config.js';

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
   * Extract operation name from GraphQL document
   * @param query GraphQL query document
   * @returns Operation name or undefined
   */
  protected getOperationName(query: RequestDocument): string | undefined {
    // Check if query is a DocumentNode (not a string)
    if (typeof query === 'object' && query && 'definitions' in query) {
      const definition = query.definitions?.[0];
      if (definition?.kind === 'OperationDefinition') {
        return definition.name?.value;
      }
    }
    return undefined;
  }

  /**
   * Execute GraphQL request with logging
   * @param query GraphQL query document
   * @param variables Query variables
   * @param operationName Name of the operation for logging (optional, will be extracted from query if not provided)
   */
  protected async executeQuery<T>(
    query: RequestDocument,
    variables?: Variables,
    operationName?: string,
  ): Promise<T | null> {
    try {
      // Extract operation name from query if not provided
      const finalOperationName = operationName || this.getOperationName(query);

      logger.debug('Making GraphQL request to Sports.ru API', {
        operation: finalOperationName,
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
      return null;
    }
  }
}
