# Uranabot 🤖

Современный Telegram бот, построенный на TypeScript с использованием библиотеки grammY.

## ✨ Особенности

- 🚀 **TypeScript** - полная типизация и безопасность
- 🎯 **grammY** - современная библиотека для Telegram ботов
- 🧹 **ESLint + Prettier** - качество и консистентность кода
- 🐳 **Docker** - контейнеризация и простой деплой
- 🔄 **GitHub Actions** - автоматический CI/CD
- 📝 **Логирование** - подробное логирование всех операций
- 🛡️ **Безопасность** - управление секретами через GitHub Secrets

## 🛠️ Технологический стек

- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Bot Framework**: grammY
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
   docker-compose up -d
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

### Команды бота

- `/start` - запуск бота и приветствие
- `/help` - справка по командам
- `/stats` - статистика пользователя

## 🏗️ Структура проекта

```text
uranabot/
├── src/
│   ├── commands/           # Команды бота
│   │   └── index.ts
│   ├── middlewares/        # Middleware функции
│   │   └── index.ts
│   ├── utils/             # Утилиты
│   │   └── logger.ts
│   ├── config.ts          # Конфигурация
│   ├── index.ts           # Точка входа
│   └── healthcheck.js     # Health check для Docker
├── .github/
│   ├── workflows/
│   │   └── deploy.yml     # GitHub Actions workflow
│   └── copilot-instructions.md
├── dist/                  # Собранные файлы (генерируется)
├── docker-compose.yml     # Docker Compose конфигурация
├── Dockerfile            # Docker образ
├── .env.example          # Пример переменных окружения
└── package.json
```

## 🔧 Конфигурация

### Переменные окружения

Создайте `.env` файл на основе `.env.example`:

```env
NODE_ENV=development
LOG_LEVEL=info
PORT=3000
BOT_TOKEN=your_telegram_bot_token_here
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
docker-compose logs -f uranabot

# Логи конкретного контейнера
docker logs uranabot
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

## 📝 Лицензия

MIT License - см. файл [LICENSE](LICENSE) для деталей.

## 🔗 Полезные ссылки

- [grammY Documentation](https://grammy.dev/)
- [Telegram Bot API](https://core.telegram.org/bots/api)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Docker Documentation](https://docs.docker.com/)

---

Сделано с ❤️ для эффективной разработки Telegram ботов
