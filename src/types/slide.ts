export type Language = 'pt-br' | 'en-us';

export type SlideType = 'markdown' | 'two-column' | 'custom' | 'code';

export interface IContent {
  title: string;
  body: string;
}

export interface ISlide {
  id: string;
  type: SlideType;
  content: Record<Language, IContent>;
  options?: {
    columns?: number;
    codeLanguage?: string;
    animation?: string;
  };
}
