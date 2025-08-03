import { Bot, Context, SessionFlavor } from 'grammy';
import { logger } from '../utils/logger.js';

interface SessionData {
  messageCount: number;
}

type MyContext = Context & SessionFlavor<SessionData>;

export function setupMiddlewares(bot: Bot<MyContext>): void {
  // Middleware для логирования всех обновлений
  bot.use(async (ctx, next) => {
    const start = Date.now();

    let updateType = 'other';
    if (ctx.update.message) {
      updateType = 'message';
    } else if (ctx.update.callback_query) {
      updateType = 'callback_query';
    } else if (ctx.update.inline_query) {
      updateType = 'inline_query';
    }

    logger.debug(`Processing ${updateType} from user ${ctx.from?.id}`);

    try {
      await next();
      const duration = Date.now() - start;
      logger.debug(`${updateType} processed in ${duration}ms`);
    } catch (error) {
      const duration = Date.now() - start;
      logger.error(
        `Error processing ${updateType} after ${duration}ms:`,
        error,
      );
      throw error;
    }
  });

  // Middleware для проверки типа чата (только приватные сообщения)
  bot.use(async (ctx, next) => {
    if (ctx.chat?.type === 'private') {
      await next();
    } else {
      logger.info(`Ignoring message from non-private chat: ${ctx.chat?.type}`);
    }
  });

  // Middleware для инициализации сессии пользователя
  bot.use(async (ctx, next) => {
    if (!ctx.session) {
      ctx.session = { messageCount: 0 };
    }
    await next();
  });

  logger.info('Bot middlewares setup completed');
}
