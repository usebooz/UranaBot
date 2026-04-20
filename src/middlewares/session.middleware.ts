import type { MyContext } from '../types/index.js';
/**
 * Initializes user session data.
 * Creates an empty session when one does not exist.
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
