export type Language = 'pt-br' | 'en-us';

export type SlideType = 'markdown' | 'two-column' | 'custom' | 'code';

export interface CodeExplanation {
  lineRange: [number, number];
  content: string;
}

export interface IContent {
  title: string;
  body: string;
  codeExplanations?: CodeExplanation[];
}
