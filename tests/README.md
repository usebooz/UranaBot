# Testing Guide

## Overview

This project uses **Jest** with TypeScript for comprehensive testing including unit tests and integration tests.

## Test Structure

```
tests/
├── setup.ts              # Test environment setup
├── unit/                  # Unit tests (isolated component testing)
│   ├── fantasy.formatter.test.ts
│   ├── fantasy-rpl.service.test.ts
│   ├── fantasy.repository.test.ts
│   └── tournament.command.test.ts
└── integration/           # Integration tests (real API calls)
    └── sports-ru-api.test.ts
```

## Running Tests

### All Tests
```bash
npm test
```

### Unit Tests Only
```bash
npm run test:unit
```

### Integration Tests Only
```bash
npm run test:integration
```

### Watch Mode (for development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### CI Mode (without integration tests)
```bash
npm run test:ci
```

## Test Types

### Unit Tests
- **Purpose**: Test individual components in isolation
- **Location**: `tests/unit/`
- **Mocking**: External dependencies are mocked
- **Speed**: Fast (< 1 second per test)
- **Examples**:
  - `FantasyFormatter` formatting logic
  - `FantasyRplService` business logic
  - `FantasyRepository` GraphQL queries (mocked)
  - `tournamentCommand` flow control

### Integration Tests
- **Purpose**: Test real API interactions
- **Location**: `tests/integration/`
- **Mocking**: Minimal (only environment setup)
- **Speed**: Slower (up to 10 seconds per test)
- **Examples**:
  - Real Sports.ru API calls
  - Network error handling
  - Data structure validation

## Test Configuration

### Jest Configuration (`jest.config.js`)
- **Preset**: `ts-jest` for TypeScript support
- **Environment**: `node` for Node.js APIs
- **Coverage**: Excludes `node_modules`, `dist`, `tests`
- **Setup**: Runs `tests/setup.ts` before tests

### Environment Variables
- `SKIP_INTEGRATION_TESTS=true`: Skip integration tests (useful for CI)
- `NODE_ENV=test`: Set automatically by Jest

## Writing Tests

### Unit Test Example
```typescript
import { describe, it, expect, jest } from '@jest/globals';
import { MyComponent } from '../src/components/my-component';

describe('MyComponent', () => {
  it('should do something', () => {
    const component = new MyComponent();
    const result = component.doSomething();
    expect(result).toBe('expected');
  });
});
```

### Integration Test Example
```typescript
import { describe, it, expect } from '@jest/globals';
import { MyApiClient } from '../src/clients/my-api-client';

describe('MyApiClient Integration', () => {
  it('should fetch real data', async () => {
    if (process.env.SKIP_INTEGRATION_TESTS === 'true') {
      return;
    }

    const client = new MyApiClient();
    const data = await client.fetchData();
    expect(data).toBeDefined();
  }, 10000); // 10s timeout
});
```

## Mocking Strategy

### Unit Tests Mocking
- **Services**: Mock with `jest.mock()`
- **Repositories**: Mock GraphQL client responses
- **External APIs**: Mock all network calls
- **Context**: Mock Grammy bot context

### Integration Tests Mocking
- **Environment**: Mock only test-specific environment
- **Network**: Use real network calls
- **Database**: Use test database or skip if unavailable

## Coverage Goals

- **Unit Tests**: > 90% coverage for business logic
- **Integration Tests**: Cover critical API paths
- **Overall**: > 80% total coverage

## CI/CD Integration

### GitHub Actions
```yaml
- name: Run Tests
  run: npm run test:ci
```

### Local Development
```bash
# Quick check before commit
npm run test:unit

# Full check before push
npm test
```

## Common Test Patterns

### Testing Async Functions
```typescript
it('should handle async operation', async () => {
  const result = await asyncFunction();
  expect(result).toBe('expected');
});
```

### Testing Error Handling
```typescript
it('should handle errors gracefully', async () => {
  mockService.method.mockRejectedValue(new Error('Test error'));
  await expect(functionUnderTest()).rejects.toThrow('Test error');
});
```

### Testing with Timeouts
```typescript
it('should complete within time limit', async () => {
  const result = await slowFunction();
  expect(result).toBeDefined();
}, 5000); // 5 second timeout
```

## Debugging Tests

### Debug Single Test
```bash
npm test -- --testNamePattern="specific test name"
```

### Debug with Console Output
```bash
npm test -- --verbose
```

### Debug Integration Tests
```bash
npm run test:integration -- --verbose
```

## Best Practices

1. **Descriptive Names**: Use clear, descriptive test names
2. **Arrange-Act-Assert**: Structure tests clearly
3. **One Assertion**: Focus on one thing per test
4. **Mock External Dependencies**: Keep unit tests isolated
5. **Test Edge Cases**: Include null, empty, and error scenarios
6. **Use TypeScript**: Leverage type safety in tests
7. **Keep Tests Fast**: Unit tests should be under 100ms
8. **Document Complex Tests**: Add comments for complex test logic

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Check `tsconfig.json` and Jest config
2. **Mock Not Working**: Ensure mock is defined before import
3. **Integration Tests Failing**: Check network connectivity and API availability
4. **Coverage Too Low**: Add tests for uncovered branches

### Getting Help

- Check Jest documentation: https://jestjs.io/
- Check ts-jest documentation: https://kulshekhar.github.io/ts-jest/
- Review existing tests for patterns
- Ask team members for review
