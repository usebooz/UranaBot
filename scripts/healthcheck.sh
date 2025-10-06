#!/usr/bin/env bash
set -euo pipefail

echo "🔍 Running uranaapi health check..."

# Загружаем переменные окружения из .env (URANA_API_URL, URANA_API_PATH, URANAWEB_APP_URL)
set -a
[ -f ".env" ] && . .env
set +a

if [ -z "${URANA_API_URL:-}" ] || [ -z "${URANA_API_PATH:-}" ] || [ -z "${URANAWEB_APP_URL:-}" ]; then
  echo "❌ Missing URANA_API_URL, URANA_API_PATH or URANAWEB_APP_URL in .env"
  exit 1
fi

TARGET="${URANA_API_URL%/}${URANA_API_PATH}"
ORIGIN="$URANAWEB_APP_URL"

echo "Target: $TARGET"
echo "Origin: $ORIGIN"

# --- 1. Preflight OPTIONS ---
echo "=== Preflight check ==="
PRE=$(curl -sS -o /dev/null -w "%{http_code}" -X OPTIONS \
  -H "Origin: $ORIGIN" \
  -H "Access-Control-Request-Method: POST" \
  "$TARGET" || true)

if [ "$PRE" != "204" ]; then
  echo "❌ Preflight failed (expected 204, got $PRE)"
  exit 2
fi
echo "✅ Preflight OK"

# --- 2. Proxy POST ---
echo "=== Proxy POST check ==="
CODE=$(curl -sS -o /dev/null -w "%{http_code}" \
  -H "Origin: $ORIGIN" \
  -H "Content-Type: application/json" \
  --data '{"query":"{ __typename }"}' \
  "$TARGET" || true)

case "$CODE" in
  200|400) echo "✅ Proxy responds with $CODE" ;;
  *) echo "❌ Proxy failed with $CODE"; exit 3 ;;
esac

# --- 3. Health контейнера (docker встроенный) ---
echo "=== Container state ==="
STATUS=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}n/a{{end}}' uranaapi 2>/dev/null || true)
if [ "$STATUS" != "healthy" ] && [ "$STATUS" != "n/a" ]; then
  echo "❌ uranaapi container health = $STATUS"
  exit 4
fi

echo "✅ uranaapi Health check passed"