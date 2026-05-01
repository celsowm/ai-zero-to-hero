import React, { useMemo, useState } from 'react';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface MoeGatingMathVisualCopy {
  title: string;
  subtitle: string;
  step1Title: string;
  step1Formula: string;
  step1Desc: string;
  step2Title: string;
  step2Formula: string;
  step2Desc: string;
  step3Title: string;
  step3Formula: string;
  step3Desc: string;
  step4Title: string;
  step4Formula: string;
  step4Desc: string;
  tokenLabel: string;
  expertLabel: string;
  logitLabel: string;
  probLabel: string;
  weightLabel: string;
  temperatureLabel: string;
  topkLabel: string;
  selectedLabel: string;
  notSelectedLabel: string;
  sumLabel: string;
  efficiencyLabel: string;
}

interface Props {
  copy: MoeGatingMathVisualCopy;
}

// ── Constants ──────────────────────────────────────────────────────────────

const NUM_EXPERTS = 8;
const EMBED_DIM = 4;

// Same deterministic weights as MoeRouterExplorer
const GATING_WEIGHTS: number[][] = [
  [ 1.2, -0.3,  0.5,  0.1],
  [ 0.9, -0.1,  0.3, -0.2],
  [-0.2,  1.1, -0.6,  0.4],
  [-0.1,  0.8, -0.3,  0.5],
  [ 0.4,  0.6,  0.1, -0.1],
  [ 0.1, -0.2,  0.9, -0.4],
  [-0.3,  0.1,  0.0,  1.0],
  [-0.1, -0.6, -0.1, -0.2],
];

const TOKEN_OPTIONS = [
  { id: 'verb', label: 'correr', embedding: [0.8, -0.3,  0.5,  0.1], color: '#06b6d4' },
  { id: 'noun', label: 'gato',   embedding: [-0.2,  0.7, -0.4,  0.6], color: '#8b5cf6' },
  { id: 'adj',  label: 'rápido', embedding: [0.3,  0.5, -0.1,  0.4], color: '#f59e0b' },
  { id: 'prep', label: 'de',     embedding: [-0.4,  0.2,  0.1,  0.7], color: '#ec4899' },
];

const EXPERT_COLORS = ['#06b6d4', '#0891b2', '#8b5cf6', '#7c3aed', '#f59e0b', '#d97706', '#10b981', '#059669'];

// ── Math ───────────────────────────────────────────────────────────────────

function dot(a: number[], b: number[]): number {
  return a.reduce((s: number, v: number, i: number) => s + v * b[i], 0);
}

function softmax(logits: number[], tau: number): number[] {
  const scaled = logits.map((l: number) => l / Math.max(tau, 0.01));
  const maxL = Math.max(...scaled);
  const exps = scaled.map((l: number) => Math.exp(l - maxL));
  const sum = exps.reduce((a: number, b: number) => a + b, 0);
  return exps.map((e: number) => e / sum);
}

function fmt(v: number, d = 3): string {
  return v.toFixed(d);
}

// ── Component ──────────────────────────────────────────────────────────────

