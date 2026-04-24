import type { TelegramClient } from '@mtcute/node';

export interface TelegramE2eContext {
  botName: string;
  client: TelegramClient;
}

let context: TelegramE2eContext | undefined;

export function setE2eContext(value: TelegramE2eContext): void {
  context = value;
}

export function getE2eContext(): TelegramE2eContext {
  if (!context) {
    throw new Error('Telegram e2e context is not initialized.');
  }

  return context;
}
