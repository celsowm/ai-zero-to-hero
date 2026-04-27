import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const slidesDir = join(__dirname, '..', 'src', 'data', 'slides');

const files = readdirSync(slidesDir).filter(f => f.endsWith('.json'));
const ids = new Set();
let hasError = false;

for (const file of files) {
  const filePath = join(slidesDir, file);
  const raw = readFileSync(filePath, 'utf-8');
  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    console.error(`❌ ${file}: invalid JSON`);
    hasError = true;
    continue;
  }

  if (!json.id) {
    console.error(`❌ ${file}: missing "id" field`);
    hasError = true;
  } else if (ids.has(json.id)) {
    console.error(`❌ ${file}: duplicate id "${json.id}"`);
    hasError = true;
  } else {
    ids.add(json.id);
    console.log(`✓ ${file}: id="${json.id}"`);
  }
}

if (hasError) {
  console.error(`\n❌ Validation failed: ${files.length} slides checked, errors found.`);
  process.exit(1);
} else {
  console.log(`\n✅ All ${files.length} slides validated.`);
}
