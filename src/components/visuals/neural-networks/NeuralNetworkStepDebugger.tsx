import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { NeuralNetworkStepDebuggerVisualCopy } from '../../../types/slide';
import {
  createTrainingDebugger,
  evaluateDataset,
  type NetworkWeights,
  type SampleSnapshot,
  type TrainingDebuggerState,
} from '../../../utils/neuralTrainingEngine';
import { useLocale } from '../../../context/LocaleContext';
import { resolveSnippetSource } from '../../../content/registry';
import { PanelCard } from '../PanelCard';
import { CodeBlock } from '../../CodeBlock';

interface Props {
  copy: NeuralNetworkStepDebuggerVisualCopy;
}

type Phase = 'init' | 'forward' | 'backprop' | 'update' | 'finalize';
type Speed = 'sample' | 'epoch' | 'fast';

const SPEED_SETTINGS: Record<Speed, { delayMs: number; batchSize: number }> = {
  sample: { delayMs: 400, batchSize: 1 },
  epoch: { delayMs: 100, batchSize: 10 },
  fast: { delayMs: 16, batchSize: 100 },
};

const fmt = (value: number, digits = 4) => value.toFixed(digits);
const POSITIVE_VALUE_COLOR = '#a5f3fc';
const NEGATIVE_VALUE_COLOR = '#fda4af';
const BIAS_ACCENT_COLOR = '#fbbf24';
const BIAS_TEXT_COLOR = '#fde68a';
const PLACEHOLDER_VALUE = '—';

function metricRowTitle(label: string, value: string) {
  const explanations: Record<string, string> = {
    z1: 'Pre-ativacao do neuronio oculto h1.',
    z2: 'Pre-ativacao do neuronio oculto h2.',
    z3: 'Pre-ativacao do neuronio oculto h3.',
    h1: 'Ativacao sigmoid do neuronio oculto h1.',
    h2: 'Ativacao sigmoid do neuronio oculto h2.',
    h3: 'Ativacao sigmoid do neuronio oculto h3.',
    z_out: 'Soma ponderada antes da sigmoid final.',
    y_hat: 'Probabilidade prevista pela rede.',
    alvo: 'Classe correta da amostra atual.',
    target: 'Correct class for the current sample.',
    erro_out: 'Erro bruto entre previsao e alvo.',
    output_error: 'Raw difference between prediction and target.',
    loss: 'Erro quadratico da amostra atual.',
    delta_out: 'Gradiente local do neuronio de saida.',
    'delta_h[0]': 'Gradiente local do neuronio oculto h1.',
    'delta_h[1]': 'Gradiente local do neuronio oculto h2.',
    'delta_h[2]': 'Gradiente local do neuronio oculto h3.',
  };

  const explanation = explanations[label] ?? 'Valor calculado no passo atual.';
  return `${label}: ${value}\n${explanation}`;
}

function getNodeYs(count: number, top: number, bottom: number): number[] {
  if (count === 1) {
    return [(top + bottom) / 2];
  }

  const step = (bottom - top) / (count - 1);
  return Array.from({ length: count }, (_, index) => top + step * index);
}

type HoveredWeight =
  | { kind: 'w1'; inputIndex: number; hiddenIndex: number }
  | { kind: 'w2'; hiddenIndex: number }
  | null;

