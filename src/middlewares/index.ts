import { Bot } from 'grammy';
import { logger } from '../utils/logger.js';
import { loggingMiddleware } from './logging.middleware.js';
import { chatFilterMiddleware } from './filter.middleware.js';
import { sessionInitMiddleware } from './session.middleware.js';
import type { MyContext } from '../types/index.js';

export function setupMiddlewares(bot: Bot<MyContext>): void {
  // Setup bot-specific middlewares
  bot.use(loggingMiddleware);
  bot.use(chatFilterMiddleware);
  bot.use(sessionInitMiddleware);

  logger.info('Bot middlewares setup completed');
}
