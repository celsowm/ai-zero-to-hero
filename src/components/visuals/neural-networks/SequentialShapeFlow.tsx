import React, { useState } from 'react';
import type { SequentialShapeFlowCopy } from '../../../types/slide';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { CodeBlock } from '../../CodeBlock';
import { PanelCard } from '../PanelCard';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: SequentialShapeFlowCopy;
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
    {label && <text x={x + w / 2} y={y + h / 2 + 5} textAnchor="middle" fill="#e2e8f0" fontFamily={sw.fontMono} fontSize="10" fontWeight="700">{label}</text>}
  </g>
);

interface TensorGridDef {
  label: string;
  shape: string;
  rows: number;
  cols: number;
  dimNames: [string, string];
  accent: string;
}

const TensorGridSVG: React.FC<{ def: TensorGridDef; ox: number }> = ({ def, ox }) => {
  const { rows, cols, dimNames, accent, shape, label } = def;
  const dispR = Math.min(rows, 3);
  const dispC = Math.min(cols, 4);
  const cw = 56;
  const ch = 38;
  const cd = 10;
  const gapX = 64;
  const gapY = 52;
  const totalW = dispC * gapX + 10;
  const totalH = dispR * gapY + 34;

  return (
    <g>
      <rect x={ox} y={6} width={totalW} height={totalH} rx={10}
        fill={`${accent}06`} stroke={`${accent}22`}
      />
      <text x={ox + totalW / 2} y={20} textAnchor="middle" fill={accent} fontFamily={sw.fontMono} fontSize="11" fontWeight="700">
        {label} {shape}
      </text>
      {Array.from({ length: dispR }).map((_, r) =>
        Array.from({ length: dispC }).map((__, c) => (
          <IsoCube
            key={`${r}-${c}`}
            x={ox + 8 + c * gapX}
            y={38 + r * gapY}
            w={cw}
            h={ch}
            d={cd}
            top={cubeFace(accent, 0.3)}
            side={cubeFace(accent, 0.2)}
            front={cubeFace('#1e293b', 0.88)}
            label={`[${r},${c}]`}
          />
        )),
      )}
      <line x1={ox + 4} y1={totalH + 4} x2={ox + totalW - 4} y2={totalH + 4} stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" markerEnd="url(#arr-seq)" />
      <line x1={ox + 4} y1={32} x2={ox + 4} y2={totalH} stroke="rgba(148,163,184,0.4)" strokeWidth="1.5" markerEnd="url(#arr-seq)" />
      <text x={ox + totalW / 2} y={totalH + 20} textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="10">{dimNames[1]} [0..{dispC - 1}]</text>
      <text x={ox - 4} y={32 + totalH / 2} textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="10" transform={`rotate(-90, ${ox - 4}, ${32 + totalH / 2})`}>{dimNames[0]} [0..{dispR - 1}]</text>
    </g>
  );
};

interface StepConfig {
  label: string;
  layerName: string;
  description: string;
  accent: string;
  from: TensorGridDef;
  to: TensorGridDef;
}

const STEPS: StepConfig[] = [
  {
    label: 'Linear(4,3)',
    layerName: 'nn.Linear(4, 3)',
    description: 'Multiplica X pelos pesos W1 (4×3) e soma bias b1. Cada paciente ganha 3 valores internos.',
    accent: '#22d3ee',
    from: { label: 'X', shape: '(6,4)', rows: 2, cols: 4, dimNames: ['B', 'F'], accent: '#22d3ee' },
    to: { label: 'Hidden', shape: '(6,3)', rows: 2, cols: 3, dimNames: ['B', 'H'], accent: '#22d3ee' },
  },
  {
    label: 'Sigmoid',
    layerName: 'nn.Sigmoid()',
    description: 'Comprime cada valor entre 0 e 1. Shape não muda — o contrato (B,H) permanece.',
    accent: '#a78bfa',
    from: { label: 'Hidden', shape: '(6,3)', rows: 2, cols: 3, dimNames: ['B', 'H'], accent: '#a78bfa' },
    to: { label: 'Hidden', shape: '(6,3)', rows: 2, cols: 3, dimNames: ['B', 'H'], accent: '#a78bfa' },
  },
  {
    label: 'Linear(3,1)',
    layerName: 'nn.Linear(3, 1)',
    description: 'Projeta de H=3 para O=1. Cada paciente comprime 3 valores internos em 1 previsão.',
    accent: '#fb7185',
    from: { label: 'Hidden', shape: '(6,3)', rows: 2, cols: 3, dimNames: ['B', 'H'], accent: '#fb7185' },
    to: { label: 'y_hat', shape: '(6,1)', rows: 2, cols: 1, dimNames: ['B', 'O'], accent: '#fb7185' },
  },
  {
    label: 'Sigmoid',
    layerName: 'nn.Sigmoid()',
    description: 'Segunda ativação: normaliza a saída como probabilidade entre 0 e 1. (B,O) intacto.',
    accent: '#66b84a',
    from: { label: 'y_hat', shape: '(6,1)', rows: 2, cols: 1, dimNames: ['B', 'O'], accent: '#66b84a' },
    to: { label: 'y_hat', shape: '(6,1)', rows: 2, cols: 1, dimNames: ['B', 'O'], accent: '#66b84a' },
  },
];

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--sw-cyan)',
  marginBottom: 10,
};

