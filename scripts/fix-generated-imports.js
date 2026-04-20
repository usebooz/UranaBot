#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const generatedDir = path.join(__dirname, '..', 'src', 'gql', 'generated');

/**
 * Fixes generated imports by adding .js extensions.
 */
function fixImports() {
  const files = fs.readdirSync(generatedDir);
  
  for (const file of files) {
    if (!file.endsWith('.ts')) continue;
    
    const filePath = path.join(generatedDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Add .js extensions to relative imports.
    content = content.replace(
      /from ['"](\.\/.+?)(?<!\.js)['"];/g,
      "from '$1.js';"
    );
    
    // Add .js extensions to relative exports.
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
