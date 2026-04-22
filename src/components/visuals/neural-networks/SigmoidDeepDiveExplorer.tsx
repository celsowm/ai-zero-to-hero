import React, { useMemo, useState } from 'react';
import type { SigmoidDeepDiveExplorerCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface Props {
  copy: SigmoidDeepDiveExplorerCopy;
}

type StepKey = 'input' | 'negation' | 'exponential' | 'output';

const W = 700;
const H = 320;
const PAD = { top: 24, right: 30, bottom: 38, left: 48 };
const STEP_KEYS: StepKey[] = ['input', 'negation', 'exponential', 'output'];
const STEP_COLORS: Record<StepKey, string> = {
  input: '#93a4bb',
  negation: '#16e0ff',
  exponential: '#66b84a',
  output: '#ff5da2',
};

const STEP_POSITIONS: Record<StepKey, number> = {
  input: 1.5,
  negation: -1.0,
  exponential: -3.5,
  output: 3.5,
};

const ZONE_POSITIONS: Record<'left' | 'middle' | 'right', number> = {
  left: -4.5,
  middle: 0,
  right: 4.5,
};

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

function xC(v: number) {
  return PAD.left + ((v + 6) / 12) * (W - PAD.left - PAD.right);
}

function yC(v: number) {
  const h = H - PAD.top - PAD.bottom;
  return H - PAD.bottom - Math.max(0, Math.min(1, v)) * h;
}

function path() {
  return Array.from({ length: 241 }, (_, i) => {
    const z = -6 + i * 0.05;
    return `${i === 0 ? 'M' : 'L'} ${xC(z)} ${yC(sigmoid(z))}`;
  }).join(' ');
}

function fmt(v: number) {
  return v.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
}

function zone(z: number) {
  if (z < -1.5) {
    return { key: 'left' as const, color: '#66b84a' }; // Verde (onde exp domina)
  }
  if (z <= 1.5) {
    return { key: 'middle' as const, color: '#16e0ff' }; // Azul (transição)
  }
  return { key: 'right' as const, color: '#ff5da2' }; // Rosa (saturação em 1)
}

export const SigmoidDeepDiveExplorer: React.FC<Props> = ({ copy }) => {
  const [z, setZ] = useState(0);
  const [activeStep, setActiveStep] = useState<StepKey>('input');
  const curvePath = useMemo(() => path(), []);

  const negated = -z;
  const exponential = Math.exp(-z);
  const denominator = 1 + exponential;
  const output = 1 / denominator;
  const zoneInfo = zone(z);

  const stepValues: Record<StepKey, string> = {
    input: fmt(z),
    negation: fmt(negated),
    exponential: fmt(denominator), // Agora bate com o cabeçalho "Denominador"
    output: fmt(output),
  };

  const activeCopy = copy.steps[activeStep];

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            gap: 12,
            alignItems: 'center',
            padding: '12px 16px',
            borderRadius: 16,
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center', minWidth: 0 }}>
            <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', whiteSpace: 'nowrap' }}>
              {copy.sliderLabel}
            </span>
            <input
              type="range"
              min={-6}
              max={6}
              step={0.1}
              value={z}
              onChange={(event) => setZ(Number(event.target.value))}
              style={{ flex: 1, minWidth: 120, accentColor: '#16e0ff' }}
            />
          </div>

          <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
            <Readout label={copy.inputLabel} value={fmt(z)} color="#93a4bb" />
            <Readout label={copy.denominatorLabel} value={fmt(denominator)} color="#66b84a" />
            <Readout label={copy.outputLabel} value={fmt(output)} color="#ff5da2" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.45fr) minmax(280px, 0.9fr)', gap: 14, minHeight: 0, flex: 1 }}>
          <PanelCard
            minHeight={0}
            padding={0}
            gap={0}
            style={{
              overflow: 'hidden',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), radial-gradient(circle at 50% 16%, rgba(22,224,255,0.10), rgba(10,12,19,0.96) 56%)',
            }}
          >
            <div style={{ padding: '14px 16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
                <div style={{ display: 'grid', gap: 4 }}>
                  <span style={{ fontSize: 11, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                    {copy.chartTitle}
                  </span>
                  <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.1em' }}>
                    {copy.formulaTitle}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.68)', fontFamily: 'monospace' }}>{copy.formula}</span>
              </div>
            </div>

            <div style={{ flex: 1, minHeight: 0 }}>
              <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-label={copy.ariaLabel} style={{ display: 'block' }}>
                <defs>
                  <filter id="sigmoid-deep-glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {[-6, -3, 0, 3, 6].map((tick) => (
                  <g key={`x-${tick}`}>
                    <line x1={xC(tick)} x2={xC(tick)} y1={PAD.top} y2={H - PAD.bottom} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6" />
                    <text x={xC(tick)} y={H - 14} fill="rgba(255,255,255,0.45)" fontSize="10" textAnchor="middle">
                      {tick}
                    </text>
                  </g>
                ))}

                {[0, 0.5, 1].map((tick) => (
                  <g key={`y-${tick}`}>
                    <line
                      x1={PAD.left}
                      x2={W - PAD.right}
                      y1={yC(tick)}
                      y2={yC(tick)}
                      stroke={tick === 0.5 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)'}
                      strokeDasharray={tick === 0.5 ? '7 7' : '4 6'}
                    />
                    <text x={14} y={yC(tick) + 4} fill="rgba(255,255,255,0.45)" fontSize="10">
                      {tick}
                    </text>
                  </g>
                ))}

                <line x1={xC(0)} x2={xC(0)} y1={PAD.top} y2={H - PAD.bottom} stroke="rgba(255,255,255,0.18)" />

                <path d={curvePath} fill="none" stroke="#ff5da2" strokeWidth="4" strokeLinecap="round" filter="url(#sigmoid-deep-glow)" />

                {/* Vertical z line - now using active step color for perfect linking */}
                <line 
                  x1={xC(z)} x2={xC(z)} 
                  y1={PAD.top} y2={H - PAD.bottom} 
                  stroke={STEP_COLORS[activeStep]} 
                  strokeDasharray="6 7" 
                  strokeWidth={activeStep === 'input' ? 1.8 : 2.5} 
                  style={{ transition: 'stroke 0.3s ease, stroke-width 0.3s ease' }}
                />
                
                {/* Secondary ghost line for negation step */}
                {activeStep === 'negation' && (
                  <line 
                    x1={xC(-z)} x2={xC(-z)} 
                    y1={PAD.top} y2={H - PAD.bottom} 
                    stroke={STEP_COLORS.negation} 
                    strokeDasharray="3 4" 
                    strokeWidth="1.2" 
                    opacity="0.5"
                  />
                )}

                <circle cx={xC(z)} cy={yC(output)} r="18" fill="#ff5da2" opacity="0.12" />
                <circle cx={xC(z)} cy={yC(output)} r="7" fill="#ff5da2" />
                <text x={xC(z) + 12} y={yC(output) - 12} fill="#ff5da2" fontSize="11" fontWeight="800">
                  sigmoid(z)
                </text>
                <text x={xC(z) + 12} y={yC(output) + 4} fill="rgba(255,255,255,0.74)" fontSize="11" fontFamily="monospace">
                  {fmt(output)}
                </text>
              </svg>
            </div>
          </PanelCard>

          <PanelCard
            minHeight={0}
            padding={18}
            gap={12}
            style={{
              overflow: 'auto',
              background:
                'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98)), radial-gradient(circle at top, rgba(22,224,255,0.06), transparent 36%)',
            }}
          >
            <div>
              <div style={{ fontSize: 10, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                {copy.eulerTitle}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--sw-text-dim)', lineHeight: 1.65 }}>{copy.eulerBody}</div>
            </div>

            <div style={{ display: 'grid', gap: 8 }}>
              {copy.eulerBullets.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 12,
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    fontSize: 12,
                    color: 'var(--sw-text-dim)',
                    lineHeight: 1.55,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: 14,
                background: 'rgba(102,184,74,0.08)',
                border: '1px solid rgba(102,184,74,0.24)',
              }}
            >
              <div style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                {copy.convergenceTitle}
              </div>
              <div style={{ fontSize: 12, color: 'var(--sw-text-dim)', lineHeight: 1.55, marginBottom: 10 }}>{copy.convergenceBody}</div>

              <div style={{ display: 'grid', gap: 6 }}>
                {copy.convergenceRows.map((row) => (
                  <div
                    key={`${row.label}-${row.expression}`}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '72px minmax(0, 1fr) auto',
                      gap: 10,
                      alignItems: 'center',
                      padding: '8px 10px',
                      borderRadius: 10,
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.05)',
                    }}
                  >
                    <span style={{ fontSize: 11, color: '#66b84a', fontWeight: 800 }}>{row.label}</span>
                    <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.72)', fontFamily: 'monospace', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {row.expression}
                    </span>
                    <span style={{ fontSize: 12.5, color: '#eef6ff', fontFamily: 'monospace', fontWeight: 900 }}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: 14,
                background: `${zoneInfo.color}12`,
                border: `1px solid ${zoneInfo.color}33`,
              }}
            >
              <div style={{ fontSize: 10, color: zoneInfo.color, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                {copy.zoneTitle}
              </div>
              <button
                type="button"
                onClick={() => setZ(ZONE_POSITIONS[zoneInfo.key])}
                style={{
                  display: 'inline-flex',
                  padding: '5px 11px',
                  borderRadius: 999,
                  background: `${zoneInfo.color}16`,
                  border: `1px solid ${zoneInfo.color}44`,
                  fontSize: 11,
                  color: zoneInfo.color,
                  fontWeight: 800,
                  marginBottom: 10,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseOver={(e) => (e.currentTarget.style.background = `${zoneInfo.color}24`)}
                onMouseOut={(e) => (e.currentTarget.style.background = `${zoneInfo.color}16`)}
              >
                {copy.zones[zoneInfo.key]}
              </button>
              <div style={{ fontSize: 12.5, color: 'var(--sw-text-dim)', lineHeight: 1.6 }}>{activeCopy.body}</div>
            </div>

            <div
              style={{
                padding: '12px 14px',
                borderRadius: 14,
                background: 'rgba(255,93,162,0.10)',
                border: '1px solid rgba(255,93,162,0.24)',
              }}
            >
              <div style={{ fontSize: 10, color: '#ff5da2', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                {copy.takeawayTitle}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--sw-text-dim)', lineHeight: 1.65 }}>{copy.takeawayBody}</div>
            </div>
          </PanelCard>
        </div>

        <PanelCard
          minHeight={0}
          padding={16}
          gap={10}
          style={{ background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12 }}>
            <span style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.stepperTitle}
            </span>
            <span style={{ fontSize: 12, color: 'var(--sw-text-dim)' }}>
              {copy.stepFocusLabel}: <span style={{ color: STEP_COLORS[activeStep], fontWeight: 800 }}>{activeCopy.label}</span>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
            {STEP_KEYS.map((stepKey, index) => {
              const step = copy.steps[stepKey];
              const active = stepKey === activeStep;

              return (
                <button
                  key={stepKey}
                  type="button"
                  onClick={() => {
                    setActiveStep(stepKey);
                    setZ(STEP_POSITIONS[stepKey]);
                  }}
                  onMouseEnter={() => {
                    setActiveStep(stepKey);
                    setZ(STEP_POSITIONS[stepKey]);
                  }}
                  style={{
                    textAlign: 'left',
                    padding: '12px 12px 10px',
                    borderRadius: 14,
                    border: `1px solid ${active ? STEP_COLORS[stepKey] : 'rgba(255,255,255,0.06)'}`,
                    background: active ? `${STEP_COLORS[stepKey]}14` : 'rgba(255,255,255,0.02)',
                    boxShadow: active ? `0 0 0 1px ${STEP_COLORS[stepKey]}33, 0 0 14px ${STEP_COLORS[stepKey]}14` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 10, color: STEP_COLORS[stepKey], fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                      {index + 1}
                    </span>
                    <span style={{ fontSize: 13, color: STEP_COLORS[stepKey], fontFamily: 'monospace', fontWeight: 900 }}>{stepValues[stepKey]}</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--sw-text)', fontWeight: 800, lineHeight: 1.35, marginBottom: 6 }}>{step.label}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--sw-text-dim)', lineHeight: 1.5 }}>{step.body}</div>
                </button>
              );
            })}
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
};

const Readout: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</span>
    <strong style={{ color, fontFamily: 'monospace', fontSize: 14, fontWeight: 900 }}>{value}</strong>
  </div>
);
