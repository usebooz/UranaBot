import { describe, it } from 'node:test';
import assert from 'node:assert';
import { createLeagueCommand } from '../../../src/commands/league.command.js';
import type { MyContext } from '../../../src/types/index.js';

describe('LeagueCommand', () => {
  const league = {
    id: 'league-1',
    name: 'Test League',
    totalSquadsCount: 2,
    season: {
      id: 'season-1',
      tours: [{ status: 'FINISHED' }, { status: 'OPENED' }],
    },
  };
  const squads = [
    {
      squad: { id: 'squad-1', name: 'Squad One' },
      scoreInfo: { place: 1, score: 42 },
    },
  ];

  it('reads league squads and replies with formatted MarkdownV2 message', async () => {
    const calls: Array<{ leagueId: string; seasonId: string }> = [];
    let replyMessage = '';
    let replyOptions: { parse_mode?: string; reply_markup?: unknown } = {};
    const replyMarkup = { inline_keyboard: [[{ text: 'Open', url: 'https://example.com' }]] };
    const command = createLeagueCommand({
      fantasyService: {
        readLeagueSquadsWithSeasonRating: async (leagueId, seasonId) => {
          calls.push({ leagueId, seasonId });
          return squads as never;
        },
      },
      uranaWebFormatterFactory: {
        create: () => ({
          createDebugButton: () => replyMarkup,
          createLeagueButton: commandLeague => {
            assert.strictEqual(commandLeague, league);
            return replyMarkup;
          },
        }),
      },
    });
    const ctx = {
      league,
      reply: async (message: string, options?: typeof replyOptions) => {
        replyMessage = message;
        replyOptions = options ?? {};
        return { message_id: 1 };
      },
    } as unknown as MyContext;

    await command(ctx);

    assert.deepStrictEqual(calls, [
      { leagueId: 'league-1', seasonId: 'season-1' },
    ]);
    assert.match(replyMessage, /Test League/);
    assert.match(replyMessage, /Squad One/);
    assert.strictEqual(replyOptions.parse_mode, 'MarkdownV2');
    assert.strictEqual(replyOptions.reply_markup, replyMarkup);
  });

  it('propagates service errors so bot error handling can process them', async () => {
    const error = new Error('Sports API failed');
    const command = createLeagueCommand({
      fantasyService: {
        readLeagueSquadsWithSeasonRating: async () => {
          throw error;
        },
      },
      uranaWebFormatterFactory: {
        create: () => ({
          createDebugButton: () => ({ inline_keyboard: [] }),
          createLeagueButton: () => ({ inline_keyboard: [] }),
        }),
      },
    });

    await assert.rejects(
      () => command({ league } as unknown as MyContext),
      error,
    );
  });
});
