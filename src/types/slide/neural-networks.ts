export interface BiologicalVsComputationalNeuronCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  biologyTag: string;
  biologyTitle: string;
  computationTag: string;
  computationTitle: string;
  biologicalLabels: {
    dendrites: string;
    soma: string;
    cellBody: string;
    nucleus: string;
    axon: string;
    myelinLine1: string;
    myelinLine2: string;
    synapse: string;
    synapseGap: string;
    terminalsLine1: string;
    terminalsLine2: string;
  };
  computationalLabels: {
    inputs: string;
    synapses: string;
    weightedSumBias: string;
    activationLine1: string;
    activationLine2: string;
    axon: string;
  };
  biologyTable: {
    headers: [string, string, string];
    rows: Array<[string, string, string]>;
  };
  computationTable: {
    headers: [string, string, string];
    rows: Array<[string, string, string]>;
  };
  formulaLegend: {
    title: string;
    items: Array<{ symbol: string; title: string; body: string }>;
    domainBadge: string;
    domainFormula: string;
    domainBody: string;
  };
  footerNote: string;
}

export interface NeuronArchitectureAnimatedLegendItemCopy {
  symbol: string;
  title: string;
  desc: string;
  color: string;
}

export interface NeuronArchitectureAnimatedCopy {
  ariaLabel: string;
  title: string;
  subtitle: string;
  inputs: string;
  weights: string;
  examples: string;
  bias: string;
  biasNote: string;
  weightedSum: string;
  activation: string;
  outputAfterActivation: [string, string, string] | [string, string];
  outputFinal: string;
  centerNote: string;
  legendTitle: string;
  legend: NeuronArchitectureAnimatedLegendItemCopy[];
}

export interface ActivationFunctionDescriptorCopy {
  label: string;
  formula: string;
  headline: string;
  body: string;
  behavior: string;
  gradientNote: string;
  outputRange: string;
  example: string;
}

export interface ActivationFunctionsComparatorCopy {
  ariaLabel: string;
  tabsAriaLabel: string;
  sliderLabel: string;
  inputLabel: string;
  outputLabel: string;
  chartTitle: string;
  infoTitle: string;
  takeawayTitle: string;
  takeawayBody: string;
  comparisonNote: string;
  functions: {
    linear: ActivationFunctionDescriptorCopy;
    relu: ActivationFunctionDescriptorCopy;
    sigmoid: ActivationFunctionDescriptorCopy;
  };
}

export interface SigmoidDerivativeExplorerCopy {
  ariaLabel: string;
  sliderLabel: string;
  sigmoidChartTitle: string;
  derivativeChartTitle: string;
  inputLabel: string;
  sigmoidLabel: string;
  derivativeLabel: string;
  formulaTitle: string;
  formula: string;
  derivativeFormula: string;
  peakTitle: string;
  peakBody: string;
  saturationTitle: string;
  saturationBody: string;
  trainingTitle: string;
  trainingBody: string;
}

export interface NeuralNetworkVisualWeightsCopy {
  inputToHidden: number[][];
  hiddenBiases: number[];
  hiddenToOutput: number[];
  outputBias: number;
}

export interface NeuralNetworkSampleCopy {
  label: string;
  inputs: number[];
  target: number;
}

export interface FeedforwardFlowVisualCopy {
  title: string;
  subtitle: string;
  featureNames: string[];
  architectureLabel: string;
  sampleLabel: string;
  targetLabel: string;
  probabilityLabel: string;
  inputLayerLabel: string;
  hiddenLayerLabel: string;
  outputLayerLabel: string;
  outputInterpretation: string;
  sampleAriaLabel: string;
  sequenceTitle: string;
  sequenceSteps: Array<{
    label: string;
    formula: string;
    body: string;
  }>;
  activationFormula: string;
  outputFormula: string;
  samples: NeuralNetworkSampleCopy[];
  weights: NeuralNetworkVisualWeightsCopy;
}

export interface BackpropagationStepCopy {
  label: string;
  title: string;
  formula: string;
  body: string;
}

export interface BackpropSignalFlowVisualCopy {
  title: string;
  subtitle: string;
  sampleLabel: string;
  targetLabel: string;
  predictionLabel: string;
  learningRateLabel: string;
  tabsAriaLabel: string;
  lossLabel: string;
  outputDeltaLabel: string;
  hiddenDeltaLabel: string;
  updateLabel: string;
  updateRule: string;
  networkLabel: string;
  hiddenLayerLabel: string;
  outputLayerLabel: string;
  sample: NeuralNetworkSampleCopy;
  learningRate: number;
  weights: NeuralNetworkVisualWeightsCopy;
  steps: {
    loss: BackpropagationStepCopy;
    output: BackpropagationStepCopy;
    hidden: BackpropagationStepCopy;
    update: BackpropagationStepCopy;
  };
}

export interface NeuralNetworkStepDebuggerVisualCopy {
  title: string;
  subtitle: string;
  featureNames: string[];
  architecture: {
    inputSize: number;
    hiddenSize: number;
    outputSize: 1;
    hiddenActivation: 'sigmoid';
    outputActivation: 'sigmoid';
    label: string;
  };
  learningRate: number;
  initialWeights: NeuralNetworkVisualWeightsCopy;
  labels: {
    inputLayer: string;
    hiddenLayer: string;
    outputLayer: string;
    codeTitle: string;
    sampleLabel: string;
    lossLabel: string;
    predictionLabel: string;
    targetLabel: string;
    finalClassLabel: string;
    stepButton: string;
    playButton: string;
    pauseButton: string;
    resetButton: string;
    speedSample: string;
    speedEpoch: string;
    speedFast: string;
    lossHistoryTitle: string;
    phaseTitle: string;
  };
  pythonCode: string;
  codeHighlightRanges: Record<'init' | 'forward' | 'backprop' | 'update', [number, number]>;
  dataset: Array<{ inputs: number[]; target: number }>;
  totalEpochs: number;
  convergenceThreshold: number;
  trainingLabels: {
    epochLabel: string;
    mseLabel: string;
    accuracyLabel: string;
    archLabel: string;
    convergenceLabel: string;
  };
  phaseExplanations: Record<'init' | 'forward' | 'backprop' | 'update', string>;
  tooltips: {
    input: string;
    hidden: string;
    output: string;
    weight: string;
  };
}
