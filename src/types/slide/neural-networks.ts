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

export interface NeuralNetworkTrainingDebuggerVisualCopy {
  title: string;
  subtitle: string;
  datasetLabel: string;
  archLabel: string;
  playLabel: string;
  pauseLabel: string;
  resetLabel: string;
  speedLabel: string;
  epochLabel: string;
  lossLabel: string;
  statusTraining: string;
  statusConverged: string;
  statusDone: string;
  statusPaused: string;
  convergenceThreshold: number;
  totalEpochs: number;
  learningRate: number;
  dataset: Array<{ inputs: number[]; target: number }>;
  initialWeights: {
    w1: number[];
    w2: number[];
    b1: number;
    b2: number;
    v1: number;
    v2: number;
    c: number;
  };
  inputSectionLabel: string;
  hiddenSectionLabel: string;
  outputSectionLabel: string;
  metricsSectionLabel: string;
  featureNames: string[];
}

export interface NeuralNetworkStepDebuggerVisualCopy {
  title: string;
  subtitle: string;
  featureNames: string[];
  learningRate: number;
  initialWeights: {
    w1: number[];
    w2: number[];
    b1: number;
    b2: number;
    v1: number;
    v2: number;
    c: number;
  };
  labels: {
    inputLayer: string;
    hiddenLayer: string;
    outputLayer: string;
    codeTitle: string;
  };
  pythonCode: string;
  codeHighlightRanges: Record<string, [number, number]>;
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
