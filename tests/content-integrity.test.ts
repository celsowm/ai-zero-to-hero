import { describe, it } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

describe('content integrity', () => {
  // Slides are now TypeScript files, not JSON
  const slidesDir = join(projectRoot, 'src/content/slides');
  const snippetsDir = join(projectRoot, 'src/content/snippets');

  const slideFiles = readdirSync(slidesDir).filter(f => f.endsWith('.ts') && f !== '_factory.ts' && f !== 'index.ts');

  it('every slide TS has a non-empty "id" field', () => {
    const failures: string[] = [];
    for (const file of slideFiles) {
      const content = readFileSync(join(slidesDir, file), 'utf-8');
      const idMatch = content.match(/id:\s*['"](.+?)['"]/);
      if (!idMatch || !idMatch[1] || idMatch[1].trim() === '') {
        failures.push(`${file}: missing or empty "id"`);
      }
    }
    if (failures.length > 0) {
      assert.fail(`Slides without IDs:\n${failures.join('\n')}`);
    }
  });

  it('no duplicate slide IDs', () => {
    const ids = new Map<string, string>();
    for (const file of slideFiles) {
      const content = readFileSync(join(slidesDir, file), 'utf-8');
      const idMatch = content.match(/id:\s*['"](.+?)['"]/);
      if (idMatch && ids.has(idMatch[1])) {
        assert.fail(`Duplicate slide ID "${idMatch[1]}" in ${file} and ${ids.get(idMatch[1])}`);
      }
      if (idMatch) ids.set(idMatch[1], file);
    }
  });

  it('every .meta.json snippet file has a matching "id" field', () => {
    const failures: string[] = [];

    function walkMetaFiles(dir: string) {
      if (!existsSync(dir)) return;
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          walkMetaFiles(fullPath);
        } else if (entry.name.endsWith('.meta.json')) {
          const json = JSON.parse(readFileSync(fullPath, 'utf-8'));
          const expectedId = relative(snippetsDir, fullPath).replace(/\.meta\.json$/, '').replace(/\\/g, '/');
          if (!json.id || json.id !== expectedId) {
            failures.push(
              `${relative(projectRoot, fullPath)}: expected id="${expectedId}", got "${json.id ?? 'undefined'}"`,
            );
          }
        }
      }
    }

    walkMetaFiles(snippetsDir);
    if (failures.length > 0) {
      assert.fail(`Meta files with missing or mismatched IDs:\n${failures.join('\n')}`);
    }
  });

  it('SFT snippets (newly added) have corresponding .meta.json files', () => {
    const sftSnippets = ['sft-dataset.py', 'sft-generate.py', 'sft-train.py'];
    const failures: string[] = [];

    for (const snippet of sftSnippets) {
      const snippetPath = join(snippetsDir, snippet);
      if (!existsSync(snippetPath)) continue;

      const baseName = snippet.replace('.py', '');
      const metaPath = join(snippetsDir, baseName + '.meta.json');
      if (!existsSync(metaPath)) {
        failures.push(`${snippet}: missing ${baseName}.meta.json`);
      }
    }

    if (failures.length > 0) {
      assert.fail(`New SFT snippets without meta files:\n${failures.join('\n')}`);
    }
  });

  it('every .meta.json has valid fields for the registry (no runtime crashes)', () => {
    const failures: string[] = [];

    function walkMetaFiles(dir: string) {
      if (!existsSync(dir)) return;
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          walkMetaFiles(fullPath);
        } else if (entry.name.endsWith('.meta.json')) {
          const json = JSON.parse(readFileSync(fullPath, 'utf-8'));
          const rel = relative(projectRoot, fullPath);

          if ('regions' in json && (json.regions === null || json.regions === undefined || !Array.isArray(json.regions))) {
            failures.push(`${rel}: "regions" must be null or an array, not ${typeof json.regions}`);
          } else if (Array.isArray(json.regions) && !json.regions.every(r => typeof r === 'string')) {
            failures.push(`${rel}: "regions" items must be strings`);
          }
        }
      }
    }

    walkMetaFiles(snippetsDir);
    if (failures.length > 0) {
      assert.fail(`Invalid meta file structures:\n${failures.join('\n')}`);
    }
  });

  it('every slide listed in course-outline.ts has a corresponding slide TS file', () => {
    const outlinePath = join(projectRoot, 'src/data/course-outline.ts');
    const outline = readFileSync(outlinePath, 'utf-8');

    const slideIds = outline.match(/'([\w-]+)'/g) ?? [];
    const parsedIds = slideIds.map(s => s.replace(/'/g, ''));

    const missingSlides: string[] = [];
    for (const id of parsedIds) {
      const slideFile = slideFiles.find(f => f === `${id}.ts`);
      if (!slideFile) {
        missingSlides.push(id);
      }
    }

    if (missingSlides.length > 0) {
      assert.fail(
        `Slides referenced in course-outline.ts but not found: ${missingSlides.join(', ')}`,
      );
    }
  });
});
