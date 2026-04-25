import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { FantasyFormatter } from '../../../src/formatters/fantasy.formatter.js';

describe('FantasyFormatter', () => {
  let formatter: FantasyFormatter;

  beforeEach(() => {
    formatter = new FantasyFormatter();
  });

  it('formats RPL tournament data for the info command', () => {
    const result = formatter.formatRplToInfoCommand({
      metaTitle: 'Russian Premier League',
      currentSeason: {
        statObject: {
          name: 'Season 2025/26',
        },
      },
    } as never);

    assert.strictEqual(result, '🇷🇺 Russian Premier League\n📅 Season 2025/26');
  });

  it('formats league header and squad rows for the league command', () => {
    const result = formatter.formatLeagueToLeagueCommand(
      {
        name: '#Test League',
        totalSquadsCount: 2,
        season: {
          tours: [{ status: 'FINISHED' }, { status: 'OPENED' }],
        },
      } as never,
      [
        {
          squad: { name: 'Short Name' },
          scoreInfo: { place: 1, score: 100 },
        },
        {
          squad: { name: 'Very Long Squad Name' },
          scoreInfo: { place: 12, score: 7 },
        },
      ] as never,
    );

    assert.strictEqual(
      result.text,
      [
        '📊 #Test League',
        '👥 Команд: 2',
        '⏳ 1/2 туров завершено',
        '',
        '  1 Short Name           100',
        ' 12 Very Long Squad ...    7',
      ].join('\n'),
    );
    const firstLineOffset = result.text.indexOf('  1 Short Name           100');
    const secondLineOffset = result.text.indexOf(
      ' 12 Very Long Squad ...    7',
    );

    assert.deepStrictEqual(result.entities, [
      { type: 'code', offset: firstLineOffset, length: 28 },
      { type: 'code', offset: secondLineOffset, length: 28 },
    ]);
  });

  it('keeps MarkdownV2-sensitive symbols as plain text inside code entities', () => {
    const result = formatter.formatSquadsToList([
      {
        squad: { name: 'Name`With\\Chars' },
        scoreInfo: { place: 1, score: 100 },
      },
    ] as never);

    assert.strictEqual(result[0]?.text, '  1 Name`With\\Chars      100');
    assert.deepStrictEqual(result[0]?.entities, [
      { type: 'code', offset: 0, length: 28 },
    ]);
  });

  it('formats an empty squads list as an empty string', () => {
    assert.deepStrictEqual(formatter.formatSquadsToList([]), []);
  });
});
