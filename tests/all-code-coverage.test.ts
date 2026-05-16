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

      // Skip exercise starter snippets — they are meant for students to complete,
      // not for slides with line-by-line explanations.
      if (snippetId.includes('-exercise-') || snippetId.includes('-exercises-')) continue;

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

  it('no slide contains raw triple-backtick code blocks (must use snippet: reference)', () => {
    const allSlideFiles = findFiles(join(__dirname, '../src/content/slides'), ['.ts']);
    const failures: string[] = [];

    for (const slidePath of allSlideFiles) {
      const content = readFileSync(slidePath, 'utf-8');
      
      // Look for ```lang blocks that don't contain 'snippet:'
      // In .ts files, backticks are usually escaped: \` \` \`
      const blockRegex = /\\`\\`\\`([a-z]+)?\s+([\s\S]*?)\\`\\`\\`/g;
      let match;
      while ((match = blockRegex.exec(content)) !== null) {
        const blockContent = match[2].trim();
        const language = match[1];

        // We only enforce this for "real" code languages like python, javascript, typescript.
        // bash and txt are allowed inline for simple commands/formulas that don't need line-by-line explanations.
        if (['python', 'javascript', 'js', 'py'].includes(language || '')) {
          if (!blockContent.startsWith('snippet:')) {
            failures.push(`${relative(join(__dirname, '../src/content/slides'), slidePath)}: contains raw ${language} code block`);
          }
        }
      }
    }

    if (failures.length > 0) {
      expect.unreachable(`\n🔴 Found ${failures.length} slide(s) with raw code blocks. Move them to src/content/snippets:\n\n${failures.join('\n')}`);
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

  it('no two-column slide has an empty right column (body must contain --- split when no visual is present)', () => {
    const allSlideFiles = findFiles(slidesDir, ['.ts']);
    const failures: string[] = [];

    for (const slidePath of allSlideFiles) {
      const content = readFileSync(slidePath, 'utf-8');

      // Only check slides with type: 'two-column'
      if (!content.includes("type: 'two-column'") && !content.includes('type: "two-column"')) continue;

      const slideName = relative(slidesDir, slidePath);

      // Skip slides that have a visual — the visual fills the right column
      if (content.includes('visual:')) continue;

      // For each language block (pt-br / en-us), extract body using brace-depth parsing
      for (const lang of ['pt-br', 'en-us'] as const) {
        const langKey = `'${lang}'`;
        const langIdx = content.indexOf(langKey);
        if (langIdx === -1) continue;

        // Find the opening brace of the language object
        const afterKey = content.slice(langIdx + langKey.length);
        const openBraceIdx = afterKey.indexOf('{');
        if (openBraceIdx === -1) continue;

        // Walk with brace depth to find the matching closing brace + comma
        let depth = 0;
        let inString = false;
        let stringChar = '';
        let inTemplate = false;
        let templateDepth = 0;
        let endIdx = -1;

        for (let i = openBraceIdx; i < afterKey.length; i++) {
          const c = afterKey[i];
          const prev = i > 0 ? afterKey[i - 1] : '';

          // Handle string literals
          if (!inTemplate) {
            if (!inString && (c === '"' || c === "'")) {
              inString = true;
              stringChar = c;
              continue;
            }
            if (inString && c === stringChar && prev !== '\\') {
              inString = false;
              continue;
            }
          }

          // Handle template literals (backticks)
          if (!inString) {
            if (!inTemplate && c === '\`') {
              inTemplate = true;
              continue;
            }
            if (inTemplate) {
              if (prev !== '\\' && c === '\`' && templateDepth === 0) {
                inTemplate = false;
                continue;
              }
              if (c === '\$' && i + 1 < afterKey.length && afterKey[i + 1] === '{') {
                templateDepth++;
                i++;
                continue;
              }
              if (c === '}' && templateDepth > 0) {
                templateDepth--;
                continue;
              }
              continue;
            }
          }

          if (inString || inTemplate) continue;

          if (c === '{') depth++;
          if (c === '}') {
            depth--;
            if (depth === 0) {
              // Expect a comma after the closing brace
              endIdx = i + 1; // include the closing brace
              break;
            }
          }
        }

        if (endIdx === -1) continue;
        const blockContent = afterKey.slice(openBraceIdx + 1, endIdx);

        // Extract body field from within the language block
        const bodyStartIdx = blockContent.indexOf('body:');
        if (bodyStartIdx === -1) continue;

        const afterBody = blockContent.slice(bodyStartIdx + 5);
        const tickIdx = afterBody.indexOf('\`');
        if (tickIdx === -1) continue;

        // Walk through the template literal body
        let i = tickIdx + 1;
        let tDepth = 0;
        while (i < afterBody.length) {
          if (afterBody[i] === '\\' && i + 1 < afterBody.length && afterBody[i + 1] === '\`') {
            i += 2;
            continue;
          }
          if (afterBody[i] === '\`' && tDepth === 0) {
            break;
          }
          if (afterBody[i] === '\$' && i + 1 < afterBody.length && afterBody[i + 1] === '{') {
            tDepth++;
            i += 2;
            continue;
          }
          if (afterBody[i] === '}' && tDepth > 0) {
            tDepth--;
            i++;
            continue;
          }
          i++;
        }

        const body = afterBody.slice(tickIdx + 1, i);

        // Check that body contains the --- separator
        if (!body.includes('---')) {
          failures.push(`${slideName} [${lang}]: two-column slide missing '---' split in body (right column would be empty)`);
          continue;
        }

        // Check that something exists after the first ---
        const afterSplit = body.split('---').slice(1).join('---').trim();
        if (!afterSplit) {
          failures.push(`${slideName} [${lang}]: two-column slide has empty right column (nothing after '---' split)`);
        }
      }
    }

    if (failures.length > 0) {
      expect.unreachable(
        `\n🔴 ${failures.length} two-column slide(s) with empty right column:\n\n${failures.join('\n')}`,
      );
    }
  });
});
