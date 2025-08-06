import dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

export interface Config {
  botToken: string;
  port: number;
  environment: 'development' | 'production';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  sportsApiUrl: string;
  sportsTournamentWebname: string;
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

  const sportsTournamentWebname = process.env.SPORTS_TOURNAMENT_WEBNAME;
  if (!sportsTournamentWebname) {
    throw new Error(
      'SPORTS_TOURNAMENT_WEBNAME environment variable is required',
    );
  }

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const environment =
    (process.env.NODE_ENV as 'development' | 'production') || 'development';
  const logLevel =
    (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info';

  return {
    botToken,
    port,
    environment,
    logLevel,
    sportsApiUrl,
    sportsTournamentWebname,
  };
}

export const config = validateConfig();
