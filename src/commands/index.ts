import { Bot, Context, SessionFlavor } from 'grammy';
import { logger } from '../utils/logger';

interface SessionData {
  // Пока сессия не используется, но оставляем для будущих функций
}

type MyContext = Context & SessionFlavor<SessionData>;

export function setupCommands(bot: Bot<MyContext>): void {
  // Команда /start
  bot.command('start', async ctx => {
    const welcomeMessage = 'Юрана Бот работает...';

    await ctx.reply(welcomeMessage);
    logger.info(`User ${ctx.from?.id} started the bot`);
  });

  logger.info('Bot commands setup completed');
}
