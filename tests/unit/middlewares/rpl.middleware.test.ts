import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createRplReadMiddleware } from '../../../src/middlewares/rpl.middleware.js';
import type { MyContext } from '../../../src/types/index.js';

describe('RplMiddleware', () => {
  const tournament = {
    id: 'russia',
    currentSeason: { isActive: true },
  };

  it('stores active RPL tournament in context and calls next', async () => {
    let nextCalled = false;
    const middleware = createRplReadMiddleware({
      readRplTournament: async () => tournament as never,
      hasTournamentActiveSeason: rpl => rpl === tournament,
    });
    const ctx = { update: {} } as MyContext;

    await middleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(ctx.rpl, tournament);
    assert.strictEqual(nextCalled, true);
  });

  it('does not call next when RPL tournament is missing', async () => {
    let nextCalled = false;
    const middleware = createRplReadMiddleware({
      readRplTournament: async () => null,
      hasTournamentActiveSeason: () => false,
    });
    const ctx = { update: {} } as MyContext;

    await middleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(ctx.rpl, undefined);
    assert.strictEqual(nextCalled, false);
  });

  it('does not call next when RPL season is inactive', async () => {
    let nextCalled = false;
    const middleware = createRplReadMiddleware({
      readRplTournament: async () => tournament as never,
      hasTournamentActiveSeason: () => false,
    });
    const ctx = { update: {} } as MyContext;

    await middleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(ctx.rpl, undefined);
    assert.strictEqual(nextCalled, false);
  });
});
