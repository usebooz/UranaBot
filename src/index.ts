import { Bot, session } from 'grammy';
import { config } from './utils/config.js';
import { logger } from './utils/logger.js';
import { setupCommands } from './commands/index.js';
import { setupMiddlewares } from './middlewares/index.js';
import type { MyContext, SessionData } from './types/index.js';

// Log application startup
logger.info('🚀 Starting Uranabot...');
logger.info(
  `📋 Config: NODE_ENV=${config.environment}, LOG_LEVEL=${config.logLevel}`,
);

// Create bot instance
logger.info('🤖 Creating bot instance...');
const bot = new Bot<MyContext>(config.botToken, {
  client: {
    environment: config.environment === 'development' ? 'test' : 'prod',
  },
});

// Enable API logging in debug mode
if (config.logLevel === 'debug') {
  bot.api.config.use(async (prev, method, payload, signal) => {
    logger.debug(`API call: ${method}`, payload);
    const result = await prev(method, payload, signal);
    logger.debug(`API response for ${method}:`, result);
    return result;
  });
}

// Configure sessions
function initial(): SessionData {
  return {};
}

bot.use(session({ initial }));

// Attach middleware
setupMiddlewares(bot);

// Attach commands.
setupCommands(bot);

// Handle unexpected bot errors.
bot.catch(err => {
  const ctx = err.ctx;
  logger.error(
    `Error while handling update ${ctx.update.update_id}:`,
    err.error,
  );
});

// Start the bot.
async function main(): Promise<void> {
  try {
    logger.info('Starting Uranabot...');

    // Register bot commands.
    await bot.api.setMyCommands([
      { command: 'info', description: 'Информация' },
      { command: 'league', description: 'Лига' },
    ]);

    logger.info('Bot commands set successfully');

    // Start long polling.
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

// Start the application.
void main();
