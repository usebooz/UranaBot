# Uranabot 🤖

A modern Telegram bot built with TypeScript using the grammY library.

## Deployment Status

✅ **Latest Update:** All tests restored and passing

## Features

- 🚀 **TypeScript** - full type safety and security
- 🎯 **grammY** - modern library for Telegram bots
- 🌐 **GraphQL** - integration with sports.ru API
- 🏗️ **Modular Architecture** - extensible structure for new APIs
- 🧹 **ESLint + Prettier** - code quality and consistency
- 🐳 **Docker** - containerization and easy deployment
- 🔄 **GitHub Actions** - automated CI/CD
- 📝 **Logging** - detailed logging of all operations
- 🛡️ **Security** - secret management via GitHub Secrets
- ✅ **Testing** - comprehensive test suite
- 🌍 **Reverse Proxy** - Caddy-powered CORS proxy for API access

## 🔌 Proxy Configuration

The project includes a **Caddy reverse proxy** to handle CORS and route requests from your web app to the Sports.ru API:

### How it works

- **Frontend** (UranaWeb) makes requests to `https://urana.space/sportsru/`
- **Proxy** (Caddy) intercepts and rewrites the path to `/gql/graphql/`
- **Backend** (Sports.ru) receives the request at `https://sports.ru/gql/graphql/`
- **CORS headers** are automatically added for `https://usebooz.github.io`

### Proxy Environment Variables

```bash
# Proxy endpoint (your domain)
URANA_API_URL=urana_api_url_here
URANA_API_PATH=urana_api_path_here

# Target API
SPORTS_API_URL=sports_api_url_here
SPORTS_API_PATH=sports_api_path_here

# Allowed origin for CORS
URANAWEB_APP_URL=uranaweb_app_url_here
```

## 🛠️ Tech Stack

- **Runtime**: Node.js 20+
- **Language**: TypeScript
- **Bot Framework**: grammY
- **GraphQL**: graphql-request for API integration
- **Testing**: Node.js Test Runner with TypeScript support
- **Linting**: ESLint with TypeScript rules
- **Formatting**: Prettier
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Environment**: dotenv for environment variable management

## 🚀 Quick Start

### Prerequisites

