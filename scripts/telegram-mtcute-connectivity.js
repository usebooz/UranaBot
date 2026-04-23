import 'dotenv/config';
import { MemoryStorage } from '@mtcute/core';
import { TelegramClient } from '@mtcute/node';

function parseInteger(value) {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed)) {
    throw new Error(`Expected integer value, got: ${value}`);
  }

  return parsed;
}

function requiredEnv(name) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

function getConfig() {
  if (process.env.NODE_ENV !== 'test') {
    throw new Error(
      'This probe only runs with NODE_ENV=test to avoid connecting to production Telegram servers.',
    );
  }

  const phone = requiredEnv('TELEGRAM_TEST_PHONE');

  return {
    apiId: parseInteger(requiredEnv('TELEGRAM_TEST_API_ID')),
    apiHash: requiredEnv('TELEGRAM_TEST_API_HASH'),
    phone,
  };
}

async function main() {
  const config = getConfig();

  const client = new TelegramClient({
    apiId: config.apiId,
    apiHash: config.apiHash,
    storage: new MemoryStorage(),
    testMode: true,
  });

  try {
    console.log('Starting mtcute connectivity probe (testMode=true)');

    const self = await client.start({
      phone: config.phone,
      code: () => client.input('Code > '),
    });

    console.log('Connected and authorized successfully.');
    console.log(`Self: id=${self.id} username=${self.username ?? '<none>'}`);
  } finally {
    await client.disconnect().catch(() => {});
    await client.destroy().catch(() => {});
  }
}

await main();
