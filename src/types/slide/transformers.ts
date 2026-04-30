export interface Gpt2BlackboxDiagramCopy {
  inputLabel: string;
  modelLabel: string;
  outputLabel: string;
}

export interface TransformerOverviewTeaserCopy {
  interactiveTitle: string;
  interactiveHint: string;
  decodingStepLabel: string;
  sourceLabel: string;
  targetLabel: string;
  memoryLabel: string;
  outputLabel: string;
  inputLabel: string;
  previousOutputsLabel: string;
  embeddingsLabel: string;
  positionLabel: string;
  encoderLabel: string;
  decoderLabel: string;
  linearLabel: string;
  keyLabel: string;
  valueLabel: string;
  keyHintLabel: string;
  valueHintLabel: string;
  nextTokenLabel: string;
  step1Title: string;
  step1Description: string;
  step2Title: string;
  step2Description: string;
  step3Title: string;
  step3Description: string;
  step4Title: string;
  step4Description: string;
  step5Title: string;
  step5Description: string;
  step6Title: string;
  step6Description: string;
  sourceSentence: string;
  targetSentence: string;
}

export interface ParallelPredictionDiagramCopy {
  text: string;
  parallelLabel: string;
  prediction1: string;
  prediction2: string;
  prediction3: string;
}

export interface PositionalEmbeddingAdderCopy {
  tokenLabel: string;
  positionLabel: string;
  sumLabel: string;
  plusSign: string;
  equalsSign: string;
  tokenVector: string;
  posVector: string;
  resultVector: string;
}

export interface TransformerBlockDiagramCopy {
  attentionLabel: string;
  mlpLabel: string;
  inputLabel: string;
  outputLabel: string;
}

export interface CausalMaskMatrixCopy {
  allowedLabel: string;
  maskedLabel: string;
  rowLabel: string;
  colLabel: string;
}

export interface QkvCocktailPartyCopy {
  queryLabel: string;
  keyLabel: string;
  valueLabel: string;
}

export interface QkvIntuitionExplorerCopy {
  title: string;
  tabs: {
    intuition: {
      label: string;
      title: string;
      description: string;
      analogyTitle: string;
      analogyText: string;
    };
    mechanics: {
      label: string;
      title: string;
      description: string;
      dotProductLabel: string;
      scalingLabel: string;
    };
    retrieval: {
      label: string;
      title: string;
      description: string;
      databaseAnalogyTitle: string;
      databaseAnalogyText: string;
    };
  };
  queryLabel: string;
  keyLabel: string;
  valueLabel: string;
  matchScoreLabel: string;
  resultLabel: string;
}

export interface AttentionLinesDiagramCopy {
  token1: string;
  token2: string;
  token3: string;
  strongConnection: string;
  weakConnection: string;
}

export interface AttentionWeightExplorerCopy {
  title: string;
  subtitle: string;
  clickHint: string;
  queryLabel: string;
  keyLabel: string;
  attentionWeightLabel: string;
  contextMeaningLabel: string;
  beforeLabel: string;
  afterLabel: string;
  sentenceTokens: string[];
  attentionMatrix: number[][];
  meaningBefore: string[];
  meaningAfter: string[];
  insightTitle: string;
  insights: string[];
}

export interface MultiheadDiagramCopy {
  head1Label: string;
  head2Label: string;
  head3Label: string;
  combineLabel: string;
}

export interface ResidualStreamHighwayCopy {
  highwayLabel: string;
  blockLabel: string;
  addLabel: string;
}

export interface AttentionVsMlpCopy {
  attentionDesc: string;
  mlpDesc: string;
}

export interface HiddenStatesToLogitsCopy {
  hiddenStateLabel: string;
  unembedLabel: string;
  logitsLabel: string;
}

export interface SamplingControlsCopy {
  tempLabel: string;
  topKLabel: string;
  lowTempDesc: string;
  highTempDesc: string;
}

