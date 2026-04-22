import React, { useMemo, useState } from 'react';
import type { FeedforwardFlowVisualCopy, NeuralNetworkSampleCopy } from '../../../types/slide';
import { forwardPass } from '../../../utils/neuralTrainingEngine';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';

interface Props {
  copy: FeedforwardFlowVisualCopy;
}

const fmt = (value: number, digits = 3) => value.toFixed(digits);

export const FeedforwardFlowVisual: React.FC<Props> = ({ copy }) => {
  const [activeSampleIndex, setActiveSampleIndex] = useState(0);
  const sample = copy.samples[activeSampleIndex];
  const forward = useMemo(() => forwardPass(copy.weights, sample), [copy.weights, sample]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.2fr 0.95fr', gap: 14, minHeight: 0 }}>
      <PanelCard minHeight={0} padding={16} gap={12}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, color: '#00e5ff', fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase' }}>{copy.title}</div>
            <div style={{ fontSize: 13, color: 'var(--sw-text-dim)', marginTop: 4 }}>{copy.subtitle}</div>
          </div>
          <div style={{ fontSize: 12, color: 'var(--sw-text-dim)' }}>{copy.architectureLabel}</div>
        </div>

        <TabsBar
          ariaLabel={copy.sampleAriaLabel}
          activeIndex={activeSampleIndex}
          onChange={setActiveSampleIndex}
          items={copy.samples.map((item) => ({ label: item.label }))}
        />

        <div style={{ flex: 1, minHeight: 0, borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'radial-gradient(circle at top, rgba(0,229,255,0.08), rgba(7,10,18,0.94) 60%)' }}>
          <FeedforwardNetworkSvg copy={copy} sample={sample} hiddenZs={forward.hiddenZs} hiddenActivations={forward.hiddenActivations} outputZ={forward.outputZ} outputActivation={forward.outputActivation} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
          <MetricCard label={copy.sampleLabel} value={sample.label} accent="#94a3b8" />
          <MetricCard label="z_out" value={fmt(forward.outputZ)} accent="#ff5da2" />
          <MetricCard label={copy.probabilityLabel} value={fmt(forward.outputActivation)} accent="#66b84a" />
          <MetricCard label={copy.targetLabel} value={fmt(sample.target, 1)} accent={sample.target >= 0.5 ? '#22c55e' : '#f97316'} />
        </div>
      </PanelCard>

      <PanelCard minHeight={0} padding={16} gap={12}>
        <div style={{ fontSize: 11, color: '#66b84a', fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase' }}>{copy.sequenceTitle}</div>
        {copy.sequenceSteps.map((step, index) => (
          <div key={step.label} style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline', marginBottom: 6 }}>
              <div style={{ fontSize: 12.5, color: 'var(--sw-text)', fontWeight: 800 }}>{index + 1}. {step.label}</div>
              <div style={{ fontSize: 11, color: '#00e5ff', fontFamily: 'monospace' }}>{step.formula}</div>
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--sw-text-dim)', lineHeight: 1.65 }}>{step.body}</div>
          </div>
        ))}

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {forward.hiddenZs.map((value, index) => (
            <MetricCard key={`hz-${index}`} label={`z${index + 1}`} value={fmt(value)} accent="#00e5ff" />
          ))}
          {forward.hiddenActivations.map((value, index) => (
            <MetricCard key={`ha-${index}`} label={`h${index + 1}`} value={fmt(value)} accent="#ff5da2" />
          ))}
        </div>

        <div style={{ marginTop: 'auto', padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(102,184,74,0.25)' }}>
          <div style={{ fontSize: 11, color: '#66b84a', fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 6 }}>
            {copy.outputInterpretation}
          </div>
          <div style={{ fontSize: 13, color: 'var(--sw-text-dim)', lineHeight: 1.7 }}>
            {copy.activationFormula} {copy.outputFormula} {copy.probabilityLabel} = {fmt(forward.outputActivation)}.
          </div>
        </div>
      </PanelCard>
    </div>
  );
};

const FeedforwardNetworkSvg: React.FC<{
  copy: FeedforwardFlowVisualCopy;
  sample: NeuralNetworkSampleCopy;
  hiddenZs: number[];
  hiddenActivations: number[];
  outputZ: number;
  outputActivation: number;
}> = ({ copy, sample, hiddenZs, hiddenActivations, outputZ, outputActivation }) => {
  const inputYs = [50, 115, 180, 245];
  const hiddenYs = [78, 148, 218];
  const outputY = 148;

  return (
    <svg viewBox="0 0 420 290" width="100%" height="100%">
      <defs>
        <marker id="ff-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="4" markerHeight="4" orient="auto">
          <path d="M0 0 L10 5 L0 10 z" fill="#00e5ff" />
        </marker>
        <style>{`
          @keyframes ff-flow { from { stroke-dashoffset: 18; } to { stroke-dashoffset: 0; } }
        `}</style>
      </defs>

      <text x="55" y="20" fill="#94a3b8" fontSize="10" fontWeight="800">{copy.inputLayerLabel}</text>
      <text x="215" y="20" fill="#00e5ff" fontSize="10" fontWeight="800" textAnchor="middle">{copy.hiddenLayerLabel}</text>
      <text x="354" y="20" fill="#66b84a" fontSize="10" fontWeight="800" textAnchor="middle">{copy.outputLayerLabel}</text>

      {inputYs.flatMap((inputY, inputIndex) =>
        hiddenYs.map((hiddenY, hiddenIndex) => (
          <path
            key={`edge-${inputIndex}-${hiddenIndex}`}
            d={`M 86 ${inputY} C 130 ${inputY}, 150 ${hiddenY}, 184 ${hiddenY}`}
            fill="none"
            stroke="#00e5ff"
            strokeWidth={Math.max(0.8, Math.min(3.2, Math.abs(copy.weights.inputToHidden[hiddenIndex][inputIndex]) * 6))}
            strokeOpacity="0.45"
            strokeDasharray="4 6"
            markerEnd="url(#ff-arrow)"
            style={{ animation: 'ff-flow 1s linear infinite' }}
          />
        )),
      )}

      {hiddenYs.map((hiddenY, hiddenIndex) => (
        <path
          key={`out-${hiddenIndex}`}
          d={`M 242 ${hiddenY} C 276 ${hiddenY}, 300 ${outputY}, 330 ${outputY}`}
          fill="none"
          stroke="#66b84a"
          strokeWidth={Math.max(1, Math.min(3.5, Math.abs(copy.weights.hiddenToOutput[hiddenIndex]) * 5))}
          strokeOpacity="0.55"
          strokeDasharray="4 6"
          markerEnd="url(#ff-arrow)"
          style={{ animation: 'ff-flow 1s linear infinite' }}
        />
      ))}

      {inputYs.map((inputY, inputIndex) => (
        <g key={`input-${inputIndex}`}>
          <circle cx="60" cy={inputY} r="17" fill="rgba(148,163,184,0.10)" stroke="#94a3b8" />
          <text x="60" y={inputY - 2} fill="#e8eef6" fontSize="10" fontWeight="800" textAnchor="middle">x{inputIndex + 1}</text>
          <text x="60" y={inputY + 10} fill="#94a3b8" fontSize="8" textAnchor="middle">{fmt(sample.inputs[inputIndex], 2)}</text>
          <text x="10" y={inputY + 4} fill="rgba(255,255,255,0.55)" fontSize="8">{copy.featureNames[inputIndex]}</text>
        </g>
      ))}

      {hiddenYs.map((hiddenY, hiddenIndex) => (
        <g key={`hidden-${hiddenIndex}`}>
          <circle cx="214" cy={hiddenY} r="21" fill="rgba(0,229,255,0.10)" stroke="#00e5ff" strokeWidth="1.4" />
          <text x="214" y={hiddenY - 5} fill="#00e5ff" fontSize="10" fontWeight="800" textAnchor="middle">z{hiddenIndex + 1}</text>
          <text x="214" y={hiddenY + 7} fill="#ffffff" fontSize="8.5" textAnchor="middle">{fmt(hiddenZs[hiddenIndex])}</text>
          <text x="214" y={hiddenY + 18} fill="#ff5da2" fontSize="7.5" textAnchor="middle">h={fmt(hiddenActivations[hiddenIndex], 2)}</text>
        </g>
      ))}

      <g>
        <circle cx="354" cy={outputY} r="25" fill="rgba(102,184,74,0.12)" stroke="#66b84a" strokeWidth="1.6" />
        <text x="354" y={outputY - 8} fill="#66b84a" fontSize="10" fontWeight="800" textAnchor="middle">y_hat</text>
        <text x="354" y={outputY + 5} fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle">{fmt(outputActivation)}</text>
        <text x="354" y={outputY + 18} fill="#ff5da2" fontSize="7.5" textAnchor="middle">z={fmt(outputZ, 2)}</text>
      </g>

      <rect x="18" y="258" width="384" height="20" rx="10" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)" />
      <text x="30" y="271" fill="#94a3b8" fontSize="9">{copy.sampleLabel}: {sample.label}</text>
      <text x="206" y="271" fill="#00e5ff" fontSize="9" textAnchor="middle">{'x -> z -> sigmoid(z)'}</text>
      <text x="390" y="271" fill={outputActivation >= 0.5 ? '#22c55e' : '#f97316'} fontSize="9" textAnchor="end">{copy.probabilityLabel}: {fmt(outputActivation)}</text>
    </svg>
  );
};

const MetricCard: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div style={{ padding: '10px 12px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
    <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 15, fontWeight: 900, color: accent }}>{value}</div>
  </div>
);
