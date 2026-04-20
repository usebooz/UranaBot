import { Context, SessionFlavor } from 'grammy';
import type { League, Tournament } from '../gql/index.js';

/**
 * Session data interface
 * Add your session properties here as needed
 */
export interface SessionData {
  leagueId?: string;
}

export interface ContextData {
  rpl: NonNullable<Tournament>;
  league: NonNullable<League>;
}

/**
 * Bot context type with session support
 */
export type MyContext = Context & ContextData & SessionFlavor<SessionData>;
