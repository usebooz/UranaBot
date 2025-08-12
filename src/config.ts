import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export interface Config {
  botToken: string;
  environment: 'development' | 'production';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  sportsApiUrl: string;
  sportsTournamentRpl: string;
  uranaWebAppUrl: string;
}

function validateConfig(): Config {
  const botToken = process.env.BOT_TOKEN;
  if (!botToken) {
    throw new Error('BOT_TOKEN environment variable is required');
  }

  const sportsApiUrl = process.env.SPORTS_API_URL;
  if (!sportsApiUrl) {
    throw new Error('SPORTS_API_URL environment variable is required');
  }

  const sportsTournamentRpl = process.env.SPORTS_TOURNAMENT_RPL;
  if (!sportsTournamentRpl) {
    throw new Error('SPORTS_TOURNAMENT_RPL environment variable is required');
  }

  const uranaWebAppUrl = process.env.URANAWEB_APP_URL;
  if (!uranaWebAppUrl) {
    throw new Error('URANAWEB_APP_URL environment variable is required');
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
    sportsTournamentRpl,
    uranaWebAppUrl,
  };
}

export const config = validateConfig();
