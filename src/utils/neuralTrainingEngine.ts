/**
 * Neural Network Training Engine
 *
 * Implements a real 4→2(ReLU)→1(sigmoid) network with MSE loss,
 * backpropagation, and SGD weight updates.
 *
 * Architecture:
 *   Input (4) → Hidden (2, ReLU) → Output (1, sigmoid)
 *
 * Weights:
 *   w1, w2: input→hidden (each is [4] array)
 *   b1, b2: hidden biases (scalars)
 *   v1, v2: hidden→output weights
 *   c: output bias
 */

export interface TrainingSample {
  inputs: number[];
  target: number;
}

export interface EngineConfig {
  dataset: TrainingSample[];
  learningRate: number;
  totalEpochs: number;
  convergenceThreshold: number;
  seed?: number;
}

export interface WeightSnapshot {
  w1: number[];
  w2: number[];
  b1: number;
  b2: number;
  v1: number;
  v2: number;
  c: number;
}

export interface ForwardResult {
  z1: number;
  z2: number;
  h1: number;
  h2: number;
  z3: number;
  yHat: number;
  loss: number;
}

export interface BackwardResult {
  d_out: number;
  d_z3: number;
  d_v1: number;
  d_v2: number;
  d_c: number;
  d_h1: number;
  d_h2: number;
  d_z1: number;
  d_z2: number;
  grad_w1: number[];
  grad_w2: number[];
  grad_b1: number;
  grad_b2: number;
  grad_v1: number;
  grad_v2: number;
  grad_c: number;
}

export interface EngineState {
  epoch: number;
  sampleIndex: number;
  totalLoss: number;
  mse: number;
  converged: boolean;
  trainingDone: boolean;
  weights: WeightSnapshot;
  forward: ForwardResult | null;
  backward: BackwardResult | null;
  currentSample: TrainingSample | null;
  lossHistory: number[]; // MSE per epoch
}

// Seeded pseudo-random number generator for reproducibility
function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-Math.max(-500, Math.min(500, x))));
}

function relu(x: number): number {
  return Math.max(0, x);
}

function reluDerivative(x: number): number {
  return x > 0 ? 1 : 0;
}

