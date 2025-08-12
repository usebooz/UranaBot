import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';
import { fantasyService } from '../services/fantasy.service.js';

/**
 *
 * Only for league command
 */
export async function leagueReadMiddleware(
  ctx: MyContext,
  next: () => Promise<void>,
): Promise<void> {
  let leagueId;
  if (ctx.match && typeof ctx.match === 'string') {
    leagueId = ctx.match;
  } else {
    leagueId = ctx.session.leagueId;
  }

  let league;
  if (leagueId) {
    league = await fantasyService.readLeague(leagueId);
  }

  if (league && fantasyService.isLeagueFromActiveRplSeason(league)) {
    ctx.league = league;
    ctx.session.leagueId = ctx.league.id;
    await next();
  } else {
    logger.info(`League not found`);
  }
}
