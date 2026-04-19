# Test Instructions

- Unit tests live in tests/unit/.
- Integration tests live in tests/integration/.
- Unit tests must be isolated and must not call real external services.
- Mock Sports.ru, Telegram, GraphQL, and other external APIs in unit tests.
- Integration tests may call real external services such as Sports.ru.
- Prefer tests that verify observable behavior, not only imports or function signatures.
- Add or update tests when changing behavior.
- Run npm run test:unit after changing behavior or tests.
