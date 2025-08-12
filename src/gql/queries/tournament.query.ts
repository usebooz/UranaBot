import { graphql } from '../generated/index.js';

/**
 * Query to get tournament with current season
 */
export const TOURNAMENT_QUERY = graphql(`
  query GetTournament($id: ID!) {
    fantasyQueries {
      tournament(source: HRU, id: $id) {
        id
        name
        description
        metaTitle
        statObject {
          name
        }
        currentSeason {
          id
          isActive
          totalSquadsCount
          statObject {
            name
          }
          currentTour {
            id
            name
            status
          }
        }
      }
    }
  }
`);