export function createEngine(config: EngineConfig) {
  const rng = seededRandom(config.seed ?? 42);

  // Small random initial weights (like the original Python)
  const initWeight = () => (rng() - 0.5) * 0.4;

  let weights: WeightSnapshot = {
    w1: [initWeight(), initWeight(), initWeight(), initWeight()],
    w2: [initWeight(), initWeight(), initWeight(), initWeight()],
    b1: initWeight() * 0.5,
    b2: initWeight() * 0.5,
    v1: initWeight() * 0.5 + 0.3,
    v2: initWeight() * 0.5 + 0.3,
    c: initWeight() * 0.3 - 0.1,
  };

  let epoch = 0;
  let sampleIndex = 0;
  let lossHistory: number[] = [];
  let converged = false;
  let trainingDone = false;
  let currentForward: ForwardResult | null = null;
  let currentBackward: BackwardResult | null = null;
  let lastSample: TrainingSample | null = null;

  function forward(sample: TrainingSample): ForwardResult {
    const { inputs: x, target: y } = sample;

    const z1 =
      weights.w1[0] * x[0] +
      weights.w1[1] * x[1] +
      weights.w1[2] * x[2] +
      weights.w1[3] * x[3] +
      weights.b1;

    const z2 =
      weights.w2[0] * x[0] +
      weights.w2[1] * x[1] +
      weights.w2[2] * x[2] +
      weights.w2[3] * x[3] +
      weights.b2;

    const h1 = relu(z1);
    const h2 = relu(z2);

    const z3 = weights.v1 * h1 + weights.v2 * h2 + weights.c;
    const yHat = sigmoid(z3);
    const loss = (yHat - y) * (yHat - y);

    return { z1, z2, h1, h2, z3, yHat, loss };
  }

  function backward(
    sample: TrainingSample,
    fwd: ForwardResult,
  ): BackwardResult {
    const { inputs: x, target: y } = sample;

    // dL/d(yHat) = 2*(yHat - y) / 1  → MSE derivative
    // dL/d(z3) = dL/d(yHat) * sigmoid'(z3) = 2*(yHat - y) * yHat*(1-yHat)
    // Simplified: d_out = (yHat - y) * yHat * (1 - yHat) * 2
    // But commonly: d_out = (yHat - y) for simplicity with lr scaling
    const d_out = fwd.yHat - y;
    const d_z3 = d_out * fwd.yHat * (1 - fwd.yHat);

    const d_v1 = d_z3 * fwd.h1;
    const d_v2 = d_z3 * fwd.h2;
    const d_c = d_z3;

    const d_h1 = d_z3 * weights.v1;
    const d_h2 = d_z3 * weights.v2;

    const d_z1 = d_h1 * reluDerivative(fwd.z1);
    const d_z2 = d_h2 * reluDerivative(fwd.z2);

    const grad_w1 = x.map((xi) => d_z1 * xi);
    const grad_w2 = x.map((xi) => d_z2 * xi);
    const grad_b1 = d_z1;
    const grad_b2 = d_z2;
    const grad_v1 = d_v1;
    const grad_v2 = d_v2;
    const grad_c = d_c;

    return {
      d_out,
      d_z3,
      d_v1,
      d_v2,
      d_c,
      d_h1,
      d_h2,
      d_z1,
      d_z2,
      grad_w1,
      grad_w2,
      grad_b1,
      grad_b2,
      grad_v1,
      grad_v2,
      grad_c,
    };
  }

  function update(bwd: BackwardResult) {
    const lr = config.learningRate;

    for (let i = 0; i < 4; i++) {
      weights.w1[i] -= lr * bwd.grad_w1[i];
      weights.w2[i] -= lr * bwd.grad_w2[i];
    }
    weights.b1 -= lr * bwd.grad_b1;
    weights.b2 -= lr * bwd.grad_b2;
    weights.v1 -= lr * bwd.grad_v1;
    weights.v2 -= lr * bwd.grad_v2;
    weights.c -= lr * bwd.grad_c;
  }

  function getState(): EngineState {
    return {
      epoch,
      sampleIndex,
      totalLoss: lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : 0,
      mse: lossHistory.length > 0 ? lossHistory[lossHistory.length - 1] : 0,
      converged,
      trainingDone,
      weights: { ...weights, w1: [...weights.w1], w2: [...weights.w2] },
      forward: currentForward,
      backward: currentBackward,
      currentSample: lastSample,
      lossHistory: [...lossHistory],
    };
  }

  function runSample(idx: number): { fwd: ForwardResult; bwd: BackwardResult } {
    const sample = config.dataset[idx];
    lastSample = sample;

    const fwd = forward(sample);
    const bwd = backward(sample, fwd);
    update(bwd);

    currentForward = fwd;
    currentBackward = bwd;

    return { fwd, bwd };
  }

  function runOneEpoch(): number {
    let epochLoss = 0;
    for (let i = 0; i < config.dataset.length; i++) {
      const { fwd } = runSample(i);
      epochLoss += fwd.loss;
    }
    return epochLoss / config.dataset.length; // MSE
  }

  function runEpochs(count: number): EngineState {
    if (trainingDone || converged) return getState();

    const epochsToRun = Math.min(count, config.totalEpochs - epoch);

    for (let e = 0; e < epochsToRun; e++) {
      if (trainingDone || converged) break;

      const mse = runOneEpoch();
      epoch++;
      lossHistory.push(mse);

      if (mse < config.convergenceThreshold) {
        converged = true;
      }

      if (epoch >= config.totalEpochs) {
        trainingDone = true;
      }
    }

    // Run one more sample to have current forward/backward for display
    sampleIndex = (sampleIndex + 1) % config.dataset.length;
    const sample = config.dataset[sampleIndex];
    lastSample = sample;
    currentForward = forward(sample);
    currentBackward = backward(sample, currentForward);

    return getState();
  }

  function reset() {
    const newRng = seededRandom(config.seed ?? 42);
    const initW = () => (newRng() - 0.5) * 0.4;

    weights = {
      w1: [initW(), initW(), initW(), initW()],
      w2: [initW(), initW(), initW(), initW()],
      b1: initW() * 0.5,
      b2: initW() * 0.5,
      v1: initW() * 0.5 + 0.3,
      v2: initW() * 0.5 + 0.3,
      c: initW() * 0.3 - 0.1,
    };

    epoch = 0;
    sampleIndex = 0;
    lossHistory = [];
    converged = false;
    trainingDone = false;
    currentForward = null;
    currentBackward = null;
    lastSample = null;
  }

  function skipToEnd() {
    if (trainingDone || converged) return getState();
    return runEpochs(config.totalEpochs - epoch);
  }

  return {
    getState,
    runEpochs,
    reset,
    skipToEnd,
    get config() {
      return config;
    },
  };
}

