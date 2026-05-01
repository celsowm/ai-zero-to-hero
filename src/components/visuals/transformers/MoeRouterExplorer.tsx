import React, { useMemo, useState, useCallback } from 'react';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

// ── Types ──────────────────────────────────────────────────────────────────

interface MoeRouterExplorerCopy {
  // Header
  title: string;
  subtitle: string;
  // Token selector
  tokenSelectorTitle: string;
  // Gating
  gatingTitle: string;
  gatingFormula: string;
  expertLabel: string;
  scoreLabel: string;
  temperatureLabel: string;
  topkLabel: string;
  // Stepper
  stepperTitle: string;
  step1Label: string;
  step1Body: string;
  step2Label: string;
  step2Body: string;
  step3Label: string;
  step3Body: string;
  step4Label: string;
  step4Body: string;
  stepFocusLabel: string;
  // Panels
  utilizationTitle: string;
  utilizationBody: string;
  auxLossTitle: string;
  auxLossFormula: string;
  auxLossBody: string;
  efficiencyTitle: string;
  efficiencyBody: string;
}

interface Props {
  copy: MoeRouterExplorerCopy;
}

// ── Constants ──────────────────────────────────────────────────────────────

const NUM_EXPERTS = 8;

// Deterministic gating weights (simulating a trained router)
// Each token type has a "semantic embedding" of dim 4
const TOKEN_EMBEDDINGS: Record<string, number[]> = {
  verb:    [0.8, -0.3,  0.5,  0.1],
  noun:    [-0.2,  0.7, -0.4,  0.6],
  adj:     [0.3,  0.5, -0.1,  0.4],
  pronoun: [0.1, -0.1,  0.8, -0.3],
  prep:    [-0.4,  0.2,  0.1,  0.7],
  punct:   [-0.1, -0.5, -0.2, -0.1],
};

// Gating matrix W_g: [num_experts x embed_dim] — deterministic "trained" weights
const GATING_WEIGHTS: number[][] = [
  [ 1.2, -0.3,  0.5,  0.1],  // Expert 0 — verbs
  [ 0.9, -0.1,  0.3, -0.2],  // Expert 1 — verbs
  [-0.2,  1.1, -0.6,  0.4],  // Expert 2 — nouns
  [-0.1,  0.8, -0.3,  0.5],  // Expert 3 — nouns/adj
  [ 0.4,  0.6,  0.1, -0.1],  // Expert 4 — adj
  [ 0.1, -0.2,  0.9, -0.4],  // Expert 5 — pronouns
  [-0.3,  0.1,  0.0,  1.0],  // Expert 6 — prepositions
  [-0.1, -0.6, -0.1, -0.2],  // Expert 7 — punctuation
];

const TOKEN_TYPES = [
  { id: 'verb',    label: 'Verbo',       icon: '🏃', example: 'correr',     color: '#06b6d4' },
  { id: 'noun',    label: 'Substantivo',  icon: '🐱', example: 'gato',       color: '#8b5cf6' },
  { id: 'adj',     label: 'Adjetivo',     icon: '⚡', example: 'rápido',     color: '#f59e0b' },
  { id: 'pronoun', label: 'Pronome',      icon: '👤', example: 'ele',        color: '#10b981' },
  { id: 'prep',    label: 'Preposição',   icon: '🔗', example: 'de',         color: '#ec4899' },
  { id: 'punct',   label: 'Pontuação',    icon: '❗', example: ',',          color: '#6b7280' },
];

type StepKey = 'input' | 'gating' | 'topk' | 'combine';
const STEP_KEYS: StepKey[] = ['input', 'gating', 'topk', 'combine'];
const STEP_COLORS: Record<StepKey, string> = {
  input: '#93a4bb',
  gating: '#16e0ff',
  topk: '#a855f7',
  combine: '#ff5da2',
};

const EXPERT_COLORS = ['#06b6d4', '#0891b2', '#8b5cf6', '#7c3aed', '#f59e0b', '#d97706', '#10b981', '#059669'];

// ── Math helpers ───────────────────────────────────────────────────────────

function softmax(logits: number[], temperature: number): number[] {
  const scaled = logits.map((l: number) => l / Math.max(temperature, 0.01));
  const maxL = Math.max(...scaled);
  const exps = scaled.map((l: number) => Math.exp(l - maxL));
  const sumExp = exps.reduce((a: number, b: number) => a + b, 0);
  return exps.map((e: number) => e / sumExp);
}

function selectTopK(values: number[], k: number): { indices: number[]; selectedValues: number[] } {
  const indexed = values.map((v: number, i: number) => ({ v, i }));
  const sorted = indexed.sort((a, b) => b.v - a.v);
  const top = sorted.slice(0, k);
  return {
    indices: top.map((x) => x.i),
    selectedValues: top.map((x) => x.v),
  };
}

