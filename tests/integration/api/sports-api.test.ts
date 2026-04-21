import { beforeEach, describe, test } from 'node:test';
import assert from 'node:assert';
import { FantasyRepository } from '../../../src/repositories/fantasy.repository.js';
import { config } from '../../../src/utils/config.js';
import { FantasyRatingEntityType } from '../../../src/gql/generated/graphql.js';

const VALID_LEAGUE_ID = '29915';
const VALID_SEASON_ID = '59';

function integrationTestsEnabled(): boolean {
  return !process.env.SKIP_INTEGRATION_TESTS;
}

describe('Sports API Integration Tests', () => {
  let repository: FantasyRepository;

  beforeEach(() => {
    repository = new FantasyRepository();
  });

  test(
    'executes GetTournament against fantasyQueries.tournament',
    { timeout: 15000 },
    async () => {
      if (!integrationTestsEnabled()) {
        return;
      }

      const tournament = await repository.getTournament(config.sportsTournamentRpl);

      assert.ok(tournament, 'expected tournament data for configured SPORTS_TOURNAMENT_RPL');
      assert.strictEqual(typeof tournament.id, 'string');
      assert.strictEqual(typeof tournament.metaTitle, 'string');
      assert.ok(tournament.metaTitle.length > 0);
      assert.ok(tournament.currentSeason, 'expected currentSeason for configured tournament');
      assert.strictEqual(typeof tournament.currentSeason.id, 'string');
      assert.strictEqual(typeof tournament.currentSeason.isActive, 'boolean');
      assert.ok(
        tournament.currentSeason.statObject?.name,
        'expected currentSeason.statObject.name',
      );
    },
  );

  test(
    'executes GetLeague against fantasyQueries.league',
    { timeout: 15000 },
    async () => {
      if (!integrationTestsEnabled()) {
        return;
      }

      const league = await repository.getLeague(VALID_LEAGUE_ID);

      assert.ok(league, `expected league data for fixture id ${VALID_LEAGUE_ID}`);
      assert.strictEqual(league.id, VALID_LEAGUE_ID);
      assert.strictEqual(typeof league.name, 'string');
      assert.ok(league.name.length > 0);
      assert.strictEqual(typeof league.type, 'string');
      assert.strictEqual(typeof league.totalSquadsCount, 'number');
      assert.ok(league.season, 'expected season data for integration fixture league');
      assert.strictEqual(typeof league.season.id, 'string');
      assert.strictEqual(typeof league.season.isActive, 'boolean');
      assert.strictEqual(
        league.season.tournament?.webName,
        config.sportsTournamentRpl,
        'expected league season tournament webName to match configured tournament',
      );
      assert.ok(Array.isArray(league.season.tours));
    },
  );

  test(
    'executes GetLeagueSquads against fantasyQueries.rating.squads',
    { timeout: 15000 },
    async () => {
      if (!integrationTestsEnabled()) {
        return;
      }

      const squads = await repository.getLeagueSquads(
        VALID_LEAGUE_ID,
        FantasyRatingEntityType.Season,
        VALID_SEASON_ID,
      );

      assert.ok(Array.isArray(squads), 'expected squads list array');
      assert.ok(
        squads.length > 0,
        `expected at least one squad for fixture league ${VALID_LEAGUE_ID} and season ${VALID_SEASON_ID}`,
      );

      const firstSquad = squads[0];
      assert.ok(firstSquad?.squad, 'expected squad payload');
      assert.strictEqual(typeof firstSquad.squad.id, 'string');
      assert.strictEqual(typeof firstSquad.squad.name, 'string');
      assert.ok(firstSquad.squad.name.length > 0);
      assert.ok(firstSquad?.scoreInfo, 'expected scoreInfo payload');
      assert.strictEqual(typeof firstSquad.scoreInfo.place, 'number');
      assert.strictEqual(typeof firstSquad.scoreInfo.score, 'number');
    },
  );
});
