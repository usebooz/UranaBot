import { describe, it } from 'node:test';
import assert from 'node:assert';
import { UranaWebFormatterFactory } from '../../../src/formatters/uranaweb.formatter.js';
import { MyContext } from '../../../src/types/context.type.js';
import { FantasyLeagueType, FantasyTourStatus } from '../../../src/gql/generated/graphql.js';

describe('UranaWeb Formatter Factory', () => {
  const mockLeague = {
    id: 'test-league-123',
    name: 'Test League',
    type: FantasyLeagueType.User,
    totalSquadsCount: 10,
    season: {
      id: 'test-season-456',
      isActive: true,
      tournament: {
        id: 'test-tournament-789',
        webName: 'test-tournament',
      },
      tours: [
        {
          id: 'test-tour-1',
          status: FantasyTourStatus.Opened,
        },
      ],
    },
  };

  it('should be able to import the formatter factory', () => {
    assert.ok(UranaWebFormatterFactory);
    assert.strictEqual(typeof UranaWebFormatterFactory.create, 'function');
  });

  it('should create private formatter for private chats', () => {
    const mockContext = {
      chat: { type: 'private', id: 123 },
      me: { username: 'test_bot' },
    } as MyContext;

    const formatter = UranaWebFormatterFactory.create(mockContext);
    assert.ok(formatter);
    assert.ok(typeof formatter.createDebugButton === 'function');
    assert.ok(typeof formatter.createLeagueButton === 'function');
  });

  it('should create group formatter for group chats', () => {
    const mockContext = {
      chat: { type: 'group', id: -123 },
      me: { username: 'test_bot' },
    } as MyContext;

    const formatter = UranaWebFormatterFactory.create(mockContext);
    assert.ok(formatter);
    assert.ok(typeof formatter.createDebugButton === 'function');
    assert.ok(typeof formatter.createLeagueButton === 'function');
  });

  it('should create debug button for private chat', () => {
    const mockContext = {
      chat: { type: 'private', id: 123 },
      me: { username: 'test_bot' },
    } as MyContext;

    const formatter = UranaWebFormatterFactory.create(mockContext);
    const button = formatter.createDebugButton();
    
    assert.ok(button);
    assert.ok(button.inline_keyboard);
    assert.strictEqual(button.inline_keyboard.length, 1);
    assert.strictEqual(button.inline_keyboard[0].length, 1);
    assert.strictEqual(button.inline_keyboard[0][0].text, 'Дебаг Приложения');
    // Check for web_app property (private chat uses WebApp)
    assert.ok('web_app' in button.inline_keyboard[0][0]);
  });

  it('should create debug button for group chat', () => {
    const mockContext = {
      chat: { type: 'group', id: -123 },
      me: { username: 'test_bot' },
    } as MyContext;

    const formatter = UranaWebFormatterFactory.create(mockContext);
    const button = formatter.createDebugButton();
    
    assert.ok(button);
    assert.ok(button.inline_keyboard);
    assert.strictEqual(button.inline_keyboard.length, 1);
    assert.strictEqual(button.inline_keyboard[0].length, 1);
    assert.strictEqual(button.inline_keyboard[0][0].text, 'Дебаг Приложения');
    // Check for url property (group chat uses URL)
    assert.ok('url' in button.inline_keyboard[0][0]);
  });

  it('should create league button for private chat', () => {
    const mockContext = {
      chat: { type: 'private', id: 123 },
      me: { username: 'test_bot' },
    } as MyContext;

    const formatter = UranaWebFormatterFactory.create(mockContext);
    const button = formatter.createLeagueButton(mockLeague);
    
    assert.ok(button);
    assert.ok(button.inline_keyboard);
    assert.strictEqual(button.inline_keyboard.length, 1);
    assert.strictEqual(button.inline_keyboard[0].length, 1);
    assert.strictEqual(button.inline_keyboard[0][0].text, 'Посмотреть Лигу');
    // Check for web_app property and URL content
    assert.ok('web_app' in button.inline_keyboard[0][0]);
    const webAppButton = button.inline_keyboard[0][0] as any;
    assert.ok(webAppButton.web_app?.url.includes('test-league-123'));
  });

  it('should create league button for group chat', () => {
    const mockContext = {
      chat: { type: 'group', id: -123 },
      me: { username: 'test_bot' },
    } as MyContext;

    const formatter = UranaWebFormatterFactory.create(mockContext);
    const button = formatter.createLeagueButton(mockLeague);
    
    assert.ok(button);
    assert.ok(button.inline_keyboard);
    assert.strictEqual(button.inline_keyboard.length, 1);
    assert.strictEqual(button.inline_keyboard[0].length, 1);
    assert.strictEqual(button.inline_keyboard[0][0].text, 'Посмотреть Лигу');
    // Check for url property and URL content
    assert.ok('url' in button.inline_keyboard[0][0]);
    const urlButton = button.inline_keyboard[0][0] as any;
    assert.ok(urlButton.url?.includes('startapp=test-league-123'));
  });
});
