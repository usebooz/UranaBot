import type { MyContext } from '../types/index.js';
import { fantasyRplService } from '../services/index.js';
import { fantasyFormatter } from '../formatters/index.js';

/**
 * Command to show current tournament information
 * Demonstrates the three-layer architecture:
 * - Repository: fetch data from API
 * - Service: process business logic
 * - Formatter: present data to user
 */
export async function tournamentCommand(ctx: MyContext): Promise<void> {
  const tournament = await fantasyRplService.getTournamentRpl();
  const message = fantasyFormatter.formatTournamentToText(tournament);

  await ctx.reply(message);
}
