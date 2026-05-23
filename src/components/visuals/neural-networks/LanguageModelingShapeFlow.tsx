import React, { useState } from 'react';
import type { LanguageModelingShapeFlowCopy } from '../../../types/slide';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { CodeBlock } from '../../CodeBlock';
import { PanelCard } from '../PanelCard';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: LanguageModelingShapeFlowCopy;
}

const cubeFace = (base: string, alpha: number) =>
  `${base}${Math.round(alpha * 255).toString(16).padStart(2, '0')}`;

const IsoCube: React.FC<{
  x: number; y: number; w: number; h: number; d: number;
  top: string; side: string; front: string; label?: string;
}> = ({ x, y, w, h, d, top, side, front, label }) => (
  <g>
    <polygon points={`${x},${y} ${x + d},${y - d * 0.55} ${x + d + w},${y - d * 0.55} ${x + w},${y}`} fill={top} stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
    <polygon points={`${x + w},${y} ${x + d + w},${y - d * 0.55} ${x + d + w},${y + h - d * 0.55} ${x + w},${y + h}`} fill={side} stroke="rgba(148,163,184,0.3)" strokeWidth="1" />
    <rect x={x} y={y} width={w} height={h} fill={front} stroke="rgba(148,163,184,0.3)" strokeWidth="1" rx={2} />
    {label && <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fill="#e2e8f0" fontFamily={sw.fontMono} fontSize="9" fontWeight="700">{label}</text>}
  </g>
);

const DepthIndicator: React.FC<{
  x: number; y: number; depthName: string; depthValue: string; accent: string;
}> = ({ x, y, depthName, depthValue, accent }) => (
  <g>
    <line x1={x} y1={y} x2={x + 40} y2={y - 16} stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" strokeDasharray="4 3" />
    <rect x={x + 40} y={y - 28} width={54} height={24} rx={6} fill={`${accent}15`} stroke={`${accent}40`} />
    <text x={x + 67} y={y - 12} textAnchor="middle" fill={accent} fontFamily={sw.fontMono} fontSize="9" fontWeight="700">{depthName}</text>
    <text x={x + 67} y={y - 20} textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="8">{depthValue}</text>
  </g>
);

interface StepConfig {
  label: string;
  tensorName: string;
  shape: string;
  dtype: string;
  description: string;
  dimNames: string[];
  batchSize: number;
  seqLen: number;
  depthName: string;
  depthValue: string;
  accent: string;
}

const STEPS: StepConfig[] = [
  {
    label: 'token_ids',
    tensorName: 'token_ids',
    shape: '(2, 4)',
    dtype: 'torch.long',
    description: 'IDs inteiros dos tokens. Cada célula guarda um índice do vocabulário. São 2 sequências (B=2) com 4 posições cada (T=4).',
    dimNames: ['B', 'T'],
    batchSize: 2,
    seqLen: 4,
    depthName: '',
    depthValue: '',
    accent: '#22d3ee',
  },
  {
    label: 'hidden_states',
    tensorName: 'hidden_states',
    shape: '(2, 4, 8)',
    dtype: 'torch.float32',
    description: 'Cada posição [b, t] agora contém um vetor de 8 floats (C=8). O grid (B,T) existe, mas cada célula se expande em profundidade.',
    dimNames: ['B', 'T', 'C'],
    batchSize: 2,
    seqLen: 4,
    depthName: 'C',
    depthValue: '8',
    accent: '#a78bfa',
  },
  {
    label: 'output_scores',
    tensorName: 'output_scores',
    shape: '(2, 4, 50)',
    dtype: 'torch.float32',
    description: 'Em vez de 8 floats internos, cada posição produz 50 scores (V=50) — um para cada token candidato do vocabulário.',
    dimNames: ['B', 'T', 'V'],
    batchSize: 2,
    seqLen: 4,
    depthName: 'V',
    depthValue: '50',
    accent: '#fb7185',
  },
];

