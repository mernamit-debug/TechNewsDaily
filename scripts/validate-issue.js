import fs from 'node:fs';
import path from 'node:path';

const targetFile = process.argv[2];
const issuesDir = path.resolve('data/issues');

function validateIssue(filePath) {
  const relPath = path.relative('.', filePath);
  const content = fs.readFileSync(filePath, 'utf-8');
  let data;
  try {
    data = JSON.parse(content);
  } catch (err) {
    return { valid: false, errors: [`JSON Syntax Error: ${err.message}`] };
  }

  const errors = [];
  const warnings = [];

  // Required root sections
  if (!data.meta) errors.push('Missing "meta" object');
  else {
    if (data.meta.issue_number === undefined) errors.push('Missing "meta.issue_number"');
    if (!data.meta.date) errors.push('Missing "meta.date" (YYYY-MM-DD)');
  }

  if (!data.lead_story) errors.push('Missing "lead_story" object');
  else {
    if (!data.lead_story.headline) errors.push('Missing "lead_story.headline"');
    if (!data.lead_story.catch_up) errors.push('Missing "lead_story.catch_up"');
    if (!data.lead_story.why_it_matters) warnings.push('Recommended "lead_story.why_it_matters" is missing');
  }

  if (!data.interactive_model) {
    warnings.push('Missing "interactive_model" object; default model will be used');
  } else {
    if (!data.interactive_model.archetype) errors.push('Missing "interactive_model.archetype"');
    if (!data.interactive_model.title) errors.push('Missing "interactive_model.title"');
  }

  if (!data.cheat_sheet || !Array.isArray(data.cheat_sheet) || data.cheat_sheet.length === 0) {
    warnings.push('"cheat_sheet" array is empty or missing');
  }

  if (!data.company_spotlight && !data.titan_spotlight) {
    warnings.push('Missing "company_spotlight" object');
  }

  if (!data.quick_hits || !Array.isArray(data.quick_hits)) {
    warnings.push('"quick_hits" array is missing');
  }

  if (!data.deep_dive) {
    warnings.push('Missing "deep_dive" object');
  }

  return { valid: errors.length === 0, errors, warnings };
}

let allPassed = true;

if (targetFile) {
  const p = path.resolve(targetFile);
  if (!fs.existsSync(p)) {
    console.error(`File not found: ${targetFile}`);
    process.exit(1);
  }
  const result = validateIssue(p);
  console.log(`\nValidating ${targetFile}:`);
  if (result.errors.length) {
    console.error(`❌ Errors (${result.errors.length}):\n  - ` + result.errors.join('\n  - '));
    allPassed = false;
  }
  if (result.warnings.length) {
    console.warn(`⚠️ Warnings (${result.warnings.length}):\n  - ` + result.warnings.join('\n  - '));
  }
  if (result.valid) {
    console.log(`✅ Issue structure is 100% valid! Ready for publishing.`);
  }
} else {
  console.log(`Validating all issues in ${issuesDir}...`);
  const files = fs.readdirSync(issuesDir).filter(f => f.endsWith('.json')).sort();
  for (const f of files) {
    const p = path.join(issuesDir, f);
    const result = validateIssue(p);
    if (!result.valid) {
      console.error(`❌ ${f}: FAIL\n  - ` + result.errors.join('\n  - '));
      allPassed = false;
    } else {
      const warnStr = result.warnings.length ? ` (${result.warnings.length} warnings)` : '';
      console.log(`✅ ${f}: PASS${warnStr}`);
    }
  }
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\nAll checked issue files conform to the JSON publication schema.');
}
