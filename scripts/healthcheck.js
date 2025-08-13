// Простейший health check для Docker
console.log('🔍 Running health check...');

// Просто проверяем что Node.js запущен
if (process.pid) {
  console.log('✅ Health check passed - Node.js process running');
  process.exit(0);
} else {
  console.log('❌ Health check failed - No process found');
  process.exit(1);
}
