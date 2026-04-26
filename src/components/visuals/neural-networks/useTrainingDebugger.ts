import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NeuralNetworkStepDebuggerVisualCopy } from '../../../types/slide';
import {
  createTrainingDebugger,
  evaluateDataset,
  type SampleSnapshot,
  type TrainingDebuggerState,
} from '../../../utils/neuralTrainingEngine';
import { useLocale } from '../../../context/LocaleContext';
import { resolveSnippetSource } from '../../../content/registry';
import { SPEED_SETTINGS } from './constants';

type Phase = 'init' | 'forward' | 'backprop' | 'update' | 'finalize';
type Speed = 'sample' | 'epoch' | 'fast';

export function useTrainingDebugger(copy: NeuralNetworkStepDebuggerVisualCopy) {
  const { language } = useLocale();
  const engineRef = useRef<ReturnType<typeof createTrainingDebugger> | null>(null);
  const animationRef = useRef<number | null>(null);
  const explanationRef = useRef<HTMLDivElement | null>(null);
  const [snap, setSnap] = useState<SampleSnapshot | null>(null);
  const [engineState, setEngineState] = useState<TrainingDebuggerState | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>('sample');
  const [phase, setPhase] = useState<Phase>('init');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Initialize engine
  useEffect(() => {
    const engine = createTrainingDebugger({
      dataset: copy.dataset.map((sample) => ({ inputs: sample.inputs, target: sample.target })),
      learningRate: copy.learningRate,
      initialWeights: copy.initialWeights,
      totalEpochs: copy.totalEpochs,
      convergenceThreshold: copy.convergenceThreshold,
      architecture: copy.architecture,
    });

    engineRef.current = engine;

    const frame = requestAnimationFrame(() => {
      setSnap(null);
      setEngineState(engine.getState());
    });

    return () => cancelAnimationFrame(frame);
  }, [copy]);

  // Scroll explanation on phase change
  useEffect(() => {
    const node = explanationRef.current;
    if (!node) return;
    node.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const advanceSamples = useCallback((count: number) => {
    const engine = engineRef.current;
    if (!engine) return null;

    const state = engine.getState();
    if (state.done) {
      setIsPlaying(false);
      return state;
    }

    const snapshots = engine.stepSamples(count);
    if (snapshots.length > 0) {
      setSnap(snapshots[snapshots.length - 1]);
    }
    const nextState = engine.getState();
    setEngineState(nextState);
    return nextState;
  }, []);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) return;

    let cancelled = false;
    let lastTime = 0;
    const { delayMs, batchSize } = SPEED_SETTINGS[speed];

    const loop = (time: number) => {
      if (time - lastTime > delayMs) {
        lastTime = time;
        setPhase((currentPhase) => {
          if (currentPhase === 'init') {
            const nextState = advanceSamples(batchSize);
            return nextState?.done ? 'finalize' : 'forward';
          }
          if (currentPhase === 'forward') return 'backprop';
          if (currentPhase === 'backprop') return 'update';
          const nextState = advanceSamples(batchSize);
          return nextState?.done ? 'finalize' : 'forward';
        });
      }

      const state = engineRef.current?.getState();
      if (!cancelled && state && !state.done) {
        animationRef.current = requestAnimationFrame(loop);
      } else {
        setIsPlaying(false);
      }
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => {
      cancelled = true;
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [advanceSamples, isPlaying, speed]);

  const handlePlayPause = useCallback(() => {
    if (!engineState || engineState.done) return;
    setIsPlaying((c) => !c);
  }, [engineState]);

  const handleStep = useCallback(() => {
    if (isPlaying) return;

    if (phase === 'init') {
      const nextState = advanceSamples(1);
      setPhase(nextState?.done ? 'finalize' : 'forward');
      return;
    }
    if (phase === 'forward') { setPhase('backprop'); return; }
    if (phase === 'backprop') { setPhase('update'); return; }

    const nextState = advanceSamples(1);
    setPhase(nextState?.done ? 'finalize' : 'forward');
  }, [isPlaying, phase, advanceSamples]);

  const handleReset = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;

    setIsPlaying(false);
    if (animationRef.current) cancelAnimationFrame(animationRef.current);
    engine.reset();
    setSnap(null);
    setEngineState(engine.getState());
    setPhase('init');
  }, []);

  const mse = engineState?.lossHistory.at(-1) ?? null;
  const accuracy = useMemo(
    () => (engineState ? evaluateDataset(engineState.weights, copy.dataset).accuracy : 0),
    [engineState, copy.dataset],
  );

  const resolvedSnippet = useMemo(() => {
    if (!copy.pythonSource) return null;
    try {
      return resolveSnippetSource(copy.pythonSource, language);
    } catch (error) {
      console.error(`Failed to resolve neural network snippet "${copy.pythonSource.snippetId}"`, error);
      return null;
    }
  }, [copy.pythonSource, language]);

  const activeCodeRange = resolvedSnippet?.regions[phase] ?? copy.codeHighlightRanges?.[phase] ?? null;
  const activeCode = resolvedSnippet?.code ?? copy.pythonCode ?? '';

  return {
    snap,
    engineState,
    isPlaying,
    speed,
    phase,
    activeTooltip,
    setActiveTooltip,
    explanationRef,
    mse,
    accuracy,
    activeCode,
    activeCodeRange,
    handlePlayPause,
    handleStep,
    handleReset,
    setSpeed,
  };
}
