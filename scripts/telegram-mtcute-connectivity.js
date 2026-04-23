import 'dotenv/config';
import { MemoryStorage } from '@mtcute/core';
import { TelegramClient } from '@mtcute/node';

const DEFAULT_TEST_DC_ID = 2;
const DEFAULT_TEST_DC_IP = '149.154.167.40';
const DEFAULT_TEST_DC_PORT = 80;

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

function getTestPhoneDc(phone) {
  const normalized = phone.replace(/\D/g, '');
  const match = normalized.match(/^99966([1-3])\d{4}$/);

  if (!match) {
    throw new Error(
      'TELEGRAM_TEST_PHONE must follow the Telegram test number pattern: 99966XYYYY.',
    );
  }

  return match[1];
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
    phoneDc: getTestPhoneDc(phone),
  };
}

async function main() {
  const config = getConfig();
  const code = config.phoneDc.repeat(5);

  const client = new TelegramClient({
    apiId: config.apiId,
    apiHash: config.apiHash,
    storage: new MemoryStorage(),
    testMode: true,
    defaultDcs: {
      main: {
        ipAddress: DEFAULT_TEST_DC_IP,
        port: DEFAULT_TEST_DC_PORT,
        id: DEFAULT_TEST_DC_ID,
        testMode: true,
      },
      media: {
        ipAddress: DEFAULT_TEST_DC_IP,
        port: DEFAULT_TEST_DC_PORT,
        id: DEFAULT_TEST_DC_ID,
        mediaOnly: true,
        testMode: true,
      },
    },
  });

  try {
    console.log(
      `Starting mtcute connectivity probe (testMode=true, dc=${DEFAULT_TEST_DC_ID}, ${DEFAULT_TEST_DC_IP}:${DEFAULT_TEST_DC_PORT})`,
    );
    console.log(`Using Telegram test confirmation code: ${code}`);

    const self = await client.start({
      phone: config.phone,
      code,
    });

    console.log('Connected and authorized successfully.');
    console.log(`Self: id=${self.id} username=${self.username ?? '<none>'}`);
  } finally {
    await client.disconnect().catch(() => {});
    await client.destroy().catch(() => {});
  }
}

await main();
