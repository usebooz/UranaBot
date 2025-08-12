import type { MyContext } from '../types/index.js';
import { fantasyFormatter, uranaWebFormatter } from '../formatters/index.js';
import { fantasyService } from '../services/fantasy.service.js';

/**
 * Handles the league command for the bot
 * Fetches league squads and formats the response for the user
 * @param ctx - The bot context containing league information
 */
export async function leagueCommand(ctx: MyContext): Promise<void> {
  const squads = await fantasyService.readLeagueSquadsWithSeasonRating(
    ctx.league.id,
    ctx.league.season.id,
  );
  const message = fantasyFormatter.formatLeagueToLeagueCommand(
    ctx.league,
    squads,
  );
  await ctx.reply(message, {
    parse_mode: 'MarkdownV2',
    reply_markup: uranaWebFormatter.createLeagueButton(ctx.league),
  });
}
