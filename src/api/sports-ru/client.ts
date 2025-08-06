import { BaseGraphQLClient } from '../../base/base-graphql-client.js';
import { config } from '../../config.js';

/**
 * sports.ru GraphQL client
 */
class SportsRuClient extends BaseGraphQLClient {
  constructor() {
    super(config.sportsApiUrl, 'sports.ru');
  }
}

// Export singleton instance
export const sportsRuClient = new SportsRuClient();

// Export class for testing purposes
export { SportsRuClient };
