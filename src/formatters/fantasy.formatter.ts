import type { TournamentQuery } from '../gql/index.js';

// Type alias for convenience
type Tournament = TournamentQuery['fantasyQueries']['tournament'];

/**
 * Formatter for presenting Sports.ru data to users
 * Handles all text formatting and message generation for the bot
 */
export class FantasyFormatter {
  /**
   * Format tournament info for display in bot messages
   */
  formatTournamentToText(tournament: Tournament): string {
    if (!tournament) {
      return '🪦 РПЛ ВСЁ!';
    }

    let text = `🏆 ${tournament.metaTitle}` + '\n\n';

    const { currentSeason } = tournament;
    if (!currentSeason) {
      return text;
    }

    text = text + `📅 Сезон ${currentSeason.statObject.name} `;
    if (currentSeason.isActive) {
      text = text + 'идет';
    } else if (
      currentSeason.statObject?.endDate &&
      new Date(currentSeason.statObject.endDate) < new Date()
    ) {
      text = text + 'закончен';
    } else {
      text = text + 'не начат';
    }

    return text;
  }
}

// Export singleton instance
export const fantasyFormatter = new FantasyFormatter();