export interface Gpt2LayerXrayCopy {
  layerLabel: string;
  inputLabel: string;
  outputLabel: string;
}

export interface PredictionEvolutionCopy {
  step1: string;
  step2: string;
  step3: string;
}

export interface WhyTransformersWorkCopy {
  reason1: string;
  reason2: string;
  reason3: string;
}

export interface RoadToMiniTransformerCopy {
  startLabel: string;
  endLabel: string;
}

// ── HuggingFace Transformers Advanced Section ──────────────────────────────

export interface AutoClassResolverCopy {
  title: string;
  checkpointLabel: string;
  resolverLabel: string;
  modelResolved: string;
  tokenizerResolved: string;
  configResolved: string;
  hubLabel: string;
  hubTooltip: string;
}

export interface DataCollatorVisualizerCopy {
  title: string;
  batchLabel: string;
  sequenceLabel: string;
  paddedLabel: string;
  maxLenLabel: string;
  dynamicPadding: string;
  staticPadding: string;
  padToken: string;
}

export interface LoraDiagramCopy {
  title: string;
  fullRankLabel: string;
  lowRankLabel: string;
  matrixALabel: string;
  matrixBLabel: string;
  originalFrozen: string;
  trainableParams: string;
  savedMemory: string;
  rankLabel: string;
}

export interface QuantizationComparatorCopy {
  title: string;
  fp32Label: string;
  int8Label: string;
  nf4Label: string;
  precisionLabel: string;
  memoryLabel: string;
  qualityLabel: string;
  bitsLabel: string;
  gpuVramLabel: string;
}

// ── Quantization Interactive Visuals ───────────────────────────────────────

export interface Fp16OverflowExplorerCopy {
  title: string;
  inputLabel: string;
  fp32Label: string;
  fp16Label: string;
  safeLabel: string;
  overflowLabel: string;
  thresholdLabel: string;
  rangeLabel: string;
  valueLabel: string;
}

export interface Int8OutlierDetectorCopy {
  title: string;
  weightDistLabel: string;
  outlierLabel: string;
  normalLabel: string;
  thresholdLabel: string;
  int8Label: string;
  fp16Label: string;
  keepInFp16: string;
  quantizeToInt8: string;
}

export interface Nf4QuantileVisualizerCopy {
  title: string;
  uniformLabel: string;
  normalFloatLabel: string;
  bellCurveLabel: string;
  quantileLabel: string;
  level16Label: string;
  denseNearZero: string;
  spacedAtTails: string;
  weightsLabel: string;
  precisionLabel: string;
}

// ── Sampling Controls Interactive ──────────────────────────────────────────

export interface TemperatureSliderInteractiveCopy {
  lowTemp: string;
  highTemp: string;
}

// ── Hidden States to Logits Visual ─────────────────────────────────────────

export interface UnembeddingDiagramCopy {
  vectorLabel: string;
  vocabLabel: string;
  logitsLabel: string;
}

// ── GPT-2 Full Architecture Diagram ────────────────────────────────────────

export interface Gpt2FullArchitectureDiagramCopy {
  inputStage: string;
  blocksStage: string;
  outputStage: string;
}

// ── Layer Evolution Chart ──────────────────────────────────────────────────

export interface LayerEvolutionChartCopy {
  layerLabel: string;
  predictionLabel: string;
}

// ── Pipeline Flow Diagram ──────────────────────────────────────────────────

export interface PipelineFlowDiagramCopy {
  step1Label: string;
  step1Desc: string;
  step2Label: string;
  step2Desc: string;
  step3Label: string;
  step3Desc: string;
  step4Label: string;
  step4Desc: string;
}

// ── SFT Intro ──────────────────────────────────────────────────────────────

export interface SftIntroCopy {
  beforeLabel: string;
  arrowLabel: string;
  afterLabel: string;
  exampleText: string;
  specialSystem: string;
  specialUser: string;
  specialAssistant: string;
  specialEos: string;
  systemRole: string;
  systemContent: string;
  userRole: string;
  userContent: string;
  assistantRole: string;
  assistantContent: string;
  structureNote: string;
}

