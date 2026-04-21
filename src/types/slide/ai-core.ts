export interface InferenceDiagramCopy {
  diagramTitle: string;
  diagramDescription: string;
  trainingTitle: string;
  modelTitle: string;
  predictionsTitle: string;
  featuresLabel: string;
  lossLabel: string;
  updateLabel: string;
  footerLabel: string;
}

export interface LearningLoopDiagramCopy {
  diagramTitle: string;
  diagramDescription: string;
  dataTitle: string;
  modelTitle: string;
  predictionTitle: string;
  errorTitle: string;
  adjustTitle: string;
  loopLabel: string;
  footerLabel: string;
}

export interface LocalizedImageCopy {
  src: string;
  alt: string;
  openLabel: string;
  closeLabel: string;
}

export interface MachineLearningPipelineStageCopy {
  title: string;
  subtitle: string;
  accent: string;
}

export interface MachineLearningPipelineCopy {
  diagramTitle: string;
  diagramDescription: string;
  stages: MachineLearningPipelineStageCopy[];
  loopLabel: string;
  footerLabel: string;
}

export interface ApiLatencyGrowthPointCopy {
  users: number;
  latency: number;
  label: string;
  accent: string;
}

export interface ApiLatencyGrowthMetricCopy {
  title: string;
  value: string;
  description: string;
  accent: string;
}

export interface ApiLatencyGrowthVisualCopy {
  eyebrow: string;
  title: string;
  description: string;
  xLabel: string;
  yLabel: string;
  curveLabel: string;
  referenceLabel: string;
  lowLoadLabel: string;
  saturationLabel: string;
  explosionLabel: string;
  legendTitle: string;
  metrics: ApiLatencyGrowthMetricCopy[];
  points: ApiLatencyGrowthPointCopy[];
  footer: string;
}
