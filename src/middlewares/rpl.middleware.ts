import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';
import { fantasyService } from '../services/fantasy.service.js';

/**
 * Middleware for checking current RPL season status
 * Only proceeds if there is an active RPL season
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
