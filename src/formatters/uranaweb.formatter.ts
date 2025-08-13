import { InlineKeyboard } from 'grammy';
import { config } from '../utils/config.js';
import { InlineKeyboardMarkup } from 'grammy/types';
import { League } from '../gql/index.js';

/**
 * Formatter for working with the UranaWeb web application
 */
export class UranaWebFormatter {
  protected readonly baseUrl: string;

  constructor() {
    this.baseUrl = config.uranaWebAppUrl;
  }

  /**
   * Creates a button for debugging the mini app
   */
  createDebugButton(): InlineKeyboardMarkup {
    return new InlineKeyboard().webApp('Debug Mini App', this.baseUrl);
  }

  /**
   * Creates a button to view league information
   * @param league - league object
   */
  createLeagueButton(league: NonNullable<League>): InlineKeyboardMarkup {
    return new InlineKeyboard().webApp(
      'Посмотреть Лигу',
      this.baseUrl + '#league/' + league.id,
    );
  }
}

// Export singleton instance
export const uranaWebFormatter = new UranaWebFormatter();
