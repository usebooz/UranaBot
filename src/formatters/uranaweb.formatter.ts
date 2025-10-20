import { InlineKeyboard } from 'grammy';
import { config } from '../utils/config.js';
import { InlineKeyboardMarkup } from 'grammy/types';
import { League } from '../gql/index.js';
import { MyContext } from '../types/context.type.js';

/**
 * Base interface for UranaWeb formatters
 */
interface IUranaWebFormatter {
  /**
   * Creates a button for debugging the mini app
   */
  createDebugButton(): InlineKeyboardMarkup;
  /**
   * Creates a button to view league information
   * @param league - league object
   */
  createLeagueButton(league: NonNullable<League>): InlineKeyboardMarkup;
}

/**
 * Constants for button labels
 */
const BUTTON_LABELS = {
  DEBUG: 'Дебаг Приложения',
  LEAGUE: 'Посмотреть Лигу',
} as const;

/**
 * Factory for creating appropriate formatter based on chat type
 */
export class UranaWebFormatterFactory {
  /**
   * Creates formatter instance based on chat privacy
   * @param ctx - The bot context containing league information
   * @returns appropriate formatter instance
   */
  static create(ctx: MyContext): IUranaWebFormatter {
    if (ctx.chat?.type === 'private') {
      return new UranaWebPrivateFormatter(
        config.uranaWebAppUrl + config.uranaWebAppPath,
      );
    } else {
      return new UranaWebGroupFormatter(
        config.telegramUrl + ctx.me.username + '/',
      );
    }
  }
}

/**
 * Formatter for working with the UranaWeb web application for private chats
 */
class UranaWebPrivateFormatter {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  createDebugButton(): InlineKeyboardMarkup {
    return new InlineKeyboard().webApp(
      BUTTON_LABELS.DEBUG,
      this.baseUrl + 'debug/',
    );
  }

  createLeagueButton(league: NonNullable<League>): InlineKeyboardMarkup {
    return new InlineKeyboard().webApp(
      BUTTON_LABELS.LEAGUE,
      this.baseUrl + 'fantasy/league/' + league.id,
    );
  }
}

/**
 * Formatter for working with the UranaWeb web application for groups
 */
class UranaWebGroupFormatter {
  protected readonly baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  createDebugButton(): InlineKeyboardMarkup {
    return new InlineKeyboard().url(
      BUTTON_LABELS.DEBUG,
      this.baseUrl + 'debug',
    );
  }

  createLeagueButton(league: NonNullable<League>): InlineKeyboardMarkup {
    return new InlineKeyboard().url(
      BUTTON_LABELS.LEAGUE,
      this.baseUrl + 'league' + '?startapp=' + league.id,
    );
  }
}