export type NeuralTrainingEngine = ReturnType<typeof createEngine>;

// ---------------------------------------------------------------------------
// Training debugger engine — step sample-by-sample across epochs
// ---------------------------------------------------------------------------

function cloneWeights(w: WeightSnapshot): WeightSnapshot {
  return { w1: [...w.w1], w2: [...w.w2], b1: w.b1, b2: w.b2, v1: w.v1, v2: w.v2, c: w.c };
}

/** Snapshot of one sample being processed (forward + backward + update) */
export interface SampleSnapshot {
  epoch: number;
  sampleIndex: number;
  sample: TrainingSample;
  weightsBefore: WeightSnapshot;
  weightsAfter: WeightSnapshot;
  // Forward
  z1: number; z2: number; h1: number; h2: number;
  z3: number; yHat: number; loss: number;
  // Backward
  d_out: number; d_z3: number;
  d_h1: number; d_h2: number; d_z1: number; d_z2: number;
  grad_w1: number[]; grad_w2: number[];
  grad_b1: number; grad_b2: number;
  grad_v1: number; grad_v2: number; grad_c: number;
  // Epoch summary (filled at end of epoch)
  epochMse: number | null;
  epochAccuracy: number | null;
}

export interface TrainingDebuggerConfig {
  dataset: TrainingSample[];
  learningRate: number;
  initialWeights: WeightSnapshot;
  totalEpochs: number;
  convergenceThreshold: number;
}

