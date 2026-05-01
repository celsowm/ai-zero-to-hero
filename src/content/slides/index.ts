import type { ISlide } from '../../types/slide/visuals';

import { apiLatencyGrowthBridge } from './api-latency-growth-bridge';
import { attentionExercise } from './attention-exercise';
import { attentionIsAllYouNeedTeaser } from './attention-is-all-you-need-teaser';
import { attentionOnWeThePeople } from './attention-on-we-the-people';
import { autoclassesDeepDive } from './autoclasses-deep-dive';
import { bigramIntuition } from './bigram-intuition';
import { bigramMatrixSoftmax } from './bigram-matrix-softmax';
import { bigramSampling } from './bigram-sampling';
import { biologicalVsComputationalNeuron } from './biological-vs-computational-neuron';
import { bpeAlgorithm } from './bpe-algorithm';
import { bpeE2eGutenberg } from './bpe-e2e-gutenberg';
import { bpeExercise } from './bpe-exercise';
import { bpeFromScratch } from './bpe-from-scratch';
import { bpeMergeStack } from './bpe-merge-stack';
import { bpeTraining } from './bpe-training';
import { buildGpt2DatasetFineweb } from './build-gpt2-dataset-fineweb';
import { buildGpt2DatasetTxt } from './build-gpt2-dataset-txt';
import { buildGpt2Generate } from './build-gpt2-generate';
import { buildGpt2Intro } from './build-gpt2-intro';
import { buildGpt2Model } from './build-gpt2-model';
import { buildGpt2Train } from './build-gpt2-train';
import { causalMask } from './causal-mask';
import { chromadbIndexDocuments } from './chromadb-index-documents';
import { chromadbRagE2e } from './chromadb-rag-e2e';
import { chromadbSearchQuery } from './chromadb-search-query';
import { contextWindow } from './context-window';
import { crossEntropyLanguageModeling } from './cross-entropy-language-modeling';
import { dataCollatorExplorer } from './data-collator-explorer';
import { embeddingsIntro } from './embeddings-intro';
import { generateParameters } from './generate-parameters';
import { gpt2BlackBox } from './gpt2-black-box';
import { gpt2EmbeddingsPlusPosition } from './gpt2-embeddings-plus-position';
import { gpt2LayerByLayerXray } from './gpt2-layer-by-layer-xray';
import { gpt2Teaser } from './gpt2-teaser';
import { gpt2WeThePeopleE2e } from './gpt2-we-the-people-e2e';
import { gpt2WeThePeopleInput } from './gpt2-we-the-people-input';
import { hfDatasetsDeepDive } from './hf-datasets-deep-dive';
import { hfPipelineCustom } from './hf-pipeline-custom';
import { hfV5Ecosystem } from './hf-v5-ecosystem';
import { hiddenStatesToLogits } from './hidden-states-to-logits';
import { huggingfaceTransformersIntro } from './huggingface-transformers-intro';
import { iaDefinition } from './ia-definition';
import { iaLearningLoop } from './ia-learning-loop';
import { iaVsTradicionais } from './ia-vs-tradicionais';
import { languageModelingIntro } from './language-modeling-intro';
import { linearRegressionAdjustment } from './linear-regression-adjustment';
import { linearRegressionError } from './linear-regression-error';
import { linearRegressionExercise } from './linear-regression-exercise';
import { linearRegressionGradientDescent } from './linear-regression-gradient-descent';
import { linearRegressionIntro } from './linear-regression-intro';
import { linearRegressionMseStepper } from './linear-regression-mse-stepper';
import { linearRegressionMse } from './linear-regression-mse';
import { linearRegressionNotation } from './linear-regression-notation';
import { linearRegressionPrediction } from './linear-regression-prediction';
import { linearRegressionPython1d } from './linear-regression-python-1d';
import { linearRegressionSimpleLine } from './linear-regression-simple-line';
import { llamaindexAgents } from './llamaindex-agents';
import { llamaindexChatEngine } from './llamaindex-chat-engine';
import { llamaindexCoreConcepts } from './llamaindex-core-concepts';
import { llamaindexDataLoaders } from './llamaindex-data-loaders';
import { llamaindexE2e } from './llamaindex-e2e';
import { llamaindexExercise } from './llamaindex-exercise';
import { llamaindexIndexingPipeline } from './llamaindex-indexing-pipeline';
import { llamaindexQueryEngines } from './llamaindex-query-engines';
import { llamaindexRetrieversDeepDive } from './llamaindex-retrievers-deep-dive';
import { llamaindexWhy } from './llamaindex-why';
import { langchainAgentsDeepDive } from './langchain-agents-deep-dive';
import { langchainChains } from './langchain-chains';
import { langchainCoreConcepts } from './langchain-core-concepts';
import { langchainE2e } from './langchain-e2e';
import { langchainExercise } from './langchain-exercise';
import { langchainMemory } from './langchain-memory';
import { langchainPromptTemplates } from './langchain-prompt-templates';
import { langchainRagLangchain } from './langchain-rag-langchain';
import { langchainTools } from './langchain-tools';
import { langchainWhy } from './langchain-why';
import { chainOfThought } from './chain-of-thought';
import { fewShotPrompting } from './few-shot-prompting';
import { manyShotPrompting } from './many-shot-prompting';
import { promptChainingPatterns } from './prompt-chaining-patterns';
import { promptEngineeringExercise } from './prompt-engineering-exercise';
import { promptEngineeringWhy } from './prompt-engineering-why';
import { promptEvaluation } from './prompt-evaluation';
import { promptSecuritySafety } from './prompt-security-safety';
import { promptStructureAnatomy } from './prompt-structure-anatomy';
import { realDatasetsPrompts } from './real-datasets-prompts';
import { treeOfThoughts } from './tree-of-thoughts';
import { zeroShotPrompting } from './zero-shot-prompting';
import { inferenceE2e } from './inference-e2e';
import { inferenceComparison } from './inference-comparison';
import { llamaCppIntro } from './llama-cpp-intro';
import { llamaCppOffload } from './llama-cpp-offload';
import { llama2VsGpt2 } from './llama2-vs-gpt2';
import { ropeDeepDive } from './rope-deep-dive';
import { inferenceEnginesWhy } from './inference-engines-why';
import { inferenceExercise } from './inference-exercise';
import { onnxOptimization } from './onnx-optimization';
import { openaiApiStandard } from './openai-api-standard';
import { sglangDeepDive } from './sglang-deep-dive';
import { sglangIntro } from './sglang-intro';
import { streamingMode } from './streaming-mode';
import { toolCallingBestPractices } from './tool-calling-best-practices';
import { toolCallingConcepts } from './tool-calling-concepts';
import { toolCallingE2e } from './tool-calling-e2e';
import { toolCallingErrors } from './tool-calling-errors';
import { toolCallingExercise } from './tool-calling-exercise';
import { toolCallingFlow } from './tool-calling-flow';
import { toolCallingStructuredOutput } from './tool-calling-structured-output';
import { toolCallingToAgents } from './tool-calling-to-agents';
import { toolCallingWhy } from './tool-calling-why';
import { toolCallingWithLangchain } from './tool-calling-with-langchain';
import { toolCallingWithOpenaiApi } from './tool-calling-with-openai-api';
import { toolDeclaration } from './tool-declaration';
import { parallelToolCalls } from './parallel-tool-calls';
import { multiToolOrchestration } from './multi-tool-orchestration';
import { transformersPipeline } from './transformers-pipeline';
import { transformersServer } from './transformers-server';
import { vllmDeepDive } from './vllm-deep-dive';
import { vllmIntro } from './vllm-intro';
import { loraExercise } from './lora-exercise';
import { markdownSyntax } from './markdown-syntax';
import { markdownWhy } from './markdown-why';
import { mlPipeline } from './ml-pipeline';
import { mlpInsideTransformer } from './mlp-inside-transformer';
import { mlpLanguageModel } from './mlp-language-model';
import { moeIntro } from './moe-intro';
import { moeSparseVsDense } from './moe-sparse-vs-dense';
import { moeRouting } from './moe-routing';
import { moeExercise } from './moe-exercise';
import { moeNamingConventions } from './moe-naming-conventions';
import { moePytorchDeepDive } from './moe-pytorch-deep-dive';
import { moeExpertVisualization } from './moe-expert-visualization';
import { modelCacheSafetensors } from './model-cache-safetensors';
import { modelEvaluationHf } from './model-evaluation-hf';
import { modelSharingHub } from './model-sharing-hub';
import { multiheadAttention } from './multihead-attention';
import { neuralNetworkActivationFunctions } from './neural-network-activation-functions';
import { neuralNetworkArchitecturesDeepDive } from './neural-network-architectures-deep-dive';
import { neuralNetworkBackpropagation } from './neural-network-backpropagation';
import { neuralNetworkDerivativeIntuition } from './neural-network-derivative-intuition';
import { neuralNetworkExercise } from './neural-network-exercise';
import { neuralNetworkFeedforward } from './neural-network-feedforward';
import { neuralNetworkMinimalExample } from './neural-network-minimal-example';
import { neuralNetworkNeuronRelu } from './neural-network-neuron-relu';
import { neuralNetworkPrediction } from './neural-network-prediction';
import { neuralNetworkPytorchHardware } from './neural-network-pytorch-hardware';
import { neuralNetworkPytorchInstall } from './neural-network-pytorch-install';
import { neuralNetworkPytorchIntro } from './neural-network-pytorch-intro';
import { neuralNetworkPytorchPrediction } from './neural-network-pytorch-prediction';
import { pytorchSaveLoad } from './pytorch-save-load';
import { neuralNetworkPytorchTensors } from './neural-network-pytorch-tensors';
import { neuralNetworkPytorchTraining } from './neural-network-pytorch-training';
import { neuralNetworkSigmoidDeepDive } from './neural-network-sigmoid-deep-dive';
import { neuralNetworkSigmoidDerivative } from './neural-network-sigmoid-derivative';
import { neuralNetworkToLanguageModeling } from './neural-network-to-language-modeling';
import { neuralNetworkTypesOverview } from './neural-network-types-overview';
import { neuralNetworkWeightsAndBiases } from './neural-network-weights-and-biases';
import { nextTokenPrediction } from './next-token-prediction';
import { nnProblem } from './nn-problem';
import { nonlinearRegressionBoundary } from './nonlinear-regression-boundary';
import { nonlinearSolutionRing } from './nonlinear-solution-ring';
import { peftLoraIntro } from './peft-lora-intro';
import { pipelineApiDeepDive } from './pipeline-api-deep-dive';
import { predictionEvolutionWeThePeople } from './prediction-evolution-we-the-people';
import { professor } from './professor';
import { pythonIntro } from './python-intro';
import { pythonPrereqConditionals } from './python-prereq-conditionals';
import { pythonPrereqData } from './python-prereq-data';
import { pythonPrereqExercises } from './python-prereq-exercises';
import { pythonPrereqFunctions } from './python-prereq-functions';
import { pythonPrereqListComprehensions } from './python-prereq-list-comprehensions';
import { pythonPrereqLoops } from './python-prereq-loops';
import { pythonPrereqSumGenerator } from './python-prereq-sum-generator';
import { pytorchBasicsExercise } from './pytorch-basics-exercise';
import { qkvIntuition } from './qkv-intuition';
import { quantizationBnb } from './quantization-bnb';
import { quantizationFp16 } from './quantization-fp16';
import { quantizationInt8 } from './quantization-int8';
import { quantizationNf4DeepDive } from './quantization-nf4-deep-dive';
import { quantizationPractice } from './quantization-practice';
import { ragArchitecture } from './rag-architecture';
import { ragContextInjection } from './rag-context-injection';
import { ragEmbeddingModel } from './rag-embedding-model';
import { ragFromScratch } from './rag-from-scratch';
import { ragHallucination } from './rag-hallucination';
import { ragIntro } from './rag-intro';
import { ragMemoryLimit } from './rag-memory-limit';
import { ragVectorSearch } from './rag-vector-search';
import { residualStream } from './residual-stream';
import { roadToMiniTransformer } from './road-to-mini-transformer';
import { samplingControls } from './sampling-controls';
import { sftDataset } from './sft-dataset';
import { sftGenerate } from './sft-generate';
import { sftIntro } from './sft-intro';
import { sftTrain } from './sft-train';
import { tokenizationDeepDive } from './tokenization-deep-dive';
import { tokenizationIntro } from './tokenization-intro';
import { tokenizationWeThePeople } from './tokenization-we-the-people';
import { tokenizationWhy } from './tokenization-why';
import { tokenizerInternalsHf } from './tokenizer-internals-hf';
import { tokenizerTrainingHf } from './tokenizer-training-hf';
import { trainerDemystified } from './trainer-demystified';
import { trainingLanguageModels } from './training-language-models';
import { transformerBlockOverview } from './transformer-block-overview';
import { welcome } from './welcome';
import { whyTransformersWorkSoWell } from './why-transformers-work-so-well';
import { wordpieceSentencepiece } from './wordpiece-sentencepiece';

