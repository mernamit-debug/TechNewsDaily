import express from 'express';
import compression from 'compression';
import path from 'path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

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

// Determine static root: dist if it exists, otherwise __dirname
const staticDir = fs.existsSync(path.join(__dirname, 'dist', 'index.html'))
  ? path.join(__dirname, 'dist')
  : __dirname;

// Serve static assets with high-efficiency caching headers
app.use(express.static(staticDir, {
  maxAge: '1h',
  etag: true,
  lastModified: true,
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.json') || filePath.endsWith('.html')) {
      // Revalidate manifest and issues quickly or stale-while-revalidate
      res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
    } else if (/\.(css|js|woff2?|ttf|svg|png|jpe?g|webp|gif|ico)$/i.test(filePath)) {
      // Immutable or long-lived static code & media
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
