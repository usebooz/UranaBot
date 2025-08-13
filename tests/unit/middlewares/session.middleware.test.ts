import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sessionInitMiddleware } from '../../../src/middlewares/session.middleware.js';
import type { MyContext } from '../../../src/types/index.js';

describe('SessionInitMiddleware', () => {
  function createMockContext(hasSession = false): MyContext {
    const ctx = {
      from: { id: 12345, first_name: 'Test', is_bot: false },
      chat: { id: 67890, type: 'private', first_name: 'Test' },
      update: {} as any,
    } as MyContext;
    
    if (hasSession) {
      ctx.session = {
        leagueId: 'test-league-id',
      };
    }
    
    return ctx;
  }

  it('should be able to import the middleware', async () => {
    const { sessionInitMiddleware } = await import('../../../src/middlewares/session.middleware.js');
    
    assert.ok(sessionInitMiddleware);
    assert.strictEqual(typeof sessionInitMiddleware, 'function');
  });

  it('should have correct function signature', () => {
    assert.strictEqual(typeof sessionInitMiddleware, 'function');
    assert.strictEqual(sessionInitMiddleware.length, 2); // ctx and next parameters
  });

  it('should initialize session when not present', async () => {
    const ctx = createMockContext(false);
    let nextCalled = false;

    await sessionInitMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    assert.ok(ctx.session);
    assert.strictEqual(typeof ctx.session, 'object');
  });

  it('should not overwrite existing session', async () => {
    const ctx = createMockContext(true);
    const originalSession = ctx.session;
    let nextCalled = false;

    await sessionInitMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    assert.strictEqual(ctx.session, originalSession);
  });

  it('should call next middleware', async () => {
    const ctx = createMockContext();
    let nextCalled = false;

    await sessionInitMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
  });

  it('should propagate errors from next middleware', async () => {
    const ctx = createMockContext();
    const testError = new Error('Test error');

    try {
      await sessionInitMiddleware(ctx, async () => {
        throw testError;
      });
      assert.fail('Should have thrown an error');
    } catch (error) {
      assert.strictEqual(error, testError);
    }
  });

  it('should initialize session with correct structure', async () => {
    const ctx = createMockContext(false);
    
    await sessionInitMiddleware(ctx, async () => {});

    assert.ok(ctx.session);
    assert.strictEqual(typeof ctx.session, 'object');
  });
});
