import { beforeEach, afterEach } from '@jest/globals';

// Store original fetch for integration tests
const originalFetch = global.fetch;

// Test setup file
// Mock environment variables for tests
process.env.NODE_ENV = 'test';
process.env.BOT_TOKEN = 'test_bot_token';
process.env.SPORTS_API_URL = 'https://www.sports.ru/gql/graphql/';
process.env.SPORTS_TOURNAMENT_RPL = 'test-tournament';
process.env.LOG_LEVEL = 'error'; // Suppress logs during tests

// Check if this is an integration test
function isIntegrationTest(): boolean {
  const testPath = expect.getState().testPath || '';
  return testPath.includes('integration') || testPath.includes('debug');
}

// Mock fetch only for unit tests, not integration tests
if (!isIntegrationTest()) {
  global.fetch = jest.fn();
}

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
  // Don't mock console for debug tests
  if (!isIntegrationTest() && !expect.getState().testPath?.includes('debug')) {
    global.console = mockConsole;
  }
  
  // Only clear mocks for unit tests
  if (!isIntegrationTest()) {
    jest.clearAllMocks();
  }
});

afterEach(() => {
  global.console = originalConsole;
  
  // Restore original fetch for integration tests
  if (isIntegrationTest()) {
    global.fetch = originalFetch;
  }
});
