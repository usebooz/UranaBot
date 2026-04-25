import assert from 'node:assert/strict';
import { after, before, describe, it } from 'node:test';
import type { InputPeerLike } from '@mtcute/core';
import {
  assertDebugMessageResponse,
  assertGroupDebugButtonResponse,
  assertGroupLeagueButtonResponse,
  assertInfoMessageResponse,
  assertLeagueMessageResponse,
} from './helpers/assertions.js';
import { getFirstButtonUrl, sendBotCommandToChat } from './helpers/telegram.js';
import { getE2eRuntime } from './setup/runtime.js';

describe('group chat', () => {
  let groupChatId!: InputPeerLike;

  before(async () => {
    const { botName, clientApi } = getE2eRuntime();
    const chat = await clientApi.createSupergroup({
      title: `Uranabot E2E ${Date.now()}`,
    });

    groupChatId = chat.id;
    assert.ok(groupChatId, 'Expected group chat to be created.');

    const failedInvitees = await clientApi.addChatMembers(
      groupChatId,
      botName,
      {},
    );

    assert.deepStrictEqual(
      failedInvitees,
      [],
      'Expected bot to be added to the test group.',
    );
  });

  after(async () => {
    const { clientApi } = getE2eRuntime();

    if (groupChatId) {
      await clientApi.deleteSupergroup(groupChatId).catch(() => {});
    }
  });

  it('setup allows the bot to join groups and read all group messages', async () => {
    const { botApi } = getE2eRuntime();
    const me = await botApi.getMe();

    assert.strictEqual(me.can_join_groups, true);
    assert.strictEqual(me.can_read_all_group_messages, true);
  });

  it('/info returns a bot response', async () => {
    const response = await sendBotCommandToChat(groupChatId, '/info');

    assertInfoMessageResponse(response);
  });

  it('/debug returns bot info and group debug button', async () => {
    const response = await sendBotCommandToChat(groupChatId, '/debug');

    await assertDebugMessageResponse(response);
    assertGroupDebugButtonResponse(response);
  });

  it('/league persists session after bot rejoin', async () => {
    const { botName, clientApi, leagueId } = getE2eRuntime();
    const firstResponse = await sendBotCommandToChat(
      groupChatId,
      `/league ${leagueId}`,
    );

    assertLeagueMessageResponse(firstResponse);
    assertGroupLeagueButtonResponse(firstResponse, leagueId);

    await clientApi.kickChatMember({ chatId: groupChatId, userId: botName });
    const failedInvitees = await clientApi.addChatMembers(
      groupChatId,
      botName,
      {},
    );

    assert.deepStrictEqual(
      failedInvitees,
      [],
      'Expected bot to be re-added to the test group.',
    );

    const secondResponse = await sendBotCommandToChat(groupChatId, '/league');

    assertLeagueMessageResponse(secondResponse);
    assertGroupLeagueButtonResponse(secondResponse, leagueId);

    const firstButton = getFirstButtonUrl(firstResponse);
    const secondButton = getFirstButtonUrl(secondResponse);

    assert.strictEqual(secondResponse.text, firstResponse.text);
    assert.strictEqual(secondButton.text, firstButton.text);
    assert.strictEqual(secondButton.url, firstButton.url);
  });
});
