import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';
import { fantasyService } from '../services/fantasy.service.js';

/**
 * Middleware for handling user league operations
 * Validates and loads league data for league-specific commands
 */
export async function userLeagueReadMiddleware(
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

  if (
    league &&
    fantasyService.isUserLeague(league) &&
    fantasyService.isLeagueFromActiveRplSeason(league)
  ) {
    ctx.league = league;
    ctx.session.leagueId = ctx.league.id;
    await next();
  } else {
    logger.info(`League not found`);
  }
}
