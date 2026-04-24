import React from 'react';
import type { NeuronArchitectureAnimatedCopy } from '../../../types/slide';

interface Props {
  copy: NeuronArchitectureAnimatedCopy;
}

const styles = `
.nad-title {
  letter-spacing: 0.16em;
  font-weight: 800;
}

.nad-math {
  font-family: "Cambria Math", "STIX Two Math", "Times New Roman", serif;
  font-kerning: normal;
  letter-spacing: 0.01em;
}

.nad-glow-cyan {
  filter: drop-shadow(0 0 8px rgba(0,243,255,0.58)) drop-shadow(0 0 18px rgba(0,243,255,0.22));
}

.nad-glow-pink {
  filter: drop-shadow(0 0 8px rgba(255,0,127,0.54)) drop-shadow(0 0 18px rgba(255,0,127,0.2));
}

.nad-pulse-cyan {
  animation: nadPulseCyan 2.4s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

.nad-pulse-pink {
  animation: nadPulsePink 2.8s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

.nad-float {
  animation: nadFloat 4.8s ease-in-out infinite;
  transform-origin: center;
  transform-box: fill-box;
}

.nad-draw-1, .nad-draw-2, .nad-draw-3, .nad-draw-4, .nad-draw-5 {
  stroke-dasharray: 430;
  stroke-dashoffset: 430;
  animation: nadDrawLine 1.25s ease forwards, nadDashFlow 7s linear infinite 1.25s;
}

.nad-draw-2 { animation-delay: 0.15s, 1.4s; }
.nad-draw-3 { animation-delay: 0.3s, 1.55s; }
.nad-draw-4 { animation-delay: 0.45s, 1.7s; }
.nad-draw-5 { animation-delay: 0.6s, 1.85s; }

.nad-fade {
  opacity: 0;
  animation: nadFadeIn 0.9s ease forwards;
}

.nad-d1 { animation-delay: 0.7s; }
.nad-d2 { animation-delay: 1.0s; }
.nad-d3 { animation-delay: 1.25s; }

@keyframes nadDrawLine {
  to { stroke-dashoffset: 0; }
}

@keyframes nadDashFlow {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: -860; }
}

@keyframes nadPulseCyan {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.04); }
}

@keyframes nadPulsePink {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.06); }
}

@keyframes nadFloat {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-4px); }
}

@keyframes nadFadeIn {
  to { opacity: 1; }
}
`;

