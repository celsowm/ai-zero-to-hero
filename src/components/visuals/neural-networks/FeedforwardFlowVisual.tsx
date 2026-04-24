import React, { useMemo, useState } from 'react';
import type { FeedforwardFlowVisualCopy, NeuralNetworkSampleCopy } from '../../../types/slide';
import { forwardPass } from '../../../utils/neuralTrainingEngine';
import { PanelCard } from '../PanelCard';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: FeedforwardFlowVisualCopy;
}

const fmt = (v: number, d = 3) => v.toFixed(d);

export const FeedforwardFlowVisual = React.memo(({ copy }: Props) => {
  const [sampleIdx, setSampleIdx] = useState(0);
  const sample = copy.samples[sampleIdx];
  const fwd = useMemo(() => forwardPass(copy.weights, sample), [copy.weights, sample]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
      {/* ── TOP: Sample selector + live readouts ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 14, alignItems: 'center' }}>
        {/* Sample buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${copy.samples.length}, auto)`, gap: 6, padding: 6, borderRadius: 14, background: sw.tintStrong, border: `1px solid ${sw.tintOverlay}` }}>
          {copy.samples.map((s, i) => {
            const active = i === sampleIdx;
            return (
              <button
                key={s.label}
                type="button"
                onClick={() => setSampleIdx(i)}
                style={{
                  padding: '9px 16px',
                  borderRadius: 10,
                  border: '1px solid transparent',
                  fontSize: 12,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  color: active ? '#091018' : 'var(--sw-text-dim)',
                  background: active
                    ? 'linear-gradient(135deg, rgba(0,229,255,0.95), rgba(102,184,74,0.92))'
                    : 'rgba(255,255,255,0.04)',
                  boxShadow: active ? '0 10px 24px rgba(0,229,255,0.12)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 180ms ease, color 180ms ease',
                }}
              >
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Live readouts */}
        <div
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '8px 16px',
            borderRadius: 999,
            background: sw.tintStronger,
            border: `1px solid ${sw.borderMediumStrong}`,
          }}
        >
          <Readout label={copy.sampleLabel} value={sample.label} color="#94a3b8" />
          <Readout label="y_hat" value={fmt(fwd.outputActivation)} color="#66b84a" />
          <Readout label={copy.targetLabel} value={fmt(sample.target, 1)} color={sample.target >= 0.5 ? '#22c55e' : '#f97316'} />
          <Readout label="z_out" value={fmt(fwd.outputZ)} color="#ff5da2" />
        </div>
      </div>

      {/* ── MIDDLE: Network diagram (left) + Computation steps (right) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 12, flex: 1, minHeight: 0 }}>
        {/* Network SVG */}
        <PanelCard
          minHeight={0}
          padding={0}
          gap={0}
          style={{
            flex: 1,
            overflow: 'hidden',
            background: 'radial-gradient(circle at 50% 30%, rgba(0,229,255,0.08), rgba(7,10,18,0.96) 55%)',
          }}
        >
          <FeedforwardNetworkSvg copy={copy} sample={sample} hiddenZs={fwd.hiddenZs} hiddenActivations={fwd.hiddenActivations} outputZ={fwd.outputZ} outputActivation={fwd.outputActivation} />
        </PanelCard>

        {/* Computation steps */}
        <PanelCard
          minHeight={0}
          padding={18}
          gap={10}
          style={{
            overflow: 'auto',
            background: 'linear-gradient(180deg, rgba(20,18,31,0.97), rgba(13,13,22,0.98))',
          }}
        >
          <div style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
            {copy.sequenceTitle}
          </div>

          {copy.sequenceSteps.map((step, i) => (
            <div key={step.label} style={{ padding: '12px 14px', borderRadius: 12, background: sw.tintStrong, border: `1px solid ${sw.borderSubtle}` }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline', marginBottom: 5 }}>
                <div style={{ fontSize: 12, color: 'var(--sw-text)', fontWeight: 800 }}>{i + 1}. {step.label}</div>
                <div style={{ fontSize: 11, color: '#00e5ff', fontFamily: 'monospace' }}>{step.formula}</div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--sw-text-dim)', lineHeight: 1.6 }}>{step.body}</div>
            </div>
          ))}

          <div style={{ padding: '12px 14px', borderRadius: 12, background: sw.tintStrong, border: `1px solid rgba(102,184,74,0.25)`, marginTop: 'auto' }}>
            <div style={{ fontSize: 10, color: '#66b84a', fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 4 }}>
              {copy.outputInterpretation}
            </div>
            <div style={{ fontSize: 12.5, color: 'var(--sw-text-dim)', lineHeight: 1.65 }}>
              {copy.activationFormula} {copy.outputFormula}
            </div>
          </div>
        </PanelCard>
      </div>

      {/* ── BOTTOM: Hidden layer values ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8 }}>
        {fwd.hiddenZs.map((v, i) => (
          <ValueChip key={`z${i}`} label={`z${i + 1}`} value={fmt(v)} color="#00e5ff" />
        ))}
        {fwd.hiddenActivations.map((v, i) => (
          <ValueChip key={`h${i}`} label={`h${i + 1}`} value={fmt(v)} color="#ff5da2" />
        ))}
      </div>
    </div>
  )
});

/* ── Sub-components ── */

const Readout: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</span>
    <strong style={{ color, fontFamily: 'monospace', fontSize: 13, fontWeight: 900 }}>{value}</strong>
  </div>
);

const ValueChip: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ padding: '8px 12px', borderRadius: 10, background: sw.tintStrong, border: `1px solid ${color}30`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.06em' }}>{label}</span>
    <span style={{ fontSize: 13, fontWeight: 900, color, fontFamily: 'monospace' }}>{value}</span>
  </div>
);

