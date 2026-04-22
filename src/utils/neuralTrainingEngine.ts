export interface TrainingSample {
  inputs: number[];
  target: number;
}

export interface NetworkWeights {
  inputToHidden: number[][];
  hiddenBiases: number[];
  hiddenToOutput: number[];
  outputBias: number;
}

export interface NetworkArchitecture {
  inputSize: number;
  hiddenSize: number;
  outputSize: 1;
  hiddenActivation: 'sigmoid';
  outputActivation: 'sigmoid';
}

export interface TrainingDebuggerConfig {
  dataset: TrainingSample[];
  learningRate: number;
  initialWeights: NetworkWeights;
  totalEpochs: number;
  convergenceThreshold: number;
  architecture?: Partial<NetworkArchitecture>;
}

export interface ForwardPass {
  hiddenZs: number[];
  hiddenActivations: number[];
  outputZ: number;
  outputActivation: number;
  loss: number;
}

export interface BackwardPass {
  outputError: number;
  outputDelta: number;
  hiddenDeltas: number[];
  inputToHiddenGradients: number[][];
  hiddenBiasGradients: number[];
  hiddenToOutputGradients: number[];
  outputBiasGradient: number;
}

export interface DatasetEvaluation {
  mse: number;
  accuracy: number;
}

export interface SampleSnapshot {
  epoch: number;
  sampleIndex: number;
  sample: TrainingSample;
  weightsBefore: NetworkWeights;
  weightsAfter: NetworkWeights;
  forward: ForwardPass;
  backward: BackwardPass;
  epochMse: number | null;
  epochAccuracy: number | null;
}

export interface TrainingDebuggerState {
  epoch: number;
  sampleIndex: number;
  weights: NetworkWeights;
  lossHistory: number[];
  converged: boolean;
  done: boolean;
  datasetSize: number;
  totalEpochs: number;
  architecture: NetworkArchitecture;
}

const DEFAULT_ARCHITECTURE: NetworkArchitecture = {
  inputSize: 4,
  hiddenSize: 3,
  outputSize: 1,
  hiddenActivation: 'sigmoid',
  outputActivation: 'sigmoid',
};

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
}

function sigmoidDerivativeFromActivation(y: number): number {
  return y * (1 - y);
}

export function cloneWeights(weights: NetworkWeights): NetworkWeights {
  return {
    inputToHidden: weights.inputToHidden.map((row) => [...row]),
    hiddenBiases: [...weights.hiddenBiases],
    hiddenToOutput: [...weights.hiddenToOutput],
    outputBias: weights.outputBias,
  };
}

function validateConfig(config: TrainingDebuggerConfig, architecture: NetworkArchitecture) {
  if (config.dataset.length === 0) {
    throw new Error('Training dataset cannot be empty.');
  }

  if (architecture.outputSize !== 1) {
    throw new Error('This debugger supports exactly one output neuron.');
  }

  if (config.initialWeights.inputToHidden.length !== architecture.hiddenSize) {
    throw new Error('Initial hidden layer weights do not match hiddenSize.');
  }

  if (config.initialWeights.hiddenBiases.length !== architecture.hiddenSize) {
    throw new Error('Initial hidden biases do not match hiddenSize.');
  }

  if (config.initialWeights.hiddenToOutput.length !== architecture.hiddenSize) {
    throw new Error('Initial output weights do not match hiddenSize.');
  }

  for (const sample of config.dataset) {
    if (sample.inputs.length !== architecture.inputSize) {
      throw new Error('Sample input size does not match network architecture.');
    }
  }

  for (const row of config.initialWeights.inputToHidden) {
    if (row.length !== architecture.inputSize) {
      throw new Error('Initial input-to-hidden weight rows do not match inputSize.');
    }
  }
}

export function forwardPass(weights: NetworkWeights, sample: TrainingSample): ForwardPass {
  const hiddenZs = weights.inputToHidden.map((row, hiddenIndex) =>
    row.reduce((sum, weight, inputIndex) => sum + weight * sample.inputs[inputIndex], 0) + weights.hiddenBiases[hiddenIndex],
  );
  const hiddenActivations = hiddenZs.map(sigmoid);
  const outputZ =
    weights.hiddenToOutput.reduce((sum, weight, hiddenIndex) => sum + weight * hiddenActivations[hiddenIndex], 0) + weights.outputBias;
  const outputActivation = sigmoid(outputZ);
  const loss = (outputActivation - sample.target) ** 2;

  return { hiddenZs, hiddenActivations, outputZ, outputActivation, loss };
}

