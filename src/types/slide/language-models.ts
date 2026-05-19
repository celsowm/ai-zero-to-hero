import type { CodeExplanation, CodeSourceRef } from './base';

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

export interface EmbeddingSpace3DInteractiveCopy {
  title: string;
  distanceLabel: string;
}

export interface SiliconComputeVisualCopy {
  tensorSizeLabel: string;
  compare: string;
  running: string;
  speedComparison: string;
  cpuDesc: string;
  gpuDesc: string;
  vramLabel: string;
  ramLabel: string;
  pcieLabel: string;
  insightTitle: string;
}

export interface PyTorchPerformanceVisualCopy {
  // Comparison labels
  beforeLabel: string;
  afterLabel: string;
  // Pain points (before)
  pain1: string;
  pain2: string;
  pain3: string;
  pain4: string;
  // Solutions (after)
  solution1: string;
  solution2: string;
  solution3: string;
  solution4: string;
  // Benchmark section
  benchmarkTitle: string;
  modelSizeLabel: string;
  runBenchmark: string;
  running: string;
  pythonPureLabel: string;
  numpyLabel: string;
  pytorchCpuLabel: string;
  pytorchGpuLabel: string;
  timeUnit: string;
  // Autograd graph
  autogradTitle: string;
  dynamicGraphLabel: string;
  staticGraphLabel: string;
  forwardLabel: string;
  backwardLabel: string;
  // Insight
  insightTitle: string;
  // Real benchmark labels
  realBenchmarkTitle: string;
  runRealBenchmark: string;
  runningReal: string;
  jsPureLabel: string;
  jsTypedLabel: string;
  webgpuLabel: string;
  webgpuSupported: string;
  webgpuNotSupported: string;
  simulatedWarning: string;
  realResultTitle: string;
  speedupLabel: string;
  operationLabel: string;
  elementsLabel: string;
  tabs?: Array<{
    label: string;
    code: string;
    codeExplanations?: CodeExplanation[];
    source?: CodeSourceRef;
  }>;
  pythonLikeTitle?: string;
  webgpuShaderTitle?: string;
}

export interface ContextWindowSliderCopy {
  fullText?: string;
  windowLabel: string;
  forgottenLabel?: string;
  activeLabel?: string;
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

export interface TrainingLoopAnimationCopy {
  forwardLabel: string;
  softmaxLabel: string;
  lossLabel: string;
  backpropLabel: string;
  updateLabel: string;
  playLabel: string;
  pauseLabel: string;
  stepLabel: string;
  epochLabel: string;
  lrLabel: string;
  lossDropped: string;
  weightsUpdated: string;
  logitsText: string;
  probsText: string;
  gradientText: string;
  step0Desc: string;
  step1Desc: string;
  step2Desc: string;
  step3Desc: string;
  step4Desc: string;
  inputTokens: string[];
  vocabOptions: string[];
  correctIndex: number;
}

export interface NeuralNetworkToLanguageModelingComparatorCopy {
  eyebrowLabel: string;
  title: string;
  intro: string;
  leftTitle: string;
  leftSubtitle: string;
  rightTitle: string;
  rightSubtitle: string;
  rows: Array<{
    label: string;
    leftValue: string;
    rightValue: string;
  }>;
  coreLabel: string;
  coreValue: string;
  footer: string;
}

export interface PytorchDualPanelCopy {
  tabs: Array<{ label: string }>;
  codePanel: {
    title: string;
    description: string;
    source: CodeSourceRef;
    codeExplanations?: CodeExplanation[];
  };
  visualPanel: {
    title: string;
    subtitle?: string;
    items: Array<{
      label: string;
      value: string;
    }>;
    footer?: string;
  };
}
