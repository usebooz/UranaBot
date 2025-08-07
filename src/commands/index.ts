import { Bot } from 'grammy';
import { logger } from '../utils/logger';
import type { MyContext } from '../types';
import { tournamentCommand } from './tournament.command';

export function setupCommands(bot: Bot<MyContext>): void {
  // Setup bot commands
  bot.command('start', tournamentCommand);
  bot.command('tournament', tournamentCommand);

  logger.info('Bot commands setup completed');
}
