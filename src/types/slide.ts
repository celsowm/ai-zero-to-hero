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

export interface LinearRegressionNotationLegendItemCopy {
  symbol: string;
  label: string;
  description: string;
  accent: string;
}

export interface LinearRegressionNotationVisualCopy {
  eyebrow: string;
  title: string;
  description: string;
  formula: string;
  legendTitle: string;
  legend: LinearRegressionNotationLegendItemCopy[];
  comparisonTitle: string;
  comparisonFormula: string;
  comparisonDescription: string;
  footer: string;
}

export interface LinearRegression3DPointCopy {
  height: number;
  age: number;
  realWeight: number;
  label: string;
  accent: string;
}

export interface LinearRegression3DChartVisualCopy {
  eyebrow: string;
  title: string;
  description: string;
  axisLabels: {
    x: string;
    y: string;
    z: string;
  };
  dataset: LinearRegression3DPointCopy[];
  coefficients: {
    beta0: number;
    beta1: number;
    beta2: number;
    formula: string;
  };
  realLabel: string;
  predictedLabel: string;
  planeLabel: string;
  footer: string;
}

export interface ProgressStepperStepCopy {
  label: string;
  title: string;
  description: string;
  formula: string;
  accent: string;
  highlightedRowIndexes?: number[];
}

export interface ProgressStepperTableRowCopy {
  height: string;
  age: string;
  realWeight: string;
  predictedWeight?: string;
  error?: string;
  squaredError?: string;
}

export interface ProgressStepperTableCopy {
  title: string;
  headers: {
    height: string;
    age: string;
    realWeight: string;
    predictedWeight: string;
    error: string;
    squaredError: string;
  };
  rows: ProgressStepperTableRowCopy[];
}

export interface ProgressStepperVisualCopy {
  eyebrow: string;
  title: string;
  description: string;
  progressLabel: string;
  previousLabel: string;
  nextLabel: string;
  completionLabel: string;
  completionDescription: string;
  footer: string;
  table?: ProgressStepperTableCopy;
  steps: ProgressStepperStepCopy[];
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

export interface LinearRegressionNotationVisual {
  id: 'linear-regression-notation';
  copy: Record<Language, LinearRegressionNotationVisualCopy>;
}

export interface LinearRegression3DChartVisual {
  id: 'linear-regression-3d-chart';
  copy: Record<Language, LinearRegression3DChartVisualCopy>;
}

export interface ProgressStepperVisual {
  id: 'progress-stepper';
  copy: Record<Language, ProgressStepperVisualCopy>;
}

export type SlideVisual =
  | InferenceDiagramVisual
  | LearningLoopDiagramVisual
  | LocalizedImageVisual
  | MachineLearningPipelineVisual
  | LinearRegressionTabsVisual
  | GradientDescentVisual
  | LinearRegressionNotationVisual
  | LinearRegression3DChartVisual
  | ProgressStepperVisual;

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
