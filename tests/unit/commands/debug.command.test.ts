import { describe, it } from 'node:test';
import assert from 'node:assert';
import { debugCommand } from '../../../src/commands/debug.command.js';
import type { MyContext } from '../../../src/types/index.js';

describe('Debug Command', () => {
  it('should be able to import the command', async () => {
    const { debugCommand } = await import('../../../src/commands/debug.command.js');
    
    assert.ok(debugCommand);
    assert.strictEqual(typeof debugCommand, 'function');
  });

  it('should have correct function signature', () => {
    assert.strictEqual(typeof debugCommand, 'function');
    assert.strictEqual(debugCommand.length, 1); // ctx parameter
  });

  it('should return a promise', () => {
    const mockContext = {
      me: { id: 123, is_bot: true, first_name: 'TestBot' },
      reply: async () => ({ message_id: 1 })
    } as unknown as MyContext;
    
    const result = debugCommand(mockContext);
    assert.ok(result instanceof Promise);
  });

  it('should handle context with me property', async () => {
    let replyCalled = false;
    let replyMessage = '';
    let replyOptions: any = null;
    
    const mockContext = {
      me: { id: 123, is_bot: true, first_name: 'TestBot' },
      reply: async (message: string, options?: any) => {
        replyCalled = true;
        replyMessage = message;
        replyOptions = options;
        return { message_id: 1 };
      }
    } as unknown as MyContext;
    
    await debugCommand(mockContext);
    
    assert.strictEqual(replyCalled, true);
    assert.ok(replyMessage.includes('TestBot'));
    assert.ok(replyOptions);
    assert.ok('reply_markup' in replyOptions);
  });

  it('should format bot information as JSON', async () => {
    let replyMessage = '';
    
    const mockBot = { id: 456, is_bot: true, first_name: 'DebugBot', username: 'debugbot' };
    const mockContext = {
      me: mockBot,
      reply: async (message: string) => {
        replyMessage = message;
        return { message_id: 1 };
      }
    } as unknown as MyContext;
    
    await debugCommand(mockContext);
    
    // Should be valid JSON
    assert.doesNotThrow(() => JSON.parse(replyMessage));
    
    const parsed = JSON.parse(replyMessage);
    assert.strictEqual(parsed.id, 456);
    assert.strictEqual(parsed.first_name, 'DebugBot');
  });
});
