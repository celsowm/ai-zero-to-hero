import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';

// Since we can't easily import the registry in the test environment because of import.meta.glob,
// we will simulate the registry check by looking at the filesystem.

const snippetsDir = path.resolve(__dirname, '../src/content/snippets');
const slidesDir = path.resolve(__dirname, '../src/content/slides');

function getAllSnippets() {
  const snippets = new Set<string>();
  function walk(dir, baseDir = '') {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath, path.join(baseDir, file));
      } else {
        const match = file.match(/^(.+)\.([a-z]{2}-[a-z]{2})\.(py|js|sh|ps1)$/);
        if (match) {
          const id = path.join(baseDir, match[1]).replace(/\\/g, '/');
          snippets.add(id);
        }
      }
    }
  }
  walk(snippetsDir);
  return snippets;
}

describe('Snippet Registry Integrity', () => {
  const availableSnippets = getAllSnippets();

  it('all snippetId references in slides must exist in the snippets directory', () => {
    const slideFiles = fs.readdirSync(slidesDir).filter(f => f.endsWith('.ts') && !f.startsWith('_'));
    const missingSnippets: string[] = [];

    for (const slideFile of slideFiles) {
      const content = fs.readFileSync(path.join(slidesDir, slideFile), 'utf8');
      const snippetIdMatches = content.matchAll(/"snippetId":\s*"([^"]+)"/g);
      
      for (const match of snippetIdMatches) {
        const snippetId = match[1];
        if (!availableSnippets.has(snippetId)) {
          missingSnippets.push(`${slideFile}: ${snippetId}`);
        }
      }
    }

    if (missingSnippets.length > 0) {
      console.error('Missing snippets found:\n' + missingSnippets.join('\n'));
    }

    expect(missingSnippets).toHaveLength(0);
  });

  it('snippet filenames must follow the strict [name].[locale].[ext] pattern', () => {
    function walk(dir) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
          walk(fullPath);
        } else if (file.endsWith('.py') || file.endsWith('.js') || file.endsWith('.sh') || file.endsWith('.ps1')) {
          // Skip non-localized files if any (though there shouldn't be for snippets)
          if (file.includes('meta.json')) continue;
          
          const strictMatch = file.match(/^(.+)\.([a-z]{2}-[a-z]{2})\.(py|js|sh|ps1)$/);
          expect(strictMatch, `File ${fullPath} does not follow the strict naming convention [name].[locale].[ext] (e.g., example.en-us.py)`).not.toBeNull();
        }
      }
    }
    walk(snippetsDir);
  });
});
