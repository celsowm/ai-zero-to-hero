export type Language = 'pt-br' | 'en-us';
export type SnippetLanguage = 'python' | 'javascript';
export type CodeRegionId = string;

export interface CodeSourceRef {
  snippetId: string;
  language: SnippetLanguage;
}

export interface CodeSnippetMeta {
  id: string;
  language: SnippetLanguage;
  regions?: CodeRegionId[];
  explanations?: Partial<Record<CodeRegionId, string>>;
  /**
   * Whether this snippet can be executed in the Pyodide playground.
   * Defaults to true. Set to false for snippets that use PyTorch,
   * native modules, or other APIs not available in Pyodide.
   */
  pyodide?: boolean;
  /**
   * Other snippet IDs that must be prepended when executing this snippet
   * in the playground. Resolved recursively (DFS) with deduplication,
   * so chains like A → B → C produce: C code, B code, A code.
   */
  dependencies?: string[];
}

export type SlideType = 'markdown' | 'two-column' | 'custom' | 'code' | 'exercise';

export interface CodeExplanation {
  lineRange: [number, number];
  content: string;
}

export interface IContent {
  title: string;
  body: string;
  codeExplanations?: CodeExplanation[];
}

/**
 * Base copy interface that all visual copy types should extend.
 * Eliminates duplicated title/description/ariaLabel/caption fields across visual types.
 */
export interface BaseVisualCopy {
  title: string;
  description?: string;
  ariaLabel?: string;
  caption?: string;
}