- Node.js 20 or higher
- npm or yarn
- Docker (for production)
- Telegram Bot Token (get it from [@BotFather](https://t.me/BotFather))

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd uranabot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   # Edit the .env file and add your BOT_TOKEN
   ```

4. **Run in development mode**

   ```bash
   npm run dev
   ```

### Production Deployment

1. **Set up environment variables**

   Create a `.env` file or set environment variables on your server:

   ```bash
   # Copy and edit the example
   cp .env.example .env
   
   # Required variables:
   URANABOT_IMAGE=ghcr.io/usebooz/uranabot:latest
   BOT_TOKEN=your_telegram_bot_token_here
   SPORTS_API_URL=sports_api_url_here
   SPORTS_API_PATH=sports_api_path_here
   SPORTS_TOURNAMENT_RPL=rpl
   TELEGRAM_URL=telegram_url
   URANA_API_URL=urana_api_url_here
   URANA_API_PATH=urana_api_path_here
   URANAWEB_APP_URL=uranaweb_app_url_here
   URANAWEB_APP_PATH=uranaweb_app_path_here
   ```

2. **Deploy with Docker Compose**

   ```bash
   # Pull the configured bot image
   docker compose pull

   # Deploy both bot and proxy
   docker compose up -d
   
   # Check status
   docker compose ps
   
   # View logs
   docker compose logs -f
   ```

   This will start:
   - **uranabot**: Telegram bot container
   - **caddy**: Reverse proxy for CORS and API routing
   - **Automatic HTTPS**: Caddy handles SSL certificates

## 📋 Available Commands

### NPM Scripts

- `npm run dev` - run in development mode with auto-reload
- `npm run build` - build TypeScript to JavaScript
- `npm start` - start the compiled application
- `npm run lint` - check code with ESLint
- `npm run lint:fix` - auto-fix ESLint errors
- `npm run format` - format code with Prettier
- `npm run format:check` - check formatting
- `npm run type-check` - check TypeScript types

### Testing

- `npm test` - run all tests (unit + integration)
- `npm run test:unit` - run only unit tests
- `npm run test:integration` - run only integration tests  
- `npm run test:watch` - run tests in watch mode
- `npm run test:debug` - run tests with debugger
- `npm run test:coverage` - run tests with coverage report
- `npm run test:ci` - run tests for CI (without integration tests)

### Bot Commands

- `/info` - show bot and user information
- `/debug` - show debug information
- `/league` - show fantasy league information

## 🏗️ Project Structure

```text
uranabot/
├── src/
│   ├── commands/          # Bot commands
│   ├── formatters/        # Data formatting for users
│   ├── gql/              # GraphQL types and queries
│   │   ├── generated/    # Auto-generated types
│   │   └── queries/      # GraphQL queries
│   ├── middlewares/      # Middleware functions
│   ├── repositories/     # Data access layer
│   ├── services/         # Business logic
│   ├── types/            # TypeScript types
│   ├── utils/            # Utilities and configuration
│   │   ├── config.ts     # Configuration management
│   │   └── logger.ts     # Logging utilities
│   └── index.ts          # Entry point
├── scripts/              # Utility scripts
│   └── fix-generated-imports.js
├── schemas/              # JSON schemas
├── tests/               # Test files
│   ├── unit/            # Unit tests (organized by src structure)
│   │   ├── commands/    # Command tests
│   │   ├── formatters/  # Formatter tests
│   │   ├── middlewares/ # Middleware tests
│   │   ├── repositories/# Repository tests
│   │   ├── services/    # Service tests
│   │   └── utils/       # Utility tests
│   └── integration/     # Integration tests
├── .github/
│   ├── AGENTS.md
│   └── workflows/       # GitHub Actions workflows
├── dist/                 # Compiled files (generated)
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile           # Docker image
├── Caddyfile            # Caddy reverse proxy configuration
├── codegen.ts           # GraphQL Code Generator
├── .env.example         # Example environment variables
└── package.json
```

## 🧪 Testing

The project uses **Node.js Test Runner** for maximum compatibility with ES modules and TypeScript.

### Current Status: ✅ All tests passing

### Test Structure

```text
tests/
├── unit/                 # Unit tests
│   ├── commands/        # Bot command handlers
│   ├── formatters/      # Data formatting functions  
│   ├── middlewares/     # Middleware components
│   ├── repositories/    # Data access layer
│   ├── services/        # Business logic
│   └── utils/           # Utility functions and config
└── integration/          # Integration tests
    └── API tests        # Real API interaction tests
```

### Types of Tests

- **Unit tests**: Test individual modules and functions in isolation
- **Integration tests**: Test interaction with real APIs and external services

### Code Coverage

The project maintains excellent test coverage:

- **Lines**: High coverage across all modules
- **Branches**: Comprehensive branch testing
- **Functions**: Complete function coverage

Coverage is measured only for source code (`src/`), excluding test files from the report.

### Running Tests

```bash
# All tests
npm test

# Only unit tests
npm run test:unit

# Only integration tests
npm run test:integration

# Watch mode for development
npm run test:watch

# With code coverage
npm run test:coverage
```

### Recent Test Fixes

All previously failing tests have been restored:

- **sports-api.test.ts**: Fixed empty file, added comprehensive API tests
- **fantasy.formatter.test.ts**: Fixed empty file, added formatter validation tests
- **logger.test.ts**: Uncommented and fixed TypeScript compatibility
- **logging.middleware.test.ts**: Uncommented and fixed grammY framework compatibility  
- **session.middleware.test.ts**: Uncommented and fixed session interface alignment

### CI/CD Testing

In CI, the `npm run test:ci` command is used, which:

- Skips integration tests (via `SKIP_INTEGRATION_TESTS=true`)
- Runs quickly without external dependencies

Use `npm run test:coverage` when a local coverage report is needed.

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
LOG_LEVEL=info
URANABOT_IMAGE=ghcr.io/usebooz/uranabot:latest
BOT_TOKEN=your_telegram_bot_token_here
SPORTS_API_URL=sports_api_url_here
SPORTS_API_PATH=sports_api_path_here
SPORTS_TOURNAMENT_RPL=rpl_tournament_webname_here
TELEGRAM_URL=telegram_url
URANAWEB_APP_URL=uranaweb_app_url_here
URANAWEB_APP_PATH=uranaweb_app_path_here
URANA_API_URL=urana_api_url_here
URANA_API_PATH=urana_api_path_here
```

### GitHub Secrets

For automatic deployment, set up the following secrets in your GitHub repository:

- `BOT_TOKEN` - your Telegram bot token
- `HOST` - your server's IP address
- `USERNAME` - user for SSH connection
- `SSH_PRIVATE_KEY` - private SSH key

### GitHub Variables

For automatic deployment, set up the following variables in your GitHub repository:

- `SPORTS_API_URL` - Sports.ru API origin
- `SPORTS_API_PATH` - Sports.ru GraphQL path
- `SPORTS_TOURNAMENT_RPL` - RPL tournament identifier
- `TELEGRAM_URL` - Telegram bot URL
- `URANAWEB_APP_URL` - allowed UranaWeb origin
- `URANAWEB_APP_PATH` - UranaWeb app path
- `URANA_API_URL` - public Caddy proxy URL
- `URANA_API_PATH` - public Caddy proxy path

## 🚀 Deployment

### Automatic Deployment

1. Pushing to the `main` branch triggers the CI/CD pipeline
2. GitHub Actions runs linting, type checks, unit tests, and build
3. The Docker image is built and pushed to GitHub Container Registry
4. The image is tagged as `latest` and with the exact commit SHA
5. The server receives `docker-compose.yml`, `Caddyfile`, and `.env`
6. Docker Compose pulls the commit-SHA image and restarts services

### Manual Deployment

```bash
# Pull the configured image
docker compose pull

# Start or update services
docker compose up -d --remove-orphans

# Check service health
docker compose ps
```

## 🐛 Debugging

### Logs

The bot keeps detailed logs of all operations. The logging level is configured via the `LOG_LEVEL` variable:

- `debug` - detailed debug information
- `info` - general information (default)
- `warn` - warnings
- `error` - errors only

### Viewing Docker Logs

```bash
# Container logs
docker compose logs -f uranabot

# Specific container logs
docker logs uranabot
```

### Debugging Tests

```bash
# Run tests with debugger
npm run test:debug

# Watch mode for development
npm run test:watch

# Check code coverage
npm run test:coverage
```

## 🤝 Development

### Adding New Commands

1. Open `src/commands/index.ts`
2. Add a new command:

```typescript
bot.command('newcommand', async (ctx) => {
  await ctx.reply('New command is working!');
});
```

### Adding Middleware

1. Open `src/middlewares/index.ts`
2. Add new middleware:

```typescript
bot.use(async (ctx, next) => {
  // Your logic here
  await next();
});
```

### Writing Tests

To add new tests, use Node.js Test Runner:

```typescript
import { test, describe } from 'node:test';
import assert from 'node:assert';

describe('MyModule', () => {
  test('should work correctly', () => {
    const result = myFunction();
    assert.strictEqual(result, 'expected');
  });
});
```

**Unit tests** go in `tests/unit/`, **integration tests** in `tests/integration/`.

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Useful Links

- [grammY Documentation](https://grammy.dev/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

---

Made with ❤️ for efficient Telegram bot development
