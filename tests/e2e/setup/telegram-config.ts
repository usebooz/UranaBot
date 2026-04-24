export interface TelegramTestConfig {
  apiHash: string;
  apiId: number;
  botName: string;
  phone: string;
}

export function getTelegramTestConfig(): TelegramTestConfig {
  return {
    apiHash: requiredEnv('TELEGRAM_TEST_API_HASH'),
    apiId: parseInteger(requiredEnv('TELEGRAM_TEST_API_ID')),
    botName: normalizeBotName(requiredEnv('TELEGRAM_TEST_BOT_NAME')),
    phone: requiredEnv('TELEGRAM_TEST_PHONE'),
  };
}

function normalizeBotName(value: string): string {
  return value.startsWith('@') ? value.slice(1) : value;
}

function parseInteger(value: string): number {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    throw new Error(`Expected integer value, got: ${value}`);
  }

  return parsed;
}

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
