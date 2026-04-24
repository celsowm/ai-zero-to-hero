import React from 'react';
import type { Language } from '../types/slide';

export interface VisualRenderProps {
  visual: { id: string; copy: Record<Language, unknown> };
  language: Language;
}

export type VisualComponent = React.FC<VisualRenderProps>;

const visualRegistry: Record<string, React.LazyExoticComponent<VisualComponent>> = {};

function registerVisual(id: string, loader: () => Promise<{ default: VisualComponent }>) {
  visualRegistry[id] = React.lazy(loader);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VisualCopy = any;

// Auto-register all visuals using barrel paths from visuals/index.ts
registerVisual('inference-diagram', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { InferenceDiagram } = m;
    return <InferenceDiagram copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('learning-loop-diagram', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { LearningLoopDiagram } = m;
    return <LearningLoopDiagram copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('localized-image', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { LocalizedImageVisual } = m;
    return <LocalizedImageVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('machine-learning-pipeline', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { MachineLearningPipelineDiagram } = m;
    return <MachineLearningPipelineDiagram copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('nonlinear-regression-boundary', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { NonlinearRegressionBoundaryVisual } = m;
    return <NonlinearRegressionBoundaryVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('nonlinear-solution-ring', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { NonlinearSolutionRingVisual } = m;
    return <NonlinearSolutionRingVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('api-latency-growth', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { ApiLatencyGrowthVisual } = m;
    return <ApiLatencyGrowthVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('linear-regression-tabs', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { LinearRegressionTabsVisual } = m;
    return <LinearRegressionTabsVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('python-prereq-tabs', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { PythonPrereqTabsVisual } = m;
    return <PythonPrereqTabsVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('python-exercise', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { PythonExerciseVisual } = m;
    return <PythonExerciseVisual copy={(props.visual.copy as VisualCopy)[props.language]} language={props.language} />;
  },
})));

registerVisual('linear-regression-simple-line', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { LinearRegressionSimpleLineVisual } = m;
    return <LinearRegressionSimpleLineVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('gradient-descent-3d', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { GradientDescent3DVisual } = m;
    return <GradientDescent3DVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('linear-regression-notation', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { LinearRegressionNotationVisual } = m;
    return <LinearRegressionNotationVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('linear-regression-3d-chart', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { LinearRegression3DChartVisual } = m;
    return <LinearRegression3DChartVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('progress-stepper', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { ProgressStepperVisual } = m;
    return <ProgressStepperVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('language-modeling-diagram', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { LanguageModelingDiagram } = m;
    return <LanguageModelingDiagram copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('next-token-interactive', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { NextTokenInteractive } = m;
    return <NextTokenInteractive copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('token-size-comparison', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { TokenSizeComparison } = m;
    return <TokenSizeComparison copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('tokenization-visualizer', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { TokenizationVisualizer } = m;
    return <TokenizationVisualizer copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('bigram-counter', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { BigramCounter } = m;
    return <BigramCounter copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('softmax-visualizer', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { SoftmaxVisualizer } = m;
    return <SoftmaxVisualizer copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('sampling-roulette', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { SamplingRoulette } = m;
    return <SamplingRoulette copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('cross-entropy-chart', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { CrossEntropyChart } = m;
    return <CrossEntropyChart copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('embedding-space-3d', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { EmbeddingSpace3D } = m;
    return <EmbeddingSpace3D copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('context-window-slider', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { ContextWindowSlider } = m;
    return <ContextWindowSlider copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('mlp-text-diagram', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { MlpTextDiagram } = m;
    return <MlpTextDiagram copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('training-loop-stepper', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { TrainingLoopStepper } = m;
    return <TrainingLoopStepper copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('neural-network-to-language-modeling-comparator', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { NeuralNetworkToLanguageModelingComparator } = m;
    return <NeuralNetworkToLanguageModelingComparator copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('gpt2-blackbox-diagram', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { Gpt2BlackboxDiagram } = m;
    return <Gpt2BlackboxDiagram copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('transformer-overview-teaser', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { TransformerOverviewTeaser } = m;
    return <TransformerOverviewTeaser copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('parallel-prediction-diagram', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { ParallelPredictionDiagram } = m;
    return <ParallelPredictionDiagram copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('positional-embedding-adder', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { PositionalEmbeddingAdder } = m;
    return <PositionalEmbeddingAdder copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('transformer-block-diagram', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { TransformerBlockDiagram } = m;
    return <TransformerBlockDiagram copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('causal-mask-matrix', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { CausalMaskMatrix } = m;
    return <CausalMaskMatrix copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('qkv-cocktail-party', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { QkvCocktailParty } = m;
    return <QkvCocktailParty copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('attention-lines-diagram', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { AttentionLinesDiagram } = m;
    return <AttentionLinesDiagram copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('multihead-diagram', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { MultiheadDiagram } = m;
    return <MultiheadDiagram copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('residual-stream-highway', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { ResidualStreamHighway } = m;
    return <ResidualStreamHighway copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('attention-vs-mlp', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { AttentionVsMlp } = m;
    return <AttentionVsMlp copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('hidden-states-to-logits', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { HiddenStatesToLogits } = m;
    return <HiddenStatesToLogits copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('sampling-controls', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { SamplingControls } = m;
    return <SamplingControls copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('gpt2-layer-by-layer-xray', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { Gpt2LayerXray } = m;
    return <Gpt2LayerXray copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('prediction-evolution-we-the-people', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { PredictionEvolution } = m;
    return <PredictionEvolution copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('why-transformers-work-so-well', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { WhyTransformersWork } = m;
    return <WhyTransformersWork copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('road-to-mini-transformer', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { RoadToMiniTransformer } = m;
    return <RoadToMiniTransformer copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('welcome-synthwave', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { WelcomeSynthwaveVisual } = m;
    return <WelcomeSynthwaveVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('neuron-architecture-animated', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { NeuronArchitectureAnimated } = m;
    return <NeuronArchitectureAnimated copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('activation-functions-comparator', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { ActivationFunctionsComparator } = m;
    return <ActivationFunctionsComparator copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('sigmoid-deep-dive-explorer', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { SigmoidDeepDiveExplorer } = m;
    return <SigmoidDeepDiveExplorer copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('sigmoid-derivative-explorer', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { SigmoidDerivativeExplorer } = m;
    return <SigmoidDerivativeExplorer copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('feedforward-flow-visual', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { FeedforwardFlowVisual } = m;
    return <FeedforwardFlowVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('backprop-signal-flow', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { BackpropSignalFlow } = m;
    return <BackpropSignalFlow copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('neural-network-tabs-stepper', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { NeuralNetworkTabsStepper } = m;
    return <NeuralNetworkTabsStepper copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('architecture-comparator', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { ArchitectureComparatorVisual } = m;
    return <ArchitectureComparatorVisual copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('biological-vs-computational-neuron', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { BiologicalVsComputationalNeuron } = m;
    return <BiologicalVsComputationalNeuron copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

registerVisual('neural-network-step-debugger', () => import('../components/visuals').then(m => ({
  default: (props: VisualRenderProps) => {
    const { NeuralNetworkStepDebugger } = m;
    return <NeuralNetworkStepDebugger copy={(props.visual.copy as VisualCopy)[props.language]} />;
  },
})));

export function getVisualComponent(id: string): React.LazyExoticComponent<VisualComponent> | undefined {
  return visualRegistry[id];
}

export function getAllVisualIds(): string[] {
  return Object.keys(visualRegistry);
}
