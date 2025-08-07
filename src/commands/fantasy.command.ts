import type { MyContext } from '../types';
import { sportsFantasyService } from '../services';
import { sportsRuFormatter } from '../formatters';
import { logger } from '../utils/logger';

/**
 * Command to show current tournament information
 * Demonstrates the three-layer architecture:
 * - Repository: fetch data from API
 * - Service: process business logic
 * - Formatter: present data to user
 */
export async function tournamentInfoCommand(ctx: MyContext): Promise<void> {
  try {
    // Show loading message (Presentation Layer)
    await ctx.reply(sportsRuFormatter.formatLoadingMessage());

    // Get and process data (Business Layer calls Data Layer)
    const tournament = await sportsFantasyService.getCurrentTournamentInfo();

    if (!tournament) {
      // Handle no data case (Presentation Layer)
      await ctx.editMessageText(sportsRuFormatter.formatNoDataMessage());
      return;
    }

    // Additional business logic
    const status = sportsFantasyService.getTournamentStatus(tournament);
    logger.info('Tournament status check', { status });

    // Format and send response (Presentation Layer)
    const message = sportsRuFormatter.formatTournamentInfo(tournament);
    await ctx.editMessageText(message);

    // Optional: Show warning if tournament is not active
    if (!status.isActive) {
      await ctx.reply('⚠️ Внимание: турнир находится в неактивном состоянии');
    }
  } catch (error) {
    logger.error('Tournament info command failed', { error });

    // Error handling (Presentation Layer)
    const errorMessage = sportsRuFormatter.formatErrorMessage(
      'Не удалось получить информацию о турнире',
    );
    await ctx.reply(errorMessage);
  }
}
