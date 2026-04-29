import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface CodeExplanation {
  lineRange: [number, number];
  content: string;
}

interface MetaJson {
  id: string;
  language: string;
  explanations: Array<{ lineRange: [number, number]; 'pt-br'?: string; 'en-us'?: string }>;
}

/**
 * Return line numbers (1-based) that are non-empty and not pure comments.
 */
function getSignificantLines(code: string): number[] {
  const lines = code.split('\n');
  const significant: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '') continue;
    if (trimmed.startsWith('#')) continue;
    significant.push(i + 1);
  }
  return significant;
}

/**
 * Check if a line number is covered by any explanation's lineRange.
 */
function isCovered(line: number, explanations: CodeExplanation[]): boolean {
  return explanations.some(
    (exp) => line >= exp.lineRange[0] && line <= exp.lineRange[1],
  );
}

/**
 * Recursively find all .py files in a directory and subdirectories.
 */
function findAllPyFiles(dir: string): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;

  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findAllPyFiles(fullPath));
    } else if (entry.name.endsWith('.py')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Extract codeExplanations from a .meta.json file for a given snippet.
 */
function getCodeExplanationsFromMeta(snippetPath: string): { 'pt-br': CodeExplanation[]; 'en-us': CodeExplanation[] } {
  const metaPath = snippetPath.replace('.pt-br.py', '.meta.json').replace('.en-us.py', '.meta.json');
  if (!existsSync(metaPath)) return { 'pt-br': [], 'en-us': [] };

  try {
    const meta: MetaJson = JSON.parse(readFileSync(metaPath, 'utf-8'));
    const ptExplanations = meta.explanations
      ?.filter((e) => e['pt-br'])
      ?.map((e) => ({ lineRange: e.lineRange, content: e['pt-br']! })) || [];
    const enExplanations = meta.explanations
      ?.filter((e) => e['en-us'])
      ?.map((e) => ({ lineRange: e.lineRange, content: e['en-us']! })) || [];
    return { 'pt-br': ptExplanations, 'en-us': enExplanations };
  } catch {
    return { 'pt-br': [], 'en-us': [] };
  }
}

describe('ALL Python code explanation coverage', () => {
  const projectRoot = join(__dirname, '..');
  const snippetsDir = join(projectRoot, 'src/content/snippets');

  it('every non-empty, non-comment line in python snippets with meta.json is covered by explanations', () => {
    const allPyFiles = findAllPyFiles(snippetsDir);
    const errors: string[] = [];

    for (const snippetPath of allPyFiles) {
      const relativePath = relative(snippetsDir, snippetPath).replace(/\\/g, '/');
      const metaPath = snippetPath.replace('.pt-br.py', '.meta.json').replace('.en-us.py', '.meta.json');

      // Skip snippets without meta.json (legacy snippets)
      if (!existsSync(metaPath)) continue;

      const code = readFileSync(snippetPath, 'utf-8');
      const significantLines = getSignificantLines(code);

      if (significantLines.length === 0) continue;

      const lang: 'pt-br' | 'en-us' = relativePath.includes('.en-us.') ? 'en-us' : 'pt-br';

      const explanations = getCodeExplanationsFromMeta(snippetPath);
      const langExplanations = explanations[lang];

      if (langExplanations.length === 0) continue; // Skip empty explanations

      const uncovered = significantLines.filter((line) => !isCovered(line, langExplanations));
      if (uncovered.length > 0) {
        errors.push(
          `❌ ${lang}: lines ${uncovered.join(', ')} of '${relativePath}' not covered by explanations`,
        );
      }
    }

    if (errors.length > 0) {
      expect.unreachable(
        `\n ${errors.length} Python snippet(s) with uncovered lines:\n\n${errors.join('\n')}`,
      );
    }
  });

  it('every codeExplanations lineRange refers to existing lines in its snippet', () => {
    const allPyFiles = findAllPyFiles(snippetsDir);
    const failures: string[] = [];

    for (const snippetPath of allPyFiles) {
      const code = readFileSync(snippetPath, 'utf-8');
      const totalLines = code.split('\n').length;
      const relativePath = relative(snippetsDir, snippetPath).replace(/\\/g, '/');

      const explanations = getCodeExplanationsFromMeta(snippetPath);
      const allExplanations = [...explanations['pt-br'], ...explanations['en-us']];

      for (const exp of allExplanations) {
        if (exp.lineRange[1] > totalLines) {
          failures.push(
            `❌ lineRange [${exp.lineRange[0]}, ${exp.lineRange[1]}] ` +
            `exceeds ${relativePath} total of ${totalLines} lines`,
          );
        }
        if (exp.lineRange[0] < 1) {
          failures.push(
            `❌ lineRange [${exp.lineRange[0]}, ${exp.lineRange[1]}] ` +
            `starts before line 1 in ${relativePath}`,
          );
        }
      }
    }

    if (failures.length > 0) {
      expect.unreachable(
        `\n🔴 ${failures.length} invalid lineRange(s):\n\n${failures.join('\n')}`,
      );
    }
  });
});
