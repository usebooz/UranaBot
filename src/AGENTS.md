# Source Code Instructions

## Architecture

- Commands live in `src/commands/`.
- Middlewares live in `src/middlewares/`.
- Services/business logic lives in `src/services/`.
- API access lives in `src/repositories/`.
- User-facing formatting lives in `src/formatters/`.
- Shared config and logging live in `src/utils/`.
- Shared types live in `src/types/`.
- GraphQL code lives in `src/gql/`.

## Boundaries

- Keep Telegram command handlers thin.
- Put business rules in services.
- Put external API calls in repositories.
- Put user-facing message formatting in formatters.
- Put reusable request/session/logging behavior in middleware.
