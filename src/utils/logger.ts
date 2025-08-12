/**
 * Simple logger wrapper for consistent formatting
 */
export const logger = {
  /**
   * Logs an informational message
   * @param message - The message to log
   * @param args - Additional arguments to log
   */
  info: (message: string, ...args: unknown[]): void => {
    console.log(`[INFO] ${new Date().toISOString()} ${message}`, ...args);
  },

  /**
   * Logs an error message
   * @param message - The error message to log
   * @param args - Additional arguments to log
   */
  error: (message: string, ...args: unknown[]): void => {
    console.error(`[ERROR] ${new Date().toISOString()} ${message}`, ...args);
  },

  /**
   * Logs a warning message
   * @param message - The warning message to log
   * @param args - Additional arguments to log
   */
  warn: (message: string, ...args: unknown[]): void => {
    console.warn(`[WARN] ${new Date().toISOString()} ${message}`, ...args);
  },

  /**
   * Logs a debug message (only in development or debug mode)
   * @param message - The debug message to log
   * @param args - Additional arguments to log
   */
  debug: (message: string, ...args: unknown[]): void => {
    if (
      process.env.NODE_ENV === 'development' ||
      process.env.LOG_LEVEL === 'debug'
    ) {
      console.log(`[DEBUG] ${new Date().toISOString()} ${message}`, ...args);
    }
  },
};
