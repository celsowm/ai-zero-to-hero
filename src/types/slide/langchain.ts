import type { BaseVisualCopy } from './base';

export interface LangchainWhyCopy extends BaseVisualCopy {
  beforeLabel: string;
  afterLabel: string;
  pain1: string;
  pain2: string;
  pain3: string;
  solution1: string;
  solution2: string;
  solution3: string;
}

export interface LangchainCoreConceptsCopy extends BaseVisualCopy {
  modelLabel: string;
  promptLabel: string;
  parserLabel: string;
  outputLabel: string;
  flowArrow: string;
  conceptModel: string;
  conceptPrompt: string;
  conceptParser: string;
  conceptOutput: string;
}

export interface LangchainPromptTemplatesCopy extends BaseVisualCopy {
  simpleLabel: string;
  chatLabel: string;
  fewShotLabel: string;
  simpleDesc: string;
  chatDesc: string;
  fewShotDesc: string;
  templateLabel: string;
  inputLabel: string;
  resultLabel: string;
}

export interface LangchainChainsCopy extends BaseVisualCopy {
  lcelLabel: string;
  composeLabel: string;
  simpleDesc: string;
  composeDesc: string;
  pipeSymbol: string;
  runLabel: string;
  inputLabel: string;
  outputLabel: string;
}

export interface LangchainToolsCopy extends BaseVisualCopy {
  searchLabel: string;
  calcLabel: string;
  customLabel: string;
  searchDesc: string;
  calcDesc: string;
  customDesc: string;
  toolLabel: string;
  inputLabel: string;
  outputLabel: string;
}

export interface LangchainAgentsDeepDiveCopy extends BaseVisualCopy {
  reactLabel: string;
  toolSelectionLabel: string;
  parseLabel: string;
  thoughtLabel: string;
  actionLabel: string;
  observationLabel: string;
  finalAnswerLabel: string;
}

export interface LangchainRagLangchainCopy extends BaseVisualCopy {
  loadLabel: string;
  splitLabel: string;
  storeLabel: string;
  retrieveLabel: string;
  answerLabel: string;
  documentLabel: string;
  chunkLabel: string;
  vectorstoreLabel: string;
  retrieverLabel: string;
  qaChainLabel: string;
}

export interface LangchainMemoryCopy extends BaseVisualCopy {
  bufferLabel: string;
  summaryLabel: string;
  vectorLabel: string;
  bufferDesc: string;
  summaryDesc: string;
  vectorDesc: string;
  historyLabel: string;
  tokenCountLabel: string;
}

export interface LangchainE2eCopy extends BaseVisualCopy {
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
