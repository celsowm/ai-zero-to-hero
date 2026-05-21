import type { ISlide } from '../../types/slide/visuals';

import { apiLatencyGrowthBridge } from './api-latency-growth-bridge';
import { attentionExercise } from './attention-exercise';
import { attentionIsAllYouNeedTeaser } from './attention-is-all-you-need-teaser';
import { attentionOnWeThePeople } from './attention-on-we-the-people';
import { autoclassesDeepDive } from './autoclasses-deep-dive';
import { biologicalVsComputationalNeuron } from './biological-vs-computational-neuron';
import { bpeAlgorithm } from './bpe-algorithm';
import { bpeByHand } from './bpe-by-hand';
import { bpeExercise } from './bpe-exercise';
import { bpeFromScratch } from './bpe-from-scratch';
import { bpeMergeStack } from './bpe-merge-stack';
import { bpeTraining } from './bpe-training';
import { buildGpt2DatasetGutenberg } from './build-gpt2-dataset-gutenberg';
import { buildGpt2DatasetTxt } from './build-gpt2-dataset-txt';
import { buildGpt2Generate } from './build-gpt2-generate';
import { buildGpt2Intro } from './build-gpt2-intro';
import { buildGpt2Model } from './build-gpt2-model';
import { buildGpt2Train } from './build-gpt2-train';
import { chromadbIndexDocuments } from './chromadb-index-documents';
import { chromadbRagE2e } from './chromadb-rag-e2e';
import { chromadbSearchQuery } from './chromadb-search-query';
import { crossEntropyLanguageModeling } from './cross-entropy-language-modeling';
import { dataCollatorExplorer } from './data-collator-explorer';
import { embeddingsIntro } from './embeddings-intro';
import { gpt2BlackBox } from './gpt2-black-box';
import { gpt2FromScratchRepoMap } from './gpt2-from-scratch-repo-map';
import { gpt2LayerByLayerXray } from './gpt2-layer-by-layer-xray';
import { gpt2BlockAnatomy } from './gpt2-block-anatomy';
import { gpt2PytorchAttention } from './gpt2-pytorch-attention';
import { gpt2PytorchConfigLoading } from './gpt2-pytorch-config-loading';
import { gpt2PytorchQkvIntuition } from './gpt2-pytorch-qkv-intuition';
import { gpt2PytorchLmHeadGenerate } from './gpt2-pytorch-lm-head-generate';
import { gpt2PytorchMlpBlock } from './gpt2-pytorch-mlp-block';
import { gpt2PytorchModelForward } from './gpt2-pytorch-model-forward';
import { gpt2PytorchE2eDebugger } from './gpt2-pytorch-e2e-debugger';
import { gpt2Teaser } from './gpt2-teaser';
import { gpt2WeThePeopleInput } from './gpt2-we-the-people-input';
import { hfDatasetsDeepDive } from './hf-datasets-deep-dive';
import { hfPipelineCustom } from './hf-pipeline-custom';
import { hfV5Ecosystem } from './hf-v5-ecosystem';
import { hiddenStatesToLogits } from './hidden-states-to-logits';
import { huggingfaceTransformersIntro } from './huggingface-transformers-intro';
import { iaDefinition } from './ia-definition';
import { iaLearningLoop } from './ia-learning-loop';
import { iaVsTradicionais } from './ia-vs-tradicionais';
import { languageModelTrainVsGenerate } from './language-model-train-vs-generate';
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
import { browserInferenceWhy } from './browser-inference-why';
import { transformersJsIntro } from './transformers-js-intro';
import { webgpuDeepDive } from './webgpu-deep-dive';
import { webllmInBrowser } from './webllm-in-browser';
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
import { neuralNetworkPytorchNnLayers } from './neural-network-pytorch-nn-layers';
import { neuralNetworkPytorchOptimizerIntuition } from './neural-network-pytorch-optimizer-intuition';
import { pytorchSaveLoad } from './pytorch-save-load';
import { neuralNetworkPytorchTensors } from './neural-network-pytorch-tensors';
import { tensorOrigins } from './tensor-origins';
import { neuralNetworkPytorchSilicon } from './neural-network-pytorch-silicon';
import { pytorchAutograd } from './pytorch-autograd';
import { pytorchExercisesFundamentals } from './pytorch-exercises-fundamentals';
import { pytorchExercisesLanguageModeling } from './pytorch-exercises-language-modeling';
import { pytorchExercisesTraining } from './pytorch-exercises-training';
import { pytorchRuntimeOptions } from './pytorch-runtime-options';
import { pytorchWhyPerformant } from './pytorch-why-performant';
import { pytorchEmbeddingToLogits } from './pytorch-embedding-to-logits';
import { pytorchEmbeddingIntro } from './pytorch-embedding-intro';
import { pytorchEcosystemOverview } from './pytorch-ecosystem-overview';
import { pytorchMinimalLanguageModel } from './pytorch-minimal-language-model';
import { pytorchShapesLanguageModeling } from './pytorch-shapes-language-modeling';
import { pytorchTensorRanks0d4d } from './pytorch-tensor-ranks-0d-4d';
import { pytorchTokenBatch } from './pytorch-token-batch';
import { neuralNetworkPytorchNnLinear } from './neural-network-pytorch-nn-linear';
import { neuralNetworkPytorchOptimizers } from './neural-network-pytorch-optimizers';
import { neuralNetworkPytorchModelLifecycle } from './neural-network-pytorch-model-lifecycle';
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
import { predictionEvolutionWeThePeople } from './prediction-evolution-we-the-people';
import { professor } from './professor';
import { pythonIntro } from './python-intro';
import { pythonPrereqConditionals } from './python-prereq-conditionals';
import { pythonPrereqData } from './python-prereq-data';
import { pythonPrereqExercises } from './python-prereq-exercises';
import { pythonPrereqFunctions } from './python-prereq-functions';
import { pythonPrereqListComprehensions } from './python-prereq-list-comprehensions';
import { pythonPrereqLoops } from './python-prereq-loops';
import { pythonPrereqOopAssociation } from './python-prereq-oop-association';
import { pythonPrereqOopClasses } from './python-prereq-oop-classes';
import { pythonPrereqOopDataclass } from './python-prereq-oop-dataclass';
import { pythonPrereqOopDunder } from './python-prereq-oop-dunder';
import { pythonPrereqOopDunderCall } from './python-prereq-oop-dunder-call';
import { pythonPrereqOopExercises } from './python-prereq-oop-exercises';
import { pythonPrereqOopInheritance } from './python-prereq-oop-inheritance';
import { pythonPrereqSumGenerator } from './python-prereq-sum-generator';
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
import { repoGpt2GenerateCheckpoint } from './repo-gpt2-generate-checkpoint';
import { repoGpt2SmokeForward } from './repo-gpt2-smoke-forward';
import { repoGpt2TinyOverfit } from './repo-gpt2-tiny-overfit';
import { repoGpt2TrainDebug } from './repo-gpt2-train-debug';
import { residualStream } from './residual-stream';
import { roadToMiniTransformer } from './road-to-mini-transformer';
import { samplingControls } from './sampling-controls';
import { systemPromptIntro } from './system-prompt-intro';
import { sftDataset } from './sft-dataset';
import { sftGenerate } from './sft-generate';
import { sftIntro } from './sft-intro';
import { sftTrain } from './sft-train';
import { jinjaChatmlPractice } from './jinja-chatml-practice';
import { jinjaIntro } from './jinja-intro';
import { syntheticDataDemo } from './synthetic-data-demo';
import { syntheticDataIntro } from './synthetic-data-intro';
import { syntheticDataPipeline } from './synthetic-data-pipeline';
import { syntheticDataTaxonomy } from './synthetic-data-taxonomy';
import { syntheticDataValdoria } from './synthetic-data-valdoria';
import { tokenizationDeepDive } from './tokenization-deep-dive';
import { tokenizationWhy } from './tokenization-why';
import { tokenizerTrainingHf } from './tokenizer-training-hf';
import { trainerDemystified } from './trainer-demystified';
import { trainingMetricsFamilies } from './training-metrics-families';
import { trainingLossExplained } from './training-loss-explained';
import { evalLossGeneralization } from './eval-loss-generalization';
import { gradNormStability } from './grad-norm-stability';
import { classificationMetrics } from './classification-metrics';
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

