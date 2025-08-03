# Используем официальный Node.js образ
FROM node:18-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci --only=production

# Копируем исходный код
COPY . .

# Компилируем TypeScript
RUN npm run build

# Создаем пользователя для безопасности
RUN addgroup -g 1001 -S nodejs && \
    adduser -S uranabot -u 1001

# Меняем владельца файлов
RUN chown -R uranabot:nodejs /app
USER uranabot

# Открываем порт
EXPOSE 3000

# Устанавливаем health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/healthcheck.js

# Запускаем приложение
CMD ["npm", "start"]
