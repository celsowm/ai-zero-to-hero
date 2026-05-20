import React from 'react';
import type { Language } from '../types/slide';

import type { PythonExerciseVisualCopy } from '../types/slide';

export interface VisualRenderProps {
  visual: { id: string; copy: unknown };
  language: Language;
}

export type VisualComponent = React.FC<VisualRenderProps>;

const visualRegistry: Record<string, React.LazyExoticComponent<VisualComponent>> = {};

function registerVisual(id: string, component: React.LazyExoticComponent<VisualComponent>) {
  visualRegistry[id] = component;
}

/**
 * Mapping from visual ID → exported component name in the barrel file.
 * Add a new entry here to register a visual — no boilerplate blocks needed.
 */
const visualMap: Record<string, string> = {
  // inference / learning
  'inference-diagram': 'InferenceDiagram',
  'learning-loop-diagram': 'LearningLoopDiagram',

  // localized image
  'localized-image': 'LocalizedImageVisual',

  // machine learning pipeline
  'machine-learning-pipeline': 'MachineLearningPipelineDiagram',

  // nonlinear regression
  'nonlinear-regression-boundary': 'NonlinearRegressionBoundaryVisual',
  'nonlinear-solution-ring': 'NonlinearSolutionRingVisual',

  // api latency
  'api-latency-growth': 'ApiLatencyGrowthVisual',

  // linear regression
  'linear-regression-tabs': 'LinearRegressionTabsVisual',
  'linear-regression-simple-line': 'LinearRegressionSimpleLineVisual',
  'linear-regression-notation': 'LinearRegressionNotationVisual',
  'linear-regression-3d-chart': 'LinearRegression3DChartVisual',
  'gradient-descent-3d': 'GradientDescent3DVisual',

  // stepper
  'progress-stepper': 'ProgressStepperVisual',

  // language models
  'language-modeling-diagram': 'LanguageModelingDiagram',
  'next-token-interactive': 'NextTokenInteractive',
  'token-size-comparison': 'TokenSizeComparison',
  'tokenization-visualizer': 'TokenizationVisualizer',
  'bigram-counter': 'BigramCounter',
  'softmax-visualizer': 'SoftmaxVisualizer',
  'sampling-roulette': 'SamplingRoulette',
  'cross-entropy-chart': 'CrossEntropyChart',
  'embedding-space-3d': 'EmbeddingSpace3D',
  'embedding-space-3d-interactive': 'EmbeddingSpace3DInteractive',
  'silicon-compute': 'SiliconComputeVisual',
  'pytorch-performance': 'PyTorchPerformanceVisual',
  'pytorch-autograd': 'PyTorchAutogradVisual',
  'context-window-slider': 'ContextWindowSlider',
  'mlp-text-diagram': 'MlpTextDiagram',
  'training-loop-stepper': 'TrainingLoopStepper',
  'training-loop-animation': 'TrainingLoopAnimation',
  'neural-network-to-language-modeling-comparator': 'NeuralNetworkToLanguageModelingComparator',
  'pytorch-architecture-blueprint': 'PytorchArchitectureBlueprintVisual',
  'pytorch-projection-space': 'PytorchProjectionSpaceVisual',
  'pytorch-bridge-shift': 'PytorchBridgeShiftVisual',
  'pytorch-decision-matrix': 'PytorchDecisionMatrixVisual',
  'pytorch-dual-panel': 'PytorchDualPanel',
  'pytorch-execution-pipeline': 'PytorchExecutionPipelineVisual',
  'pytorch-autograd-3d': 'PytorchAutograd3DVisual',
  'pytorch-runtime-playbook': 'PytorchRuntimePlaybookVisual',
  'pytorch-ecosystem-mermaid': 'PytorchEcosystemMermaidVisual',
  'pytorch-shape-trace-flow': 'PytorchShapeTraceFlow',
  'token-batch-shift-interactive': 'TokenBatchShiftVisual',

  // transformers
  'auto-class-resolver': 'AutoClassResolver',
  'data-collator-visualizer': 'DataCollatorVisualizer',
  'gpt2-full-architecture-diagram': 'Gpt2FullArchitectureDiagram',
  'layer-evolution-chart': 'LayerEvolutionChart',
  'unembedding-diagram': 'UnembeddingDiagram',
  'temperature-slider-interactive': 'TemperatureSliderInteractive',
  'moe-router-simulator': 'MoeRouterSimulator',
  'moe-router-explorer': 'MoeRouterExplorer',
  'moe-gating-math-visual': 'MoeGatingMathVisual',
  'moe-capacity-visual': 'MoeCapacityVisual',
  'llama-cpp-quant-explorer': 'LlamaCppQuantExplorer',
  'offload-simulator': 'OffloadSimulator',
  'rope-explorer': 'RoPEExplorer',
  'llama-comparison-table': 'LlamaComparisonTable',
  'browser-inference-comparison': 'BrowserInferenceComparison',
  'transformers-js-playground': 'TransformersJsPlayground',
  'webgpu-explorer': 'WebGPUExplorer',
  'webllm-simulator': 'WebLLMSimulator',
  'system-prompt-explorer': 'SystemPromptExplorer',
  'gpt2-block-anatomy': 'Gpt2BlockAnatomy',
  'gpt2-blackbox-diagram': 'Gpt2BlackboxDiagram',
  'gpt2-family-tree': 'Gpt2FamilyTree',
  'weights-tree-visual': 'WeightsTreeVisual',
  'transformer-overview-teaser': 'TransformerOverviewTeaser',
  'parallel-prediction-diagram': 'ParallelPredictionDiagram',
  'positional-embedding-adder': 'PositionalEmbeddingAdder',
  'transformer-block-diagram': 'TransformerBlockDiagram',
  'causal-mask-matrix': 'CausalMaskMatrix',
  'qkv-cocktail-party': 'QkvCocktailParty',
  'qkv-intuition-explorer': 'QkvIntuitionExplorer',
  'attention-weight-explorer': 'AttentionWeightExplorer',
  'attention-lines-diagram': 'AttentionLinesDiagram',
  'multihead-diagram': 'MultiheadDiagram',
  'residual-stream-highway': 'ResidualStreamHighway',
  'attention-vs-mlp': 'AttentionVsMlp',
  'hidden-states-to-logits': 'HiddenStatesToLogits',
  'sampling-controls': 'SamplingControls',
  'gpt2-layer-by-layer-xray': 'Gpt2LayerXray',
  'gpt2-pytorch-e2e-debugger': 'Gpt2PytorchE2eDebugger',
  'prediction-evolution-we-the-people': 'PredictionEvolution',
  'why-transformers-work-so-well': 'WhyTransformersWork',
  'road-to-mini-transformer': 'RoadToMiniTransformer',
  'pipeline-flow-diagram': 'PipelineFlowDiagram',
  'sft-intro': 'SftIntro',
  'training-metrics-families-visual': 'TrainingMetricsFamiliesVisual',
  'eval-loss-generalization-visual': 'EvalLossGeneralizationVisual',
  'grad-norm-stability-visual': 'GradNormStabilityVisual',
  'classification-metrics-visual': 'ClassificationMetricsVisual',
  'synthetic-data-demo-visual': 'SyntheticDataDemoVisual',
  'synthetic-data-intro-visual': 'SyntheticDataIntroVisual',
  'synthetic-data-pipeline-visual': 'SyntheticDataPipelineVisual',
  'synthetic-data-taxonomy-visual': 'SyntheticDataTaxonomyVisual',
  'synthetic-data-valdoria-visual': 'SyntheticDataValdoriaVisual',
  'build-gpt2-model': 'BuildGpt2Model',

  // rag
  'rag-memory-limit-visual': 'RagMemoryLimitVisual',
  'rag-hallucination-visual': 'RagHallucinationVisual',
  'rag-intro-visual': 'RagIntroVisual',
  'rag-architecture-visual': 'RagArchitectureVisual',
  'rag-embedding-visual': 'RagEmbeddingVisual',
  'rag-vector-search-visual': 'RagVectorSearchVisual',
  'rag-context-injection-visual': 'RagContextInjectionVisual',
  'rag-from-scratch-visual': 'RagFromScratchVisual',

  // chromadb (vectorDB + transformers)
  'chromadb-index-visual': 'ChromadbIndexVisual',
  'chromadb-search-visual': 'ChromadbSearchVisual',
  'chromadb-rag-e2e-visual': 'ChromadbRagE2eVisual',

  // llamaindex
  'llamaindex-why-visual': 'LlamaIndexWhyVisual',
  'llamaindex-core-concepts-visual': 'LlamaIndexCoreConceptsVisual',
  'llamaindex-data-loaders-visual': 'LlamaIndexDataLoadersVisual',
  'llamaindex-pipeline-visual': 'LlamaIndexPipelineVisual',
  'llamaindex-retrievers-visual': 'LlamaIndexRetrieversVisual',
  'llamaindex-query-engines-visual': 'LlamaIndexQueryEnginesVisual',
  'llamaindex-chat-engine-visual': 'LlamaIndexChatEngineVisual',
  'llamaindex-agents-visual': 'LlamaIndexAgentsVisual',
  'llamaindex-e2e-visual': 'LlamaIndexE2eVisual',

  // langchain
  'langchain-why-visual': 'LangchainWhyVisual',
  'langchain-core-concepts-visual': 'LangchainCoreConceptsVisual',
  'langchain-prompt-templates-visual': 'LangchainPromptTemplatesVisual',
  'langchain-chains-visual': 'LangchainChainsVisual',
  'langchain-tools-visual': 'LangchainToolsVisual',
  'langchain-agents-deep-dive-visual': 'LangchainAgentsDeepDiveVisual',
  'langchain-rag-langchain-visual': 'LangchainRagLangchainVisual',
  'langchain-memory-visual': 'LangchainMemoryVisual',
  'langchain-e2e-visual': 'LangchainE2eVisual',

  // inference-engines
  'inference-engines-why-visual': 'InferenceEnginesWhyVisual',
  'transformers-pipeline-visual': 'TransformersPipelineVisual',
  'transformers-server-visual': 'TransformersServerVisual',
  'openai-api-standard-visual': 'OpenaiApiStandardVisual',
  'streaming-mode-visual': 'StreamingModeVisual',
  'onnx-optimization-visual': 'OnnxOptimizationVisual',
  'vllm-intro-visual': 'VllmIntroVisual',
  'vllm-deep-dive-visual': 'VllmDeepDiveVisual',
  'sglang-intro-visual': 'SglangIntroVisual',
  'sglang-deep-dive-visual': 'SglangDeepDiveVisual',
  'inference-comparison-visual': 'InferenceComparisonVisual',
  'inference-e2e-visual': 'InferenceE2eVisual',

  // neural networks
  'neuron-architecture-animated': 'NeuronArchitectureAnimated',
  'activation-functions-comparator': 'ActivationFunctionsComparator',
  'sigmoid-deep-dive-explorer': 'SigmoidDeepDiveExplorer',
  'sigmoid-derivative-explorer': 'SigmoidDerivativeExplorer',
  'feedforward-flow-visual': 'FeedforwardFlowVisual',
  'backprop-signal-flow': 'BackpropSignalFlow',
  'neural-network-step-debugger': 'NeuralNetworkStepDebugger',
  'neural-network-tabs-stepper': 'NeuralNetworkTabsStepper',
  'architecture-comparator': 'ArchitectureComparatorVisual',
  'tensor-3d-explorer': 'Tensor3DExplorer',
  'tensor-origins-visual': 'TensorOriginsVisual',
  'derivative-ramp-explorer': 'DerivativeRampExplorer',
  'biological-vs-computational-neuron': 'BiologicalVsComputationalNeuron',
  'weights-biases-explorer': 'WeightsBiasesExplorer',
  'bce-loss-curve': 'BceLossCurve',
  'optimizer-trajectory-visual': 'OptimizerTrajectoryVisual',
  'pytorch-sequential-map': 'PytorchSequentialMap',

  // python
  'python-prereq-tabs': 'PythonPrereqTabsVisual',

  // bpe tokenization
  'token-level-comparison': 'TokenLevelComparison',
  'token-granularity-slider': 'TokenGranularitySlider',
  'bpe-frequency-table': 'BPEFrequencyTable',
  'bpe-merge-stack': 'BPEMergeStack',
  'bpe-training-curve': 'BPETrainingCurve',

  // classification problem
  'classification-problem': 'ClassificationProblemVisual',

  // quantization
  'quantization-comparator': 'QuantizationComparator',
  'fp16-overflow-explorer': 'Fp16OverflowExplorer',
  'int8-outlier-detector': 'Int8OutlierDetector',
  'nf4-quantile-visualizer': 'Nf4QuantileVisualizer',

  // peft / lora
  'lora-diagram': 'LoraDiagram',

  // welcome
  'welcome-synthwave': 'WelcomeSynthwaveVisual',

  // prompt engineering
  'prompt-engineering-why-visual': 'PromptEngineeringWhyVisual',
  'prompt-structure-anatomy-visual': 'PromptStructureAnatomyVisual',
  'zero-shot-prompting-visual': 'ZeroShotPromptingVisual',
  'few-shot-prompting-visual': 'FewShotPromptingVisual',
  'many-shot-prompting-visual': 'ManyShotPromptingVisual',
  'chain-of-thought-visual': 'ChainOfThoughtVisual',
  'tree-of-thoughts-visual': 'TreeOfThoughtsVisual',
  'prompt-chaining-patterns-visual': 'PromptChainingPatternsVisual',
  'real-datasets-prompts-visual': 'RealDatasetsPromptsVisual',

  // markdown
  'markdown-output-compare': 'MarkdownOutputCompare',
  'markdown-syntax-visual': 'MarkdownSyntaxVisual',
  'jinja-intro-visual': 'JinjaIntroVisual',
  'jinja-chatml-practice-visual': 'JinjaChatmlPracticeVisual',

  // intelligent agents
  'agente-in-action': 'AgenteInAction',
  'agent-anatomy': 'AgentAnatomy',
  'agent-loop': 'AgentLoopVisual',
  'agent-memory': 'AgentMemoryVisual',
  'agent-planning': 'AgentPlanningVisual',
  'react-flow': 'ReActFlowVisual',
  'multi-agent': 'MultiAgentVisual',
  'agent-frameworks': 'AgentFrameworksVisual',
  'mcp': 'MCPVisual',
  'agent-pitfalls': 'AgentPitfallsVisual',
};

