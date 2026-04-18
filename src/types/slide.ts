export type Language = 'pt-br' | 'en-us';

export type SlideType = 'markdown' | 'two-column' | 'custom' | 'code';

export interface IContent {
  title: string;
  body: string;
}

export interface InferenceDiagramCopy {
  diagramTitle: string;
  diagramDescription: string;
  trainingTitle: string;
  modelTitle: string;
  predictionsTitle: string;
  featuresLabel: string;
  lossLabel: string;
  updateLabel: string;
  footerLabel: string;
}

export interface InferenceDiagramVisual {
  id: 'inference-diagram';
  copy: Record<Language, InferenceDiagramCopy>;
}

export type SlideVisual = InferenceDiagramVisual;

export interface ISlide {
  id: string;
  type: SlideType;
  content: Record<Language, IContent>;
  visual?: SlideVisual;
  options?: {
    columns?: number;
    codeLanguage?: string;
    animation?: string;
  };
}
