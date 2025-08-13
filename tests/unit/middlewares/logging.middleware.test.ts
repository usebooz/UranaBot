import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { loggingMiddleware } from '../../../src/middlewares/logging.middleware.js';
import type { MyContext } from '../../../src/types/index.js';

describe('LoggingMiddleware', () => {
  let logOutput: Array<{ level: string; message: string; args: unknown[] }> = [];
  let originalLogger: typeof import('../../../src/utils/logger.js').logger;

  beforeEach(async () => {
    // Clear log output
    logOutput.length = 0;
    
    // Save original logger
    const loggerModule = await import('../../../src/utils/logger.js');
    originalLogger = { ...loggerModule.logger };
    
    // Mock logger
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

  function createMockContext(overrides: Partial<MyContext> = {}): MyContext {
    const baseMessage = { 
      text: '/test command', 
      message_id: 1,
      date: Math.floor(Date.now() / 1000),
      chat: { id: 67890, type: 'private' }
    };

    return {
      from: { id: 12345, first_name: 'Test', username: 'testuser', is_bot: false },
      chat: { id: 67890, type: 'private' },
      message: baseMessage,
      update: { 
        update_id: 1,
        message: baseMessage
      } as any,
      ...overrides,
    } as MyContext;
  }

  it('should log incoming messages', async () => {
    const ctx = createMockContext();
    let nextCalled = false;

    await loggingMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    // Expect 2 logs: processing start and processing end
    assert.strictEqual(logOutput.length, 2);
    assert.strictEqual(logOutput[0].level, 'debug');
    assert.ok(logOutput[0].message.includes('Processing message from user'));
    assert.ok(logOutput[1].message.includes('message processed in'));
  });

  it('should handle messages without username', async () => {
    const messageData = {
      message_id: 1,
      text: '/test command',
      date: 1234567890,
      chat: { id: 1, type: 'private' as const, first_name: 'User', last_name: 'Test' },
      from: { id: 1, is_bot: false, first_name: 'User' }
    };
    
    const ctx = createMockContext({
      message: messageData as any,
      update: { 
        update_id: 1,
        message: messageData
      } as any
    });
    
    let nextCalled = false;

    await loggingMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    // Expect 2 logs: processing start and processing end
    assert.strictEqual(logOutput.length, 2);
    assert.ok(logOutput[0].message.includes('Processing message from user'));
    assert.ok(logOutput[1].message.includes('message processed in'));
  });

  it('should handle messages without text', async () => {
    const messageWithoutText = { 
      message_id: 1,
      date: Math.floor(Date.now() / 1000),
      chat: { id: 67890, type: 'private' as const },
      from: { id: 12345, first_name: 'Test', username: 'testuser', is_bot: false }
    };
    
    const ctx = createMockContext({
      message: messageWithoutText as any,
      update: { 
        update_id: 1,
        message: messageWithoutText
      } as any
    });
    
    let nextCalled = false;

    await loggingMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    // Expect 2 logs: processing start and processing end
    assert.strictEqual(logOutput.length, 2);
    assert.ok(logOutput[0].message.includes('Processing message from user'));
    assert.ok(logOutput[1].message.includes('message processed in'));
  });

  it('should handle different chat types', async () => {
    const groupMessage = {
      message_id: 1,
      text: '/test command',
      date: Math.floor(Date.now() / 1000),
      chat: { id: 67890, type: 'group' as const, title: 'Test Group' },
      from: { id: 12345, first_name: 'Test', username: 'testuser', is_bot: false }
    };
    
    const ctx = createMockContext({
      chat: { id: 67890, type: 'group', title: 'Test Group' },
      message: groupMessage as any,
      update: { 
        update_id: 1,
        message: groupMessage
      } as any
    });
    let nextCalled = false;

    await loggingMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    // Expect 2 logs: processing start and processing end
    assert.strictEqual(logOutput.length, 2);
    assert.ok(logOutput[0].message.includes('Processing message from user'));
    assert.ok(logOutput[1].message.includes('message processed in'));
  });

  it('should log errors from next middleware', async () => {
    const ctx = createMockContext();
    const testError = new Error('Test error');

    try {
      await loggingMiddleware(ctx, async () => {
        throw testError;
      });
      assert.fail('Should have thrown an error');
    } catch (error) {
      assert.strictEqual(error, testError);
      // Expect 2 logs: processing start and error log
      assert.strictEqual(logOutput.length, 2);
      assert.strictEqual(logOutput[0].level, 'debug');
      assert.strictEqual(logOutput[1].level, 'error');
      assert.ok(logOutput[1].message.includes('Error processing'));
    }
  });

  it('should handle missing message object', async () => {
    const ctx = createMockContext({
      message: undefined,
      update: { update_id: 1 } as any // No message property in update
    });
    let nextCalled = false;

    await loggingMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    // Expect 2 logs: processing start and processing end  
    assert.strictEqual(logOutput.length, 2);
    assert.ok(logOutput[0].message.includes('Processing other'));
  });

  it('should propagate errors without swallowing them', async () => {
    const ctx = createMockContext();
    const testError = new Error('Propagation test');

    let errorThrown = false;
    try {
      await loggingMiddleware(ctx, async () => {
        throw testError;
      });
    } catch (error) {
      errorThrown = true;
      assert.strictEqual(error, testError);
    }

    assert.strictEqual(errorThrown, true);
  });
});
