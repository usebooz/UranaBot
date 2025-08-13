import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';

/**
 * Middleware for filtering chat types
 * Only allows private messages to proceed
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
