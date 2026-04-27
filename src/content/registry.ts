import type { CodeSnippetMeta, CodeSourceRef, Language, SnippetLanguage } from '../types/slide';

const codeModules = {
  ...import.meta.glob('./snippets/**/*.py', { eager: true, query: '?raw', import: 'default' }),
  ...import.meta.glob('./snippets/**/*.js', { eager: true, query: '?raw', import: 'default' }),
} as Record<string, string>;

const metaModules = import.meta.glob('./snippets/**/*.meta.json', { eager: true }) as Record<string, { default?: unknown } | unknown>;

type LocalizedSnippetRecord = {
  snippetId: string;
  locale: Language;
  language: SnippetLanguage;
  rawCode: string;
  code: string;
  regions: Record<string, [number, number]>;
  meta?: CodeSnippetMeta;
};

const START_REGION_RE = /^\s*(?:#|\/\/)\s*@?region\s+([A-Za-z0-9_-]+)\s*$/;
const END_REGION_RE = /^\s*(?:#|\/\/)\s*@?end(?:region)?\s*$/;
const SNIPPET_ROOT_RE = /^\.\/snippets\//;
const CODE_FILE_RE = /^(.+)\.(pt-br|en-us)\.(py|js)$/;
const META_FILE_RE = /^(.+)\.meta\.json$/;

const snippetIndex = new Map<string, LocalizedSnippetRecord>();
const metaIndex = new Map<string, CodeSnippetMeta>();

function normalizeModule<T>(value: unknown): T {
  if (value && typeof value === 'object' && 'default' in (value as Record<string, unknown>)) {
    return (value as { default: T }).default;
  }

  return value as T;
}

function normalizeNewlines(code: string): string {
  return code.replace(/\r\n/g, '\n');
}

function normalizeSnippetId(path: string): string {
  return path.replace(SNIPPET_ROOT_RE, '');
}

function parseSnippetSource(rawCode: string): { code: string; regions: Record<string, [number, number]> } {
  const lines = normalizeNewlines(rawCode).split('\n');
  const renderedLines: string[] = [];
  const regionStack: Array<{ name: string; startLine: number }> = [];
  const regions = new Map<string, [number, number]>();

  for (const line of lines) {
    const startMatch = line.match(START_REGION_RE);
    if (startMatch) {
      if (regionStack.length > 0) {
        throw new Error(`Nested snippet regions are not supported: "${startMatch[1]}"`);
      }

      regionStack.push({ name: startMatch[1], startLine: renderedLines.length + 1 });
      continue;
    }

    if (END_REGION_RE.test(line)) {
      const current = regionStack.pop();

      if (!current) {
        throw new Error('Encountered an endregion marker without a matching start marker');
      }

      regions.set(current.name, [current.startLine, renderedLines.length]);
      continue;
    }

    renderedLines.push(line);
  }

  if (regionStack.length > 0) {
    const openRegions = regionStack.map((region) => region.name).join(', ');
    throw new Error(`Unclosed snippet regions: ${openRegions}`);
  }

  return {
    code: renderedLines.join('\n'),
    regions: Object.fromEntries(regions),
  };
}

function registerMeta(path: string, moduleValue: unknown) {
  const match = path.match(META_FILE_RE);
  if (!match) {
    return;
  }

  const snippetId = normalizeSnippetId(match[1]);
  const meta = normalizeModule<CodeSnippetMeta>(moduleValue);

  if (meta.id !== snippetId) {
    throw new Error(`Snippet meta id mismatch for "${path}": expected "${snippetId}", got "${meta.id}"`);
  }

  metaIndex.set(snippetId, meta);
}

function registerCode(path: string, moduleValue: unknown) {
  const match = path.match(CODE_FILE_RE);
  if (!match) {
    return;
  }

  const snippetId = normalizeSnippetId(match[1]);
  const locale = match[2] as Language;
  const language = match[3] === 'py' ? 'python' : 'javascript';
  const rawCode = normalizeModule<string>(moduleValue);
  const parsed = parseSnippetSource(rawCode);
  const meta = metaIndex.get(snippetId);

  if (meta && meta.regions) {
    const parsedRegionNames = Object.keys(parsed.regions).sort();
    const declaredRegionNames = [...meta.regions].sort();
    const sameLength = parsedRegionNames.length === declaredRegionNames.length;
    const sameSet = sameLength && parsedRegionNames.every((region, index) => region === declaredRegionNames[index]);

    if (!sameSet) {
      throw new Error(
        `Snippet region mismatch for "${snippetId}" (${locale}/${language}): expected [${declaredRegionNames.join(', ')}], got [${parsedRegionNames.join(', ')}]`,
      );
    }
  }

  snippetIndex.set(`${snippetId}|${locale}|${language}`, {
    snippetId,
    locale,
    language,
    rawCode,
    code: parsed.code,
    regions: parsed.regions,
    meta,
  });
}

for (const [path, moduleValue] of Object.entries(metaModules)) {
  registerMeta(path, moduleValue);
}

for (const [path, moduleValue] of Object.entries(codeModules)) {
  registerCode(path, moduleValue);
}

function makeKey(snippetId: string, locale: Language, language: SnippetLanguage) {
  return `${snippetId}|${locale}|${language}`;
}

function findSnippet(sourceRef: CodeSourceRef, locale: Language): LocalizedSnippetRecord {
  const exact = snippetIndex.get(makeKey(sourceRef.snippetId, locale, sourceRef.language));
  if (exact) {
    return exact;
  }

  const fallback = [...snippetIndex.values()].find(
    (snippet) => snippet.snippetId === sourceRef.snippetId && snippet.language === sourceRef.language,
  );

  if (fallback) {
    return fallback;
  }

  throw new Error(
    `Unable to resolve snippet "${sourceRef.snippetId}" for ${locale}/${sourceRef.language}. Make sure the matching file exists in src/content/snippets.`,
  );
}

export function resolveSnippetSource(sourceRef: CodeSourceRef, locale: Language): LocalizedSnippetRecord {
  return findSnippet(sourceRef, locale);
}

export function resolveSnippetCode(sourceRef: CodeSourceRef, locale: Language): string {
  return findSnippet(sourceRef, locale).code;
}

export function resolveSnippetRegion(
  sourceRef: CodeSourceRef,
  locale: Language,
  regionId: string,
): [number, number] | null {
  return findSnippet(sourceRef, locale).regions[regionId] ?? null;
}

export function resolveSnippetExplanations(sourceRef: CodeSourceRef, locale: Language): CodeSnippetMeta['explanations'] {
  return findSnippet(sourceRef, locale).meta?.explanations;
}
