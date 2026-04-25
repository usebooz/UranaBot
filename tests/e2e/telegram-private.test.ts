import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  assertDebugMessageResponse,
  assertInfoMessageResponse,
  assertLeagueMessageResponse,
  assertPrivateDebugButtonResponse,
  assertPrivateLeagueButtonResponse,
} from './helpers/assertions.js';
import {
  getFirstButtonWebView,
  sendBotCommandToChat,
} from './helpers/telegram.js';
import { getE2eRuntime } from './setup/runtime.js';

describe('private chat', () => {
  it('/info returns a bot response', async () => {
    const { botName } = getE2eRuntime();
    const response = await sendBotCommandToChat(botName, '/info');

    assertInfoMessageResponse(response);
  });

  it('/debug returns bot info and debug button', async () => {
    const { botName } = getE2eRuntime();
    const response = await sendBotCommandToChat(botName, '/debug');

    await assertDebugMessageResponse(response);
    assertPrivateDebugButtonResponse(response);
  });

  it('/league stores league id and reuses it when id is omitted', async () => {
    const { botName, leagueId } = getE2eRuntime();
    const firstResponse = await sendBotCommandToChat(
      botName,
      `/league ${leagueId}`,
    );
    const secondResponse = await sendBotCommandToChat(botName, '/league');

    assertLeagueMessageResponse(firstResponse);
    assertPrivateLeagueButtonResponse(firstResponse, leagueId);
    assertLeagueMessageResponse(secondResponse);
    assertPrivateLeagueButtonResponse(secondResponse, leagueId);

    const firstButton = getFirstButtonWebView(firstResponse);
    const secondButton = getFirstButtonWebView(secondResponse);

    assert.strictEqual(secondResponse.text, firstResponse.text);
    assert.strictEqual(secondButton.text, firstButton.text);
    assert.strictEqual(secondButton.url, firstButton.url);
  });
});
