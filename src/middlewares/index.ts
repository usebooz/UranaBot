import { Bot } from 'grammy';
import { logger } from '../utils/logger';
import { loggingMiddleware } from './logging.middleware';
import { chatFilterMiddleware } from './filter.middleware';
import { sessionInitMiddleware } from './session.middleware';
import type { MyContext } from '../types';

export function setupMiddlewares(bot: Bot<MyContext>): void {
  // Setup bot-specific middlewares
  bot.use(loggingMiddleware);
  bot.use(chatFilterMiddleware);
  bot.use(sessionInitMiddleware);

  logger.info('Bot middlewares setup completed');
}
