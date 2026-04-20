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

export interface LinearRegression2DChartCopy {
  eyebrow: string;
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  lineLabel: string;
  dataset: LinearRegression3DPointCopy[];
  lineStart: { x: number; y: number };
  lineEnd: { x: number; y: number };
  symbolGuideTitle: string;
  symbolGuide: LinearRegressionNotationLegendItemCopy[];
  footer: string;
}

export interface LinearRegression3DChartVisualCopy {
  tabs?: [LinearRegressionTabCopy, LinearRegressionTabCopy];
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
  symbolGuideTitle: string;
  symbolGuide: LinearRegressionNotationLegendItemCopy[];
  footer: string;
  comparisonChart?: LinearRegression2DChartCopy;
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
  beta0?: string;
  beta1?: string;
  beta2?: string;
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
    beta0?: string;
    beta1?: string;
    beta2?: string;
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

export interface LanguageModelingDiagramCopy {
  text: string;
  options: string[];
}

export interface NextTokenInteractiveCopy {
  startLabel: string;
  nextLabel: string;
}

export interface TokenSizeComparisonCopy {
  chars: string;
  words: string;
  tokens: string;
}

export interface TokenizationVisualizerCopy {
  inputText: string;
  tokenLabel: string;
  idLabel: string;
}

export interface BigramCounterCopy {
  text: string;
  currentToken: string;
  countsTitle: string;
}

export interface SoftmaxVisualizerCopy {
  countsLabel: string;
  softmaxLabel: string;
  sumLabel: string;
}

export interface SamplingRouletteCopy {
  rollLabel: string;
  resultLabel: string;
}

export interface CrossEntropyChartCopy {
  probAxis: string;
  lossAxis: string;
  highSurprise: string;
  lowSurprise: string;
}

export interface EmbeddingSpace3DCopy {
  xLabel: string;
  yLabel: string;
  distanceLabel: string;
}

export interface ContextWindowSliderCopy {
  fullText: string;
  windowLabel: string;
  forgottenLabel: string;
  activeLabel: string;
}

export interface MlpTextDiagramCopy {
  inputSizeLabel: string;
  sentence1: string;
  sentence2: string;
  errorLabel: string;
}

export interface TrainingLoopStepperCopy {
  step1Title: string;
  step1Desc: string;
  step2Title: string;
  step2Desc: string;
  step3Title: string;
  step3Desc: string;
}

export interface Gpt2BlackboxDiagramCopy {
  inputLabel: string;
  modelLabel: string;
  outputLabel: string;
}

export interface ParallelPredictionDiagramCopy {
  text: string;
  parallelLabel: string;
  prediction1: string;
  prediction2: string;
  prediction3: string;
}

export interface PositionalEmbeddingAdderCopy {
  tokenLabel: string;
  positionLabel: string;
  sumLabel: string;
  plusSign: string;
  equalsSign: string;
}

export interface TransformerBlockDiagramCopy {
  attentionLabel: string;
  mlpLabel: string;
  inputLabel: string;
  outputLabel: string;
}

export interface CausalMaskMatrixCopy {
  allowedLabel: string;
  maskedLabel: string;
  rowLabel: string;
  colLabel: string;
}

export interface QkvCocktailPartyCopy {
  queryLabel: string;
  keyLabel: string;
  valueLabel: string;
}

export interface AttentionLinesDiagramCopy {
  token1: string;
  token2: string;
  token3: string;
  strongConnection: string;
  weakConnection: string;
}

export interface MultiheadDiagramCopy {
  head1Label: string;
  head2Label: string;
  head3Label: string;
  combineLabel: string;
}

export interface ResidualStreamHighwayCopy {
  highwayLabel: string;
  blockLabel: string;
  addLabel: string;
}

export interface AttentionVsMlpCopy {
  attentionDesc: string;
  mlpDesc: string;
}

export interface HiddenStatesToLogitsCopy {
  hiddenStateLabel: string;
  unembedLabel: string;
  logitsLabel: string;
}

export interface SamplingControlsCopy {
  tempLabel: string;
  topKLabel: string;
  lowTempDesc: string;
  highTempDesc: string;
}

export interface Gpt2LayerXrayCopy {
  layerLabel: string;
  inputLabel: string;
  outputLabel: string;
}

export interface PredictionEvolutionCopy {
  step1: string;
  step2: string;
  step3: string;
}

export interface WhyTransformersWorkCopy {
  reason1: string;
  reason2: string;
  reason3: string;
}

export interface RoadToMiniTransformerCopy {
  startLabel: string;
  endLabel: string;
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

export interface NonlinearRegressionBoundaryVisual {
  id: 'nonlinear-regression-boundary';
  copy: Record<Language, NonlinearRegressionBoundaryVisualCopy>;
}

export interface NonlinearRegressionBoundaryVisualCopy {
  eyebrow: string;
  title: string;
  description: string;
  tabLabels: [string, string];
  accuracyLabel: string;
  mseLabel: string;
  statusLabel: string;
  startLabel: string;
  restartLabel: string;
  lineLabel: string;
  innerClassLabel: string;
  outerClassLabel: string;
  legendTitle: string;
  statusIdleLabel: string;
  statusRunningLabel: string;
  statusCompleteLabel: string;
  outerClassDescription: string;
  innerClassDescription: string;
  lineDescription: string;
  codeTitle: string;
  codeDescription: string;
  code: string;
  footer: string;
}

export interface ApiLatencyGrowthPointCopy {
  users: number;
  latency: number;
  label: string;
  accent: string;
}

export interface ApiLatencyGrowthMetricCopy {
  title: string;
  value: string;
  description: string;
  accent: string;
}

export interface ApiLatencyGrowthVisualCopy {
  eyebrow: string;
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  curveLabel: string;
  referenceLabel: string;
  lowLoadLabel: string;
  saturationLabel: string;
  explosionLabel: string;
  legendTitle: string;
  metrics: ApiLatencyGrowthMetricCopy[];
  points: ApiLatencyGrowthPointCopy[];
  footer: string;
}

export interface LinearRegressionTabsVisual {
  id: 'linear-regression-tabs';
  copy: Record<Language, LinearRegressionTabsCopy>;
}

export interface ApiLatencyGrowthVisual {
  id: 'api-latency-growth';
  copy: Record<Language, ApiLatencyGrowthVisualCopy>;
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

export interface LanguageModelingDiagramVisual {
  id: 'language-modeling-diagram';
  copy: Record<Language, LanguageModelingDiagramCopy>;
}

export interface NextTokenInteractiveVisual {
  id: 'next-token-interactive';
  copy: Record<Language, NextTokenInteractiveCopy>;
}

export interface TokenSizeComparisonVisual {
  id: 'token-size-comparison';
  copy: Record<Language, TokenSizeComparisonCopy>;
}

export interface TokenizationVisualizerVisual {
  id: 'tokenization-visualizer';
  copy: Record<Language, TokenizationVisualizerCopy>;
}

export interface BigramCounterVisual {
  id: 'bigram-counter';
  copy: Record<Language, BigramCounterCopy>;
}

export interface SoftmaxVisualizerVisual {
  id: 'softmax-visualizer';
  copy: Record<Language, SoftmaxVisualizerCopy>;
}

export interface SamplingRouletteVisual {
  id: 'sampling-roulette';
  copy: Record<Language, SamplingRouletteCopy>;
}

export interface CrossEntropyChartVisual {
  id: 'cross-entropy-chart';
  copy: Record<Language, CrossEntropyChartCopy>;
}

export interface EmbeddingSpace3DVisual {
  id: 'embedding-space-3d';
  copy: Record<Language, EmbeddingSpace3DCopy>;
}

export interface ContextWindowSliderVisual {
  id: 'context-window-slider';
  copy: Record<Language, ContextWindowSliderCopy>;
}

export interface MlpTextDiagramVisual {
  id: 'mlp-text-diagram';
  copy: Record<Language, MlpTextDiagramCopy>;
}

export interface TrainingLoopStepperVisual {
  id: 'training-loop-stepper';
  copy: Record<Language, TrainingLoopStepperCopy>;
}

export interface Gpt2BlackboxDiagramVisual {
  id: 'gpt2-blackbox-diagram';
  copy: Record<Language, Gpt2BlackboxDiagramCopy>;
}

export interface ParallelPredictionDiagramVisual {
  id: 'parallel-prediction-diagram';
  copy: Record<Language, ParallelPredictionDiagramCopy>;
}

export interface PositionalEmbeddingAdderVisual {
  id: 'positional-embedding-adder';
  copy: Record<Language, PositionalEmbeddingAdderCopy>;
}

export interface TransformerBlockDiagramVisual {
  id: 'transformer-block-diagram';
  copy: Record<Language, TransformerBlockDiagramCopy>;
}

export interface CausalMaskMatrixVisual {
  id: 'causal-mask-matrix';
  copy: Record<Language, CausalMaskMatrixCopy>;
}

export interface QkvCocktailPartyVisual {
  id: 'qkv-cocktail-party';
  copy: Record<Language, QkvCocktailPartyCopy>;
}

export interface AttentionLinesDiagramVisual {
  id: 'attention-lines-diagram';
  copy: Record<Language, AttentionLinesDiagramCopy>;
}

export interface MultiheadDiagramVisual {
  id: 'multihead-diagram';
  copy: Record<Language, MultiheadDiagramCopy>;
}

export interface ResidualStreamHighwayVisual {
  id: 'residual-stream-highway';
  copy: Record<Language, ResidualStreamHighwayCopy>;
}

export interface AttentionVsMlpVisual {
  id: 'attention-vs-mlp';
  copy: Record<Language, AttentionVsMlpCopy>;
}

export interface HiddenStatesToLogitsVisual {
  id: 'hidden-states-to-logits';
  copy: Record<Language, HiddenStatesToLogitsCopy>;
}

export interface SamplingControlsVisual {
  id: 'sampling-controls';
  copy: Record<Language, SamplingControlsCopy>;
}

export interface Gpt2LayerXrayVisual {
  id: 'gpt2-layer-by-layer-xray';
  copy: Record<Language, Gpt2LayerXrayCopy>;
}

export interface PredictionEvolutionVisual {
  id: 'prediction-evolution-we-the-people';
  copy: Record<Language, PredictionEvolutionCopy>;
}

export interface WhyTransformersWorkVisual {
  id: 'why-transformers-work-so-well';
  copy: Record<Language, WhyTransformersWorkCopy>;
}

export interface RoadToMiniTransformerVisual {
  id: 'road-to-mini-transformer';
  copy: Record<Language, RoadToMiniTransformerCopy>;
}

export type SlideVisual =
  | InferenceDiagramVisual
  | LearningLoopDiagramVisual
  | LocalizedImageVisual
  | MachineLearningPipelineVisual
  | NonlinearRegressionBoundaryVisual
  | ApiLatencyGrowthVisual
  | LinearRegressionTabsVisual
  | GradientDescentVisual
  | LinearRegressionNotationVisual
  | LinearRegression3DChartVisual
  | ProgressStepperVisual
  | LanguageModelingDiagramVisual
  | NextTokenInteractiveVisual
  | TokenSizeComparisonVisual
  | TokenizationVisualizerVisual
  | BigramCounterVisual
  | SoftmaxVisualizerVisual
  | SamplingRouletteVisual
  | CrossEntropyChartVisual
  | EmbeddingSpace3DVisual
  | ContextWindowSliderVisual
  | MlpTextDiagramVisual
  | TrainingLoopStepperVisual
  | Gpt2BlackboxDiagramVisual
  | ParallelPredictionDiagramVisual
  | PositionalEmbeddingAdderVisual
  | TransformerBlockDiagramVisual
  | CausalMaskMatrixVisual
  | QkvCocktailPartyVisual
  | AttentionLinesDiagramVisual
  | MultiheadDiagramVisual
  | ResidualStreamHighwayVisual
  | AttentionVsMlpVisual
  | HiddenStatesToLogitsVisual
  | SamplingControlsVisual
  | Gpt2LayerXrayVisual
  | PredictionEvolutionVisual
  | WhyTransformersWorkVisual
  | RoadToMiniTransformerVisual;

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