export function backwardPass(sample: TrainingSample, forward: ForwardPass, weights: NetworkWeights): BackwardPass {
  const outputError = forward.outputActivation - sample.target;
  const outputDelta = outputError * sigmoidDerivativeFromActivation(forward.outputActivation);
  const hiddenDeltas = forward.hiddenActivations.map((activation, hiddenIndex) =>
    weights.hiddenToOutput[hiddenIndex] * outputDelta * sigmoidDerivativeFromActivation(activation),
  );
  const inputToHiddenGradients = hiddenDeltas.map((delta) => sample.inputs.map((inputValue) => delta * inputValue));
  const hiddenBiasGradients = [...hiddenDeltas];
  const hiddenToOutputGradients = forward.hiddenActivations.map((activation) => outputDelta * activation);
  const outputBiasGradient = outputDelta;

  return {
    outputError,
    outputDelta,
    hiddenDeltas,
    inputToHiddenGradients,
    hiddenBiasGradients,
    hiddenToOutputGradients,
    outputBiasGradient,
  };
}

export function updateWeights(weights: NetworkWeights, backward: BackwardPass, learningRate: number): NetworkWeights {
  return {
    inputToHidden: weights.inputToHidden.map((row, hiddenIndex) =>
      row.map((weight, inputIndex) => weight - learningRate * backward.inputToHiddenGradients[hiddenIndex][inputIndex]),
    ),
    hiddenBiases: weights.hiddenBiases.map((bias, hiddenIndex) => bias - learningRate * backward.hiddenBiasGradients[hiddenIndex]),
    hiddenToOutput: weights.hiddenToOutput.map(
      (weight, hiddenIndex) => weight - learningRate * backward.hiddenToOutputGradients[hiddenIndex],
    ),
    outputBias: weights.outputBias - learningRate * backward.outputBiasGradient,
  };
}

export function predict(weights: NetworkWeights, inputs: number[]): number {
  return forwardPass(weights, { inputs, target: 0 }).outputActivation;
}

export function evaluateDataset(weights: NetworkWeights, dataset: TrainingSample[]): DatasetEvaluation {
  let totalLoss = 0;
  let correct = 0;

  for (const sample of dataset) {
    const prediction = forwardPass(weights, sample);
    totalLoss += prediction.loss;
    if ((prediction.outputActivation >= 0.5 ? 1 : 0) === sample.target) {
      correct++;
    }
  }

  return {
    mse: totalLoss / dataset.length,
    accuracy: correct / dataset.length,
  };
}

export function createTrainingDebugger(config: TrainingDebuggerConfig) {
  const architecture: NetworkArchitecture = {
    ...DEFAULT_ARCHITECTURE,
    ...config.architecture,
    outputSize: 1,
    hiddenActivation: 'sigmoid',
    outputActivation: 'sigmoid',
  };

  validateConfig(config, architecture);

  let weights = cloneWeights(config.initialWeights);
  let epoch = 0;
  let sampleIndex = 0;
  let lossHistory: number[] = [];
  let converged = false;

  function processSample(): SampleSnapshot {
    const sample = config.dataset[sampleIndex];
    const weightsBefore = cloneWeights(weights);
    const forward = forwardPass(weights, sample);
    const backward = backwardPass(sample, forward, weights);

    weights = updateWeights(weights, backward, config.learningRate);

    const isLastSampleInEpoch = sampleIndex === config.dataset.length - 1;
    let epochMse: number | null = null;
    let epochAccuracy: number | null = null;

    if (isLastSampleInEpoch) {
      const evaluation = evaluateDataset(weights, config.dataset);
      epochMse = evaluation.mse;
      epochAccuracy = evaluation.accuracy;
      lossHistory.push(evaluation.mse);

      if (evaluation.mse < config.convergenceThreshold) {
        converged = true;
      }
    }

    const snapshot: SampleSnapshot = {
      epoch,
      sampleIndex,
      sample,
      weightsBefore,
      weightsAfter: cloneWeights(weights),
      forward,
      backward,
      epochMse,
      epochAccuracy,
    };

    sampleIndex++;
    if (sampleIndex >= config.dataset.length) {
      sampleIndex = 0;
      epoch++;
    }

    return snapshot;
  }

  function stepSamples(count: number): SampleSnapshot[] {
    const snapshots: SampleSnapshot[] = [];

    for (let i = 0; i < count; i++) {
      // Convergence is informational here; the debugger keeps running until the epoch budget ends.
      if (epoch >= config.totalEpochs) {
        break;
      }
      snapshots.push(processSample());
    }

    return snapshots;
  }

  function stepEpochs(count: number): SampleSnapshot[] {
    return stepSamples(count * config.dataset.length);
  }

  function skipEpochs(count: number) {
    stepSamples(count * config.dataset.length);
  }

  function reset() {
    weights = cloneWeights(config.initialWeights);
    epoch = 0;
    sampleIndex = 0;
    lossHistory = [];
    converged = false;
  }

  function getState(): TrainingDebuggerState {
    return {
      epoch,
      sampleIndex,
      weights: cloneWeights(weights),
      lossHistory: [...lossHistory],
      converged,
      done: epoch >= config.totalEpochs,
      datasetSize: config.dataset.length,
      totalEpochs: config.totalEpochs,
      architecture,
    };
  }

  return {
    stepSamples,
    stepEpochs,
    skipEpochs,
    reset,
    getState,
    get config() {
      return config;
    },
  };
}

export type TrainingDebugger = ReturnType<typeof createTrainingDebugger>;
