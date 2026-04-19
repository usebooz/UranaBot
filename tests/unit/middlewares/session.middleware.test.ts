import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sessionInitMiddleware } from '../../../src/middlewares/session.middleware.js';
import type { MyContext } from '../../../src/types/index.js';

describe('SessionInitMiddleware', () => {
  function createMockContext(hasSession = false): MyContext {
    const ctx = {
      from: { id: 12345, first_name: 'Test', is_bot: false },
      chat: { id: 67890, type: 'private', first_name: 'Test' },
      update: {} as never,
    } as MyContext;

    if (hasSession) {
      ctx.session = {
        leagueId: 'test-league-id',
      };
    }

    return ctx;
  }

  it('initializes session when it is missing and calls next', async () => {
    const ctx = createMockContext(false);
    let nextCalled = false;

    await sessionInitMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    assert.deepStrictEqual(ctx.session, {});
  });

  it('does not overwrite an existing session', async () => {
    const ctx = createMockContext(true);
    const originalSession = ctx.session;
    let nextCalled = false;

    await sessionInitMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    assert.strictEqual(ctx.session, originalSession);
    assert.deepStrictEqual(ctx.session, { leagueId: 'test-league-id' });
  });

  it('propagates errors from next middleware', async () => {
    const ctx = createMockContext();
    const testError = new Error('Test error');

    await assert.rejects(
      () =>
        sessionInitMiddleware(ctx, async () => {
          throw testError;
        }),
      testError,
    );
  });

  it('keeps initialized session when next middleware throws', async () => {
    const ctx = createMockContext();
    const testError = new Error('Test error');

    await assert.rejects(
      () =>
        sessionInitMiddleware(ctx, async () => {
          assert.deepStrictEqual(ctx.session, {});
          throw testError;
        }),
      testError,
    );

    assert.deepStrictEqual(ctx.session, {});
  });
});
