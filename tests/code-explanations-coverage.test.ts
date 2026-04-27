import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
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
 * Parse a slide JSON and extract all codeExplanations arrays,
 * keyed by language section.
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

describe('codeExplanations coverage', () => {
  const projectRoot = join(__dirname, '..');
  const slidesDir = join(projectRoot, 'src/data/slides');
  const snippetsDir = join(projectRoot, 'src/content/snippets/python-prereq');

  const slideFiles = readdirSync(slidesDir).filter((f) => f.endsWith('.json'));
  const snippetFiles = readdirSync(snippetsDir).filter((f) => f.endsWith('.py'));

  // Build a map: slideFile → snippetId → language → codeExplanations[]
  function getSlideSnippetMap() {
    const map = new Map<string, Map<string, Map<string, CodeExplanation[]>>>();
    // slideFile → snippetId → lang → explanations[]
    for (const slideFile of slideFiles) {
      const slidePath = join(slidesDir, slideFile);
      const raw = readFileSync(slidePath, 'utf-8');
      const json: SlideJson = JSON.parse(raw);
      const allExplanations = extractCodeExplanations(json);

      // Group by snippet id referenced in body
      const bodyPt = json.content?.['pt-br']?.toString() || raw;
      const bodyEn = json.content?.['en-us']?.toString() || raw;
      const snippetPt = bodyPt.match(/snippet:python-prereq\/([\w-]+)/)?.[1];
      const snippetEn = bodyEn.match(/snippet:python-prereq\/([\w-]+)/)?.[1];

      if (!snippetPt && !snippetEn) continue;

      const perSnippet = new Map<string, Map<string, CodeExplanation[]>>();

      for (const { label, lang, explanations } of allExplanations) {
        const snippetId = lang === 'pt-br' ? snippetPt : snippetEn;
        if (!snippetId) continue;
        if (!perSnippet.has(snippetId)) {
          perSnippet.set(snippetId, new Map());
        }
        const langMap = perSnippet.get(snippetId)!;
        langMap.set(label, explanations);
      }

      map.set(slideFile, perSnippet);
    }
    return map;
  }

  it('every non-empty, non-comment line in python-prereq snippets is covered by codeExplanations in referencing slides', () => {
    const slideMap = getSlideSnippetMap();

    for (const snippetFile of snippetFiles) {
      const snippetPath = join(snippetsDir, snippetFile);
      const code = readFileSync(snippetPath, 'utf-8');
      const significantLines = getSignificantLines(code);

      if (significantLines.length === 0) continue;

      // Determine language from filename (used to match against perLang keys)
      const baseName = snippetFile
        .replace('.pt-br.py', '')
        .replace('.en-us.py', '');

      // Find all slides that reference this snippet for this language
      for (const [slideFile, perSnippet] of slideMap) {
        const perLang = perSnippet.get(baseName);
        if (!perLang) continue;

        for (const [label, explanations] of perLang) {
          const uncovered = significantLines.filter((line) => !isCovered(line, explanations));
          if (uncovered.length > 0) {
            expect.unreachable(
              `${slideFile} → ${label} does not cover lines ${uncovered.join(', ')} of snippet ${baseName} (file: ${snippetFile}). ` +
              `All non-empty, non-comment lines must have a codeExplanations entry.`,
            );
          }
        }
      }
    }
  });

  it('every codeExplanations lineRange refers to existing lines in its snippet', () => {
    for (const slideFile of slideFiles) {
      const slidePath = join(slidesDir, slideFile);
      const raw = readFileSync(slidePath, 'utf-8');
      if (!raw.includes('snippet:python-prereq/')) continue;

      const json: SlideJson = JSON.parse(raw);
      const allExplanations = extractCodeExplanations(json);

      const bodyText = json.content?.['pt-br']?.toString() || raw;
      const snippetMatch = bodyText.match(/snippet:python-prereq\/([\w-]+)/);
      if (!snippetMatch) continue;

      const snippetId = snippetMatch[1];
      const ptSnippetPath = join(snippetsDir, `${snippetId}.pt-br.py`);
      if (!existsSync(ptSnippetPath)) continue;

      const snippetCode = readFileSync(ptSnippetPath, 'utf-8');
      const totalLines = snippetCode.split('\n').length;

      for (const { label, explanations } of allExplanations) {
        for (const exp of explanations) {
          if (exp.lineRange[1] > totalLines) {
            expect.unreachable(
              `${slideFile} → ${label}: lineRange [${exp.lineRange[0]}, ${exp.lineRange[1]}] ` +
              `exceeds snippet total of ${totalLines} lines (${snippetId}).`,
            );
          }
          if (exp.lineRange[0] < 1) {
            expect.unreachable(
              `${slideFile} → ${label}: lineRange [${exp.lineRange[0]}, ${exp.lineRange[1]}] ` +
              `starts before line 1.`,
            );
          }
        }
      }
    }
  });
});
