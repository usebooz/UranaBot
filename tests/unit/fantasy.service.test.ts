import { describe, it, beforeEach, mock } from 'node:test';
import assert from 'node:assert';
import { FantasyService } from '../../src/services/fantasy.service.js';

// Mock the repository module
const mockGetTournamentByWebname = mock.fn();
mock.module('../../src/repositories/fantasy.repository.js', () => ({
  fantasyRepository: {
    getTournamentByWebname: mockGetTournamentByWebname,
  },
}));

// Mock config module
mock.module('../../src/config.js', () => ({
  config: {
    sportsTournamentRpl: 'rpl-2024',
  },
}));

describe('FantasyService', () => {
  let service: FantasyService;

  beforeEach(() => {
    service = new FantasyService();
    jest.clearAllMocks();
  });

  describe('getTournamentRpl', () => {
    it('should return tournament data from repository', async () => {
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

      mockedRepository.getTournamentByWebname.mockResolvedValue(mockTournament);

      const result = await service.getTournamentRpl();

      expect(result).toEqual(mockTournament);
      expect(mockedRepository.getTournamentByWebname).toHaveBeenCalledWith('rpl-2024');
      expect(mockedRepository.getTournamentByWebname).toHaveBeenCalledTimes(1);
    });

    it('should return null when repository returns null', async () => {
      mockedRepository.getTournamentByWebname.mockResolvedValue(null);

      const result = await service.getTournamentRpl();

      expect(result).toBeNull();
      expect(mockedRepository.getTournamentByWebname).toHaveBeenCalledWith('rpl-2024');
    });

    it('should let errors bubble up when repository throws error', async () => {
      mockedRepository.getTournamentByWebname.mockRejectedValue(new Error('API Error'));

      await expect(service.getTournamentRpl()).rejects.toThrow('API Error');

      expect(mockedRepository.getTournamentByWebname).toHaveBeenCalledTimes(1);
      expect(mockedRepository.getTournamentByWebname).toHaveBeenCalledWith('rpl-2024');
    });

    it('should call repository each time (no caching)', async () => {
      const mockTournament = {
        id: 'rpl-2024',
        metaTitle: 'Российская Премьер-Лига',
        currentSeason: null,
      };

      mockedRepository.getTournamentByWebname.mockResolvedValue(mockTournament);

      // Call twice
      await service.getTournamentRpl();
      await service.getTournamentRpl();

      expect(mockedRepository.getTournamentByWebname).toHaveBeenCalledTimes(2);
    });
  });
});
