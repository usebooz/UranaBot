import { logger } from '../utils/logger';
import type { MyContext } from '../types';

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
