import dotenv from 'dotenv';

dotenv.config();

export interface TelegramTestConfig {
  apiHash: string;
  apiId: number;
  botToken: string;
  leagueId: string;
  phone: string;
  telegramUrl: string;
  webAppUrl: string;
}

export function getTelegramTestConfig(): TelegramTestConfig {
  const uranaWebAppPath = requiredEnv('URANAWEB_APP_PATH');
  const uranaWebAppUrl = requiredEnv('URANAWEB_APP_URL');

  return {
    apiHash: requiredEnv('TELEGRAM_TEST_API_HASH'),
    apiId: Number(requiredEnv('TELEGRAM_TEST_API_ID')),
    botToken: requiredEnv('BOT_TOKEN'),
    leagueId: requiredEnv('SPORTS_TEST_LEAGUE_ID'),
    phone: requiredEnv('TELEGRAM_TEST_PHONE'),
    telegramUrl: requiredEnv('TELEGRAM_URL'),
    webAppUrl: `${uranaWebAppUrl}${uranaWebAppPath}`,
  };
}

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
