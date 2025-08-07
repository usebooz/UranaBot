/**
 * GraphQL query utilities for sports.ru API
 * Using client preset for type-safe queries
 */

import { graphql } from '../generated';

/**
 * Query to get tournament (RPL) information with current season and tour
 */
export const TOURNAMENT_QUERY = graphql(`
  query Tournament($source: FantasyIDSource!, $id: ID!) {
    fantasyQueries {
      tournament(source: $source, id: $id) {
        metaTitle
        currentSeason {
          id
          isActive
          statObject {
            name
            startDate
            endDate
            year
          }
        }
        id
      }
    }
  }
`);
