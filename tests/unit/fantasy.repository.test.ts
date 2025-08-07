import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { FantasyRepository } from '../../src/repositories/fantasy.repository';
import { GraphQLClient } from 'graphql-request';

// Mock GraphQLClient
jest.mock('graphql-request', () => ({
  GraphQLClient: jest.fn().mockImplementation(() => ({
    request: jest.fn(),
  })),
}));

// Mock config
jest.mock('../../src/config', () => ({
  config: {
    sportsApiUrl: 'https://test-api.com/graphql',
  },
}));

const MockedGraphQLClient = GraphQLClient as jest.MockedClass<typeof GraphQLClient>;

describe('FantasyRepository', () => {
  let repository: FantasyRepository;
  let mockClient: jest.Mocked<GraphQLClient>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockClient = {
      request: jest.fn(),
    } as any;
    MockedGraphQLClient.mockImplementation(() => mockClient);
    repository = new FantasyRepository();
  });

  describe('getTournamentByWebname', () => {
    it('should return tournament data when API call succeeds', async () => {
      const mockResponse = {
        fantasyQueries: {
          tournament: {
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
          },
        },
      };

      mockClient.request.mockResolvedValue(mockResponse);

      const result = await repository.getTournamentByWebname('rpl-2024');

      expect(result).toEqual(mockResponse.fantasyQueries.tournament);
      expect(mockClient.request).toHaveBeenCalledTimes(1);
      expect(mockClient.request).toHaveBeenCalledWith(
        expect.any(Object), // TOURNAMENT_QUERY
        {
          source: 'HRU', // FantasyIdSource.Hru
          id: 'rpl-2024',
        }
      );
    });

    it('should return null when API response has no tournament', async () => {
      const mockResponse = {
        fantasyQueries: {
          tournament: null,
        },
      };

      mockClient.request.mockResolvedValue(mockResponse);

      const result = await repository.getTournamentByWebname('nonexistent');

      expect(result).toBeNull();
      expect(mockClient.request).toHaveBeenCalledTimes(1);
    });

    it('should return null when API call fails', async () => {
      mockClient.request.mockRejectedValue(new Error('Network error'));

      const result = await repository.getTournamentByWebname('rpl-2024');

      expect(result).toBeNull();
      expect(mockClient.request).toHaveBeenCalledTimes(1);
    });

    it('should return null when API response is malformed', async () => {
      const mockResponse = {
        fantasyQueries: null,
      };

      mockClient.request.mockResolvedValue(mockResponse);

      const result = await repository.getTournamentByWebname('rpl-2024');

      expect(result).toBeNull();
      expect(mockClient.request).toHaveBeenCalledTimes(1);
    });

    it('should call API with correct parameters', async () => {
      const mockResponse = {
        fantasyQueries: {
          tournament: {
            id: 'test-tournament',
            metaTitle: 'Test Tournament',
            currentSeason: null,
          },
        },
      };

      mockClient.request.mockResolvedValue(mockResponse);

      await repository.getTournamentByWebname('test-tournament');

      expect(mockClient.request).toHaveBeenCalledWith(
        expect.any(Object), // TOURNAMENT_QUERY
        {
          source: 'HRU',
          id: 'test-tournament',
        }
      );
    });
  });
});
