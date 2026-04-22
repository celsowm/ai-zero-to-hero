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

export interface AttentionLinesDiagramCopy {
  token1: string;
  token2: string;
  token3: string;
  strongConnection: string;
  weakConnection: string;
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
