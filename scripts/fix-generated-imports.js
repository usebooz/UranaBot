#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatedDir = path.join(__dirname, '..', 'src', 'gql', 'generated');

/**
 * Исправляет импорты в сгенерированных файлах, добавляя расширения .js
 */
function fixImports() {
  const files = fs.readdirSync(generatedDir);
  
  for (const file of files) {
    if (!file.endsWith('.ts')) continue;
    
    const filePath = path.join(generatedDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Заменяем относительные импорты без расширения на импорты с .js
    content = content.replace(
      /from ['"](\.\/.+?)(?<!\.js)['"];/g,
      "from '$1.js';"
    );
    
    // Заменяем экспорты без расширения на экспорты с .js
    content = content.replace(
      /export \* from ['"](\.\/.+?)(?<!\.js)['"];/g,
      "export * from '$1.js';"
    );
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed imports in ${file}`);
  }
}

fixImports();
console.log('🎉 All generated files fixed!');
