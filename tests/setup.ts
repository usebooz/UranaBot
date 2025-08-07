import { beforeEach, afterEach } from '@jest/globals';

// Test setup file
// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.BOT_TOKEN = 'test_bot_token';
process.env.SPORTS_API_URL = 'https://www.sports.ru/gql/graphql';
process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament';
process.env.LOG_LEVEL = 'error'; // Suppress logs during tests

// Mock fetch for API tests
global.fetch = jest.fn();

// Mock console methods for cleaner test output
const originalConsole = console;
const mockConsole = {
  ...originalConsole,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

beforeEach(() => {
  global.console = mockConsole as any;
  jest.clearAllMocks();
});

afterEach(() => {
  global.console = originalConsole;
});
