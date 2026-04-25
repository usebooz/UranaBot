import { beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { FantasyRepository } from '../../src/repositories/fantasy.repository.js';
import { FantasyRatingEntityType } from '../../src/gql/generated/graphql.js';
import { sportsIntegrationConfig } from './setup/index.js';

describe('Sports API Integration Tests', () => {
  let repository: FantasyRepository;

  beforeEach(() => {
    repository = new FantasyRepository();
  });

  it(
    'executes GetTournament against fantasyQueries.tournament',
    { timeout: 15000 },
    async () => {
      const tournament = await repository.getTournament(
        sportsIntegrationConfig.tournamentWebname,
      );

      assert.ok(
        tournament,
        'expected tournament data for configured SPORTS_TOURNAMENT_RPL',
      );
      assert.strictEqual(typeof tournament.id, 'string');
      assert.strictEqual(typeof tournament.metaTitle, 'string');
      assert.ok(tournament.metaTitle.length > 0);
      assert.ok(
        tournament.currentSeason,
        'expected currentSeason for configured tournament',
      );
      assert.strictEqual(typeof tournament.currentSeason.id, 'string');
      assert.strictEqual(typeof tournament.currentSeason.isActive, 'boolean');
      assert.ok(
        tournament.currentSeason.statObject?.name,
        'expected currentSeason.statObject.name',
      );
    },
  );

  it(
    'executes GetLeague against fantasyQueries.league',
    { timeout: 15000 },
    async () => {
      const league = await repository.getLeague(
        sportsIntegrationConfig.leagueId,
      );

      assert.ok(
        league,
        `expected league data for fixture id ${sportsIntegrationConfig.leagueId}`,
      );
      assert.strictEqual(league.id, sportsIntegrationConfig.leagueId);
      assert.strictEqual(typeof league.name, 'string');
      assert.ok(league.name.length > 0);
      assert.strictEqual(typeof league.type, 'string');
      assert.strictEqual(typeof league.totalSquadsCount, 'number');
      assert.ok(
        league.season,
        'expected season data for integration fixture league',
      );
      assert.strictEqual(typeof league.season.id, 'string');
      assert.strictEqual(typeof league.season.isActive, 'boolean');
      assert.strictEqual(
        league.season.tournament?.webName,
        sportsIntegrationConfig.tournamentWebname,
        'expected league season tournament webName to match configured tournament',
      );
      assert.ok(Array.isArray(league.season.tours));
    },
  );

  it(
    'executes GetLeagueSquads against fantasyQueries.rating.squads',
    { timeout: 15000 },
    async () => {
      const tournament = await repository.getTournament(
        sportsIntegrationConfig.tournamentWebname,
      );

      assert.ok(
        tournament?.currentSeason?.id,
        'expected currentSeason.id for configured tournament fixture',
      );

      const squads = await repository.getLeagueSquads(
        sportsIntegrationConfig.leagueId,
        FantasyRatingEntityType.Season,
        tournament.currentSeason.id,
      );

      assert.ok(Array.isArray(squads), 'expected squads list array');
      assert.ok(
        squads.length > 0,
        `expected at least one squad for fixture league ${sportsIntegrationConfig.leagueId} and current season ${tournament.currentSeason.id}`,
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
