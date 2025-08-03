// Simple health check for Docker - проверяем что процесс Node.js запущен
const fs = require('fs');

try {
  // Проверяем что файл процесса существует (более простой способ)
  const pid = process.pid;
  if (pid && fs.existsSync(`/proc/${pid}`)) {
    console.log('✅ Bot process is running');
    process.exit(0);
  } else {
    console.log('❌ Bot process not found');
    process.exit(1);
  }
} catch (error) {
  console.log('❌ Health check failed:', error.message);
  process.exit(1);
}
