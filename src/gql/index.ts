/**
 * Centralized exports for GraphQL module
 * Combines queries, types and utilities
 */

import {
  GetLeagueQuery,
  GetLeagueSquadsQuery,
  GetTournamentQuery,
} from './generated/graphql.js';

// Export all queries
export * from './queries/index.js';

// Export generated types and utilities
export * from './generated/index.js';

export type Tournament = GetTournamentQuery['fantasyQueries']['tournament'];
export type League = GetLeagueQuery['fantasyQueries']['league'];
export type LeagueSquads = NonNullable<
  GetLeagueSquadsQuery['fantasyQueries']['rating']['squads']
>['list'];

// Export specific types for convenience
export type {
  GetTournamentQuery,
  GetLeagueQuery,
  GetLeagueSquadsQuery,
  FantasyTourStatus,
} from './generated/graphql.js';

export { FantasyIdSource } from './generated/graphql.js';
