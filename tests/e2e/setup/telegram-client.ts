import { MemoryStorage, TelegramClient } from '@mtcute/node';
import type { TelegramTestConfig } from './telegram-config.js';

export async function startTelegramClient(
  config: TelegramTestConfig,
): Promise<TelegramClient> {
  const client = new TelegramClient({
    apiId: config.apiId,
    apiHash: config.apiHash,
    storage: new MemoryStorage(),
    testMode: true,
  });

  await client.start({
    phone: config.phone,
    code: () => client.input('Telegram code > '),
    password: () => client.input('Telegram 2FA password > '),
    invalidCodeCallback: type => {
      throw new Error(
        `Invalid Telegram ${type}. Re-run e2e tests with a fresh code.`,
      );
    },
  });

  return client;
}
