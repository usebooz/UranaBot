const testEnv = {
  BOT_TOKEN: 'test-bot-token',
  SPORTS_API_URL: 'https://sports-api.test',
  SPORTS_API_PATH: '/graphql',
  SPORTS_TOURNAMENT_RPL: 'rpl',
  TELEGRAM_URL: 'https://t.me/test_bot',
  URANAWEB_APP_URL: 'https://uranaweb.test',
  URANAWEB_APP_PATH: '/app',
};

for (const [key, value] of Object.entries(testEnv)) {
  process.env[key] = value;
}
