# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем ВСЕ зависимости для сборки
RUN npm ci

# Копируем исходный код
COPY . .

# Build и создание пользователя для безопасности  
RUN npm run build && \
    npm prune --production && \
    addgroup -g 1001 -S nodejs && \
    adduser -S uranabot -u 1001

# Копируем healthcheck отдельно после сборки
COPY src/healthcheck.js dist/
RUN chown -R uranabot:nodejs /app

USER uranabot

# Устанавливаем health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/healthcheck.js

# Запускаем приложение
CMD ["node", "dist/index.js"]
