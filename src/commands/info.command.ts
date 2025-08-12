import type { MyContext } from '../types/index.js';
import { fantasyFormatter } from '../formatters/index.js';

/**
 * Command to display current RPL (Russian Premier League) information
 * Formats the RPL data and sends it as a reply to the user
 * @param ctx - The bot context containing RPL information
 */
export async function infoCommand(ctx: MyContext): Promise<void> {
  const message = fantasyFormatter.formatRplToInfoCommand(ctx.rpl);
  await ctx.reply(message);
}
