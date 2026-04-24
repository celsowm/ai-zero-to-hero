import type { IContent, Language, SlideType } from './base';
import type {
  ApiLatencyGrowthVisualCopy,
  InferenceDiagramCopy,
  LearningLoopDiagramCopy,
  LocalizedImageCopy,
  MachineLearningPipelineCopy,
  WelcomeSynthwaveCopy,
} from './ai-core';
import type {
  GradientDescentVisualCopy,
  LinearRegression3DChartVisualCopy,
  LinearRegressionNotationVisualCopy,
  LinearRegressionSimpleLineCopy,
  LinearRegressionTabsCopy,
  ProgressStepperVisualCopy,
} from './linear-regression';
import type { PythonPrereqTabsVisualCopy } from './python-prereq';
import type { NonlinearRegressionBoundaryVisualCopy, NonlinearSolutionRingVisualCopy } from './nonlinear-regression';
import type {
  BigramCounterCopy,
  ContextWindowSliderCopy,
  CrossEntropyChartCopy,
  EmbeddingSpace3DCopy,
  LanguageModelingDiagramCopy,
  MlpTextDiagramCopy,
  NextTokenInteractiveCopy,
  NeuralNetworkToLanguageModelingComparatorCopy,
  SamplingRouletteCopy,
  SoftmaxVisualizerCopy,
  TokenizationVisualizerCopy,
  TokenSizeComparisonCopy,
  TrainingLoopStepperCopy,
  TrainingLoopAnimationCopy,
} from './language-models';
import type {
  AttentionLinesDiagramCopy,
  AttentionVsMlpCopy,
  CausalMaskMatrixCopy,
  Gpt2BlackboxDiagramCopy,
  Gpt2LayerXrayCopy,
  HiddenStatesToLogitsCopy,
  MultiheadDiagramCopy,
  ParallelPredictionDiagramCopy,
  PositionalEmbeddingAdderCopy,
  PredictionEvolutionCopy,
  QkvCocktailPartyCopy,
  ResidualStreamHighwayCopy,
  RoadToMiniTransformerCopy,
  SamplingControlsCopy,
  TransformerOverviewTeaserCopy,
  TransformerBlockDiagramCopy,
  WhyTransformersWorkCopy,
} from './transformers';
import type {
  ActivationFunctionsComparatorCopy,
  ArchitectureComparatorCopy,
  BackpropSignalFlowVisualCopy,
  BiologicalVsComputationalNeuronCopy,
  DerivativeRampExplorerCopy,
  FeedforwardFlowVisualCopy,
  NeuralNetworkTabsStepperCopy,
  NeuralNetworkStepDebuggerVisualCopy,
  NeuronArchitectureAnimatedCopy,
  SigmoidDeepDiveExplorerCopy,
  SigmoidDerivativeExplorerCopy,
  Tensor3DExplorerCopy,
} from './neural-networks';
import type { PythonExerciseVisualCopy } from './exercise';

// ── Visual registry: maps each visual id to its copy type ──────────────────

