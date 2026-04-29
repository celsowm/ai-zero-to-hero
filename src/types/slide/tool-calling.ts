import type { BaseVisualCopy } from './base';

export interface ToolCallingWhyCopy extends BaseVisualCopy {
  beforeLabel: string;
  afterLabel: string;
  limitLabel: string;
  powerLabel: string;
  limitDesc: string;
  powerDesc: string;
}

export interface ToolCallingConceptsCopy extends BaseVisualCopy {
  titleLabel: string;
  modelLabel: string;
  toolLabel: string;
  runtimeLabel: string;
  requestLabel: string;
  decisionLabel: string;
  executionLabel: string;
  responseLabel: string;
  step1Label: string;
  step1Desc: string;
  step2Label: string;
  step2Desc: string;
  step3Label: string;
  step3Desc: string;
  step4Label: string;
  step4Desc: string;
}

export interface ToolDeclarationCopy extends BaseVisualCopy {
  titleLabel: string;
  nameField: string;
  descField: string;
  paramsField: string;
  typeField: string;
  propertiesField: string;
  requiredField: string;
  exampleLabel: string;
  jsonSchemaLabel: string;
}

export interface ToolCallingFlowCopy extends BaseVisualCopy {
  titleLabel: string;
  userLabel: string;
  modelLabel: string;
  toolLabel: string;
  resultLabel: string;
  finalAnswerLabel: string;
  questionLabel: string;
  toolChoiceLabel: string;
  toolCallLabel: string;
  toolResultLabel: string;
}

export interface ParallelToolCallsCopy extends BaseVisualCopy {
  titleLabel: string;
  singleLabel: string;
  parallelLabel: string;
  singleDesc: string;
  parallelDesc: string;
  call1Label: string;
  call2Label: string;
  call3Label: string;
  sequentialTimeLabel: string;
  parallelTimeLabel: string;
  speedupLabel: string;
}

export interface ToolCallingErrorsCopy extends BaseVisualCopy {
  titleLabel: string;
  successLabel: string;
  errorLabel: string;
  malformedLabel: string;
  notFoundLabel: string;
  timeoutLabel: string;
  retryLabel: string;
  fallbackLabel: string;
  recoveryLabel: string;
}

export interface MultiToolOrchestrationCopy extends BaseVisualCopy {
  titleLabel: string;
  routerLabel: string;
  chainLabel: string;
  fallbackLabel: string;
  searchToolLabel: string;
  calcToolLabel: string;
  codeToolLabel: string;
  questionLabel: string;
  decisionLabel: string;
}

export interface ToolCallingBestPracticesCopy extends BaseVisualCopy {
  titleLabel: string;
  doLabel: string;
  dontLabel: string;
  tip1Label: string;
  tip1Desc: string;
  tip2Label: string;
  tip2Desc: string;
  tip3Label: string;
  tip3Desc: string;
  tip4Label: string;
  tip4Desc: string;
  pitfall1Label: string;
  pitfall2Label: string;
  pitfall3Label: string;
}

export interface ToolCallingE2eCopy extends BaseVisualCopy {
  title: string;
  step1Label: string;
  step1Desc: string;
  step2Label: string;
  step2Desc: string;
  step3Label: string;
  step3Desc: string;
  step4Label: string;
  step4Desc: string;
  step5Label: string;
  step5Desc: string;
}
