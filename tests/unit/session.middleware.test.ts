import { describe, it } from 'node:test';
import assert from 'node:assert';
import { sessionInitMiddleware } from '../../src/middlewares/session.middleware.js';
import type { MyContext } from '../../src/types/index.js';

describe('SessionInitMiddleware', () => {
  function createMockContext(hasSession = false): MyContext {
    const ctx = {
      from: { id: 12345 },
      update: {} as any,
    } as MyContext;

    if (hasSession) {
      ctx.session = { placeholder: 'test' };
    }

    return ctx;
  }

  it('should initialize empty session when session does not exist', async () => {
    const ctx = createMockContext(false);
    let nextCalled = false;

    const next = async () => {
      nextCalled = true;
    };

    await sessionInitMiddleware(ctx, next);

    assert.strictEqual(nextCalled, true);
    assert.ok(ctx.session);
    assert.strictEqual(typeof ctx.session, 'object');
    assert.strictEqual(Object.keys(ctx.session).length, 0);
  });

  it('should not modify existing session', async () => {
    const ctx = createMockContext(true);
    const originalSession = ctx.session;
    let nextCalled = false;

    const next = async () => {
      nextCalled = true;
    };

    await sessionInitMiddleware(ctx, next);

    assert.strictEqual(nextCalled, true);
    assert.strictEqual(ctx.session, originalSession);
    assert.strictEqual(ctx.session?.placeholder, 'test');
  });

  it('should call next middleware in chain', async () => {
    const ctx = createMockContext(false);
    let nextCalled = false;
    let nextCallOrder = 0;
    let middlewareCompleted = false;

    const next = async () => {
      nextCalled = true;
      nextCallOrder = 1;
    };

    await sessionInitMiddleware(ctx, next);
    middlewareCompleted = true;

    assert.strictEqual(nextCalled, true);
    assert.strictEqual(nextCallOrder, 1);
    assert.strictEqual(middlewareCompleted, true);
  });

  it('should propagate errors from next middleware', async () => {
    const ctx = createMockContext(false);
    const error = new Error('Test error from next middleware');

    const next = async () => {
      throw error;
    };

    let thrownError: Error | null = null;
    try {
      await sessionInitMiddleware(ctx, next);
    } catch (err) {
      thrownError = err as Error;
    }

    assert.strictEqual(thrownError, error);
    // Session should still be initialized even if next middleware fails
    assert.ok(ctx.session);
    assert.strictEqual(typeof ctx.session, 'object');
  });
});
