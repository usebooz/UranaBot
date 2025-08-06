/**
 * Централизованный экспорт для GraphQL модуля
 * Объединяет запросы, типы и утилиты
 */

// Экспорт всех запросов
export * from './queries';

// Экспорт сгенерированных типов и утилит
export * from './generated';

// Экспорт конкретных типов для удобства
export type { TournamentQuery, FantasyTourStatus } from './generated/graphql';

export { FantasyIdSource } from './generated/graphql';
