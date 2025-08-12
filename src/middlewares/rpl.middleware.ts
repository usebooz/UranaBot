import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';
import { fantasyService } from '../services/fantasy.service.js';

/**
 * Middleware для проверки текущего сезона РПЛ
 * Пропускает только если есть активный сезон
 */
export async function rplReadMiddleware(
  ctx: MyContext,
  next: () => Promise<void>,
): Promise<void> {
  const rpl = await fantasyService.readRplTournament();
  if (rpl && fantasyService.hasTournamentActiveSeason(rpl)) {
    ctx.rpl = rpl;
    await next();
  } else {
    logger.info(`RPL not found`);
  }
}
