import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Play, RotateCcw } from 'lucide-react';
import type { NonlinearSolutionRingVisualCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { CodeBlock } from '../../CodeBlock';

interface Props {
  copy: NonlinearSolutionRingVisualCopy;
}

type Sample = { x: number; y: number; label: 0 | 1 };

// 4-hidden-neuron network: input(2) → hidden(4 sigmoid) → output(1 sigmoid)
type W = {
  hb: [number, number, number, number];
  hx: [number, number, number, number];
  hy: [number, number, number, number];
  ob: number;
  ow: [number, number, number, number];
};

const MAX_EPOCHS = 150;
const FRAME_DELAY = 60;
const LR = 1.8;
const GRID = 40;

const sigmoid = (v: number) => 1 / (1 + Math.exp(-Math.max(-18, Math.min(18, v))));

/* Seeded PRNG — deterministic across renders */
const prng = (i: number, salt: number) => {
  const raw = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return raw - Math.floor(raw);
};

/* ── Dataset ────────────────────────────────────────────────── */
// Inner ring (label 1, green): annulus r ∈ [0.25, 0.65]
// Outer ring (label 0, blue):  annulus r ∈ [1.05, 1.55]
const makeAnnulusPoints = (
  count: number, label: 0 | 1, rMin: number, rMax: number, seed: number,
): Sample[] =>
  Array.from({ length: count }, (_, i) => {
    const angle = prng(i, seed) * Math.PI * 2;
    const r = rMin + prng(i, seed + 7) * (rMax - rMin);
    return { x: Math.cos(angle) * r, y: Math.sin(angle) * r, label };
  });

const INNER_COUNT = 500;
const OUTER_COUNT = 700;
const dataset: Sample[] = [
  ...makeAnnulusPoints(INNER_COUNT, 1, 0.25, 0.65, 0.31),
  ...makeAnnulusPoints(OUTER_COUNT, 0, 1.05, 1.55, 1.77),
];
// Only render a subset for performance
const rendered = dataset.filter((_, i) => i % 3 === 0);

/* ── Coordinate mapping (square) ────────────────────────────── */
const BOUNDS = 2.0; // feature space: [-2, 2] × [-2, 2]
const SVG_SIZE = 420;
const PAD = 40;
const CHART_MIN = PAD;
const CHART_MAX = SVG_SIZE - PAD;
const CHART_SPAN = CHART_MAX - CHART_MIN;

const toSX = (x: number) => CHART_MIN + ((x + BOUNDS) / (2 * BOUNDS)) * CHART_SPAN;
const toSY = (y: number) => CHART_MAX - ((y + BOUNDS) / (2 * BOUNDS)) * CHART_SPAN;

/* ── Network ────────────────────────────────────────────────── */
const forwardW = (w: W, x: number, y: number): number => {
  let z = w.ob;
  for (let j = 0; j < 4; j++) z += w.ow[j] * sigmoid(w.hb[j] + w.hx[j] * x + w.hy[j] * y);
  return sigmoid(z);
};

// Cardinal-direction init: each neuron detects one side of a diamond
// that approximates a circle around the origin
const initialW: W = {
  hb: [-2.2, -2.2, -2.2, -2.2],
  hx: [3.0, -3.0, 0.0, 0.0],
  hy: [0.0, 0.0, 3.0, -3.0],
  ob: 3.0,
  ow: [-1.5, -1.5, -1.5, -1.5],
};

const zeroGrad = (): W => ({
  hb: [0, 0, 0, 0], hx: [0, 0, 0, 0], hy: [0, 0, 0, 0], ob: 0, ow: [0, 0, 0, 0],
});

const trainEpoch = (w: W): { next: W; mse: number; accuracy: number } => {
  const g = zeroGrad();
  let mseSum = 0;
  let correct = 0;

  for (const s of dataset) {
    const h: [number, number, number, number] = [0, 0, 0, 0];
    for (let j = 0; j < 4; j++) h[j] = sigmoid(w.hb[j] + w.hx[j] * s.x + w.hy[j] * s.y);

    let outZ = w.ob;
    for (let j = 0; j < 4; j++) outZ += w.ow[j] * h[j];
    const out = sigmoid(outZ);

    const err = out - s.label;
    mseSum += err * err;
    correct += (out >= 0.5 ? 1 : 0) === s.label ? 1 : 0;

    const dOut = 2 * err * out * (1 - out);
    g.ob += dOut;
    for (let j = 0; j < 4; j++) {
      g.ow[j] += dOut * h[j];
      const dh = dOut * w.ow[j] * h[j] * (1 - h[j]);
      g.hb[j] += dh;
      g.hx[j] += dh * s.x;
      g.hy[j] += dh * s.y;
    }
  }

  const n = dataset.length;
  const next: W = {
    hb: w.hb.map((v, j) => v - LR * g.hb[j] / n) as W['hb'],
    hx: w.hx.map((v, j) => v - LR * g.hx[j] / n) as W['hx'],
    hy: w.hy.map((v, j) => v - LR * g.hy[j] / n) as W['hy'],
    ob: w.ob - LR * g.ob / n,
    ow: w.ow.map((v, j) => v - LR * g.ow[j] / n) as W['ow'],
  };
  return { next, mse: mseSum / n, accuracy: (correct / n) * 100 };
};

const trainAll = (w: W) => {
  let cur: W = { ...w, hb: [...w.hb] as W['hb'], hx: [...w.hx] as W['hx'], hy: [...w.hy] as W['hy'], ow: [...w.ow] as W['ow'] };
  let mse = 0.25, accuracy = 50;
  for (let e = 0; e < MAX_EPOCHS; e++) {
    const r = trainEpoch(cur); cur = r.next; mse = r.mse; accuracy = r.accuracy;
  }
  return { weights: cur, mse, accuracy };
};

const buildGrid = (w: W): number[] => {
  const cells: number[] = [];
  for (let gy = 0; gy < GRID; gy++) {
    for (let gx = 0; gx < GRID; gx++) {
      const fx = -BOUNDS + (gx / (GRID - 1)) * 2 * BOUNDS;
      const fy = -BOUNDS + (gy / (GRID - 1)) * 2 * BOUNDS;
      cells.push(forwardW(w, fx, fy));
    }
  }
  return cells;
};

/* ── Styles ──────────────────────────────────────────────────── */
const pillStyle = (accent: string): React.CSSProperties => ({
  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 11px',
  borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: '0.01em',
  color: 'rgba(243,244,246,0.96)', background: 'rgba(9,12,20,0.72)',
  border: `1px solid ${accent}66`, boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
});
const neutralPill: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 11px',
  borderRadius: 999, fontSize: 12, fontWeight: 700, letterSpacing: '0.01em',
  whiteSpace: 'nowrap', color: 'rgba(243,244,246,0.96)', background: 'rgba(9,12,20,0.72)',
  border: '1px solid rgba(255,255,255,0.10)',
};
const metricCard: React.CSSProperties = {
  padding: '8px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)', minWidth: 0, display: 'flex', flexDirection: 'column',
};
const metricLabel: React.CSSProperties = { fontSize: 9.5, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-text-muted)' };
const metricValue: React.CSSProperties = { marginTop: 4, fontSize: 24, lineHeight: 1, fontWeight: 800, letterSpacing: '-0.04em', color: 'var(--sw-text)' };
const metricSub: React.CSSProperties = { marginTop: 4, fontSize: 10.5, lineHeight: 1.35, color: 'var(--sw-text-dim)' };
const btnBase: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: 8, padding: '11px 12px',
  borderRadius: 12, border: '1px solid transparent', fontSize: 13, fontWeight: 700,
  cursor: 'pointer', transition: 'all 180ms ease',
};
const codeBodyStyle: React.CSSProperties = {
  flex: 1, minHeight: 0, margin: 0, padding: '16px 16px 16px 8px', borderRadius: 16,
  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
  display: 'flex', flexDirection: 'column',
};
const boundaryColor = '#c084fc';

