import type { MyContext } from '../types';
import { fantasyRplService } from '../services';
import { sportsRuFormatter } from '../formatters';

/**
 * Command to show current tournament information
 * Demonstrates the three-layer architecture:
 * - Repository: fetch data from API
 * - Service: process business logic
 * - Formatter: present data to user
 */
export async function tournamentCommand(ctx: MyContext): Promise<void> {
  const tournament = await fantasyRplService.getTournament();
  if (!tournament) {
    // Handle no data case (Presentation Layer)
    await ctx.editMessageText(sportsRuFormatter.formatNoTournamentMessage());
    return;
  }

  // Format and send response (Presentation Layer)
  const message = sportsRuFormatter.formatTournament(tournament);
  await ctx.editMessageText(message);

  // // Optional: Show warning if tournament is not active
  // if (!status.isActive) {
  //   await ctx.reply('⚠️ Внимание: турнир находится в неактивном состоянии');
  // }
}
