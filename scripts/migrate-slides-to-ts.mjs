/**
 * Auto-migrate slide JSON → TypeScript.
 * Run: node scripts/migrate-slides-to-ts.mjs
 *
 * Reads every JSON in src/data/slides/ and writes .ts equivalents
 * to src/content/slides/ using the defineSlide factory.
 */

import { readFileSync, readdirSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

const jsonDir = join(projectRoot, 'src/data/slides');
const tsDir = join(projectRoot, 'src/content/slides');

mkdirSync(tsDir, { recursive: true });

// Ensure _factory.ts exists
const factoryPath = join(tsDir, '_factory.ts');
if (!existsSync(factoryPath)) {
  writeFileSync(factoryPath, `import type { ISlide, SlideVisual } from '../../types/slide/visuals';
import type { IContent } from '../../types/slide/base';

type Lang = 'pt-br' | 'en-us';

interface SlideDef {
  id: string;
  type: ISlide['type'];
  content: Record<Lang, IContent>;
  visual?: { id: string; copy: Record<Lang, Record<string, unknown>> };
  options?: ISlide['options'];
}

export function defineSlide(def: SlideDef): ISlide {
  return {
    id: def.id,
    type: def.type,
    content: def.content,
    ...(def.visual ? { visual: def.visual as SlideVisual } : {}),
    ...(def.options ? { options: def.options } : {}),
  };
}
`);
} else {
  // Factory exists — ensure it uses IContent
  let content = readFileSync(factoryPath, 'utf-8');
  if (content.includes('interface SlideContent {')) {
    content = content.replace(
      /import type \{ ISlide, SlideVisual \} from '\.\.\/\.\.\/types\/slide\/visuals';\n\ntype Lang = 'pt-br' \| 'en-us';\n\ninterface SlideContent \{\n  title: string;\n  body: string;\n\}/,
      `import type { ISlide, SlideVisual } from '../../types/slide/visuals';
import type { IContent } from '../../types/slide/base';

type Lang = 'pt-br' | 'en-us';`
    );
    content = content.replace(
      /content: Record<Lang, SlideContent>/,
      'content: Record<Lang, IContent>'
    );
    writeFileSync(factoryPath, content, 'utf-8');
  }
}

// No slides to skip — generate all
const skipSet = new Set();

function toCamelCase(slug) {
  // Handle slugs like "python-1d" → "python1d", "python-prereq-data" → "pythonPrereqData"
  const camel = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
  // If starts with number, prefix with 's'
  return /^[0-9]/.test(camel) ? 's' + camel : camel;
}

function escapeString(str) {
  // For template literals:
  // 1. Escape backslashes first
  // 2. Escape ${ to prevent interpolation
  // 3. Backticks inside template literals need escaping as \`
  return str
    .replace(/\\/g, '\\\\')
    .replace(/\$\{/g, '$\\{')
    .replace(/`/g, '\\`');
}

function stringifyValue(val, indent = 2) {
  if (val === null || val === undefined) return 'undefined';
  if (typeof val === 'string') {
    // Use JSON.stringify for strings — handles all escaping properly
    return JSON.stringify(val);
  }
  if (typeof val === 'number' || typeof val === 'boolean') {
    return String(val);
  }
  if (Array.isArray(val)) {
    const items = val.map(item => {
      const s = stringifyValue(item, indent);
      return ' '.repeat(indent + 2) + s;
    }).join(',\n');
    return `[\n${items}\n${' '.repeat(indent)}]`;
  }
  if (typeof val === 'object') {
    const entries = Object.entries(val);
    if (entries.length === 0) return '{}';
    const lines = entries.map(([k, v]) => {
      // Always quote keys to be safe
      return ' '.repeat(indent + 2) + `${JSON.stringify(k)}: ${stringifyValue(v, indent + 2)}`;
    }).join(',\n');
    return `{\n${lines}\n${' '.repeat(indent)}}`;
  }
  return String(val);
}

let success = 0;
let skipped = 0;
let failed = 0;
const errors = [];
const exports = [];

const jsonFiles = readdirSync(jsonDir).filter(f => f.endsWith('.json'));

for (const jsonFile of jsonFiles) {
  if (skipSet.has(jsonFile)) {
    skipped++;
    const baseName = jsonFile.replace('.json', '');
    exports.push({ camel: toCamelCase(baseName), file: baseName });
    continue;
  }

  try {
    const json = JSON.parse(readFileSync(join(jsonDir, jsonFile), 'utf-8'));
    const baseName = jsonFile.replace('.json', '');
    const camelName = toCamelCase(baseName);
    const tsFile = join(tsDir, `${baseName}.ts`);

    if (existsSync(tsFile)) {
      skipped++;
      exports.push({ camel: camelName, file: baseName });
      continue;
    }

    const contentPt = json.content?.['pt-br'];
    const contentEn = json.content?.['en-us'];

    if (!contentPt || !contentEn) {
      failed++;
      errors.push(`${jsonFile}: missing content for pt-br or en-us`);
      continue;
    }

    let ts = `import { defineSlide } from './_factory';\n\n`;
    ts += `export const ${camelName} = defineSlide({\n`;
    ts += `  id: '${json.id}',\n`;
    ts += `  type: '${json.type}',\n`;

    if (json.options && Object.keys(json.options).length > 0) {
      ts += `  options: ${stringifyValue(json.options)},\n`;
    }

    ts += `  content: {\n`;
    ts += `    'pt-br': {\n`;
    ts += `      title: \`${escapeString(contentPt.title)}\`,\n`;
    ts += `      body: \`${escapeString(contentPt.body)}\`,\n`;
    if (contentPt.codeExplanations) {
      ts += `      codeExplanations: ${stringifyValue(contentPt.codeExplanations)},\n`;
    }
    ts += `    },\n`;
    ts += `    'en-us': {\n`;
    ts += `      title: \`${escapeString(contentEn.title)}\`,\n`;
    ts += `      body: \`${escapeString(contentEn.body)}\`,\n`;
    if (contentEn.codeExplanations) {
      ts += `      codeExplanations: ${stringifyValue(contentEn.codeExplanations)},\n`;
    }
    ts += `    },\n`;
    ts += `  },\n`;

    if (json.visual) {
      ts += `  visual: {\n`;
      ts += `    id: '${json.visual.id}',\n`;
      ts += `    copy: ${stringifyValue(json.visual.copy, 4)},\n`;
      ts += `  },\n`;
    }

    ts += `});\n`;

    writeFileSync(tsFile, ts, 'utf-8');
    success++;
    exports.push({ camel: camelName, file: baseName });
  } catch (e) {
    failed++;
    errors.push(`${jsonFile}: ${e.message}`);
  }
}

// Write barrel export index.ts
let index = `/** Auto-generated barrel export — do not edit manually */\n\n`;
index += `import type { ISlide } from '../../types/slide/visuals';\n\n`;

const slideImports = exports.map(e => `import { ${e.camel} } from './${e.file}';`).join('\n');
index += slideImports + '\n\n';

const slideExports = exports.map(e => `export { ${e.camel} };`).join('\n');
index += slideExports + '\n\n';

index += `/** All slides in a single array */\n`;
const allSlides = exports.map(e => e.camel).join(',\n  ');
index += `export const allSlides: ISlide[] = [\n  ${allSlides}\n];\n`;

writeFileSync(join(tsDir, 'index.ts'), index, 'utf-8');

// Summary
console.log('\n' + '='.repeat(50));
console.log('Slide Migration Report');
console.log('='.repeat(50));
console.log(`  ✅ Converted: ${success}`);
console.log(`  ⏭️  Skipped (already done): ${skipped}`);
console.log(`  ❌ Failed: ${failed}`);
if (errors.length > 0) {
  console.log('\nErrors:');
  for (const e of errors) console.log(`  - ${e}`);
}
console.log(`\n📁 Output: src/content/slides/ (${exports.length} slides + index.ts + _factory.ts)`);
console.log('='.repeat(50));

if (failed > 0) process.exit(1);
