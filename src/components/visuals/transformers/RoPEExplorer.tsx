import React, { useMemo, useState, useCallback } from 'react';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface RoPEExplorerCopy {
  title: string;
  subtitle: string;
  embeddingLabel: string;
  positionLabel: string;
  dimLabel: string;
  rotationTitle: string;
  rotationFormula: string;
  freqTitle: string;
  freqSubtitle: string;
  freqFormula: string;
  extrapolationTitle: string;
  extrapolationSubtitle: string;
  stepperTitle: string;
  stepFocusLabel: string;
  step1Label: string;
  step1Body: string;
  step2Label: string;
  step2Body: string;
  step3Label: string;
  step3Body: string;
  step4Label: string;
  step4Body: string;
  xCoordLabel: string;
  yCoordLabel: string;
  angleLabel: string;
  cosLabel: string;
  sinLabel: string;
  ropeLabel: string;
  sinusoidalLabel: string;
  attentionLabel: string;
  distanceLabel: string;
  dimPairLabel: string;
  thetaLabel: string;
  freqLabel: string;
  ropeScoreLabel: string;
  sinusoidalScoreLabel: string;
  ropeDegradationLabel: string;
  usePresetLabel: string;
  customEmbeddingLabel: string;
  applyLabel: string;
}

interface Props {
  copy: RoPEExplorerCopy;
}

// ── Constants ──────────────────────────────────────────────────────────────

const BASE = 10000;
const HIDDEN_DIM = 64; // Simplified for visualization
const NUM_PAIRS = HIDDEN_DIM / 2;
const MAX_POSITION = 2048;
const TRAIN_SEQ_LEN = 512;

// ── Math ───────────────────────────────────────────────────────────────────

function calcTheta(i: number, d: number): number {
  return Math.pow(BASE, (-2 * i) / d);
}

function rotate2D(x: number, y: number, angle: number): [number, number] {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return [x * cos - y * sin, x * sin + y * cos];
}

// Attention score similarity: RoPE depends only on relative position difference
function ropeAttentionScore(posQ: number, posK: number, d: number): number {
  const relPos = Math.abs(posQ - posK);
  // RoPE: attention decays smoothly with relative distance
  // Simplified model: exponential decay based on relative position
  return Math.exp(-relPos / (d / 4));
}

function sinusoidalAttentionScore(posQ: number, posK: number, d: number, trainLen: number): number {
  const relPos = Math.abs(posQ - posK);
  // Sinusoidal: degrades when extrapolating beyond training length
  const extrapolationPenalty = relPos > trainLen ? Math.exp(-(relPos - trainLen) / trainLen) : 1;
  return Math.exp(-relPos / (d / 4)) * extrapolationPenalty;
}

function fmt(v: number, decimals = 4): string {
  return v.toFixed(decimals);
}

type StepKey = 'embed' | 'angles' | 'rotate' | 'output';
const STEP_KEYS: StepKey[] = ['embed', 'angles', 'rotate', 'output'];
const STEP_COLORS: Record<StepKey, string> = {
  embed: '#93a4bb',
  angles: '#16e0ff',
  rotate: '#a855f7',
  output: '#ff5da2',
};

// ── SVG helpers ────────────────────────────────────────────────────────────

const SVG_W = 400;
const SVG_H = 300;
const CX = SVG_W / 2;
const CY = SVG_H / 2;
const RADIUS = 100;

// ── Component ──────────────────────────────────────────────────────────────

