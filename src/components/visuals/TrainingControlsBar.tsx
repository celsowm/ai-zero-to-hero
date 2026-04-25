import React from 'react';

interface TrainingControlsBarProps {
  isRunning: boolean;
  progress: number;
  stepIndex: number;
  totalSteps: number;
  onPlay: () => void;
  onPause: () => void;
  onStep: () => void;
  onReset: () => void;
  disabled?: boolean;
}

/**
 * Presentational training controls bar.
 * Renders standard play/pause/step/reset UI shared across training visuals.
 */
export const TrainingControlsBar: React.FC<TrainingControlsBarProps> = ({
  isRunning,
  progress,
  stepIndex,
  totalSteps,
  onPlay,
  onPause,
  onStep,
  onReset,
  disabled = false,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        {isRunning ? (
          <button
            onClick={onPause}
            disabled={disabled}
            className="px-3 py-1.5 rounded bg-white/10 text-white text-sm font-medium hover:bg-white/20 disabled:opacity-40"
            aria-label="Pause"
          >
            ⏸ Pause
          </button>
        ) : (
          <button
            onClick={onPlay}
            disabled={disabled || stepIndex >= totalSteps - 1}
            className="px-3 py-1.5 rounded bg-white/10 text-white text-sm font-medium hover:bg-white/20 disabled:opacity-40"
            aria-label="Play"
          >
            ▶ Play
          </button>
        )}
        <button
          onClick={onStep}
          disabled={disabled || stepIndex >= totalSteps - 1}
          className="px-3 py-1.5 rounded bg-white/10 text-white text-sm font-medium hover:bg-white/20 disabled:opacity-40"
          aria-label="Step forward"
        >
          ⏭ Step
        </button>
        <button
          onClick={onReset}
          disabled={disabled}
          className="px-3 py-1.5 rounded bg-white/10 text-white text-sm font-medium hover:bg-white/20 disabled:opacity-40"
          aria-label="Reset"
        >
          ↺ Reset
        </button>
        <span className="ml-auto text-xs text-white/50 tabular-nums">
          Step {stepIndex + 1}/{totalSteps}
        </span>
      </div>
      <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
};