export function createTrainingDebugger(config: TrainingDebuggerConfig) {
  const { dataset, learningRate, totalEpochs, convergenceThreshold } = config;
  let w = cloneWeights(config.initialWeights);
  let epoch = 0;
  let sampleIdx = 0;
  let lossHistory: number[] = [];
  let converged = false;

  // Process one sample: forward + backward + update, return snapshot
  function processSample(): SampleSnapshot {
    const sample = dataset[sampleIdx];
    const x = sample.inputs, y = sample.target;
    const wBefore = cloneWeights(w);

    // Forward
    const z1 = w.w1[0]*x[0] + w.w1[1]*x[1] + w.w1[2]*x[2] + w.w1[3]*x[3] + w.b1;
    const z2 = w.w2[0]*x[0] + w.w2[1]*x[1] + w.w2[2]*x[2] + w.w2[3]*x[3] + w.b2;
    const h1 = relu(z1), h2 = relu(z2);
    const z3 = w.v1*h1 + w.v2*h2 + w.c;
    const yHat = sigmoid(z3);
    const loss = (yHat - y) * (yHat - y);

    // Backward
    const d_out = yHat - y;
    const d_z3 = d_out * yHat * (1 - yHat);
    const d_h1 = d_z3 * w.v1, d_h2 = d_z3 * w.v2;
    const d_z1 = d_h1 * reluDerivative(z1), d_z2 = d_h2 * reluDerivative(z2);
    const grad_w1 = x.map(xi => d_z1 * xi);
    const grad_w2 = x.map(xi => d_z2 * xi);
    const grad_b1 = d_z1, grad_b2 = d_z2;
    const grad_v1 = d_z3 * h1, grad_v2 = d_z3 * h2, grad_c = d_z3;

    // Update weights
    for (let i = 0; i < 4; i++) { w.w1[i] -= learningRate * grad_w1[i]; w.w2[i] -= learningRate * grad_w2[i]; }
    w.b1 -= learningRate * grad_b1; w.b2 -= learningRate * grad_b2;
    w.v1 -= learningRate * grad_v1; w.v2 -= learningRate * grad_v2;
    w.c -= learningRate * grad_c;

    const isLastSample = sampleIdx === dataset.length - 1;
    let epochMse: number | null = null;
    let epochAccuracy: number | null = null;

    if (isLastSample) {
      // Compute epoch MSE & accuracy with current weights
      let totalLoss = 0, correct = 0;
      for (const s of dataset) {
        const sz1 = w.w1.reduce((a, wi, i) => a + wi * s.inputs[i], 0) + w.b1;
        const sz2 = w.w2.reduce((a, wi, i) => a + wi * s.inputs[i], 0) + w.b2;
        const sh1 = relu(sz1), sh2 = relu(sz2);
        const sz3 = w.v1*sh1 + w.v2*sh2 + w.c;
        const sy = sigmoid(sz3);
        totalLoss += (sy - s.target) ** 2;
        if ((sy >= 0.5 ? 1 : 0) === s.target) correct++;
      }
      epochMse = totalLoss / dataset.length;
      epochAccuracy = correct / dataset.length;
      lossHistory.push(epochMse);
      if (epochMse < convergenceThreshold) converged = true;
    }

    const snap: SampleSnapshot = {
      epoch, sampleIndex: sampleIdx, sample,
      weightsBefore: wBefore, weightsAfter: cloneWeights(w),
      z1, z2, h1, h2, z3, yHat, loss,
      d_out, d_z3, d_h1, d_h2, d_z1, d_z2,
      grad_w1, grad_w2, grad_b1, grad_b2, grad_v1, grad_v2, grad_c,
      epochMse, epochAccuracy,
    };

    // Advance indices
    sampleIdx++;
    if (sampleIdx >= dataset.length) { sampleIdx = 0; epoch++; }

    return snap;
  }

  /** Run N samples (not epochs) and return snapshots */
  function stepSamples(n: number): SampleSnapshot[] {
    const snaps: SampleSnapshot[] = [];
    for (let i = 0; i < n; i++) {
      if (converged || epoch >= totalEpochs) break;
      snaps.push(processSample());
    }
    return snaps;
  }

  /** Run full epochs (each = dataset.length samples) */
  function stepEpochs(n: number): SampleSnapshot[] {
    return stepSamples(n * dataset.length);
  }

  /** Skip ahead by N epochs without returning snapshots */
  function skipEpochs(n: number) {
    const total = n * dataset.length;
    for (let i = 0; i < total; i++) {
      if (converged || epoch >= totalEpochs) break;
      processSample();
    }
  }

  function reset() {
    w = cloneWeights(config.initialWeights);
    epoch = 0; sampleIdx = 0; lossHistory = []; converged = false;
  }

  function getState() {
    return {
      epoch, sampleIndex: sampleIdx, weights: cloneWeights(w),
      lossHistory: [...lossHistory], converged, done: epoch >= totalEpochs,
      datasetSize: dataset.length, totalEpochs,
    };
  }

  return { stepSamples, stepEpochs, skipEpochs, reset, getState, get config() { return config; } };
}

export type TrainingDebugger = ReturnType<typeof createTrainingDebugger>;
export type TrainingDebuggerState = ReturnType<TrainingDebugger['getState']>;