const CodePanel: React.FC<{ copy: SequentialShapeFlowCopy['codePanel']; eyebrowLabel: string }> = ({ copy, eyebrowLabel }) => (
  <PanelCard minHeight={0} gap={12} style={{ height: '100%', overflow: 'hidden' }}>
    <div style={eyebrowStyle}>{eyebrowLabel}</div>
    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{copy.title}</div>
    <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)' }}>{copy.description}</div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <CodeBlock language="python" code="" sourceRef={copy.source} explanations={copy.codeExplanations} />
    </div>
  </PanelCard>
);

const StepperPanel: React.FC<{ copy: SequentialShapeFlowCopy['flowPanel'] }> = ({ copy }) => {
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

      {/* Progress */}
      <div style={{ height: 6, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
        <div style={{ height: '100%', width: `${progress}%`, borderRadius: 999, background: `linear-gradient(90deg, ${step.accent}, rgba(255,255,255,0.94))`, transition: 'width 200ms ease' }} />
      </div>

      {/* Step pills */}
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

      {/* Content */}
      <div style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', paddingRight: 4, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {/* Layer info */}
        <div style={{ padding: 10, borderRadius: 14, border: `1px solid ${step.accent}44`, background: `linear-gradient(180deg, ${step.accent}15, rgba(255,255,255,0.025))`, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 'auto auto -28px -28px', width: 80, height: 80, borderRadius: 999, background: `${step.accent}14`, filter: 'blur(2px)' }} />
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: step.accent }}>{step.layerName}</div>
              <div style={{ fontSize: 9, fontWeight: 700, color: 'var(--sw-text-dim)', letterSpacing: '0.08em' }}>{activeStep + 1}/{STEPS.length}</div>
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{step.description}</div>
          </div>
        </div>

        {/* Before → After tensor grids */}
        <div style={{ borderRadius: 14, border: `1px solid ${step.accent}22`, background: 'rgba(255,255,255,0.015)', minHeight: 200, padding: '6px 0' }}>
          <svg viewBox="0 0 820 200" style={{ width: '100%', height: '100%', minHeight: 180 }}>
            <defs>
              <marker id="arr-seq" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto">
                <polygon points="0 0, 6 3, 0 6" fill="rgba(148,163,184,0.7)" />
              </marker>
            </defs>
            <TensorGridSVG def={step.from} ox={20} />
            <text x={410} y={85} textAnchor="middle" fill="#94a3b8" fontSize="22" fontWeight="700">→</text>
            <text x={410} y={106} textAnchor="middle" fill="#94a3b8" fontFamily={sw.fontMono} fontSize="11" fontWeight="600">{step.from.shape} → {step.to.shape}</text>
            <TensorGridSVG def={step.to} ox={530} />
          </svg>
        </div>
      </div>

      {/* Nav */}
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

export const SequentialShapeFlow = React.memo(({ copy }: Props) => {
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
