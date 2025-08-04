import { BaseGraphQLClient } from '../../base/base-graphql-client.js';
import { config } from '../../config.js';

/**
 * Sports.ru GraphQL client
 */
class SportsRuClient extends BaseGraphQLClient {
  constructor() {
    super(config.sportsApiUrl, 'Sports.ru');
  }
}

// Export singleton instance
export const sportsRuClient = new SportsRuClient();

// Export class for testing purposes
export { SportsRuClient };
