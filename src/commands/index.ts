import { Bot } from 'grammy';
import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';
import { tournamentCommand } from './tournament.command.js';

export function setupCommands(bot: Bot<MyContext>): void {
  // Setup bot commands
  bot.command('start', tournamentCommand);
  bot.command('tournament', tournamentCommand);

  logger.info('Bot commands setup completed');
}
