# Uranabot Agent Instructions

## Project Basics

- Strict TypeScript ESM Telegram bot built with grammY.
- Local imports must use `.js` extensions.
- Runtime configuration comes from environment variables.
- Local secrets live in `.env`;
  production secrets/config live in GitHub Actions secrets and variables.
- `.env.example` documents available environment variables.
- Application logs should go to stdout/stderr.

## Code Style

- Use strict TypeScript and follow ESLint/Prettier rules.
- Prefer explicit return types for exported functions.
- Use async/await for asynchronous code.
- Prefer `const` over `let` when reassignment is not needed.
- Use meaningful variable and function names in English.
- Write code comments in English.
- Keep intentional Russian user-facing messages and operational log text in Russian.
- Avoid `any` unless a narrower type is impractical.

## Bot Behavior

- Use project context types, not `any`, for grammY handlers.
- Use the official Telegram Bot API docs as the source of truth
  for `Update` payloads, Telegram object shapes, and available bot methods:
  [core.telegram.org/bots/api](https://core.telegram.org/bots/api)
- Check the grammY reference for library capabilities, typing,
  and idiomatic usage before adding bot features:
  [grammy.dev/ref](https://grammy.dev/ref/)
- Telegram Bot API may expose newer features than the current grammY release;
  verify whether a feature is supported directly by grammY,
  via raw API calls, or needs a library-level workaround before implementing it.
- Put shared bot behavior in middleware instead of duplicating it in commands.
- Escape user-provided and API-provided text before sending Telegram messages with `MarkdownV2`.
- Use `bot.catch()` for unexpected bot errors.
- For expected failures, log the issue and send a user-friendly reply.
- Do not expose internal errors, stack traces, secrets, tokens, or raw API errors to users.

## Deployment

- Main branch changes deploy through GitHub Actions.
- The bot and proxy are deployed with Docker Compose.
- All deployed services should have health checks when practical.
- Be careful with Docker, Compose, Caddy, and GitHub Actions changes
  because they may affect production deployment.

## Checks

- For TypeScript code changes, run `npm run type-check`.
- For behavior changes, run `npm run test:unit`.
- For build or deployment-related changes, run `npm run lint` and `npm run build`.
- If checks cannot be run, explain why.

## Working Rules

- Keep changes small and focused.
- Keep `.env.example` in sync when required config changes.
- Keep `README.md` in sync when setup, scripts, environment variables,
  workflows, deployment, or developer workflow changes.
- Do not print, modify, or commit `.env` values unless explicitly requested.
- Do not commit secrets, tokens, production logs,
  `node_modules`, `dist`, coverage output, or local machine files.
- Do not revert unrelated user changes.
