export interface SyntheticDataIntroVisualCopy {
  title: string;
  humanLabel: string;
  syntheticLabel: string;
  humanFlow: string;
  syntheticFlow: string;
  humanSteps: string[];
  syntheticSteps: string[];
  humanCost: string;
  syntheticCost: string;
  humanQuality: string;
  syntheticQuality: string;
  clickHint: string;
}

export interface SyntheticDataPipelineVisualCopy {
  title: string;
  stage1Title: string;
  stage1Desc: string;
  stage2Title: string;
  stage2Desc: string;
  stage3Title: string;
  stage3Desc: string;
  stage4Title: string;
  stage4Desc: string;
  stage5Title: string;
  stage5Desc: string;
  interactionHint: string;
  continueLabel: string;
  backLabel: string;
}

export interface SyntheticDataDemoVisualCopy {
  title: string;
  subtitle: string;
  datasetLabel: string;
  beforeLabel: string;
  afterLabel: string;
  fileRef: string;
  jsonlDescription: string;
  beforeResponse: string;
  afterResponse: string;
  promptTest: string;
  systemContent: string;
  tapHint: string;
  beforeCaption: string;
  afterCaption: string;
}

export interface SyntheticDataTaxonomyVisualCopy {
  title: string;
  saberLabel: string;
  saberExamples: string[];
  analisarLabel: string;
  analisarExamples: string[];
  raciocinarLabel: string;
  raciocinarExamples: string[];
  decidirLabel: string;
  decidirExamples: string[];
  seguirFormatoLabel: string;
  seguirFormatoExamples: string[];
  saberLimitarLabel: string;
  saberLimitarExamples: string[];
  professorSpeech: string;
  clickHint: string;
}

export interface SyntheticDataValdoriaVisualCopy {
  title: string;
  subtitle: string;
  tapHint: string;
  groups: {
    label: string;
    pedagogicalFunction: string;
    description: string;
    categories: { name: string; count: number }[];
    total: number;
    exampleInput: string;
    exampleOutput: string;
  }[];
}

export interface SyntheticDataNegativesVisualCopy {
  title: string;
  subtitle: string;
  negativeCaseTitle: string;
  negativeCaseDesc: string;
  refusalTitle: string;
  refusalDesc: string;
  clarificationTitle: string;
  clarificationDesc: string;
  uncertaintyTitle: string;
  uncertaintyDesc: string;
  exampleLabel: string;
  examplePrompt: string;
  exampleResponse: string;
  professorSpeech: string;
  hint: string;
}