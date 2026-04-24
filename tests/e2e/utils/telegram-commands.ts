import { Conversation, type Message } from '@mtcute/node';
import { getE2eContext } from '../setup/telegram-context.js';

const BOT_RESPONSE_TIMEOUT_MS = 30_000;

export interface BotCommandResult {
  response: Message;
  sent: Message;
}

export async function sendPrivateBotCommand(
  command: string,
): Promise<BotCommandResult> {
  const { botName, client } = getE2eContext();
  const conversation = new Conversation(client, botName);

  return conversation.with(async () => {
    const sent = await conversation.sendText(command);
    const response = await conversation.waitForResponse(
      message => Boolean(message.text),
      {
        message: sent.id,
        timeout: BOT_RESPONSE_TIMEOUT_MS,
      },
    );

    return { response, sent };
  });
}
