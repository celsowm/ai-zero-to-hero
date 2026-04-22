import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import hljs from 'highlight.js';
import type { NeuralNetworkStepDebuggerVisualCopy } from '../../../types/slide';
import {
  createTrainingDebugger,
  evaluateDataset,
  type NetworkWeights,
  type SampleSnapshot,
  type TrainingDebuggerState,
} from '../../../utils/neuralTrainingEngine';
import { PanelCard } from '../PanelCard';

interface Props {
  copy: NeuralNetworkStepDebuggerVisualCopy;
}

type Phase = 'init' | 'forward' | 'backprop' | 'update';
type Speed = 'sample' | 'epoch' | 'fast';

const fmt = (value: number, digits = 4) => value.toFixed(digits);

const HighlightedCode: React.FC<{
  code: string;
  activeRange: [number, number] | null;
}> = ({ code, activeRange }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lines = useMemo(() => hljs.highlight(code, { language: 'python' }).value.split('\n'), [code]);

  useEffect(() => {
    if (!activeRange) {
      return;
    }

    const targetLine = lineRefs.current[activeRange[0] - 1];
    if (!targetLine) {
      return;
    }

    targetLine.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }, [activeRange]);

  return (
    <div
      ref={containerRef}
      style={{
        borderRadius: 8,
        background: 'rgba(0,0,0,0.35)',
        border: '1px solid rgba(255,255,255,0.05)',
        overflow: 'auto',
        flex: 1,
        minHeight: 0,
      }}
    >
      {lines.map((html, index) => {
        const lineNumber = index + 1;
        const active = activeRange && lineNumber >= activeRange[0] && lineNumber <= activeRange[1];
        const dimmed = activeRange && !active;

        return (
          <div
            key={lineNumber}
            ref={(node) => {
              lineRefs.current[index] = node;
            }}
            style={{
              display: 'flex',
              padding: '0 6px',
              background: active ? 'rgba(56,189,248,0.12)' : 'transparent',
              borderLeft: active ? '2px solid #38bdf8' : '2px solid transparent',
              opacity: dimmed ? 0.3 : 1,
              transition: 'all 120ms',
              fontSize: 10,
              lineHeight: 1.55,
              fontFamily: "'JetBrains Mono','Fira Code',monospace",
            }}
          >
            <span
              style={{
                color: 'rgba(255,255,255,0.15)',
                minWidth: 18,
                textAlign: 'right',
                userSelect: 'none',
                marginRight: 6,
              }}
            >
              {lineNumber}
            </span>
            <span className="hljs" style={{ background: 'transparent', whiteSpace: 'pre' }} dangerouslySetInnerHTML={{ __html: html || ' ' }} />
          </div>
        );
      })}
    </div>
  );
};

function getNodeYs(count: number, top: number, bottom: number): number[] {
  if (count === 1) {
    return [(top + bottom) / 2];
  }

  const step = (bottom - top) / (count - 1);
  return Array.from({ length: count }, (_, index) => top + step * index);
}

