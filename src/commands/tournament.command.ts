import type { MyContext } from '../types';
import { fantasyRplService } from '../services';
import { fantasyFormatter } from '../formatters';

/**
 * Command to show current tournament information
 * Demonstrates the three-layer architecture:
 * - Repository: fetch data from API
 * - Service: process business logic
 * - Formatter: present data to user
 */
export async function tournamentCommand(ctx: MyContext): Promise<void> {
  const tournament = await fantasyRplService.getTournament();
  const message = fantasyFormatter.formatTournamentToText(tournament);

  await ctx.reply(message);
}
