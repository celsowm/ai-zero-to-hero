import type { BaseVisualCopy } from './base';

export interface PromptEngineeringWhyCopy extends BaseVisualCopy {
  title: string;
  badPromptLabel: string;
  goodPromptLabel: string;
  badResultLabel: string;
  goodResultLabel: string;
  qualityLabel: string;
  specificityLabel: string;
  arrowLabel: string;
}

export interface PromptStructureAnatomyCopy extends BaseVisualCopy {
  title: string;
  systemLabel: string;
  contextLabel: string;
  instructionLabel: string;
  examplesLabel: string;
  formatLabel: string;
  combinedLabel: string;
  flowArrow: string;
}

export interface ZeroShotPromptingCopy extends BaseVisualCopy {
  title: string;
  worksLabel: string;
  failsLabel: string;
  genericLabel: string;
  specificLabel: string;
  largeModelLabel: string;
  reasoningLabel: string;
  simpleLabel: string;
  nicheLabel: string;
}

export interface FewShotPromptingCopy extends BaseVisualCopy {
  title: string;
  example1Label: string;
  example2Label: string;
  example3Label: string;
  realInputLabel: string;
  outputLabel: string;
  patternLabel: string;
  arrowLabel: string;
}

export interface ManyShotPromptingCopy extends BaseVisualCopy {
  title: string;
  xLabel: string;
  yLabel: string;
  fewShotLabel: string;
  manyShotLabel: string;
  saturationLabel: string;
  improvementLabel: string;
}

export interface ChainOfThoughtCopy extends BaseVisualCopy {
  title: string;
  directLabel: string;
  cotLabel: string;
  inputLabel: string;
  reasoningLabel: string;
  outputLabel: string;
  accuracyDirectLabel: string;
  accuracyCotLabel: string;
}

export interface TreeOfThoughtsCopy extends BaseVisualCopy {
  title: string;
  rootLabel: string;
  branch1Label: string;
  branch2Label: string;
  branch3Label: string;
  voteLabel: string;
  answerLabel: string;
  evalLabel: string;
  backtrackLabel: string;
}

export interface PromptChainingPatternsCopy extends BaseVisualCopy {
  title: string;
  step1Label: string;
  step2Label: string;
  step3Label: string;
  step4Label: string;
  arrowLabel: string;
  inputLabel: string;
  outputLabel: string;
  validationLabel: string;
}

export interface RealDatasetsPromptsCopy extends BaseVisualCopy {
  title: string;
  alpacaLabel: string;
  dollyLabel: string;
  openorcaLabel: string;
  categoriesLabel: string;
  humanLabel: string;
  syntheticLabel: string;
  structureLabel: string;
}