const NetworkGraph: React.FC<{
  snap: SampleSnapshot;
  copy: NeuralNetworkStepDebuggerVisualCopy;
  activePhase: Phase;
  onHover: (text: string | null) => void;
}> = ({ snap, copy, activePhase, onHover }) => {
  const inputYs = getNodeYs(copy.architecture.inputSize, 44, 204);
  const hiddenYs = getNodeYs(copy.architecture.hiddenSize, 56, 192);
  const outputY = 124;
  const weights = snap.weightsAfter;
  const isForward = activePhase === 'forward';
  const isBackprop = activePhase === 'backprop';
  const isUpdate = activePhase === 'update';
  const edgeColorInput = isBackprop ? '#ff2e97' : '#38bdf8';
  const edgeColorOutput = isBackprop ? '#ff2e97' : '#66b84a';

  return (
    <svg viewBox="0 0 380 240" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <marker id="nn-ah-fwd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
        </marker>
        <marker id="nn-ah-bwd" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto">
          <path d="M 10 0 L 0 5 L 10 10 z" fill="#ff2e97" />
        </marker>
        <style>{`
          @keyframes nn-flow-forward { from { stroke-dashoffset: 20 } to { stroke-dashoffset: 0 } }
          @keyframes nn-flow-backward { from { stroke-dashoffset: 0 } to { stroke-dashoffset: 20 } }
          @keyframes nn-pulse { 0% { stroke-opacity: 0.45; } 50% { stroke-opacity: 1; stroke-width: 3.5; } 100% { stroke-opacity: 0.45; } }
          .nn-hoverable { cursor: help; pointer-events: all; }
        `}</style>
      </defs>

      <text x="60" y="15" textAnchor="middle" fontSize="7" fontWeight="900" fill={isForward ? '#00e5ff' : 'var(--sw-text-dim)'}>
        {copy.labels.inputLayer}
      </text>
      <text x="210" y="15" textAnchor="middle" fontSize="7" fontWeight="900" fill={isForward || isBackprop ? '#38bdf8' : 'var(--sw-text-dim)'}>
        {copy.labels.hiddenLayer}
      </text>
      <text x="334" y="15" textAnchor="middle" fontSize="7" fontWeight="900" fill={isForward || isBackprop ? '#66b84a' : 'var(--sw-text-dim)'}>
        {copy.labels.outputLayer}
      </text>

      {inputYs.flatMap((inputY, inputIndex) =>
        hiddenYs.map((hiddenY, hiddenIndex) => {
          const weight = weights.inputToHidden[hiddenIndex][inputIndex];
          return (
            <g
              key={`input-hidden-${inputIndex}-${hiddenIndex}`}
              className="nn-hoverable"
              onMouseEnter={() => onHover(copy.tooltips.weight)}
              onMouseLeave={() => onHover(null)}
            >
              <path
                d={`M82 ${inputY} C120 ${inputY},146 ${hiddenY},180 ${hiddenY}`}
                fill="none"
                stroke={edgeColorInput}
                strokeWidth={Math.max(0.7, Math.min(3.2, Math.abs(weight) * 6))}
                strokeDasharray="4 4"
                opacity={isUpdate ? 1 : 0.45}
                markerEnd={isForward ? 'url(#nn-ah-fwd)' : 'none'}
                markerStart={isBackprop ? 'url(#nn-ah-bwd)' : 'none'}
                style={{
                  animation: isForward
                    ? 'nn-flow-forward 1.2s linear infinite'
                    : isBackprop
                      ? 'nn-flow-backward 1.2s linear infinite'
                      : isUpdate
                        ? 'nn-pulse 1s ease-in-out infinite'
                        : 'none',
                  transition: 'stroke 300ms',
                }}
              />
              <g transform={`translate(128, ${inputY + (hiddenY - inputY) * 0.45})`}>
                <rect x="-10" y="-4.5" width="20" height="7" rx="2" fill="rgba(0,0,0,0.6)" />
                <text textAnchor="middle" fontSize="5" fontWeight="700" fill={weight >= 0 ? '#38bdf8' : '#f43f5e'}>
                  {fmt(weight, 2)}
                </text>
              </g>
            </g>
          );
        }),
      )}

      {hiddenYs.map((hiddenY, hiddenIndex) => {
        const weight = weights.hiddenToOutput[hiddenIndex];
        return (
          <g
            key={`hidden-output-${hiddenIndex}`}
            className="nn-hoverable"
            onMouseEnter={() => onHover(copy.tooltips.weight)}
            onMouseLeave={() => onHover(null)}
          >
            <path
              d={`M240 ${hiddenY} C266 ${hiddenY},286 ${outputY},312 ${outputY}`}
              fill="none"
              stroke={edgeColorOutput}
              strokeWidth={Math.max(0.8, Math.min(3.5, Math.abs(weight) * 5))}
              strokeDasharray="4 4"
              opacity={isUpdate ? 1 : 0.45}
              markerEnd={isForward ? 'url(#nn-ah-fwd)' : 'none'}
              markerStart={isBackprop ? 'url(#nn-ah-bwd)' : 'none'}
              style={{
                animation: isForward
                  ? 'nn-flow-forward 1s linear infinite'
                  : isBackprop
                    ? 'nn-flow-backward 1s linear infinite'
                    : isUpdate
                      ? 'nn-pulse 0.8s ease-in-out infinite'
                      : 'none',
              }}
            />
            <g transform={`translate(276, ${hiddenY + (outputY - hiddenY) * 0.5})`}>
              <rect x="-10" y="-4.5" width="20" height="7" rx="2" fill="rgba(0,0,0,0.6)" />
              <text textAnchor="middle" fontSize="5" fontWeight="700" fill={weight >= 0 ? '#66b84a' : '#f43f5e'}>
                {fmt(weight, 2)}
              </text>
            </g>
          </g>
        );
      })}

      {inputYs.map((inputY, inputIndex) => (
        <g
          key={`input-node-${inputIndex}`}
          className="nn-hoverable"
          opacity={isForward ? 1 : 0.6}
          onMouseEnter={() => onHover(copy.tooltips.input)}
          onMouseLeave={() => onHover(null)}
        >
          <circle cx="60" cy={inputY} r="14" fill="rgba(0,229,255,0.08)" stroke="#00e5ff" strokeWidth={isForward ? 1.5 : 0.8} />
          <text x="60" y={inputY + 1} textAnchor="middle" fontSize="8" fontWeight="900" fill="#00e5ff">
            x{inputIndex + 1}
          </text>
          <text x="60" y={inputY + 11} textAnchor="middle" fontSize="6" fill="var(--sw-text-dim)">
            {fmt(snap.sample.inputs[inputIndex], 2)}
          </text>
          <text x="10" y={inputY + 3} fontSize="6.5" fill="var(--sw-text-dim)">
            {copy.featureNames[inputIndex]}
          </text>
        </g>
      ))}

      {hiddenYs.map((hiddenY, hiddenIndex) => (
        <g
          key={`hidden-node-${hiddenIndex}`}
          className="nn-hoverable"
          opacity={isForward || isBackprop ? 1 : 0.6}
          onMouseEnter={() => onHover(copy.tooltips.hidden)}
          onMouseLeave={() => onHover(null)}
        >
          <circle
            cx="210"
            cy={hiddenY}
            r={isBackprop ? 20 : 18}
            fill="rgba(56,189,248,0.08)"
            stroke={isBackprop ? '#ff2e97' : '#38bdf8'}
            strokeWidth={isForward || isBackprop ? 1.5 : 0.8}
          />
          <text x="210" y={hiddenY - 3} textAnchor="middle" fontSize="9" fontWeight="900" fill={isBackprop ? '#ff2e97' : '#38bdf8'}>
            h{hiddenIndex + 1}
          </text>
          <text x="210" y={hiddenY + 6} textAnchor="middle" fontSize="7" fontWeight="700" fill="var(--sw-text)">
            {fmt(snap.forward.hiddenActivations[hiddenIndex])}
          </text>
          <text x="210" y={hiddenY + 15} textAnchor="middle" fontSize="5.5" fill="var(--sw-text-dim)">
            z={fmt(snap.forward.hiddenZs[hiddenIndex])}
          </text>
        </g>
      ))}

      <g className="nn-hoverable" opacity={isForward || isBackprop ? 1 : 0.6} onMouseEnter={() => onHover(copy.tooltips.output)} onMouseLeave={() => onHover(null)}>
        <circle
          cx="334"
          cy={outputY}
          r={isBackprop ? 24 : 22}
          fill="rgba(102,184,74,0.08)"
          stroke={isBackprop ? '#ff2e97' : '#66b84a'}
          strokeWidth={isForward || isBackprop ? 2 : 1}
        />
        <text x="334" y={outputY - 5} textAnchor="middle" fontSize="10" fontWeight="900" fill={isBackprop ? '#ff2e97' : '#66b84a'}>
          ŷ
        </text>
        <text x="334" y={outputY + 6} textAnchor="middle" fontSize="8" fontWeight="700" fill={snap.forward.outputActivation >= 0.5 ? '#22c55e' : '#f97316'}>
          {fmt(snap.forward.outputActivation)}
        </text>
        <text x="334" y={outputY + 16} textAnchor="middle" fontSize="5.5" fill="var(--sw-text-dim)">
          z={fmt(snap.forward.outputZ)}
        </text>
      </g>

      <g transform="translate(10, 225)">
        <rect width="108" height="12" rx="4" fill="rgba(0,0,0,0.3)" />
        <text x="5" y="9" fontSize="7" fontWeight="900" letterSpacing=".05em" fill={isForward ? '#00e5ff' : isBackprop ? '#ff2e97' : '#a78bfa'}>
          {activePhase.toUpperCase()} {isForward ? 'PASS' : isBackprop ? 'PROP' : 'WEIGHTS'}
        </text>
      </g>

      <text x="334" y="232" textAnchor="middle" fontSize="7" fill="var(--sw-text-dim)">
        target={fmt(snap.sample.target, 1)}
      </text>
    </svg>
  );
};

