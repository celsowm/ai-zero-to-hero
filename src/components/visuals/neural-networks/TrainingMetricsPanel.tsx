import React from 'react';
import type { NeuralNetworkStepDebuggerVisualCopy } from '../../../types/slide';
import type { SampleSnapshot, TrainingDebuggerState } from '../../../utils/neuralTrainingEngine';
import { sw } from '../../../theme/tokens';
import { MetricCard } from './MetricCard';
import { MiniLossChart } from './MiniLossChart';
import { PLACEHOLDER_VALUE } from './constants';
import { fmt } from './utils';

type Phase = 'init' | 'forward' | 'backprop' | 'update' | 'finalize';

interface Props {
  engineState: TrainingDebuggerState;
  snap: SampleSnapshot | null;
  phase: Phase;
  mse: number | null;
  accuracy: number;
  copy: NeuralNetworkStepDebuggerVisualCopy;
  explanationRef: React.RefObject<HTMLDivElement | null>;
}

export const TrainingMetricsPanel: React.FC<Props> = ({
  engineState,
  snap,
  phase,
  mse,
  accuracy,
  copy,
  explanationRef,
}) => (
  <>
    <div style={{ padding: '2px 4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)', marginBottom: 4 }}>
        <span>{copy.trainingLabels.epochLabel}</span>
        <span style={{ color: 'var(--sw-text)' }}>{engineState.epoch}/{copy.totalEpochs}</span>
      </div>
      <div style={{ height: 4, borderRadius: 999, overflow: 'hidden', background: sw.borderMedium }}>
        <div
          style={{
            height: '100%',
            width: `${(engineState.epoch / copy.totalEpochs) * 100}%`,
            borderRadius: 999,
            background: engineState.converged ? sw.green : `linear-gradient(90deg, ${sw.cyan}, ${sw.sky})`,
          }}
        />
      </div>
    </div>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
      <MetricCard label={copy.trainingLabels.mseLabel} value={mse !== null ? (mse < 0.001 ? mse.toFixed(5) : mse.toFixed(4)) : '—'} accent={engineState.converged ? sw.green : sw.cyan} />
      <MetricCard label={copy.trainingLabels.accuracyLabel} value={phase === 'init' ? '—' : `${(accuracy * 100).toFixed(0)}%`} accent={accuracy === 1 ? '#22c55e' : 'var(--sw-text)'} />
    </div>

    <div style={{ borderRadius: 12, border: `1px solid ${sw.borderSubtle}`, background: 'rgba(0,0,0,0.15)', padding: '6px 4px', minHeight: 70 }}>
      <div style={{ fontSize: 7, fontWeight: 800, color: 'var(--sw-text-muted)', textAlign: 'center', marginBottom: 4, textTransform: 'uppercase' }}>
        {copy.labels.lossHistoryTitle}
      </div>
      <MiniLossChart history={engineState.lossHistory} total={copy.totalEpochs} threshold={copy.convergenceThreshold} />
    </div>

    {engineState.converged ? (
      <div
        style={{
          textAlign: 'center',
          fontSize: 11,
          fontWeight: 900,
          color: '#22c55e',
          padding: '6px 0',
          borderRadius: 10,
          background: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.3)',
        }}
      >
        ✓ {copy.trainingLabels.convergenceLabel}
      </div>
    ) : null}

    <div
      ref={explanationRef}
      style={{
        marginTop: 6,
        padding: '12px 14px',
        borderRadius: 14,
        background: sw.tintStrong,
        border: `1px solid ${sw.borderSubtle}`,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        flex: 1,
        minHeight: 0,
        overflowY: 'auto',
        scrollbarWidth: 'thin',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: phase === 'init' ? '#94a3b8' : phase === 'forward' ? sw.sky : phase === 'backprop' ? sw.pink : phase === 'update' ? sw.purple : sw.green }} />
        <div style={{ fontSize: 9, fontWeight: 900, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--sw-text-dim)' }}>
          {copy.labels.phaseTitle}
        </div>
      </div>
      <div
        style={{
          fontSize: 12.5,
          lineHeight: 1.6,
          color: 'var(--sw-text)',
          fontWeight: 500,
          fontStyle: 'italic',
          whiteSpace: 'pre-line',
        }}
      >
        {copy.phaseExplanations[phase]}
      </div>
    </div>

    <div style={{ padding: '8px 10px', borderRadius: 12, background: sw.tint, border: `1px solid ${sw.gridLine}` }}>
      <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: '#66b84a', marginBottom: 4 }}>
        {copy.labels.predictionLabel}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 16, fontWeight: 900, fontFamily: 'monospace', color: snap && snap.forward.outputActivation >= 0.5 ? '#22c55e' : '#f97316' }}>
          {!snap ? PLACEHOLDER_VALUE : fmt(snap.forward.outputActivation)}
        </span>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--sw-text)' }}>
            {copy.labels.finalClassLabel} {!snap ? PLACEHOLDER_VALUE : snap.forward.outputActivation >= 0.5 ? '1' : '0'}
          </div>
          <div style={{ fontSize: 8, color: 'var(--sw-text-dim)' }}>
            {copy.labels.targetLabel}: {snap ? snap.sample.target : PLACEHOLDER_VALUE}
          </div>
        </div>
      </div>
    </div>
  </>
);
