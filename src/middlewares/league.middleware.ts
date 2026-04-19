import { logger } from '../utils/logger.js';
import type { MyContext } from '../types/index.js';
import { fantasyService } from '../services/fantasy.service.js';
import type { FantasyService } from '../services/fantasy.service.js';

type UserLeagueReadService = Pick<
  FantasyService,
  'readLeague' | 'isUserLeague' | 'isLeagueFromActiveRplSeason'
>;

/**
 * Middleware for handling user league operations
 * Validates and loads league data for league-specific commands
 */
export function createUserLeagueReadMiddleware(
  service: UserLeagueReadService = fantasyService,
): (ctx: MyContext, next: () => Promise<void>) => Promise<void> {
  return async function userLeagueReadMiddleware(
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
      league = await service.readLeague(leagueId);
    }

    if (
      league &&
      service.isUserLeague(league) &&
      service.isLeagueFromActiveRplSeason(league)
    ) {
      ctx.league = league;
      ctx.session.leagueId = ctx.league.id;
      await next();
    } else {
      logger.info(`League not found`);
    }
  };
}

export const userLeagueReadMiddleware = createUserLeagueReadMiddleware();
