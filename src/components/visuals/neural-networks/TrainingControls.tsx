import React from 'react';

interface TrainingControlsProps {
  isPlaying: boolean;
  speed: number;
  epoch: number;
  totalEpochs: number;
  mse: number | null;
  converged: boolean;
  trainingDone: boolean;
  statusText: string;
  accent: string;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onSkip: () => void;
  onSpeedChange: (speed: number) => void;
  copy: {
    playLabel: string;
    pauseLabel: string;
    resetLabel: string;
    speedLabel: string;
    epochLabel: string;
    lossLabel: string;
  };
}

const speeds = [1, 5, 25, 100, 500];

export const TrainingControls = React.memo(({
  isPlaying,
  speed,
  epoch,
  totalEpochs,
  mse,
  converged,
  trainingDone,
  statusText,
  accent,
  onPlay,
  onPause,
  onReset,
  onSkip,
  onSpeedChange,
  copy,
}: TrainingControlsProps) => {
  const progress = totalEpochs > 0 ? (epoch / totalEpochs) * 100 : 0;
  const statusColor = converged ? '#22c55e' : trainingDone ? '#38bdf8' : isPlaying ? accent : 'var(--sw-text-dim)';

  const formatMse = (v: number | null) => {
    if (v === null) return '—';
    return v < 0.001 ? v.toFixed(6) : v < 0.01 ? v.toFixed(5) : v.toFixed(4);
  };

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      {/* Status */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: statusColor,
            boxShadow: isPlaying ? `0 0 8px ${statusColor}` : 'none',
            transition: 'all 200ms ease',
          }}
        />
        <span style={{ fontSize: 11, fontWeight: 600, color: statusColor }}>{statusText}</span>
      </div>

      {/* Epoch progress */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
          <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', fontWeight: 600 }}>
            {copy.epochLabel}
          </span>
          <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sw-text)' }}>
            {epoch} / {totalEpochs}
          </span>
        </div>
        <div
          style={{
            height: 4,
            borderRadius: 999,
            overflow: 'hidden',
            background: 'rgba(255,255,255,0.06)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${accent}, ${converged ? '#22c55e' : 'rgba(255,255,255,0.85)'})`,
              transition: 'width 150ms ease',
            }}
          />
        </div>
      </div>

      {/* MSE */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '6px 10px',
          borderRadius: 10,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', fontWeight: 600 }}>{copy.lossLabel}</span>
        <span style={{ fontSize: 13, fontWeight: 800, color: converged ? '#22c55e' : 'var(--sw-text)' }}>
          {formatMse(mse)}
        </span>
      </div>

      {/* Play/Pause + Reset + Skip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto auto', gap: 6, alignItems: 'center' }}>
        <button
          type="button"
          onClick={isPlaying ? onPause : onPlay}
          disabled={converged || trainingDone}
          style={{
            padding: '8px 14px',
            borderRadius: 10,
            border: `1px solid ${converged || trainingDone ? 'rgba(255,255,255,0.08)' : `${accent}55`}`,
            background:
              converged || trainingDone
                ? 'rgba(255,255,255,0.03)'
                : isPlaying
                  ? `${accent}22`
                  : `${accent}14`,
            color: converged || trainingDone ? 'var(--sw-text-dim)' : accent,
            fontSize: 11,
            fontWeight: 700,
            cursor: converged || trainingDone ? 'not-allowed' : 'pointer',
            transition: 'all 150ms ease',
          }}
        >
          {isPlaying ? copy.pauseLabel : copy.playLabel}
        </button>

        <button
          type="button"
          onClick={onReset}
          style={{
            padding: '8px 10px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--sw-text)',
            fontSize: 11,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {copy.resetLabel}
        </button>

        <button
          type="button"
          onClick={onSkip}
          disabled={converged || trainingDone}
          style={{
            padding: '8px 10px',
            borderRadius: 10,
            border: '1px solid rgba(255,255,255,0.08)',
            background: converged || trainingDone ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.04)',
            color: converged || trainingDone ? 'var(--sw-text-dim)' : 'var(--sw-text)',
            fontSize: 11,
            fontWeight: 700,
            cursor: converged || trainingDone ? 'not-allowed' : 'pointer',
          }}
          title="Pular para o final"
        >
          ⏭
        </button>
      </div>

      {/* Speed */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', fontWeight: 600, whiteSpace: 'nowrap' }}>
          {copy.speedLabel}
        </span>
        <div style={{ display: 'flex', gap: 4, flex: 1 }}>
          {speeds.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => onSpeedChange(s)}
              style={{
                flex: 1,
                padding: '5px 0',
                borderRadius: 8,
                border: `1px solid ${s === speed ? `${accent}66` : 'rgba(255,255,255,0.06)'}`,
                background: s === speed ? `${accent}18` : 'rgba(255,255,255,0.02)',
                color: s === speed ? accent : 'var(--sw-text-dim)',
                fontSize: 10,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
});
