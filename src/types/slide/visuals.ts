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
  SamplingRouletteCopy,
  SoftmaxVisualizerCopy,
  TokenizationVisualizerCopy,
  TokenSizeComparisonCopy,
  TrainingLoopStepperCopy,
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
  TransformerBlockDiagramCopy,
  WhyTransformersWorkCopy,
} from './transformers';
import type {
  ActivationFunctionsComparatorCopy,
  BackpropSignalFlowVisualCopy,
  BiologicalVsComputationalNeuronCopy,
  FeedforwardFlowVisualCopy,
  NeuralNetworkTabsStepperCopy,
  NeuralNetworkStepDebuggerVisualCopy,
  NeuronArchitectureAnimatedCopy,
  SigmoidDeepDiveExplorerCopy,
  SigmoidDerivativeExplorerCopy,
} from './neural-networks';
import type { PythonExerciseVisualCopy } from './exercise';

export interface BiologicalVsComputationalNeuronVisual {
  id: 'biological-vs-computational-neuron';
  copy: Record<Language, BiologicalVsComputationalNeuronCopy>;
}

export interface NeuronArchitectureAnimatedVisual {
  id: 'neuron-architecture-animated';
  copy: Record<Language, NeuronArchitectureAnimatedCopy>;
}

export interface ActivationFunctionsComparatorVisual {
  id: 'activation-functions-comparator';
  copy: Record<Language, ActivationFunctionsComparatorCopy>;
}

export interface SigmoidDeepDiveExplorerVisual {
  id: 'sigmoid-deep-dive-explorer';
  copy: Record<Language, SigmoidDeepDiveExplorerCopy>;
}

export interface SigmoidDerivativeExplorerVisual {
  id: 'sigmoid-derivative-explorer';
  copy: Record<Language, SigmoidDerivativeExplorerCopy>;
}

export interface FeedforwardFlowVisual {
  id: 'feedforward-flow-visual';
  copy: Record<Language, FeedforwardFlowVisualCopy>;
}

export interface BackpropSignalFlowVisual {
  id: 'backprop-signal-flow';
  copy: Record<Language, BackpropSignalFlowVisualCopy>;
}

export interface NeuralNetworkStepDebuggerVisual {
  id: 'neural-network-step-debugger';
  copy: Record<Language, NeuralNetworkStepDebuggerVisualCopy>;
}

export interface NeuralNetworkTabsStepperVisual {
  id: 'neural-network-tabs-stepper';
  copy: Record<Language, NeuralNetworkTabsStepperCopy>;
}

export interface PythonExerciseVisual {
  id: 'python-exercise';
  copy: Record<Language, PythonExerciseVisualCopy>;
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

export interface NonlinearSolutionRingVisual {
  id: 'nonlinear-solution-ring';
  copy: Record<Language, NonlinearSolutionRingVisualCopy>;
}

export interface ApiLatencyGrowthVisual {
  id: 'api-latency-growth';
  copy: Record<Language, ApiLatencyGrowthVisualCopy>;
}

export interface LinearRegressionTabsVisual {
  id: 'linear-regression-tabs';
  copy: Record<Language, LinearRegressionTabsCopy>;
}

export interface PythonPrereqTabsVisual {
  id: 'python-prereq-tabs';
  copy: Record<Language, PythonPrereqTabsVisualCopy>;
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

export interface WelcomeSynthwaveVisual {
  id: 'welcome-synthwave';
  copy: Record<Language, WelcomeSynthwaveCopy>;
}

export interface LinearRegressionSimpleLineVisual {
  id: 'linear-regression-simple-line';
  copy: Record<Language, LinearRegressionSimpleLineCopy>;
}

export type SlideVisual =
  | InferenceDiagramVisual
  | LearningLoopDiagramVisual
  | LocalizedImageVisual
  | MachineLearningPipelineVisual
  | NonlinearRegressionBoundaryVisual
  | NonlinearSolutionRingVisual
  | ApiLatencyGrowthVisual
  | LinearRegressionTabsVisual
  | PythonPrereqTabsVisual
  | LinearRegressionSimpleLineVisual
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
  | RoadToMiniTransformerVisual
  | WelcomeSynthwaveVisual
  | NeuronArchitectureAnimatedVisual
  | ActivationFunctionsComparatorVisual
  | SigmoidDeepDiveExplorerVisual
  | SigmoidDerivativeExplorerVisual
  | FeedforwardFlowVisual
  | BackpropSignalFlowVisual
  | BiologicalVsComputationalNeuronVisual
  | NeuralNetworkStepDebuggerVisual
  | NeuralNetworkTabsStepperVisual
  | PythonExerciseVisual;

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
