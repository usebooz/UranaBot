/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: [
    '**/__tests__/**/*.ts',
    '**/?(*.)+(spec|test).ts'
  ],
  transform: {
    '^.+\\.(ts|js)$': 'babel-jest',
  },
  // Enable source maps for debugging
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/gql/generated/**',
    '!src/healthcheck.js',
    '!src/index.ts'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleFileExtensions: ['ts', 'js', 'json'],
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testTimeout: 30000,
  // Ignore generated files
  modulePathIgnorePatterns: ['<rootDir>/src/gql/generated/'],
  // Transform ES modules in node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(graphql-request|@graphql-typed-document-node)/)',
  ],
  // Clear mocks between tests
  clearMocks: true,
  // Verbose output
  verbose: true
};
