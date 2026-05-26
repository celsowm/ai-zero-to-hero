import { describe, it } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert';
import { allSlides } from '../src/content/slides';
import { courseSlideOrder } from '../src/data/course-outline';

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

  it('pytorch-lm snippet metas are executable in Pyodide', () => {
    const failures: string[] = [];

    function walkMetaFiles(dir: string) {
      if (!existsSync(dir)) return;
      for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const fullPath = join(dir, entry.name);
        if (entry.isDirectory()) {
          walkMetaFiles(fullPath);
        } else if (entry.name.endsWith('.meta.json')) {
          const json = JSON.parse(readFileSync(fullPath, 'utf-8'));
          const rel = relative(projectRoot, fullPath).replace(/\\/g, '/');
          if (rel.startsWith('src/content/snippets/pytorch-lm/') && json.pyodide === false) {
            failures.push(`${rel}: pyodide must not be false for pytorch-lm snippets`);
          }
        }
      }
    }

    walkMetaFiles(snippetsDir);
    if (failures.length > 0) {
      assert.fail(`pytorch-lm snippets must be executable in Pyodide:\n${failures.join('\n')}`);
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

  it('every slide in allSlides is listed in courseSlideOrder', () => {
    const orderedIds = new Set(courseSlideOrder);
    const unexpected = allSlides.map(slide => slide.id).filter(id => !orderedIds.has(id));
    if (unexpected.length > 0) {
      assert.fail(`Slides in allSlides but missing from courseSlideOrder: ${unexpected.join(', ')}`);
    }
  });

  it('does not allow consecutive duplicate snippet usage inside the same thematic arc', () => {
    const slidesById = new Map(allSlides.map(slide => [slide.id, slide]));
    const failures: string[] = [];

    const arcOf = (id: string) => {
      if (id === 'embeddings-intro' || id.startsWith('gpt2-') || id.startsWith('repo-gpt2-') || id.startsWith('build-gpt2-')) return 'gpt2';
      if (id.startsWith('rag-') || id.startsWith('chromadb-') || id.startsWith('llamaindex-')) return 'rag';
      if (id.startsWith('pytorch-') || id.startsWith('neural-network-pytorch-')) return 'pytorch';
      return id.split('-')[0];
    };

    const snippetIdsOf = (id: string) => {
      const slide = slidesById.get(id);
      if (!slide) return new Set<string>();
      const payload = JSON.stringify(slide);
      const refs = new Set<string>();
      for (const match of payload.matchAll(/snippet:([a-zA-Z0-9_/-]+)/g)) refs.add(match[1]);
      for (const match of payload.matchAll(/"snippetId":"([a-zA-Z0-9_/-]+)"/g)) refs.add(match[1]);
      return refs;
    };

    for (let i = 0; i < courseSlideOrder.length - 1; i++) {
      const currentId = courseSlideOrder[i];
      const nextId = courseSlideOrder[i + 1];
      if (arcOf(currentId) !== arcOf(nextId)) continue;

      const currentRefs = snippetIdsOf(currentId);
      const nextRefs = snippetIdsOf(nextId);
      const overlap = [...currentRefs].filter(ref => nextRefs.has(ref));

      if (overlap.length > 0) {
        failures.push(`${currentId} -> ${nextId} share snippet(s): ${overlap.join(', ')}`);
      }
    }

    if (failures.length > 0) {
      assert.fail(`Consecutive snippet duplication detected in the same arc:\n${failures.join('\n')}`);
    }
  });
});
