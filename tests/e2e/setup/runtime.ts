import type { Api } from 'grammy';
import type { TelegramClient } from '@mtcute/node';

export interface TelegramE2eRuntime {
  botApi: Api;
  botName: string;
  clientApi: TelegramClient;
  leagueId: string;
  telegramUrl: string;
  webAppUrl: string;
}

let runtime: TelegramE2eRuntime | undefined;

export function setE2eRuntime(value: TelegramE2eRuntime): void {
  runtime = value;
}

export function getE2eRuntime(): TelegramE2eRuntime {
  if (!runtime) {
    throw new Error('Telegram e2e runtime is not initialized.');
  }

  return runtime;
}
