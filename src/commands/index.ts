import { Bot } from 'grammy';
import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';
import { infoCommand } from './info.command.js';
import { debugCommand } from './debug.command.js';
import { leagueCommand } from './league.command.js';
import { leagueReadMiddleware } from '../middlewares/league.middleware.js';

export function setupCommands(bot: Bot<MyContext>): void {
  // Setup bot commands
  bot.command('info', infoCommand);
  bot.command('debug', debugCommand);
  bot.command('league', leagueReadMiddleware, leagueCommand);

  logger.info('Bot commands setup completed');
}
