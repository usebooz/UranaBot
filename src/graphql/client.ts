import {
  GraphQLClient,
  type RequestDocument,
  type Variables,
} from 'graphql-request';
import { config } from '../config.js';
import { logger } from '../utils/logger.js';

/**
 * GraphQL client for Sports.ru API
 */
class SportsGraphQLClient {
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
   * Execute a GraphQL query
   * @param query - GraphQL query document
   * @param variables - Query variables
   * @returns Promise with query result
   */
  async query<T = unknown>(
    query: RequestDocument,
    variables?: Variables,
  ): Promise<T> {
    try {
      logger.debug('Executing GraphQL query', { query, variables });
      const result = await this.client.request<T>(query, variables);
      logger.debug('GraphQL query result', { result });
      return result;
    } catch (error) {
      logger.error('GraphQL query failed', { error, query, variables });
      throw new Error(`GraphQL query failed: ${error}`);
    }
  }

  /**
   * Execute a GraphQL mutation
   * @param mutation - GraphQL mutation document
   * @param variables - Mutation variables
   * @returns Promise with mutation result
   */
  async mutation<T = unknown>(
    mutation: RequestDocument,
    variables?: Variables,
  ): Promise<T> {
    try {
      logger.debug('Executing GraphQL mutation', { mutation, variables });
      const result = await this.client.request<T>(mutation, variables);
      logger.debug('GraphQL mutation result', { result });
      return result;
    } catch (error) {
      logger.error('GraphQL mutation failed', { error, mutation, variables });
      throw new Error(`GraphQL mutation failed: ${error}`);
    }
  }

  /**
   * Set authorization header
   * @param token - Authorization token
   */
  setAuthToken(token: string): void {
    this.client.setHeader('Authorization', `Bearer ${token}`);
  }

  /**
   * Remove authorization header
   */
  removeAuthToken(): void {
    this.client.setHeader('Authorization', '');
  }

  /**
   * Set custom headers
   * @param headers - Custom headers object
   */
  setHeaders(headers: Record<string, string>): void {
    this.client.setHeaders(headers);
  }
}

// Export singleton instance
export const sportsGraphQL = new SportsGraphQLClient();

// Export class for testing purposes
export { SportsGraphQLClient };
