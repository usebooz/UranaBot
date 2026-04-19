import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';
import { fantasyService } from '../services/fantasy.service.js';
import type { FantasyService } from '../services/fantasy.service.js';

type RplReadService = Pick<
  FantasyService,
  'readRplTournament' | 'hasTournamentActiveSeason'
>;

/**
 * Middleware for checking current RPL season status
 * Only proceeds if there is an active RPL season
 */
export function createRplReadMiddleware(
  service: RplReadService = fantasyService,
): (ctx: MyContext, next: () => Promise<void>) => Promise<void> {
  return async function rplReadMiddleware(
    ctx: MyContext,
    next: () => Promise<void>,
  ): Promise<void> {
    const rpl = await service.readRplTournament();
    if (rpl && service.hasTournamentActiveSeason(rpl)) {
      ctx.rpl = rpl;
      await next();
    } else {
      logger.info(`RPL not found`);
    }
  };
}

export const rplReadMiddleware = createRplReadMiddleware();
