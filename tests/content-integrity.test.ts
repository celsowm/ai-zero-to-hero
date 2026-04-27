import { describe, it } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

describe('content integrity', () => {
  const slidesDir = join(projectRoot, 'src/data/slides');
  const snippetsDir = join(projectRoot, 'src/content/snippets');

  const slideFiles = readdirSync(slidesDir).filter(f => f.endsWith('.json'));

  it('every slide JSON has a non-empty "id" field', () => {
    const failures: string[] = [];
    for (const file of slideFiles) {
      const json = JSON.parse(readFileSync(join(slidesDir, file), 'utf-8'));
      if (!json.id || typeof json.id !== 'string' || json.id.trim() === '') {
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
      const json = JSON.parse(readFileSync(join(slidesDir, file), 'utf-8'));
      if (json.id && ids.has(json.id)) {
        assert.fail(`Duplicate slide ID "${json.id}" in ${file} and ${ids.get(json.id)}`);
      }
      if (json.id) ids.set(json.id, file);
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
          // Normalize to forward slashes for comparison (meta files use /)
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

  it('every slide JSON is valid parseable JSON', () => {
    const failures: string[] = [];
    for (const file of slideFiles) {
      try {
        JSON.parse(readFileSync(join(slidesDir, file), 'utf-8'));
      } catch (e) {
        failures.push(`${file}: ${(e as Error).message}`);
      }
    }
    if (failures.length > 0) {
      assert.fail(`Invalid JSON files:\n${failures.join('\n')}`);
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

          // `regions` if present must be an array of strings — otherwise registry crashes with "is not iterable"
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

  it('every slide listed in course-outline.ts has a corresponding slide JSON file', () => {
    const outlinePath = join(projectRoot, 'src/data/course-outline.ts');
    const outline = readFileSync(outlinePath, 'utf-8');

    // Extract all quoted slide IDs
    const slideIds = outline.match(/'([\w-]+)'/g) ?? [];
    const parsedIds = slideIds.map(s => s.replace(/'/g, ''));

    const missingSlides: string[] = [];
    for (const id of parsedIds) {
      const slideFile = slideFiles.find(f => f === `${id}.json`);
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
