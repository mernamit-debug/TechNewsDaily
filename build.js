import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve('dist');
fs.mkdirSync(distDir, { recursive: true });

const filesToCopy = ['index.html', 'styles.css', 'app.js', 'issues.json'];
for (const file of filesToCopy) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
  }
}

if (fs.existsSync('data')) {
  fs.cpSync('data', path.join(distDir, 'data'), { recursive: true });
}

if (fs.existsSync('main')) {
  fs.cpSync('main', path.join(distDir, 'main'), { recursive: true });
}

console.log('Build completed: static files populated in dist/');
