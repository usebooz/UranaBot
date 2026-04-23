import 'dotenv/config';
import { TelegramClient } from '@mtcute/node';

const DEFAULT_STORAGE = 'telegram-mtcute-connectivity.session';

const HELP_TEXT = `
Usage:
  npm run telegram:mtcute:connectivity

Required env:
  TELEGRAM_MTCUTE_API_ID
  TELEGRAM_MTCUTE_API_HASH

Optional env:
  TELEGRAM_MTCUTE_TEST_MODE=true
  TELEGRAM_MTCUTE_STORAGE=telegram-mtcute-connectivity.session
  TELEGRAM_MTCUTE_PHONE=+79991234567
  TELEGRAM_MTCUTE_PASSWORD=your_2fa_password
  TELEGRAM_MTCUTE_PRINT_DC_OPTIONS=true

Notes:
  - This is a connectivity probe only, not an e2e command test.
  - It verifies that mtcute can connect and authorize an MTProto user session.
  - It targets Telegram test servers by default.
  - On the first run it asks for the login code unless the configured storage
    already contains a valid session.
`.trim();

function parseBoolean(value, defaultValue = false) {
  if (value === undefined) {
    return defaultValue;
  }

  return ['1', 'true', 'yes', 'on'].includes(value.toLowerCase());
}

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
  return {
    apiId: parseInteger(requiredEnv('TELEGRAM_MTCUTE_API_ID')),
    apiHash: requiredEnv('TELEGRAM_MTCUTE_API_HASH'),
    storage: process.env.TELEGRAM_MTCUTE_STORAGE ?? DEFAULT_STORAGE,
    testMode: parseBoolean(process.env.TELEGRAM_MTCUTE_TEST_MODE, true),
    printDcOptions: parseBoolean(
      process.env.TELEGRAM_MTCUTE_PRINT_DC_OPTIONS,
      false,
    ),
  };
}

function getStartOptions(client) {
  return {
    phone: async () =>
      process.env.TELEGRAM_MTCUTE_PHONE ?? client.input('Phone > '),
    code: () => client.input('Code > '),
    password: async () =>
      process.env.TELEGRAM_MTCUTE_PASSWORD ?? client.input('Password > '),
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
    storage: config.storage,
    testMode: config.testMode,
  });

  try {
    console.log(
      `Starting mtcute connectivity probe (testMode=${String(config.testMode)}, storage=${config.storage})`,
    );

    const self = await client.start(getStartOptions(client));

    console.log('Connected and authorized successfully.');
    console.log(`Self: id=${self.id} username=${self.username ?? '<none>'}`);

    if (config.printDcOptions) {
      const telegramConfig = await client.call({ _: 'help.getConfig' });
      console.log(JSON.stringify(telegramConfig.dcOptions, null, 2));
    }
  } finally {
    await client.disconnect().catch(() => {});
    await client.destroy().catch(() => {});
  }
}

await main();