export const RoPEExplorer = React.memo(({ copy }: Props) => {
  const [position, setPosition] = useState(0);
  const [pairIndex, setPairIndex] = useState(0);
  const [embeddingX, setEmbeddingX] = useState(0.8);
  const [embeddingY, setEmbeddingY] = useState(0.3);
  const [activeStep, setActiveStep] = useState<StepKey>('rotate');
  const [usePreset, setUsePreset] = useState(true);

  // Preset embeddings for demonstration
  const presets = useMemo(() => [
    { x: 0.8, y: 0.3, label: 'Token A' },
    { x: -0.5, y: 0.7, label: 'Token B' },
    { x: 0.1, y: -0.9, label: 'Token C' },
  ], []);

  const ex = usePreset ? presets[0].x : embeddingX;
  const ey = usePreset ? presets[0].y : embeddingY;

  // REAL computation: rotation
  const rotation = useMemo(() => {
    const theta = calcTheta(pairIndex, HIDDEN_DIM);
    const angle = position * theta;
    const [rx, ry] = rotate2D(ex, ey, angle);
    return { theta, angle, cos: Math.cos(angle), sin: Math.sin(angle), rx, ry };
  }, [position, pairIndex, ex, ey]);

  // Frequency bands
  const freqBands = useMemo(() => {
    return Array(NUM_PAIRS).fill(0).map((_, i) => {
      const theta = calcTheta(i, HIDDEN_DIM);
      return { i, theta, freq: 1 / (2 * Math.PI / theta) };
    });
  }, []);

  // Extrapolation comparison
  const extrapolation = useMemo(() => {
    const queryPos = TRAIN_SEQ_LEN;
    const positions = Array(20).fill(0).map((_, i) => {
      const keyPos = TRAIN_SEQ_LEN + i * 100;
      return {
        distance: keyPos - queryPos,
        ropeScore: ropeAttentionScore(queryPos, keyPos, HIDDEN_DIM),
        sinusoidalScore: sinusoidalAttentionScore(queryPos, keyPos, HIDDEN_DIM, TRAIN_SEQ_LEN),
      };
    });
    return positions;
  }, []);

  const stepValues: Record<StepKey, string> = {
    embed: `[${fmt(ex)}, ${fmt(ey)}]`,
    angles: `θ=${fmt(rotation.theta, 6)}`,
    rotate: `m=${position}`,
    output: `[${fmt(rotation.rx)}, ${fmt(rotation.ry)}]`,
  };

  const handlePresetSelect = useCallback((idx: number) => {
    setUsePreset(true);
    setEmbeddingX(presets[idx].x);
    setEmbeddingY(presets[idx].y);
  }, [presets]);

  // SVG circle point
  const svgX = CX + rotation.rx * RADIUS;
  const svgY = CY - rotation.ry * RADIUS;
  const origX = CX + ex * RADIUS;
  const origY = CY - ey * RADIUS;

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* ── Controls ─────────────────────────────────────────────── */}
        <PanelCard padding={14} gap={12} style={{ background: sw.tintStrong }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.positionLabel} (m)
              </span>
              <span style={{ fontSize: 13, color: '#a855f7', fontFamily: 'monospace', fontWeight: 900 }}>
                {position}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={MAX_POSITION}
              step="1"
              value={position}
              onChange={(e) => setPosition(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#a855f7' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
              <span style={{ fontSize: 10, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.dimPairLabel} (i)
              </span>
              <span style={{ fontSize: 13, color: '#16e0ff', fontFamily: 'monospace', fontWeight: 900 }}>
                {pairIndex}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={NUM_PAIRS - 1}
              step="1"
              value={pairIndex}
              onChange={(e) => setPairIndex(parseInt(e.target.value))}
              style={{ width: '100%', accentColor: '#16e0ff' }}
            />
          </div>

          <div>
            <span style={{ fontSize: 10, color: '#ff5da2', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
              {copy.usePresetLabel}
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              {presets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetSelect(idx)}
                  style={{
                    flex: 1,
                    padding: '6px',
                    borderRadius: 6,
                    border: usePreset && embeddingX === p.x && embeddingY === p.y ? '2px solid #ff5da2' : `1px solid ${sw.borderSubtle}`,
                    background: usePreset && embeddingX === p.x && embeddingY === p.y ? '#ff5da218' : sw.tint,
                    color: usePreset && embeddingX === p.x && embeddingY === p.y ? '#ff5da2' : sw.textMuted,
                    cursor: 'pointer',
                    fontSize: 10,
                    fontWeight: 700,
                    fontFamily: 'monospace',
                  }}
                >
                  {p.label}
                </button>
              ))}
              <button
                onClick={() => setUsePreset(false)}
                style={{
                  flex: 1,
                  padding: '6px',
                  borderRadius: 6,
                  border: !usePreset ? '2px solid #66b84a' : `1px solid ${sw.borderSubtle}`,
                  background: !usePreset ? '#66b84a18' : sw.tint,
                  color: !usePreset ? '#66b84a' : sw.textMuted,
                  cursor: 'pointer',
                  fontSize: 10,
                  fontWeight: 700,
                }}
              >
                Custom
              </button>
            </div>
          </div>

          {!usePreset && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 9, color: '#06b6d4', fontWeight: 700 }}>x</span>
                  <span style={{ fontSize: 11, color: '#06b6d4', fontFamily: 'monospace', fontWeight: 900 }}>{fmt(embeddingX, 2)}</span>
                </div>
                <input type="range" min="-1" max="1" step="0.05" value={embeddingX} onChange={(e) => setEmbeddingX(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#06b6d4' }} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                  <span style={{ fontSize: 9, color: '#f59e0b', fontWeight: 700 }}>y</span>
                  <span style={{ fontSize: 11, color: '#f59e0b', fontFamily: 'monospace', fontWeight: 900 }}>{fmt(embeddingY, 2)}</span>
                </div>
                <input type="range" min="-1" max="1" step="0.05" value={embeddingY} onChange={(e) => setEmbeddingY(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#f59e0b' }} />
              </div>
            </div>
          )}
        </PanelCard>

        {/* ── 2D Rotation Visualizer ───────────────────────────────── */}
        <PanelCard
          padding={0}
          style={{
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '12px 16px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 10, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.rotationTitle}
              </span>
              <code style={{ fontSize: 9, color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>
                {copy.rotationFormula}
              </code>
            </div>
          </div>

          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
            {/* Grid circles */}
            <circle cx={CX} cy={CY} r={RADIUS} fill="none" stroke={sw.borderSubtle} strokeDasharray="4 6" />
            <circle cx={CX} cy={CY} r={RADIUS * 0.5} fill="none" stroke={sw.borderSubtle} strokeDasharray="3 5" />

            {/* Axes */}
            <line x1={CX - RADIUS - 20} x2={CX + RADIUS + 20} y1={CY} y2={CY} stroke={sw.borderSubtle} />
            <line x1={CX} x2={CY} y1={CY - RADIUS - 20} y2={CY + RADIUS + 20} stroke={sw.borderSubtle} />

            {/* Axis labels */}
            <text x={CX + RADIUS + 25} y={CY + 4} fill="rgba(255,255,255,0.35)" fontSize="10">dim 2i</text>
            <text x={CX + 4} y={CY - RADIUS - 25} fill="rgba(255,255,255,0.35)" fontSize="10">dim 2i+1</text>

            {/* Original vector */}
            <line x1={CX} y1={CY} x2={origX} y2={origY} stroke="#66b84a" strokeWidth="2" strokeDasharray="5 4" />
            <circle cx={origX} cy={origY} r="5" fill="#66b84a" />
            <text x={origX + 8} y={origY - 8} fill="#66b84a" fontSize="9" fontWeight="700">orig</text>

            {/* Rotation arc */}
            {position > 0 && (
              <path
                d={`M ${origX} ${origY} A ${RADIUS} ${RADIUS} 0 ${rotation.angle < 0 ? '1' : '0'} 0 ${svgX} ${svgY}`}
                fill="none"
                stroke="#16e0ff"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                opacity="0.6"
              />
            )}

            {/* Rotated vector */}
            <line x1={CX} y1={CY} x2={svgX} y2={svgY} stroke="#ff5da2" strokeWidth="2.5" />
            <circle cx={svgX} cy={svgY} r="6" fill="#ff5da2" />
            <text x={svgX + 8} y={svgY - 8} fill="#ff5da2" fontSize="10" fontWeight="800">m={position}</text>

            {/* Angle annotation */}
            {position > 0 && rotation.angle < Math.PI && (
              <text
                x={CX + 30}
                y={CY - 30}
                fill="#16e0ff"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="700"
              >
                m·θ = {fmt(rotation.angle, 3)} rad
              </text>
            )}
          </svg>

          {/* Readouts */}
          <div style={{ padding: '10px 16px', display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            <Readout label={copy.xCoordLabel} value={fmt(rotation.rx)} color="#06b6d4" />
            <Readout label={copy.yCoordLabel} value={fmt(rotation.ry)} color="#f59e0b" />
            <Readout label={copy.thetaLabel} value={fmt(rotation.theta, 6)} color="#16e0ff" />
            <Readout label={copy.cosLabel} value={fmt(rotation.cos)} color="#a855f7" />
            <Readout label={copy.sinLabel} value={fmt(rotation.sin)} color="#ff5da2" />
          </div>
        </PanelCard>

        {/* ── Frequency Bands Chart ────────────────────────────────── */}
        <PanelCard
          padding={14}
          style={{
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontSize: 10, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.freqTitle}
            </span>
            <code style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: 'monospace' }}>
              {copy.freqFormula}
            </code>
          </div>
          <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', marginBottom: 10 }}>
            {copy.freqSubtitle}
          </div>
          <svg viewBox={`0 0 ${SVG_W} 120`} width="100%" style={{ display: 'block' }}>
            {/* Axes */}
            <line x1={40} x2={SVG_W - 10} y1={10} y2={10} stroke={sw.borderSubtle} />
            <line x1={40} x2={40} y1={10} y2={110} stroke={sw.borderSubtle} />

            {/* Frequency bars */}
            {freqBands.slice(0, 32).map((fb) => {
              const logFreq = Math.log10(fb.freq);
              const maxLog = Math.log10(freqBands[0].freq);
              const minLog = Math.log10(freqBands[freqBands.length - 1].freq);
              const pct = ((logFreq - minLog) / (maxLog - minLog)) * 90 + 5;
              const x = 40 + (fb.i / 32) * (SVG_W - 50);
              const isHighlighted = fb.i === pairIndex;

              return (
                <g key={fb.i}>
                  <rect
                    x={x}
                    y={110 - pct}
                    width={(SVG_W - 50) / 32 - 1}
                    height={pct}
                    fill={isHighlighted ? '#16e0ff' : 'rgba(22,224,255,0.3)'}
                    rx={2}
                  />
                  {fb.i % 8 === 0 && (
                    <text x={x} y={118} fill="rgba(255,255,255,0.3)" fontSize="7" textAnchor="middle">
                      {fb.i}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Labels */}
            <text x={10} y={50} fill="rgba(255,255,255,0.4)" fontSize="8" textAnchor="middle" transform={`rotate(-90, 10, 50)`}>
              {copy.freqLabel}
            </text>
            <text x={SVG_W / 2} y={115} fill="rgba(255,255,255,0.3)" fontSize="8" textAnchor="middle">
              {copy.dimPairLabel}
            </text>
          </svg>
        </PanelCard>

        {/* ── Extrapolation Comparison ─────────────────────────────── */}
        <PanelCard
          padding={14}
          style={{
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
            <span style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.extrapolationTitle}
            </span>
            <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.35)', fontFamily: 'monospace' }}>
              {copy.extrapolationSubtitle}
            </span>
          </div>
          <svg viewBox={`0 0 ${SVG_W} 100`} width="100%" style={{ display: 'block' }}>
            {/* Grid */}
            <line x1={30} x2={SVG_W - 10} y1={10} y2={10} stroke={sw.borderSubtle} strokeDasharray="3 4" />
            <line x1={30} x2={SVG_W - 10} y1={50} y2={50} stroke={sw.borderSubtle} strokeDasharray="3 4" />
            <line x1={30} x2={SVG_W - 10} y1={90} y2={90} stroke={sw.borderSubtle} />

            {/* Training boundary */}
            <line x1={30} x2={30} y1={10} y2={90} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x={30} y={98} fill="#f59e0b" fontSize="7" textAnchor="middle">train={TRAIN_SEQ_LEN}</text>

            {/* RoPE line */}
            <polyline
              points={extrapolation.map((p, i) => `${30 + i * ((SVG_W - 40) / (extrapolation.length - 1))},${90 - p.ropeScore * 80}`).join(' ')}
              fill="none"
              stroke="#ff5da2"
              strokeWidth="2"
            />

            {/* Sinusoidal line */}
            <polyline
              points={extrapolation.map((p, i) => `${30 + i * ((SVG_W - 40) / (extrapolation.length - 1))},${90 - p.sinusoidalScore * 80}`).join(' ')}
              fill="none"
              stroke="#66b84a"
              strokeWidth="2"
              strokeDasharray="5 3"
            />

            {/* Legend */}
            <circle cx={SVG_W - 80} cy={15} r="3" fill="#ff5da2" />
            <text x={SVG_W - 73} y={18} fill="#ff5da2" fontSize="7" fontWeight="700">{copy.ropeLabel}</text>
            <circle cx={SVG_W - 80} cy={28} r="3" fill="#66b84a" />
            <text x={SVG_W - 73} y={31} fill="#66b84a" fontSize="7" fontWeight="700">{copy.sinusoidalLabel}</text>
          </svg>
        </PanelCard>

        {/* ── Stepper ──────────────────────────────────────────────── */}
        <PanelCard padding={14} gap={10} style={{ background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.stepperTitle}
            </span>
            <span style={{ fontSize: 11, color: 'var(--sw-text-dim)' }}>
              {copy.stepFocusLabel}:{' '}
              <span style={{ color: STEP_COLORS[activeStep], fontWeight: 800 }}>
                {{ embed: copy.step1Label, angles: copy.step2Label, rotate: copy.step3Label, output: copy.step4Label }[activeStep]}
              </span>
            </span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {STEP_KEYS.map((step, idx) => {
              const isActive = step === activeStep;
              const body = { embed: copy.step1Body, angles: copy.step2Body, rotate: copy.step3Body, output: copy.step4Body }[step];
              const label = { embed: copy.step1Label, angles: copy.step2Label, rotate: copy.step3Label, output: copy.step4Label }[step];

              return (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  onMouseEnter={() => setActiveStep(step)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 10px',
                    borderRadius: 10,
                    border: `1px solid ${isActive ? STEP_COLORS[step] : sw.borderSubtle}`,
                    background: isActive ? `${STEP_COLORS[step]}12` : sw.tint,
                    boxShadow: isActive ? `0 0 0 1px ${STEP_COLORS[step]}30, 0 0 10px ${STEP_COLORS[step]}10` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 9, color: STEP_COLORS[step], fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: 11, color: STEP_COLORS[step], fontFamily: 'monospace', fontWeight: 900 }}>
                      {stepValues[step]}
                    </span>
                  </div>
                  <div style={{ fontSize: 10.5, color: sw.text, fontWeight: 800, lineHeight: 1.35, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', lineHeight: 1.5 }}>{body}</div>
                </button>
              );
            })}
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
});

// ── Sub-component ──────────────────────────────────────────────────────────

const Readout: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ padding: '6px 6px', borderRadius: 6, background: 'rgba(0,0,0,0.25)', border: `1px solid ${color}20`, textAlign: 'center' }}>
    <div style={{ fontSize: 8, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{label}</div>
    <div style={{ fontSize: 13, color, fontFamily: 'monospace', fontWeight: 900 }}>{value}</div>
  </div>
);
