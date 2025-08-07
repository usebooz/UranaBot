# Uranabot 🤖

Современный Telegram бот, построенный на TypeScript с использованием библиотеки grammY.

## Deployment Status

✅ **Latest Update:** Improved healthcheck and docker-compose configuration

## Features

- 🚀 **TypeScript** - полная типизация и безопасность
- 🎯 **grammY** - современная библиотека для Telegram ботов
- 🌐 **GraphQL** - интеграция с sports.ru API
- 🏗️ **Модульная архитектура** - расширяемая структура для новых API
- 🧹 **ESLint + Prettier** - качество и консистентность кода
- 🐳 **Docker** - контейнеризация и простой деплой
- 🔄 **GitHub Actions** - автоматический CI/CD
- 📝 **Логирование** - подробное логирование всех операций
- 🛡️ **Безопасность** - управление секретами через GitHub Secrets

## 🛠️ Технологический стек

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Bot Framework**: grammY
- **GraphQL**: graphql-request для API интеграции
- **Testing**: Node.js Test Runner с TypeScript поддержкой
- **Linting**: ESLint с TypeScript правилами
- **Formatting**: Prettier
- **Containerization**: Docker & Docker Compose
- **CI/CD**: GitHub Actions
- **Environment**: dotenv для управления переменными

## 🚀 Быстрый старт

### Предварительные требования