/**
 * Creates a lazy visual adapter that dynamically loads a component by name
 * from the barrel module and passes the typed copy for the current language.
 */
function createVisualAdapter(componentName: string) {
  return React.lazy(async () => {
    const barrel = await import('../components/visuals');
    const Component = (barrel as unknown as Record<string, React.FC<{ copy: unknown }>>)[componentName];
    if (!Component) {
      throw new Error(`Visual component "${componentName}" not found in barrel export`);
    }
    return {
      default: (props: VisualRenderProps) => (
        <Component copy={(props.visual.copy as Record<string, unknown>)[props.language]} />
      ),
    };
  });
}

// Register all visuals from the declarative map
for (const [id, componentName] of Object.entries(visualMap)) {
  registerVisual(id, createVisualAdapter(componentName));
}

// Special case: python-exercise passes the `language` prop in addition to `copy`
registerVisual('python-exercise', React.lazy(async () => {
  const barrel = await import('../components/visuals');
  const { PythonExerciseVisual } = barrel;
  return {
    default: (props: VisualRenderProps) => (
      <PythonExerciseVisual
        copy={(props.visual.copy as Record<string, unknown>)[props.language] as PythonExerciseVisualCopy}
        language={props.language}
      />
    ),
  };
}));

export function getVisualComponent(id: string): React.LazyExoticComponent<VisualComponent> | undefined {
  return visualRegistry[id];
}

export function getAllVisualIds(): string[] {
  return Object.keys(visualRegistry);
}

