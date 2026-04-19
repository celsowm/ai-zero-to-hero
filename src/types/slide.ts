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

export interface MachineLearningPipelineStageCopy {
  title: string;
  subtitle: string;
  accent: string;
}

export interface MachineLearningPipelineCopy {
  diagramTitle: string;
  diagramDescription: string;
  stages: MachineLearningPipelineStageCopy[];
  loopLabel: string;
  footerLabel: string;
}

export interface LinearRegressionTabCopy {
  label: string;
}

export interface LinearRegressionFormulaPointCopy {
  label: string;
  accent: string;
}

export interface LinearRegressionFormulaPanelCopy {
  eyebrow: string;
  formula: string;
  description: string;
  points: LinearRegressionFormulaPointCopy[];
  footer: string;
}

export interface LinearRegressionGraphNodeCopy {
  label: string;
  accent: string;
}

export interface LinearRegressionChartPointCopy {
  x: number;
  y: number;
  label: string;
  accent: string;
}

export interface LinearRegressionChartResidualCopy {
  x: number;
  yReal: number;
  yPred: number;
  label: string;
  accent: string;
}

export interface LinearRegressionChartCopy {
  xLabel: string;
  yLabel: string;
  lineLabel: string;
  points: LinearRegressionChartPointCopy[];
  residuals?: LinearRegressionChartResidualCopy[];
  lineStart: { x: number; y: number };
  lineEnd: { x: number; y: number };
  footer: string;
}

export interface LinearRegressionGraphPanelCopy {
  eyebrow: string;
  title: string;
  description: string;
  inputNodes: LinearRegressionGraphNodeCopy[];
  outputLabel: string;
  outputNode: LinearRegressionGraphNodeCopy;
  chart?: LinearRegressionChartCopy;
  footer: string;
}

export interface LinearRegressionTabsCopy {
  tabs: [LinearRegressionTabCopy, LinearRegressionTabCopy];
  formulaPanel: LinearRegressionFormulaPanelCopy;
  graphPanel: LinearRegressionGraphPanelCopy;
}

export interface GradientDescentVisualCopy {
  diagramTitle: string;
  diagramDescription: string;
  surfaceLabel: string;
  gradientLabel: string;
  learningRateLabel: string;
  minimumLabel: string;
  pathLabel: string;
  startLabel: string;
  footerLabel: string;
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

export interface MachineLearningPipelineVisual {
  id: 'machine-learning-pipeline';
  copy: Record<Language, MachineLearningPipelineCopy>;
}

export interface LinearRegressionTabsVisual {
  id: 'linear-regression-tabs';
  copy: Record<Language, LinearRegressionTabsCopy>;
}

export interface GradientDescentVisual {
  id: 'gradient-descent-3d';
  copy: Record<Language, GradientDescentVisualCopy>;
}

export type SlideVisual =
  | InferenceDiagramVisual
  | LearningLoopDiagramVisual
  | LocalizedImageVisual
  | MachineLearningPipelineVisual
  | LinearRegressionTabsVisual
  | GradientDescentVisual;

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
