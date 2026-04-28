import type { BaseVisualCopy } from './base';

export interface InferenceEnginesWhyCopy extends BaseVisualCopy {
  beforeLabel: string;
  afterLabel: string;
  pain1: string;
  pain2: string;
  pain3: string;
  solution1: string;
  solution2: string;
  solution3: string;
}

export interface TransformersPipelineCopy extends BaseVisualCopy {
  inputLabel: string;
  tokenizerLabel: string;
  modelLabel: string;
  detokenizerLabel: string;
  outputLabel: string;
  flowArrow: string;
  tokensLabel: string;
  logitsLabel: string;
}

export interface TransformersServerCopy extends BaseVisualCopy {
  clientLabel: string;
  serverLabel: string;
  modelLabel: string;
  endpointLabel: string;
  responseLabel: string;
}

export interface OpenaiApiStandardCopy extends BaseVisualCopy {
  titleLabel: string;
  requestLabel: string;
  responseLabel: string;
  modelField: string;
  messagesField: string;
  temperatureField: string;
  maxTokensField: string;
  streamField: string;
  toolsField: string;
  responseFormatField: string;
  choicesField: string;
  contentField: string;
  usageField: string;
  promptTokensLabel: string;
  completionTokensLabel: string;
  totalTokensLabel: string;
}

export interface StreamingModeCopy extends BaseVisualCopy {
  titleLabel: string;
  blockingLabel: string;
  streamingLabel: string;
  blockingDesc: string;
  streamingDesc: string;
  sseLabel: string;
  tokenLabel: string;
  progressLabel: string;
  doneLabel: string;
  codeLabel: string;
}

export interface OnnxOptimizationCopy extends BaseVisualCopy {
  fp32Label: string;
  fp16Label: string;
  int8Label: string;
  int4Label: string;
  fp32Desc: string;
  fp16Desc: string;
  int8Desc: string;
  int4Desc: string;
  speedupLabel: string;
  vramLabel: string;
  exportLabel: string;
}

export interface VllmIntroCopy extends BaseVisualCopy {
  titleLabel: string;
  contiguousLabel: string;
  pagedLabel: string;
  contiguousDesc: string;
  pagedDesc: string;
  wasteLabel: string;
  efficiencyLabel: string;
}

export interface VllmDeepDiveCopy extends BaseVisualCopy {
  titleLabel: string;
  staticLabel: string;
  continuousLabel: string;
  staticDesc: string;
  continuousDesc: string;
  requestLabel: string;
  waitingLabel: string;
  processingLabel: string;
  doneLabel: string;
  timelineLabel: string;
}

export interface SglangIntroCopy extends BaseVisualCopy {
  titleLabel: string;
  treeLabel: string;
  sharedLabel: string;
  uniqueLabel: string;
  speedupLabel: string;
  cacheHitLabel: string;
  cacheMissLabel: string;
}

export interface SglangDeepDiveCopy extends BaseVisualCopy {
  titleLabel: string;
  generateLabel: string;
  validateLabel: string;
  acceptLabel: string;
  rejectLabel: string;
  tokenLabel: string;
  regexLabel: string;
  schemaLabel: string;
  outputLabel: string;
}

export interface InferenceComparisonCopy extends BaseVisualCopy {
  titleLabel: string;
  engineLabel: string;
  throughputLabel: string;
  latencyLabel: string;
  setupLabel: string;
  hardwareLabel: string;
  useCaseLabel: string;
}

export interface InferenceE2eCopy extends BaseVisualCopy {
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
