import { FormattedString } from '@grammyjs/parse-mode';
import type { League, LeagueSquads, Tournament } from '../gql/index.js';

/**
 * Formatter for presenting Sports.ru data to users
 * Handles all text formatting and message generation for the bot
 */
export class FantasyFormatter {
  /**
   * Formats RPL (Russian Premier League) data for the info command
   * @param rpl - The tournament data to format
   * @returns A formatted string containing RPL information
   */
  formatRplToInfoCommand(rpl: NonNullable<Tournament>): string {
    return (
      `🇷🇺 ${rpl.metaTitle}` + '\n' + `📅 ${rpl.currentSeason?.statObject.name}`
    );
  }

  /**
   * Formats league data for the league command
   * @param league - The league data to format
   * @param squads - The squads data associated with the league
   * @returns A formatted string containing league information and squads
   */
  formatLeagueToLeagueCommand(
    league: NonNullable<League>,
    squads: LeagueSquads,
  ): FormattedString {
    const finishedTourscount = league.season.tours.filter(
      tour => tour.status === 'FINISHED',
    ).length;
    const totalToursCount = league.season.tours.length;
    const header =
      `📊 ${league.name}` +
      '\n' +
      `👥 Команд: ${league?.totalSquadsCount}` +
      '\n' +
      `⏳ ${finishedTourscount}/${totalToursCount} туров завершено`;
    const list = this.formatSquadsToList(squads);

    if (list.length === 0) {
      return new FormattedString(header);
    }

    return new FormattedString(header)
      .plain('\n\n')
      .concat(FormattedString.join(list, '\n'));
  }

  /**
   * Formats squads array to monospaced text with proper alignment
   * Trims long squad names and aligns place, name, and score columns
   * @param squads - Array of squad data to format
   * @returns Formatted string with aligned squad information
   */
  formatSquadsToList(squads: LeagueSquads): FormattedString[] {
    return squads.map(squad => {
      const place = squad.scoreInfo.place.toString().padStart(3, ' ');
      const name =
        squad.squad.name.length > 19
          ? squad.squad.name.slice(0, 16) + '...'
          : squad.squad.name.padEnd(19, ' ');
      const score = squad.scoreInfo.score.toString().padStart(4, ' ');

      return FormattedString.code(`${place} ${name} ${score}`);
    });
  }
}

// Export singleton instance
export const fantasyFormatter = new FantasyFormatter();
