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
