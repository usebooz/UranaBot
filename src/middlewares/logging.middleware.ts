import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';

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
