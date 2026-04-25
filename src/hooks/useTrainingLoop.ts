import { useCallback, useEffect, useRef, useState } from 'react';

interface UseTrainingLoopOptions {
  totalSteps: number;
  intervalMs?: number;
  onStep?: (stepIndex: number) => void;
  onComplete?: () => void;
}

interface UseTrainingLoopReturn {
  stepIndex: number;
  isRunning: boolean;
  progress: number;
  play: () => void;
  pause: () => void;
  step: () => void;
  reset: () => void;
}

/**
 * Shared training loop hook.
 * Eliminates duplicated play/pause/step/reset logic across training visuals.
 */
export function useTrainingLoop({
  totalSteps,
  intervalMs = 800,
  onStep,
  onComplete,
}: UseTrainingLoopOptions): UseTrainingLoopReturn {
  const [stepIndex, setStepIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const onStepRef = useRef(onStep);
  const onCompleteRef = useRef(onComplete);

  onStepRef.current = onStep;
  onCompleteRef.current = onComplete;

  const clearTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const advance = useCallback(() => {
    setStepIndex(prev => {
      const next = prev + 1;
      if (next >= totalSteps) {
        clearTimer();
        setIsRunning(false);
        onCompleteRef.current?.();
        return totalSteps - 1;
      }
      onStepRef.current?.(next);
      return next;
    });
  }, [totalSteps, clearTimer]);

  const play = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const step = useCallback(() => {
    setStepIndex(prev => {
      const next = prev + 1;
      if (next >= totalSteps) {
        setIsRunning(false);
        onCompleteRef.current?.();
        return totalSteps - 1;
      }
      onStepRef.current?.(next);
      return next;
    });
  }, [totalSteps]);

  const reset = useCallback(() => {
    clearTimer();
    setStepIndex(0);
    setIsRunning(false);
  }, [clearTimer]);

  // Manage interval
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(advance, intervalMs);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [isRunning, intervalMs, advance, clearTimer]);

  const progress = totalSteps > 0 ? stepIndex / (totalSteps - 1) : 0;

  return { stepIndex, isRunning, progress, play, pause, step, reset };
}
