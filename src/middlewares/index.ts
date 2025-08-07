import { Bot } from 'grammy';
import { logger } from '../utils/logger';
import {
  loggingMiddleware,
  chatFilterMiddleware,
  sessionInitMiddleware,
} from './bot.middleware';
import type { MyContext } from '../types';

export function setupMiddlewares(bot: Bot<MyContext>): void {
  // Setup bot-specific middlewares
  bot.use(loggingMiddleware);
  bot.use(chatFilterMiddleware);
  bot.use(sessionInitMiddleware);

  logger.info('Bot middlewares setup completed');
}

// Re-export middleware functions for direct access if needed
export {
  loggingMiddleware,
  chatFilterMiddleware,
  sessionInitMiddleware,
} from './bot.middleware';
