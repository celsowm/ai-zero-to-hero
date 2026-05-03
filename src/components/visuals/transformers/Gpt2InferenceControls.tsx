import React from 'react';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: { stepButton: string; playButton: string; pauseButton: string; resetButton: string; speedLabel: string };
  isPlaying: boolean;
  isComplete: boolean;
  speed: number;
  onStep: () => void;
  onPlayPause: () => void;
  onReset: () => void;
  onSpeedChange: () => void;
}

export const Gpt2InferenceControls = React.memo(({ copy, isPlaying, isComplete, speed, onStep, onPlayPause, onReset, onSpeedChange }: Props) => {
  const btnBase: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: 8,
    border: `1px solid ${sw.borderSubtle}`,
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 700,
    transition: 'all 0.15s ease',
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '10px 16px',
      borderRadius: 10,
      background: 'rgba(0,0,0,0.3)',
      border: `1px solid ${sw.borderSubtle}`,
    }}>
      <button type="button" onClick={onReset} style={{ ...btnBase, background: 'rgba(255,255,255,0.04)', color: 'var(--sw-text-muted)' }}>
        {copy.resetButton}
      </button>
      <button type="button" onClick={onStep} disabled={isComplete} style={{
        ...btnBase,
        background: isComplete ? 'rgba(255,255,255,0.02)' : 'rgba(0,229,255,0.15)',
        color: isComplete ? 'rgba(255,255,255,0.15)' : sw.cyan,
        cursor: isComplete ? 'not-allowed' : 'pointer',
        opacity: isComplete ? 0.4 : 1,
      }}>
        {copy.stepButton}
      </button>
      <button type="button" onClick={onPlayPause} disabled={isComplete} style={{
        ...btnBase,
        background: isComplete ? 'rgba(255,255,255,0.02)' : isPlaying ? 'rgba(239,68,68,0.15)' : 'rgba(34,197,94,0.15)',
        color: isComplete ? 'rgba(255,255,255,0.15)' : isPlaying ? '#f87171' : '#22c55e',
        cursor: isComplete ? 'not-allowed' : 'pointer',
        opacity: isComplete ? 0.4 : 1,
      }}>
        {isComplete ? '✓' : isPlaying ? copy.pauseButton : copy.playButton}
      </button>

      <div style={{ flex: 1 }} />

      <button type="button" onClick={onSpeedChange} style={{
        ...btnBase,
        background: 'rgba(255,255,255,0.04)',
        color: 'var(--sw-text-dim)',
        minWidth: 50,
      }}>
        {copy.speedLabel}: {speed}×
      </button>
    </div>
  );
});
