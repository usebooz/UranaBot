# Uranabot

Telegram bot for Sports.ru fantasy data, built with TypeScript and grammY.

## Stack

- Node.js 24
- TypeScript ESM
- grammY
- Sports.ru GraphQL via `graphql-request`
- GraphQL Code Generator
- ESLint + Prettier
- Docker + Docker Compose
- GitHub Actions
- Caddy reverse proxy for the public Sports.ru proxy endpoint

## What the Bot Does

- `/info` shows current fantasy tournament information.
- `/league <id>` shows a fantasy league table and saves the league ID in session.
- `/debug` shows debug information and mini app links.

## Requirements

- Node.js `>=24 <25`
- npm
- Telegram bot token from [@BotFather](https://t.me/BotFather)

## Environment

Local development uses `.env`.

Production deployment uses:

- GitHub Secrets for sensitive values such as `BOT_TOKEN`, `HOST`, `USERNAME`, `SSH_PRIVATE_KEY`
- GitHub Variables for non-secret runtime configuration such as Sports.ru, UranaWeb, and proxy URLs

Available variables are documented in [.env.example](/Users/usebooz/Workspaces/DAS/uranabot/.env.example).

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Create local env file:

```bash
cp .env.example .env
```

3. Start the bot in watch mode:

```bash
npm run dev
```

## Scripts

Core scripts:

- `npm run dev` starts the bot with `tsx watch`
- `npm run build` builds `src/` into `dist/`
- `npm start` runs the compiled bot
- `npm run lint` runs ESLint for TypeScript and project scripts
- `npm run type-check` runs TypeScript without emitting files

Testing:

- `npm test` runs all tests under `tests/`
- `npm run test:unit` runs isolated unit tests
- `npm run test:integration` runs real Sports.ru integration tests
- `npm run test:e2e:telegram:mtcute` runs an experimental MTProto-based Telegram e2e probe against the Telegram test environment
- `npm run test:coverage` runs unit-test coverage only
- `npm run test:ci` skips integration tests for normal CI

GraphQL:

- `npm run schema:update:sports` refreshes `schemas/sports.json` from the live Sports.ru endpoint
- `npm run codegen` generates GraphQL types and helpers
- `npm run codegen:fix` runs codegen and then fixes ESM `.js` imports in generated files

## GraphQL Workflow

Sports.ru schema handling is intentionally local-first.

- `schemas/sports.json` is the source of truth for schema-based development
- GraphQL operation documents live in `src/gql/queries/`
- Generated files live in `src/gql/generated/`
- The bot currently uses only the `fantasyQueries` root

Typical workflow for GraphQL changes:

1. Inspect `schemas/sports.json` and existing queries.
2. Update files in `src/gql/queries/`.
3. Run `npm run codegen:fix`.
4. Run `npm run test:integration` or the manual GitHub `Integration Tests` workflow.

Do not introspect the live Sports.ru schema unless you explicitly want to refresh the local schema snapshot.

## Testing Strategy

Unit tests:

- live in `tests/unit/`
- must stay isolated from real external services
- should mock Sports.ru, Telegram, GraphQL, and other network dependencies

Integration tests:

- live in `tests/integration/`
- may call real Sports.ru services
- must cover every operation defined in `src/gql/queries/`

GitHub workflows:

- `.github/workflows/deploy.yml` runs on PRs to `main` and on pushes to `main`
- `.github/workflows/integration-tests.yml` is manual-only and runs real Sports.ru integration tests

Experimental Telegram e2e probe:

- `scripts/telegram-e2e-mtcute.js` uses an MTProto user session via `@mtcute/node`
- it is intended for Telegram test-environment checks, not normal PR CI
- it probes private and group command flows and reports pass/fail per scenario
- first run may require interactive MTProto login code input and then reuses the saved session file

## Deployment

Deployment is automated from `main`.

Flow:

1. GitHub Actions runs lint, type-check, `test:ci`, and build.
2. On `main`, GitHub Actions validates required secrets and variables.
3. The bot image is built and pushed to GHCR.
4. The VPS receives `docker-compose.yml`, `Caddyfile`, and generated `.env`.
5. The server runs `docker compose pull` and `docker compose up -d --remove-orphans`.
6. Health checks confirm both the bot and proxy are healthy.

Runtime services:

- `uranabot` container runs the Telegram bot
- `uranaapi` container runs Caddy as the public proxy for Sports.ru GraphQL requests

The bot health check calls Telegram `getMe`.
The proxy health check probes the configured public proxy URL.

## Project Layout

```text
src/
  commands/      Telegram command handlers
  formatters/    User-facing formatting
  gql/           GraphQL schema usage, queries, generated files
  middlewares/   Shared bot behavior
  repositories/  Sports.ru API access
  services/      Business logic
  types/         Shared TypeScript types
  utils/         Config and logging

tests/
  unit/          Isolated unit tests
  integration/   Real Sports.ru integration tests
```

## Telegram API References

When adding bot features, use both references:

- Official Telegram Bot API: [core.telegram.org/bots/api](https://core.telegram.org/bots/api)
- grammY reference: [grammy.dev/ref](https://grammy.dev/ref/)

Telegram Bot API may expose features before grammY adds first-class support. In that case, confirm whether the feature is available through grammY directly, through `ctx.api` / `bot.api`, or needs a temporary workaround.
