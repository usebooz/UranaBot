/**
 * Централизованный экспорт для GraphQL модуля
 * Объединяет запросы, типы и утилиты
 */

import {
  GetLeagueQuery,
  GetLeagueSquadsQuery,
  GetTournamentQuery,
} from './generated/graphql.js';

// Экспорт всех запросов
export * from './queries/index.js';

// Экспорт сгенерированных типов и утилит
export * from './generated/index.js';

export type Tournament = GetTournamentQuery['fantasyQueries']['tournament'];
export type League = GetLeagueQuery['fantasyQueries']['league'];
export type LeagueSquads = NonNullable<
  GetLeagueSquadsQuery['fantasyQueries']['rating']['squads']
>['list'];

// Экспорт конкретных типов для удобства
export type {
  GetTournamentQuery,
  GetLeagueQuery,
  GetLeagueSquadsQuery,
  FantasyTourStatus,
} from './generated/graphql.js';

export { FantasyIdSource } from './generated/graphql.js';
