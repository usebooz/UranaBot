import { Bot, Context, SessionFlavor } from 'grammy';
import { logger } from '../utils/logger';

interface SessionData {
  messageCount: number;
}

type MyContext = Context & SessionFlavor<SessionData>;

export function setupCommands(bot: Bot<MyContext>): void {
  // Команда /start
  bot.command('start', async ctx => {
    ctx.session.messageCount = 0;
    const welcomeMessage = `
🤖 Добро пожаловать в Uranabot!

Я готов помочь вам. Используйте команды:
/help - получить справку
/stats - посмотреть статистику

Просто напишите мне сообщение, и я отвечу!
    `;

    await ctx.reply(welcomeMessage.trim());
    logger.info(`User ${ctx.from?.id} started the bot`);
  });

  // Команда /help
  bot.command('help', async ctx => {
    const helpMessage = `
📖 Справка по командам:

/start - Запустить бота заново
/help - Показать эту справку
/stats - Показать вашу статистику

🔹 Вы можете просто писать мне сообщения, и я буду отвечать!
    `;

    await ctx.reply(helpMessage.trim());
    logger.info(`User ${ctx.from?.id} requested help`);
  });

  // Команда /stats
  bot.command('stats', async ctx => {
    const messageCount = ctx.session.messageCount;
    const statsMessage = `
📊 Ваша статистика:

💬 Отправлено сообщений: ${messageCount}
👤 Ваш ID: ${ctx.from?.id}
📅 Время: ${new Date().toLocaleString('ru-RU')}
    `;

    await ctx.reply(statsMessage.trim());
    logger.info(`User ${ctx.from?.id} requested stats`);
  });

  // Обработчик обычных текстовых сообщений
  bot.on('message:text', async ctx => {
    ctx.session.messageCount += 1;

    const userMessage = ctx.message.text;
    const responses = [
      `Вы написали: "${userMessage}". Интересно! 🤔`,
      `Получил ваше сообщение: "${userMessage}". Спасибо! 👍`,
      `"${userMessage}" - отличное сообщение! 😊`,
      `Я понял: "${userMessage}". Что ещё расскажете? 🙂`,
    ];

    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    if (randomResponse) {
      await ctx.reply(randomResponse);
    }

    logger.info(`User ${ctx.from?.id} sent message: ${userMessage}`);
  });

  logger.info('Bot commands setup completed');
}
