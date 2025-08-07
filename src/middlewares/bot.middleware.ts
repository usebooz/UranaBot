import { logger } from '../utils/logger';
import type { MyContext } from '../types';

/**
 * Middleware для логирования всех обновлений
 * Замеряет время обработки и логирует ошибки
 */
export async function loggingMiddleware(
  ctx: MyContext,
  next: () => Promise<void>,
): Promise<void> {
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
    logger.error(`Error processing ${updateType} after ${duration}ms:`, error);
    throw error;
  }
}

/**
 * Middleware для проверки типа чата
 * Пропускает только приватные сообщения
 */
export async function chatFilterMiddleware(
  ctx: MyContext,
  next: () => Promise<void>,
): Promise<void> {
  if (ctx.chat?.type === 'private') {
    await next();
  } else {
    logger.info(`Ignoring message from non-private chat: ${ctx.chat?.type}`);
  }
}

/**
 * Middleware для инициализации сессии пользователя
 * Создает пустую сессию если она не существует
 */
export async function sessionInitMiddleware(
  ctx: MyContext,
  next: () => Promise<void>,
): Promise<void> {
  if (!ctx.session) {
    ctx.session = {};
  }
  await next();
}
