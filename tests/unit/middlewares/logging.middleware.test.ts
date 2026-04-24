import { afterEach, beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { loggingMiddleware } from '../../../src/middlewares/logging.middleware.js';
import type { MyContext } from '../../../src/types/index.js';

interface LogEntry {
  level: 'debug' | 'error' | 'info' | 'warn';
  message: string;
  args: unknown[];
}

describe('LoggingMiddleware', () => {
  const logOutput: LogEntry[] = [];
  let originalLogger: typeof import('../../../src/utils/logger.js').logger;

  beforeEach(async () => {
    logOutput.length = 0;

    const loggerModule = await import('../../../src/utils/logger.js');
    originalLogger = { ...loggerModule.logger };

    Object.assign(loggerModule.logger, {
      debug: (message: string, ...args: unknown[]): void => {
        logOutput.push({ level: 'debug', message, args });
      },
      error: (message: string, ...args: unknown[]): void => {
        logOutput.push({ level: 'error', message, args });
      },
      info: (message: string, ...args: unknown[]): void => {
        logOutput.push({ level: 'info', message, args });
      },
      warn: (message: string, ...args: unknown[]): void => {
        logOutput.push({ level: 'warn', message, args });
      },
    });
  });

  afterEach(async () => {
    const loggerModule = await import('../../../src/utils/logger.js');
    Object.assign(loggerModule.logger, originalLogger);
  });

  function createMockContext(overrides: Partial<MyContext> = {}): MyContext {
    const message = {
      message_id: 1,
      date: 1234567890,
      text: '/test',
      chat: { id: 67890, type: 'private' },
    };

    return {
      from: { id: 12345, first_name: 'Test', is_bot: false },
      chat: { id: 67890, type: 'private' },
      message,
      update: {
        update_id: 1,
        message,
      },
      ...overrides,
    } as MyContext;
  }

  it('logs successful message processing', async () => {
    const ctx = createMockContext();
    let nextCalled = false;

    await loggingMiddleware(ctx, async () => {
      nextCalled = true;
    });

    assert.strictEqual(nextCalled, true);
    assert.strictEqual(logOutput.length, 2);
    assert.deepStrictEqual(
      logOutput.map(entry => entry.level),
      ['debug', 'debug'],
    );
    assert.match(logOutput[0].message, /Processing message from user 12345/);
    assert.match(logOutput[1].message, /message processed in \d+ms/);
  });

  it('logs callback query updates as callback_query', async () => {
    const ctx = createMockContext({
      message: undefined,
      update: {
        update_id: 1,
        callback_query: {
          id: 'callback-id',
          from: { id: 12345, first_name: 'Test', is_bot: false },
          chat_instance: 'chat-instance',
          data: 'callback-data',
        },
      } as MyContext['update'],
    });

    await loggingMiddleware(ctx, async () => {});

    assert.strictEqual(logOutput.length, 2);
    assert.match(
      logOutput[0].message,
      /Processing callback_query from user 12345/,
    );
    assert.match(logOutput[1].message, /callback_query processed in \d+ms/);
  });

  it('logs inline query updates as inline_query', async () => {
    const ctx = createMockContext({
      message: undefined,
      update: {
        update_id: 1,
        inline_query: {
          id: 'inline-id',
          from: { id: 12345, first_name: 'Test', is_bot: false },
          query: 'search text',
          offset: '',
        },
      } as MyContext['update'],
    });

    await loggingMiddleware(ctx, async () => {});

    assert.strictEqual(logOutput.length, 2);
    assert.match(
      logOutput[0].message,
      /Processing inline_query from user 12345/,
    );
    assert.match(logOutput[1].message, /inline_query processed in \d+ms/);
  });

  it('logs other updates when the update type is not recognized', async () => {
    const ctx = createMockContext({
      message: undefined,
      update: { update_id: 1 } as MyContext['update'],
    });

    await loggingMiddleware(ctx, async () => {});

    assert.strictEqual(logOutput.length, 2);
    assert.match(logOutput[0].message, /Processing other from user 12345/);
    assert.match(logOutput[1].message, /other processed in \d+ms/);
  });

  it('logs undefined user id when ctx.from is missing', async () => {
    const ctx = createMockContext({
      from: undefined,
    });

    await loggingMiddleware(ctx, async () => {});

    assert.strictEqual(logOutput.length, 2);
    assert.match(
      logOutput[0].message,
      /Processing message from user undefined/,
    );
  });

  it('logs and rethrows errors from downstream middleware', async () => {
    const ctx = createMockContext();
    const testError = new Error('Test error');

    await assert.rejects(
      loggingMiddleware(ctx, async () => {
        throw testError;
      }),
      testError,
    );

    assert.strictEqual(logOutput.length, 2);
    assert.strictEqual(logOutput[0].level, 'debug');
    assert.strictEqual(logOutput[1].level, 'error');
    assert.match(logOutput[1].message, /Error processing message after \d+ms:/);
    assert.deepStrictEqual(logOutput[1].args, [testError]);
  });
});