const NetworkGraph: React.FC<{
  snap: SampleSnapshot;
  copy: NeuralNetworkStepDebuggerVisualCopy;
  activePhase: Phase;
  onHover: (text: string | null) => void;
}> = ({ snap, copy, activePhase, onHover }) => {
  const [hoveredWeight, setHoveredWeight] = useState<HoveredWeight>(null);
  const isInit = activePhase === 'init';
  const isForward = activePhase === 'forward';
  const isBackprop = activePhase === 'backprop';
  const isUpdate = activePhase === 'update';
  const inputX = 42;
  const hiddenX = 204;
  const outputX = 338;
  const inputRadius = 18;
  const hiddenRadius = isBackprop ? 26 : 24;
  const outputRadius = isBackprop ? 32 : 30;

  const inputYs = getNodeYs(copy.architecture.inputSize, 66, 228);
  const hiddenYs = getNodeYs(copy.architecture.hiddenSize, 82, 210);
  const outputY = 144;
  const weights = snap.weightsAfter;
  const edgeColorInput = isBackprop ? '#ff2e97' : '#38bdf8';
  const edgeColorOutput = isBackprop ? '#ff2e97' : '#66b84a';

  return (
    <svg viewBox="0 0 400 320" width="100%" height="100%" style={{ display: 'block' }}>
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

      <text x={inputX} y="34" textAnchor="middle" fontSize="7" fontWeight="900" fill={isForward ? '#00e5ff' : 'var(--sw-text-dim)'}>
        {copy.labels.inputLayer}
      </text>
      <text x={hiddenX} y="34" textAnchor="middle" fontSize="7" fontWeight="900" fill={isForward || isBackprop ? '#38bdf8' : 'var(--sw-text-dim)'}>
        {copy.labels.hiddenLayer}
      </text>
      <text x={outputX} y="34" textAnchor="middle" fontSize="7" fontWeight="900" fill={isForward || isBackprop ? '#66b84a' : 'var(--sw-text-dim)'}>
        {copy.labels.outputLayer}
      </text>

      {inputYs.flatMap((inputY, inputIndex) =>
        hiddenYs.map((hiddenY, hiddenIndex) => {
          const weight = weights.inputToHidden[hiddenIndex][inputIndex];
          return (
            <g
              key={`input-hidden-${inputIndex}-${hiddenIndex}`}
              className="nn-hoverable"
              onMouseEnter={() => {
                onHover(copy.tooltips.weight);
                setHoveredWeight({ kind: 'w1', inputIndex, hiddenIndex });
              }}
              onMouseLeave={() => {
                onHover(null);
                setHoveredWeight(null);
              }}
            >
              <path
                d={`M${inputX + inputRadius + 4} ${inputY} C122 ${inputY},146 ${hiddenY},${hiddenX - hiddenRadius - 6} ${hiddenY}`}
                fill="none"
                stroke={hoveredWeight?.kind === 'w1' && hoveredWeight.inputIndex === inputIndex && hoveredWeight.hiddenIndex === hiddenIndex ? '#7dd3fc' : edgeColorInput}
                strokeWidth={
                  hoveredWeight?.kind === 'w1' && hoveredWeight.inputIndex === inputIndex && hoveredWeight.hiddenIndex === hiddenIndex
                    ? Math.max(2, Math.min(4.4, Math.abs(weight) * 7))
                    : Math.max(0.7, Math.min(3.2, Math.abs(weight) * 6))
                }
                strokeDasharray="4 4"
                opacity={
                  hoveredWeight && !(hoveredWeight.kind === 'w1' && hoveredWeight.inputIndex === inputIndex && hoveredWeight.hiddenIndex === hiddenIndex)
                    ? 0.18
                    : isUpdate
                      ? 1
                      : 0.45
                }
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
            onMouseEnter={() => {
              onHover(copy.tooltips.weight);
              setHoveredWeight({ kind: 'w2', hiddenIndex });
            }}
            onMouseLeave={() => {
              onHover(null);
              setHoveredWeight(null);
            }}
          >
            <path
              d={`M${hiddenX + hiddenRadius + 4} ${hiddenY} C266 ${hiddenY},286 ${outputY},${outputX - outputRadius - 4} ${outputY}`}
              fill="none"
              stroke={hoveredWeight?.kind === 'w2' && hoveredWeight.hiddenIndex === hiddenIndex ? '#bbf7d0' : edgeColorOutput}
              strokeWidth={
                hoveredWeight?.kind === 'w2' && hoveredWeight.hiddenIndex === hiddenIndex
                  ? Math.max(2.2, Math.min(4.6, Math.abs(weight) * 6))
                  : Math.max(0.8, Math.min(3.5, Math.abs(weight) * 5))
              }
              strokeDasharray="4 4"
              opacity={
                hoveredWeight && !(hoveredWeight.kind === 'w2' && hoveredWeight.hiddenIndex === hiddenIndex)
                  ? 0.18
                  : isUpdate
                    ? 1
                    : 0.45
              }
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
          <circle cx={inputX} cy={inputY} r={inputRadius} fill="rgba(0,229,255,0.08)" stroke="#00e5ff" strokeWidth={isForward ? 1.5 : 0.8} />
          <text x={inputX} y={inputY + 1} textAnchor="middle" fontSize="8.8" fontWeight="900" fill="#00e5ff">
            x{inputIndex + 1}
          </text>
          <text x={inputX} y={inputY + 12} textAnchor="middle" fontSize="6.2" fill="var(--sw-text-dim)">
            {fmt(snap.sample.inputs[inputIndex], 2)}
          </text>
          <text x={inputX} y={inputY + inputRadius + 6} textAnchor="middle" fontSize="6.1" fontWeight="600" fill="var(--sw-text-dim)">
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
            cx={hiddenX}
            cy={hiddenY}
            r={hiddenRadius}
            fill="rgba(56,189,248,0.08)"
            stroke={isBackprop ? '#ff2e97' : '#38bdf8'}
            strokeWidth={isForward || isBackprop ? 1.5 : 0.8}
          />
          <text x={hiddenX} y={hiddenY - 8} textAnchor="middle" fontSize="11" fontWeight="900" fill={isBackprop ? '#ff2e97' : '#38bdf8'}>
            h{hiddenIndex + 1}
          </text>
          <text x={hiddenX} y={hiddenY + 4} textAnchor="middle" fontSize="8.3" fontWeight="700" fill="var(--sw-text)">
            {isInit ? PLACEHOLDER_VALUE : fmt(snap.forward.hiddenActivations[hiddenIndex])}
          </text>
          <text x={hiddenX} y={hiddenY + 14} textAnchor="middle" fontSize="6.4" fontWeight="700" fill={BIAS_TEXT_COLOR}>
            {`b1=${fmt(weights.hiddenBiases[hiddenIndex], 2)}`}
          </text>
        </g>
      ))}

      <g className="nn-hoverable" opacity={isForward || isBackprop ? 1 : 0.6} onMouseEnter={() => onHover(copy.tooltips.output)} onMouseLeave={() => onHover(null)}>
        <circle
          cx={outputX}
          cy={outputY}
          r={outputRadius}
          fill="rgba(102,184,74,0.08)"
          stroke={isBackprop ? '#ff2e97' : '#66b84a'}
          strokeWidth={isForward || isBackprop ? 2 : 1}
        />
        <text x={outputX} y={outputY - 10} textAnchor="middle" fontSize="11.5" fontWeight="900" fill={isBackprop ? '#ff2e97' : '#66b84a'}>
          y_hat
        </text>
        <text x={outputX} y={outputY + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={snap.forward.outputActivation >= 0.5 ? '#22c55e' : '#f97316'}>
          {isInit ? PLACEHOLDER_VALUE : fmt(snap.forward.outputActivation)}
        </text>
        <text x={outputX} y={outputY + 14} textAnchor="middle" fontSize="6.1" fill="var(--sw-text-dim)">
          {isInit ? 'z_out=—' : `z_out=${fmt(snap.forward.outputZ)}`}
        </text>
        <text x={outputX} y={outputY + 23} textAnchor="middle" fontSize="6.1" fontWeight="700" fill={BIAS_TEXT_COLOR}>
          {`b2=${fmt(weights.outputBias, 2)}`}
        </text>
      </g>

      <g transform="translate(10, 284)">
        <rect width="108" height="12" rx="4" fill="rgba(0,0,0,0.3)" />
        <text x="5" y="9" fontSize="7" fontWeight="900" letterSpacing=".05em" fill={isForward ? '#00e5ff' : isBackprop ? '#ff2e97' : '#a78bfa'}>
          {activePhase.toUpperCase()} {isForward ? 'PASS' : isBackprop ? 'PROP' : 'WEIGHTS'}
        </text>
      </g>

      <g transform="translate(110, 240)">
        <rect width="176" height="68" rx="10" fill="rgba(7,10,18,0.80)" stroke="rgba(56,189,248,0.22)" strokeWidth="0.9" />
        <line x1="44" y1="16" x2="164" y2="16" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <line x1="44" y1="16" x2="44" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <text x="12" y="12" fontSize="7.2" fontWeight="900" fill="#7dd3fc">w1</text>
        <text x="28" y="12" fontSize="6.6" fontWeight="800" fill="var(--sw-text-muted)">/</text>
        <text x="34" y="12" fontSize="7.2" fontWeight="900" fill={BIAS_ACCENT_COLOR}>b1</text>
        <text x="74" y="12" textAnchor="middle" fontSize="6.3" fontWeight="800" fill="var(--sw-text-dim)">h1</text>
        <text x="108" y="12" textAnchor="middle" fontSize="6.3" fontWeight="800" fill="var(--sw-text-dim)">h2</text>
        <text x="142" y="12" textAnchor="middle" fontSize="6.3" fontWeight="800" fill="var(--sw-text-dim)">h3</text>

        {copy.featureNames.map((_, inputIndex) => (
          <g key={`w1-row-${inputIndex}`} transform={`translate(0, ${24 + inputIndex * 9})`}>
            <text x="14" y="0" fontSize="6.1" fontWeight="900" fill="var(--sw-text-dim)">{`x${inputIndex + 1}`}</text>
            {weights.inputToHidden.map((row, hiddenIndex) => (
              <g key={`w1-${inputIndex}-${hiddenIndex}`} transform={`translate(${74 + hiddenIndex * 34}, -4)`}>
                {hoveredWeight?.kind === 'w1' && hoveredWeight.inputIndex === inputIndex && hoveredWeight.hiddenIndex === hiddenIndex ? (
                  <rect x="-12.5" y="-4.8" width="25" height="9.6" rx="3" fill="rgba(56,189,248,0.18)" stroke="rgba(125,211,252,0.85)" strokeWidth="0.8" />
                ) : null}
                <text
                  y="3"
                  textAnchor="middle"
                  fontSize="6.1"
                  fontWeight="900"
                  fill={
                    hoveredWeight?.kind === 'w1' && hoveredWeight.inputIndex === inputIndex && hoveredWeight.hiddenIndex === hiddenIndex
                      ? '#e0f2fe'
                      : row[inputIndex] >= 0
                        ? POSITIVE_VALUE_COLOR
                        : NEGATIVE_VALUE_COLOR
                  }
                >
                  {fmt(row[inputIndex], 2)}
                </text>
              </g>
            ))}
          </g>
        ))}

        <line x1="10" y1="60" x2="164" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <text x="14" y="57.5" fontSize="6.1" fontWeight="900" fill={BIAS_ACCENT_COLOR}>b1</text>
        {weights.hiddenBiases.map((bias, index) => (
          <text
            key={`b1-${index}`}
            x={74 + index * 34}
            y="57.5"
            textAnchor="middle"
            fontSize="6.1"
            fontWeight="900"
            fill={bias >= 0 ? BIAS_TEXT_COLOR : NEGATIVE_VALUE_COLOR}
          >
            {fmt(bias, 2)}
          </text>
        ))}
      </g>

      <g transform="translate(296, 240)">
        <rect width="78" height="68" rx="10" fill="rgba(7,10,18,0.80)" stroke="rgba(102,184,74,0.22)" strokeWidth="0.9" />
        <line x1="10" y1="16" x2="68" y2="16" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <text x="12" y="12" fontSize="7.2" fontWeight="900" fill="#86efac">w2</text>
        <text x="28" y="12" fontSize="6.6" fontWeight="800" fill="var(--sw-text-muted)">/</text>
        <text x="34" y="12" fontSize="7.2" fontWeight="900" fill={BIAS_ACCENT_COLOR}>b2</text>

        {weights.hiddenToOutput.map((weight, index) => (
          <g key={`w2-${index}`} transform={`translate(0, ${28 + index * 11})`}>
            <text x="14" y="0" fontSize="6.1" fontWeight="900" fill="var(--sw-text-dim)">{`h${index + 1}`}</text>
            <g transform="translate(48, -4)">
              {hoveredWeight?.kind === 'w2' && hoveredWeight.hiddenIndex === index ? (
                <rect x="-12.5" y="-4.8" width="25" height="9.6" rx="3" fill="rgba(102,184,74,0.18)" stroke="rgba(187,247,208,0.85)" strokeWidth="0.8" />
              ) : null}
              <text
                y="3"
                textAnchor="middle"
                fontSize="6.1"
                fontWeight="900"
                fill={
                  hoveredWeight?.kind === 'w2' && hoveredWeight.hiddenIndex === index
                    ? '#ecfccb'
                    : weight >= 0
                      ? POSITIVE_VALUE_COLOR
                      : NEGATIVE_VALUE_COLOR
                }
              >
                {fmt(weight, 2)}
              </text>
            </g>
          </g>
        ))}

        <line x1="10" y1="60" x2="68" y2="60" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
        <text x="14" y="57.5" fontSize="6.1" fontWeight="900" fill={BIAS_ACCENT_COLOR}>b2</text>
        <text x="48" y="57.5" textAnchor="middle" fontSize="6.1" fontWeight="900" fill={weights.outputBias >= 0 ? BIAS_TEXT_COLOR : NEGATIVE_VALUE_COLOR}>
          {fmt(weights.outputBias, 2)}
        </text>
      </g>

      <text x="388" y="222" textAnchor="end" fontSize="7" fill="var(--sw-text-dim)">
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
          title={metricRowTitle(row.label, row.value)}
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
              fontSize: 9.5,
              lineHeight: 1.15,
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
              fontSize: 12.5,
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
  const { language } = useLocale();
  const isInit = activePhase === 'init';
  const forwardRows = [
    ...snap.forward.hiddenZs.map((value, index) => ({ label: `z${index + 1}`, value: isInit ? PLACEHOLDER_VALUE : fmt(value) })),
    ...snap.forward.hiddenActivations.map((value, index) => ({ label: `h${index + 1}`, value: isInit ? PLACEHOLDER_VALUE : fmt(value) })),
    { label: 'z_out', value: isInit ? PLACEHOLDER_VALUE : fmt(snap.forward.outputZ) },
    { label: 'y_hat', value: isInit ? PLACEHOLDER_VALUE : fmt(snap.forward.outputActivation) },
  ];
  const targetLabel = language === 'pt-br' ? 'alvo' : 'target';
  const outputErrorLabel = language === 'pt-br' ? 'erro_out' : 'output_error';
  const lossRows = [
    { label: targetLabel, value: fmt(snap.sample.target, 1) },
    { label: outputErrorLabel, value: isInit ? PLACEHOLDER_VALUE : fmt(snap.backward.outputError) },
    { label: 'loss', value: isInit ? PLACEHOLDER_VALUE : fmt(snap.forward.loss, 6) },
  ];
  const backpropRows = [
    { label: 'delta_out', value: isInit ? PLACEHOLDER_VALUE : fmt(snap.backward.outputDelta) },
    ...snap.backward.hiddenDeltas.map((value, index) => ({ label: `delta_h[${index}]`, value: isInit ? PLACEHOLDER_VALUE : fmt(value) })),
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        alignContent: 'start',
        gap: 10,
        padding: '4px 0',
      }}
    >
      <SectionCard title="Forward" color="#38bdf8" active={activePhase === 'forward'} columns={2} rows={forwardRows} />
      <SectionCard title="Loss" color="#f97316" active={activePhase === 'forward'} columns={2} rows={lossRows} />
      <SectionCard title="Backprop" color="#ff2e97" active={activePhase === 'backprop'} columns={2} rows={backpropRows} />
    </div>
  );
};

function evaluateAccuracy(weights: NetworkWeights, copy: NeuralNetworkStepDebuggerVisualCopy): number {
  return evaluateDataset(weights, copy.dataset).accuracy;
}

export const NeuralNetworkStepDebugger = React.memo(({ copy }: Props) => {
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

  const advanceSamples = useCallback((count: number) => {
    const engine = engineRef.current;
    if (!engine) {
      return null;
    }

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

  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    let cancelled = false;
    let lastTime = 0;
    const { delayMs, batchSize } = SPEED_SETTINGS[speed];

    const loop = (time: number) => {
      if (time - lastTime > delayMs) {
        lastTime = time;
        setPhase((currentPhase) => {
          if (currentPhase === 'init') {
            return 'forward';
          }
          if (currentPhase === 'forward') {
            return 'backprop';
          }
          if (currentPhase === 'backprop') {
            return 'update';
          }
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
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [advanceSamples, isPlaying, speed]);

  const handlePlayPause = () => {
    if (!engineState || engineState.done) {
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

    const nextState = advanceSamples(1);
    setPhase(nextState?.done ? 'finalize' : 'forward');
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
  const resolvedSnippet = useMemo(() => {
    if (!copy.pythonSource) {
      return null;
    }

    try {
      return resolveSnippetSource(copy.pythonSource, language);
    } catch (error) {
      console.error(`Failed to resolve neural network snippet "${copy.pythonSource.snippetId}"`, error);
      return null;
    }
  }, [copy.pythonSource, language]);
  const activeCodeRange = resolvedSnippet?.regions[phase] ?? copy.codeHighlightRanges?.[phase] ?? null;
  const activeCode = resolvedSnippet?.code ?? copy.pythonCode ?? '';

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
          <button type="button" onClick={handleStep} disabled={isPlaying || engineState.done} style={buttonStyle()}>
            {copy.labels.stepButton}
          </button>
          <button type="button" onClick={handlePlayPause} disabled={engineState.done} style={buttonStyle('#00e5ff66', isPlaying ? '#00e5ff33' : '#00e5ff15', '#00e5ff')}>
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
            {copy.labels.lossLabel}: {phase === 'init' ? PLACEHOLDER_VALUE : fmt(snap.forward.loss, 4)}
          </span>
        </div>

        <ComputationPanel snap={snap} activePhase={phase} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minHeight: 120 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 12, height: 1, background: 'currentColor', opacity: 0.3 }} />
            {copy.labels.codeTitle}
          </div>
          <CodeBlock
            code={activeCode}
            language="python"
            activeRange={activeCodeRange}
            compact
            sourceRef={copy.pythonSource}
          />
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
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: phase === 'init' ? '#94a3b8' : phase === 'forward' ? '#38bdf8' : phase === 'backprop' ? '#ff2e97' : phase === 'update' ? '#a78bfa' : '#22c55e' }} />
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
              {phase === 'init' ? PLACEHOLDER_VALUE : fmt(snap.forward.outputActivation)}
            </span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--sw-text)' }}>
                {copy.labels.finalClassLabel} {phase === 'init' ? PLACEHOLDER_VALUE : snap.forward.outputActivation >= 0.5 ? '1' : '0'}
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
});

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
