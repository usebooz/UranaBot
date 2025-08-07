import { describe, it, expect, beforeEach } from "@jest/globals";
import { FantasyFormatter } from '../../src/formatters/fantasy.formatter';
import type { TournamentQuery } from '../../src/gql';

type Tournament = TournamentQuery['fantasyQueries']['tournament'];

describe("FantasyFormatter", () => {
  let formatter: FantasyFormatter;

  beforeEach(() => {
    formatter = new FantasyFormatter();
  });

  describe('formatTournamentToText', () => {
    it('should return "🪦 РПЛ ВСЁ!" when tournament is null', () => {
      const result = formatter.formatTournamentToText(null);
      expect(result).toBe('🪦 РПЛ ВСЁ!');
    });

    it('should return "🪦 РПЛ ВСЁ!" when tournament is undefined', () => {
      const result = formatter.formatTournamentToText(undefined as any);
      expect(result).toBe('🪦 РПЛ ВСЁ!');
    });

    it('should format tournament with no current season', () => {
      const tournament: Tournament = {
        id: 'rpl-2024',
        metaTitle: 'Российская Премьер-Лига',
        currentSeason: null,
      };

      const result = formatter.formatTournamentToText(tournament);
      expect(result).toBe('🏆 Российская Премьер-Лига\n\n');
    });

    it('should format tournament with active season', () => {
      const tournament: Tournament = {
        id: 'rpl-2024',
        metaTitle: 'Российская Премьер-Лига',
        currentSeason: {
          id: 'season-2024',
          isActive: true,
          statObject: {
            name: 'РПЛ 2024/25',
            year: '2024',
            startDate: '2024-08-01',
            endDate: '2025-05-30',
          },
        },
      };

      const result = formatter.formatTournamentToText(tournament);
      expect(result).toBe('🏆 Российская Премьер-Лига\n\n📅 Сезон РПЛ 2024/25 идет');
    });

    it('should format tournament with finished season', () => {
      const pastDate = new Date('2023-05-30').toISOString();
      const tournament: Tournament = {
        id: 'rpl-2023',
        metaTitle: 'Российская Премьер-Лига',
        currentSeason: {
          id: 'season-2023',
          isActive: false,
          statObject: {
            name: 'РПЛ 2022/23',
            year: '2023',
            startDate: '2022-08-01',
            endDate: pastDate,
          },
        },
      };

      const result = formatter.formatTournamentToText(tournament);
      expect(result).toBe('🏆 Российская Премьер-Лига\n\n📅 Сезон РПЛ 2022/23 закончен');
    });

    it('should format tournament with future season (not started)', () => {
      const futureDate = new Date('2025-08-01').toISOString();
      const tournament: Tournament = {
        id: 'rpl-2025',
        metaTitle: 'Российская Премьер-Лига',
        currentSeason: {
          id: 'season-2025',
          isActive: false,
          statObject: {
            name: 'РПЛ 2025/26',
            year: '2025',
            startDate: futureDate,
            endDate: '2026-05-30',
          },
        },
      };

      const result = formatter.formatTournamentToText(tournament);
      expect(result).toBe('🏆 Российская Премьер-Лига\n\n📅 Сезон РПЛ 2025/26 не начат');
    });

    it('should format tournament with inactive season and no end date', () => {
      const tournament: Tournament = {
        id: 'rpl-2024',
        metaTitle: 'Российская Премьер-Лига',
        currentSeason: {
          id: 'season-2024',
          isActive: false,
          statObject: {
            name: 'РПЛ 2024/25',
            year: '2024',
            startDate: '2024-08-01',
            endDate: null as any,
          },
        },
      };

      const result = formatter.formatTournamentToText(tournament);
      expect(result).toBe('🏆 Российская Премьер-Лига\n\n📅 Сезон РПЛ 2024/25 не начат');
    });

    it('should handle edge cases with empty season name', () => {
      const tournament: Tournament = {
        id: 'test',
        metaTitle: 'Тест Турнир',
        currentSeason: {
          id: 'test-season',
          isActive: true,
          statObject: {
            name: '',
            year: '2024',
            startDate: '2024-08-01',
            endDate: '2025-05-30',
          },
        },
      };

      const result = formatter.formatTournamentToText(tournament);
      expect(result).toBe('🏆 Тест Турнир\n\n📅 Сезон  идет');
    });
  });
});
