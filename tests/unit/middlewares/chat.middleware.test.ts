import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { chatFilterMiddleware } from '../../../src/middlewares/chat.middleware.js';
import type { MyContext } from '../../../src/types/index.js';

describe('ChatFilterMiddleware', () => {
  let logOutput: Array<{ level: string; message: string; args: unknown[] }>;
  let originalLogger: typeof import('../../../src/utils/logger.js').logger;

  beforeEach(async () => {
    logOutput = [];
    
    // Mock logger by modifying the module directly
    const loggerModule = await import('../../../src/utils/logger.js');
    originalLogger = { ...loggerModule.logger };
    
    // Replace the logger methods directly
    Object.assign(loggerModule.logger, {
      debug: (message: string, ...args: unknown[]) => {
        logOutput.push({ level: 'debug', message, args });
      },
      error: (message: string, ...args: unknown[]) => {
        logOutput.push({ level: 'error', message, args });
      },
      info: (message: string, ...args: unknown[]) => {
        logOutput.push({ level: 'info', message, args });
      },
      warn: (message: string, ...args: unknown[]) => {
        logOutput.push({ level: 'warn', message, args });
      },
    });
  });

  afterEach(async () => {
    // Restore original logger
    const loggerModule = await import('../../../src/utils/logger.js');
    Object.assign(loggerModule.logger, originalLogger);
  });

  function createMockContext(chatType: 'private' | 'group' | 'supergroup' | 'channel'): MyContext {
    return {
      from: { id: 12345 },
      chat: { id: 12345, type: chatType },
      update: {} as any,
    } as MyContext;
  }

  it('should call next for private chats', async () => {
    const ctx = createMockContext('private');
    let nextCalled = false;

    const next = async () => {
      nextCalled = true;
    };

    await chatFilterMiddleware(ctx, next);

    assert.strictEqual(nextCalled, true);
    assert.strictEqual(logOutput.length, 0); // No logging for allowed chats
  });

  it('should not call next for group chats and log the event', async () => {
    const ctx = createMockContext('group');
    let nextCalled = false;

    const next = async () => {
      nextCalled = true;
    };

    await chatFilterMiddleware(ctx, next);

    assert.strictEqual(nextCalled, false);
    assert.strictEqual(logOutput.length, 1);
    assert.strictEqual(logOutput[0].level, 'info');
    assert.ok(logOutput[0].message.includes('Ignoring message from non-private chat: group'));
  });

  it('should not call next for supergroup chats and log the event', async () => {
    const ctx = createMockContext('supergroup');
    let nextCalled = false;

    const next = async () => {
      nextCalled = true;
    };

    await chatFilterMiddleware(ctx, next);

    assert.strictEqual(nextCalled, false);
    assert.strictEqual(logOutput.length, 1);
    assert.strictEqual(logOutput[0].level, 'info');
    assert.ok(logOutput[0].message.includes('Ignoring message from non-private chat: supergroup'));
  });

  it('should not call next for channel chats and log the event', async () => {
    const ctx = createMockContext('channel');
    let nextCalled = false;

    const next = async () => {
      nextCalled = true;
    };

    await chatFilterMiddleware(ctx, next);

    assert.strictEqual(nextCalled, false);
    assert.strictEqual(logOutput.length, 1);
    assert.strictEqual(logOutput[0].level, 'info');
    assert.ok(logOutput[0].message.includes('Ignoring message from non-private chat: channel'));
  });

  it('should handle context without chat', async () => {
    const ctx = {
      from: { id: 12345 },
      chat: undefined,
      update: {} as any,
    } as unknown as MyContext;
    
    let nextCalled = false;

    const next = async () => {
      nextCalled = true;
    };

    await chatFilterMiddleware(ctx, next);

    assert.strictEqual(nextCalled, false);
    assert.strictEqual(logOutput.length, 1);
    assert.strictEqual(logOutput[0].level, 'info');
    assert.ok(logOutput[0].message.includes('Ignoring message from non-private chat: undefined'));
  });

  it('should propagate errors from next middleware in private chats', async () => {
    const ctx = createMockContext('private');
    const error = new Error('Test error from next middleware');

    const next = async () => {
      throw error;
    };

    let thrownError: Error | null = null;
    try {
      await chatFilterMiddleware(ctx, next);
    } catch (err) {
      thrownError = err as Error;
    }

    assert.strictEqual(thrownError, error);
  });
});
