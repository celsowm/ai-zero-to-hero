import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface CodeExplanation {
  lineRange: [number, number];
}

interface MetaJson {
  id: string;
  language: string;
  explanations?: Array<{ lineRange: [number, number]; 'pt-br'?: string; 'en-us'?: string }>;
}

/**
 * Return line numbers (1-based) that are non-empty and not pure comments.
 */
function getSignificantLines(code: string, filePath: string): number[] {
  const lines = code.split('\n');
  const significant: number[] = [];
  const isPython = filePath.endsWith('.py');
  const isJs = filePath.endsWith('.js') || filePath.endsWith('.ts');

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (trimmed === '') continue;
    if (isPython && trimmed.startsWith('#')) continue;
    if (isJs && (trimmed.startsWith('//') || trimmed.startsWith('/*'))) continue;

    // Skip lines that only contain closing brackets/parens/braces and optional comma/semicolon/quotes
    if (/^[\]\}\);,"']+$/.test(trimmed)) continue;

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
 * Recursively find all files with given extensions.
 */
function findFiles(dir: string, exts: string[]): string[] {
  const results: string[] = [];
  if (!existsSync(dir)) return results;

  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...findFiles(fullPath, exts));
    } else {
      if (exts.some(ext => entry.name.endsWith(ext)) && !entry.name.startsWith('_')) {
        results.push(fullPath);
      }
    }
  }
  return results;
}

/**
 * Extract codeExplanations from a .meta.json file for a given snippet.
 */
function getCodeExplanationsFromMeta(snippetPath: string): { 'pt-br': CodeExplanation[]; 'en-us': CodeExplanation[] } {
  const metaPath = snippetPath.replace(/\.(pt-br|en-us)\.(py|js)$/, '.meta.json');
  if (!existsSync(metaPath)) return { 'pt-br': [], 'en-us': [] };

  try {
    const meta: MetaJson = JSON.parse(readFileSync(metaPath, 'utf-8'));
    const ptExplanations = meta.explanations
      ?.filter((e) => e['pt-br'])
      ?.map((e) => ({ lineRange: e.lineRange })) || [];
    const enExplanations = meta.explanations
      ?.filter((e) => e['en-us'])
      ?.map((e) => ({ lineRange: e.lineRange })) || [];
    return { 'pt-br': ptExplanations, 'en-us': enExplanations };
  } catch {
    return { 'pt-br': [], 'en-us': [] };
  }
}

/**
 * Extracts line ranges from a text block.
 */
function parseLineRanges(block: string): CodeExplanation[] {
  const exps: CodeExplanation[] = [];
  // Support [1, 4], ["lineRange"]: [1, 4], lineRange: [\n 1,\n 4\n], anyKey: [1, 4]
  // We look for any [integer, integer] pattern where the second is >= the first.
  const lineRangeRegex = /\[\s*(\d+)\s*,\s*(\d+)\s*\]/gs;
  let m;
  while ((m = lineRangeRegex.exec(block)) !== null) {
    const start = parseInt(m[1]);
    const end = parseInt(m[2]);
    if (start > 0 && end >= start) {
      exps.push({ lineRange: [start, end] });
    }
  }
  return exps;
}

