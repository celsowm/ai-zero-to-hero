import React, { useMemo, useState } from 'react';
import type { BackpropSignalFlowVisualCopy } from '../../../types/slide';
import { backwardPass, forwardPass, updateWeights } from '../../../utils/neuralTrainingEngine';
import { PanelCard } from '../PanelCard';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: BackpropSignalFlowVisualCopy;
}

type StepKey = 'loss' | 'output' | 'hidden' | 'update';
const STEP_KEYS: StepKey[] = ['loss', 'output', 'hidden', 'update'];

const STEP_ACCENT: Record<StepKey, string> = {
  loss: '#f97316',
  output: '#ff5da2',
  hidden: '#16e0ff',
  update: '#a78bfa',
};

const fmt = (v: number, d = 4) => v.toFixed(d);

export const BackpropSignalFlow = React.memo(({ copy }: Props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeKey = STEP_KEYS[activeIndex];
  const accent = STEP_ACCENT[activeKey];
  const forward = useMemo(() => forwardPass(copy.weights, copy.sample), [copy.sample, copy.weights]);
  const backward = useMemo(() => backwardPass(copy.sample, forward, copy.weights), [copy.sample, copy.weights, forward]);
  const updated = useMemo(() => updateWeights(copy.weights, backward, copy.learningRate), [backward, copy.learningRate, copy.weights]);
  const activeStep = copy.steps[activeKey];

  const metrics: Array<{ label: string; value: string; color: string }> = activeKey === 'loss'
    ? [
        { label: copy.predictionLabel, value: fmt(forward.outputActivation), color: '#66b84a' },
        { label: copy.targetLabel, value: fmt(copy.sample.target, 1), color: '#94a3b8' },
        { label: copy.lossLabel, value: fmt(forward.loss, 6), color: '#f97316' },
      ]
    : activeKey === 'output'
      ? [
          { label: 'y_hat - y', value: fmt(backward.outputError), color: '#f97316' },
          { label: copy.outputDeltaLabel, value: fmt(backward.outputDelta), color: '#ff5da2' },
          { label: 'sigmoid\'', value: fmt(forward.outputActivation * (1 - forward.outputActivation)), color: '#00e5ff' },
        ]
      : activeKey === 'hidden'
        ? backward.hiddenDeltas.map((v, i) => ({ label: `d_h${i + 1}`, value: fmt(v), color: '#16e0ff' }))
        : [
            { label: 'v1', value: `${fmt(copy.weights.hiddenToOutput[0], 3)} → ${fmt(updated.hiddenToOutput[0], 3)}`, color: '#a78bfa' },
            { label: 'w11', value: `${fmt(copy.weights.inputToHidden[0][0], 3)} → ${fmt(updated.inputToHidden[0][0], 3)}`, color: '#a78bfa' },
            { label: 'b_out', value: `${fmt(copy.weights.outputBias, 3)} → ${fmt(updated.outputBias, 3)}`, color: '#a78bfa' },
          ];

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
      {/* ── STEP SELECTOR (single row of 4 buttons) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        {STEP_KEYS.map((key, i) => {
          const active = key === activeKey;
          const a = STEP_ACCENT[key];
          return (
            <button
              key={key}
              type="button"
              onClick={() => setActiveIndex(i)}
              style={{
                padding: '10px 14px',
                borderRadius: 12,
                border: `1px solid ${active ? a : sw.borderSubtle}`,
                background: active ? `${a}1a` : sw.tintStrong,
                boxShadow: active ? `0 0 20px ${a}22` : 'none',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 180ms ease',
              }}
            >
              <div style={{ fontSize: 10, color: active ? a : 'var(--sw-text-dim)', fontWeight: 900, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div style={{ fontSize: 12, color: 'var(--sw-text)', fontWeight: 700, marginTop: 3 }}>
                {copy.steps[key].label}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── MAIN: Network diagram (left) + Step detail (right) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 12, flex: 1, minHeight: 0 }}>
        {/* Network SVG */}
        <PanelCard
          minHeight={0}
          padding={0}
          gap={0}
          style={{
            flex: 1,
            overflow: 'hidden',
            background: 'radial-gradient(circle at 50% 30%, rgba(255,93,162,0.07), rgba(7,10,18,0.96) 55%)',
          }}
        >
          <BackpropSvg
            copy={copy}
            activeKey={activeKey}
            hiddenActivations={forward.hiddenActivations}
            outputActivation={forward.outputActivation}
          />
        </PanelCard>

        {/* Step detail panel */}
        <PanelCard
          minHeight={0}
          padding={18}
          gap={14}
          style={{
            overflow: 'auto',
            background: 'linear-gradient(180deg, rgba(20,18,31,0.97), rgba(13,13,22,0.98))',
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: accent, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              {activeStep.label}
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, color: 'var(--sw-text)', lineHeight: 1.15, marginBottom: 8 }}>
              {activeStep.title}
            </div>
            <div style={{ fontSize: 12.5, color: '#00e5ff', fontFamily: 'monospace', marginBottom: 8, padding: '6px 10px', borderRadius: 8, background: 'rgba(0,229,255,0.06)', display: 'inline-block' }}>
              {activeStep.formula}
            </div>
            <div style={{ fontSize: 13, color: 'var(--sw-text-dim)', lineHeight: 1.7 }}>{activeStep.body}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${metrics.length}, 1fr)`, gap: 8 }}>
            {metrics.map((m) => (
              <div key={m.label} style={{ padding: '10px 12px', borderRadius: 10, background: sw.tintStrong, border: `1px solid ${m.color}30` }}>
                <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 13, fontWeight: 900, color: m.color, fontFamily: 'monospace' }}>{m.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, fontSize: 11, color: 'var(--sw-text-dim)', alignItems: 'center', marginTop: 'auto' }}>
            <span>{copy.sampleLabel}: <strong style={{ color: 'var(--sw-text)' }}>{copy.sample.label}</strong></span>
            <span style={{ opacity: 0.3 }}>|</span>
            <span>{copy.learningRateLabel}: <strong style={{ color: '#a78bfa' }}>{copy.learningRate}</strong></span>
          </div>
        </PanelCard>
      </div>
    </div>
  );
});

const BackpropSvg: React.FC<{
  copy: BackpropSignalFlowVisualCopy;
  activeKey: StepKey;
  hiddenActivations: number[];
  outputActivation: number;
}> = ({ copy, activeKey, hiddenActivations, outputActivation }) => {
  const hiddenYs = [70, 145, 220];
  const inputYs = [48, 112, 176, 240];
  const outputY = 145;
  const forwardActive = activeKey === 'loss';
  const backwardActive = activeKey === 'output' || activeKey === 'hidden';
  const updateActive = activeKey === 'update';

  return (
    <svg viewBox="0 0 420 290" width="100%" height="100%">
      <defs>
        <marker id="bp-arrow-forward" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#66b84a" />
        </marker>
        <marker id="bp-arrow-backward" viewBox="0 0 10 10" refX="2" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M10 0 L0 5 L10 10 z" fill="#ff5da2" />
        </marker>
        <style>{`
          @keyframes bp-forward { from { stroke-dashoffset: 16; } to { stroke-dashoffset: 0; } }
          @keyframes bp-backward { from { stroke-dashoffset: 0; } to { stroke-dashoffset: 16; } }
          @keyframes bp-pulse { 0%,100% { opacity: 0.45; } 50% { opacity: 1; } }
        `}</style>
      </defs>

      {/* Layer labels */}
      <text x="55" y="18" fill="#94a3b8" fontSize="10" fontWeight="800">INPUT</text>
      <text x="210" y="18" fill="#00e5ff" fontSize="10" fontWeight="800" textAnchor="middle">{copy.hiddenLayerLabel}</text>
      <text x="332" y="18" fill="#66b84a" fontSize="10" fontWeight="800" textAnchor="middle">{copy.outputLayerLabel}</text>

      {/* Input → Hidden connections */}
      {inputYs.flatMap((iy) =>
        hiddenYs.map((hy) => (
          <path
            key={`in-${iy}-${hy}`}
            d={`M 84 ${iy} C 126 ${iy}, 150 ${hy}, 184 ${hy}`}
            fill="none"
            stroke={backwardActive ? '#ff5da2' : '#00e5ff'}
            strokeWidth="1.6"
            strokeOpacity={updateActive ? 0.9 : 0.4}
            strokeDasharray="4 6"
            markerEnd={forwardActive ? 'url(#bp-arrow-forward)' : 'none'}
            markerStart={backwardActive ? 'url(#bp-arrow-backward)' : 'none'}
            style={{
              animation: forwardActive ? 'bp-forward 1s linear infinite' : backwardActive ? 'bp-backward 1s linear infinite' : updateActive ? 'bp-pulse 1s ease-in-out infinite' : 'none',
            }}
          />
        )),
      )}

      {/* Hidden → Output connections */}
      {hiddenYs.map((hy) => (
        <path
          key={`out-${hy}`}
          d={`M 236 ${hy} C 270 ${hy}, 292 ${outputY}, 312 ${outputY}`}
          fill="none"
          stroke={backwardActive ? '#ff5da2' : '#66b84a'}
          strokeWidth="2"
          strokeOpacity={updateActive ? 0.9 : 0.5}
          strokeDasharray="4 6"
          markerEnd={forwardActive ? 'url(#bp-arrow-forward)' : 'none'}
          markerStart={backwardActive ? 'url(#bp-arrow-backward)' : 'none'}
          style={{
            animation: forwardActive ? 'bp-forward 1s linear infinite' : backwardActive ? 'bp-backward 1s linear infinite' : updateActive ? 'bp-pulse 1s ease-in-out infinite' : 'none',
          }}
        />
      ))}

      {/* Input nodes */}
      {inputYs.map((iy, i) => (
        <g key={`x-${i}`}>
          <circle cx="58" cy={iy} r="15" fill="rgba(148,163,184,0.10)" stroke="#94a3b8" />
          <text x="58" y={iy + 4} fill="#e8eef6" fontSize="9" fontWeight="800" textAnchor="middle">x{i + 1}</text>
        </g>
      ))}

      {/* Hidden nodes */}
      {hiddenYs.map((hy, i) => (
        <g key={`h-${i}`}>
          <circle cx="210" cy={hy} r="21" fill="rgba(0,229,255,0.10)" stroke={backwardActive ? '#ff5da2' : '#00e5ff'} strokeWidth="1.4" />
          <text x="210" y={hy - 4} fill={backwardActive ? '#ff5da2' : '#00e5ff'} fontSize="10" fontWeight="800" textAnchor="middle">h{i + 1}</text>
          <text x="210" y={hy + 9} fill="#ffffff" fontSize="8" textAnchor="middle">{fmt(hiddenActivations[i], 2)}</text>
        </g>
      ))}

      {/* Output node */}
      <circle cx="332" cy={outputY} r="24" fill="rgba(102,184,74,0.12)" stroke={backwardActive ? '#ff5da2' : '#66b84a'} strokeWidth="1.6" />
      <text x="332" y={outputY - 5} fill={backwardActive ? '#ff5da2' : '#66b84a'} fontSize="10" fontWeight="800" textAnchor="middle">y_hat</text>
      <text x="332" y={outputY + 10} fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle">{fmt(outputActivation, 3)}</text>

      {/* Loss box */}
      <rect x="362" y="118" width="46" height="54" rx="10" fill="rgba(255,93,162,0.10)" stroke="#ff5da2" />
      <text x="385" y="139" fill="#ff5da2" fontSize="10" fontWeight="800" textAnchor="middle">{copy.lossLabel}</text>
      <text x="385" y="155" fill="#ffffff" fontSize="8" textAnchor="middle">(ŷ−y)²</text>

      {/* Bottom status bar */}
      <rect x="18" y="262" width="384" height="20" rx="10" fill={sw.tintStronger} stroke={sw.borderSubtle} />
      <text x="210" y="275" fill={STEP_ACCENT[activeKey]} fontSize="9" fontWeight="700" textAnchor="middle">
        {activeKey === 'loss' ? 'forward → loss' : activeKey === 'output' ? '← output delta backward' : activeKey === 'hidden' ? '← hidden deltas spread error' : '↻ weights receive updates'}
      </text>
    </svg>
  );
};
