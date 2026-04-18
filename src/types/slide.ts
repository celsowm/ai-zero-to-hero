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

export interface LearningLoopDiagramCopy {
  diagramTitle: string;
  diagramDescription: string;
  dataTitle: string;
  modelTitle: string;
  predictionTitle: string;
  errorTitle: string;
  adjustTitle: string;
  loopLabel: string;
  footerLabel: string;
}

export interface LocalizedImageCopy {
  src: string;
  alt: string;
  openLabel: string;
  closeLabel: string;
}

export interface InferenceDiagramVisual {
  id: 'inference-diagram';
  copy: Record<Language, InferenceDiagramCopy>;
}

export interface LearningLoopDiagramVisual {
  id: 'learning-loop-diagram';
  copy: Record<Language, LearningLoopDiagramCopy>;
}

export interface LocalizedImageVisual {
  id: 'localized-image';
  copy: Record<Language, LocalizedImageCopy>;
}

export type SlideVisual = InferenceDiagramVisual | LearningLoopDiagramVisual | LocalizedImageVisual;

export interface SlideOptions {
  columns?: number;
  columnRatios?: [number, number];
  codeLanguage?: string;
  animation?: string;
}

export interface ISlide {
  id: string;
  type: SlideType;
  content: Record<Language, IContent>;
  visual?: SlideVisual;
  options?: SlideOptions;
}
