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
  regions: CodeRegionId[];
  explanations?: Partial<Record<CodeRegionId, string>>;
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