// Intelligent Agents section
import { agentsWhy } from './agents-why';
import { agentsDefinition } from './agents-definition';
import { agentLoop } from './agent-loop';
import { agentLoopExercise } from './agent-loop-exercise';
import { agentMemory } from './agent-memory';
import { agentPlanning } from './agent-planning';
import { reactPattern } from './react-pattern';
import { reactExercise } from './react-exercise';
import { multiAgentPattern } from './multi-agent-pattern';
import { agentFrameworks } from './agent-frameworks';
import { mcpProtocol } from './mcp-protocol';
import { agentBestPractices } from './agent-best-practices';
import { agentsExercise } from './agents-exercise';
import { agentsE2E } from './agents-e2e';

export const allSlides: ISlide[] = [
  apiLatencyGrowthBridge,
  attentionExercise,
  attentionIsAllYouNeedTeaser,
  attentionOnWeThePeople,
  autoclassesDeepDive,
  biologicalVsComputationalNeuron,
   bpeAlgorithm,
   bpeByHand,
   bpeExercise,
  bpeFromScratch,
  bpeMergeStack,
  bpeTraining,
  buildGpt2DatasetGutenberg,
  buildGpt2DatasetTxt,
  buildGpt2Generate,
  buildGpt2Intro,
  buildGpt2Model,
  buildGpt2Train,
  chromadbIndexDocuments,
  chromadbRagE2e,
  chromadbSearchQuery,
  crossEntropyLanguageModeling,
  dataCollatorExplorer,
  embeddingsIntro,
  gpt2BlackBox,
  gpt2FromScratchRepoMap,
  gpt2LayerByLayerXray,
  gpt2BlockAnatomy,
  gpt2PytorchAttention,
  gpt2PytorchConfigLoading,
  gpt2PytorchE2eDebugger,
  gpt2PytorchLmHeadGenerate,
  gpt2PytorchMlpBlock,
  gpt2PytorchModelForward,
  gpt2PytorchQkvIntuition,
  gpt2Teaser,
  gpt2WeThePeopleInput,
  hfDatasetsDeepDive,
  hfPipelineCustom,
  hfV5Ecosystem,
  hiddenStatesToLogits,
  huggingfaceTransformersIntro,
  iaDefinition,
  iaLearningLoop,
  iaVsTradicionais,
  languageModelTrainVsGenerate,
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
  browserInferenceWhy,
  transformersJsIntro,
  webgpuDeepDive,
  webllmInBrowser,
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
  pytorchEcosystemOverview,
  neuralNetworkPytorchNnLinear,
  neuralNetworkPytorchNnLayers,
  neuralNetworkPytorchOptimizerIntuition,
  neuralNetworkPytorchOptimizers,
  neuralNetworkPytorchModelLifecycle,
  neuralNetworkPytorchPrediction,
  pytorchSaveLoad,
  neuralNetworkPytorchTensors,
  tensorOrigins,
  neuralNetworkPytorchSilicon,
  pytorchAutograd,
  pytorchExercisesFundamentals,
  pytorchExercisesLanguageModeling,
  pytorchExercisesTraining,
  pytorchRuntimeOptions,
  pytorchWhyPerformant,
  pytorchEmbeddingIntro,
  pytorchEmbeddingToLogits,
  pytorchMinimalLanguageModel,
  pytorchShapesLanguageModeling,
  pytorchTensorRanks0d4d,
  pytorchTokenBatch,
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
  predictionEvolutionWeThePeople,
  professor,
  pythonIntro,
  pythonPrereqConditionals,
  pythonPrereqData,
  pythonPrereqExercises,
  pythonPrereqFunctions,
  pythonPrereqListComprehensions,
  pythonPrereqLoops,
  pythonPrereqOopAssociation,
  pythonPrereqOopClasses,
  pythonPrereqOopDataclass,
  pythonPrereqOopDunder,
  pythonPrereqOopDunderCall,
  pythonPrereqOopExercises,
  pythonPrereqOopInheritance,
  pythonPrereqSumGenerator,
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
  repoGpt2GenerateCheckpoint,
  repoGpt2SmokeForward,
  repoGpt2TinyOverfit,
  repoGpt2TrainDebug,
  residualStream,
  roadToMiniTransformer,
  samplingControls,
  sftIntro,
  systemPromptIntro,
  sftDataset,
  sftTrain,
  sftGenerate,
  jinjaIntro,
  jinjaChatmlPractice,
  syntheticDataIntro,
  syntheticDataPipeline,
  syntheticDataTaxonomy,
  syntheticDataDemo,
  syntheticDataValdoria,
  tokenizationDeepDive,
  tokenizationWhy,
  tokenizerTrainingHf,
  trainerDemystified,
  trainingMetricsFamilies,
  trainingLossExplained,
  evalLossGeneralization,
  gradNormStability,
  classificationMetrics,
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
  // Intelligent Agents section
  agentsWhy,
  agentsDefinition,
  agentLoop,
  agentLoopExercise,
  agentMemory,
  agentPlanning,
  reactPattern,
  reactExercise,
  multiAgentPattern,
  agentFrameworks,
  mcpProtocol,
  agentBestPractices,
  agentsExercise,
  agentsE2E,
];
