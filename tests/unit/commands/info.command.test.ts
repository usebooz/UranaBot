import { describe, it } from 'node:test';
import assert from 'node:assert';
import { infoCommand } from '../../../src/commands/info.command.js';
import type { MyContext } from '../../../src/types/index.js';

describe('InfoCommand', () => {
  it('replies with formatted RPL tournament information', async () => {
    let replyMessage = '';
    const ctx = {
      rpl: {
        metaTitle: 'Russian Premier League',
        currentSeason: {
          statObject: {
            name: 'Season 2025/26',
          },
        },
      },
      reply: async (message: string) => {
        replyMessage = message;
        return { message_id: 1 };
      },
    } as unknown as MyContext;

    await infoCommand(ctx);

    assert.match(replyMessage, /Russian Premier League/);
    assert.match(replyMessage, /Season 2025\/26/);
  });
});
