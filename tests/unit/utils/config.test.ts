import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { validateConfig } from '../../../src/utils/config.js';

describe('Config', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Сохраняем оригинальные переменные окружения
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    // Восстанавливаем оригинальные переменные окружения
    process.env = originalEnv;
  });

  it('should load valid configuration from environment variables', () => {
    // Устанавливаем тестовые переменные окружения
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.NODE_ENV = 'production';
    process.env.LOG_LEVEL = 'debug';

    const config = validateConfig();

    assert.strictEqual(config.botToken, 'test-bot-token');
    assert.strictEqual(config.sportsApiUrl, 'https://test-sports-api.com');
    assert.strictEqual(config.sportsTournamentRpl, 'test-tournament-rpl');
    assert.strictEqual(config.uranaWebAppUrl, 'https://test-uranaweb.com');
    assert.strictEqual(config.environment, 'production');
    assert.strictEqual(config.logLevel, 'debug');
  });

  it('should use default values for optional environment variables', () => {
    // Устанавливаем только обязательные переменные
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    // NODE_ENV и LOG_LEVEL не устанавливаем
    delete process.env.NODE_ENV;
    delete process.env.LOG_LEVEL;

    const config = validateConfig();

    assert.strictEqual(config.environment, 'development');
    assert.strictEqual(config.logLevel, 'info');
  });

  it('should throw error when BOT_TOKEN is missing', () => {
    // Удаляем BOT_TOKEN
    delete process.env.BOT_TOKEN;
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';

    assert.throws(
      () => validateConfig(),
      /BOT_TOKEN environment variable is required/
    );
  });

  it('should throw error when SPORTS_API_URL is missing', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    delete process.env.SPORTS_API_URL;
    process.env.SPORTS_API_PATH = '/graphql/';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.URANAWEB_APP_PATH = '/TestApp/#/';

    assert.throws(
      () => validateConfig(),
      /SPORTS_API_URL and SPORTS_API_PATH environment variables are required/
    );
  });

  it('should throw error when SPORTS_TOURNAMENT_RPL is missing', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    delete process.env.SPORTS_TOURNAMENT_RPL;
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';

    assert.throws(
      () => validateConfig(),
      /SPORTS_TOURNAMENT_RPL environment variable is required/
    );
  });

  it('should throw error when URANAWEB_APP_URL is missing', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_API_PATH = '/sports-api-path';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.URANAWEB_APP_PATH = '/uranaweb-app-path';
    delete process.env.URANAWEB_APP_URL;

    assert.throws(
      () => validateConfig(),
      /URANAWEB_APP_URL and URANAWEB_APP_PATH environment variables are required/
    );
  });

  it('should accept all valid environment values', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.NODE_ENV = 'development';
    process.env.LOG_LEVEL = 'warn';

    const config = validateConfig();

    assert.strictEqual(config.environment, 'development');
    assert.strictEqual(config.logLevel, 'warn');
  });

  it('should handle all log level values', () => {
    const logLevels: Array<'debug' | 'info' | 'warn' | 'error'> = ['debug', 'info', 'warn', 'error'];
    
    for (const logLevel of logLevels) {
      process.env.BOT_TOKEN = 'test-bot-token';
      process.env.SPORTS_API_URL = 'https://test-sports-api.com';
      process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
      process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
      process.env.LOG_LEVEL = logLevel;

      const config = validateConfig();
      assert.strictEqual(config.logLevel, logLevel);
    }
  });

  it('should load exported config constant', async () => {
    // Тест для экспортированной константы config
    const { config } = await import('../../../src/utils/config.js');
    
    assert.ok(config);
    assert.ok(typeof config.botToken === 'string');
    assert.ok(typeof config.sportsApiUrl === 'string');
    assert.ok(typeof config.sportsTournamentRpl === 'string');
    assert.ok(typeof config.uranaWebAppUrl === 'string');
    assert.ok(['development', 'production'].includes(config.environment));
    assert.ok(['debug', 'info', 'warn', 'error'].includes(config.logLevel));
  });
});
