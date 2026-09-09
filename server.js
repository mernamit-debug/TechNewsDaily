import express from 'express';
import compression from 'compression';
import path from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { generateManifest } from './scripts/generate-manifest.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

// Enable Gzip/Deflate compression for all responses
app.use(compression({
  threshold: 1024,
  level: 6
}));

// Initial synchronization of manifest from JSON issues
try {
  generateManifest({ silent: false });
} catch (e) {
  console.warn('Initial manifest sync warning:', e.message);
}

// Watch data/issues for any new or modified JSON files and auto-sync immediately
const issuesDir = path.join(__dirname, 'data', 'issues');
if (fs.existsSync(issuesDir)) {
  let debounceTimer = null;
  fs.watch(issuesDir, (eventType, filename) => {
    if (filename && filename.endsWith('.json')) {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        try {
          console.log(`[Auto-Sync] Detected change in data/issues/${filename} (${eventType}). Regenerating manifest...`);
          generateManifest({ silent: true });
        } catch (err) {
          console.error('[Auto-Sync Error]', err.message);
        }
      }, 100);
    }
  });
}

// Dynamic endpoints for manifest and issues index - always returns latest sorted state
const serveFreshManifest = (req, res) => {
  try {
    const manifest = generateManifest({ silent: true });
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Content-Type', 'application/json');
    res.json(manifest);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate manifest', message: err.message });
  }
};

app.get(['/api/manifest', '/api/issues', '/data/manifest.json', '/issues.json'], serveFreshManifest);

// Always serve fresh JSON files directly from data/issues/
app.get('/data/issues/:filename', (req, res, next) => {
  const file = req.params.filename;
  const filePath = path.join(issuesDir, file);
  if (fs.existsSync(filePath)) {
    res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    res.setHeader('Content-Type', 'application/json');
    return res.sendFile(filePath);
  }
  next();
});

// Determine static root: dist if it exists, otherwise __dirname
const staticDir = fs.existsSync(path.join(__dirname, 'dist', 'index.html'))
  ? path.join(__dirname, 'dist')
  : __dirname;

// Serve static assets with high-efficiency caching headers
app.use(express.static(staticDir, {
  maxAge: 0,
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.json') || filePath.endsWith('.html') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    } else if (/\.(woff2?|ttf|svg|png|jpe?g|webp|gif|ico)$/i.test(filePath)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
  }
}));

app.get('*', (req, res) => {
  res.sendFile(path.join(staticDir, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

