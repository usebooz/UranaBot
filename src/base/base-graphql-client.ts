import {
  GraphQLClient,
  type RequestDocument,
  type Variables,
} from 'graphql-request';
import { logger } from '../utils/logger.js';

/**
 * Base GraphQL client class that can be extended for specific APIs
 */
export class BaseGraphQLClient {
  protected readonly client: GraphQLClient;
  protected readonly apiName: string;

  constructor(
    apiUrl: string,
    apiName: string,
    headers?: Record<string, string>,
  ) {
    this.apiName = apiName;
    this.client = new GraphQLClient(apiUrl, {
      headers: {
        'User-Agent': 'Uranabot/1.0',
        'Content-Type': 'application/json',
        ...headers,
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
      logger.debug(`Executing ${this.apiName} GraphQL query`, {
        query,
        variables,
      });
      const result = await this.client.request<T>(query, variables);
      logger.debug(`${this.apiName} GraphQL query result`, { result });
      return result;
    } catch (error) {
      logger.error(`${this.apiName} GraphQL query failed`, {
        error,
        query,
        variables,
      });
      throw new Error(`${this.apiName} GraphQL query failed: ${error}`);
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
      logger.debug(`Executing ${this.apiName} GraphQL mutation`, {
        mutation,
        variables,
      });
      const result = await this.client.request<T>(mutation, variables);
      logger.debug(`${this.apiName} GraphQL mutation result`, { result });
      return result;
    } catch (error) {
      logger.error(`${this.apiName} GraphQL mutation failed`, {
        error,
        mutation,
        variables,
      });
      throw new Error(`${this.apiName} GraphQL mutation failed: ${error}`);
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
