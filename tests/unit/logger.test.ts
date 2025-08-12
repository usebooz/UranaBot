// import { describe, it, beforeEach, afterEach } from 'node:test';
// import assert from 'node:assert';
// import { logger } from '../../src/utils/logger.js';

// describe('Logger', () => {
//   let originalConsole: typeof console;
//   let consoleOutput: string[];

//   beforeEach(() => {
//     originalConsole = global.console;
//     consoleOutput = [];

//     // Mock console methods to capture output
//     global.console = {
//       ...originalConsole,
//       log: (...args: unknown[]) => {
//         consoleOutput.push(['log', ...args].join(' '));
//       },
//       error: (...args: unknown[]) => {
//         consoleOutput.push(['error', ...args].join(' '));
//       },
//       warn: (...args: unknown[]) => {
//         consoleOutput.push(['warn', ...args].join(' '));
//       },
//     };
//   });

//   afterEach(() => {
//     global.console = originalConsole;
//   });

//   it('should log info messages with timestamp and level', () => {
//     logger.info('Test info message');
    
//     assert.strictEqual(consoleOutput.length, 1);
//     assert.ok(consoleOutput[0].includes('[INFO]'));
//     assert.ok(consoleOutput[0].includes('Test info message'));
//     // Check ISO timestamp format
//     assert.ok(consoleOutput[0].match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/));
//   });

//   it('should log error messages with timestamp and level', () => {
//     logger.error('Test error message');
    
//     assert.strictEqual(consoleOutput.length, 1);
//     assert.ok(consoleOutput[0].includes('[ERROR]'));
//     assert.ok(consoleOutput[0].includes('Test error message'));
//   });

//   it('should log warning messages with timestamp and level', () => {
//     logger.warn('Test warning message');
    
//     assert.strictEqual(consoleOutput.length, 1);
//     assert.ok(consoleOutput[0].includes('[WARN]'));
//     assert.ok(consoleOutput[0].includes('Test warning message'));
//   });

//   it('should log debug messages in development mode', () => {
//     const originalEnv = process.env.NODE_ENV;
//     process.env.NODE_ENV = 'development';

//     logger.debug('Test debug message');
    
//     assert.strictEqual(consoleOutput.length, 1);
//     assert.ok(consoleOutput[0].includes('[DEBUG]'));
//     assert.ok(consoleOutput[0].includes('Test debug message'));

//     process.env.NODE_ENV = originalEnv;
//   });

//   it('should log debug messages when LOG_LEVEL is debug', () => {
//     const originalLogLevel = process.env.LOG_LEVEL;
//     process.env.LOG_LEVEL = 'debug';

//     logger.debug('Test debug message');
    
//     assert.strictEqual(consoleOutput.length, 1);
//     assert.ok(consoleOutput[0].includes('[DEBUG]'));

//     process.env.LOG_LEVEL = originalLogLevel;
//   });

//   it('should not log debug messages in production mode', () => {
//     const originalEnv = process.env.NODE_ENV;
//     const originalLogLevel = process.env.LOG_LEVEL;
    
//     process.env.NODE_ENV = 'production';
//     process.env.LOG_LEVEL = 'info';

//     logger.debug('Test debug message');
    
//     assert.strictEqual(consoleOutput.length, 0);

//     process.env.NODE_ENV = originalEnv;
//     process.env.LOG_LEVEL = originalLogLevel;
//   });

//   it('should handle additional arguments', () => {
//     const obj = { key: 'value' };
//     logger.info('Test message with object', obj, 123);
    
//     assert.strictEqual(consoleOutput.length, 1);
//     assert.ok(consoleOutput[0].includes('Test message with object'));
//     // Objects are stringified by console methods, so check for the pattern
//     assert.ok(consoleOutput[0].includes('[object Object]') || consoleOutput[0].includes('key'));
//     assert.ok(consoleOutput[0].includes('123'));
//   });
// });