export const MoeGatingMathVisual = React.memo(({ copy }: Props) => {
  const [selectedToken, setSelectedToken] = useState(0);
  const [temperature, setTemperature] = useState(1.0);
  const [topK, setTopK] = useState(2);
  const [activeStep, setActiveStep] = useState(2); // 1-4

  const token = TOKEN_OPTIONS[selectedToken];

  const computation = useMemo(() => {
    // Step 1: Logits
    const logits = GATING_WEIGHTS.map((w: number[]) => dot(w, token.embedding));

    // Step 2: Softmax
    const probs = softmax(logits, temperature);

    // Step 3: Top-K
    const indexed = probs.map((v: number, i: number) => ({ v, i }));
    const sorted = [...indexed].sort((a, b) => b.v - a.v);
    const topIndices = sorted.slice(0, topK).map((x) => x.i);

    // Step 4: Renormalize
    const sumSelected = sorted.slice(0, topK).reduce((s: number, x) => s + x.v, 0);
    const renormalized = probs.map((p: number, i: number) =>
      topIndices.includes(i) ? p / sumSelected : 0
    );

    return { logits, probs, topIndices, renormalized, sumSelected };
  }, [temperature, topK, token.embedding]);

  const stepFormulas = [
    copy.step1Formula,
    copy.step2Formula,
    copy.step3Formula,
    copy.step4Formula,
  ];

  const stepDesc = [
    copy.step1Desc,
    copy.step2Desc,
    copy.step3Desc,
    copy.step4Desc,
  ];

  const stepTitles = [
    copy.step1Title,
    copy.step2Title,
    copy.step3Title,
    copy.step4Title,
  ];

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* ── Controls ─────────────────────────────────────────────── */}
        <PanelCard padding={14} gap={12} style={{ background: sw.tintStrong }}>
          <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 900 }}>
            {copy.tokenLabel}
          </span>
          <div style={{ display: 'flex', gap: 8 }}>
            {TOKEN_OPTIONS.map((tok, idx) => (
              <button
                key={tok.id}
                onClick={() => setSelectedToken(idx)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: 8,
                  border: selectedToken === idx ? `2px solid ${tok.color}` : `1px solid ${sw.borderSubtle}`,
                  background: selectedToken === idx ? `${tok.color}18` : sw.tint,
                  color: selectedToken === idx ? tok.color : sw.textMuted,
                  cursor: 'pointer',
                  fontSize: 12,
                  fontWeight: selectedToken === idx ? 800 : 600,
                  transition: 'all 0.2s ease',
                }}
              >
                {tok.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 4 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  {copy.temperatureLabel}
                </span>
                <span style={{ fontSize: 13, color: '#16e0ff', fontFamily: 'monospace', fontWeight: 900 }}>
                  {fmt(temperature, 2)}
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="3.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#16e0ff' }}
              />
            </div>
            <div>
              <span style={{ fontSize: 10, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                {copy.topkLabel}
              </span>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 4].map((k) => (
                  <button
                    key={k}
                    onClick={() => setTopK(k)}
                    style={{
                      flex: 1,
                      padding: '6px',
                      borderRadius: 6,
                      border: topK === k ? `2px solid #a855f7` : `1px solid ${sw.borderSubtle}`,
                      background: topK === k ? '#a855f720' : sw.tint,
                      color: topK === k ? '#a855f7' : sw.textMuted,
                      cursor: 'pointer',
                      fontSize: 12,
                      fontWeight: 800,
                      fontFamily: 'monospace',
                    }}
                  >
                    k={k}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </PanelCard>

        {/* ── Step Detail Panel ────────────────────────────────────── */}
        <PanelCard
          padding={16}
          style={{
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
            border: `1px solid ${sw.borderSubtle}`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
            <span style={{ fontSize: 10, color: EXPERT_COLORS[activeStep - 1], fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {stepTitles[activeStep - 1]}
            </span>
            <code style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace' }}>
              {stepFormulas[activeStep - 1]}
            </code>
          </div>
          <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', lineHeight: 1.55 }}>
            {stepDesc[activeStep - 1]}
          </div>
        </PanelCard>

        {/* ── Step Visualization ───────────────────────────────────── */}
        {activeStep === 1 && (
          /* Step 1: Dot Product — show weight matrix */
          <PanelCard padding={14} gap={10}>
            <div style={{ fontSize: 11, color: sw.textMuted, marginBottom: 8 }}>
              {copy.weightLabel} matrix W_g ({NUM_EXPERTS} × {EMBED_DIM}):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${EMBED_DIM + 1}, 1fr)`, gap: 2, fontSize: 10, fontFamily: 'monospace' }}>
              {/* Header */}
              <div style={{ padding: '4px 6px', background: sw.tintStrong, borderRadius: 4, fontWeight: 800, color: '#16e0ff' }}>
                Expert
              </div>
              {Array(EMBED_DIM).fill(0).map((_, i) => (
                <div key={i} style={{ padding: '4px 6px', background: sw.tintStrong, borderRadius: 4, fontWeight: 800, color: '#16e0ff', textAlign: 'center' }}>
                  x{i}
                </div>
              ))}
              {/* Rows */}
              {GATING_WEIGHTS.map((row, i) => (
                <React.Fragment key={i}>
                  <div style={{ padding: '4px 6px', background: `${EXPERT_COLORS[i]}15`, borderRadius: 4, fontWeight: 700, color: EXPERT_COLORS[i] }}>
                    E{i}
                  </div>
                  {row.map((v: number, j: number) => (
                    <div
                      key={j}
                      style={{
                        padding: '4px 6px',
                        background: v > 0 ? 'rgba(6,182,212,0.08)' : 'rgba(255,93,162,0.08)',
                        borderRadius: 4,
                        color: v > 0 ? '#06b6d4' : '#ff5da2',
                        fontWeight: 700,
                        textAlign: 'center',
                      }}
                    >
                      {fmt(v, 2)}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
            <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', marginTop: 6 }}>
              Positivo = cyan, Negativo = rosa
            </div>
          </PanelCard>
        )}

        {activeStep === 2 && (
          /* Step 2: Softmax — bar chart */
          <PanelCard
            padding={14}
            style={{
              background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span style={{ fontSize: 11, color: sw.textMuted }}>{copy.probLabel}</span>
              <span style={{ fontSize: 11, color: '#66b84a', fontFamily: 'monospace', fontWeight: 900 }}>
                {copy.sumLabel}: {fmt(computation.probs.reduce((a: number, b: number) => a + b, 0))}
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {computation.probs.map((p: number, i: number) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 32, fontSize: 10, color: EXPERT_COLORS[i], fontWeight: 800, fontFamily: 'monospace' }}>
                    E{i}
                  </span>
                  <div style={{ flex: 1, height: 18, background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${p * 100}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${EXPERT_COLORS[i]}, ${EXPERT_COLORS[i]}66)`,
                        borderRadius: 4,
                        transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                    />
                  </div>
                  <span style={{ width: 48, fontSize: 10, color: sw.text, fontFamily: 'monospace', fontWeight: 700, textAlign: 'right' }}>
                    {(p * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          </PanelCard>
        )}

        {activeStep === 3 && (
          /* Step 3: Top-K selection */
          <PanelCard padding={14} gap={8}>
            {computation.probs.map((p: number, i: number) => {
              const isSelected = computation.topIndices.includes(i);
              return (
                <div
                  key={i}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: isSelected ? `2px solid ${EXPERT_COLORS[i]}` : `1px solid ${sw.borderSubtle}`,
                    background: isSelected ? `${EXPERT_COLORS[i]}15` : sw.tint,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    opacity: isSelected ? 1 : 0.4,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: 12, color: EXPERT_COLORS[i], fontWeight: 800, fontFamily: 'monospace' }}>
                      E{i}
                    </span>
                    {isSelected && <span style={{ fontSize: 14 }}>✓</span>}
                  </div>
                  <span style={{ fontSize: 12, color: sw.text, fontFamily: 'monospace', fontWeight: 700 }}>
                    {(p * 100).toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </PanelCard>
        )}

        {activeStep === 4 && (
          /* Step 4: Renormalized weights */
          <PanelCard padding={14} gap={10}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: sw.textMuted }}>
                {copy.efficiencyLabel}: {topK}/{NUM_EXPERTS} experts
              </span>
              <span style={{ fontSize: 13, color: '#66b84a', fontFamily: 'monospace', fontWeight: 900 }}>
                {copy.sumLabel}: {fmt(computation.renormalized.reduce((a: number, b: number) => a + b, 0))}
              </span>
            </div>
            {computation.renormalized.map((r: number, i: number) => {
              if (r === 0) return null;
              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 32, fontSize: 11, color: EXPERT_COLORS[i], fontWeight: 800, fontFamily: 'monospace' }}>
                    E{i}
                  </span>
                  <div style={{ flex: 1, height: 22, background: 'rgba(255,255,255,0.04)', borderRadius: 4, overflow: 'hidden' }}>
                    <div
                      style={{
                        width: `${r * 100}%`,
                        height: '100%',
                        background: `linear-gradient(90deg, ${EXPERT_COLORS[i]}, ${EXPERT_COLORS[i]}88)`,
                        borderRadius: 4,
                        transition: 'width 0.4s ease',
                        boxShadow: `0 0 8px ${EXPERT_COLORS[i]}40`,
                      }}
                    />
                  </div>
                  <span style={{ width: 48, fontSize: 12, color: EXPERT_COLORS[i], fontFamily: 'monospace', fontWeight: 900, textAlign: 'right' }}>
                    {(r * 100).toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </PanelCard>
        )}

        {/* ── Step Selector Buttons ────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[1, 2, 3, 4].map((step) => (
            <button
              key={step}
              onClick={() => setActiveStep(step)}
              style={{
                padding: '10px 8px',
                borderRadius: 8,
                border: `1px solid ${activeStep === step ? EXPERT_COLORS[step - 1] : sw.borderSubtle}`,
                background: activeStep === step ? `${EXPERT_COLORS[step - 1]}15` : sw.tint,
                color: activeStep === step ? EXPERT_COLORS[step - 1] : sw.textMuted,
                cursor: 'pointer',
                fontSize: 10,
                fontWeight: activeStep === step ? 800 : 600,
                transition: 'all 0.2s ease',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 2 }}>{step}</div>
              <div style={{ fontSize: 9 }}>{stepTitles[step - 1].split(':')[0]}</div>
            </button>
          ))}
        </div>
      </div>
    </TabbedPanelSurface>
  );
});
