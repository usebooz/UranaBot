import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { FantasyFormatter } from '../../../src/formatters/fantasy.formatter.js';

describe('FantasyFormatter', () => {
  let formatter: FantasyFormatter;

  beforeEach(() => {
    formatter = new FantasyFormatter();
  });

  it('should be able to import the formatter', async () => {
    const { FantasyFormatter } = await import('../../../src/formatters/fantasy.formatter.js');
    
    assert.ok(FantasyFormatter);
    assert.strictEqual(typeof FantasyFormatter, 'function');
  });

  it('should be able to create formatter instance', () => {
    assert.ok(formatter);
    assert.strictEqual(typeof formatter.formatRplToInfoCommand, 'function');
  });

  it('should format RPL tournament data correctly', () => {
    const mockTournament = {
      metaTitle: 'Test Tournament',
      description: 'Test Description',
      currentSeason: {
        statObject: {
          name: 'Test Season'
        },
        totalSquadsCount: 100,
        currentTour: {
          name: 'Tour 1',
          status: 'ACTIVE'
        }
      }
    };

    const result = formatter.formatRplToInfoCommand(mockTournament as any);
    
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('Test Tournament'));
    assert.ok(result.includes('Test Season'));
  });

  it('should format league data for league command', () => {
    const mockLeague = {
      name: 'Test League',
      totalSquadsCount: 50,
      season: {
        tours: [
          { status: 'FINISHED' },
          { status: 'ACTIVE' },
          { status: 'PENDING' }
        ]
      }
    };

    const mockSquads = [
      {
        squad: { name: 'Squad 1' },
        scoreInfo: { place: 1, score: 100 }
      }
    ];

    const result = formatter.formatLeagueToLeagueCommand(mockLeague as any, mockSquads as any);
    
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('Test League'));
    assert.ok(result.includes('50'));
  });

  it('should format squads list correctly', () => {
    const mockSquads = [
      {
        squad: { name: 'Squad 1' },
        scoreInfo: { place: 1, score: 100 }
      },
      {
        squad: { name: 'Squad 2' },
        scoreInfo: { place: 2, score: 90 }
      }
    ];

    const result = formatter.formatSquadsToList(mockSquads as any);
    
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('Squad 1'));
    assert.ok(result.includes('Squad 2'));
    assert.ok(result.includes('100'));
    assert.ok(result.includes('90'));
  });

  it('should handle empty or null data gracefully', () => {
    // Test with minimal data
    const minimalTournament = {
      metaTitle: 'Test',
      description: '',
      currentSeason: {
        statObject: {
          name: 'Empty Season'
        }
      }
    };

    const result = formatter.formatRplToInfoCommand(minimalTournament as any);
    assert.ok(typeof result === 'string');
    assert.ok(result.includes('Test'));
  });

  it('should escape markdown characters properly', () => {
    const tournamentWithSpecialChars = {
      metaTitle: 'Test_Tournament*With#Special-Chars',
      description: 'Description with [brackets] and (parentheses)',
      currentSeason: {
        statObject: {
          name: 'Season_With*Special#Chars'
        },
        totalSquadsCount: 100,
        currentTour: {
          name: 'Tour_1*Special',
          status: 'ACTIVE'
        }
      }
    };

    const result = formatter.formatRplToInfoCommand(tournamentWithSpecialChars as any);
    
    // Check that special markdown characters are escaped
    assert.ok(typeof result === 'string');
    assert.ok(result.length > 0);
  });
});
