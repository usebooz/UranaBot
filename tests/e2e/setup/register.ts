import 'dotenv/config';
import { after, before } from 'node:test';
import { startBotProcess, type BotProcessHandle } from './bot-process.js';
import { getTelegramTestConfig } from './telegram-config.js';
import { startTelegramClient } from './telegram-client.js';
import { setE2eContext } from './telegram-context.js';
import type { TelegramClient } from '@mtcute/node';

let botProcess: BotProcessHandle | undefined;
let telegramClient: TelegramClient | undefined;

before(async () => {
  const config = getTelegramTestConfig();

  botProcess = startBotProcess();
  await botProcess.waitForReady();

  telegramClient = await startTelegramClient(config);

  setE2eContext({
    botName: config.botName,
    client: telegramClient,
  });
});

after(async () => {
  if (telegramClient) {
    await telegramClient.destroy().catch(() => {});
  }

  if (botProcess) {
    await botProcess.stop();
  }
});
