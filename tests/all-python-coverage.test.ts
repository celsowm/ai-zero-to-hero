import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

interface CodeExplanation {
  lineRange: [number, number];
  content: string;
}

interface SlideContent {
  codeExplanations?: CodeExplanation[];
}

interface CodePanel {
  codeExplanations?: CodeExplanation[];
}

interface VisualCopy {
  codePanel?: CodePanel;
}

interface SlideJson {
  id: string;
  visual?: {
    copy?: {
      'pt-br'?: VisualCopy;
      'en-us'?: VisualCopy;
    };
  };
  content?: {
    'pt-br'?: SlideContent;
    'en-us'?: SlideContent;
  };
}

/**
 * Extract all codeExplanations arrays from a slide JSON.
 */
function extractCodeExplanations(json: SlideJson): Array<{ label: string; lang: 'pt-br' | 'en-us'; explanations: CodeExplanation[] }> {
  const results: Array<{ label: string; lang: 'pt-br' | 'en-us'; explanations: CodeExplanation[] }> = [];
  const content = json.content;
  if (content?.['pt-br']?.codeExplanations?.length) {
    results.push({ label: 'content.pt-br.codeExplanations', lang: 'pt-br', explanations: content['pt-br'].codeExplanations });
  }
  if (content?.['en-us']?.codeExplanations?.length) {
    results.push({ label: 'content.en-us.codeExplanations', lang: 'en-us', explanations: content['en-us'].codeExplanations });
  }
  const visualCopy = json.visual?.copy;
  if (visualCopy?.['pt-br']?.codePanel?.codeExplanations?.length) {
    results.push({ label: 'visual.copy.pt-br.codePanel.codeExplanations', lang: 'pt-br', explanations: visualCopy['pt-br'].codePanel.codeExplanations });
  }
  if (visualCopy?.['en-us']?.codePanel?.codeExplanations?.length) {
    results.push({ label: 'visual.copy.en-us.codePanel.codeExplanations', lang: 'en-us', explanations: visualCopy['en-us'].codePanel.codeExplanations });
  }
  return results;
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
 * Extract all snippet references from slide body content.
 * Pattern: snippet:category/snippet-name
 */
function extractSnippetReferences(body: string): string[] {
  const matches = body.match(/snippet:([\w-]+\/[\w-]+)/g);
  if (!matches) return [];
  return matches.map((m) => m.replace('snippet:', ''));
}

describe('ALL Python code explanation coverage', () => {
  const projectRoot = join(__dirname, '..');
  const slidesDir = join(projectRoot, 'src/data/slides');
  const snippetsDir = join(projectRoot, 'src/content/snippets');

  const slideFiles = readdirSync(slidesDir).filter((f) => f.endsWith('.json'));

  // Build a comprehensive map: slideFile → snippetId → lang → explanations[]
  function buildComprehensiveSlideSnippetMap() {
    const map = new Map<string, Map<string, Map<string, CodeExplanation[]>>>();

    for (const slideFile of slideFiles) {
      const slidePath = join(slidesDir, slideFile);
      const raw = readFileSync(slidePath, 'utf-8');
      const json: SlideJson = JSON.parse(raw);
      const allExplanations = extractCodeExplanations(json);

      // Extract snippet references from both language bodies
      const bodyPt = json.content?.['pt-br']?.body || raw;
      const bodyEn = json.content?.['en-us']?.body || raw;

      const snippetsPt = extractSnippetReferences(bodyPt);
      const snippetsEn = extractSnippetReferences(bodyEn);

      if (snippetsPt.length === 0 && snippetsEn.length === 0) continue;

      const perSnippet = new Map<string, Map<string, CodeExplanation[]>>();

      // Map explanations to snippet IDs - explanations apply to all snippets referenced in the slide
      for (const { lang, explanations } of allExplanations) {
        const snippetIds = lang === 'pt-br' ? snippetsPt : snippetsEn;
        for (const snippetId of snippetIds) {
          if (!perSnippet.has(snippetId)) {
            perSnippet.set(snippetId, new Map());
          }
          const langMap = perSnippet.get(snippetId)!;
          // Merge explanations for this snippet
          langMap.set(lang, explanations);
        }
      }

      if (perSnippet.size > 0) {
        map.set(slideFile, perSnippet);
      }
    }
    return map;
  }

  it('every non-empty, non-comment line in ALL python snippets is covered by codeExplanations', () => {
    const slideMap = buildComprehensiveSlideSnippetMap();
    const allPyFiles = findAllPyFiles(snippetsDir);

    const failures: string[] = [];

    for (const snippetPath of allPyFiles) {
      const code = readFileSync(snippetPath, 'utf-8');
      const significantLines = getSignificantLines(code);

      if (significantLines.length === 0) continue;

      // Determine language and snippet ID from path
      const relativePath = relative(snippetsDir, snippetPath).replace(/\\/g, '/');
      const lang: 'pt-br' | 'en-us' = relativePath.includes('.en-us.') ? 'en-us' : 'pt-br';
      const baseName = relativePath
        .replace('.pt-br.py', '')
        .replace('.en-us.py', '')
        .replace('.py', '');

      // Find all slides that reference this snippet for this language
      for (const [slideFile, perSnippet] of slideMap) {
        const perLang = perSnippet.get(baseName);
        if (!perLang) continue;

        const explanations = perLang.get(lang);
        if (!explanations) continue;

        const uncovered = significantLines.filter((line) => !isCovered(line, explanations));
        if (uncovered.length > 0) {
          failures.push(
            `❌ ${slideFile} → ${lang}: lines ${uncovered.join(', ')} of snippet '${baseName}' (${relativePath})`,
          );
        }
      }
    }

    if (failures.length > 0) {
      expect.unreachable(
        `\n🔴 ${failures.length} Python snippet(s) with uncovered lines:\n\n${failures.join('\n')}`,
      );
    }
  });

  it('every codeExplanations lineRange refers to existing lines in its snippet', () => {
    const allPyFiles = findAllPyFiles(snippetsDir);
    const snippetCodeMap = new Map<string, { path: string; totalLines: number }>();

    for (const snippetPath of allPyFiles) {
      const code = readFileSync(snippetPath, 'utf-8');
      const totalLines = code.split('\n').length;
      const relativePath = relative(snippetsDir, snippetPath).replace(/\\/g, '/');
      const baseName = relativePath
        .replace('.pt-br.py', '')
        .replace('.en-us.py', '')
        .replace('.py', '');
      snippetCodeMap.set(baseName, { path: relativePath, totalLines });
    }

    const failures: string[] = [];

    for (const slideFile of slideFiles) {
      const slidePath = join(slidesDir, slideFile);
      const raw = readFileSync(slidePath, 'utf-8');
      if (!raw.includes('snippet:')) continue;

      const json: SlideJson = JSON.parse(raw);
      const allExplanations = extractCodeExplanations(json);

      if (allExplanations.length === 0) continue;

      const bodyText = json.content?.['pt-br']?.body || raw;
      const snippetIds = extractSnippetReferences(bodyText);

      for (const snippetId of snippetIds) {
        const snippetInfo = snippetCodeMap.get(snippetId);
        if (!snippetInfo) continue;

        for (const { label, lang, explanations } of allExplanations) {
          // Only check explanations for the language that matches the snippet
          const snippetLang: 'pt-br' | 'en-us' = snippetInfo.path.includes('.en-us.') ? 'en-us' : 'pt-br';
          if (lang !== snippetLang) continue;

          for (const exp of explanations) {
            if (exp.lineRange[1] > snippetInfo.totalLines) {
              failures.push(
                `❌ ${slideFile} → ${label}: lineRange [${exp.lineRange[0]}, ${exp.lineRange[1]}] ` +
                `exceeds snippet total of ${snippetInfo.totalLines} lines ('${snippetId}' in ${snippetInfo.path})`,
              );
            }
            if (exp.lineRange[0] < 1) {
              failures.push(
                `❌ ${slideFile} → ${label}: lineRange [${exp.lineRange[0]}, ${exp.lineRange[1]}] ` +
                `starts before line 1 ('${snippetId}' in ${snippetInfo.path})`,
              );
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
