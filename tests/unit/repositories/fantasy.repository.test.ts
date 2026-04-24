import { afterEach, beforeEach, describe, it } from 'node:test';
import assert from 'node:assert';
import { FantasyRepository } from '../../../src/repositories/fantasy.repository.js';
import { FantasyRatingEntityType } from '../../../src/gql/generated/graphql.js';
import type { SportsGraphQLClient } from '../../../src/repositories/sports.repository.js';
import type { RequestDocument, Variables } from 'graphql-request';
import { logger } from '../../../src/utils/logger.js';

describe('FantasyRepository', () => {
  let requests: Array<{ query: RequestDocument; variables?: Variables }>;
  let originalLogger: typeof logger;

  function createRepository(response: unknown): FantasyRepository {
    const client: SportsGraphQLClient = {
      request: async <T>(
        query: RequestDocument,
        variables?: Variables,
      ): Promise<T> => {
        requests.push({ query, variables });
        return response as T;
      },
    };

    return new FantasyRepository(client);
  }

  beforeEach(() => {
    requests = [];
    originalLogger = { ...logger };
    Object.assign(logger, {
      debug: () => {},
      error: () => {},
    });
  });

  afterEach(() => {
    Object.assign(logger, originalLogger);
  });

  it('returns tournament data from the Sports.ru response', async () => {
    const tournament = { id: 'russia', metaTitle: 'RPL' };
    const repository = createRepository({
      fantasyQueries: { tournament },
    });

    const result = await repository.getTournament('russia');

    assert.strictEqual(result, tournament);
    assert.deepStrictEqual(requests[0].variables, { id: 'russia' });
  });

  it('returns null when tournament data is missing', async () => {
    const repository = createRepository({
      fantasyQueries: { tournament: null },
    });

    const result = await repository.getTournament('missing');

    assert.strictEqual(result, null);
  });

  it('returns league data from the Sports.ru response', async () => {
    const league = { id: '29915', name: 'Test League' };
    const repository = createRepository({
      fantasyQueries: { league },
    });

    const result = await repository.getLeague('29915');

    assert.strictEqual(result, league);
    assert.deepStrictEqual(requests[0].variables, { id: '29915' });
  });

  it('returns null when league data is missing', async () => {
    const repository = createRepository({
      fantasyQueries: { league: null },
    });

    const result = await repository.getLeague('missing');

    assert.strictEqual(result, null);
  });

  it('returns league squads from the rating response', async () => {
    const squads = [
      {
        squad: { id: '1', name: 'Squad 1' },
        scoreInfo: { place: 1, score: 10 },
      },
    ];
    const repository = createRepository({
      fantasyQueries: { rating: { squads: { list: squads } } },
    });

    const result = await repository.getLeagueSquads(
      '29915',
      FantasyRatingEntityType.Season,
      '59',
    );

    assert.strictEqual(result, squads);
    assert.deepStrictEqual(requests[0].variables, {
      leagueId: '29915',
      entityType: FantasyRatingEntityType.Season,
      entityId: '59',
    });
  });

  it('returns an empty squads list when rating data is missing', async () => {
    const repository = createRepository({
      fantasyQueries: { rating: null },
    });

    const result = await repository.getLeagueSquads(
      '29915',
      FantasyRatingEntityType.Season,
      '59',
    );

    assert.deepStrictEqual(result, []);
  });

  it('returns null or empty data when the GraphQL client rejects', async () => {
    const repository = new FantasyRepository({
      request: async (): Promise<never> => {
        throw new Error('Network failure');
      },
    });

    assert.strictEqual(await repository.getTournament('russia'), null);
    assert.strictEqual(await repository.getLeague('29915'), null);
    assert.deepStrictEqual(
      await repository.getLeagueSquads(
        '29915',
        FantasyRatingEntityType.Season,
        '59',
      ),
      [],
    );
  });
});
