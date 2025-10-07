import { Bot } from 'grammy';
import { logger } from '../utils/logger.js';
import { loggingMiddleware } from './logging.middleware.js';
// import { chatFilterMiddleware } from './chat.middleware.js';
import { sessionInitMiddleware } from './session.middleware.js';
import type { MyContext } from '../types/index.js';
import { rplReadMiddleware } from './rpl.middleware.js';

export function setupMiddlewares(bot: Bot<MyContext>): void {
  // Setup bot-specific middlewares
  bot.use(loggingMiddleware);
  // bot.use(chatFilterMiddleware);
  bot.use(sessionInitMiddleware);
  bot.use(rplReadMiddleware);

  logger.info('Bot middlewares setup completed');
}

export * from './league.middleware.js';
