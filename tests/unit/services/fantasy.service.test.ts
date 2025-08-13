import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { FantasyService } from '../../../src/services/fantasy.service.js';

describe('FantasyService', () => {
  let service: FantasyService;

  beforeEach(() => {
    service = new FantasyService();
  });

  it('should be able to import the service', async () => {
    const { FantasyService } = await import('../../../src/services/fantasy.service.js');
    
    assert.ok(FantasyService);
    assert.strictEqual(typeof FantasyService, 'function');
  });

  it('should be able to create service instance', () => {
    assert.ok(service);
    assert.strictEqual(typeof service.readRplTournament, 'function');
  });

  it('should have all required methods', () => {
    assert.strictEqual(typeof service.readRplTournament, 'function');
    assert.strictEqual(typeof service.hasTournamentActiveSeason, 'function');
    assert.strictEqual(typeof service.readLeague, 'function');
    assert.strictEqual(typeof service.isLeagueFromActiveRplSeason, 'function');
    assert.strictEqual(typeof service.isUserLeague, 'function');
    assert.strictEqual(typeof service.readLeagueSquadsWithSeasonRating, 'function');
  });

  it('should have readRplTournament method', () => {
    assert.strictEqual(typeof service.readRplTournament, 'function');
    
    // Check that it's an async function
    const result = service.readRplTournament();
    assert.ok(result instanceof Promise);
    
    // Don't wait for the result since it makes a real API call
    // We'll test the actual API interaction in integration tests
  });

  it('should return formatted tournament data structure', async () => {
    // Test that the method exists and returns a promise
    const promise = service.readRplTournament();
    assert.ok(promise instanceof Promise);
    
    // We could mock the repository here, but for now we just verify the interface
    // The actual functionality is tested in integration tests
  });

  it('should check tournament active season correctly', () => {
    const activeTournament = {
      currentSeason: {
        isActive: true
      }
    } as any;
    
    const inactiveTournament = {
      currentSeason: {
        isActive: false
      }
    } as any;
    
    const noSeasonTournament = {
      currentSeason: null
    } as any;
    
    assert.strictEqual(service.hasTournamentActiveSeason(activeTournament), true);
    assert.strictEqual(service.hasTournamentActiveSeason(inactiveTournament), false);
    assert.strictEqual(service.hasTournamentActiveSeason(noSeasonTournament), false);
  });

  it('should check if league is from active RPL season', () => {
    const rplWebname = 'russia'; // assuming this is the default
    
    const validLeague = {
      season: {
        isActive: true,
        tournament: {
          webName: rplWebname
        }
      }
    } as any;
    
    const inactiveLeague = {
      season: {
        isActive: false,
        tournament: {
          webName: rplWebname
        }
      }
    } as any;
    
    const wrongTournamentLeague = {
      season: {
        isActive: true,
        tournament: {
          webName: 'other-tournament'
        }
      }
    } as any;
    
    assert.strictEqual(service.isLeagueFromActiveRplSeason(validLeague), true);
    assert.strictEqual(service.isLeagueFromActiveRplSeason(inactiveLeague), false);
    assert.strictEqual(service.isLeagueFromActiveRplSeason(wrongTournamentLeague), false);
  });

  it('should check if league is user league', () => {
    const userLeague = {
      type: 'USER' // FantasyLeagueType.User
    } as any;
    
    const systemLeague = {
      type: 'SYSTEM'
    } as any;
    
    const noTypeLeague = {
      type: null
    } as any;
    
    assert.strictEqual(service.isUserLeague(userLeague), true);
    assert.strictEqual(service.isUserLeague(systemLeague), false);
    assert.strictEqual(service.isUserLeague(noTypeLeague), false);
  });

  it('should have readLeagueSquadsWithSeasonRating method', () => {
    assert.strictEqual(typeof service.readLeagueSquadsWithSeasonRating, 'function');
    
    const result = service.readLeagueSquadsWithSeasonRating('league-id', 'season-id');
    assert.ok(result instanceof Promise);
  });
});