- Node.js 18 или выше
- npm или yarn
- Docker (для продакшена)
- Telegram Bot Token (получить у [@BotFather](https://t.me/BotFather))

### Локальная разработка

1. **Клонирование репозитория**

   ```bash
   git clone <your-repo-url>
   cd uranabot
   ```

2. **Установка зависимостей**

   ```bash
   npm install
   ```

3. **Настройка переменных окружения**

   ```bash
   cp .env.example .env
   # Отредактируйте .env файл и добавьте ваш BOT_TOKEN
   ```

4. **Запуск в режиме разработки**

   ```bash
   npm run dev
   ```

### Продакшен деплой

1. **Сборка проекта**

   ```bash
   npm run build
   ```

2. **Запуск с Docker Compose**

   ```bash
   docker compose up -d
   ```

## 📋 Доступные команды

### NPM скрипты

- `npm run dev` - запуск в режиме разработки с автоперезагрузкой
- `npm run build` - сборка TypeScript в JavaScript
- `npm start` - запуск собранного приложения
- `npm run lint` - проверка кода ESLint
- `npm run lint:fix` - автоисправление ошибок ESLint
- `npm run format` - форматирование кода Prettier
- `npm run format:check` - проверка форматирования
- `npm run type-check` - проверка типов TypeScript

### Тестирование

- `npm test` - запуск всех тестов (unit + integration)
- `npm run test:unit` - запуск только unit тестов
- `npm run test:integration` - запуск только интеграционных тестов  
- `npm run test:watch` - запуск тестов в watch режиме
- `npm run test:debug` - запуск тестов с отладчиком
- `npm run test:coverage` - запуск тестов с coverage отчетом
- `npm run test:ci` - запуск тестов для CI (без интеграционных)

### Команды бота

- `/start` - запуск бота и приветствие
- `/help` - справка по командам
- `/stats` - статистика пользователя

## 🏗️ Структура проекта

```text
uranabot/
├── src/
│   ├── commands/          # Команды бота
│   │   ├── tournament.command.ts
│   │   └── index.ts
│   ├── formatters/        # Форматирование данных для пользователя
│   │   ├── fantasy.formatter.ts
│   │   └── index.ts
│   ├── gql/              # GraphQL типы и запросы
│   │   ├── generated/    # Автогенерированные типы
│   │   ├── queries/      # GraphQL запросы
│   │   │   ├── tournament.query.ts
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── middlewares/      # Middleware функции
│   │   ├── filter.middleware.ts
│   │   ├── logging.middleware.ts
│   │   ├── session.middleware.ts
│   │   └── index.ts
│   ├── repositories/     # Слой доступа к данным
│   │   ├── base.repository.ts
│   │   ├── fantasy.repository.ts
│   │   └── index.ts
│   ├── services/         # Бизнес-логика
│   │   ├── fantasy-rpl.service.ts
│   │   └── index.ts
│   ├── types/            # TypeScript типы
│   │   ├── context.type.ts
│   │   └── index.ts
│   ├── utils/            # Утилиты
│   │   ├── logger.ts
│   │   └── index.ts
│   ├── config.ts         # Конфигурация
│   └── index.ts          # Точка входа
├── healthcheck.js        # Health check для Docker
├── schemas/              # JSON схемы
│   └── sports-ru.json
├── .github/
│   ├── workflows/
│   │   └── deploy.yml    # GitHub Actions workflow
│   └── copilot-instructions.md
├── dist/                 # Собранные файлы (генерируется)
├── docker-compose.yml    # Docker Compose конфигурация
├── Dockerfile           # Docker образ
├── codegen.ts           # GraphQL Code Generator
├── .env.example         # Пример переменных окружения
└── package.json
```

## 🧪 Тестирование

Проект использует **Node.js Test Runner** для максимальной совместимости с ES модулями и TypeScript.

### Структура тестов

```text
tests/
├── unit/                 # Unit тесты
│   ├── fantasy.formatter.test.ts
│   ├── fantasy.service.test.ts
│   ├── fantasy.repository.test.ts
│   └── tournament.command.test.ts
└── integration/          # Интеграционные тесты
    └── sports-ru-api.test.ts
```

### Типы тестов

- **Unit тесты**: Проверяют отдельные модули и функции в изоляции
- **Integration тесты**: Проверяют работу с реальными API и внешними сервисами

### Запуск тестов

```bash
# Все тесты
npm test

# Только unit тесты
npm run test:unit

# Только интеграционные тесты
npm run test:integration

# Watch режим для разработки
npm run test:watch

# С покрытием кода
npm run test:coverage
```

### CI/CD тестирование

В CI используется команда `npm run test:ci`, которая:

- Пропускает интеграционные тесты (через `SKIP_INTEGRATION_TESTS=true`)
- Генерирует отчет покрытия кода
- Быстро выполняется без внешних зависимостей

## 🔧 Конфигурация

### Переменные окружения

Создайте `.env` файл на основе `.env.example`:

```env
NODE_ENV=development
LOG_LEVEL=info
PORT=3000
BOT_TOKEN=your_telegram_bot_token_here
SPORTS_API_URL=https://www.sports.ru/gql/graphql/
SPORTS_TOURNAMENT_RPL=rpl_tournament_webname_here
```

### GitHub Secrets

Для автоматического деплоя настройте следующие секреты в вашем GitHub репозитории:

- `BOT_TOKEN` - токен вашего Telegram бота
- `HOST` - IP адрес вашего сервера
- `USERNAME` - пользователь для SSH подключения
- `SSH_PRIVATE_KEY` - приватный SSH ключ
- `PORT` - порт SSH (опционально, по умолчанию 22)

## 🚀 Деплой

### Автоматический деплой

1. Пуш в ветку `main` автоматически запустит CI/CD pipeline
2. GitHub Actions соберет Docker образ
3. Образ будет отправлен в GitHub Container Registry
4. Деплой на ваш сервер произойдет автоматически

### Ручной деплой

```bash
# Сборка образа
docker build -t uranabot .

# Запуск контейнера
docker run -d --name uranabot -e BOT_TOKEN=your_token uranabot
```

## 🐛 Отладка

### Логи

Бот ведет подробные логи всех операций. Уровень логирования настраивается через переменную `LOG_LEVEL`:

- `debug` - подробная отладочная информация
- `info` - основная информация (по умолчанию)
- `warn` - предупреждения
- `error` - только ошибки

### Просмотр логов Docker

```bash
# Логи контейнера
docker compose logs -f uranabot

# Логи конкретного контейнера
docker logs uranabot
```

### Отладка тестов

```bash
# Запуск тестов с отладчиком
npm run test:debug

# Watch режим для разработки
npm run test:watch

# Проверка покрытия кода
npm run test:coverage
```

## 🤝 Разработка

### Добавление новых команд

1. Откройте `src/commands/index.ts`
2. Добавьте новую команду:

```typescript
bot.command('newcommand', async (ctx) => {
  await ctx.reply('Новая команда работает!');
});
```

### Добавление middleware

1. Откройте `src/middlewares/index.ts`
2. Добавьте новый middleware:

```typescript
bot.use(async (ctx, next) => {
  // Ваша логика
  await next();
});
```

### Написание тестов

Для добавления новых тестов используйте Node.js Test Runner:

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

**Unit тесты** размещайте в `tests/unit/`, **интеграционные** в `tests/integration/`.

## 📝 Лицензия

MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 🔗 Полезные ссылки

- [grammY Documentation](https://grammy.dev/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

---

Сделано с ❤️ для эффективной разработки Telegram ботов
