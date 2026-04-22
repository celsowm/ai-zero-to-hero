import type { CodeExplanation, CodeSourceRef } from './base';

export interface PythonPrereqTabCopy {
  label: string;
}

export interface PythonPrereqCodePanelCopy {
  title: string;
  description: string;
  code?: string;
  source?: CodeSourceRef;
  codeExplanations?: CodeExplanation[];
}

export interface PythonPrereqDataPointCopy {
  label: string;
  height: number;
  age: number;
  weight: number;
  accent: string;
}

export interface PythonPrereqDataGraphCopy {
  type: 'data';
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  highlightLabel: string;
  detailLabels: {
    height: string;
    age: string;
    weight: string;
  };
  dataset: PythonPrereqDataPointCopy[];
}

export interface PythonPrereqFunctionGraphCopy {
  type: 'functions';
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  heightLabel: string;
  ageLabel: string;
  predictionLabel: string;
  formulaLabel: string;
  heightRange: [number, number];
  ageRange: [number, number];
  initialHeight: number;
  initialAge: number;
  coefficients: {
    beta0: number;
    beta1: number;
    beta2: number;
  };
}

export interface PythonPrereqLoopSampleCopy {
  label: string;
  height: number;
  age: number;
  realWeight: number;
}

export interface PythonPrereqLoopGraphCopy {
  type: 'loops';
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  stepLabel: string;
  processedLabel: string;
  totalErrorLabel: string;
  averageErrorLabel: string;
  dataset: PythonPrereqLoopSampleCopy[];
  coefficients: {
    beta0: number;
    beta1: number;
    beta2: number;
  };
}

export type PythonPrereqGraphCopy = PythonPrereqDataGraphCopy | PythonPrereqFunctionGraphCopy | PythonPrereqLoopGraphCopy;

export interface PythonPrereqTabsVisualCopy {
  tabs: [PythonPrereqTabCopy, PythonPrereqTabCopy];
  codePanel: PythonPrereqCodePanelCopy;
  graphPanel: PythonPrereqGraphCopy;
  footer: string;
}
