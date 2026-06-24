import type { Language } from '../../constants/languages';

export type { Language };
export type SnippetLanguage = 'python' | 'javascript' | 'markdown' | 'bash' | 'powershell' | 'html' | 'json';
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
   * Defaults to true. Set to false for snippets that need APIs not
   * available in Pyodide or that depend on native modules.
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
  /** Content for the right column in two-column slides. When set, body is the left column. */
  rightBody?: string;
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

export interface CodeTabsCopy {
  tabs: Array<{ label: string }>;
  codePanels: Array<{
    kind?: 'code';
    title: string;
    description: string;
    source: CodeSourceRef;
    codeExplanations?: CodeExplanation[];
  }>;
}

export interface SftMetricsField {
  name: string;
  label: string;
  explanation: string;
}

export interface SftMetricsPanel {
  title: string;
  description: string;
  code: string;
  language: SnippetLanguage;
  fields: SftMetricsField[];
}

export interface SftMetricsTabsCopy {
  tabs: Array<{ label: string }>;
  panels: SftMetricsPanel[];
}
