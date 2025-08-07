import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import type { MyContext } from '../../src/types';
import { tournamentCommand } from '../../src/commands/tournament.command';

// Mock services and formatters
jest.mock('../../src/services', () => ({
  fantasyRplService: {
    getTournamentRpl: jest.fn(),
  },
}));

jest.mock('../../src/formatters', () => ({
  fantasyFormatter: {
    formatTournamentToText: jest.fn(),
  },
}));

// Import mocked dependencies
import { fantasyRplService } from '../../src/services';
import { fantasyFormatter } from '../../src/formatters';

const mockFantasyRplService = fantasyRplService as jest.Mocked<typeof fantasyRplService>;
const mockFantasyFormatter = fantasyFormatter as jest.Mocked<typeof fantasyFormatter>;

describe('tournamentCommand', () => {
  let mockContext: jest.Mocked<MyContext>;

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup context mock
    mockContext = {
      reply: jest.fn(),
    } as any;
  });

  describe('execute', () => {
    it('should reply with formatted tournament data when tournament exists', async () => {
      const mockTournament = {
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
      const formattedText = '🇷🇺 РПЛ 2024/25\n📅 01.08.2024 - 30.05.2025\n✅ Активный сезон';

      mockFantasyRplService.getTournamentRpl.mockResolvedValue(mockTournament);
      mockFantasyFormatter.formatTournamentToText.mockReturnValue(formattedText);

      await tournamentCommand(mockContext);

      expect(mockFantasyRplService.getTournamentRpl).toHaveBeenCalledTimes(1);
      expect(mockFantasyFormatter.formatTournamentToText).toHaveBeenCalledWith(mockTournament);
      expect(mockContext.reply).toHaveBeenCalledWith(formattedText);
    });

    it('should reply with formatted message when tournament is null', async () => {
      const formattedText = 'Турнир не найден 🤷‍♂️';

      mockFantasyRplService.getTournamentRpl.mockResolvedValue(null);
      mockFantasyFormatter.formatTournamentToText.mockReturnValue(formattedText);

      await tournamentCommand(mockContext);

      expect(mockFantasyRplService.getTournamentRpl).toHaveBeenCalledTimes(1);
      expect(mockFantasyFormatter.formatTournamentToText).toHaveBeenCalledWith(null);
      expect(mockContext.reply).toHaveBeenCalledWith(formattedText);
    });

    it('should handle service error and let formatter decide message', async () => {
      const errorMessage = 'Произошла ошибка при получении данных 😞';

      mockFantasyRplService.getTournamentRpl.mockRejectedValue(new Error('Service error'));
      mockFantasyFormatter.formatTournamentToText.mockReturnValue(errorMessage);

      // tournamentCommand doesn't handle errors, it lets them bubble up
      // but we can test what would happen if it did handle them
      await expect(tournamentCommand(mockContext)).rejects.toThrow('Service error');

      expect(mockFantasyRplService.getTournamentRpl).toHaveBeenCalledTimes(1);
      expect(mockFantasyFormatter.formatTournamentToText).not.toHaveBeenCalled();
    });

    it('should handle formatter error', async () => {
      const mockTournament = {
        id: 'rpl-2024',
        metaTitle: 'Российская Премьер-Лига',
        currentSeason: null,
      };

      mockFantasyRplService.getTournamentRpl.mockResolvedValue(mockTournament);
      mockFantasyFormatter.formatTournamentToText.mockImplementation(() => {
        throw new Error('Formatter error');
      });

      await expect(tournamentCommand(mockContext)).rejects.toThrow('Formatter error');

      expect(mockFantasyRplService.getTournamentRpl).toHaveBeenCalledTimes(1);
      expect(mockFantasyFormatter.formatTournamentToText).toHaveBeenCalledWith(mockTournament);
    });
  });
});
