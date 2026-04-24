# Test Instructions

- Unit tests live in tests/unit/.
- Integration tests live in tests/integration/.
- Telegram e2e tests live in tests/e2e/.
- Unit tests must be isolated and must not call real external services.
- Mock Sports.ru, Telegram, GraphQL, and other external APIs in unit tests.
- Integration tests may call real external services such as Sports.ru.
- Telegram e2e tests may call the Telegram test environment and must stay out of normal PR CI.
- Keep e2e bot/client startup in `tests/e2e/setup/`; test files should only describe scenarios.
- Run `npm run test:integration` or the manual `Integration Tests` workflow after Sports.ru API, GraphQL schema/query, repository, or codegen changes.
- Prefer tests that verify observable behavior, not only imports or function signatures.
- Add or update tests when changing behavior.
- Run npm run test:unit after changing behavior or tests.
