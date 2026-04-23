import 'dotenv/config';
import { MemoryStorage } from '@mtcute/core';
import { TelegramClient } from '@mtcute/node';

const HELP_TEXT = `
Usage:
  NODE_ENV=test node scripts/telegram-mtcute-connectivity.js

Required env:
  TELEGRAM_TEST_API_ID
  TELEGRAM_TEST_API_HASH
  TELEGRAM_TEST_PHONE

Test phone note:
  Telegram test phone numbers follow the 99966XYYYY pattern, where X is the
  DC number. This probe derives the confirmation code from that number.

Notes:
  - This is a connectivity probe only, not an e2e command test.
  - It verifies that mtcute can connect and authorize an MTProto user session.
  - It only runs with NODE_ENV=test and then uses Telegram test servers.
  - It uses in-memory session storage and does not write local session files.
`.trim();

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

function getStartOptions(config) {
  let codeAttempt = 0;

  return {
    phone: async () => config.phone,
    code: async () => {
      codeAttempt += 1;

      if (codeAttempt > 2) {
        throw new Error(
          'Telegram rejected both 5-digit and 6-digit test confirmation codes derived from TELEGRAM_TEST_PHONE.',
        );
      }

      const codeLength = codeAttempt === 1 ? 5 : 6;
      const code = config.phoneDc.repeat(codeLength);

      console.log(`Using Telegram test confirmation code: ${code}`);

      return code;
    },
  };
}

async function main() {
  if (process.argv.includes('--help')) {
    console.log(HELP_TEXT);
    return;
  }

  const config = getConfig();

  const client = new TelegramClient({
    apiId: config.apiId,
    apiHash: config.apiHash,
    storage: new MemoryStorage(),
    testMode: true,
  });

  try {
    console.log('Starting mtcute connectivity probe (testMode=true)');

    const self = await client.start(getStartOptions(config));

    console.log('Connected and authorized successfully.');
    console.log(`Self: id=${self.id} username=${self.username ?? '<none>'}`);
  } finally {
    await client.disconnect().catch(() => {});
    await client.destroy().catch(() => {});
  }
}

await main();
