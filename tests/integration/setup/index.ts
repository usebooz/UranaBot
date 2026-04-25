import dotenv from 'dotenv';

dotenv.config();

export interface SportsIntegrationConfig {
  leagueId: string;
  tournamentWebname: string;
}

export const sportsIntegrationConfig: SportsIntegrationConfig = {
  leagueId: requiredEnv('SPORTS_TEST_LEAGUE_ID'),
  tournamentWebname: requiredEnv('SPORTS_TOURNAMENT_RPL'),
};

function requiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}
