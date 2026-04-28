import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');
const slidesDir = join(projectRoot, 'src/content/slides');

const tsFiles = readdirSync(slidesDir)
  .filter(f => f.endsWith('.ts') && f !== '_factory.ts' && f !== 'index.ts')
  .sort();

let out = `import type { ISlide } from '../../types/slide/visuals';

`;

for (const file of tsFiles) {
  const base = file.replace('.ts', '');
  const camel = base.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/^([0-9])/, 's$1');
  out += `import { ${camel} } from './${base}';\n`;
}

out += `\nexport const allSlides: ISlide[] = [\n`;
for (const file of tsFiles) {
  const base = file.replace('.ts', '');
  const camel = base.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase()).replace(/^([0-9])/, 's$1');
  out += `  ${camel},\n`;
}
out += `];\n`;

writeFileSync(join(slidesDir, 'index.ts'), out, 'utf-8');
console.log(`Rewrote index.ts with ${tsFiles.length} slides`);
