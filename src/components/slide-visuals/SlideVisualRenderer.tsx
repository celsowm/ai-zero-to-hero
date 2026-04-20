import React from 'react';
import type { Language, SlideVisual } from '../../types/slide';
import {
  InferenceDiagram,
  GradientDescent3DVisual,
  LinearRegression3DChartVisual,
  LinearRegressionNotationVisual,
  LinearRegressionTabsVisual,
  ApiLatencyGrowthVisual,
  NonlinearRegressionBoundaryVisual,
  LearningLoopDiagram,
  LocalizedImageVisual,
  MachineLearningPipelineDiagram,
  ProgressStepperVisual,
  LanguageModelingDiagram,
  NextTokenInteractive,
  TokenSizeComparison,
  TokenizationVisualizer,
  BigramCounter,
  SoftmaxVisualizer,
  SamplingRoulette,
  CrossEntropyChart,
  EmbeddingSpace3D,
  ContextWindowSlider,
  MlpTextDiagram,
  TrainingLoopStepper,
  Gpt2BlackboxDiagram,
  ParallelPredictionDiagram,
  PositionalEmbeddingAdder,
  TransformerBlockDiagram,
  CausalMaskMatrix,
  QkvCocktailParty,
  AttentionLinesDiagram,
  MultiheadDiagram,
  ResidualStreamHighway,
  AttentionVsMlp,
  HiddenStatesToLogits,
  SamplingControls,
  Gpt2LayerXray,
  PredictionEvolution,
  WhyTransformersWork,
  RoadToMiniTransformer,
} from '../visuals';

interface SlideVisualRendererProps {
  visual: SlideVisual;
  language: Language;
}

export const SlideVisualRenderer: React.FC<SlideVisualRendererProps> = ({ visual, language }) => {
  switch (visual.id) {
    case 'inference-diagram':
      return <InferenceDiagram copy={visual.copy[language]} />;
    case 'learning-loop-diagram':
      return <LearningLoopDiagram copy={visual.copy[language]} />;
    case 'localized-image':
      return <LocalizedImageVisual copy={visual.copy[language]} />;
    case 'machine-learning-pipeline':
      return <MachineLearningPipelineDiagram copy={visual.copy[language]} />;
    case 'nonlinear-regression-boundary':
      return <NonlinearRegressionBoundaryVisual copy={visual.copy[language]} />;
    case 'api-latency-growth':
      return <ApiLatencyGrowthVisual copy={visual.copy[language]} />;
    case 'linear-regression-tabs':
      return <LinearRegressionTabsVisual copy={visual.copy[language]} />;
    case 'gradient-descent-3d':
      return <GradientDescent3DVisual copy={visual.copy[language]} />;
    case 'linear-regression-3d-chart':
      return <LinearRegression3DChartVisual copy={visual.copy[language]} />;
    case 'linear-regression-notation':
      return <LinearRegressionNotationVisual copy={visual.copy[language]} />;
    case 'progress-stepper':
      return <ProgressStepperVisual copy={visual.copy[language]} />;
    case 'language-modeling-diagram':
      return <LanguageModelingDiagram copy={visual.copy[language]} />;
    case 'next-token-interactive':
      return <NextTokenInteractive copy={visual.copy[language]} />;
    case 'token-size-comparison':
      return <TokenSizeComparison copy={visual.copy[language]} />;
    case 'tokenization-visualizer':
      return <TokenizationVisualizer copy={visual.copy[language]} />;
    case 'bigram-counter':
      return <BigramCounter copy={visual.copy[language]} />;
    case 'softmax-visualizer':
      return <SoftmaxVisualizer copy={visual.copy[language]} />;
    case 'sampling-roulette':
      return <SamplingRoulette copy={visual.copy[language]} />;
    case 'cross-entropy-chart':
      return <CrossEntropyChart copy={visual.copy[language]} />;
    case 'embedding-space-3d':
      return <EmbeddingSpace3D copy={visual.copy[language]} />;
    case 'context-window-slider':
      return <ContextWindowSlider copy={visual.copy[language]} />;
    case 'mlp-text-diagram':
      return <MlpTextDiagram copy={visual.copy[language]} />;
    case 'training-loop-stepper':
      return <TrainingLoopStepper copy={visual.copy[language]} />;
    case 'gpt2-blackbox-diagram':
      return <Gpt2BlackboxDiagram copy={visual.copy[language]} />;
    case 'parallel-prediction-diagram':
      return <ParallelPredictionDiagram copy={visual.copy[language]} />;
    case 'positional-embedding-adder':
      return <PositionalEmbeddingAdder copy={visual.copy[language]} />;
    case 'transformer-block-diagram':
      return <TransformerBlockDiagram copy={visual.copy[language]} />;
    case 'causal-mask-matrix':
      return <CausalMaskMatrix copy={visual.copy[language]} />;
    case 'qkv-cocktail-party':
      return <QkvCocktailParty copy={visual.copy[language]} />;
    case 'attention-lines-diagram':
      return <AttentionLinesDiagram copy={visual.copy[language]} />;
    case 'multihead-diagram':
      return <MultiheadDiagram copy={visual.copy[language]} />;
    case 'residual-stream-highway':
      return <ResidualStreamHighway copy={visual.copy[language]} />;
    case 'attention-vs-mlp':
      return <AttentionVsMlp copy={visual.copy[language]} />;
    case 'hidden-states-to-logits':
      return <HiddenStatesToLogits copy={visual.copy[language]} />;
    case 'sampling-controls':
      return <SamplingControls copy={visual.copy[language]} />;
    case 'gpt2-layer-by-layer-xray':
      return <Gpt2LayerXray copy={visual.copy[language]} />;
    case 'prediction-evolution-we-the-people':
      return <PredictionEvolution copy={visual.copy[language]} />;
    case 'why-transformers-work-so-well':
      return <WhyTransformersWork copy={visual.copy[language]} />;
    case 'road-to-mini-transformer':
      return <RoadToMiniTransformer copy={visual.copy[language]} />;
    default:
      return null;
  }
};
