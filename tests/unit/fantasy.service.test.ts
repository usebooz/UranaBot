// import { describe, it, beforeEach } from 'node:test';
// import assert from 'node:assert';
// import { FantasyService } from '../../src/services/fantasy.service.js';

// describe('FantasyService', () => {
//   let service: FantasyService;

//   beforeEach(() => {
//     service = new FantasyService();
//   });

//   it('should be able to import the service', async () => {
//     const { FantasyService } = await import('../../src/services/fantasy.service.js');
    
//     assert.ok(FantasyService);
//     assert.strictEqual(typeof FantasyService, 'function');
//   });

//   it('should be able to create service instance', () => {
//     assert.ok(service);
//     assert.strictEqual(typeof service.getTournamentRpl, 'function');
//   });

//   it('should have getTournamentRpl method', () => {
//     assert.strictEqual(typeof service.getTournamentRpl, 'function');
    
//     // Check that it's an async function
//     const result = service.getTournamentRpl();
//     assert.ok(result instanceof Promise);
    
//     // Don't wait for the result since it makes a real API call
//     // We'll test the actual API interaction in integration tests
//   });

//   it('should return formatted tournament data structure', async () => {
//     // Test that the method exists and returns a promise
//     const promise = service.getTournamentRpl();
//     assert.ok(promise instanceof Promise);
    
//     // We could mock the repository here, but for now we just verify the interface
//     // The actual functionality is tested in integration tests
//   });
// });
