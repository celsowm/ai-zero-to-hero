import type { IContent, Language, SlideType } from './base';
import type {
  ApiLatencyGrowthVisualCopy,
  InferenceDiagramCopy,
  LearningLoopDiagramCopy,
  LocalizedImageCopy,
  MachineLearningPipelineCopy,
  WelcomeSynthwaveCopy,
} from './ai-core';
import type {
  GradientDescentVisualCopy,
  LinearRegression3DChartVisualCopy,
  LinearRegressionNotationVisualCopy,
  LinearRegressionSimpleLineCopy,
  LinearRegressionTabsCopy,
  ProgressStepperVisualCopy,
} from './linear-regression';
import type { PythonPrereqTabsVisualCopy } from './python-prereq';
import type { NonlinearRegressionBoundaryVisualCopy, NonlinearSolutionRingVisualCopy } from './nonlinear-regression';
import type {
  BigramCounterCopy,
  ContextWindowSliderCopy,
  CrossEntropyChartCopy,
  EmbeddingSpace3DCopy,
  LanguageModelingDiagramCopy,
  MlpTextDiagramCopy,
  NextTokenInteractiveCopy,
  NeuralNetworkToLanguageModelingComparatorCopy,
  SamplingRouletteCopy,
  SoftmaxVisualizerCopy,
  TokenizationVisualizerCopy,
  TokenSizeComparisonCopy,
  TrainingLoopStepperCopy,
  TrainingLoopAnimationCopy,
} from './language-models';
import type {
  BPEFrequencyTableCopy,
  BPEMergeStackCopy,
  BPETrainingCurveCopy,
  TokenGranularitySliderCopy,
  TokenLevelComparisonCopy,
} from './bpe-tokenization';
import type {
  AttentionLinesDiagramCopy,
  AttentionVsMlpCopy,
  AutoClassResolverCopy,
  CausalMaskMatrixCopy,
  DataCollatorVisualizerCopy,
  Fp16OverflowExplorerCopy,
  Gpt2BlackboxDiagramCopy,
  Gpt2FullArchitectureDiagramCopy,
  Gpt2LayerXrayCopy,
  Gpt2PytorchE2eDebuggerCopy,
  HiddenStatesToLogitsCopy,
  Int8OutlierDetectorCopy,
  LayerEvolutionChartCopy,
  LoraDiagramCopy,
  MultiheadDiagramCopy,
  Nf4QuantileVisualizerCopy,
  ParallelPredictionDiagramCopy,
  PipelineFlowDiagramCopy,
  PositionalEmbeddingAdderCopy,
  PredictionEvolutionCopy,
  QkvCocktailPartyCopy,
  QkvIntuitionExplorerCopy,
  QuantizationComparatorCopy,
  ResidualStreamHighwayCopy,
  RoadToMiniTransformerCopy,
  SamplingControlsCopy,
  BuildGpt2ModelCopy,
  SftIntroCopy,
  RagMemoryLimitVisualCopy,
  RagHallucinationVisualCopy,
  RagIntroVisualCopy,
  RagArchitectureVisualCopy,
  RagEmbeddingVisualCopy,
  RagVectorSearchVisualCopy,
  RagContextInjectionVisualCopy,
  RagFromScratchVisualCopy,
  ChromadbIndexVisualCopy,
  ChromadbSearchVisualCopy,
  ChromadbRagE2eVisualCopy,
  TemperatureSliderInteractiveCopy,
  MoeRouterSimulatorCopy,
  MoeRouterExplorerCopy,
  MoeGatingMathVisualCopy,
  MoeCapacityVisualCopy,
  LlamaCppQuantExplorerCopy,
  OffloadSimulatorCopy,
  RoPEExplorerCopy,
  LlamaComparisonTableCopy,
  BrowserInferenceComparisonCopy,
  WebGPUExplorerCopy,
  WebLLMSimulatorCopy,
  TransformerBlockDiagramCopy,
  TransformerOverviewTeaserCopy,
  UnembeddingDiagramCopy,
  WhyTransformersWorkCopy,
} from './transformers';
import type {
  ActivationFunctionsComparatorCopy,
  ArchitectureComparatorCopy,
  BackpropSignalFlowVisualCopy,
  BiologicalVsComputationalNeuronCopy,
  DerivativeRampExplorerCopy,
  FeedforwardFlowVisualCopy,
  NeuralNetworkTabsStepperCopy,
  NeuralNetworkStepDebuggerVisualCopy,
  NeuronArchitectureAnimatedCopy,
  SigmoidDeepDiveExplorerCopy,
  SigmoidDerivativeExplorerCopy,
  Tensor3DExplorerCopy,
  WeightsBiasesExplorerCopy,
} from './neural-networks';
import type { TransformersJsPlaygroundCopy } from './inference-engines';
import type { PythonExerciseVisualCopy } from './exercise';
import type { ClassificationProblemCopy } from './classification-problem';
import type {
  LlamaIndexWhyCopy,
  LlamaIndexCoreConceptsCopy,
  LlamaIndexDataLoadersCopy,
  LlamaIndexPipelineVisualCopy,
  LlamaIndexRetrieversCopy,
  LlamaIndexQueryEnginesCopy,
  LlamaIndexChatEngineCopy,
  LlamaIndexAgentsCopy,
  LlamaIndexE2eCopy,
} from './llamaindex';
import type {
  LangchainWhyCopy,
  LangchainCoreConceptsCopy,
  LangchainPromptTemplatesCopy,
  LangchainChainsCopy,
  LangchainToolsCopy,
  LangchainAgentsDeepDiveCopy,
  LangchainRagLangchainCopy,
  LangchainMemoryCopy,
  LangchainE2eCopy,
} from './langchain';
import type {
  InferenceEnginesWhyCopy,
  TransformersPipelineCopy,
  TransformersServerCopy,
  OpenaiApiStandardCopy,
  StreamingModeCopy,
  OnnxOptimizationCopy,
  VllmIntroCopy,
  VllmDeepDiveCopy,
  SglangIntroCopy,
  SglangDeepDiveCopy,
  InferenceComparisonCopy,
  InferenceE2eCopy,
} from './inference-engines';
import type {
  ToolCallingWhyCopy,
  ToolCallingConceptsCopy,
  ToolDeclarationCopy,
  ToolCallingFlowCopy,
  ParallelToolCallsCopy,
  ToolCallingErrorsCopy,
  MultiToolOrchestrationCopy,
  ToolCallingBestPracticesCopy,
  ToolCallingE2eCopy,
} from './tool-calling';
import type {
  PromptEngineeringWhyCopy,
  PromptStructureAnatomyCopy,
  ZeroShotPromptingCopy,
  FewShotPromptingCopy,
  ManyShotPromptingCopy,
  ChainOfThoughtCopy,
  TreeOfThoughtsCopy,
  PromptChainingPatternsCopy,
  RealDatasetsPromptsCopy,
} from './prompt-engineering';
import type {
  MarkdownOutputCompareCopy,
  MarkdownSyntaxVisualCopy,
} from './markdown';

