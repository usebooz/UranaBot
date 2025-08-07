/**
 * Централизованный экспорт для GraphQL модуля
 * Объединяет запросы, типы и утилиты
 */

// Экспорт всех запросов
export * from './queries/index.js';

// Экспорт сгенерированных типов и утилит
export * from './generated/index.js';

// Экспорт конкретных типов для удобства
export type {
  TournamentQuery,
  FantasyTourStatus,
} from './generated/graphql.js';

export { FantasyIdSource } from './generated/graphql.js';
