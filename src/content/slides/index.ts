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
import { loraExercise } from './lora-exercise';
import { mlPipeline } from './ml-pipeline';
import { mlpInsideTransformer } from './mlp-inside-transformer';
import { mlpLanguageModel } from './mlp-language-model';
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
  loraExercise,
  mlPipeline,
  mlpInsideTransformer,
  mlpLanguageModel,
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
];
