// import { describe, it } from "node:test";
// import assert from "node:assert";
// import { tournamentCommand } from '../../src/commands/tournament.command.js';
// import type { MyContext } from '../../src/types/index.js';

// describe("TournamentCommand", () => {
//   function createMockContext(): MyContext {
//     return {
//       from: { id: 12345 },
//       chat: { id: 12345, type: 'private' },
//       update: {} as any,
//       reply: async (text: string) => {
//         return { message_id: 1, date: Math.floor(Date.now() / 1000), chat: { id: 12345, type: 'private' }, text } as any;
//       },
//     } as MyContext;
//   }

//   it('should be able to import the command', async () => {
//     const { tournamentCommand } = await import('../../src/commands/tournament.command.js');
    
//     assert.ok(tournamentCommand);
//     assert.strictEqual(typeof tournamentCommand, 'function');
//   });

//   it('should have correct function signature', () => {
//     assert.strictEqual(typeof tournamentCommand, 'function');
    
//     // Check that it's an async function
//     assert.strictEqual(tournamentCommand.constructor.name, 'AsyncFunction');
//   });

//   it('should accept context parameter', () => {
//     // Check function length (parameter count)
//     assert.strictEqual(tournamentCommand.length, 1);
//   });

//   it('should return a promise', () => {
//     const ctx = createMockContext();
//     const result = tournamentCommand(ctx);
    
//     assert.ok(result instanceof Promise);
    
//     // Don't wait for the result since it might make real API calls
//     // We'll test the actual functionality in integration tests
//   });

//   it('should handle context object', () => {
//     const ctx = createMockContext();
    
//     // Should not throw when called with proper context
//     assert.doesNotThrow(() => {
//       tournamentCommand(ctx);
//     });
//   });
// });
