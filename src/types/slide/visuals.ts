import type { CodeTabsCopy, IContent, Language, SlideType } from './base';
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
  EmbeddingSpace3DInteractiveCopy,
  SiliconComputeVisualCopy,
  PyTorchPerformanceVisualCopy,
  LanguageModelingDiagramCopy,
  MlpTextDiagramCopy,
  NextTokenInteractiveCopy,
  NeuralNetworkToLanguageModelingComparatorCopy,
  PytorchArchitectureBlueprintCopy,
  PytorchBridgeShiftCopy,
  PytorchDecisionMatrixCopy,
  PytorchDualPanelCopy,
  PytorchDualCodeCopy,
  PytorchExecutionPipelineCopy,
  PytorchEcosystemMermaidCopy,
  PytorchProjectionSpaceCopy,
  PytorchRuntimePlaybookCopy,
  PytorchShapeTraceFlowCopy,
  EmbeddingIntroVisualCopy,
  TokenBatchShiftVisualCopy,
  SamplingRouletteCopy,
  SoftmaxVisualizerCopy,
  TokenizationVisualizerCopy,
  TokenSizeComparisonCopy,
  TrainingLoopStepperCopy,
  TrainingLoopAnimationCopy,
  TrainingLoopGraphCopy,
  PytorchAnimatedCodeWalkthroughCopy,
  PytorchCheckpointExplorerCopy,
  OptimizerComparisonChartCopy,
} from './language-models';
import type {
  BPEFrequencyTableCopy,
  BPEMergeStackCopy,
  BPEStepByStepCopy,
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
  Gpt2BlackboxDiagramCopy,
  Gpt2BlockAnatomyCopy,
  Gpt2EmbeddingResidualCopy,
  Gpt2FamilyTreeCopy,
  Gpt2FullArchitectureDiagramCopy,
  Gpt2AttentionQkvXrayCopy,
  SystemPromptExplorerCopy,
  WeightsTreeVisualCopy,
  Gpt2LayerXrayCopy,
  HiddenStatesToLogitsCopy,
  LayerEvolutionChartCopy,
  LoraDiagramCopy,
  PeftFreezeDiagramCopy,
  MultiheadDiagramCopy,
  QuantizationTabsCopy,
  SftWeightUpdateDiagramCopy,
  DpoPreferenceStepperCopy,
  QuantizationTheoryCopy,
  QuantizationSetupCopy,
  BitsandbytesIntroCopy,
  QuantizationMemoryBarCopy,
  QuantizationFp16Copy,
  QuantizationInt8Copy,
  QuantizationNf4Copy,
  QuantizationTheoryWhyCopy,
  QuantizationFp8Copy,
  ParallelPredictionDiagramCopy,
  PipelineFlowDiagramCopy,
  PositionalEmbeddingAdderCopy,
  PredictionEvolutionCopy,
  QkvCocktailPartyCopy,
  ResidualStreamHighwayCopy,
  BuildGpt2ModelCopy,
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
  SyntheticDataIntroVisualCopy,
  SyntheticDataNegativesVisualCopy,
  SyntheticDataPipelineVisualCopy,
  SyntheticDataTaxonomyVisualCopy,
  SyntheticDataValdoriaVisualCopy,
} from './synthetic-data';
import type {
  ActivationFunctionsComparatorCopy,
  ArchitectureComparatorCopy,
  BackpropSignalFlowVisualCopy,
  BiologicalVsComputationalNeuronCopy,
  DerivativeRampExplorerCopy,
  FeedforwardFlowVisualCopy,
  LanguageModelingShapeFlowCopy,
  NeuralNetworkTabsStepperCopy,
  NeuralNetworkStepDebuggerVisualCopy,
  NeuronArchitectureAnimatedCopy,
  SequentialShapeFlowCopy,
  SigmoidDeepDiveExplorerCopy,
  SigmoidDerivativeExplorerCopy,
  Tensor3DExplorerCopy,
  WeightsBiasesExplorerCopy,
  BceLossCurveCopy,
  OptimizerTrajectoryVisualCopy,
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
  LlmServeTransformersCopy,
} from './inference-engines';
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
  JinjaIntroVisualCopy,
  JinjaChatmlPracticeVisualCopy,
} from './markdown';
import type {
  AgenteInActionCopy,
  AgentAnatomyCopy,
  AgentLoopVisualCopy,
  AgentMemoryVisualCopy,
  AgentPlanningVisualCopy,
  ReActFlowVisualCopy,
  MultiAgentVisualCopy,
  AgentFrameworksVisualCopy,
  MCPVisualCopy,
  AgentPitfallsVisualCopy,
} from './intelligent-agents';

