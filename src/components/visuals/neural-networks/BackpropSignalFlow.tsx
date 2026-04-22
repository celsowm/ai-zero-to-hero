import React, { useMemo, useState } from 'react';
import type { BackpropSignalFlowVisualCopy } from '../../../types/slide';
import { backwardPass, forwardPass, updateWeights } from '../../../utils/neuralTrainingEngine';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';

interface Props {
  copy: BackpropSignalFlowVisualCopy;
}

type StepKey = 'loss' | 'output' | 'hidden' | 'update';

const fmt = (value: number, digits = 4) => value.toFixed(digits);

export const BackpropSignalFlow: React.FC<Props> = ({ copy }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeKey = (['loss', 'output', 'hidden', 'update'] as const)[activeIndex];
  const forward = useMemo(() => forwardPass(copy.weights, copy.sample), [copy.sample, copy.weights]);
  const backward = useMemo(() => backwardPass(copy.sample, forward, copy.weights), [copy.sample, copy.weights, forward]);
  const updated = useMemo(() => updateWeights(copy.weights, backward, copy.learningRate), [backward, copy.learningRate, copy.weights]);
  const activeStep = copy.steps[activeKey];

  const metricRows: Record<StepKey, Array<{ label: string; value: string; accent: string }>> = {
    loss: [
      { label: copy.predictionLabel, value: fmt(forward.outputActivation), accent: '#66b84a' },
      { label: copy.targetLabel, value: fmt(copy.sample.target, 1), accent: '#94a3b8' },
      { label: copy.lossLabel, value: fmt(forward.loss, 6), accent: '#f97316' },
    ],
    output: [
      { label: 'y_hat - y', value: fmt(backward.outputError), accent: '#f97316' },
      { label: copy.outputDeltaLabel, value: fmt(backward.outputDelta), accent: '#ff5da2' },
      { label: 'sigmoid prime', value: fmt(forward.outputActivation * (1 - forward.outputActivation)), accent: '#00e5ff' },
    ],
    hidden: backward.hiddenDeltas.map((value, index) => ({
      label: `d_h${index + 1}`,
      value: fmt(value),
      accent: '#00e5ff',
    })),
    update: [
      { label: 'v1', value: `${fmt(copy.weights.hiddenToOutput[0], 3)} -> ${fmt(updated.hiddenToOutput[0], 3)}`, accent: '#a78bfa' },
      { label: 'w11', value: `${fmt(copy.weights.inputToHidden[0][0], 3)} -> ${fmt(updated.inputToHidden[0][0], 3)}`, accent: '#a78bfa' },
      { label: 'b_out', value: `${fmt(copy.weights.outputBias, 3)} -> ${fmt(updated.outputBias, 3)}`, accent: '#a78bfa' },
    ],
  };

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 14, minHeight: 0 }}>
      <PanelCard
        minHeight={0}
        padding={16}
        gap={12}
        style={{
          background:
            'radial-gradient(circle at top left, rgba(255,93,162,0.10), transparent 28%), radial-gradient(circle at top right, rgba(102,184,74,0.06), transparent 22%), linear-gradient(180deg, rgba(19,16,30,0.97), rgba(11,11,20,0.98))',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, color: '#ff5da2', fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase' }}>{copy.title}</div>
            <div style={{ fontSize: 13, color: 'var(--sw-text-dim)', marginTop: 4 }}>{copy.subtitle}</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--sw-text-dim)' }}>
            {copy.learningRateLabel}: {copy.learningRate}
          </div>
        </div>

        <TabsBar
          ariaLabel={copy.tabsAriaLabel}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          items={[
            { label: copy.steps.loss.label },
            { label: copy.steps.output.label },
            { label: copy.steps.hidden.label },
            { label: copy.steps.update.label },
          ]}
        />

        <PhaseRail activeKey={activeKey} />

        <div style={{ flex: 1, minHeight: 0, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'radial-gradient(circle at top, rgba(255,93,162,0.08), rgba(7,10,18,0.94) 60%)' }}>
          <BackpropSvg copy={copy} activeKey={activeKey} hiddenActivations={forward.hiddenActivations} outputActivation={forward.outputActivation} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
          {metricRows[activeKey].map((row) => (
            <MetricCard key={row.label} label={row.label} value={row.value} accent={row.accent} />
          ))}
        </div>
      </PanelCard>

      <PanelCard
        minHeight={0}
        padding={16}
        gap={12}
        style={{
          background:
            'linear-gradient(180deg, rgba(20,18,31,0.98), rgba(13,13,22,0.98)), radial-gradient(circle at top, rgba(22,224,255,0.08), transparent 34%)',
        }}
      >
        <div style={{ padding: '14px 15px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ fontSize: 11, color: '#ff5da2', fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>{activeStep.label}</div>
          <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--sw-text)', marginBottom: 6, lineHeight: 1.1 }}>{activeStep.title}</div>
          <div style={{ fontSize: 12.5, color: '#00e5ff', fontFamily: 'monospace', marginBottom: 8 }}>{activeStep.formula}</div>
          <div style={{ fontSize: 13, color: 'var(--sw-text-dim)', lineHeight: 1.7 }}>{activeStep.body}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <MetricCard label={copy.sampleLabel} value={copy.sample.label} accent="#94a3b8" />
          <MetricCard label={copy.predictionLabel} value={fmt(forward.outputActivation)} accent="#66b84a" />
          <MetricCard label={copy.targetLabel} value={fmt(copy.sample.target, 1)} accent={copy.sample.target >= 0.5 ? '#22c55e' : '#f97316'} />
          <MetricCard label={copy.updateRule} value={`- ${copy.learningRate} x grad`} accent="#a78bfa" />
        </div>

        <div style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(102,184,74,0.20)' }}>
          <div style={{ fontSize: 11, color: '#66b84a', fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            {copy.networkLabel}
          </div>
          <div style={{ fontSize: 13, color: 'var(--sw-text-dim)', lineHeight: 1.7 }}>
            {activeKey === 'loss' && `${copy.lossLabel} mede a distancia entre previsao e alvo antes de qualquer correcao.`}
            {activeKey === 'output' && `${copy.outputDeltaLabel} diz quanto a saida precisa empurrar os pesos conectados a ela.`}
            {activeKey === 'hidden' && `${copy.hiddenDeltaLabel} distribui o erro pelos neuronios ocultos conforme sua contribuicao.`}
            {activeKey === 'update' && `${copy.updateLabel} aplica a regra de gradiente descendente para corrigir os parametros.`}
          </div>
        </div>
      </PanelCard>
    </div>
  );
};

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

      <text x="55" y="18" fill="#94a3b8" fontSize="10" fontWeight="800">input</text>
      <text x="210" y="18" fill="#00e5ff" fontSize="10" fontWeight="800" textAnchor="middle">{copy.hiddenLayerLabel}</text>
      <text x="332" y="18" fill="#66b84a" fontSize="10" fontWeight="800" textAnchor="middle">{copy.outputLayerLabel}</text>
      <text x="392" y="32" fill="#ff5da2" fontSize="10" fontWeight="800" textAnchor="end">{copy.lossLabel}</text>

      {inputYs.flatMap((inputY) =>
        hiddenYs.map((hiddenY) => (
          <path
            key={`in-${inputY}-${hiddenY}`}
            d={`M 84 ${inputY} C 126 ${inputY}, 150 ${hiddenY}, 184 ${hiddenY}`}
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

      {hiddenYs.map((hiddenY) => (
        <path
          key={`out-${hiddenY}`}
          d={`M 236 ${hiddenY} C 270 ${hiddenY}, 292 ${outputY}, 312 ${outputY}`}
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

      {inputYs.map((inputY, index) => (
        <g key={`x-${index}`}>
          <circle cx="58" cy={inputY} r="15" fill="rgba(148,163,184,0.10)" stroke="#94a3b8" />
          <text x="58" y={inputY + 4} fill="#e8eef6" fontSize="9" fontWeight="800" textAnchor="middle">x{index + 1}</text>
        </g>
      ))}

      {hiddenYs.map((hiddenY, index) => (
        <g key={`h-${index}`}>
          <circle cx="210" cy={hiddenY} r="21" fill="rgba(0,229,255,0.10)" stroke={backwardActive ? '#ff5da2' : '#00e5ff'} strokeWidth="1.4" />
          <text x="210" y={hiddenY - 4} fill={backwardActive ? '#ff5da2' : '#00e5ff'} fontSize="10" fontWeight="800" textAnchor="middle">h{index + 1}</text>
          <text x="210" y={hiddenY + 9} fill="#ffffff" fontSize="8" textAnchor="middle">{fmt(hiddenActivations[index], 2)}</text>
        </g>
      ))}

      <g>
        <circle cx="332" cy={outputY} r="24" fill="rgba(102,184,74,0.12)" stroke={backwardActive ? '#ff5da2' : '#66b84a'} strokeWidth="1.6" />
        <text x="332" y={outputY - 5} fill={backwardActive ? '#ff5da2' : '#66b84a'} fontSize="10" fontWeight="800" textAnchor="middle">y_hat</text>
        <text x="332" y={outputY + 10} fill="#ffffff" fontSize="9" fontWeight="800" textAnchor="middle">{fmt(outputActivation, 3)}</text>
      </g>

      <g>
        <rect x="354" y="118" width="46" height="54" rx="10" fill="rgba(255,93,162,0.10)" stroke="#ff5da2" />
        <text x="377" y="139" fill="#ff5da2" fontSize="10" fontWeight="800" textAnchor="middle">loss</text>
        <text x="377" y="155" fill="#ffffff" fontSize="8" textAnchor="middle">(y_hat-y)^2</text>
      </g>

      <rect x="18" y="258" width="384" height="20" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" />
      <text x="28" y="271" fill="#94a3b8" fontSize="9">{copy.sampleLabel}: {copy.sample.label}</text>
      <text x="206" y="271" fill={backwardActive ? '#ff5da2' : updateActive ? '#a78bfa' : '#66b84a'} fontSize="9" textAnchor="middle">
        {activeKey === 'loss' ? 'forward to loss' : activeKey === 'output' ? 'output delta goes backward' : activeKey === 'hidden' ? 'hidden deltas spread error' : 'weights receive updates'}
      </text>
      <text x="390" y="271" fill="#a78bfa" fontSize="9" textAnchor="end">{copy.updateRule}</text>
    </svg>
  );
};

const MetricCard: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 14, fontWeight: 900, color: accent }}>{value}</div>
  </div>
);

const PhaseRail: React.FC<{ activeKey: StepKey }> = ({ activeKey }) => {
  const phases: Array<{ key: StepKey; label: string; accent: string }> = [
    { key: 'loss', label: 'error', accent: '#f97316' },
    { key: 'output', label: 'output delta', accent: '#ff5da2' },
    { key: 'hidden', label: 'hidden deltas', accent: '#16e0ff' },
    { key: 'update', label: 'update', accent: '#a78bfa' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 8 }}>
      {phases.map((phase, index) => {
        const active = phase.key === activeKey;
        return (
          <div
            key={phase.key}
            style={{
              position: 'relative',
              padding: '10px 12px',
              borderRadius: 14,
              border: `1px solid ${active ? phase.accent : 'rgba(255,255,255,0.06)'}`,
              background: active ? `${phase.accent}18` : 'rgba(255,255,255,0.03)',
              boxShadow: active ? `0 0 0 1px ${phase.accent}44, 0 0 22px ${phase.accent}18` : 'none',
            }}
          >
            <div style={{ fontSize: 10, color: active ? phase.accent : 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 900 }}>
              {String(index + 1).padStart(2, '0')}
            </div>
            <div style={{ marginTop: 4, fontSize: 12.5, color: 'var(--sw-text)', fontWeight: 800 }}>{phase.label}</div>
          </div>
        );
      })}
    </div>
  );
};
