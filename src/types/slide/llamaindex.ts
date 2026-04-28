// ── LlamaIndex Section ─────────────────────────────────────────────────────

export interface LlamaIndexWhyCopy {
  title: string;
  beforeLabel: string;
  afterLabel: string;
  pain1: string;
  pain2: string;
  pain3: string;
  solution1: string;
  solution2: string;
  solution3: string;
}

export interface LlamaIndexCoreConceptsCopy {
  title: string;
  documentLabel: string;
  indexLabel: string;
  retrieverLabel: string;
  queryEngineLabel: string;
  chatEngineLabel: string;
  answerLabel: string;
  flowArrow: string;
  conceptDoc: string;
  conceptIndex: string;
  conceptRetriever: string;
  conceptQuery: string;
  conceptChat: string;
}

export interface LlamaIndexDataLoadersCopy {
  title: string;
  directoryLabel: string;
  webLabel: string;
  databaseLabel: string;
  codeLabel: string;
  filesLabel: string;
  nodesLabel: string;
  loaderCount: string;
}

export interface LlamaIndexPipelineVisualCopy {
  title: string;
  ingestPhase: string;
  queryPhase: string;
  documentsLabel: string;
  chunkLabel: string;
  embedLabel: string;
  indexLabel: string;
  questionLabel: string;
  retrieveLabel: string;
  contextLabel: string;
  llmLabel: string;
  answerLabel: string;
}

export interface LlamaIndexRetrieversCopy {
  title: string;
  vectorLabel: string;
  bm25Label: string;
  routerLabel: string;
  semanticDesc: string;
  keywordDesc: string;
  autoSelectDesc: string;
  scoreLabel: string;
  topKLabel: string;
}

export interface LlamaIndexQueryEnginesCopy {
  title: string;
  basicLabel: string;
  subQuestionLabel: string;
  routingLabel: string;
  basicDesc: string;
  subQuestionDesc: string;
  routingDesc: string;
  queryLabel: string;
  answerLabel: string;
}

export interface LlamaIndexChatEngineCopy {
  title: string;
  queryEngineLabel: string;
  chatEngineLabel: string;
  oneShot: string;
  multiTurn: string;
  condenseQuestion: string;
  contextLabel: string;
  memoryLabel: string;
  historyLabel: string;
}

export interface LlamaIndexAgentsCopy {
  title: string;
  reActLabel: string;
  functionCallingLabel: string;
  toolLabel: string;
  thoughtLabel: string;
  actionLabel: string;
  observationLabel: string;
  answerLabel: string;
  reActDesc: string;
  fcDesc: string;
}

export interface LlamaIndexE2eCopy {
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