function dotProduct(a: number[], b: number[]): number {
  return a.reduce((sum: number, v: number, i: number) => sum + v * b[i], 0);
}

function fmt(v: number, digits = 4): string {
  return v.toFixed(digits).replace(/0+$/, '').replace(/\.$/, '');
}

// ── SVG helpers ────────────────────────────────────────────────────────────

const SVG_W = 600;
const SVG_H = 280;
const PAD = { top: 20, right: 20, bottom: 30, left: 50 };

function yC(v: number, max: number) {
  const h = SVG_H - PAD.top - PAD.bottom;
  return SVG_H - PAD.bottom - (v / max) * h;
}

// ── Component ──────────────────────────────────────────────────────────────

export const MoeRouterExplorer = React.memo(({ copy }: Props) => {
  const [selectedToken, setSelectedToken] = useState('verb');
  const [temperature, setTemperature] = useState(1.0);
  const [topK, setTopK] = useState(2);
  const [activeStep, setActiveStep] = useState<StepKey>('gating');

  // Real computation: gating scores
  const gatingResult = useMemo(() => {
    const embedding = TOKEN_EMBEDDINGS[selectedToken];
    const logits = GATING_WEIGHTS.map(w => dotProduct(w, embedding));
    const scores = softmax(logits, temperature);
    const top = selectTopK(scores, topK);
    // Renormalize selected scores
    const sumSelected = top.selectedValues.reduce((a, b) => a + b, 0);
    const renormalized = top.selectedValues.map((v: number) => v / sumSelected);

    return { logits, scores, top, renormalized };
  }, [selectedToken, temperature, topK]);

  // Expert utilization (how evenly distributed are the tokens across experts)
  const utilization = useMemo(() => {
    const allScores = TOKEN_TYPES.map(t => {
      const emb = TOKEN_EMBEDDINGS[t.id];
      const logits = GATING_WEIGHTS.map(w => dotProduct(w, emb));
      return softmax(logits, temperature);
    });
    // Average score per expert across all token types
    const avg = Array(NUM_EXPERTS).fill(0).map((_, e) => {
      return allScores.reduce((sum: number, scores: number[]) => sum + scores[e], 0) / allScores.length;
    });
    return avg;
  }, [temperature]);

  // Auxiliary loss computation
  const auxLoss = useMemo(() => {
    // f_i = fraction of tokens routed to expert i (uniform = 1/NUM_EXPERTS)
    const uniform = 1 / NUM_EXPERTS;
    // P_i = average probability assigned to expert i
    const P = utilization;
    // L_aux = alpha * sum(f_i * P_i), alpha = NUM_EXPERTS
    const alpha = NUM_EXPERTS;
    const loss = alpha * utilization.reduce((sum, p) => sum + uniform * p, 0);
    return { loss, P, uniform, alpha };
  }, [utilization]);

  const tokenData = TOKEN_TYPES.find(t => t.id === selectedToken)!;

  const handleTokenSelect = useCallback((id: string) => {
    setSelectedToken(id);
    setActiveStep('gating');
  }, []);

  const stepValues: Record<StepKey, string> = {
    input: tokenData.label,
    gating: `${NUM_EXPERTS} scores`,
    topk: `Top-${topK}`,
    combine: fmt(gatingResult.renormalized.reduce((a, b) => a + b, 0), 2),
  };

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* ── Token Selector Bar ──────────────────────────────────────── */}
        <PanelCard
          padding={14}
          gap={12}
          style={{ background: sw.tintStrong, border: `1px solid ${sw.borderSubtle}` }}
        >
          <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', fontWeight: 900 }}>
            {copy.tokenSelectorTitle}
          </span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {TOKEN_TYPES.map((token) => {
              const isSelected = selectedToken === token.id;
              return (
                <button
                  key={token.id}
                  onClick={() => handleTokenSelect(token.id)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 10,
                    border: isSelected ? `2px solid ${token.color}` : `1px solid ${sw.borderSubtle}`,
                    background: isSelected ? `${token.color}18` : sw.tint,
                    color: isSelected ? token.color : sw.text,
                    cursor: 'pointer',
                    fontSize: 12,
                    fontWeight: isSelected ? 800 : 600,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span style={{ fontSize: 16 }}>{token.icon}</span>
                  {token.label}
                </button>
              );
            })}
          </div>
        </PanelCard>

        {/* ── Controls Row ───────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <PanelCard padding={14} gap={10} style={{ background: sw.tintStrong }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 10, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.temperatureLabel}
              </span>
              <span style={{ fontSize: 14, color: '#16e0ff', fontFamily: 'monospace', fontWeight: 900 }}>
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
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--sw-text-dim)' }}>
              <span>Assertivo</span>
              <span>Distribuído</span>
            </div>
          </PanelCard>

          <PanelCard padding={14} gap={10} style={{ background: sw.tintStrong }}>
            <span style={{ fontSize: 10, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.topkLabel}
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              {[1, 2, 4].map((k) => (
                <button
                  key={k}
                  onClick={() => setTopK(k)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 8,
                    border: topK === k ? `2px solid #a855f7` : `1px solid ${sw.borderSubtle}`,
                    background: topK === k ? '#a855f720' : sw.tint,
                    color: topK === k ? '#a855f7' : sw.textMuted,
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: 800,
                    fontFamily: 'monospace',
                    transition: 'all 0.2s ease',
                  }}
                >
                  k={k}
                </button>
              ))}
            </div>
          </PanelCard>
        </div>

        {/* ── Main Content: Chart + Side Panels ──────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>

          {/* Gating Scores Chart */}
          <PanelCard
            padding={0}
            style={{
              overflow: 'hidden',
              background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint}), radial-gradient(circle at 50% 16%, rgba(22,224,255,0.08), transparent 56%)`,
            }}
          >
            <div style={{ padding: '12px 16px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 10, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  {copy.gatingTitle}
                </span>
                <code style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace' }}>
                  {copy.gatingFormula}
                </code>
              </div>
            </div>

            <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} width="100%" style={{ display: 'block' }}>
              {/* Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1.0].map((tick) => (
                <g key={`y-${tick}`}>
                  <line
                    x1={PAD.left} x2={SVG_W - PAD.right}
                    y1={yC(tick, 1)} y2={yC(tick, 1)}
                    stroke={tick === 0.5 ? sw.tintActive : sw.borderSubtle}
                    strokeDasharray={tick === 0.5 ? '6 6' : '3 5'}
                  />
                  <text x={PAD.left - 6} y={yC(tick, 1) + 4} fill="rgba(255,255,255,0.4)" fontSize="9" textAnchor="end" fontFamily="monospace">
                    {(tick * 100).toFixed(0)}%
                  </text>
                </g>
              ))}

              {/* Bars */}
              {gatingResult.scores.map((score, i) => {
                const isTopK = gatingResult.top.indices.includes(i);
                const barW = (SVG_W - PAD.left - PAD.right) / NUM_EXPERTS;
                const barX = PAD.left + i * barW;
                const barH = SVG_H - PAD.top - PAD.bottom;
                const barTop = yC(score, 1);

                return (
                  <g key={i} style={{ transition: 'opacity 0.3s ease' }}>
                    {/* Background */}
                    <rect
                      x={barX + 2} y={PAD.top}
                      width={barW - 4} height={barH}
                      fill="rgba(255,255,255,0.02)"
                      rx={4}
                    />
                    {/* Value bar */}
                    <rect
                      x={barX + 2} y={barTop}
                      width={barW - 4} height={barH - (barTop - PAD.top)}
                      fill={isTopK ? tokenData.color : 'rgba(255,255,255,0.12)'}
                      rx={4}
                      style={{
                        transition: 'height 0.4s cubic-bezier(0.4, 0, 0.2, 1), fill 0.3s ease',
                        filter: isTopK ? `drop-shadow(0 0 6px ${tokenData.color}60)` : 'none',
                      }}
                    />
                    {/* Percentage label */}
                    <text
                      x={barX + barW / 2} y={barTop - 6}
                      fill={isTopK ? tokenData.color : 'rgba(255,255,255,0.5)'}
                      fontSize="10"
                      fontWeight={isTopK ? 900 : 700}
                      textAnchor="middle"
                      fontFamily="monospace"
                    >
                      {(score * 100).toFixed(1)}%
                    </text>
                    {/* Expert label */}
                    <text
                      x={barX + barW / 2} y={SVG_H - 8}
                      fill={isTopK ? tokenData.color : 'rgba(255,255,255,0.35)'}
                      fontSize="9"
                      fontWeight={isTopK ? 800 : 500}
                      textAnchor="middle"
                    >
                      E{i}
                    </text>
                    {/* Top-K checkmark */}
                    {isTopK && (
                      <text
                        x={barX + barW / 2} y={barTop - 18}
                        fill={tokenData.color}
                        fontSize="14"
                        textAnchor="middle"
                        fontWeight={900}
                      >
                        ✓
                      </text>
                    )}
                  </g>
                );
              })}
            </svg>
          </PanelCard>

          {/* Side panel: Utilization + Aux Loss */}
          <PanelCard
            padding={14}
            gap={14}
            style={{
              overflow: 'auto',
              background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))',
            }}
          >
            {/* Expert Utilization */}
            <div>
              <div style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 8 }}>
                {copy.utilizationTitle}
              </div>
              <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', lineHeight: 1.55, marginBottom: 10 }}>
                {copy.utilizationBody}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                {utilization.map((u, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '6px 4px',
                      borderRadius: 6,
                      background: `${EXPERT_COLORS[i]}15`,
                      border: `1px solid ${EXPERT_COLORS[i]}30`,
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 9, color: EXPERT_COLORS[i], fontWeight: 800 }}>E{i}</div>
                    <div style={{ fontSize: 11, color: '#eef6ff', fontFamily: 'monospace', fontWeight: 900 }}>
                      {(u * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Auxiliary Loss */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 12,
                background: 'rgba(255,93,162,0.08)',
                border: '1px solid rgba(255,93,162,0.22)',
              }}
            >
              <div style={{ fontSize: 10, color: '#ff5da2', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                {copy.auxLossTitle}
              </div>
              <code style={{ fontSize: 11, color: '#ff5da2', fontFamily: 'monospace', display: 'block', marginBottom: 8 }}>
                {copy.auxLossFormula}
              </code>
              <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', lineHeight: 1.55 }}>
                {copy.auxLossBody}
              </div>
              <div style={{
                marginTop: 8,
                padding: '6px 10px',
                borderRadius: 8,
                background: 'rgba(0,0,0,0.3)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: 10, color: 'var(--sw-text-dim)' }}>L_aux atual:</span>
                <span style={{ fontSize: 14, color: '#ff5da2', fontFamily: 'monospace', fontWeight: 900 }}>
                  {fmt(auxLoss.loss, 4)}
                </span>
              </div>
            </div>

            {/* Efficiency readout */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 12,
                background: `${tokenData.color}10`,
                border: `1px solid ${tokenData.color}25`,
              }}
            >
              <div style={{ fontSize: 10, color: tokenData.color, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                {copy.efficiencyTitle}
              </div>
              <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', lineHeight: 1.55 }}>
                {copy.efficiencyBody}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--sw-text-dim)' }}>Experts usados</div>
                  <div style={{ fontSize: 18, color: tokenData.color, fontFamily: 'monospace', fontWeight: 900 }}>
                    {topK}/{NUM_EXPERTS}
                  </div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 9, color: 'var(--sw-text-dim)' }}>Parâmetros ativos</div>
                  <div style={{ fontSize: 18, color: tokenData.color, fontFamily: 'monospace', fontWeight: 900 }}>
                    {((topK / NUM_EXPERTS) * 100).toFixed(0)}%
                  </div>
                </div>
              </div>
            </div>
          </PanelCard>
        </div>

        {/* ── Stepper ────────────────────────────────────────────────── */}
        <PanelCard
          padding={14}
          gap={10}
          style={{ background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.stepperTitle}
            </span>
            <span style={{ fontSize: 11, color: 'var(--sw-text-dim)' }}>
              {copy.stepFocusLabel}:{' '}
              <span style={{ color: STEP_COLORS[activeStep], fontWeight: 800 }}>
                {{ input: copy.step1Label, gating: copy.step2Label, topk: copy.step3Label, combine: copy.step4Label }[activeStep]}
              </span>
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
            {STEP_KEYS.map((step, idx) => {
              const isActive = step === activeStep;
              const body = { input: copy.step1Body, gating: copy.step2Body, topk: copy.step3Body, combine: copy.step4Body }[step];
              const label = { input: copy.step1Label, gating: copy.step2Label, topk: copy.step3Label, combine: copy.step4Label }[step];

              return (
                <button
                  key={step}
                  onClick={() => setActiveStep(step)}
                  onMouseEnter={() => setActiveStep(step)}
                  style={{
                    textAlign: 'left',
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: `1px solid ${isActive ? STEP_COLORS[step] : sw.borderSubtle}`,
                    background: isActive ? `${STEP_COLORS[step]}12` : sw.tint,
                    boxShadow: isActive ? `0 0 0 1px ${STEP_COLORS[step]}30, 0 0 12px ${STEP_COLORS[step]}12` : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: 9, color: STEP_COLORS[step], fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                      {idx + 1}
                    </span>
                    <span style={{ fontSize: 12, color: STEP_COLORS[step], fontFamily: 'monospace', fontWeight: 900 }}>
                      {stepValues[step]}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: sw.text, fontWeight: 800, lineHeight: 1.35, marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--sw-text-dim)', lineHeight: 1.5 }}>{body}</div>
                </button>
              );
            })}
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
});
