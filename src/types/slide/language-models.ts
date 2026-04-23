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
