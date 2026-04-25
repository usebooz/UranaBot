import type { MyContext } from '../types/index.js';
import {
  fantasyFormatter,
  UranaWebFormatterFactory,
} from '../formatters/index.js';
import { fantasyService } from '../services/fantasy.service.js';
import type { FantasyService } from '../services/fantasy.service.js';

interface LeagueCommandDependencies {
  fantasyService: Pick<FantasyService, 'readLeagueSquadsWithSeasonRating'>;
  uranaWebFormatterFactory: typeof UranaWebFormatterFactory;
}

const defaultDependencies: LeagueCommandDependencies = {
  fantasyService,
  uranaWebFormatterFactory: UranaWebFormatterFactory,
};

/**
 * Handles the league command for the bot
 * Fetches league squads and formats the response for the user
 * @param ctx - The bot context containing league information
 */
export function createLeagueCommand(
  dependencies: LeagueCommandDependencies = defaultDependencies,
): (ctx: MyContext) => Promise<void> {
  return async function leagueCommand(ctx: MyContext): Promise<void> {
    const squads =
      await dependencies.fantasyService.readLeagueSquadsWithSeasonRating(
        ctx.league.id,
        ctx.league.season.id,
      );
    const message = fantasyFormatter.formatLeagueToLeagueCommand(
      ctx.league,
      squads,
    );
    const uranaWebFormatter = dependencies.uranaWebFormatterFactory.create(ctx);
    await ctx.reply(message.text, {
      entities: message.entities,
      reply_markup: uranaWebFormatter.createLeagueButton(ctx.league),
    });
  };
}

export const leagueCommand = createLeagueCommand();
