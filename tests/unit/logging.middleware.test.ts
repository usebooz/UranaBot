import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { loggingMiddleware } from '../../src/middlewares/logging.middleware.js';
import type { MyContext } from '../../src/types/index.js';

describe('LoggingMiddleware', () => {
  let logOutput: Array<{ level: string; message: string; args: unknown[] }>;
  let originalLogger: typeof import('../../src/utils/logger.js').logger;

  beforeEach(async () => {
    logOutput = [];
    
    // Mock logger by modifying the module directly
    const loggerModule = await import('../../src/utils/logger.js');
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
    const loggerModule = await import('../../src/utils/logger.js');
    Object.assign(loggerModule.logger, originalLogger);
  });

  function createMockContext(updateType: 'message' | 'callback_query' | 'inline_query' | 'other'): MyContext {
    const baseCtx = {
      from: { id: 12345 },
      update: {} as any,
    } as MyContext;

    switch (updateType) {
      case 'message':
        baseCtx.update.message = { 
          message_id: 1, 
          date: Math.floor(Date.now() / 1000),
          chat: { id: 12345, type: 'private' },
          text: 'test' 
        } as any;
        break;
      case 'callback_query':
        baseCtx.update.callback_query = { 
          id: 'test', 
          from: { id: 12345 },
          chat_instance: 'test',
          data: 'test' 
        } as any;
        break;
      case 'inline_query':
        baseCtx.update.inline_query = { 
          id: 'test', 
          from: { id: 12345 },
          offset: '0',
          query: 'test' 
        } as any;
        break;
      default:
        // other type - no specific update field
        break;
    }

    return baseCtx;
  }

  it('should log message processing with timing', async () => {
    const ctx = createMockContext('message');
    let nextCalled = false;

    const next = async () => {
      nextCalled = true;
      // Simulate some processing time
      await new Promise(resolve => setTimeout(resolve, 10));
    };

    await loggingMiddleware(ctx, next);

    assert.strictEqual(nextCalled, true);
    assert.strictEqual(logOutput.length, 2);
    
    // Check start log
    assert.strictEqual(logOutput[0].level, 'debug');
    assert.ok(logOutput[0].message.includes('Processing message from user 12345'));
    
    // Check completion log
    assert.strictEqual(logOutput[1].level, 'debug');
    assert.ok(logOutput[1].message.includes('message processed in'));
    assert.ok(logOutput[1].message.includes('ms'));
  });

  it('should log callback_query processing', async () => {
    const ctx = createMockContext('callback_query');
    const next = async () => {};

    await loggingMiddleware(ctx, next);

    assert.ok(logOutput[0].message.includes('Processing callback_query from user 12345'));
    assert.ok(logOutput[1].message.includes('callback_query processed in'));
  });

  it('should log inline_query processing', async () => {
    const ctx = createMockContext('inline_query');
    const next = async () => {};

    await loggingMiddleware(ctx, next);

    assert.ok(logOutput[0].message.includes('Processing inline_query from user 12345'));
    assert.ok(logOutput[1].message.includes('inline_query processed in'));
  });

  it('should log other update types', async () => {
    const ctx = createMockContext('other');
    const next = async () => {};

    await loggingMiddleware(ctx, next);

    assert.ok(logOutput[0].message.includes('Processing other from user 12345'));
    assert.ok(logOutput[1].message.includes('other processed in'));
  });

  it('should log errors and re-throw them', async () => {
    const ctx = createMockContext('message');
    const error = new Error('Test error');

    const next = async () => {
      throw error;
    };

    let thrownError: Error | null = null;
    try {
      await loggingMiddleware(ctx, next);
    } catch (err) {
      thrownError = err as Error;
    }

    assert.strictEqual(thrownError, error);
    assert.strictEqual(logOutput.length, 2);
    
    // Check start log
    assert.strictEqual(logOutput[0].level, 'debug');
    assert.ok(logOutput[0].message.includes('Processing message'));
    
    // Check error log
    assert.strictEqual(logOutput[1].level, 'error');
    assert.ok(logOutput[1].message.includes('Error processing message after'));
    assert.ok(logOutput[1].message.includes('ms:'));
    assert.strictEqual(logOutput[1].args[0], error);
  });

  it('should handle context without user', async () => {
    const ctx = {
      update: { message: { text: 'test' } },
      from: undefined,
    } as unknown as MyContext;

    const next = async () => {};

    await loggingMiddleware(ctx, next);

    assert.ok(logOutput[0].message.includes('Processing message from user undefined'));
  });
});
