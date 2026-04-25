import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createUserLeagueReadMiddleware } from '../../../src/middlewares/league.middleware.js';
import { FantasyLeagueType } from '../../../src/gql/generated/graphql.js';
import type { MyContext } from '../../../src/types/index.js';

describe('LeagueMiddleware', () => {
  const validLeague = {
    id: 'league-1',
    type: FantasyLeagueType.User,
    season: {
      isActive: true,
      tournament: { webName: 'russia' },
    },
  };

  function createContext(overrides: Partial<MyContext> = {}): MyContext {
    return {
      update: {} as never,
      session: {},
      ...overrides,
    } as MyContext;
  }

  it('loads a valid league from command match, stores it in context and session, then calls next', async () => {
    const readLeagueCalls: string[] = [];
    let nextCalled = false;
    const middleware = createUserLeagueReadMiddleware({
      readLeague: async id => {
        readLeagueCalls.push(id);
        return validLeague as never;
      },
      isUserLeague: league => league?.type === FantasyLeagueType.User,
      isLeagueFromActiveRplSeason: league =>
        !!league?.season?.isActive &&
        league.season.tournament.webName === 'russia',
    });
    const ctx = createContext({
      match: 'league-1',
      session: {},
    } as Partial<MyContext>);

    await middleware(ctx, async () => {
      nextCalled = true;
    });

    assert.deepStrictEqual(readLeagueCalls, ['league-1']);
    assert.strictEqual(ctx.league, validLeague);
    assert.strictEqual(ctx.session.leagueId, 'league-1');
    assert.strictEqual(nextCalled, true);
  });

  it('uses session league id when command match is not a string', async () => {
    const readLeagueCalls: string[] = [];
    let nextCalled = false;
    const middleware = createUserLeagueReadMiddleware({
      readLeague: async id => {
        readLeagueCalls.push(id);
        return validLeague as never;
      },
      isUserLeague: () => true,
      isLeagueFromActiveRplSeason: () => true,
    });
    const ctx = createContext({
      match: undefined,
      session: { leagueId: 'session-league' },
    } as Partial<MyContext>);

    await middleware(ctx, async () => {
      nextCalled = true;
    });

    assert.deepStrictEqual(readLeagueCalls, ['session-league']);
    assert.strictEqual(nextCalled, true);
  });

  it('does not call next or read the API when no league id exists', async () => {
    let readLeagueCalled = false;
    let nextCalled = false;
    const middleware = createUserLeagueReadMiddleware({
      readLeague: async () => {
        readLeagueCalled = true;
        return validLeague as never;
      },
      isUserLeague: () => true,
      isLeagueFromActiveRplSeason: () => true,
    });
    const ctx = createContext({ session: {} });

    await middleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(readLeagueCalled, false);
    assert.strictEqual(nextCalled, false);
    assert.strictEqual(ctx.league, undefined);
  });

  it('does not call next when the league is missing or invalid', async () => {
    const cases = [
      {
        name: 'missing league',
        league: null,
        isUserLeague: false,
        isLeagueFromActiveRplSeason: false,
      },
      {
        name: 'not user league',
        league: { ...validLeague, type: FantasyLeagueType.General },
        isUserLeague: false,
        isLeagueFromActiveRplSeason: true,
      },
      {
        name: 'not active RPL league',
        league: validLeague,
        isUserLeague: true,
        isLeagueFromActiveRplSeason: false,
      },
    ];

    for (const testCase of cases) {
      let nextCalled = false;
      const middleware = createUserLeagueReadMiddleware({
        readLeague: async () => testCase.league as never,
        isUserLeague: () => testCase.isUserLeague,
        isLeagueFromActiveRplSeason: () => testCase.isLeagueFromActiveRplSeason,
      });
      const ctx = createContext({
        match: testCase.name,
        session: {},
      } as Partial<MyContext>);

      await middleware(ctx, async () => {
        nextCalled = true;
      });

      assert.strictEqual(nextCalled, false, testCase.name);
      assert.strictEqual(ctx.league, undefined, testCase.name);
      assert.strictEqual(ctx.session.leagueId, undefined, testCase.name);
    }
  });
});
