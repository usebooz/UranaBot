import { Bot } from 'grammy';
import { logger } from '../utils/logger';
import type { MyContext } from '../types';

export function setupCommands(bot: Bot<MyContext>): void {
  // Команда /start
  bot.command('start', async ctx => {
    const welcomeMessage = 'Юрана Бот работает...';

    await ctx.reply(welcomeMessage);
    logger.info(`User ${ctx.from?.id} started the bot`);
  });

  logger.info('Bot commands setup completed');
}
