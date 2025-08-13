import { Bot } from 'grammy';
import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';
import { infoCommand } from './info.command.js';
import { debugCommand } from './debug.command.js';
import { leagueCommand } from './league.command.js';
import { userLeagueReadMiddleware } from '../middlewares/league.middleware.js';

/**
 * Sets up all bot commands with their respective handlers and middleware
 * @param bot - The grammY bot instance to configure
 */
export function setupCommands(bot: Bot<MyContext>): void {
  // Setup bot commands
  bot.command('info', infoCommand);
  bot.command('debug', debugCommand);
  bot.command('league', userLeagueReadMiddleware, leagueCommand);

  logger.info('Bot commands setup completed');
}