/* ── Component ───────────────────────────────────────────────── */
export const NonlinearSolutionRingVisual = React.memo(({ copy }: Props) => {
  const wRef = useRef<W>(initialW);
  const [prefersReduced] = useState(() =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  );
  const [phase, setPhase] = useState<'idle' | 'running' | 'done'>(() => prefersReduced ? 'done' : 'idle');
  const [weights, setWeights] = useState<W>(initialW);
  const [mse, setMse] = useState(0.25);
  const [accuracy, setAccuracy] = useState(50);
  const [epoch, setEpoch] = useState(0);
  const [activeTab, setActiveTab] = useState(0);
  const [grid, setGrid] = useState<number[]>(() => buildGrid(initialW));

  useEffect(() => {
    if (phase !== 'running' || prefersReduced) return;
    let cancelled = false;
    let cur: W = { ...wRef.current, hb: [...wRef.current.hb] as W['hb'], hx: [...wRef.current.hx] as W['hx'], hy: [...wRef.current.hy] as W['hy'], ow: [...wRef.current.ow] as W['ow'] };
    let ep = 0;
    const step = () => {
      if (cancelled) return;
      const r = trainEpoch(cur);
      cur = r.next; ep++;
      wRef.current = cur;
      setWeights({ ...cur, hb: [...cur.hb] as W['hb'], hx: [...cur.hx] as W['hx'], hy: [...cur.hy] as W['hy'], ow: [...cur.ow] as W['ow'] });
      setMse(r.mse); setAccuracy(r.accuracy); setEpoch(ep);
      setGrid(buildGrid(cur));
      if (ep >= MAX_EPOCHS) { setPhase('done'); return; }
      window.setTimeout(step, FRAME_DELAY);
    };
    window.setTimeout(step, FRAME_DELAY);
    return () => { cancelled = true; };
  }, [phase, prefersReduced]);

  const handleStart = useCallback(() => {
    if (prefersReduced) {
      const r = trainAll(initialW);
      wRef.current = r.weights;
      setWeights(r.weights); setMse(r.mse); setAccuracy(r.accuracy);
      setEpoch(MAX_EPOCHS); setGrid(buildGrid(r.weights)); setPhase('done');
      return;
    }
    wRef.current = initialW;
    setWeights(initialW); setMse(0.25); setAccuracy(50); setEpoch(0);
    setGrid(buildGrid(initialW)); setPhase('running');
  }, [prefersReduced]);

  const handleRestart = useCallback(() => {
    wRef.current = initialW;
    setWeights(initialW); setMse(0.25); setAccuracy(50); setEpoch(0);
    setGrid(buildGrid(initialW)); setPhase(prefersReduced ? 'done' : 'idle');
  }, [prefersReduced]);

  const statusText = phase === 'idle' ? copy.statusIdleLabel : phase === 'running' ? copy.statusRunningLabel : copy.statusCompleteLabel;
  const cellW = CHART_SPAN / GRID;
  const cellH = CHART_SPAN / GRID;

  /* Axis tick positions (feature-space values shown on axes) */
  const axisTicks = [-1.5, -1, -0.5, 0, 0.5, 1, 1.5];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#c084fc', marginBottom: 10 }}>
          {copy.eyebrow}
        </div>
      </div>

      <TabsBar ariaLabel={copy.title} items={copy.tabLabels.map(l => ({ label: l }))} activeIndex={activeTab} onChange={setActiveTab} />

      <TabbedPanelSurface>
        {activeTab === 0 ? (
          <PanelCard minHeight={0} gap={10}>
            {/* Metrics strip */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(0,1fr))', gap: 8 }}>
              <div style={metricCard}>
                <div style={metricLabel}>{copy.accuracyLabel}</div>
                <div style={metricValue}>{accuracy.toFixed(1)}%</div>
                <div style={metricSub}>{Math.round((accuracy / 100) * dataset.length)}/{dataset.length}</div>
              </div>
              <div style={metricCard}>
                <div style={metricLabel}>{copy.mseLabel}</div>
                <div style={metricValue}>{mse.toFixed(4)}</div>
                <div style={metricSub}>mean squared error</div>
              </div>
              <div style={metricCard}>
                <div style={metricLabel}>{copy.statusLabel}</div>
                <div style={{ marginTop: 4, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, minHeight: 34 }}>
                  <span style={{ ...neutralPill, justifyContent: 'center', width: '100%' }}>{statusText}</span>
                  <span style={{ ...neutralPill, justifyContent: 'center', width: '100%' }}>{epoch}/{MAX_EPOCHS}</span>
                </div>
                <div style={metricSub}>live update</div>
              </div>
            </div>

            {/* Controls */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10 }}>
              <div style={{ display: 'flex', gap: 10, flex: '0 0 auto' }}>
                <button type="button" onClick={handleStart} disabled={phase === 'running'} aria-label={copy.startLabel}
                  style={{ ...btnBase, width: 44, justifyContent: 'center', color: '#091018',
                    background: 'linear-gradient(135deg,rgba(62,214,111,0.96),rgba(102,184,74,0.94))',
                    opacity: phase === 'running' ? 0.72 : 1 }}>
                  <Play size={16} />
                </button>
                <button type="button" onClick={handleRestart} aria-label={copy.restartLabel}
                  style={{ ...btnBase, width: 44, justifyContent: 'center', color: 'var(--sw-text)',
                    background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.08)' }}>
                  <RotateCcw size={16} />
                </button>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
                <span style={pillStyle('#4f91ff')}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#4f91ff' }} />
                  {copy.outerClassLabel}
                </span>
                <span style={pillStyle('#66b84a')}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#66b84a' }} />
                  {copy.innerClassLabel}
                </span>
                <span style={pillStyle(boundaryColor)}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: boundaryColor }} />
                  {copy.boundaryLabel}
                </span>
              </div>
            </div>

            {/* Chart — square aspect ratio so circles stay circles */}
            <div style={{
              position: 'relative', width: '100%', borderRadius: 18, overflow: 'hidden',
              aspectRatio: '1 / 1', maxHeight: 460,
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'linear-gradient(135deg, #0d1117 0%, #161b22 100%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06), 0 24px 42px rgba(0,0,0,0.30)',
            }}>
              <svg viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`} width="100%" height="100%"
                style={{ display: 'block' }}
                preserveAspectRatio="xMidYMid meet" role="img" aria-label={copy.title}>
                <defs>
                  <filter id="nsr-glow" x="-40%" y="-40%" width="180%" height="180%">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <radialGradient id="nsr-bg-grad" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="rgba(192,132,252,0.06)" />
                    <stop offset="100%" stopColor="rgba(0,0,0,0)" />
                  </radialGradient>
                </defs>

                {/* Background */}
                <rect x="0" y="0" width={SVG_SIZE} height={SVG_SIZE} fill="url(#nsr-bg-grad)" />

                {/* Heatmap: confidence shading */}
                {grid.map((v, i) => {
                  const gx = i % GRID;
                  const gy = Math.floor(i / GRID);
                  const sx = CHART_MIN + gx * cellW;
                  const sy = CHART_MIN + (GRID - 1 - gy) * cellH;
                  const alpha = Math.abs(v - 0.5) * 0.55;
                  return (
                    <rect key={i} x={sx} y={sy} width={cellW + 0.5} height={cellH + 0.5}
                      fill={v >= 0.5 ? `rgba(102,184,74,${alpha})` : `rgba(79,145,255,${alpha})`} />
                  );
                })}

                {/* Grid lines */}
                {axisTicks.map(v => {
                  const sx = toSX(v);
                  const sy = toSY(v);
                  return (
                    <g key={`grid-${v}`}>
                      <line x1={sx} y1={CHART_MIN} x2={sx} y2={CHART_MAX} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                      <line x1={CHART_MIN} y1={sy} x2={CHART_MAX} y2={sy} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
                    </g>
                  );
                })}

                {/* Axes */}
                <line x1={CHART_MIN} y1={toSY(0)} x2={CHART_MAX} y2={toSY(0)} stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />
                <line x1={toSX(0)} y1={CHART_MIN} x2={toSX(0)} y2={CHART_MAX} stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" />

                {/* Decision boundary: cells that cross 0.5 */}
                {Array.from({ length: GRID - 1 }, (_, gy) =>
                  Array.from({ length: GRID - 1 }, (_, gx) => {
                    const idx = (GRID - 1 - gy) * GRID + gx;
                    const v00 = grid[idx];
                    const v10 = grid[idx + 1] ?? v00;
                    const v01 = grid[idx - GRID] ?? v00;
                    const crosses = (v00 >= 0.5) !== (v10 >= 0.5) || (v00 >= 0.5) !== (v01 >= 0.5);
                    if (!crosses) return null;
                    const sx = CHART_MIN + gx * cellW + cellW / 2;
                    const sy = CHART_MIN + gy * cellH + cellH / 2;
                    return <rect key={`b${gx}-${gy}`} x={sx - 2} y={sy - 2} width={4} height={4} rx={2}
                      fill={boundaryColor} opacity={0.92} filter="url(#nsr-glow)" />;
                  })
                )}

                {/* Data points */}
                {rendered.map((s, i) => {
                  const px = toSX(s.x);
                  const py = toSY(s.y);
                  const pred = forwardW(weights, s.x, s.y) >= 0.5 ? 1 : 0;
                  const correct = pred === s.label;
                  const isInner = s.label === 1;
                  const fill = isInner ? '#64b84a' : '#4f8cff';
                  const stroke = correct ? (isInner ? '#2f7b28' : '#2854ad') : '#ff6b6b';
                  const r = correct ? 4 : 5;
                  return (
                    <g key={i}>
                      <circle cx={px} cy={py} r={r + (correct ? 2 : 3.5)} fill={correct ? fill : '#ff6b6b'} opacity={correct ? 0.12 : 0.22} />
                      <circle cx={px} cy={py} r={r} fill={fill} stroke={stroke} strokeWidth={correct ? 1.2 : 2} />
                    </g>
                  );
                })}

                {/* Axis labels */}
                {axisTicks.filter(v => v !== 0).map(v => (
                  <g key={`lbl-${v}`}>
                    <text x={toSX(v)} y={CHART_MAX + 16} textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.35)" fontFamily="ui-monospace,monospace">{v}</text>
                    <text x={CHART_MIN - 8} y={toSY(v) + 3.5} textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.35)" fontFamily="ui-monospace,monospace">{v}</text>
                  </g>
                ))}
              </svg>
            </div>

            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-muted)' }}>
              {[copy.boundaryDescription, copy.footer].filter(Boolean).join(' ')}
            </div>
          </PanelCard>
        ) : (
          <PanelCard minHeight={0} gap={12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{copy.codeTitle}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{copy.codeDescription}</div>
            </div>
            <div style={codeBodyStyle}>
              <CodeBlock code={copy.code} language="javascript" explanations={copy.codeExplanations} sourceRef={copy.source} />
            </div>
          </PanelCard>
        )}
      </TabbedPanelSurface>
    </div>
  );
});
