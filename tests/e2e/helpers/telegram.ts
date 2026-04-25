import assert from 'node:assert/strict';
import type { InlineKeyboardMarkup, InputPeerLike, tl } from '@mtcute/core';
import { Conversation } from '@mtcute/node';
import type { Message } from '@mtcute/node';
import { getE2eRuntime } from '../setup/runtime.js';

export async function sendBotCommandToChat(
  chat: InputPeerLike,
  command: string,
): Promise<Message> {
  const { clientApi } = getE2eRuntime();
  const conversation = new Conversation(clientApi, chat);

  return conversation.with(async () => {
    await conversation.sendText(command);

    return conversation.waitForResponse();
  });
}

export function getInlineKeyboardButtons(
  response: Message,
): tl.TypeKeyboardButton[][] {
  const markup = response.markup as InlineKeyboardMarkup;
  assert.ok(markup?.type === 'inline', 'Expected inline button markup.');

  return markup.buttons;
}

export function getFirstButtonWebView(
  response: Message,
): tl.RawKeyboardButtonWebView {
  const button = getInlineKeyboardButtons(
    response,
  )[0]?.[0] as tl.RawKeyboardButtonWebView;
  assert.strictEqual(button?._, 'keyboardButtonWebView');

  return button;
}

export function getFirstButtonUrl(response: Message): tl.RawKeyboardButtonUrl {
  const button = getInlineKeyboardButtons(
    response,
  )[0]?.[0] as tl.RawKeyboardButtonUrl;
  assert.strictEqual(button?._, 'keyboardButtonUrl');

  return button;
}
