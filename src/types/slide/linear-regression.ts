export interface LinearRegressionTabCopy {
  label: string;
}

export interface LinearRegressionFormulaPointCopy {
  label: string;
  accent: string;
}

export interface LinearRegressionFormulaPanelCopy {
  eyebrow: string;
  formula: string;
  description: string;
  points: LinearRegressionFormulaPointCopy[];
  footer: string;
}

export interface LinearRegressionGraphNodeCopy {
  label: string;
  accent: string;
}

export interface LinearRegressionChartPointCopy {
  x: number;
  y: number;
  label: string;
  accent: string;
}

export interface LinearRegressionChartResidualCopy {
  x: number;
  yReal: number;
  yPred: number;
  label: string;
  accent: string;
}

export interface LinearRegressionChartCopy {
  xLabel: string;
  yLabel: string;
  lineLabel: string;
  points: LinearRegressionChartPointCopy[];
  residuals?: LinearRegressionChartResidualCopy[];
  lineStart: { x: number; y: number };
  lineEnd: { x: number; y: number };
  footer: string;
}

export interface LinearRegressionGraphPanelCopy {
  eyebrow: string;
  title: string;
  description: string;
  inputNodes: LinearRegressionGraphNodeCopy[];
  outputLabel: string;
  outputNode: LinearRegressionGraphNodeCopy;
  chart?: LinearRegressionChartCopy;
  footer: string;
}

export interface LinearRegressionTabsCopy {
  tabs: [LinearRegressionTabCopy, LinearRegressionTabCopy];
  formulaPanel: LinearRegressionFormulaPanelCopy;
  graphPanel: LinearRegressionGraphPanelCopy;
}

export interface GradientDescentVisualCopy {
  diagramTitle: string;
  diagramDescription: string;
  surfaceLabel: string;
  gradientLabel: string;
  learningRateLabel: string;
  minimumLabel: string;
  pathLabel: string;
  startLabel: string;
  footerLabel: string;
}

export interface LinearRegressionNotationLegendItemCopy {
  symbol: string;
  label: string;
  description: string;
  accent: string;
}

export interface LinearRegressionNotationVisualCopy {
  eyebrow: string;
  title: string;
  description: string;
  formula: string;
  legendTitle: string;
  legend: LinearRegressionNotationLegendItemCopy[];
  comparisonTitle: string;
  comparisonFormula: string;
  comparisonDescription: string;
  footer: string;
}

export interface LinearRegression3DPointCopy {
  height: number;
  age: number;
  realWeight: number;
  label: string;
  accent: string;
}

export interface LinearRegression2DChartCopy {
  eyebrow: string;
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  lineLabel: string;
  dataset: LinearRegression3DPointCopy[];
  lineStart: { x: number; y: number };
  lineEnd: { x: number; y: number };
  symbolGuideTitle: string;
  symbolGuide: LinearRegressionNotationLegendItemCopy[];
  footer: string;
}

export interface LinearRegression3DChartVisualCopy {
  tabs?: [LinearRegressionTabCopy, LinearRegressionTabCopy];
  eyebrow: string;
  title: string;
  description: string;
  axisLabels: {
    x: string;
    y: string;
    z: string;
  };
  dataset: LinearRegression3DPointCopy[];
  coefficients: {
    beta0: number;
    beta1: number;
    beta2: number;
    formula: string;
  };
  realLabel: string;
  predictedLabel: string;
  planeLabel: string;
  symbolGuideTitle: string;
  symbolGuide: LinearRegressionNotationLegendItemCopy[];
  footer: string;
  comparisonChart?: LinearRegression2DChartCopy;
}

export interface ProgressStepperStepCopy {
  label: string;
  title: string;
  description: string;
  formula: string;
  accent: string;
  highlightedRowIndexes?: number[];
}

export interface ProgressStepperTableRowCopy {
  height: string;
  age: string;
  beta0?: string;
  beta1?: string;
  beta2?: string;
  realWeight: string;
  predictedWeight?: string;
  error?: string;
  squaredError?: string;
}

export interface ProgressStepperTableCopy {
  title: string;
  headers: {
    height: string;
    age: string;
    beta0?: string;
    beta1?: string;
    beta2?: string;
    realWeight: string;
    predictedWeight: string;
    error: string;
    squaredError: string;
  };
  rows: ProgressStepperTableRowCopy[];
}

export interface ProgressStepperVisualCopy {
  eyebrow: string;
  title: string;
  description: string;
  progressLabel: string;
  previousLabel: string;
  nextLabel: string;
  completionLabel: string;
  completionDescription: string;
  footer: string;
  table?: ProgressStepperTableCopy;
  steps: ProgressStepperStepCopy[];
}

export interface LinearRegressionSimpleLineDataPointCopy {
  height: number;
  age: number;
  realWeight: number;
  accent: string;
  label: string;
}

export interface LinearRegressionSimpleLineCopy {
  eyebrow: string;
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  lineLabel: string;
  ageLabel: string;
  footer: string;
  coefficients: {
    beta0: number;
    beta1: number;
    beta2: number;
  };
  dataset: LinearRegressionSimpleLineDataPointCopy[];
}
