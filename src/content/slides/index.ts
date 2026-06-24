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
import { responseFormatJsonSchema } from './response-format-json-schema';
import { toolCallingProcessos } from './tool-calling-processos';
import { treeOfThoughts } from './tree-of-thoughts';
import { zeroShotPrompting } from './zero-shot-prompting';
import { inferenceE2e } from './inference-e2e';
import { inferenceComparison } from './inference-comparison';
import { llamaCppIntro } from './llama-cpp-intro';
import { llamaCppServer } from './llama-cpp-server';
import { llamaCppOffload } from './llama-cpp-offload';
import { browserInferenceWhy } from './browser-inference-why';
import { transformersJsIntro } from './transformers-js-intro';
import { webgpuDeepDive } from './webgpu-deep-dive';
import { webllmInBrowser } from './webllm-in-browser';
import { inferenceEnginesWhy } from './inference-engines-why';
import { inferenceExercise } from './inference-exercise';
import { onnxOptimization } from './onnx-optimization';
import { openaiApiStandard } from './openai-api-standard';
import { orpoIntro } from './orpo-intro';
import { sglangDeepDive } from './sglang-deep-dive';
import { sglangIntro } from './sglang-intro';
import { streamingMode } from './streaming-mode';
import { transformersPipeline } from './transformers-pipeline';
import { transformersServer } from './transformers-server';
import { llmServeClient } from './llm-serve-client';
import { llmServeStreaming } from './llm-serve-streaming';
import { llmServeProblem } from './llm-serve-problem';
import { llmServeTransformers } from './llm-serve-transformers';
import { vllmDeepDive } from './vllm-deep-dive';
import { vllmIntro } from './vllm-intro';
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
import { quantizationFp8 } from './quantization-fp8';
import { quantizationFp16 } from './quantization-fp16';
import { quantizationInt8 } from './quantization-int8';
import { quantizationNf4 } from './quantization-nf4';
import { quantizationOverview } from './quantization-overview';
import { quantizationSetup } from './quantization-setup';
import { quantizationTheoryFormula } from './quantization-theory-formula';
import { quantizationTheoryWhy } from './quantization-theory-why';
import { bitsandbytesIntro } from './bitsandbytes-intro';
import { sentenceTransformersIntro } from './sentence-transformers-intro';
import { ragIntroChromadb } from './rag-intro-chromadb';

import { systemPromptIntro } from './system-prompt-intro';
import { dpoInPractice } from './dpo-in-practice';
import { dpoMetrics } from './dpo-metrics';
import { preferenceAlignmentRlhf } from './preference-alignment-rlhf';
import { sftBeforeAfter } from './sft-before-after';
import { sftDataFormat } from './sft-data-format';
import { sftFullConfig } from './sft-full-config';
import { sftFullFinetuning } from './sft-full-finetuning';
import { sftLoraMerge } from './sft-lora-merge';
import { sftLoraPeft } from './sft-lora-peft';
import { sftMetrics } from './sft-metrics';
import { sftPeftFreeze } from './sft-peft-freeze';
import { sftTrlTrain } from './sft-trl-train';
import { sftWhy } from './sft-why';
import { chatmlAnatomy } from './chatml-anatomy';
import { chatmlProblem } from './chatml-problem';
import { applyChatTemplateQwen } from './apply-chat-template-qwen';
import { pipelineQwen } from './pipeline-qwen';
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
import { reasoningTokenize } from './reasoning-tokenize';
import { reasoningWhy } from './reasoning-why';
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
import { visionMmprojLlamaCpp } from './vision-mmproj-llama-cpp';


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
  pipelineQwen,
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
  responseFormatJsonSchema,
  toolCallingProcessos,
  // Reasoning/Thinking section
  reasoningTokenize,
  reasoningWhy,
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
  visionMmprojLlamaCpp,
  sftWhy,
  sftDataFormat,
  syntheticDataIntro,
  syntheticDataPipeline,
  syntheticDataTaxonomy,
  syntheticDataDemo,
  syntheticDataValdoria,
  sftFullFinetuning,
  sftFullConfig,
  sftMetrics,
  sftPeftFreeze,
  sftLoraPeft,
  sftTrlTrain,
  sftLoraMerge,
  sftBeforeAfter,
  preferenceAlignmentRlhf,
  dpoInPractice,
  dpoMetrics,
  orpoIntro,
  treeOfThoughts,
  zeroShotPrompting,
  inferenceE2e,
  inferenceComparison,
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
  transformersPipeline,
  llmServeClient,
  llmServeStreaming,
  llamaCppIntro,
  llamaCppServer,
  llamaCppOffload,
  llmServeProblem,
  llmServeTransformers,
  transformersServer,
  vllmDeepDive,
  vllmIntro,
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
  quantizationSetup,
  quantizationTheoryWhy,
  quantizationTheoryFormula,
  quantizationFp16,
  quantizationFp8,
  quantizationInt8,
  quantizationNf4,
  bitsandbytesIntro,
  sentenceTransformersIntro,
  ragIntroChromadb,

  systemPromptIntro,
  jinjaIntro,
  jinjaChatmlPractice,
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