const TensorContractView: React.FC<{ step: StepConfig }> = ({ step }) => {
  const { batchSize, seqLen, accent, dimNames, depthName, depthValue } = step;
  const dispB = Math.min(batchSize, 2);
  const dispT = Math.min(seqLen, 4);
  const cw = 50;
  const ch = 34;
  const cd = 10;
  const gapX = 60;
  const gapY = 48;
  const batchGapX = 260;
  const hasDepth = depthName.length > 0;
  const ox = 401;
  const oy = 40;

  return (
    <svg viewBox="0 0 800 240" style={{ width: '100%', height: '100%', minHeight: 200 }}>
      <defs>
        <marker id="arr-lm" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
          <polygon points="0 0, 6 3, 0 6" fill="rgba(148,163,184,0.7)" />
        </marker>
      </defs>

      {[0, 1].map((b) => {
        const bx = ox + b * (batchGapX - 40);
        const rowsHere = b === 0 ? dispB : 1;
        const rectH = rowsHere * gapY + 8;
        return (
          <g key={`b-${b}`}>
            <rect x={bx} y={oy + 12} width={dispT * gapX + 12} height={rectH} rx={8}
              fill={b === 0 ? `${accent}08` : `${accent}06`} stroke={b === 0 ? `${accent}30` : `${accent}20`}
            />
            <text x={bx + 6} y={oy + 30} fill={accent} fontFamily={sw.fontMono} fontSize="10" fontWeight="700">batch[{b}]</text>
            {Array.from({ length: rowsHere }).map((_, r) =>
              Array.from({ length: dispT }).map((__, c) => (
                <IsoCube
                  key={`${b}-${r}-${c}`}
                  x={bx + 6 + c * gapX}
                  y={oy + 42 + r * gapY}
                  w={cw}
                  h={ch}
                  d={cd}
                  top={cubeFace(accent, 0.32)}
                  side={cubeFace(accent, 0.22)}
                  front={cubeFace('#1e293b', 0.9)}
                  label={`[${b},${c}]`}
                />
              )),
            )}
            {hasDepth && b === 0 && (
              <DepthIndicator
                x={bx + 6}
                y={oy + 42 + (dispT === 1 ? 0 : gapY - 4)}
                depthName={depthName}
                depthValue={depthValue}
                accent={accent}
              />
            )}
          </g>
        );
      })}

      {/* Axes */}
      <line x1={ox + 4} y1={oy + (dispB === 1 ? 80 : dispB * gapY + 22)} x2={ox + dispT * gapX + 8} y2={oy + (dispB === 1 ? 80 : dispB * gapY + 22)} stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" markerEnd="url(#arr-lm)" />
      <line x1={ox + 4} y1={oy + 8} x2={ox + 4} y2={oy + (dispB === 1 ? 80 : dispB * gapY + 22)} stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" markerEnd="url(#arr-lm)" />
      <text x={ox + (dispT * gapX) / 2 + 4} y={oy + (dispB === 1 ? 96 : dispB * gapY + 38)} textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="10">
        {dimNames[1]} [0..{seqLen - 1}]
      </text>
      <text x={ox - 4} y={oy + (dispB === 1 ? 42 : dispB * gapY / 2 + 16)} textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="10" transform={`rotate(-90, ${ox - 4}, ${oy + (dispB === 1 ? 42 : dispB * gapY / 2 + 16)})`}>
        {dimNames[0]} [0..{batchSize - 1}]
      </text>

      {/* Shape badge */}
      <text x="400" y="24" textAnchor="middle" fill={accent} fontFamily={sw.fontMono} fontSize="14" fontWeight="700">
        {step.tensorName} {step.shape}
      </text>
      <text x="400" y={oy + (dispB === 1 ? 100 : dispB * gapY + 56)} textAnchor="middle" fill="#6b6280" fontFamily={sw.fontMono} fontSize="10">
        {step.dtype}
      </text>
    </svg>
  );
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--sw-cyan)',
  marginBottom: 10,
};

const CodePanel: React.FC<{ copy: LanguageModelingShapeFlowCopy['codePanel']; eyebrowLabel: string }> = ({ copy, eyebrowLabel }) => (
  <PanelCard minHeight={0} gap={12} style={{ height: '100%', overflow: 'hidden' }}>
    <div style={eyebrowStyle}>{eyebrowLabel}</div>
    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{copy.title}</div>
    <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)' }}>{copy.description}</div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <CodeBlock language="python" code="" sourceRef={copy.source} explanations={copy.codeExplanations} />
    </div>
  </PanelCard>
);

