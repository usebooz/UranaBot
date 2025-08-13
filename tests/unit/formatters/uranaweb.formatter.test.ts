import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert';
import { UranaWebFormatter } from '../../../src/formatters/uranaweb.formatter.js';

describe('UranaWeb Formatter', () => {
  let formatter: UranaWebFormatter;

  beforeEach(() => {
    formatter = new UranaWebFormatter();
  });

  it('should be able to import the formatter', async () => {
    const { UranaWebFormatter } = await import('../../../src/formatters/uranaweb.formatter.js');
    
    assert.ok(UranaWebFormatter);
    assert.strictEqual(typeof UranaWebFormatter, 'function');
  });

  it('should be able to create formatter instance', () => {
    assert.ok(formatter);
    assert.strictEqual(typeof formatter.createDebugButton, 'function');
    assert.strictEqual(typeof formatter.createLeagueButton, 'function');
  });

  it('should create debug button with correct structure', () => {
    const button = formatter.createDebugButton();
    
    assert.ok(button);
    assert.ok('inline_keyboard' in button);
    assert.ok(Array.isArray(button.inline_keyboard));
  });

  it('should create league button with correct structure', () => {
    const mockLeague = {
      id: 'test-league-id',
      name: 'Test League'
    } as any;
    
    const button = formatter.createLeagueButton(mockLeague);
    
    assert.ok(button);
    assert.ok('inline_keyboard' in button);
    assert.ok(Array.isArray(button.inline_keyboard));
  });

  it('should handle league button with different league IDs', () => {
    const leagues = [
      { id: '123', name: 'League 1' },
      { id: 'abc-def', name: 'League 2' },
      { id: 'special-chars_123', name: 'League 3' }
    ];
    
    leagues.forEach(league => {
      const button = formatter.createLeagueButton(league as any);
      assert.ok(button);
      assert.ok('inline_keyboard' in button);
    });
  });
});