describe('ALL code explanation coverage (Python & JS)', () => {
  const projectRoot = join(__dirname, '..');
  const snippetsDir = join(projectRoot, 'src/content/snippets');
  const slidesDir = join(projectRoot, 'src/content/slides');

  it('every non-empty, non-comment line in snippets is covered by explanations', () => {
    const allSnippetFiles = findFiles(snippetsDir, ['.py', '.js']);
    const allSlideFiles = findFiles(slidesDir, ['.ts']);
    const errors: string[] = [];

    // Map to store combined explanations for each snippet
    const snippetCoverageMap = new Map<string, { 'pt-br': CodeExplanation[]; 'en-us': CodeExplanation[] }>();

    // 1. Collect explanations from .meta.json files
    for (const snippetPath of allSnippetFiles) {
      const relativePath = relative(snippetsDir, snippetPath).replace(/\\/g, '/');
      const snippetId = relativePath.replace(/\.(pt-br|en-us)\.(py|js)$/, '');
      
      const metaExplanations = getCodeExplanationsFromMeta(snippetPath);
      if (metaExplanations['pt-br'].length > 0 || metaExplanations['en-us'].length > 0) {
        const current = snippetCoverageMap.get(snippetId) || { 'pt-br': [], 'en-us': [] };
        snippetCoverageMap.set(snippetId, {
          'pt-br': [...current['pt-br'], ...metaExplanations['pt-br']],
          'en-us': [...current['en-us'], ...metaExplanations['en-us']],
        });
      }
    }

    // 2. Collect explanations from slide .ts files
    for (const slidePath of allSlideFiles) {
      const content = readFileSync(slidePath, 'utf-8');

      // Find all snippet references in the WHOLE file (handles variables outside blocks)
      const allSnippetIds = new Set<string>();
      const idRegex = /['"]?snippetId['"]?:\s*['"]([^'"]+)['"]/g;
      const markdownRegex = /snippet:\s*([A-Za-z0-9/_-]+)/g;
      
      let m;
      while ((m = idRegex.exec(content)) !== null) allSnippetIds.add(m[1]);
      while ((m = markdownRegex.exec(content)) !== null) allSnippetIds.add(m[1]);

      if (allSnippetIds.size > 0) {
        // Split by 'pt-br' or 'en-us' keys to isolate language blocks for explanations
        const parts = content.split(/['"](pt-br|en-us)['"]\s*:\s*\{/);
        const langExps = { 'pt-br': [] as CodeExplanation[], 'en-us': [] as CodeExplanation[] };

        for (let i = 1; i < parts.length; i += 2) {
          const lang = parts[i] as 'pt-br' | 'en-us';
          const blockContent = parts[i+1];
          langExps[lang].push(...parseLineRanges(blockContent));
        }

        for (const sId of allSnippetIds) {
          const current = snippetCoverageMap.get(sId) || { 'pt-br': [], 'en-us': [] };
          current['pt-br'].push(...langExps['pt-br']);
          current['en-us'].push(...langExps['en-us']);
          snippetCoverageMap.set(sId, current);
        }
      }
    }




    // 3. Verify coverage
    for (const snippetPath of allSnippetFiles) {
      const relativePath = relative(snippetsDir, snippetPath).replace(/\\/g, '/');
      const snippetId = relativePath.replace(/\.(pt-br|en-us)\.(py|js)$/, '');
      const lang: 'pt-br' | 'en-us' = relativePath.includes('.en-us.') ? 'en-us' : 'pt-br';

      const code = readFileSync(snippetPath, 'utf-8');
      const significantLines = getSignificantLines(code, snippetPath);
      if (significantLines.length === 0) continue;

      const explanations = snippetCoverageMap.get(snippetId);
      const langExplanations = explanations ? explanations[lang] : [];

      const uncovered = significantLines.filter((line) => !isCovered(line, langExplanations));
      if (uncovered.length > 0) {
        errors.push(
          `❌ ${lang}: lines ${uncovered.join(', ')} of '${relativePath}' not covered by explanations`,
        );
      }
    }

    if (errors.length > 0) {
      expect.unreachable(
        `\n ${errors.length} snippet(s) with uncovered lines:\n\n${errors.join('\n')}`,
      );
    }
  });

  it('every codeExplanations lineRange refers to existing lines in its snippet', () => {
    const allSnippetFiles = findFiles(snippetsDir, ['.py', '.js']);
    const allSlideFiles = findFiles(slidesDir, ['.ts']);
    const failures: string[] = [];

    const snippetMap = new Map<string, number>();
    for (const snippetPath of allSnippetFiles) {
      const relativePath = relative(snippetsDir, snippetPath).replace(/\\/g, '/');
      const code = readFileSync(snippetPath, 'utf-8');
      snippetMap.set(relativePath, code.split('\n').length);
    }

    for (const slidePath of allSlideFiles) {
      const content = readFileSync(slidePath, 'utf-8');
      
      const blocks = [
        { langSuffix: 'pt-br', regex: /['"]pt-br['"]\s*:\s*\{([\s\S]*?)\n\s*\},/g },
        { langSuffix: 'en-us', regex: /['"]en-us['"]\s*:\s*\{([\s\S]*?)\n\s*\},/g }
      ];

      for (const blockDef of blocks) {
        let match;
        while ((match = blockDef.regex.exec(content)) !== null) {
          const blockContent = match[1];
          const snippetIds = new Set<string>();
          const idRegex = /snippetId:\s*['"]([^'"]+)['"]/g;
          const markdownRegex = /snippet:\s*([A-Za-z0-9/_-]+)/g;
          
          let idMatch;
          while ((idMatch = idRegex.exec(blockContent)) !== null) snippetIds.add(idMatch[1]);
          while ((idMatch = markdownRegex.exec(blockContent)) !== null) snippetIds.add(idMatch[1]);

          if (snippetIds.size > 0) {
            const exps = parseLineRanges(blockContent);
            for (const sId of snippetIds) {
              const extension = existsSync(join(snippetsDir, `${sId}.${blockDef.langSuffix}.py`)) ? 'py' : 'js';
              const fullSnippetPath = `${sId}.${blockDef.langSuffix}.${extension}`;
              const totalLines = snippetMap.get(fullSnippetPath);
              if (totalLines === undefined) continue;

              for (const exp of exps) {
                if (exp.lineRange[1] > totalLines) {
                  failures.push(
                    `❌ [Slide: ${relative(slidesDir, slidePath)}] lineRange [${exp.lineRange[0]}, ${exp.lineRange[1]}] ` +
                    `exceeds ${fullSnippetPath} total of ${totalLines} lines`,
                  );
                }
                if (exp.lineRange[0] < 1) {
                  failures.push(
                    `❌ [Slide: ${relative(slidesDir, slidePath)}] lineRange [${exp.lineRange[0]}, ${exp.lineRange[1]}] ` +
                    `starts before line 1 in ${fullSnippetPath}`,
                  );
                }
              }
            }
          }
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