export const NeuronArchitectureAnimated = React.memo(({ copy }: Props) => {
  const [titleHead, ...titleTailParts] = copy.title.split(' ');
  const titleTail = titleTailParts.join(' ');

  const INPUT_X = 120;
  const CORE_X = 460;
  const OUTPUT_X = 758;
  const BIAS_X = 460;
  const TOP_Y = 184;
  const MIDDLE_Y = 286;
  const BOTTOM_Y = 388;
  const FORMULA_Y = 500;

  const TITLE_Y = 50;
  const SUBTITLE_Y = 74;
  const FLOW_STROKE = 3.2;
  const ARROW_MARKER = 9;
  const NODE_R = 31;

  const CORE_W = 332;
  const CORE_H = 164;
  const CORE_LEFT = CORE_X - CORE_W / 2;
  const CORE_RIGHT = CORE_X + CORE_W / 2;
  const CORE_TOP = MIDDLE_Y - CORE_H / 2;
  const CORE_BOTTOM = MIDDLE_Y + CORE_H / 2;
  const CORE_DIVIDER_X = CORE_X + 5;

  const INPUT_LABEL_Y = 112;
  const WEIGHTS_LABEL_Y = 112;
  const WEIGHT_TEXT_X = 232;
  const EXAMPLES_Y = 442;
  const CENTER_NOTE_Y = CORE_BOTTOM + 30;

  const BIAS_CIRCLE_Y = 122;
  const BIAS_ARROW_START_Y = 152;
  const BIAS_ARROW_END_Y = CORE_TOP - 12;
  const BIAS_NOTE_X = BIAS_X + 52;
  const BIAS_NOTE_Y = 174;

  const OUTPUT_ARROW_START_X = CORE_RIGHT + 2;
  const OUTPUT_ARROW_END_X = OUTPUT_X - NODE_R - 23;
  const OUTPUT_LABEL_X = (OUTPUT_ARROW_START_X + OUTPUT_ARROW_END_X) / 2;
  const OUTPUT_LABEL_Y = 236;

  const inputNodes = [
    { symbol: 'x₁', weight: 'w₁', y: TOP_Y, weightY: TOP_Y + 22, curveY: MIDDLE_Y - 66 },
    { symbol: 'x₂', weight: 'w₂', y: MIDDLE_Y, weightY: MIDDLE_Y + 2, curveY: MIDDLE_Y },
    { symbol: 'xₙ', weight: 'wₙ', y: BOTTOM_Y, weightY: BOTTOM_Y - 18, curveY: MIDDLE_Y + 66 },
  ] as const;

  return (
    <div style={{ width: '100%', height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ flex: '1 1 auto', minHeight: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg
          viewBox="0 0 900 560"
          width="100%"
          height="100%"
          preserveAspectRatio="xMidYMid meet"
          aria-label={copy.ariaLabel}
        >
          <style>{styles}</style>
          <defs>
            <linearGradient id="nadGlassGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff007f" stopOpacity="0.09" />
              <stop offset="100%" stopColor="#00f3ff" stopOpacity="0.13" />
            </linearGradient>

            <marker id="nadArrowCyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth={ARROW_MARKER} markerHeight={ARROW_MARKER} orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#00f3ff" />
            </marker>

            <marker id="nadArrowPink" viewBox="0 0 10 10" refX="8" refY="5" markerWidth={ARROW_MARKER} markerHeight={ARROW_MARKER} orient="auto">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#ff007f" />
            </marker>
          </defs>

          <rect x="16" y="16" width="868" height="528" rx="34" fill="rgba(10,14,26,0.56)" stroke="rgba(255,255,255,0.08)" />

          <text x="450" y={TITLE_Y} textAnchor="middle" className="nad-title" fill="#ffffff" fontSize="30">
            {titleHead}
            {titleTail ? (
              <>
                {' '}
                <tspan fill="#ff007f" className="nad-glow-pink">
                  {titleTail}
                </tspan>
              </>
            ) : null}
          </text>
          <text x="450" y={SUBTITLE_Y} textAnchor="middle" fill="#a7bbca" fontSize="13">
            {copy.subtitle}
          </text>

          <text x={INPUT_X - 56} y={INPUT_LABEL_Y} fill="#b5c7d5" fontSize="16">
            {copy.inputs}
          </text>
          <text x={WEIGHT_TEXT_X - 6} y={WEIGHTS_LABEL_Y} fill="#89dce5" fontSize="15">
            {copy.weights}
          </text>

          <g className="nad-fade nad-d1">
            {inputNodes.map((node, index) => (
              <g key={node.symbol}>
                <circle cx={INPUT_X} cy={node.y} r={NODE_R} fill="#140b28" stroke="#00f3ff" strokeWidth="2.3" className="nad-pulse-cyan nad-glow-cyan" />
                <text x={INPUT_X} y={node.y + 7} textAnchor="middle" fill="#eef6ff" fontSize="28" fontWeight="700" className="nad-math">
                  {node.symbol}
                </text>
                <path
                  d={`M ${INPUT_X + NODE_R + 8} ${node.y} C ${INPUT_X + 108} ${node.y}, ${INPUT_X + 126} ${node.curveY}, ${CORE_LEFT - 18} ${node.curveY}`}
                  stroke="#00f3ff"
                  strokeWidth={FLOW_STROKE}
                  fill="none"
                  markerEnd="url(#nadArrowCyan)"
                  className={`nad-draw-${index + 1} nad-glow-cyan`}
                />
                <text x={WEIGHT_TEXT_X} y={node.weightY} fill="#00f3ff" fontSize="17" fontWeight="700" className="nad-math nad-glow-cyan">
                  {node.weight}
                </text>
              </g>
            ))}
            <text x={INPUT_X - 60} y={EXAMPLES_Y} fill="#8fb3c1" fontSize="11.5">
              {copy.examples}
            </text>
          </g>

          <g className="nad-fade nad-d2">
            <path d={`M ${BIAS_X} ${BIAS_ARROW_START_Y} L ${BIAS_X} ${BIAS_ARROW_END_Y}`} stroke="#ff007f" strokeWidth={FLOW_STROKE} fill="none" markerEnd="url(#nadArrowPink)" className="nad-draw-4 nad-glow-pink" />
            <circle cx={BIAS_X} cy={BIAS_CIRCLE_Y} r="29" fill="#210c21" stroke="#ff007f" strokeWidth="2.3" className="nad-pulse-pink nad-glow-pink" />
            <text x={BIAS_X} y={BIAS_CIRCLE_Y + 9} textAnchor="middle" fill="#ffe7f3" fontSize="28" fontWeight="700" className="nad-math">
              b
            </text>
            <text x={BIAS_X + 38} y={BIAS_CIRCLE_Y + 4} fill="#ff9dcf" fontSize="15">
              {copy.bias}
            </text>
            <text x={BIAS_NOTE_X} y={BIAS_NOTE_Y} fill="#ffb6d9" fontSize="12.5">
              {copy.biasNote}
            </text>
          </g>

          <g className="nad-float">
            <rect x={CORE_LEFT} y={CORE_TOP} width={CORE_W} height={CORE_H} rx="82" fill="url(#nadGlassGrad)" stroke="#00f3ff" strokeWidth="2.2" className="nad-glow-cyan" />
            <line x1={CORE_DIVIDER_X} y1={CORE_TOP} x2={CORE_DIVIDER_X} y2={CORE_BOTTOM} stroke="#00f3ff" strokeWidth="1.4" strokeDasharray="6 8" opacity="0.5" />

            <text x={CORE_X - 80} y={MIDDLE_Y - 12} textAnchor="middle" fill="#00f3ff" fontSize="56" fontWeight="700" className="nad-math nad-glow-cyan">
              ∑
            </text>
            <text x={CORE_X - 80} y={MIDDLE_Y + 14} textAnchor="middle" fill="#b8d9f7" fontSize="15" fontWeight="700">
              {copy.weightedSum}
            </text>
            <text x={CORE_X - 80} y={MIDDLE_Y + 38} textAnchor="middle" fill="#d7e6f5" fontSize="18" className="nad-math">
              z = ∑(xᵢ · wᵢ) + b
            </text>

            <text x={CORE_X + 88} y={MIDDLE_Y - 14} textAnchor="middle" fill="#ff88c5" fontSize="40" fontWeight="700" className="nad-math nad-glow-pink">
              f(z)
            </text>
            <text x={CORE_X + 88} y={MIDDLE_Y + 14} textAnchor="middle" fill="#ffc3df" fontSize="15" fontWeight="700">
              {copy.activation}
            </text>
            <text x={CORE_X + 88} y={MIDDLE_Y + 38} textAnchor="middle" fill="#ffd8eb" fontSize="14" className="nad-math">
              ReLU, sigmoid, tanh
            </text>
          </g>

          <g className="nad-fade nad-d2">
            <path d={`M ${OUTPUT_ARROW_START_X} ${MIDDLE_Y - 2} C ${OUTPUT_ARROW_START_X + 22} ${MIDDLE_Y - 2}, ${OUTPUT_ARROW_END_X - 16} ${MIDDLE_Y - 2}, ${OUTPUT_ARROW_END_X} ${MIDDLE_Y - 2}`} stroke="#00f3ff" strokeWidth={FLOW_STROKE} fill="none" markerEnd="url(#nadArrowCyan)" className="nad-draw-5 nad-glow-cyan" />
            <circle cx={OUTPUT_X} cy={MIDDLE_Y - 2} r={NODE_R} fill="#140b28" stroke="#00f3ff" strokeWidth="2.3" className="nad-pulse-cyan nad-glow-cyan" />
            <text x={OUTPUT_X} y={MIDDLE_Y + 6} textAnchor="middle" fill="#eef6ff" fontSize="28" fontWeight="700" className="nad-math">
              y
            </text>
            <text x={OUTPUT_X} y={MIDDLE_Y + 38} textAnchor="middle" fill="#9beef5" fontSize="12.5">
              {copy.outputFinal}
            </text>
            <text x={OUTPUT_LABEL_X} y={OUTPUT_LABEL_Y} textAnchor="middle" fill="#9beef5" fontSize="11.5">
              {copy.outputAfterActivation.map((line, index) => (
                <tspan key={`${line}-${index}`} x={OUTPUT_LABEL_X} dy={index === 0 ? 0 : 11}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>

          <text x={CORE_LEFT} y={CENTER_NOTE_Y} fill="#bac8d8" fontSize="12.5" className="nad-fade nad-d3">
            {copy.centerNote}
          </text>

          <g className="nad-fade nad-d3">
            <rect x="198" y={FORMULA_Y - 32} width="504" height="56" rx="18" fill="rgba(17,16,35,0.94)" stroke="#00f3ff" strokeWidth="1.2" />
            <text x="450" y={FORMULA_Y + 3} textAnchor="middle" fill="#eef8ff" fontSize="28" className="nad-math nad-glow-cyan">
              y = <tspan fill="#ff9acb">f</tspan>(∑(xᵢ · wᵢ) + <tspan fill="#ff9acb">b</tspan>)
            </text>
          </g>
        </svg>
      </div>

      <div
        style={{
          padding: '10px 12px',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(12,16,29,0.72)',
        }}
      >
        <div
          style={{
            color: '#b5c7d5',
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            marginBottom: 9,
          }}
        >
          {copy.legendTitle}
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(132px, 1fr))',
            gap: 10,
          }}
        >
          {copy.legend.map((item) => (
            <div
              key={item.symbol}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 10px',
                borderRadius: 10,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                minWidth: 0,
                minHeight: 46,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  color: item.color,
                  fontFamily: '"Cambria Math", "STIX Two Math", "Times New Roman", serif',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  flex: '0 0 auto',
                }}
              >
                {item.symbol}
              </span>

              <div style={{ minWidth: 0 }}>
                <div style={{ color: '#eef6ff', fontSize: '0.74rem', fontWeight: 800, lineHeight: 1.1 }}>{item.title}</div>
                <div style={{ color: '#8fb3c1', fontSize: '0.66rem', lineHeight: 1.15 }}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
});
