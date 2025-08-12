// import { describe, it, beforeEach } from "node:test";
// import assert from "node:assert";
// import { FantasyFormatter } from '../../src/formatters/fantasy.formatter.js';
// import type { TournamentQuery } from '../../src/gql/index.js';

// type Tournament = TournamentQuery['fantasyQueries']['tournament'];

// describe("FantasyFormatter", () => {
//   let formatter: FantasyFormatter;

//   beforeEach(() => {
//     formatter = new FantasyFormatter();
//   });

//   describe('formatTournamentToText', () => {
//     it('should return "🪦 РПЛ ВСЁ!" when tournament is null', () => {
//       const result = formatter.formatTournamentToText(null);
//       assert.strictEqual(result, '🪦 РПЛ ВСЁ!');
//     });

//     it('should return "🪦 РПЛ ВСЁ!" when tournament is undefined', () => {
//       const result = formatter.formatTournamentToText(undefined as any);
//       assert.strictEqual(result, '🪦 РПЛ ВСЁ!');
//     });

//     it('should format tournament with no current season', () => {
//       const tournament: Tournament = {
//         id: 'rpl-2024',
//         metaTitle: 'Российская Премьер-Лига',
//         currentSeason: null,
//       };

//       const result = formatter.formatTournamentToText(tournament);
//       assert.strictEqual(result, '🏆 Российская Премьер-Лига\n\n');
//     });

//     it('should format tournament with active season', () => {
//       const tournament: Tournament = {
//         id: 'rpl-2024',
//         metaTitle: 'Российская Премьер-Лига',
//         currentSeason: {
//           id: 'season-2024',
//           isActive: true,
//           statObject: {
//             name: 'РПЛ 2024/25',
//             startDate: '2024-07-01',
//             endDate: '2025-05-31',
//             year: '2024'
//           }
//         }
//       };

//       const result = formatter.formatTournamentToText(tournament);
//       assert.strictEqual(result, '🏆 Российская Премьер-Лига\n\n📅 Сезон РПЛ 2024/25 идет');
//     });

//     it('should format tournament with inactive season', () => {
//       const tournament: Tournament = {
//         id: 'rpl-2022',
//         metaTitle: 'Российская Премьер-Лига',
//         currentSeason: {
//           id: 'season-2022',
//           isActive: false,
//           statObject: {
//             name: 'РПЛ 2022/23',
//             startDate: '2022-07-01',
//             endDate: '2023-05-31',
//             year: '2022'
//           }
//         }
//       };

//       const result = formatter.formatTournamentToText(tournament);
//       assert.strictEqual(result, '🏆 Российская Премьер-Лига\n\n📅 Сезон РПЛ 2022/23 закончен');
//     });

//     it('should format tournament with inactive season (future)', () => {
//       const tournament: Tournament = {
//         id: 'rpl-2025',
//         metaTitle: 'Российская Премьер-Лига',
//         currentSeason: {
//           id: 'season-2025',
//           isActive: false,
//           statObject: {
//             name: 'РПЛ 2025/26',
//             startDate: '2025-07-01',
//             endDate: '2026-05-31',
//             year: '2025'
//           }
//         }
//       };

//       const result = formatter.formatTournamentToText(tournament);
//       assert.strictEqual(result, '🏆 Российская Премьер-Лига\n\n📅 Сезон РПЛ 2025/26 не начат');
//     });

//     it('should format tournament with season but no statObject', () => {
//       const tournament: Tournament = {
//         id: 'rpl-2024',
//         metaTitle: 'Российская Премьер-Лига',
//         currentSeason: {
//           id: 'season-2024',
//           isActive: false,
//           statObject: {
//             name: 'РПЛ 2024/25',
//             startDate: '2024-07-01',
//             endDate: '2025-05-31',
//             year: '2024'
//           }
//         }
//       };

//       const result = formatter.formatTournamentToText(tournament);
//       assert.strictEqual(result, '🏆 Российская Премьер-Лига\n\n📅 Сезон РПЛ 2024/25 закончен');
//     });

//     it('should handle edge cases gracefully', () => {
//       const tournament: Tournament = {
//         id: 'test-tournament',
//         metaTitle: 'Тест Турнир',
//         currentSeason: {
//           id: 'test-season',
//           isActive: true,
//           statObject: {
//             name: '',
//             startDate: '2024-01-01',
//             endDate: '2024-12-31',
//             year: '2024'
//           }
//         }
//       };

//       const result = formatter.formatTournamentToText(tournament);
//       assert.strictEqual(result, '🏆 Тест Турнир\n\n📅 Сезон  идет');
//     });
//   });
// });
