import { useCallback, useMemo } from 'react';

/**
 * Create a linear scale mapping from domain [min, max] to range [min, max].
 * Returns { scale, invert } functions.
 */
export function useLinearScale(
  domain: [number, number],
  range: [number, number],
) {
  const scale = useCallback(
    (value: number) => {
      const t = (value - domain[0]) / (domain[1] - domain[0]);
      return range[0] + t * (range[1] - range[0]);
    },
    [domain, range],
  );

  const invert = useCallback(
    (pixel: number) => {
      const t = (pixel - range[0]) / (range[1] - range[0]);
      return domain[0] + t * (domain[1] - domain[0]);
    },
    [domain, range],
  );

  return useMemo(() => ({ scale, invert }), [scale, invert]);
}

export interface TickSpec {
  value: number;
  label: string;
  position: number;
}

/**
 * Generate nice tick marks for a given domain.
 * Returns ~5-7 evenly spaced ticks with clean numbers.
 */
export function generateTicks(domain: [number, number], count = 6): TickSpec[] {
  const [min, max] = domain;
  const roughStep = (max - min) / (count - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual = roughStep / magnitude;

  let niceStep: number;
  if (residual <= 1.5) niceStep = 1 * magnitude;
  else if (residual <= 3) niceStep = 2 * magnitude;
  else if (residual <= 7) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;

  const ticks: TickSpec[] = [];
  const tickStart = Math.ceil(min / niceStep) * niceStep;
  for (let v = tickStart; v <= max; v += niceStep) {
    ticks.push({
      value: v,
      label: Number.isInteger(v) ? String(v) : v.toFixed(1),
      position: v,
    });
  }
  return ticks;
}
