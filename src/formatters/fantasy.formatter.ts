import type { TournamentQuery } from '../gql';

// Type alias for convenience
type Tournament = NonNullable<TournamentQuery['fantasyQueries']['tournament']>;

/**
 * Formatter for presenting Sports.ru data to users
 * Handles all text formatting and message generation for the bot
 */
export class TournamentFormatter {
  /**
   * Format tournament info for display in bot messages
   */
  formatTournament(tournament: Tournament): string {
    const { currentSeason } = tournament;

    if (!currentSeason) {
      return `🏆 ${tournament.metaTitle}\n❌ Нет активного сезона`;
    }

    const { currentTour, statObject } = currentSeason;

    if (!currentTour) {
      return `🏆 ${tournament.metaTitle}\n📅 Сезон: ${statObject.name} (${statObject.year})\n❌ Нет активного тура`;
    }

    return `🏆 ${tournament.metaTitle}
📅 Сезон: ${statObject.name} (${statObject.year})
🎯 Текущий тур: ${currentTour.name}
📊 Статус: ${this.formatTourStatus(currentTour.status)}
⏰ Начало: ${this.formatDate(currentTour.startedAt)}
⏰ Окончание: ${this.formatDate(currentTour.finishedAt)}`;
  }

  /**
   * Format tournament status with appropriate emoji
   */
  private formatTourStatus(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
      case 'активен':
        return '🟢 Активен';
      case 'finished':
      case 'завершен':
        return '🔴 Завершен';
      case 'upcoming':
      case 'предстоящий':
        return '🟡 Предстоящий';
      default:
        return `⚪ ${status}`;
    }
  }

  /**
   * Format date for display
   */
  private formatDate(date: string | null | undefined): string {
    if (!date) {
      return 'Не указано';
    }

    try {
      return new Date(date).toLocaleDateString('ru-RU');
    } catch {
      return 'Некорректная дата';
    }
  }

  /**
   * Format "no data" message
   */
  formatNoTournamentMessage(): string {
    return '❌ Че за';
  }

  /**
   * Format error message for users
   */
  formatErrorMessage(error: string): string {
    return `❌ Произошла ошибка: ${error}`;
  }
}

// Export singleton instance
export const sportsRuFormatter = new TournamentFormatter();
