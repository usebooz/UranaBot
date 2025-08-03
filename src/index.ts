import { Bot, Context, session, SessionFlavor } from 'grammy';
import { config } from './config';
import { logger } from './utils/logger';
import { setupCommands } from './commands';
import { setupMiddlewares } from './middlewares';

// Определяем типы для сессии
interface SessionData {
  messageCount: number;
}

type MyContext = Context & SessionFlavor<SessionData>;

// Создаем экземпляр бота
const bot = new Bot<MyContext>(config.botToken);

// Включаем API логирование в debug режиме
if (config.logLevel === 'debug') {
  bot.api.config.use(async (prev, method, payload, signal) => {
    logger.debug(`API call: ${method}`, payload);
    const result = await prev(method, payload, signal);
    logger.debug(`API response for ${method}:`, result);
    return result;
  });
}

// Настраиваем сессии
function initial(): SessionData {
  return { messageCount: 0 };
}

bot.use(session({ initial }));

// Подключаем middleware
setupMiddlewares(bot);

// Подключаем команды
setupCommands(bot);

// Обработчик ошибок
bot.catch(err => {
  const ctx = err.ctx;
  logger.error(
    `Error while handling update ${ctx.update.update_id}:`,
    err.error,
  );
});

// Запуск бота
async function main(): Promise<void> {
  try {
    logger.info('Starting Uranabot...');

    // Устанавливаем команды бота
    await bot.api.setMyCommands([
      { command: 'start', description: 'Запустить бота' },
      { command: 'help', description: 'Показать справку' },
      { command: 'stats', description: 'Показать статистику' },
    ]);

    logger.info('Bot commands set successfully');

    // Запускаем бота
    await bot.start();
    logger.info('Uranabot is running!');
  } catch (error) {
    logger.error('Failed to start bot:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.once('SIGINT', () => {
  logger.info('Received SIGINT, stopping bot...');
  bot.stop();
});

process.once('SIGTERM', () => {
  logger.info('Received SIGTERM, stopping bot...');
  bot.stop();
});

// Запускаем бота
void main();