// ── Visual registry: maps each visual id to its copy type ──────────────────

interface VisualCopyMap {
  // inference / learning
  'inference-diagram': InferenceDiagramCopy;
  'learning-loop-diagram': LearningLoopDiagramCopy;
  // localized image
  'localized-image': LocalizedImageCopy;
  // machine learning pipeline
  'machine-learning-pipeline': MachineLearningPipelineCopy;
  // nonlinear regression
  'nonlinear-regression-boundary': NonlinearRegressionBoundaryVisualCopy;
  'nonlinear-solution-ring': NonlinearSolutionRingVisualCopy;
  // api latency
  'api-latency-growth': ApiLatencyGrowthVisualCopy;
  // linear regression
  'linear-regression-tabs': LinearRegressionTabsCopy;
  'python-prereq-tabs': PythonPrereqTabsVisualCopy;
  'linear-regression-simple-line': LinearRegressionSimpleLineCopy;
  'gradient-descent-3d': GradientDescentVisualCopy;
  'linear-regression-notation': LinearRegressionNotationVisualCopy;
  'linear-regression-3d-chart': LinearRegression3DChartVisualCopy;
  // stepper
  'progress-stepper': ProgressStepperVisualCopy;
  // language models
  'language-modeling-diagram': LanguageModelingDiagramCopy;
  'next-token-interactive': NextTokenInteractiveCopy;
  'token-size-comparison': TokenSizeComparisonCopy;
  'tokenization-visualizer': TokenizationVisualizerCopy;
  'bigram-counter': BigramCounterCopy;
  'softmax-visualizer': SoftmaxVisualizerCopy;
  'sampling-roulette': SamplingRouletteCopy;
  'cross-entropy-chart': CrossEntropyChartCopy;
  'embedding-space-3d': EmbeddingSpace3DCopy;
  'context-window-slider': ContextWindowSliderCopy;
  'mlp-text-diagram': MlpTextDiagramCopy;
  'training-loop-stepper': TrainingLoopStepperCopy;
  'training-loop-animation': TrainingLoopAnimationCopy;
  'neural-network-to-language-modeling-comparator': NeuralNetworkToLanguageModelingComparatorCopy;
  // transformers
  'gpt2-blackbox-diagram': Gpt2BlackboxDiagramCopy;
  'transformer-overview-teaser': TransformerOverviewTeaserCopy;
  'parallel-prediction-diagram': ParallelPredictionDiagramCopy;
  'positional-embedding-adder': PositionalEmbeddingAdderCopy;
  'transformer-block-diagram': TransformerBlockDiagramCopy;
  'causal-mask-matrix': CausalMaskMatrixCopy;
  'qkv-cocktail-party': QkvCocktailPartyCopy;
  'qkv-intuition-explorer': QkvIntuitionExplorerCopy;
  'attention-lines-diagram': AttentionLinesDiagramCopy;
  'multihead-diagram': MultiheadDiagramCopy;
  'residual-stream-highway': ResidualStreamHighwayCopy;
  'attention-vs-mlp': AttentionVsMlpCopy;
  'hidden-states-to-logits': HiddenStatesToLogitsCopy;
  'sampling-controls': SamplingControlsCopy;
  'gpt2-layer-by-layer-xray': Gpt2LayerXrayCopy;
  'gpt2-pytorch-e2e-debugger': Gpt2PytorchE2eDebuggerCopy;
  'prediction-evolution-we-the-people': PredictionEvolutionCopy;
  'why-transformers-work-so-well': WhyTransformersWorkCopy;
  'road-to-mini-transformer': RoadToMiniTransformerCopy;
  'pipeline-flow-diagram': PipelineFlowDiagramCopy;
  'sft-intro': SftIntroCopy;
  'build-gpt2-model': BuildGpt2ModelCopy;
  // rag
  'rag-memory-limit-visual': RagMemoryLimitVisualCopy;
  'rag-hallucination-visual': RagHallucinationVisualCopy;
  'rag-intro-visual': RagIntroVisualCopy;
  'rag-architecture-visual': RagArchitectureVisualCopy;
  'rag-embedding-visual': RagEmbeddingVisualCopy;
  'rag-vector-search-visual': RagVectorSearchVisualCopy;
  'rag-context-injection-visual': RagContextInjectionVisualCopy;
  'rag-from-scratch-visual': RagFromScratchVisualCopy;
  // chromadb (vectorDB + transformers)
  'chromadb-index-visual': ChromadbIndexVisualCopy;
  'chromadb-search-visual': ChromadbSearchVisualCopy;
  'chromadb-rag-e2e-visual': ChromadbRagE2eVisualCopy;
  // llamaindex
  'llamaindex-why-visual': LlamaIndexWhyCopy;
  'llamaindex-core-concepts-visual': LlamaIndexCoreConceptsCopy;
  'llamaindex-data-loaders-visual': LlamaIndexDataLoadersCopy;
  'llamaindex-pipeline-visual': LlamaIndexPipelineVisualCopy;
  'llamaindex-retrievers-visual': LlamaIndexRetrieversCopy;
  'llamaindex-query-engines-visual': LlamaIndexQueryEnginesCopy;
  'llamaindex-chat-engine-visual': LlamaIndexChatEngineCopy;
  'llamaindex-agents-visual': LlamaIndexAgentsCopy;
  'llamaindex-e2e-visual': LlamaIndexE2eCopy;
  // langchain
  'langchain-why-visual': LangchainWhyCopy;
  'langchain-core-concepts-visual': LangchainCoreConceptsCopy;
  'langchain-prompt-templates-visual': LangchainPromptTemplatesCopy;
  'langchain-chains-visual': LangchainChainsCopy;
  'langchain-tools-visual': LangchainToolsCopy;
  'langchain-agents-deep-dive-visual': LangchainAgentsDeepDiveCopy;
  'langchain-rag-langchain-visual': LangchainRagLangchainCopy;
  'langchain-memory-visual': LangchainMemoryCopy;
  'langchain-e2e-visual': LangchainE2eCopy;
  // inference-engines
  'inference-engines-why-visual': InferenceEnginesWhyCopy;
  'transformers-pipeline-visual': TransformersPipelineCopy;
  'transformers-server-visual': TransformersServerCopy;
  'openai-api-standard-visual': OpenaiApiStandardCopy;
  'streaming-mode-visual': StreamingModeCopy;
  'onnx-optimization-visual': OnnxOptimizationCopy;
  'vllm-intro-visual': VllmIntroCopy;
  'vllm-deep-dive-visual': VllmDeepDiveCopy;
  'sglang-intro-visual': SglangIntroCopy;
  'sglang-deep-dive-visual': SglangDeepDiveCopy;
  'inference-comparison-visual': InferenceComparisonCopy;
  'inference-e2e-visual': InferenceE2eCopy;
  // tool-calling
  'tool-calling-why-visual': ToolCallingWhyCopy;
  'tool-calling-concepts-visual': ToolCallingConceptsCopy;
  'tool-declaration-visual': ToolDeclarationCopy;
  'tool-calling-flow-visual': ToolCallingFlowCopy;
  'parallel-tool-calls-visual': ParallelToolCallsCopy;
  'tool-calling-errors-visual': ToolCallingErrorsCopy;
  'multi-tool-orchestration-visual': MultiToolOrchestrationCopy;
  'tool-calling-best-practices-visual': ToolCallingBestPracticesCopy;
  'tool-calling-e2e-visual': ToolCallingE2eCopy;
  // prompt engineering
  'prompt-engineering-why-visual': PromptEngineeringWhyCopy;
  'prompt-structure-anatomy-visual': PromptStructureAnatomyCopy;
  'zero-shot-prompting-visual': ZeroShotPromptingCopy;
  'few-shot-prompting-visual': FewShotPromptingCopy;
  'many-shot-prompting-visual': ManyShotPromptingCopy;
  'chain-of-thought-visual': ChainOfThoughtCopy;
  'tree-of-thoughts-visual': TreeOfThoughtsCopy;
  'prompt-chaining-patterns-visual': PromptChainingPatternsCopy;
  'real-datasets-prompts-visual': RealDatasetsPromptsCopy;
  // markdown
  'markdown-output-compare': MarkdownOutputCompareCopy;
  'markdown-syntax-visual': MarkdownSyntaxVisualCopy;
  // hf transformers advanced
  'auto-class-resolver': AutoClassResolverCopy;
  'data-collator-visualizer': DataCollatorVisualizerCopy;
  'lora-diagram': LoraDiagramCopy;
  'quantization-comparator': QuantizationComparatorCopy;
  // quantization interactive visuals
  'fp16-overflow-explorer': Fp16OverflowExplorerCopy;
  'int8-outlier-detector': Int8OutlierDetectorCopy;
  'nf4-quantile-visualizer': Nf4QuantileVisualizerCopy;
  // neural networks
  'neuron-architecture-animated': NeuronArchitectureAnimatedCopy;
  'activation-functions-comparator': ActivationFunctionsComparatorCopy;
  'sigmoid-deep-dive-explorer': SigmoidDeepDiveExplorerCopy;
  'sigmoid-derivative-explorer': SigmoidDerivativeExplorerCopy;
  'feedforward-flow-visual': FeedforwardFlowVisualCopy;
  'backprop-signal-flow': BackpropSignalFlowVisualCopy;
  'biological-vs-computational-neuron': BiologicalVsComputationalNeuronCopy;
  'neural-network-step-debugger': NeuralNetworkStepDebuggerVisualCopy;
  'neural-network-tabs-stepper': NeuralNetworkTabsStepperCopy;
  'architecture-comparator': ArchitectureComparatorCopy;
  'tensor-3d-explorer': Tensor3DExplorerCopy;
  'derivative-ramp-explorer': DerivativeRampExplorerCopy;
  'weights-biases-explorer': WeightsBiasesExplorerCopy;
  // classification problem
  'classification-problem': ClassificationProblemCopy;
  // python exercise
  'python-exercise': PythonExerciseVisualCopy;
  // welcome
  'welcome-synthwave': WelcomeSynthwaveCopy;
  // bpe tokenization
  'token-level-comparison': TokenLevelComparisonCopy;
  'token-granularity-slider': TokenGranularitySliderCopy;
  'bpe-frequency-table': BPEFrequencyTableCopy;
  'bpe-merge-stack': BPEMergeStackCopy;
  'bpe-training-curve': BPETrainingCurveCopy;
  // placeholder / future visuals (temporary — replace with proper copy types when implemented)
  'unembedding-diagram': UnembeddingDiagramCopy;
  'temperature-slider-interactive': TemperatureSliderInteractiveCopy;
  'moe-router-simulator': MoeRouterSimulatorCopy;
  'moe-router-explorer': MoeRouterExplorerCopy;
  'moe-gating-math-visual': MoeGatingMathVisualCopy;
  'moe-capacity-visual': MoeCapacityVisualCopy;
  'llama-cpp-quant-explorer': LlamaCppQuantExplorerCopy;
  'offload-simulator': OffloadSimulatorCopy;
  'rope-explorer': RoPEExplorerCopy;
  'llama-comparison-table': LlamaComparisonTableCopy;
  'browser-inference-comparison': BrowserInferenceComparisonCopy;
  'transformers-js-playground': TransformersJsPlaygroundCopy;
  'webgpu-explorer': WebGPUExplorerCopy;
  'webllm-simulator': WebLLMSimulatorCopy;
  'gpt2-full-architecture-diagram': Gpt2FullArchitectureDiagramCopy;
  'layer-evolution-chart': LayerEvolutionChartCopy;
  'transformer-scaling-chart': WelcomeSynthwaveCopy;
}

// ── Generated SlideVisual union from the registry ──────────────────────────

/**
 * SlideVisual is derived from VisualCopyMap — one union member per visual id.
 * Adding a new visual requires only adding an entry to VisualCopyMap above.
 */
export type SlideVisual = {
  [K in keyof VisualCopyMap]: {
    id: K;
    copy: Record<Language, VisualCopyMap[K]>;
  };
}[keyof VisualCopyMap];

// ── Convenience: extract copy type for a given visual id ───────────────────

/** Usage: `type MyCopy = VisualCopyForId<'my-visual-id'>` */
export type VisualCopyForId<T extends keyof VisualCopyMap> = VisualCopyMap[T];

// ── Slide options and ISlide ───────────────────────────────────────────────

export interface SlideOptions {
  columns?: number;
  columnRatios?: [number, number];
  codeLanguage?: string;
  animation?: string;
}

export interface ISlide {
  id: string;
  type: SlideType;
  content: Record<Language, IContent>;
  visual?: SlideVisual;
  options?: SlideOptions;
}
