import type { CodeExplanation } from './base';

export interface NonlinearSolutionRingVisualCopy {
  eyebrow: string;
  title: string;
  description: string;
  tabLabels: [string, string];
  accuracyLabel: string;
  mseLabel: string;
  statusLabel: string;
  startLabel: string;
  restartLabel: string;
  boundaryLabel: string;
  innerClassLabel: string;
  outerClassLabel: string;
  statusIdleLabel: string;
  statusRunningLabel: string;
  statusCompleteLabel: string;
  outerClassDescription: string;
  innerClassDescription: string;
  boundaryDescription: string;
  codeTitle: string;
  codeDescription: string;
  code: string;
  codeExplanations?: CodeExplanation[];
  footer: string;
}

export interface NonlinearRegressionBoundaryVisualCopy {
  eyebrow: string;
  title: string;
  description: string;
  tabLabels: [string, string];
  accuracyLabel: string;
  mseLabel: string;
  statusLabel: string;
  startLabel: string;
  restartLabel: string;
  lineLabel: string;
  innerClassLabel: string;
  outerClassLabel: string;
  legendTitle: string;
  statusIdleLabel: string;
  statusRunningLabel: string;
  statusCompleteLabel: string;
  outerClassDescription: string;
  innerClassDescription: string;
  lineDescription: string;
  codeTitle: string;
  codeDescription: string;
  code: string;
  codeExplanations?: CodeExplanation[];
  footer: string;
}
