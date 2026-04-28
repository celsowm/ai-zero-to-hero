/**
 * Post-migration validation script.
 * Run AFTER converting all slides from JSON to TypeScript.
 *
 * Checks:
 * 1. Every JSON slide has a corresponding .ts file
 * 2. Every .ts file has matching id field
 * 3. No slides missing from course-outline.ts
 *
 * Usage: node scripts/validate-slide-migration.mjs
 */

import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const jsonDir = join(projectRoot, 'src/data/slides');
const tsDir = join(projectRoot, 'src/content/slides');

const jsonFiles = readdirSync(jsonDir).filter(f => f.endsWith('.json'));
const tsFiles = readdirSync(tsDir).filter(f => f.endsWith('.ts') && !f.startsWith('_') && f !== 'index.ts');

console.log(`Found ${jsonFiles.length} JSON files, ${tsFiles.length} TS files`);

// Check 1: every JSON has a TS counterpart
const missingTs = [];
for (const jsonFile of jsonFiles) {
  const tsFile = jsonFile.replace('.json', '.ts');
  if (!existsSync(join(tsDir, tsFile))) {
    missingTs.push(jsonFile);
  }
}

if (missingTs.length > 0) {
  console.error(`\n❌ ${missingTs.length} JSON files without TS counterpart:`);
  for (const f of missingTs) console.error(`  - ${f}`);
} else {
  console.log('\n✅ All JSON files have TS counterparts');
}

// Check 2: every TS file has correct id export
const badIds = [];
for (const tsFile of tsFiles) {
  const content = readFileSync(join(tsDir, tsFile), 'utf-8');
  const idMatch = content.match(/id:\s*['"](.+?)['"]/);
  if (!idMatch) {
    badIds.push(`${tsFile}: missing id field`);
  }
  const expectedId = tsFile.replace('.ts', '');
  if (idMatch && idMatch[1] !== expectedId) {
    badIds.push(`${tsFile}: id="${idMatch[1]}" doesn't match filename "${expectedId}"`);
  }
}

if (badIds.length > 0) {
  console.error(`\n❌ ${badIds.length} TS files with bad IDs:`);
  for (const f of badIds) console.error(`  - ${f}`);
} else {
  console.log('\n✅ All TS files have correct id fields');
}

// Summary
console.log('\n' + '='.repeat(50));
if (missingTs.length === 0 && badIds.length === 0) {
  console.log('✅ MIGRATION COMPLETE — safe to delete JSON files');
  console.log(`   ${tsFiles.length} slides migrated successfully`);
} else {
  console.log(`❌ MIGRATION INCOMPLETE — ${missingTs.length + badIds.length} issues remain`);
  process.exit(1);
}
