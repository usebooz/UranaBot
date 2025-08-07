import { Context, SessionFlavor } from 'grammy';

/**
 * Session data interface
 * Add your session properties here as needed
 */
export interface SessionData {
  // Пока сессия не используется, но оставляем для будущих функций
  placeholder?: string;
}

/**
 * Bot context type with session support
 */
export type MyContext = Context & SessionFlavor<SessionData>;