const MiniLossChart: React.FC<{
  history: number[];
  total: number;
  threshold: number;
}> = ({ history, total, threshold }) => {
  if (history.length < 2) {
    return null;
  }

  const width = 200;
  const height = 60;
  const padding = { top: 6, right: 4, bottom: 12, left: 28 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxLoss = Math.max(...history, threshold, 0.3);
  const points = history.map((loss, index) => ({
    x: padding.left + (index / Math.max(total - 1, 1)) * chartWidth,
    y: padding.top + (1 - loss / maxLoss) * chartHeight,
  }));
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ');
  const thresholdY = padding.top + (1 - threshold / maxLoss) * chartHeight;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ display: 'block' }}>
      {thresholdY > padding.top && thresholdY < padding.top + chartHeight ? (
        <line
          x1={padding.left}
          y1={thresholdY}
          x2={padding.left + chartWidth}
          y2={thresholdY}
          stroke="#22c55e"
          strokeWidth={0.6}
          strokeDasharray="3 2"
          opacity={0.4}
        />
      ) : null}
      <path d={path} fill="none" stroke="#00e5ff" strokeWidth={1.2} strokeLinejoin="round" />
      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r={2} fill="#00e5ff" />
    </svg>
  );
};

const SectionCard: React.FC<{
  title: string;
  color: string;
  active: boolean;
  columns?: 1 | 2;
  rows: Array<{ label: string; value: string }>;
}> = ({ title, color, active, columns = 1, rows }) => (
  <div
    style={{
      padding: '8px 10px',
      borderRadius: 12,
      background: active ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.02)',
      border: `1px solid ${active ? color : 'rgba(255,255,255,0.06)'}`,
      boxShadow: active ? `0 0 0 1px ${color}, 0 0 15px ${color}22` : 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      transition: 'all 250ms ease',
    }}
  >
    <div
      style={{
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: '.06em',
        textTransform: 'uppercase',
        color,
        borderBottom: `1px solid ${color}33`,
        paddingBottom: 4,
        marginBottom: 2,
      }}
    >
      {title}
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns === 2 ? 'repeat(2, minmax(0, 1fr))' : '1fr',
        gap: columns === 2 ? 6 : 4,
      }}
    >
      {rows.map((row) => (
        <div
          key={row.label}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 10,
            padding: '4px 6px',
            borderRadius: 9,
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.04)',
            minWidth: 0,
          }}
        >
          <span
            style={{
              color: 'var(--sw-text-dim)',
              fontSize: 8,
              lineHeight: 1.1,
              textTransform: 'none',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {row.label}
          </span>
          <span
            style={{
              color: '#e8e4f0',
              fontWeight: 800,
              fontSize: 11.5,
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);

const ComputationPanel: React.FC<{
  snap: SampleSnapshot;
  activePhase: Phase;
}> = ({ snap, activePhase }) => {
  const forwardRows = [
    ...snap.forward.hiddenZs.map((value, index) => ({ label: `z${index + 1}`, value: fmt(value) })),
    ...snap.forward.hiddenActivations.map((value, index) => ({ label: `h${index + 1}`, value: fmt(value) })),
    { label: 'z_out', value: fmt(snap.forward.outputZ) },
    { label: 'ŷ', value: fmt(snap.forward.outputActivation) },
  ];
  const lossRows = [
    { label: '(ŷ-y)^2', value: fmt(snap.forward.loss, 6) },
    { label: 'ŷ-y', value: fmt(snap.backward.outputError) },
  ];
  const backpropRows = [
    { label: 'd_out', value: fmt(snap.backward.outputDelta) },
    ...snap.backward.hiddenDeltas.map((value, index) => ({ label: `d_h${index + 1}`, value: fmt(value) })),
  ];
  const updateRows = [
    ...snap.weightsBefore.hiddenToOutput.map((weight, index) => ({
      label: `v${index + 1}`,
      value: `${fmt(weight)}→${fmt(snap.weightsAfter.hiddenToOutput[index])}`,
    })),
    {
      label: 'b_out',
      value: `${fmt(snap.weightsBefore.outputBias)}→${fmt(snap.weightsAfter.outputBias)}`,
    },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridAutoRows: 'min-content',
        alignContent: 'start',
        gap: 10,
        minHeight: 0,
        overflowY: 'auto',
        padding: '4px 6px 4px 4px',
      }}
    >
      <SectionCard title="Forward" color="#38bdf8" active={activePhase === 'forward'} columns={2} rows={forwardRows} />
      <SectionCard title="Loss" color="#f97316" active={activePhase === 'forward'} columns={2} rows={lossRows} />
      <SectionCard title="Backprop" color="#ff2e97" active={activePhase === 'backprop'} columns={2} rows={backpropRows} />
      <SectionCard title="Update" color="#a78bfa" active={activePhase === 'update'} columns={2} rows={updateRows} />
    </div>
  );
};

function evaluateAccuracy(weights: NetworkWeights, copy: NeuralNetworkStepDebuggerVisualCopy): number {
  return evaluateDataset(weights, copy.dataset).accuracy;
}

export const NeuralNetworkStepDebugger: React.FC<Props> = ({ copy }) => {
  const engineRef = useRef<ReturnType<typeof createTrainingDebugger> | null>(null);
  const animationRef = useRef<number | null>(null);
  const explanationRef = useRef<HTMLDivElement | null>(null);
  const [snap, setSnap] = useState<SampleSnapshot | null>(null);
  const [engineState, setEngineState] = useState<TrainingDebuggerState | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<Speed>('sample');
  const [phase, setPhase] = useState<Phase>('init');
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

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
    const initialSnapshots = engine.stepSamples(1);

    const frame = requestAnimationFrame(() => {
      setSnap(initialSnapshots[0] ?? null);
      setEngineState(engine.getState());
    });

    return () => cancelAnimationFrame(frame);
  }, [copy]);

  useEffect(() => {
    const node = explanationRef.current;
    if (!node) {
      return;
    }

    node.scrollTo({ top: 0, behavior: 'smooth' });
  }, [phase]);

  const stepOnce = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) {
      return;
    }

    const state = engine.getState();
    if (state.converged || state.done) {
      setIsPlaying(false);
      return;
    }

    let snapshots: SampleSnapshot[] = [];
    if (speed === 'fast') {
      engine.skipEpochs(50);
      snapshots = engine.stepSamples(1);
    } else if (speed === 'epoch') {
      snapshots = engine.stepEpochs(1);
    } else {
      snapshots = engine.stepSamples(1);
    }

    if (snapshots.length > 0) {
      setSnap(snapshots[snapshots.length - 1]);
    }
    setEngineState(engine.getState());
  }, [speed]);

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let cancelled = false;
    let lastTime = 0;

    const loop = (time: number) => {
      const delay = speed === 'fast' ? 16 : speed === 'epoch' ? 100 : 400;
      if (time - lastTime > delay) {
        lastTime = time;
        setPhase((currentPhase) => {
          if (speed === 'fast') {
            stepOnce();
            return 'update';
          }
          if (currentPhase === 'init') {
            return 'forward';
          }
          if (currentPhase === 'forward') {
            return 'backprop';
          }
          if (currentPhase === 'backprop') {
            return 'update';
          }
          stepOnce();
          return 'forward';
        });
      }

      const state = engineRef.current?.getState();
      if (!cancelled && state && !state.converged && !state.done) {
        animationRef.current = requestAnimationFrame(loop);
      } else {
        setIsPlaying(false);
      }
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      cancelled = true;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying, speed, stepOnce]);

  const handlePlayPause = () => {
    if (!engineState || engineState.converged || engineState.done) {
      return;
    }
    setIsPlaying((current) => !current);
  };

  const handleStep = () => {
    if (isPlaying) {
      return;
    }

    if (phase === 'init') {
      setPhase('forward');
      return;
    }
    if (phase === 'forward') {
      setPhase('backprop');
      return;
    }
    if (phase === 'backprop') {
      setPhase('update');
      return;
    }

    stepOnce();
    setPhase('forward');
  };

  const handleReset = () => {
    const engine = engineRef.current;
    if (!engine) {
      return;
    }

    setIsPlaying(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    engine.reset();
    const initialSnapshots = engine.stepSamples(1);
    setSnap(initialSnapshots[0] ?? null);
    setEngineState(engine.getState());
    setPhase('init');
  };

  const mse = engineState?.lossHistory.at(-1) ?? null;
  const accuracy = useMemo(() => (engineState ? evaluateAccuracy(engineState.weights, copy) : 0), [copy, engineState]);

  if (!snap || !engineState) {
    return null;
  }

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.4fr 1.3fr 0.7fr', gap: 14, minHeight: 0, position: 'relative' }}>
      {activeTooltip ? (
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 100,
            padding: '8px 12px',
            borderRadius: 8,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            maxWidth: 240,
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: 11, color: 'var(--sw-text)', lineHeight: 1.4, fontWeight: 500 }}>{activeTooltip}</div>
        </div>
      ) : null}

      <PanelCard minHeight={0} gap={10} style={{ height: '100%', padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.04em', color: '#00e5ff', textTransform: 'uppercase' }}>
            {copy.trainingLabels.archLabel}: {copy.architecture.label}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)' }}>
            {copy.trainingLabels.epochLabel} <span style={{ color: 'var(--sw-text)' }}>{engineState.epoch}/{copy.totalEpochs}</span>
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
          <NetworkGraph snap={snap} copy={copy} activePhase={phase} onHover={setActiveTooltip} />
        </div>

        <div style={{ display: 'flex', gap: 6, alignItems: 'center', paddingTop: 4 }}>
          <button type="button" onClick={handleStep} disabled={isPlaying || engineState.converged || engineState.done} style={buttonStyle()}>
            {copy.labels.stepButton}
          </button>
          <button type="button" onClick={handlePlayPause} disabled={engineState.converged || engineState.done} style={buttonStyle('#00e5ff66', isPlaying ? '#00e5ff33' : '#00e5ff15', '#00e5ff')}>
            {isPlaying ? copy.labels.pauseButton : copy.labels.playButton}
          </button>
          <button type="button" onClick={handleReset} style={buttonStyle()}>
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
                onClick={() => setSpeed(speedKey)}
                style={{
                  padding: '4px 8px',
                  borderRadius: 6,
                  border: `1px solid ${speed === speedKey ? '#00e5ff66' : 'rgba(255,255,255,0.06)'}`,
                  background: speed === speedKey ? '#00e5ff20' : 'transparent',
                  color: speed === speedKey ? '#00e5ff' : 'var(--sw-text-dim)',
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
      </PanelCard>

      <PanelCard minHeight={0} gap={12} style={{ height: '100%', padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: 10, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: '#00e5ff' }}>
              {copy.labels.sampleLabel} {snap.sampleIndex + 1}/{copy.dataset.length}
            </span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,229,255,0.3)' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{phase}</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, color: snap.forward.loss < 0.1 ? '#22c55e' : '#f97316' }}>
            {copy.labels.lossLabel}: {fmt(snap.forward.loss, 4)}
          </span>
        </div>

        <ComputationPanel snap={snap} activePhase={phase} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minHeight: 120 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 12, height: 1, background: 'currentColor', opacity: 0.3 }} />
            {copy.labels.codeTitle}
          </div>
          <HighlightedCode code={copy.pythonCode} activeRange={copy.codeHighlightRanges[phase]} />
        </div>
      </PanelCard>

      <PanelCard minHeight={0} gap={10} style={{ height: '100%', padding: 12 }}>
        <div style={{ padding: '2px 4px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)', marginBottom: 4 }}>
            <span>{copy.trainingLabels.epochLabel}</span>
            <span style={{ color: 'var(--sw-text)' }}>{engineState.epoch}/{copy.totalEpochs}</span>
          </div>
          <div style={{ height: 4, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.08)' }}>
            <div
              style={{
                height: '100%',
                width: `${(engineState.epoch / copy.totalEpochs) * 100}%`,
                borderRadius: 999,
                background: engineState.converged ? '#22c55e' : 'linear-gradient(90deg, #00e5ff, #38bdf8)',
              }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <MetricCard label={copy.trainingLabels.mseLabel} value={mse !== null ? (mse < 0.001 ? mse.toFixed(5) : mse.toFixed(4)) : '—'} accent={engineState.converged ? '#22c55e' : '#00e5ff'} />
          <MetricCard label={copy.trainingLabels.accuracyLabel} value={`${(accuracy * 100).toFixed(0)}%`} accent={accuracy === 1 ? '#22c55e' : 'var(--sw-text)'} />
        </div>

        <div style={{ borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.15)', padding: '6px 4px', minHeight: 70 }}>
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
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.06)',
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
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: phase === 'init' ? '#94a3b8' : phase === 'forward' ? '#38bdf8' : phase === 'backprop' ? '#ff2e97' : '#a78bfa' }} />
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

        <div style={{ padding: '8px 10px', borderRadius: 12, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
          <div style={{ fontSize: 8, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase', color: '#66b84a', marginBottom: 4 }}>
            {copy.labels.predictionLabel}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 900, fontFamily: 'monospace', color: snap.forward.outputActivation >= 0.5 ? '#22c55e' : '#f97316' }}>
              {fmt(snap.forward.outputActivation)}
            </span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--sw-text)' }}>
                {copy.labels.finalClassLabel} {snap.forward.outputActivation >= 0.5 ? '1' : '0'}
              </div>
              <div style={{ fontSize: 8, color: 'var(--sw-text-dim)' }}>
                {copy.labels.targetLabel}: {snap.sample.target}
              </div>
            </div>
          </div>
        </div>
      </PanelCard>
    </div>
  );
};

const MetricCard: React.FC<{
  label: string;
  value: string;
  accent: string;
}> = ({ label, value, accent }) => (
  <div style={{ padding: '8px 6px', borderRadius: 12, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', textAlign: 'center' }}>
    <div style={{ fontSize: 8, color: 'var(--sw-text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
    <div style={{ fontSize: 14, fontWeight: 900, fontFamily: 'monospace', color: accent }}>{value}</div>
  </div>
);

function buttonStyle(border = 'rgba(255,255,255,0.1)', background = 'rgba(255,255,255,0.05)', color = 'var(--sw-text)') {
  return {
    padding: '6px 12px',
    borderRadius: 8,
    border: `1px solid ${border}`,
    background,
    color,
    fontSize: 11,
    fontWeight: 700,
    cursor: 'pointer',
  } as const;
}
