/**
 * GraphQL query utilities for sports.ru API
 * Using client preset for type-safe queries
 */

import { graphql } from '../generated';
import { FantasyIdSource } from '../generated/graphql';
import { config } from '../../config';

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
          currentTour {
            id
            name
            status
            startedAt
            finishedAt
            transfersStartedAt
            transfersFinishedAt
          }
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

/**
 * Default variables for the tournament query using config values
 */
export const TOURNAMENT_VARIABLES = {
  source: FantasyIdSource.Hru,
  id: config.sportsTournamentWebname,
};
