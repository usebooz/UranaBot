/**
 * GraphQL query utilities for Sports.ru API
 * Use this to create your own queries when needed
 */

// Helper function to create GraphQL queries
export { gql } from 'graphql-request';

/**
 * Example of how to use:
 *
 * import { gql } from './queries.js';
 * import { sportsRuClient } from './client.js';
 *
 * const MY_QUERY = gql`
 *   query MyQuery($variable: String) {
 *     field(input: $variable) {
 *       id
 *       name
 *     }
 *   }
 * `;
 *
 * const result = await sportsRuClient.query(MY_QUERY, { variable: 'value' });
 */
