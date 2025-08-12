import type { MyContext } from '../types/index.js';
import { uranaWebFormatter } from '../formatters/uranaweb.formatter.js';

/**
 * Command to display technical information about the bot
 * Sends a JSON representation of the bot's context to the user
 * @param ctx - The bot context containing technical details
 */
export async function debugCommand(ctx: MyContext): Promise<void> {
  await ctx.reply(JSON.stringify(ctx.me, null, 2), {
    reply_markup: uranaWebFormatter.createDebugButton(),
  });
}
