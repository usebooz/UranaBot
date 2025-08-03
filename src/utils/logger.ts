// Simple logger wrapper for consistent formatting
export const logger = {
  info: (message: string, ...args: unknown[]): void => {
    console.log(`[INFO] ${new Date().toISOString()} ${message}`, ...args);
  },

  error: (message: string, ...args: unknown[]): void => {
    console.error(`[ERROR] ${new Date().toISOString()} ${message}`, ...args);
  },

  warn: (message: string, ...args: unknown[]): void => {
    console.warn(`[WARN] ${new Date().toISOString()} ${message}`, ...args);
  },

  debug: (message: string, ...args: unknown[]): void => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.LOG_LEVEL === 'debug'
    ) {
      console.log(`[DEBUG] ${new Date().toISOString()} ${message}`, ...args);
    }
  },
};
