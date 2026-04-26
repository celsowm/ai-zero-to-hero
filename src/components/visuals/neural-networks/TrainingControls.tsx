import React from 'react';
import type { NeuralNetworkStepDebuggerVisualCopy } from '../../../types/slide';
import type { TrainingDebuggerState } from '../../../utils/neuralTrainingEngine';
import { sw } from '../../../theme/tokens';
import type { Speed } from './constants';
import { buttonStyle } from './utils';

interface Props {
  copy: NeuralNetworkStepDebuggerVisualCopy;
  engineState: TrainingDebuggerState;
  isPlaying: boolean;
  speed: Speed;
  onStep: () => void;
  onPlayPause: () => void;
  onReset: () => void;
  onSpeedChange: (speed: Speed) => void;
}

export const TrainingControls: React.FC<Props> = ({
  copy,
  engineState,
  isPlaying,
  speed,
  onStep,
  onPlayPause,
  onReset,
  onSpeedChange,
}) => (
  <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingTop: 4 }}>
    <button type="button" onClick={onStep} disabled={isPlaying || engineState.done} style={buttonStyle()}>
      {copy.labels.stepButton}
    </button>
    <button type="button" onClick={onPlayPause} disabled={engineState.done} style={buttonStyle(`${sw.cyan}66`, isPlaying ? `${sw.cyan}33` : `${sw.cyan}15`, sw.cyan)}>
      {isPlaying ? copy.labels.pauseButton : copy.labels.playButton}
    </button>
    <button type="button" onClick={onReset} style={buttonStyle()}>
      {copy.labels.resetButton}
    </button>
    <div style={{ flex: 1 }} />
    <div style={{ display: 'flex', gap: 2 }}>
      {([
        ['sample', copy.labels.speedSample],
        ['epoch', copy.labels.speedEpoch],
        ['fast', copy.labels.speedFast],
      ] as const).map(([speedKey, label]) => (
        <button
          key={speedKey}
          type="button"
          onClick={() => onSpeedChange(speedKey)}
          style={{
            padding: '4px 8px',
            borderRadius: 6,
            border: `1px solid ${speed === speedKey ? `${sw.cyan}66` : sw.borderSubtle}`,
            background: speed === speedKey ? `${sw.cyan}20` : 'transparent',
            color: speed === speedKey ? sw.cyan : 'var(--sw-text-dim)',
            fontSize: 9,
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          {label}
        </button>
      ))}
    </div>
  </div>
);