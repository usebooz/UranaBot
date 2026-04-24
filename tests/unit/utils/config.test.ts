import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import { validateConfig } from '../../../src/utils/config.js';

describe('Config', () => {
  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    // Preserve the original environment variables.
    originalEnv = { ...process.env };
  });

  afterEach(() => {
    // Restore the original environment variables.
    process.env = originalEnv;
  });

  it('should load valid configuration from environment variables', () => {
    // Set test environment variables.
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_API_PATH = '/test-api-path';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.TELEGRAM_URL = 'https://t.me/test_bot';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.URANAWEB_APP_PATH = '/test-app-path';
    process.env.NODE_ENV = 'production';
    process.env.LOG_LEVEL = 'debug';

    const config = validateConfig();

    assert.strictEqual(config.botToken, 'test-bot-token');
    assert.strictEqual(config.sportsApiUrl, 'https://test-sports-api.com');
    assert.strictEqual(config.sportsApiPath, '/test-api-path');
    assert.strictEqual(config.sportsTournamentRpl, 'test-tournament-rpl');
    assert.strictEqual(config.telegramUrl, 'https://t.me/test_bot');
    assert.strictEqual(config.uranaWebAppUrl, 'https://test-uranaweb.com');
    assert.strictEqual(config.uranaWebAppPath, '/test-app-path');
    assert.strictEqual(config.environment, 'production');
    assert.strictEqual(config.logLevel, 'debug');
  });

  it('should use default values for optional environment variables', () => {
    // Set only required environment variables.
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_API_PATH = '/test-api-path';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.TELEGRAM_URL = 'https://t.me/test_bot';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.URANAWEB_APP_PATH = '/test-app-path';
    // Leave NODE_ENV and LOG_LEVEL unset.
    delete process.env.NODE_ENV;
    delete process.env.LOG_LEVEL;

    const config = validateConfig();

    assert.strictEqual(config.environment, 'development');
    assert.strictEqual(config.logLevel, 'info');
  });

  it('should throw error when BOT_TOKEN is missing', () => {
    // Remove BOT_TOKEN.
    delete process.env.BOT_TOKEN;
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_API_PATH = '/test-api-path';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.TELEGRAM_URL = 'https://t.me/test_bot';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.URANAWEB_APP_PATH = '/test-app-path';

    assert.throws(
      () => validateConfig(),
      /BOT_TOKEN environment variable is required/,
    );
  });

  it('should throw error when SPORTS_API_URL is missing', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    // Remove SPORTS_API_URL.
    delete process.env.SPORTS_API_URL;
    process.env.SPORTS_API_PATH = '/test-api-path';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.TELEGRAM_URL = 'https://t.me/test_bot';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.URANAWEB_APP_PATH = '/test-app-path';

    assert.throws(
      () => validateConfig(),
      /SPORTS_API_URL and SPORTS_API_PATH environment variables are required/,
    );
  });

  it('should throw error when SPORTS_API_PATH is missing', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    // Remove SPORTS_API_PATH.
    delete process.env.SPORTS_API_PATH;
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.TELEGRAM_URL = 'https://t.me/test_bot';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.URANAWEB_APP_PATH = '/test-app-path';

    assert.throws(
      () => validateConfig(),
      /SPORTS_API_URL and SPORTS_API_PATH environment variables are required/,
    );
  });

  it('should throw error when SPORTS_TOURNAMENT_RPL is missing', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_API_PATH = '/test-api-path';
    delete process.env.SPORTS_TOURNAMENT_RPL;
    process.env.TELEGRAM_URL = 'https://t.me/test_bot';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.URANAWEB_APP_PATH = '/test-app-path';

    assert.throws(
      () => validateConfig(),
      /SPORTS_TOURNAMENT_RPL environment variable is required/,
    );
  });

  it('should throw error when TELEGRAM_URL is missing', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_API_PATH = '/test-api-path';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    delete process.env.TELEGRAM_URL;
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.URANAWEB_APP_PATH = '/test-app-path';

    assert.throws(
      () => validateConfig(),
      /TELEGRAM_URL environment variable is required/,
    );
  });

  it('should throw error when URANAWEB_APP_URL is missing', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_API_PATH = '/test-api-path';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.TELEGRAM_URL = 'https://t.me/test_bot';
    delete process.env.URANAWEB_APP_URL;

    assert.throws(
      () => validateConfig(),
      /URANAWEB_APP_URL and URANAWEB_APP_PATH environment variables are required/,
    );
  });

  it('should accept all valid environment values', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_API_PATH = '/test-api-path';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.TELEGRAM_URL = 'https://t.me/test_bot';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.URANAWEB_APP_PATH = '/test-app-path';
    process.env.NODE_ENV = 'development';
    process.env.LOG_LEVEL = 'warn';

    const config = validateConfig();

    assert.strictEqual(config.environment, 'development');
    assert.strictEqual(config.logLevel, 'warn');
  });

  it('should accept test environment value', () => {
    process.env.BOT_TOKEN = 'test-bot-token';
    process.env.SPORTS_API_URL = 'https://test-sports-api.com';
    process.env.SPORTS_API_PATH = '/test-api-path';
    process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
    process.env.TELEGRAM_URL = 'https://t.me/test_bot';
    process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
    process.env.URANAWEB_APP_PATH = '/test-app-path';
    process.env.NODE_ENV = 'test';

    const config = validateConfig();

    assert.strictEqual(config.environment, 'test');
  });

  it('should handle all log level values', () => {
    const logLevels: Array<'debug' | 'info' | 'warn' | 'error'> = [
      'debug',
      'info',
      'warn',
      'error',
    ];

    for (const logLevel of logLevels) {
      process.env.BOT_TOKEN = 'test-bot-token';
      process.env.SPORTS_API_URL = 'https://test-sports-api.com';
      process.env.SPORTS_API_PATH = '/test-api-path';
      process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament-rpl';
      process.env.TELEGRAM_URL = 'https://t.me/test_bot';
      process.env.URANAWEB_APP_URL = 'https://test-uranaweb.com';
      process.env.URANAWEB_APP_PATH = '/test-app-path';
      process.env.LOG_LEVEL = logLevel;

      const config = validateConfig();
      assert.strictEqual(config.logLevel, logLevel);
    }
  });

  it('should load exported config constant', async () => {
    // Verify the exported config constant.
    const { config } = await import('../../../src/utils/config.js');

    assert.ok(config);
    assert.ok(typeof config.botToken === 'string');
    assert.ok(typeof config.sportsApiUrl === 'string');
    assert.ok(typeof config.sportsApiPath === 'string');
    assert.ok(typeof config.sportsTournamentRpl === 'string');
    assert.ok(typeof config.telegramUrl === 'string');
    assert.ok(typeof config.uranaWebAppUrl === 'string');
    assert.ok(typeof config.uranaWebAppPath === 'string');
    assert.ok(
      ['development', 'test', 'production'].includes(config.environment),
    );
    assert.ok(['debug', 'info', 'warn', 'error'].includes(config.logLevel));
  });
});
