import type { MyContext } from '../types';
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
