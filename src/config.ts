import * as dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

interface Config {
  botToken: string;
  port: number;
  environment: 'development' | 'production';
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  sportsApiUrl: string;
}

function validateConfig(): Config {
  const botToken = process.env.BOT_TOKEN;
  if (!botToken) {
    throw new Error('BOT_TOKEN environment variable is required');
  }

  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const environment =
    (process.env.NODE_ENV as 'development' | 'production') || 'development';
  const logLevel =
    (process.env.LOG_LEVEL as 'debug' | 'info' | 'warn' | 'error') || 'info';
  const sportsApiUrl = 'https://www.sports.ru/gql/graphql/';

  return {
    botToken,
    port,
    environment,
    logLevel,
    sportsApiUrl,
  };
}

export const config = validateConfig();
