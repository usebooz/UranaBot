import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface Config {
  botToken: string;
  environment: 'development' | 'production';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  sportsApiUrl: string;
  sportsApiPath: string;
  sportsTournamentRpl: string;
  telegramUrl: string;
  uranaWebAppUrl: string;
  uranaWebAppPath: string;
}

function validateConfig(): Config {
  const botToken = process.env.BOT_TOKEN;
  if (!botToken) {
    throw new Error('BOT_TOKEN environment variable is required');
  }

  const sportsApiUrl = process.env.SPORTS_API_URL;
  const sportsApiPath = process.env.SPORTS_API_PATH;
  if (!sportsApiUrl || !sportsApiPath) {
    throw new Error(
      'SPORTS_API_URL and SPORTS_API_PATH environment variables are required',
    );
  }

  const sportsTournamentRpl = process.env.SPORTS_TOURNAMENT_RPL;
  if (!sportsTournamentRpl) {
    throw new Error('SPORTS_TOURNAMENT_RPL environment variable is required');
  }

  const telegramUrl = process.env.TELEGRAM_URL;
  if (!telegramUrl) {
    throw new Error('TELEGRAM_URL environment variable is required');
  }

  const uranaWebAppUrl = process.env.URANAWEB_APP_URL;
  const uranaWebAppPath = process.env.URANAWEB_APP_PATH;
  if (!uranaWebAppUrl || !uranaWebAppPath) {
    throw new Error(
      'URANAWEB_APP_URL and URANAWEB_APP_PATH environment variables are required',
    );
  }

  const environment =
    (process.env.NODE_ENV as 'development' | 'production') || 'development';
  const logLevel =
    (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info';

  return {
    botToken,
    environment,
    logLevel,
    sportsApiUrl,
    sportsApiPath,
    sportsTournamentRpl,
    telegramUrl,
    uranaWebAppUrl,
    uranaWebAppPath,
  };
}

export { validateConfig };

export const config = validateConfig();