const StepperPanel: React.FC<{ copy: LanguageModelingShapeFlowCopy['flowPanel'] }> = ({ copy }) => {
  const [activeStep, setActiveStep] = useState(0);
  const lastStepIndex = STEPS.length - 1;
  const step = STEPS[activeStep];
  const progress = ((activeStep + 1) / STEPS.length) * 100;
  const isFirst = activeStep === 0;
  const isLast = activeStep === lastStepIndex;

  return (
    <PanelCard minHeight={0} gap={12} style={{ height: '100%', overflow: 'hidden' }}>
      <div>
        <div style={eyebrowStyle}>{copy.eyebrow}</div>
        <div style={{ fontSize: 21, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)', marginBottom: 6 }}>{copy.title}</div>
        <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--sw-text-dim)' }}>{copy.description}</div>
      </div>

      <div style={{ height: 6, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
        <div style={{ height: '100%', width: `${progress}%`, borderRadius: 999, background: `linear-gradient(90deg, ${step.accent}, rgba(255,255,255,0.94))`, transition: 'width 200ms ease' }} />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {STEPS.map((s, idx) => {
          const active = idx === activeStep;
          const completed = idx < activeStep;
          return (
            <button key={s.label} type="button" onClick={() => setActiveStep(idx)} style={{
              padding: '6px 10px', borderRadius: 999,
              border: `1px solid ${active ? `${s.accent}88` : 'rgba(255,255,255,0.06)'}`,
              background: active ? `linear-gradient(135deg, ${s.accent}22, rgba(255,255,255,0.04))` : completed ? 'rgba(255,255,255,0.035)' : 'rgba(255,255,255,0.02)',
              color: active ? 'var(--sw-text)' : 'var(--sw-text-dim)', fontSize: 10.5, fontWeight: 700, cursor: 'pointer',
              transition: 'all 180ms ease', display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ width: 18, height: 18, borderRadius: 999, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 800, color: active ? '#091018' : 'var(--sw-text)', background: active ? s.accent : completed ? `${s.accent}55` : 'rgba(255,255,255,0.06)' }}>
                {idx + 1}
              </span>
              <span style={{ whiteSpace: 'nowrap' }}>{s.label}</span>
            </button>
          );
        })}
      </div>

      <div style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', paddingRight: 4, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ padding: 10, borderRadius: 14, border: `1px solid ${step.accent}44`, background: `linear-gradient(180deg, ${step.accent}15, rgba(255,255,255,0.025))`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 'auto auto -28px -28px', width: 80, height: 80, borderRadius: 999, background: `${step.accent}14`, filter: 'blur(2px)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap', marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: step.accent, fontFamily: sw.fontMono }}>{step.tensorName}</div>
              <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
                <span style={{ fontSize: 10, fontFamily: sw.fontMono, color: 'var(--sw-cyan)', background: 'rgba(0,229,255,0.08)', padding: '2px 6px', borderRadius: 5, fontWeight: 700 }}>{step.shape}</span>
                <span style={{ fontSize: 9, fontFamily: sw.fontMono, color: 'var(--sw-text-muted)' }}>{step.dtype}</span>
              </div>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--sw-text-dim)', letterSpacing: '0.08em' }}>{activeStep + 1}/{STEPS.length}</div>
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{step.description}</div>
          </div>
        </div>

        <div style={{ borderRadius: 14, border: `1px solid ${step.accent}22`, background: 'rgba(255,255,255,0.015)', minHeight: 200 }}>
          <TensorContractView step={step} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'center', marginTop: 2 }}>
        <button type="button" onClick={() => setActiveStep((p) => Math.max(0, p - 1))} disabled={isFirst} style={{
          padding: '8px 12px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)',
          background: isFirst ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.05)',
          color: isFirst ? 'rgba(232,228,240,0.42)' : 'var(--sw-text)', fontSize: 10.5, fontWeight: 700, cursor: isFirst ? 'not-allowed' : 'pointer', opacity: isFirst ? 0.55 : 1,
        }}>{copy.previousLabel}</button>
        <div style={{ justifySelf: 'center', padding: '8px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--sw-text-muted)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{activeStep + 1} / {STEPS.length}</div>
        <button type="button" onClick={() => setActiveStep((p) => Math.min(lastStepIndex, p + 1))} disabled={isLast} style={{
          padding: '8px 12px', borderRadius: 12,
          border: `1px solid ${isLast ? 'rgba(255,255,255,0.08)' : `${step.accent}55`}`,
          background: isLast ? 'rgba(255,255,255,0.025)' : `linear-gradient(135deg, ${step.accent}20, rgba(255,255,255,0.04))`,
          color: isLast ? 'rgba(232,228,240,0.42)' : 'var(--sw-text)', fontSize: 10.5, fontWeight: 700, cursor: isLast ? 'not-allowed' : 'pointer', opacity: isLast ? 0.55 : 1,
          boxShadow: isLast ? 'none' : `0 8px 20px ${step.accent}12`,
        }}>{copy.nextLabel}</button>
      </div>
    </PanelCard>
  );
};

export const LanguageModelingShapeFlow = React.memo(({ copy }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
      <TabsBar ariaLabel={copy.tabs[0]?.label ?? 'Tabs'} items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />
      <TabbedPanelSurface>
        {activeTab === 0 ? <CodePanel copy={copy.codePanel} eyebrowLabel={copy.tabs[0]?.label ?? 'Code'} /> : <StepperPanel copy={copy.flowPanel} />}
      </TabbedPanelSurface>
    </div>
  );
});