interface VisualCopyMap {
  // inference / learning
  'inference-diagram': InferenceDiagramCopy;
  'learning-loop-diagram': LearningLoopDiagramCopy;
  // localized image
  'localized-image': LocalizedImageCopy;
  // machine learning pipeline
  'machine-learning-pipeline': MachineLearningPipelineCopy;
  // nonlinear regression
  'nonlinear-regression-boundary': NonlinearRegressionBoundaryVisualCopy;
  'nonlinear-solution-ring': NonlinearSolutionRingVisualCopy;
  // api latency
  'api-latency-growth': ApiLatencyGrowthVisualCopy;
  // linear regression
  'linear-regression-tabs': LinearRegressionTabsCopy;
  'python-prereq-tabs': PythonPrereqTabsVisualCopy;
  'linear-regression-simple-line': LinearRegressionSimpleLineCopy;
  'gradient-descent-3d': GradientDescentVisualCopy;
  'linear-regression-notation': LinearRegressionNotationVisualCopy;
  'linear-regression-3d-chart': LinearRegression3DChartVisualCopy;
  // stepper
  'progress-stepper': ProgressStepperVisualCopy;
  // language models
  'language-modeling-diagram': LanguageModelingDiagramCopy;
  'next-token-interactive': NextTokenInteractiveCopy;
  'token-size-comparison': TokenSizeComparisonCopy;
  'tokenization-visualizer': TokenizationVisualizerCopy;
  'bigram-counter': BigramCounterCopy;
  'softmax-visualizer': SoftmaxVisualizerCopy;
  'sampling-roulette': SamplingRouletteCopy;
  'cross-entropy-chart': CrossEntropyChartCopy;
  'embedding-space-3d': EmbeddingSpace3DCopy;
  'context-window-slider': ContextWindowSliderCopy;
  'mlp-text-diagram': MlpTextDiagramCopy;
  'training-loop-stepper': TrainingLoopStepperCopy;
  'training-loop-animation': TrainingLoopAnimationCopy;
  'neural-network-to-language-modeling-comparator': NeuralNetworkToLanguageModelingComparatorCopy;
  // transformers
  'gpt2-blackbox-diagram': Gpt2BlackboxDiagramCopy;
  'transformer-overview-teaser': TransformerOverviewTeaserCopy;
  'parallel-prediction-diagram': ParallelPredictionDiagramCopy;
  'positional-embedding-adder': PositionalEmbeddingAdderCopy;
  'transformer-block-diagram': TransformerBlockDiagramCopy;
  'causal-mask-matrix': CausalMaskMatrixCopy;
  'qkv-cocktail-party': QkvCocktailPartyCopy;
  'attention-lines-diagram': AttentionLinesDiagramCopy;
  'multihead-diagram': MultiheadDiagramCopy;
  'residual-stream-highway': ResidualStreamHighwayCopy;
  'attention-vs-mlp': AttentionVsMlpCopy;
  'hidden-states-to-logits': HiddenStatesToLogitsCopy;
  'sampling-controls': SamplingControlsCopy;
  'gpt2-layer-by-layer-xray': Gpt2LayerXrayCopy;
  'prediction-evolution-we-the-people': PredictionEvolutionCopy;
  'why-transformers-work-so-well': WhyTransformersWorkCopy;
  'road-to-mini-transformer': RoadToMiniTransformerCopy;
  // neural networks
  'neuron-architecture-animated': NeuronArchitectureAnimatedCopy;
  'activation-functions-comparator': ActivationFunctionsComparatorCopy;
  'sigmoid-deep-dive-explorer': SigmoidDeepDiveExplorerCopy;
  'sigmoid-derivative-explorer': SigmoidDerivativeExplorerCopy;
  'feedforward-flow-visual': FeedforwardFlowVisualCopy;
  'backprop-signal-flow': BackpropSignalFlowVisualCopy;
  'biological-vs-computational-neuron': BiologicalVsComputationalNeuronCopy;
  'neural-network-step-debugger': NeuralNetworkStepDebuggerVisualCopy;
  'neural-network-tabs-stepper': NeuralNetworkTabsStepperCopy;
  'architecture-comparator': ArchitectureComparatorCopy;
  'tensor-3d-explorer': Tensor3DExplorerCopy;
  'derivative-ramp-explorer': DerivativeRampExplorerCopy;
  // python exercise
  'python-exercise': PythonExerciseVisualCopy;
  // welcome
  'welcome-synthwave': WelcomeSynthwaveCopy;
  // placeholder / future visuals (temporary — replace with proper copy types when implemented)
  'unembedding-diagram': WelcomeSynthwaveCopy;
  'temperature-slider-interactive': WelcomeSynthwaveCopy;
  'gpt2-full-architecture-diagram': WelcomeSynthwaveCopy;
  'layer-evolution-chart': WelcomeSynthwaveCopy;
  'transformer-scaling-chart': WelcomeSynthwaveCopy;
}

// ── Generated SlideVisual union from the registry ──────────────────────────

/**
 * SlideVisual is derived from VisualCopyMap — one union member per visual id.
 * Adding a new visual requires only adding an entry to VisualCopyMap above.
 */
export type SlideVisual = {
  [K in keyof VisualCopyMap]: {
    id: K;
    copy: Record<Language, VisualCopyMap[K]>;
  };
}[keyof VisualCopyMap];

// ── Convenience: extract copy type for a given visual id ───────────────────

/** Usage: `type MyCopy = VisualCopyForId<'my-visual-id'>` */
export type VisualCopyForId<T extends keyof VisualCopyMap> = VisualCopyMap[T];

// ── Slide options and ISlide ───────────────────────────────────────────────

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
