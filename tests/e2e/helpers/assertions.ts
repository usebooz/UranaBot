import assert from 'node:assert/strict';
import type { Message } from '@mtcute/node';
import { getE2eRuntime } from '../setup/runtime.js';
import { getFirstButtonUrl, getFirstButtonWebView } from './telegram.js';

const BUTTON_LABELS = {
  DEBUG: 'Дебаг Приложения',
  LEAGUE: 'Посмотреть Лигу',
} as const;

export function assertInfoMessageResponse(response: Message): void {
  assert.ok(response.text, 'Expected bot response text.');
  assert.match(response.text, /^🇷🇺 .+\n📅 .+$/u);
}

export async function assertDebugMessageResponse(
  response: Message,
): Promise<void> {
  const { botApi } = getE2eRuntime();
  const me = await botApi.getMe();

  assert.strictEqual(response.text, JSON.stringify(me, null, 2));
}

export function assertPrivateDebugButtonResponse(response: Message): void {
  const { webAppUrl } = getE2eRuntime();
  const button = getFirstButtonWebView(response);
  const expectedDebugUrl = `${webAppUrl}debug/`;

  assert.strictEqual(button.text, BUTTON_LABELS.DEBUG);
  assert.strictEqual(button.url, expectedDebugUrl);
}

export function assertGroupDebugButtonResponse(response: Message): void {
  const { botName, telegramUrl } = getE2eRuntime();
  const button = getFirstButtonUrl(response);
  const expectedDebugUrl = `${telegramUrl}${botName}/debug`;

  assert.strictEqual(button.text, BUTTON_LABELS.DEBUG);
  assert.strictEqual(button.url, expectedDebugUrl);
}

export function assertLeagueMessageResponse(response: Message): void {
  assert.ok(response.text, 'Expected initial league response text.');
  assert.match(
    response.text,
    /^📊 .+\n👥 Команд: \d+\n⏳ \d+\/\d+ туров завершено\n\n(?:\s*\d+ .+ \d+\n?)+$/mu,
  );
}

export function assertPrivateLeagueButtonResponse(
  response: Message,
  leagueId: string,
): void {
  const { webAppUrl } = getE2eRuntime();
  const button = getFirstButtonWebView(response);
  const expectedLeagueUrl = `${webAppUrl}fantasy/league/${leagueId}`;

  assert.strictEqual(button.text, BUTTON_LABELS.LEAGUE);
  assert.strictEqual(button.url, expectedLeagueUrl);
}

export function assertGroupLeagueButtonResponse(
  response: Message,
  leagueId: string,
): void {
  const { botName, telegramUrl } = getE2eRuntime();
  const button = getFirstButtonUrl(response);
  const expectedLeagueUrl = `${telegramUrl}${botName}/league?startapp=${leagueId}`;

  assert.strictEqual(button.text, BUTTON_LABELS.LEAGUE);
  assert.strictEqual(button.url, expectedLeagueUrl);
}