// â”€â”€ Visual registry: maps each visual id to its copy type â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
  'embedding-space-3d-interactive': EmbeddingSpace3DInteractiveCopy;
  'silicon-compute': SiliconComputeVisualCopy;
  'pytorch-performance': PyTorchPerformanceVisualCopy;
  'pytorch-autograd': PyTorchPerformanceVisualCopy;
  'context-window-slider': ContextWindowSliderCopy;
  'mlp-text-diagram': MlpTextDiagramCopy;
  'training-loop-stepper': TrainingLoopStepperCopy;
  'training-loop-animation': TrainingLoopAnimationCopy;
  'neural-network-to-language-modeling-comparator': NeuralNetworkToLanguageModelingComparatorCopy;
  'pytorch-architecture-blueprint': PytorchArchitectureBlueprintCopy;
  'pytorch-projection-space': PytorchProjectionSpaceCopy;
  'pytorch-ecosystem-mermaid': PytorchEcosystemMermaidCopy;
  'pytorch-gpt2-pipeline-mermaid': PytorchEcosystemMermaidCopy;
  'pytorch-runtime-playbook': PytorchRuntimePlaybookCopy;
  'pytorch-bridge-shift': PytorchBridgeShiftCopy;
  'pytorch-decision-matrix': PytorchDecisionMatrixCopy;
  'pytorch-dual-panel': PytorchDualPanelCopy;
  'pytorch-dual-code': PytorchDualCodeCopy;
  'pytorch-execution-pipeline': PytorchExecutionPipelineCopy;
  'optimizer-comparison-chart': OptimizerComparisonChartCopy;
  'pytorch-autograd-3d': PytorchAnimatedCodeWalkthroughCopy;
  'pytorch-shape-trace-flow': PytorchShapeTraceFlowCopy;
  'pytorch-embedding-intro': EmbeddingIntroVisualCopy;
  'pytorch-training-loop-graph': TrainingLoopGraphCopy;
  'pytorch-checkpoint-explorer': PytorchCheckpointExplorerCopy;
  'token-batch-shift-interactive': TokenBatchShiftVisualCopy;
  // transformers
  'gpt2-blackbox-diagram': Gpt2BlackboxDiagramCopy;
  'gpt2-embedding-residual': Gpt2EmbeddingResidualCopy;
  'gpt2-block-anatomy': Gpt2BlockAnatomyCopy;
  'gpt2-family-tree': Gpt2FamilyTreeCopy;
  'weights-tree-visual': WeightsTreeVisualCopy;
  'transformer-overview-teaser': TransformerOverviewTeaserCopy;
  'parallel-prediction-diagram': ParallelPredictionDiagramCopy;
  'positional-embedding-adder': PositionalEmbeddingAdderCopy;
  'transformer-block-diagram': TransformerBlockDiagramCopy;
  'causal-mask-matrix': CausalMaskMatrixCopy;
  'qkv-cocktail-party': QkvCocktailPartyCopy;
  'attention-lines-diagram': AttentionLinesDiagramCopy;
  'multihead-diagram': MultiheadDiagramCopy;
  'residual-stream-highway': ResidualStreamHighwayCopy;
  'attention-vs-mlp': AttentionVsMlpCopy;
  'hidden-states-to-logits': HiddenStatesToLogitsCopy;
  'gpt2-layer-by-layer-xray': Gpt2LayerXrayCopy;
  'gpt2-attention-qkv-xray': Gpt2AttentionQkvXrayCopy;
  'prediction-evolution-we-the-people': PredictionEvolutionCopy;
  'why-transformers-work-so-well': WhyTransformersWorkCopy;
  'pipeline-flow-diagram': PipelineFlowDiagramCopy;
  'synthetic-data-intro-visual': SyntheticDataIntroVisualCopy;
  'synthetic-data-pipeline-visual': SyntheticDataPipelineVisualCopy;
  'synthetic-data-taxonomy-visual': SyntheticDataTaxonomyVisualCopy;
  'synthetic-data-demo-visual': SyntheticDataNegativesVisualCopy;
  'synthetic-data-valdoria-visual': SyntheticDataValdoriaVisualCopy;
  'system-prompt-explorer': SystemPromptExplorerCopy;
  'dpo-preference-stepper': DpoPreferenceStepperCopy;
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
  'llm-serve-transformers-visual': LlmServeTransformersCopy;
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
  // jinja
  'jinja-intro-visual': JinjaIntroVisualCopy;
  'jinja-chatml-practice-visual': JinjaChatmlPracticeVisualCopy;
  // hf transformers advanced
  'auto-class-resolver': AutoClassResolverCopy;
  'data-collator-visualizer': DataCollatorVisualizerCopy;
  'sft-weight-update-diagram': SftWeightUpdateDiagramCopy;
  'peft-freeze-diagram': PeftFreezeDiagramCopy;
  'lora-diagram': LoraDiagramCopy;
  // quantization tabs (generic)
  'quantization-tabs': QuantizationTabsCopy;
  // quantization theory (math deep-dive, no tabs)
  'quantization-theory': QuantizationTheoryCopy;
  // quantization setup
  'quantization-setup': QuantizationSetupCopy;
  // bitsandbytes intro
  'bitsandbytes-intro': BitsandbytesIntroCopy;
  // quantization overview memory bar
  'quantization-memory-bar': QuantizationMemoryBarCopy;
  // fp16 bit layout
  'quantization-fp16-bits': QuantizationFp16Copy;
  // int8 outlier distribution
  'quantization-int8-outliers': QuantizationInt8Copy;
  // nf4 quantile levels
  'quantization-nf4-levels': QuantizationNf4Copy;
  // quantization theory why (motivation, no formula)
  'quantization-theory-why': QuantizationTheoryWhyCopy;
  // fp8 (E4M3 vs E5M2) bit layout
  'quantization-fp8': QuantizationFp8Copy;
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
  'sequential-shape-flow': SequentialShapeFlowCopy;
  'language-modeling-shape-flow': LanguageModelingShapeFlowCopy;
  'tensor-3d-explorer': Tensor3DExplorerCopy;
  'derivative-ramp-explorer': DerivativeRampExplorerCopy;
  'weights-biases-explorer': WeightsBiasesExplorerCopy;
  'bce-loss-curve': BceLossCurveCopy;
  'optimizer-trajectory-visual': OptimizerTrajectoryVisualCopy;
  // classification problem
  'classification-problem': ClassificationProblemCopy;
  // python exercise
  'python-exercise': PythonExerciseVisualCopy;
  // welcome
  'welcome-synthwave': WelcomeSynthwaveCopy;
  // generic code tabs (tabs + code panels)
  'code-tabs': CodeTabsCopy;
  // bpe tokenization
  'token-level-comparison': TokenLevelComparisonCopy;
  'token-granularity-slider': TokenGranularitySliderCopy;
  'bpe-frequency-table': BPEFrequencyTableCopy;
  'bpe-merge-stack': BPEMergeStackCopy;
  'bpe-training-curve': BPETrainingCurveCopy;
  'bpe-step-by-step': BPEStepByStepCopy;
  // placeholder / future visuals (temporary â€” replace with proper copy types when implemented)
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
  // intelligent agents
  'agente-in-action': AgenteInActionCopy;
  'agent-anatomy': AgentAnatomyCopy;
  'agent-loop': AgentLoopVisualCopy;
  'agent-memory': AgentMemoryVisualCopy;
  'agent-planning': AgentPlanningVisualCopy;
  'react-flow': ReActFlowVisualCopy;
  'multi-agent': MultiAgentVisualCopy;
  'agent-frameworks': AgentFrameworksVisualCopy;
  'mcp': MCPVisualCopy;
  'agent-pitfalls': AgentPitfallsVisualCopy;
}

// â”€â”€ Generated SlideVisual union from the registry â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * SlideVisual is derived from VisualCopyMap â€” one union member per visual id.
 * Adding a new visual requires only adding an entry to VisualCopyMap above.
 */
export type SlideVisual = {
  [K in keyof VisualCopyMap]: {
    id: K;
    copy: Record<Language, VisualCopyMap[K]>;
  };
}[keyof VisualCopyMap];

// â”€â”€ Convenience: extract copy type for a given visual id â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/** Usage: `type MyCopy = VisualCopyForId<'my-visual-id'>` */
export type VisualCopyForId<T extends keyof VisualCopyMap> = VisualCopyMap[T];

// â”€â”€ Slide options and ISlide â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

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
