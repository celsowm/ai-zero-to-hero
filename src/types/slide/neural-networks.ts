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

export interface NeuralNetworkTabsStepperTabCopy {
  label: string;
}

export interface NeuralNetworkTabsStepperCodePanelCopy {
  title: string;
  description: string;
  code: string;
  codeExplanations?: import('./base').CodeExplanation[];
}

export interface NeuralNetworkTabsStepperValueCopy {
  label: string;
  value: string;
}

export interface NeuralNetworkTabsStepperMetricCopy {
  label: string;
  value: string;
}

export interface NeuralNetworkTabsStepperStepCopy {
  label: string;
  title: string;
  description: string;
  formula: string;
  accent: string;
  activeSection: 'inputs' | 'hidden' | 'output' | 'metrics';
  inputs: NeuralNetworkTabsStepperValueCopy[];
  hidden: NeuralNetworkTabsStepperValueCopy[];
  output: NeuralNetworkTabsStepperValueCopy[];
  metrics: NeuralNetworkTabsStepperMetricCopy[];
}

export interface NeuralNetworkTabsStepperVisualCopy {
  tabs: [NeuralNetworkTabsStepperTabCopy, NeuralNetworkTabsStepperTabCopy];
  codePanel: NeuralNetworkTabsStepperCodePanelCopy;
  stepperPanel: {
    eyebrow: string;
    title: string;
    description: string;
    inputSectionLabel: string;
    hiddenSectionLabel: string;
    outputSectionLabel: string;
    metricsSectionLabel: string;
    previousLabel: string;
    nextLabel: string;
    completionLabel: string;
    completionDescription: string;
    steps: NeuralNetworkTabsStepperStepCopy[];
  };
  footer: string;
}

export interface NeuralNetworkTrainingDebuggerVisualCopy {
  title: string;
  subtitle: string;
  inputSectionLabel: string;
  hiddenSectionLabel: string;
  outputSectionLabel: string;
  metricsSectionLabel: string;
  iterationLabel: string;
  previousLabel: string;
  nextLabel: string;
  completionLabel: string;
  completionDescription: string;
  steps: NeuralNetworkTabsStepperStepCopy[];
  footer: string;
}
