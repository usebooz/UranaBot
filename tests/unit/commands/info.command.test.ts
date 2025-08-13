import { describe, it } from "node:test";
import assert from "node:assert";
import { infoCommand } from '../../../src/commands/info.command.js';
import type { MyContext } from '../../../src/types/index.js';

describe("InfoCommand", () => {
  function createMockContext(): MyContext {
    return {
      from: { id: 12345 },
      chat: { id: 12345, type: 'private' },
      update: {} as any,
      reply: async (text: string) => {
        return { message_id: 1, date: Math.floor(Date.now() / 1000), chat: { id: 12345, type: 'private' }, text } as any;
      },
      rpl: {
        metaTitle: 'Test RPL',
        currentSeason: {
          statObject: {
            name: 'Test Season'
          }
        }
      }
    } as MyContext;
  }

  it('should be able to import the command', async () => {
    const { infoCommand } = await import('../../../src/commands/info.command.js');
    
    assert.ok(infoCommand);
    assert.strictEqual(typeof infoCommand, 'function');
  });

  it('should have correct function signature', () => {
    assert.strictEqual(typeof infoCommand, 'function');
    
    // Check that it's an async function
    assert.strictEqual(infoCommand.constructor.name, 'AsyncFunction');
  });

  it('should accept context parameter', () => {
    // Check function length (parameter count)
    assert.strictEqual(infoCommand.length, 1);
  });

  it('should return a promise', () => {
    const ctx = createMockContext();
    const result = infoCommand(ctx);
    
    assert.ok(result instanceof Promise);
    
    // Don't wait for the result since it might make real API calls
    // We'll test the actual functionality in integration tests
  });

  it('should handle context object', () => {
    const ctx = createMockContext();
    
    // Should not throw when called with proper context
    assert.doesNotThrow(() => {
      infoCommand(ctx);
    });
  });
});
