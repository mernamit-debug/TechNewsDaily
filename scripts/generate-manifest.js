import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ISSUES_DIR = path.resolve('data/issues');
const MANIFEST_PATH = path.resolve('data/manifest.json');
const ROOT_ISSUES_PATH = path.resolve('issues.json');

export function generateManifest(options = {}) {
  const silent = options.silent ?? false;
  if (!fs.existsSync(ISSUES_DIR)) {
    if (!silent) console.error(`Issues directory not found: ${ISSUES_DIR}`);
    return [];
  }

  const issueFiles = fs.readdirSync(ISSUES_DIR)
    .filter(f => f.endsWith('.json'))
    .sort();

  if (!silent) console.log(`Found ${issueFiles.length} issue files in ${ISSUES_DIR}`);

  const manifest = [];
  let errorCount = 0;

  for (const file of issueFiles) {
    const filePath = path.join(ISSUES_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);

      const issueNumber = data.meta?.issue_number ?? parseInt(file.replace(/\D/g, ''), 10) ?? 0;
      const date = data.meta?.date || file.replace('.json', '');
      const headline = data.lead_story?.headline || data.meta?.title || `Issue #${issueNumber}`;
      const volume = data.meta?.volume || "VOLUME IV";
      const kicker = data.lead_story?.kicker || `ISSUE #${issueNumber}`;

      manifest.push({
        issue_number: Number(issueNumber),
        date: String(date),
        headline: String(headline),
        volume: String(volume),
        kicker: String(kicker),
        file_path: `data/issues/${file}`,
        reading_streak: data.meta?.reading_streak || Number(issueNumber),
        domain_tags: Array.isArray(data.quick_hits) ? [...new Set(data.quick_hits.map(h => (h.domain || '').toUpperCase()).filter(Boolean))] : []
      });
    } catch (err) {
      if (!silent) console.error(`Error parsing ${file}:`, err.message);
      errorCount++;
    }
  }

  // Pure JSON-driven sorting: sort descending by issue_number then date
  manifest.sort((a, b) => {
    if (b.issue_number !== a.issue_number) {
      return b.issue_number - a.issue_number;
    }
    return b.date.localeCompare(a.date);
  });

  const manifestJson = JSON.stringify(manifest, null, 2) + '\n';

  // Write to data/manifest.json
  fs.writeFileSync(MANIFEST_PATH, manifestJson);
  if (!silent) console.log(`Updated ${MANIFEST_PATH} with ${manifest.length} editions.`);

  // Mirror to root issues.json
  fs.writeFileSync(ROOT_ISSUES_PATH, manifestJson);
  if (!silent) console.log(`Updated ${ROOT_ISSUES_PATH} mirror.`);

  // Sync with dist/ if dist exists
  const distDataDir = path.resolve('dist/data');
  const distIssuesDir = path.resolve('dist/data/issues');
  const distManifest = path.resolve('dist/data/manifest.json');
  const distRootIssues = path.resolve('dist/issues.json');

  if (fs.existsSync('dist')) {
    fs.mkdirSync(distDataDir, { recursive: true });
    fs.mkdirSync(distIssuesDir, { recursive: true });

    // Copy all issue files to dist/data/issues
    for (const file of issueFiles) {
      const srcFile = path.join(ISSUES_DIR, file);
      const destFile = path.join(distIssuesDir, file);
      fs.copyFileSync(srcFile, destFile);
    }

    fs.writeFileSync(distManifest, manifestJson);
    fs.writeFileSync(distRootIssues, manifestJson);
    if (!silent) console.log(`Synchronized all ${issueFiles.length} issue JSON files to dist/`);
  }

  return manifest;
}

// Execute when invoked directly from CLI
const isMain = process.argv[1] && (path.resolve(process.argv[1]) === fileURLToPath(import.meta.url));
if (isMain) {
  generateManifest({ silent: false });
}

