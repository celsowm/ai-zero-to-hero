export interface TokenLevelComparisonCopy {
  wordLevel: string;
  charLevel: string;
  subwordLevel: string;
  exampleText: string;
  prosLabel: string;
  consLabel: string;
  wordPros: string[];
  wordCons: string[];
  charPros: string[];
  charCons: string[];
  subwordPros: string[];
  subwordCons: string[];
}

export interface TokenGranularitySliderCopy {
  sliderLabel: string;
  charLevel: string;
  wordLevel: string;
  subwordLevel: string;
  exampleSentence: string;
  tokenCount: string;
}

export interface BPEFrequencyTableCopy {
  title: string;
  pairLabel: string;
  freqLabel: string;
  mergeLabel: string;
  nextMergeLabel: string;
  vocabularyLabel: string;
  corpusLabel: string;
}

export interface BPEMergeStackCopy {
  title: string;
  originalToken: string;
  stackLabel: string;
  priorityLabel: string;
  resultLabel: string;
  nextMergeLabel: string;
  resetLabel: string;
  completedLabel: string;
  mergeRules: string[];
  originalTokens?: string[];
}

export interface BPETrainingCurveCopy {
  title: string;
  vocabAxis: string;
  coverageAxis: string;
  oovLabel: string;
  mergesLabel: string;
  smallVocab: string;
  largeVocab: string;
  optimalLabel: string;
  tradeoffDesc: string;
}
