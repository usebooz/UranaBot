# GraphQL Instructions

- Use `schemas/sports.json` as the source of truth for Sports.ru GraphQL types and fields.
- The bot currently uses only the `fantasyQueries` root in the Sports.ru GraphQL API unless explicitly requested otherwise.
- Do not fetch or introspect the live Sports.ru schema unless explicitly requested.
- Run `npm run schema:update:sports` only when the local schema snapshot needs to be refreshed.
- GraphQL operation documents live in `src/gql/queries/`.
- Generated GraphQL files live in `src/gql/generated/`.
- GraphQL Code Generator is configured in `codegen.ts`.
- When adding or changing operations, inspect `schemas/sports.json` and existing queries first.
- Request only fields that are used by the bot.
- Run `npm run codegen` after changing files in `src/gql/queries/`.
- Use `npm run codegen`, not raw `graphql-codegen`, because generated imports must be fixed for ESM.
- Sports.ru integration tests must cover every operation defined in `src/gql/queries/`.
- After GraphQL-related changes, run or recommend `npm run test:integration` or the manual `Integration Tests` workflow.
- Do not manually edit generated GraphQL files unless explicitly required.
