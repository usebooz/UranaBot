import assert from 'node:assert/strict';
import { test } from 'node:test';
import { sendPrivateBotCommand } from './telegram-commands.js';

test('private chat: /info returns a bot response', async () => {
  const { response } = await sendPrivateBotCommand('/info');

  assert.ok(response.text, 'Expected bot response text.');
  assert.match(response.text, /🇷🇺/u);
});
