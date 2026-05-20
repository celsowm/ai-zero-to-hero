import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const slidesDir = join(projectRoot, 'src', 'content', 'slides');
const outlinePath = join(projectRoot, 'src', 'data', 'course-outline.ts');

const files = readdirSync(slidesDir).filter(f => f.endsWith('.ts') && f !== '_factory.ts' && f !== 'index.ts');
const ids = new Set();
let hasError = false;

for (const file of files) {
  const filePath = join(slidesDir, file);
  const raw = readFileSync(filePath, 'utf-8');
  const idMatch = raw.match(/id:\s*['"](.+?)['"]/);

  if (!idMatch) {
    console.error(`❌ ${file}: missing "id" field`);
    hasError = true;
  } else if (ids.has(idMatch[1])) {
    console.error(`❌ ${file}: duplicate id "${idMatch[1]}"`);
    hasError = true;
  } else {
    ids.add(idMatch[1]);
  }
}

const outlineIds = new Set(
  (readFileSync(outlinePath, 'utf-8').match(/'([\w-]+)'/g) ?? []).map(s => s.replace(/'/g, '')),
);

const fileIds = [...ids];
const missingFromOutline = fileIds.filter(id => !outlineIds.has(id));
const missingFromFiles = [...outlineIds].filter(id => !ids.has(id));

if (missingFromOutline.length > 0) {
  console.error(`❌ Slides missing from course-outline.ts: ${missingFromOutline.join(', ')}`);
  hasError = true;
}

if (missingFromFiles.length > 0) {
  console.error(`❌ course-outline.ts references missing slide files: ${missingFromFiles.join(', ')}`);
  hasError = true;
}

if (hasError) {
  console.error(`\n❌ Validation failed: ${files.length} slides checked, errors found.`);
  process.exit(1);
} else {
  console.log(`\n✅ All ${files.length} slides validated.`);
}
