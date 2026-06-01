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

import { crossEntropyLanguageModeling } from './cross-entropy-language-modeling';
import { dataCollatorExplorer } from './data-collator-explorer';
import { embeddingsIntro } from './embeddings-intro';
import { gpt2BlackBox } from './gpt2-black-box';

import { gpt2LayerByLayerXray } from './gpt2-layer-by-layer-xray';
import { gpt2AttentionQkvXray } from './gpt2-attention-qkv-xray';
import { gpt2BlockAnatomy } from './gpt2-block-anatomy';
import { pytorchGpt2ModuleIntro } from './pytorch-gpt2-module-intro';
import { pytorchGpt2ProjectStructure } from './pytorch-gpt2-project-structure';
import { pytorchGpt2EnvSetup } from './pytorch-gpt2-env-setup';
import { pytorchGpt2Config } from './pytorch-gpt2-config';
import { pytorchGpt2Optimizer } from './pytorch-gpt2-optimizer';
import { pytorchGpt2Checkpoint } from './pytorch-gpt2-checkpoint';
import { pytorchGpt2TextSource } from './pytorch-gpt2-text-source';
import { pytorchGpt2Tokenizer } from './pytorch-gpt2-tokenizer';
import { pytorchGpt2PrepareShards } from './pytorch-gpt2-prepare-shards';
import { pytorchGpt2ShardDataset } from './pytorch-gpt2-shard-dataset';
import { pytorchGpt2Mlp } from './pytorch-gpt2-mlp';
import { pytorchGpt2Attention } from './pytorch-gpt2-attention';
import { pytorchGpt2Block } from './pytorch-gpt2-block';
import { pytorchGpt2Gpt } from './pytorch-gpt2-gpt';
import { pytorchGpt2Trainer } from './pytorch-gpt2-trainer';
import { pytorchGpt2Yamls } from './pytorch-gpt2-yamls';
import { pytorchGpt2TrainTokenizer } from './pytorch-gpt2-train-tokenizer';
import { pytorchGpt2PrepareData } from './pytorch-gpt2-prepare-data';
import { pytorchGpt2TrainModel } from './pytorch-gpt2-train-model';
import { pytorchGpt2InferSampler } from './pytorch-gpt2-infer-sampler';
import { pytorchGpt2InferGenerate } from './pytorch-gpt2-infer-generate';
import { pytorchGpt2InferPretrained } from './pytorch-gpt2-infer-pretrained';
import { pytorchGpt2InferInteractive } from './pytorch-gpt2-infer-interactive';
import { pytorchGpt2ScriptGenerate } from './pytorch-gpt2-script-generate';

import { gpt2Teaser } from './gpt2-teaser';
import { gpt2WeThePeopleInput } from './gpt2-we-the-people-input';
import { hfDatasetsDeepDive } from './hf-datasets-deep-dive';
import { hfPipelineCustom } from './hf-pipeline-custom';
import { hfV5Ecosystem } from './hf-v5-ecosystem';
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
import { pytorchRuntimeOptions } from './pytorch-runtime-options';
import { pytorchWhyPerformant } from './pytorch-why-performant';
import { pytorchDtypeContract } from './pytorch-dtype-contract';
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
import { nnProblem } from './nn-problem';
import { nonlinearRegressionBoundary } from './nonlinear-regression-boundary';
import { nonlinearSolutionRing } from './nonlinear-solution-ring';
import { peftLoraIntro } from './peft-lora-intro';
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
import { quantizationFp16 } from './quantization-fp16';
import { quantizationInt8 } from './quantization-int8';
import { quantizationNf4 } from './quantization-nf4';
import { quantizationOverview } from './quantization-overview';
import { ragAnswerWithSources } from './rag-answer-with-sources';
import { ragChromadbMinimal } from './rag-chromadb-minimal';
import { ragChunking } from './rag-chunking';
import { ragEmbeddings } from './rag-embeddings';
import { ragEvaluation } from './rag-evaluation';
import { ragExercise } from './rag-exercise';
import { ragIngestion } from './rag-ingestion';
import { ragLangchainModern } from './rag-langchain-modern';
import { ragLangchainVsLlamaindex } from './rag-langchain-vs-llamaindex';
import { ragLlamaindexModern } from './rag-llamaindex-modern';
import { ragMentalModel } from './rag-mental-model';
import { ragProblem } from './rag-problem';
import { ragProductionChecklist } from './rag-production-checklist';
import { ragPromptAssembly } from './rag-prompt-assembly';
import { ragRetrieval } from './rag-retrieval';
import { ragVectordb } from './rag-vectordb';

import { systemPromptIntro } from './system-prompt-intro';
import { sftDataset } from './sft-dataset';
import { sftGenerate } from './sft-generate';
import { sftTrain } from './sft-train';
import { chatmlAnatomy } from './chatml-anatomy';
import { chatmlProblem } from './chatml-problem';
import { applyChatTemplateQwen } from './apply-chat-template-qwen';
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

  chatmlAnatomy,
  chatmlProblem,
  applyChatTemplateQwen,
  crossEntropyLanguageModeling,
  dataCollatorExplorer,
  embeddingsIntro,
  gpt2BlackBox,

  gpt2LayerByLayerXray,
  gpt2AttentionQkvXray,
  gpt2BlockAnatomy,
  pytorchGpt2ModuleIntro,
  pytorchGpt2ProjectStructure,
  pytorchGpt2EnvSetup,
  pytorchGpt2Config,
  pytorchGpt2Optimizer,
  pytorchGpt2Checkpoint,
  pytorchGpt2TextSource,
  pytorchGpt2Tokenizer,
  pytorchGpt2PrepareShards,
  pytorchGpt2ShardDataset,
  pytorchGpt2Mlp,
  pytorchGpt2Attention,
  pytorchGpt2Block,
  pytorchGpt2Gpt,
  pytorchGpt2Trainer,
  pytorchGpt2Yamls,
  pytorchGpt2TrainTokenizer,
  pytorchGpt2PrepareData,
  pytorchGpt2TrainModel,
  pytorchGpt2InferSampler,
  pytorchGpt2InferGenerate,
  pytorchGpt2InferPretrained,
  pytorchGpt2InferInteractive,
  pytorchGpt2ScriptGenerate,

  gpt2Teaser,
  gpt2WeThePeopleInput,
  hfDatasetsDeepDive,
  hfPipelineCustom,
  hfV5Ecosystem,
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
  pytorchRuntimeOptions,
  pytorchWhyPerformant,
  pytorchDtypeContract,
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
  nnProblem,
  nonlinearRegressionBoundary,
  nonlinearSolutionRing,
  peftLoraIntro,
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
  quantizationOverview,
  quantizationFp16,
  quantizationInt8,
  quantizationNf4,
  ragAnswerWithSources,
  ragChromadbMinimal,
  ragChunking,
  ragEmbeddings,
  ragEvaluation,
  ragExercise,
  ragIngestion,
  ragLangchainModern,
  ragLangchainVsLlamaindex,
  ragLlamaindexModern,
  ragMentalModel,
  ragProblem,
  ragProductionChecklist,
  ragPromptAssembly,
  ragRetrieval,
  ragVectordb,

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

