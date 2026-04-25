/**
 * Shared math primitives.
 * All ML math functions live here to avoid DRY violations across visuals.
 */

/** Sigmoid: σ(x) = 1 / (1 + e^(-x)) */
export function sigmoid(x: number): number {
  return 1 / (1 + Math.exp(-x));
}

/** Derivative of sigmoid: σ'(x) = σ(x) * (1 - σ(x)) */
export function sigmoidDerivative(x: number): number {
  const s = sigmoid(x);
  return s * (1 - s);
}

/** Tanh: hyperbolic tangent */
export function tanh(x: number): number {
  return Math.tanh(x);
}

/** ReLU: max(0, x) */
export function relu(x: number): number {
  return Math.max(0, x);
}

/** Leaky ReLU: x > 0 ? x : αx */
export function leakyRelu(x: number, alpha = 0.01): number {
  return x > 0 ? x : alpha * x;
}

/** Softmax: normalizes an array into a probability distribution */
export function softmax(values: number[]): number[] {
  const max = Math.max(...values);
  const exps = values.map(v => Math.exp(v - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sum);
}

/** Clamp: restricts a value to [min, max] */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/** Normalize: scales a value from [min, max] to [0, 1] */
export function normalize(value: number, min: number, max: number): number {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

/** Lerp: linear interpolation between a and b by t ∈ [0, 1] */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Seeded pseudo-random number generator (mulberry32) */
export function createSeededRNG(seed: number) {
  let s = seed | 0;
  return function next(): number {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