/* ── Network SVG ── */

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

      {/* Layer labels */}
      <text x="55" y="20" fill="#94a3b8" fontSize="10" fontWeight="800">{copy.inputLayerLabel}</text>
      <text x="215" y="20" fill="#00e5ff" fontSize="10" fontWeight="800" textAnchor="middle">{copy.hiddenLayerLabel}</text>
      <text x="354" y="20" fill="#66b84a" fontSize="10" fontWeight="800" textAnchor="middle">{copy.outputLayerLabel}</text>

      {/* Input → Hidden edges */}
      {inputYs.flatMap((iy, ii) =>
        hiddenYs.map((hy, hi) => (
          <path
            key={`e-${ii}-${hi}`}
            d={`M 86 ${iy} C 130 ${iy}, 150 ${hy}, 184 ${hy}`}
            fill="none"
            stroke="#00e5ff"
            strokeWidth={Math.max(0.8, Math.min(3.2, Math.abs(copy.weights.inputToHidden[hi][ii]) * 6))}
            strokeOpacity="0.45"
            strokeDasharray="4 6"
            markerEnd="url(#ff-arrow)"
            style={{ animation: 'ff-flow 1s linear infinite' }}
          />
        )),
      )}

      {/* Hidden → Output edges */}
      {hiddenYs.map((hy, hi) => (
        <path
          key={`o-${hi}`}
          d={`M 242 ${hy} C 276 ${hy}, 300 ${outputY}, 330 ${outputY}`}
          fill="none"
          stroke="#66b84a"
          strokeWidth={Math.max(1, Math.min(3.5, Math.abs(copy.weights.hiddenToOutput[hi]) * 5))}
          strokeOpacity="0.55"
          strokeDasharray="4 6"
          markerEnd="url(#ff-arrow)"
          style={{ animation: 'ff-flow 1s linear infinite' }}
        />
      ))}

      {/* Input nodes */}
      {inputYs.map((iy, i) => (
        <g key={`x-${i}`}>
          <circle cx="60" cy={iy} r="17" fill="rgba(148,163,184,0.10)" stroke="#94a3b8" />
          <text x="60" y={iy - 2} fill="#e8eef6" fontSize="10" fontWeight="800" textAnchor="middle">x{i + 1}</text>
          <text x="60" y={iy + 10} fill="#94a3b8" fontSize="8" textAnchor="middle">{fmt(sample.inputs[i], 2)}</text>
          <text x="10" y={iy + 4} fill="rgba(255,255,255,0.55)" fontSize="8">{copy.featureNames[i]}</text>
        </g>
      ))}

      {/* Hidden nodes */}
      {hiddenYs.map((hy, i) => (
        <g key={`h-${i}`}>
          <circle cx="214" cy={hy} r="21" fill="rgba(0,229,255,0.10)" stroke="#00e5ff" strokeWidth="1.4" />
          <text x="214" y={hy - 5} fill="#00e5ff" fontSize="10" fontWeight="800" textAnchor="middle">z{i + 1}</text>
          <text x="214" y={hy + 7} fill="#ffffff" fontSize="8.5" textAnchor="middle">{fmt(hiddenZs[i])}</text>
          <text x="214" y={hy + 18} fill="#ff5da2" fontSize="7.5" textAnchor="middle">h={fmt(hiddenActivations[i], 2)}</text>
        </g>
      ))}

      {/* Output node */}
      <circle cx="354" cy={outputY} r="25" fill="rgba(102,184,74,0.12)" stroke="#66b84a" strokeWidth="1.6" />
      <text x="354" y={outputY - 8} fill="#66b84a" fontSize="10" fontWeight="800" textAnchor="middle">y_hat</text>
      <text x="354" y={outputY + 5} fill="#ffffff" fontSize="11" fontWeight="800" textAnchor="middle">{fmt(outputActivation)}</text>
      <text x="354" y={outputY + 18} fill="#ff5da2" fontSize="7.5" textAnchor="middle">z={fmt(outputZ, 2)}</text>

      {/* Flow label */}
      <rect x="18" y="262" width="384" height="20" rx="10" fill={sw.tintStronger} stroke={sw.borderSubtle} />
      <text x="210" y="275" fill="#00e5ff" fontSize="9" fontWeight="700" textAnchor="middle">x → z → sigmoid(z) → y_hat</text>
    </svg>
  );
};
