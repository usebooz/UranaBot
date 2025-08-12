# Uranabot 🤖

A modern Telegram bot built with TypeScript using the grammY library.

## Deployment Status

✅ **Latest Update:** Improved healthcheck and docker-compose configuration

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

## 🛠️ Tech Stack

- **Runtime**: Node.js 18+
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

- Node.js 18 or higher
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

1. **Build the project**

   ```bash
   npm run build
   ```

2. **Run with Docker Compose**

   ```bash
   docker compose up -d
   ```

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

- `/start` - start the bot and greet the user
- `/help` - help with commands
- `/stats` - user statistics

## 🏗️ Project Structure

```text
uranabot/
├── src/
│   ├── commands/          # Bot commands
│   │   ├── tournament.command.ts
│   │   └── index.ts
│   ├── formatters/        # Data formatting for users
│   │   ├── fantasy.formatter.ts
│   │   └── index.ts
│   ├── gql/              # GraphQL types and queries
│   │   ├── generated/    # Auto-generated types
│   │   ├── queries/      # GraphQL queries
│   │   │   ├── tournament.query.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── middlewares/      # Middleware functions
│   │   ├── filter.middleware.ts
│   │   ├── logging.middleware.ts
│   │   ├── session.middleware.ts
│   │   └── index.ts
│   ├── repositories/     # Data access layer
│   │   ├── base.repository.ts
│   │   ├── fantasy.repository.ts
│   │   └── index.ts
│   ├── services/         # Business logic
│   │   ├── fantasy-rpl.service.ts
│   │   └── index.ts
│   ├── types/            # TypeScript types
│   │   ├── context.type.ts
│   │   └── index.ts
│   ├── utils/            # Utilities
│   │   ├── logger.ts
│   │   └── index.ts
│   ├── config.ts         # Configuration
│   └── index.ts          # Entry point
├── healthcheck.js        # Health check for Docker
├── schemas/              # JSON schemas
│   └── sports.json
├── .github/
│   ├── workflows/
│   │   └── deploy.yml    # GitHub Actions workflow
│   └── copilot-instructions.md
├── dist/                 # Compiled files (generated)
├── docker-compose.yml    # Docker Compose configuration
├── Dockerfile           # Docker image
├── codegen.ts           # GraphQL Code Generator
├── .env.example         # Example environment variables
└── package.json
```

## 🧪 Testing

The project uses **Node.js Test Runner** for maximum compatibility with ES modules and TypeScript.

### Test Structure

```text
tests/
├── unit/                 # Unit tests
│   ├── fantasy.formatter.test.ts
│   ├── fantasy.service.test.ts
│   ├── fantasy.repository.test.ts
│   └── tournament.command.test.ts
└── integration/          # Integration tests
    └── sports-api.test.ts
```

### Types of Tests

- **Unit tests**: Test individual modules and functions in isolation
- **Integration tests**: Test interaction with real APIs and external services

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

### CI/CD Testing

In CI, the `npm run test:ci` command is used, which:

- Skips integration tests (via `SKIP_INTEGRATION_TESTS=true`)
- Generates a code coverage report
- Runs quickly without external dependencies

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```env
NODE_ENV=development
LOG_LEVEL=info
BOT_TOKEN=your_telegram_bot_token_here
SPORTS_API_URL=https://www.sports.ru/gql/graphql/
SPORTS_TOURNAMENT_RPL=rpl_tournament_webname_here
```

### GitHub Secrets

For automatic deployment, set up the following secrets in your GitHub repository:

- `BOT_TOKEN` - your Telegram bot token
- `HOST` - your server's IP address
- `USERNAME` - user for SSH connection
- `SSH_PRIVATE_KEY` - private SSH key

## 🚀 Deployment

### Automatic Deployment

1. Pushing to the `main` branch will automatically trigger the CI/CD pipeline
2. GitHub Actions will build the Docker image
3. The image will be pushed to the GitHub Container Registry
4. Deployment to your server will occur automatically

### Manual Deployment

```bash
# Build the image
docker build -t uranabot .

# Run the container
docker run -d --name uranabot -e BOT_TOKEN=your_token uranabot
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
