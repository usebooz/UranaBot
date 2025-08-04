import { Bot, session } from 'grammy';
import { config } from './config.js';
import { logger } from './utils/logger.js';
import { setupCommands } from './commands/index.js';
import { setupMiddlewares } from './middlewares/index.js';
import type { MyContext, SessionData } from './types.js';

// Логируем старт приложения
logger.info('🚀 Starting Uranabot...');
logger.info(
  `📋 Config: NODE_ENV=${config.environment}, LOG_LEVEL=${config.logLevel}`,
);

// Создаем экземпляр бота
logger.info('🤖 Creating bot instance...');
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
  return {};
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
    ]);

    logger.info('Bot commands set successfully');

    // Запускаем бота
    logger.info('Uranabot is running!');
    await bot.start();
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
