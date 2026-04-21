# GraphQL Instructions

- Use `schemas/sports.json` as the source of truth for Sports.ru GraphQL types and fields.
- The bot currently uses only the `fantasyQueries` root in the Sports.ru GraphQL API unless explicitly requested otherwise.
- Do not fetch or introspect the live Sports.ru schema unless explicitly requested.
- Run `npm run schema:update:sports` only when explicitly asked to refresh the live schema, when Sports.ru schema changes are suspected, or when required fields/types are missing from `schemas/sports.json`.
- GraphQL operation documents live in `src/gql/queries/`.
- Generated GraphQL files live in `src/gql/generated/`.
- GraphQL Code Generator is configured in `codegen.ts`.
- When adding or changing operations, inspect `schemas/sports.json` and existing queries first.
- Request only fields that are used by the bot.
- After GraphQL query or schema-derived type changes, run `npm run codegen:fix`.
- After updating `schemas/sports.json`, inspect the schema diff before regenerating types.
- `npm run codegen:fix` also runs `scripts/fix-generated-imports.js` to fix ESM `.js` imports.
- Sports.ru integration tests must cover every operation defined in `src/gql/queries/`.
- After changing `schemas/sports.json`, `src/gql/queries/`, `codegen.ts`, or generated GraphQL usage, run or recommend `npm run test:integration` or the manual `Integration Tests` workflow.
- Do not manually edit generated GraphQL files unless explicitly required.