// ── Build GPT-2 Model ──────────────────────────────────────────────────────

export interface BuildGpt2ModelCopy {
  tabCode: string;
  tabDiagram: string;
  snippetId: string;
  attentionLabel: string;
  mlpLabel: string;
  residualLabel: string;
  blockLabel: string;
  inputLabel: string;
  outputLabel: string;
  blocksLabel: string;
  embedLabel: string;
  normLabel: string;
}

// ── RAG (Retrieval-Augmented Generation) ────────────────────────────────────

export interface RagMemoryLimitVisualCopy {
  title: string;
  trainingDateLabel: string;
  currentDateLabel: string;
  knowledgeGapLabel: string;
  beforeLabel: string;
  afterLabel: string;
  unknownLabel: string;
  frozenLabel: string;
}

export interface RagHallucinationVisualCopy {
  title: string;
  truthLabel: string;
  hallucinationLabel: string;
  plausibleLabel: string;
  groundedLabel: string;
  questionLabel: string;
  answerLabel: string;
}

export interface RagIntroVisualCopy {
  title: string;
  retrieveLabel: string;
  augmentLabel: string;
  generateLabel: string;
  queryLabel: string;
  vectorDbLabel: string;
  contextLabel: string;
  llmLabel: string;
  answerLabel: string;
}

export interface RagArchitectureVisualCopy {
  title: string;
  ingestPhase: string;
  queryPhase: string;
  documentsLabel: string;
  embedLabel: string;
  vectorStoreLabel: string;
  queryLabel: string;
  retrieveLabel: string;
  contextLabel: string;
  promptLabel: string;
  llmLabel: string;
  answerLabel: string;
}

export interface RagEmbeddingVisualCopy {
  title: string;
  doc1Label: string;
  doc2Label: string;
  doc3Label: string;
  doc4Label: string;
  queryLabel: string;
  similarLabel: string;
  dissimilarLabel: string;
  embeddingDim: string;
}

export interface RagVectorSearchVisualCopy {
  title: string;
  queryLabel: string;
  doc1Label: string;
  doc2Label: string;
  doc3Label: string;
  doc4Label: string;
  scoreLabel: string;
  rankLabel: string;
}

export interface RagContextInjectionVisualCopy {
  title: string;
  instructionLabel: string;
  sourceLabel: string;
  questionLabel: string;
  answerLabel: string;
  contextBox: string;
  promptBox: string;
}

export interface RagFromScratchVisualCopy {
  title: string;
  ingestPhase: string;
  queryPhase: string;
  documentsLabel: string;
  embedLabel: string;
  vectorStoreLabel: string;
  questionLabel: string;
  searchLabel: string;
  topKLabel: string;
  promptLabel: string;
  generateLabel: string;
  answerLabel: string;
}

// ── ChromaDB (VectorDB + Transformers) ──────────────────────────────────────

export interface ChromadbIndexVisualCopy {
  title: string;
  docLabel: string;
  embedLabel: string;
  dbLabel: string;
  dimLabel: string;
  doc1: string;
  doc2: string;
  doc3: string;
  doc4: string;
  addLabel: string;
  embedderLabel: string;
}

export interface ChromadbSearchVisualCopy {
  title: string;
  queryLabel: string;
  queryText: string;
  dbLabel: string;
  searchLabel: string;
  rankLabel: string;
  result1: string;
  result2: string;
  result3: string;
  score1: string;
  score2: string;
  score3: string;
  topKLabel: string;
}

export interface ChromadbRagE2eVisualCopy {
  title: string;
  indexPhase: string;
  retrievePhase: string;
  generatePhase: string;
  documentsLabel: string;
  embedderLabel: string;
  chromaLabel: string;
  queryLabel: string;
  searchLabel: string;
  contextLabel: string;
  promptLabel: string;
  modelLabel: string;
  answerLabel: string;
}
