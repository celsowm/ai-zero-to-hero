import { useCallback, useEffect, useState } from 'react';
import type { Gpt2PytorchE2eDebuggerCopy } from '../../../types/slide';

export type InferencePhase =
  | 'embedding'
  | 'attention'
  | 'mlp'
  | 'residual'
  | 'finalNorm'
  | 'lmHead'
  | 'softmax'
  | 'nextToken';

const PHASES_ORDER: InferencePhase[] = [
  'embedding', 'attention', 'mlp', 'residual',
  'finalNorm', 'lmHead', 'softmax', 'nextToken',
];

interface TensorShape { shape: string; description: string }
interface AttentionInfo { shape: string; pattern: string }
interface TokenInfo { id: number; text: string; prob: number }

export interface InferenceSnapshot {
  phase: InferencePhase;
  hiddenState: TensorShape;
  attention: AttentionInfo | null;
  logits: TensorShape | null;
  probs: TokenInfo[] | null;
  nextToken: TokenInfo | null;
}

export interface EngineState {
  isPlaying: boolean;
  speed: number;
  currentToken: number;
}

const SPEEDS = [1, 3, 5];

function generateTopTokens(): TokenInfo[] {
  const tokenPools: TokenInfo[] = [
    { id: 1842, text: ' the', prob: 0.12 },
    { id: 262, text: ' a', prob: 0.08 },
    { id: 13, text: '!', prob: 0.05 },
    { id: 198, text: '\n', prob: 0.04 },
    { id: 314, text: ' our', prob: 0.03 },
  ];
  return tokenPools;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useGpt2InferenceEngine(_copy: Gpt2PytorchE2eDebuggerCopy) {
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(0);

  const currentPhase = PHASES_ORDER[phaseIndex % PHASES_ORDER.length];

  const engineState: EngineState = {
    isPlaying,
    speed: SPEEDS[speed] ?? 1,
    currentToken: 4,
  };

  const snap: InferenceSnapshot = (() => {
    const base: InferenceSnapshot = {
      phase: currentPhase,
      hiddenState: { shape: '[1, 4, 768]', description: 'Hidden state (batch, seq, embd)' },
      attention: null,
      logits: null,
      probs: null,
      nextToken: null,
    };

    switch (currentPhase) {
      case 'embedding':
        return { ...base, hiddenState: { shape: '[1, 4, 768]', description: 'Token + Position embeddings somados' } };
      case 'attention':
        return { ...base, hiddenState: { shape: '[1, 4, 768]', description: 'Saída da atenção multi-head (12 heads)' }, attention: { shape: '[12, 4, 4]', pattern: 'Causal mask aplicado' } };
      case 'mlp':
        return { ...base, hiddenState: { shape: '[1, 4, 768]', description: 'Saída do MLP (768→3072→768 + GELU)' } };
      case 'residual':
        return { ...base, hiddenState: { shape: '[1, 4, 768]', description: 'Residual add: input + attn + mlp (×12 blocos)' } };
      case 'finalNorm':
        return { ...base, hiddenState: { shape: '[1, 4, 768]', description: 'LayerNorm final (eps=1e-5)' } };
      case 'lmHead':
        return { ...base, hiddenState: { shape: '[1, 4, 50257]', description: 'Projeção para vocabulário (lm_head)' }, logits: { shape: '[1, 4, 50257]', description: 'Logits brutos (sem normalização)' } };
      case 'softmax':
        return { ...base, hiddenState: { shape: '[1, 4, 50257]', description: 'Softmax aplicado no último token' }, probs: generateTopTokens() };
      case 'nextToken':
        return { ...base, hiddenState: { shape: '[1, 4, 50257]', description: 'Token sorteado via multinomial' }, nextToken: { id: 1842, text: 'the', prob: 0.12 } };
      default:
        return base;
    }
  })();

  const handleStep = useCallback(() => {
    setPhaseIndex(prev => {
      if (prev >= PHASES_ORDER.length - 1) return prev; // bloqueado no final
      return prev + 1;
    });
  }, []);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setPhaseIndex(0);
    setIsPlaying(false);
  }, []);

  const handleSpeedChange = useCallback(() => {
    setSpeed(prev => (prev + 1) % SPEEDS.length);
  }, []);

  const isComplete = phaseIndex >= PHASES_ORDER.length - 1;

  useEffect(() => {
    if (!isPlaying || isComplete) return;
    const delay = 1800 / (SPEEDS[speed] ?? 1);
    const interval = setInterval(() => {
      setPhaseIndex(prev => {
        if (prev >= PHASES_ORDER.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, delay);
    return () => clearInterval(interval);
  }, [isPlaying, speed, isComplete]);

  // Stop playing when reaching the last phase
  useEffect(() => {
    if (isComplete && isPlaying) {
      const timer = setTimeout(() => setIsPlaying(false), 0);
      return () => clearTimeout(timer);
    }
  }, [isComplete, isPlaying]);

  return {
    snap,
    engineState,
    isPlaying,
    speed: SPEEDS[speed] ?? 1,
    phase: currentPhase,
    isComplete,
    handlePlayPause,
    handleStep,
    handleReset,
    setSpeed: handleSpeedChange,
  };
}
