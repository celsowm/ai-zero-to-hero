/**
 * Shared formatting utilities.
 * Eliminates duplicated number/loss/percent formatters across visuals.
 */

/** Generic number formatter with configurable decimal places */
export function formatNumber(value: number, digits = 2): string {
  return value.toFixed(digits);
}

/** Format a probability (0–1) as a percentage string, e.g. "73.5%" */
export function formatProbability(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`;
}

/** Format a raw number as a percentage, e.g. 0.87 → "87%" */
export function formatPercent(value: number, digits = 0): string {
  return `${(value * 100).toFixed(digits)}%`;
}

/** Format a loss value (MSE, cross-entropy, etc.) with 4 decimals by default */
export function formatLoss(value: number, digits = 4): string {
  return value.toFixed(digits);
}