// Reasoning/Thinking section
import { reasoningWhy } from './reasoning-why';
import { reasoningHistory } from './reasoning-history';
import { reasoningVsCot } from './reasoning-vs-cot';
import { reasoningHowItWorks } from './reasoning-how-it-works';
import { reasoningPayload } from './reasoning-payload';
import { reasoningDatasets } from './reasoning-datasets';
import { reasoningTraining } from './reasoning-training';
import { reasoningApi } from './reasoning-api';
import { reasoningCost } from './reasoning-cost';
import { reasoningComparison } from './reasoning-comparison';
import { reasoningLimitations } from './reasoning-limitations';
import { reasoningInference } from './reasoning-inference';
import { reasoningExercise } from './reasoning-exercise';
import { reasoningE2e } from './reasoning-e2e';

export const allSlides: ISlide[] = [
  apiLatencyGrowthBridge,
  attentionExercise,
  attentionIsAllYouNeedTeaser,
  attentionOnWeThePeople,
  autoclassesDeepDive,
  bigramIntuition,
  bigramMatrixSoftmax,
  bigramSampling,
  biologicalVsComputationalNeuron,
  bpeAlgorithm,
  bpeE2eGutenberg,
  bpeExercise,
  bpeFromScratch,
  bpeMergeStack,
  bpeTraining,
  buildGpt2DatasetFineweb,
  buildGpt2DatasetTxt,
  buildGpt2Generate,
  buildGpt2Intro,
  buildGpt2Model,
  buildGpt2Train,
  causalMask,
  chromadbIndexDocuments,
  chromadbRagE2e,
  chromadbSearchQuery,
  contextWindow,
  crossEntropyLanguageModeling,
  dataCollatorExplorer,
  embeddingsIntro,
  generateParameters,
  gpt2BlackBox,
  gpt2EmbeddingsPlusPosition,
  gpt2LayerByLayerXray,
  gpt2Teaser,
  gpt2WeThePeopleE2e,
  gpt2WeThePeopleInput,
  hfDatasetsDeepDive,
  hfPipelineCustom,
  hfV5Ecosystem,
  hiddenStatesToLogits,
  huggingfaceTransformersIntro,
  iaDefinition,
  iaLearningLoop,
  iaVsTradicionais,
  languageModelingIntro,
  linearRegressionAdjustment,
  linearRegressionError,
  linearRegressionExercise,
  linearRegressionGradientDescent,
  linearRegressionIntro,
  linearRegressionMseStepper,
  linearRegressionMse,
  linearRegressionNotation,
  linearRegressionPrediction,
  linearRegressionPython1d,
  linearRegressionSimpleLine,
  llamaindexAgents,
  llamaindexChatEngine,
  llamaindexCoreConcepts,
  llamaindexDataLoaders,
  llamaindexE2e,
  llamaindexExercise,
  llamaindexIndexingPipeline,
  llamaindexQueryEngines,
  llamaindexRetrieversDeepDive,
  llamaindexWhy,
  langchainAgentsDeepDive,
  langchainChains,
  langchainCoreConcepts,
  langchainE2e,
  langchainExercise,
  langchainMemory,
  langchainPromptTemplates,
  langchainRagLangchain,
  langchainTools,
  langchainWhy,
  chainOfThought,
  fewShotPrompting,
  manyShotPrompting,
  promptChainingPatterns,
  promptEngineeringExercise,
  promptEngineeringWhy,
  promptEvaluation,
  promptSecuritySafety,
  promptStructureAnatomy,
  realDatasetsPrompts,
  treeOfThoughts,
  zeroShotPrompting,
  inferenceE2e,
  inferenceComparison,
  llamaCppIntro,
  llamaCppOffload,
  llama2VsGpt2,
  ropeDeepDive,
  inferenceEnginesWhy,
  inferenceExercise,
  onnxOptimization,
  openaiApiStandard,
  sglangDeepDive,
  sglangIntro,
  streamingMode,
  multiToolOrchestration,
  parallelToolCalls,
  toolCallingBestPractices,
  toolCallingConcepts,
  toolCallingE2e,
  toolCallingErrors,
  toolCallingExercise,
  toolCallingFlow,
  toolCallingStructuredOutput,
  toolCallingToAgents,
  toolCallingWhy,
  toolCallingWithLangchain,
  toolCallingWithOpenaiApi,
  toolDeclaration,
  transformersPipeline,
  transformersServer,
  vllmDeepDive,
  vllmIntro,
  loraExercise,
  markdownSyntax,
  markdownWhy,
  mlPipeline,
  mlpInsideTransformer,
  mlpLanguageModel,
  moeIntro,
  moeSparseVsDense,
  moeRouting,
  moeExercise,
  moeNamingConventions,
  moePytorchDeepDive,
  moeExpertVisualization,
  modelCacheSafetensors,
  modelEvaluationHf,
  modelSharingHub,
  multiheadAttention,
  neuralNetworkActivationFunctions,
  neuralNetworkArchitecturesDeepDive,
  neuralNetworkBackpropagation,
  neuralNetworkDerivativeIntuition,
  neuralNetworkExercise,
  neuralNetworkFeedforward,
  neuralNetworkMinimalExample,
  neuralNetworkNeuronRelu,
  neuralNetworkPrediction,
  neuralNetworkPytorchHardware,
  neuralNetworkPytorchInstall,
  neuralNetworkPytorchIntro,
  neuralNetworkPytorchPrediction,
  pytorchSaveLoad,
  neuralNetworkPytorchTensors,
  neuralNetworkPytorchTraining,
  neuralNetworkSigmoidDeepDive,
  neuralNetworkSigmoidDerivative,
  neuralNetworkToLanguageModeling,
  neuralNetworkTypesOverview,
  neuralNetworkWeightsAndBiases,
  nextTokenPrediction,
  nnProblem,
  nonlinearRegressionBoundary,
  nonlinearSolutionRing,
  peftLoraIntro,
  pipelineApiDeepDive,
  predictionEvolutionWeThePeople,
  professor,
  pythonIntro,
  pythonPrereqConditionals,
  pythonPrereqData,
  pythonPrereqExercises,
  pythonPrereqFunctions,
  pythonPrereqListComprehensions,
  pythonPrereqLoops,
  pythonPrereqSumGenerator,
  pytorchBasicsExercise,
  qkvIntuition,
  quantizationBnb,
  quantizationFp16,
  quantizationInt8,
  quantizationNf4DeepDive,
  quantizationPractice,
  ragArchitecture,
  ragContextInjection,
  ragEmbeddingModel,
  ragFromScratch,
  ragHallucination,
  ragIntro,
  ragMemoryLimit,
  ragVectorSearch,
  residualStream,
  roadToMiniTransformer,
  samplingControls,
  sftDataset,
  sftGenerate,
  sftIntro,
  sftTrain,
  tokenizationDeepDive,
  tokenizationIntro,
  tokenizationWeThePeople,
  tokenizationWhy,
  tokenizerInternalsHf,
  tokenizerTrainingHf,
  trainerDemystified,
  trainingLanguageModels,
  transformerBlockOverview,
  welcome,
  whyTransformersWorkSoWell,
  wordpieceSentencepiece,
  // Reasoning/Thinking section
  reasoningWhy,
  reasoningHistory,
  reasoningVsCot,
  reasoningHowItWorks,
  reasoningPayload,
  reasoningDatasets,
  reasoningTraining,
  reasoningApi,
  reasoningCost,
  reasoningComparison,
  reasoningLimitations,
  reasoningInference,
  reasoningExercise,
  reasoningE2e,
];
