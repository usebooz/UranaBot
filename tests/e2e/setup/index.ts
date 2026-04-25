import { Api } from 'grammy';
import { after, before } from 'node:test';
import { startBotProcess, type BotProcessHandle } from './bot-process.js';
import { getTelegramTestConfig } from './config.js';
import { setE2eRuntime } from './runtime.js';
import { startTelegramClient } from './telegram-client.js';
import type { TelegramClient } from '@mtcute/node';

const DEFAULT_TIMEOUT_MS = 30_000;
const POLL_INTERVAL_MS = 100;

let botProcess: BotProcessHandle | undefined;
let clientApi: TelegramClient | undefined;

before(async () => {
  const config = getTelegramTestConfig();
  const botApi = new Api(config.botToken, { environment: 'test' });

  botProcess = startBotProcess();
  const botName = await waitForBotApiReady(botApi, botProcess);

  clientApi = await startTelegramClient({
    apiHash: config.apiHash,
    apiId: config.apiId,
    phone: config.phone,
  });

  setE2eRuntime({
    botApi,
    botName,
    clientApi,
    leagueId: config.leagueId,
    telegramUrl: config.telegramUrl,
    webAppUrl: config.webAppUrl,
  });
});

after(async () => {
  if (clientApi) {
    await clientApi.destroy().catch(() => {});
  }

  if (botProcess) {
    await botProcess.stop();
  }
});

async function waitForBotApiReady(
  botApi: Api,
  botProcess: BotProcessHandle,
): Promise<string> {
  const deadline = Date.now() + DEFAULT_TIMEOUT_MS;

  while (true) {
    if (botProcess.hasExited()) {
      throw new Error(
        `Bot process exited before readiness check passed.\n${botProcess.getOutput()}`,
      );
    }

    try {
      const botName = (await botApi.getMe()).username;

      if (!botName) {
        throw new Error('Bot API getMe did not return a bot username.');
      }

      return botName;
    } catch {
      // Keep polling until the bot process exits or the timeout expires.
    }

    if (Date.now() > deadline) {
      await botProcess.stop();
      throw new Error(
        `Timed out waiting for bot readiness.\n${botProcess.getOutput()}`,
      );
    }

    await new Promise(resolve => {
      setTimeout(resolve, POLL_INTERVAL_MS);
    });
  }
}
