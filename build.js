import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

console.log('Building Spark News Live production bundle...');

// 1. Synchronize manifest and issue index
try {
  execSync('node scripts/generate-manifest.js', { stdio: 'inherit' });
} catch (e) {
  console.warn('Warning: manifest generator exited with non-zero status:', e.message);
}

const distDir = path.resolve('dist');
fs.mkdirSync(distDir, { recursive: true });

const filesToCopy = ['index.html', 'styles.css', 'app.js', 'issues.json', '.nojekyll', '404.html'];
for (const file of filesToCopy) {
  if (fs.existsSync(file)) {
    fs.copyFileSync(file, path.join(distDir, file));
  }
}

if (fs.existsSync('data')) {
  fs.cpSync('data', path.join(distDir, 'data'), { recursive: true });
}

if (fs.existsSync('vendor')) {
  fs.cpSync('vendor', path.join(distDir, 'vendor'), { recursive: true });
}

if (fs.existsSync('assets')) {
  fs.cpSync('assets', path.join(distDir, 'assets'), { recursive: true });
}

if (fs.existsSync('main')) {
  fs.cpSync('main', path.join(distDir, 'main'), { recursive: true });
}

console.log('Build completed: static files populated in dist/');
