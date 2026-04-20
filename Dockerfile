FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build the app, keep production dependencies, and run as a non-root user.
RUN npm run build && \
    npm prune --omit=dev && \
    addgroup -g 1001 -S nodejs && \
    adduser -S uranabot -u 1001 && \
    chown -R uranabot:nodejs /app

USER uranabot

CMD ["node", "dist/index.js"]
