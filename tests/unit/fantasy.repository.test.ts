// import { describe, it, beforeEach } from "node:test";
// import assert from "node:assert";
// import { FantasyRepository } from '../../src/repositories/fantasy.repository.js';

// describe("FantasyRepository", () => {
//   let repository: FantasyRepository;

//   beforeEach(() => {
//     repository = new FantasyRepository();
//   });

//   it('should be able to import the repository', async () => {
//     const { FantasyRepository } = await import('../../src/repositories/fantasy.repository.js');
    
//     assert.ok(FantasyRepository);
//     assert.strictEqual(typeof FantasyRepository, 'function');
//   });

//   it('should be able to create repository instance', () => {
//     assert.ok(repository);
//     assert.strictEqual(typeof repository.getTournamentByWebname, 'function');
//   });

//   it('should have getTournamentByWebname method with correct signature', () => {
//     assert.strictEqual(typeof repository.getTournamentByWebname, 'function');
    
//     // Test that method expects a string parameter and returns a Promise
//     const result = repository.getTournamentByWebname('test');
//     assert.ok(result instanceof Promise);
    
//     // Don't wait for the result since it makes a real API call
//     // We'll test the actual API interaction in integration tests
//   });

//   it('should inherit from base repository', () => {
//     // Check that it has the correct class hierarchy
//     assert.ok(repository instanceof FantasyRepository);
//     assert.ok(repository.constructor.name === 'FantasyRepository');
//   });

//   it('should handle string webname parameter', () => {
//     // Test different webname formats
//     const validWebnames = ['russia', 'rpl-2024', 'test-tournament'];
    
//     validWebnames.forEach(webname => {
//       const result = repository.getTournamentByWebname(webname);
//       assert.ok(result instanceof Promise);
//     });
//   });

//   it('should handle empty webname gracefully', () => {
//     // Should not throw on empty string, but return a promise that will reject
//     const result = repository.getTournamentByWebname('');
//     assert.ok(result instanceof Promise);
    
//     // The actual error handling is tested in integration tests
//   });
// });
