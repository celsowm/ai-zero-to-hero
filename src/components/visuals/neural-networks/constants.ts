import { sw } from '../../../theme/tokens';

export type Speed = 'sample' | 'epoch' | 'fast';

export const SPEED_SETTINGS: Record<Speed, { delayMs: number; batchSize: number }> = {
  sample: { delayMs: 400, batchSize: 1 },
  epoch: { delayMs: 100, batchSize: 10 },
  fast: { delayMs: 16, batchSize: 100 },
};

export const PLACEHOLDER_VALUE = '—';

export const POSITIVE_VALUE_COLOR = sw.sky;
export const NEGATIVE_VALUE_COLOR = sw.rose;
export const BIAS_ACCENT_COLOR = sw.yellow;
export const BIAS_TEXT_COLOR = '#fde68a';
