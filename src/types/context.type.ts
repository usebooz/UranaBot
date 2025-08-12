import { Context, SessionFlavor } from 'grammy';
import { League, Tournament } from '../gql';

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
