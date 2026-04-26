import React from 'react';
import type { Language } from '../types/slide';

import type { PythonExerciseVisualCopy } from '../types/slide';

export interface VisualRenderProps {
  visual: { id: string; copy: unknown };
  language: Language;
}

export type VisualComponent = React.FC<VisualRenderProps>;

const visualRegistry: Record<string, React.LazyExoticComponent<VisualComponent>> = {};

function registerVisual(id: string, component: React.LazyExoticComponent<VisualComponent>) {
  visualRegistry[id] = component;
}

/**
 * Mapping from visual ID → exported component name in the barrel file.
 * Add a new entry here to register a visual — no boilerplate blocks needed.
 */
const visualMap: Record<string, string> = {
  // inference / learning
  'inference-diagram': 'InferenceDiagram',
  'learning-loop-diagram': 'LearningLoopDiagram',

  // localized image
  'localized-image': 'LocalizedImageVisual',

  // machine learning pipeline
  'machine-learning-pipeline': 'MachineLearningPipelineDiagram',

  // nonlinear regression
  'nonlinear-regression-boundary': 'NonlinearRegressionBoundaryVisual',
  'nonlinear-solution-ring': 'NonlinearSolutionRingVisual',

  // api latency
  'api-latency-growth': 'ApiLatencyGrowthVisual',

  // linear regression
  'linear-regression-tabs': 'LinearRegressionTabsVisual',
  'linear-regression-simple-line': 'LinearRegressionSimpleLineVisual',
  'linear-regression-notation': 'LinearRegressionNotationVisual',
  'linear-regression-3d-chart': 'LinearRegression3DChartVisual',
  'gradient-descent-3d': 'GradientDescent3DVisual',

  // stepper
  'progress-stepper': 'ProgressStepperVisual',

  // language models
  'language-modeling-diagram': 'LanguageModelingDiagram',
  'next-token-interactive': 'NextTokenInteractive',
  'token-size-comparison': 'TokenSizeComparison',
  'tokenization-visualizer': 'TokenizationVisualizer',
  'bigram-counter': 'BigramCounter',
  'softmax-visualizer': 'SoftmaxVisualizer',
  'sampling-roulette': 'SamplingRoulette',
  'cross-entropy-chart': 'CrossEntropyChart',
  'embedding-space-3d': 'EmbeddingSpace3D',
  'context-window-slider': 'ContextWindowSlider',
  'mlp-text-diagram': 'MlpTextDiagram',
  'training-loop-stepper': 'TrainingLoopStepper',
  'training-loop-animation': 'TrainingLoopAnimation',
  'neural-network-to-language-modeling-comparator': 'NeuralNetworkToLanguageModelingComparator',

  // transformers
  'gpt2-blackbox-diagram': 'Gpt2BlackboxDiagram',
  'transformer-overview-teaser': 'TransformerOverviewTeaser',
  'parallel-prediction-diagram': 'ParallelPredictionDiagram',
  'positional-embedding-adder': 'PositionalEmbeddingAdder',
  'transformer-block-diagram': 'TransformerBlockDiagram',
  'causal-mask-matrix': 'CausalMaskMatrix',
  'qkv-cocktail-party': 'QkvCocktailParty',
  'attention-lines-diagram': 'AttentionLinesDiagram',
  'multihead-diagram': 'MultiheadDiagram',
  'residual-stream-highway': 'ResidualStreamHighway',
  'attention-vs-mlp': 'AttentionVsMlp',
  'hidden-states-to-logits': 'HiddenStatesToLogits',
  'sampling-controls': 'SamplingControls',
  'gpt2-layer-by-layer-xray': 'Gpt2LayerXray',
  'prediction-evolution-we-the-people': 'PredictionEvolution',
  'why-transformers-work-so-well': 'WhyTransformersWork',
  'road-to-mini-transformer': 'RoadToMiniTransformer',

  // neural networks
  'neuron-architecture-animated': 'NeuronArchitectureAnimated',
  'activation-functions-comparator': 'ActivationFunctionsComparator',
  'sigmoid-deep-dive-explorer': 'SigmoidDeepDiveExplorer',
  'sigmoid-derivative-explorer': 'SigmoidDerivativeExplorer',
  'feedforward-flow-visual': 'FeedforwardFlowVisual',
  'backprop-signal-flow': 'BackpropSignalFlow',
  'neural-network-step-debugger': 'NeuralNetworkStepDebugger',
  'neural-network-tabs-stepper': 'NeuralNetworkTabsStepper',
  'architecture-comparator': 'ArchitectureComparatorVisual',
  'tensor-3d-explorer': 'Tensor3DExplorer',
  'derivative-ramp-explorer': 'DerivativeRampExplorer',
  'biological-vs-computational-neuron': 'BiologicalVsComputationalNeuron',

  // python
  'python-prereq-tabs': 'PythonPrereqTabsVisual',

  // bpe tokenization
  'token-level-comparison': 'TokenLevelComparison',
  'token-granularity-slider': 'TokenGranularitySlider',
  'bpe-frequency-table': 'BPEFrequencyTable',
  'bpe-merge-stack': 'BPEMergeStack',
  'bpe-training-curve': 'BPETrainingCurve',

  // classification problem
  'classification-problem': 'ClassificationProblemVisual',

  // welcome
  'welcome-synthwave': 'WelcomeSynthwaveVisual',
};

/**
 * Creates a lazy visual adapter that dynamically loads a component by name
 * from the barrel module and passes the typed copy for the current language.
 */
function createVisualAdapter(componentName: string) {
  return React.lazy(async () => {
    const barrel = await import('../components/visuals');
    const Component = (barrel as unknown as Record<string, React.FC<{ copy: unknown }>>)[componentName];
    if (!Component) {
      throw new Error(`Visual component "${componentName}" not found in barrel export`);
    }
    return {
      default: (props: VisualRenderProps) => (
        <Component copy={(props.visual.copy as Record<string, unknown>)[props.language]} />
      ),
    };
  });
}

// Register all visuals from the declarative map
for (const [id, componentName] of Object.entries(visualMap)) {
  registerVisual(id, createVisualAdapter(componentName));
}

// Special case: python-exercise passes the `language` prop in addition to `copy`
registerVisual('python-exercise', React.lazy(async () => {
  const barrel = await import('../components/visuals');
  const { PythonExerciseVisual } = barrel;
  return {
    default: (props: VisualRenderProps) => (
      <PythonExerciseVisual
        copy={(props.visual.copy as Record<string, unknown>)[props.language] as PythonExerciseVisualCopy}
        language={props.language}
      />
    ),
  };
}));

export function getVisualComponent(id: string): React.LazyExoticComponent<VisualComponent> | undefined {
  return visualRegistry[id];
}

export function getAllVisualIds(): string[] {
  return Object.keys(visualRegistry);
}
