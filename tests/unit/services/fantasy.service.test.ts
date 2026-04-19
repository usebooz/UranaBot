import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { FantasyService } from '../../../src/services/fantasy.service.js';
import { FantasyLeagueType, FantasyRatingEntityType } from '../../../src/gql/generated/graphql.js';
import type { FantasyRepositoryClient } from '../../../src/services/fantasy.service.js';

describe('FantasyService', () => {
  let calls: Array<{ method: string; args: unknown[] }>;

  function createService(
    overrides: Partial<FantasyRepositoryClient> = {},
  ): FantasyService {
    const repository: FantasyRepositoryClient = {
      getTournament: async (...args) => {
        calls.push({ method: 'getTournament', args });
        return { id: 'russia', currentSeason: { isActive: true } } as never;
      },
      getLeague: async (...args) => {
        calls.push({ method: 'getLeague', args });
        return { id: args[0], type: FantasyLeagueType.User } as never;
      },
      getLeagueSquads: async (...args) => {
        calls.push({ method: 'getLeagueSquads', args });
        return [{ squad: { id: '1', name: 'Squad' }, scoreInfo: { place: 1, score: 10 } }] as never;
      },
      ...overrides,
    };

    return new FantasyService(repository, 'russia');
  }

  beforeEach(() => {
    calls = [];
  });

  it('reads the configured RPL tournament from the repository', async () => {
    const tournament = { id: 'russia', metaTitle: 'RPL' };
    const service = createService({
      getTournament: async (...args) => {
        calls.push({ method: 'getTournament', args });
        return tournament as never;
      },
    });

    const result = await service.readRplTournament();

    assert.strictEqual(result, tournament);
    assert.deepStrictEqual(calls, [
      { method: 'getTournament', args: ['russia'] },
    ]);
  });

  it('reads league data from the repository by id', async () => {
    const league = { id: '29915', name: 'Test League' };
    const service = createService({
      getLeague: async (...args) => {
        calls.push({ method: 'getLeague', args });
        return league as never;
      },
    });

    const result = await service.readLeague('29915');

    assert.strictEqual(result, league);
    assert.deepStrictEqual(calls, [{ method: 'getLeague', args: ['29915'] }]);
  });

  it('reads league squads with season rating variables', async () => {
    const squads = [
      { squad: { id: '1', name: 'Squad' }, scoreInfo: { place: 1, score: 10 } },
    ];
    const service = createService({
      getLeagueSquads: async (...args) => {
        calls.push({ method: 'getLeagueSquads', args });
        return squads as never;
      },
    });

    const result = await service.readLeagueSquadsWithSeasonRating('29915', '59');

    assert.strictEqual(result, squads);
    assert.deepStrictEqual(calls, [
      {
        method: 'getLeagueSquads',
        args: ['29915', FantasyRatingEntityType.Season, '59'],
      },
    ]);
  });

  it('detects whether a tournament has an active season', () => {
    const service = createService();

    assert.strictEqual(
      service.hasTournamentActiveSeason({
        currentSeason: { isActive: true },
      } as never),
      true,
    );
    assert.strictEqual(
      service.hasTournamentActiveSeason({
        currentSeason: { isActive: false },
      } as never),
      false,
    );
    assert.strictEqual(
      service.hasTournamentActiveSeason({ currentSeason: null } as never),
      false,
    );
  });

  it('detects user leagues from the active configured RPL season', () => {
    const service = createService();

    assert.strictEqual(
      service.isLeagueFromActiveRplSeason({
        season: {
          isActive: true,
          tournament: { webName: 'russia' },
        },
      } as never),
      true,
    );
    assert.strictEqual(
      service.isLeagueFromActiveRplSeason({
        season: {
          isActive: false,
          tournament: { webName: 'russia' },
        },
      } as never),
      false,
    );
    assert.strictEqual(
      service.isLeagueFromActiveRplSeason({
        season: {
          isActive: true,
          tournament: { webName: 'england' },
        },
      } as never),
      false,
    );
  });

  it('detects user league type', () => {
    const service = createService();

    assert.strictEqual(
      service.isUserLeague({ type: FantasyLeagueType.User } as never),
      true,
    );
    assert.strictEqual(
      service.isUserLeague({ type: FantasyLeagueType.General } as never),
      false,
    );
    assert.strictEqual(service.isUserLeague({ type: null } as never), false);
  });
});
