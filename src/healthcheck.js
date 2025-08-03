// Simple health check for Docker - проверяем что процесс Node.js запущен
const { execSync } = require('child_process');

try {
  // Проверяем что наш основной процесс запущен
  execSync('pgrep -f "node dist/index.js"', { stdio: 'pipe' });
  console.log('✅ Bot process is running');
  process.exit(0);
} catch (error) {
  console.log('❌ Bot process not found');
  process.exit(1);
}
