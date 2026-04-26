import React, { useState } from 'react';
import type { NeuralNetworkStepDebuggerVisualCopy } from '../../../types/slide';
import type { SampleSnapshot } from '../../../utils/neuralTrainingEngine';
import { sw } from '../../../theme/tokens';
import { PLACEHOLDER_VALUE, POSITIVE_VALUE_COLOR, NEGATIVE_VALUE_COLOR, BIAS_ACCENT_COLOR, BIAS_TEXT_COLOR } from './constants';
import { fmt, getNodeYs } from './utils';

type HoveredWeight =
  | { kind: 'w1'; inputIndex: number; hiddenIndex: number }
  | { kind: 'w2'; hiddenIndex: number }
  | null;

type Phase = 'init' | 'forward' | 'backprop' | 'update' | 'finalize';

interface Props {
  snap: SampleSnapshot | null;
  copy: NeuralNetworkStepDebuggerVisualCopy;
  activePhase: Phase;
  onHover: (text: string | null) => void;
}

export const NetworkGraph: React.FC<Props> = ({ snap, copy, activePhase, onHover }) => {
  const [hoveredWeight, setHoveredWeight] = useState<HoveredWeight>(null);
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
  const weights = snap ? snap.weightsAfter : copy.initialWeights;
  const edgeColorInput = isBackprop ? sw.pink : sw.sky;
  const edgeColorOutput = isBackprop ? sw.pink : '#66b84a';

  return (
    <svg viewBox="0 0 400 320" width="100%" height="100%" style={{ display: 'block' }}>
      <defs>
        <marker id="nn-ah-fwd" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto">
          <path d="M 0 0 L 10 5 L 0 10 z" fill={sw.sky} />
        </marker>
        <marker id="nn-ah-bwd" viewBox="0 0 10 10" refX="1" refY="5" markerWidth="3.5" markerHeight="3.5" orient="auto">
          <path d="M 10 0 L 0 5 L 10 10 z" fill={sw.pink} />
        </marker>
        <style>{`
          @keyframes nn-flow-forward { from { stroke-dashoffset: 20 } to { stroke-dashoffset: 0 } }
          @keyframes nn-flow-backward { from { stroke-dashoffset: 0 } to { stroke-dashoffset: 20 } }
          @keyframes nn-pulse { 0% { stroke-opacity: 0.45; } 50% { stroke-opacity: 1; stroke-width: 3.5; } 100% { stroke-opacity: 0.45; } }
          .nn-hoverable { cursor: help; pointer-events: all; }
        `}</style>
      </defs>

      <text x={inputX} y="34" textAnchor="middle" fontSize="7" fontWeight="900" fill={isForward ? sw.cyan : 'var(--sw-text-dim)'}>
        {copy.labels.inputLayer}
      </text>
      <text x={hiddenX} y="34" textAnchor="middle" fontSize="7" fontWeight="900" fill={isForward || isBackprop ? sw.sky : 'var(--sw-text-dim)'}>
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
          <circle cx={inputX} cy={inputY} r={inputRadius} fill="rgba(0,229,255,0.08)" stroke={sw.cyan} strokeWidth={isForward ? 1.5 : 0.8} />
          <text x={inputX} y={inputY + 1} textAnchor="middle" fontSize="8.8" fontWeight="900" fill={sw.cyan}>
            x{inputIndex + 1}
          </text>
          <text x={inputX} y={inputY + 12} textAnchor="middle" fontSize="6.2" fill="var(--sw-text-dim)">
            {snap ? fmt(snap.sample.inputs[inputIndex], 2) : PLACEHOLDER_VALUE}
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
            stroke={isBackprop ? sw.pink : sw.sky}
            strokeWidth={isForward || isBackprop ? 1.5 : 0.8}
          />
          <text x={hiddenX} y={hiddenY - 8} textAnchor="middle" fontSize="11" fontWeight="900" fill={isBackprop ? sw.pink : sw.sky}>
            h{hiddenIndex + 1}
          </text>
          <text x={hiddenX} y={hiddenY + 4} textAnchor="middle" fontSize="8.3" fontWeight="700" fill="var(--sw-text)">
            {!snap ? PLACEHOLDER_VALUE : fmt(snap.forward.hiddenActivations[hiddenIndex])}
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
          stroke={isBackprop ? sw.pink : '#66b84a'}
          strokeWidth={isForward || isBackprop ? 2 : 1}
        />
        <text x={outputX} y={outputY - 10} textAnchor="middle" fontSize="11.5" fontWeight="900" fill={isBackprop ? sw.pink : '#66b84a'}>
          y_hat
        </text>
        <text x={outputX} y={outputY + 4} textAnchor="middle" fontSize="9" fontWeight="700" fill={snap && snap.forward.outputActivation >= 0.5 ? '#22c55e' : '#f97316'}>
          {!snap ? PLACEHOLDER_VALUE : fmt(snap.forward.outputActivation)}
        </text>
        <text x={outputX} y={outputY + 14} textAnchor="middle" fontSize="6.1" fill="var(--sw-text-dim)">
          {!snap ? 'z_out=—' : `z_out=${fmt(snap.forward.outputZ)}`}
        </text>
        <text x={outputX} y={outputY + 23} textAnchor="middle" fontSize="6.1" fontWeight="700" fill={BIAS_TEXT_COLOR}>
          {`b2=${fmt(weights.outputBias, 2)}`}
        </text>
      </g>

      <g transform="translate(10, 284)">
        <rect width="108" height="12" rx="4" fill="rgba(0,0,0,0.3)" />
        <text x="5" y="9" fontSize="7" fontWeight="900" letterSpacing=".05em" fill={isForward ? sw.cyan : isBackprop ? sw.pink : '#a78bfa'}>
          {activePhase.toUpperCase()} {isForward ? 'PASS' : isBackprop ? 'PROP' : 'WEIGHTS'}
        </text>
      </g>

      <g transform="translate(110, 240)">
        <rect width="176" height="68" rx="10" fill="rgba(7,10,18,0.80)" stroke="rgba(56,189,248,0.22)" strokeWidth="0.9" />
        <line x1="44" y1="16" x2="164" y2="16" stroke={sw.borderMedium} strokeWidth="0.8" />
        <line x1="44" y1="16" x2="44" y2="60" stroke={sw.borderMedium} strokeWidth="0.8" />
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

        <line x1="10" y1="60" x2="164" y2="60" stroke={sw.borderMedium} strokeWidth="0.8" />
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
        <line x1="10" y1="16" x2="68" y2="16" stroke={sw.borderMedium} strokeWidth="0.8" />
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

        <line x1="10" y1="60" x2="68" y2="60" stroke={sw.borderMedium} strokeWidth="0.8" />
        <text x="14" y="57.5" fontSize="6.1" fontWeight="900" fill={BIAS_ACCENT_COLOR}>b2</text>
        <text x="48" y="57.5" textAnchor="middle" fontSize="6.1" fontWeight="900" fill={weights.outputBias >= 0 ? BIAS_TEXT_COLOR : NEGATIVE_VALUE_COLOR}>
          {fmt(weights.outputBias, 2)}
        </text>
      </g>

      <text x="388" y="222" textAnchor="end" fontSize="7" fill="var(--sw-text-dim)">
        {snap ? `target=${fmt(snap.sample.target, 1)}` : ''}
      </text>
    </svg>
  );
};
