import { graphql } from '../generated/index.js';

/**
 * Query to get league
 */
export const LEAGUE_QUERY = graphql(`
  query GetLeague($id: ID!) {
    fantasyQueries {
      league(source: ID, id: $id) {
        id
        name
        type
        totalSquadsCount
        season {
          id
          isActive
          tournament {
            id
            webName
          }
          tours {
            id
            status
          }
        }
      }
    }
  }
`);

/**
 * Query to get league squads with rating
 */
export const LEAGUE_SQUADS_QUERY = graphql(`
  query GetLeagueSquads(
    $leagueId: ID!
    $entityType: FantasyRatingEntityType!
    $entityId: ID!
  ) {
    fantasyQueries {
      rating {
        squads(
          input: {
            leagueID: $leagueId
            entityType: $entityType
            entityID: $entityId
            sortOrder: ASC
            pageSize: 90
            pageNum: 1
          }
        ) {
          list {
            squad {
              id
              name
            }
            scoreInfo {
              place
              score
            }
          }
        }
      }
    }
  }
`);
