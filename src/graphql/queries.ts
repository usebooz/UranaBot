/**
 * Utility for creating GraphQL queries and mutations
 * Use this to create your own queries when needed
 */

// Helper function to create GraphQL queries
export { gql } from 'graphql-request';

/**
 * Example of how to use:
 *
 * import { gql } from './queries.js';
 * import { sportsGraphQL } from './client.js';
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
 * const result = await sportsGraphQL.query(MY_QUERY, { variable: 'value' });
 */
