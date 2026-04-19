import { describe, it } from 'node:test';
import assert from 'node:assert';
import { debugCommand } from '../../../src/commands/debug.command.js';
import type { MyContext } from '../../../src/types/index.js';

describe('DebugCommand', () => {
  it('replies with bot info as formatted JSON and debug markup', async () => {
    let replyMessage = '';
    let replyOptions: { reply_markup?: unknown } = {};
    const botInfo = {
      id: 456,
      is_bot: true,
      first_name: 'DebugBot',
      username: 'debugbot',
    };
    const ctx = {
      me: botInfo,
      chat: { id: 1, type: 'private' },
      reply: async (message: string, options?: typeof replyOptions) => {
        replyMessage = message;
        replyOptions = options ?? {};
        return { message_id: 1 };
      },
    } as unknown as MyContext;

    await debugCommand(ctx);

    assert.deepStrictEqual(JSON.parse(replyMessage), botInfo);
    assert.ok(replyOptions.reply_markup);
  });
});
