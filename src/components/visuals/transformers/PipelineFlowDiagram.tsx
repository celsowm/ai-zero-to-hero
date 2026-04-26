import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';

interface PipelineStepCopy {
  step1Label: string;
  step1Desc: string;
  step2Label: string;
  step2Desc: string;
  step3Label: string;
  step3Desc: string;
  step4Label: string;
  step4Desc: string;
}

interface PipelineFlowDiagramProps {
  copy: PipelineStepCopy;
}

const STEPS = [
  { color: sw.cyan, glow: 'rgba(0, 229, 255, 0.12)', arrow: 'rgba(0, 229, 255, 0.4)' },
  { color: sw.purple, glow: 'rgba(168, 85, 247, 0.12)', arrow: 'rgba(168, 85, 247, 0.4)' },
  { color: sw.pink, glow: 'rgba(255, 46, 151, 0.12)', arrow: 'rgba(255, 46, 151, 0.4)' },
  { color: sw.green, glow: 'rgba(16, 185, 129, 0.12)', arrow: 'rgba(16, 185, 129, 0.4)' },
] as const;

// Realistic data flowing through the pipeline
const PIPELINE_DATA = [
  { input: '"The future"', output: '[1462, 2181, 50256]' },
  { input: '[1462, 2181]', output: 'p[" of"] = 0.34' },
  { input: 'p[" of"] = 0.34', output: 'token_id = 318' },
  { input: '[1462, 2181, 318]', output: '"The future of"' },
];

export const PipelineFlowDiagram = React.memo(({ copy }: PipelineFlowDiagramProps) => {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const boxW = 90;
  const boxH = 140;
  const gap = 10;
  const totalW = 4 * boxW + 3 * gap;
  const startX = (400 - totalW) / 2;
  const y = 32;

  const steps = [
    { label: copy.step1Label, desc: copy.step1Desc, data: PIPELINE_DATA[0] },
    { label: copy.step2Label, desc: copy.step2Desc, data: PIPELINE_DATA[1] },
    { label: copy.step3Label, desc: copy.step3Desc, data: PIPELINE_DATA[2] },
    { label: copy.step4Label, desc: copy.step4Desc, data: PIPELINE_DATA[3] },
  ];

  return (
    <svg
      viewBox="0 0 400 210"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label="Pipeline flow diagram with data"
    >
      {/* Title */}
      <text x="200" y="14" textAnchor="middle" fill={sw.text} fontSize="10" fontWeight="700" fontFamily={sw.fontMono}>
        pipeline("text-generation")
      </text>

      {/* Background track */}
      <line
        x1={startX}
        y1={y + boxH / 2}
        x2={startX + totalW}
        y2={y + boxH / 2}
        stroke={sw.borderSubtle}
        strokeWidth="1.5"
        strokeDasharray="3,3"
      />

      {steps.map((step, i) => {
        const x = startX + i * (boxW + gap);
        const s = STEPS[i];
        const isActive = activeStep === i;

        return (
          <g
            key={i}
            onMouseEnter={() => setActiveStep(i)}
            onMouseLeave={() => setActiveStep(null)}
            style={{ cursor: 'pointer' }}
          >
            {/* Arrow */}
            {i > 0 && (
              <g>
                <line
                  x1={x - gap}
                  y1={y + boxH / 2}
                  x2={x - 2}
                  y2={y + boxH / 2}
                  stroke={isActive ? s.color : sw.textDim}
                  strokeWidth={isActive ? 2 : 1}
                  opacity={isActive ? 1 : 0.3}
                />
                <polygon
                  points={`${x - 2},${y + boxH / 2 - 3} ${x + 2},${y + boxH / 2} ${x - 2},${y + boxH / 2 + 3}`}
                  fill={isActive ? s.color : sw.textDim}
                  opacity={isActive ? 1 : 0.3}
                />
              </g>
            )}

            {/* Box */}
            <rect
              x={x}
              y={y}
              width={boxW}
              height={boxH}
              rx="8"
              fill={isActive ? s.glow : 'rgba(255,255,255,0.01)'}
              stroke={isActive ? s.color : sw.borderSubtle}
              strokeWidth={isActive ? 1.5 : 0.5}
              style={{ transition: sw.transitionFast }}
            />

            {/* Number badge */}
            <circle cx={x + boxW / 2} cy={y + 12} r="7" fill={s.color} opacity={isActive ? 0.35 : 0.15} />
            <text x={x + boxW / 2} y={y + 15} textAnchor="middle" fill={s.color} fontSize="9" fontWeight="800">
              {i + 1}
            </text>

            {/* Label */}
            <text x={x + boxW / 2} y={y + 30} textAnchor="middle" fill={sw.text} fontSize="10" fontWeight="700" fontFamily={sw.fontMono}>
              {step.label}
            </text>

            {/* Divider */}
            <line x1={x + 5} y1={y + 38} x2={x + boxW - 5} y2={y + 38} stroke={sw.borderSubtle} strokeWidth="0.5" />

            {/* Input */}
            <text x={x + 5} y={y + 50} fill={sw.textMuted} fontSize="6" fontWeight="600" letterSpacing="0.06em">
              IN
            </text>
            <rect x={x + 4} y={y + 53} width={boxW - 8} height="20" rx="3" fill={sw.surface} stroke={sw.borderSubtle} strokeWidth="0.5" />
            <text x={x + boxW / 2} y={y + 66} textAnchor="middle" fill={sw.cyan} fontSize="6.5" fontFamily={sw.fontMono}>
              {step.data.input.length > 18 ? step.data.input.slice(0, 16) + '…' : step.data.input}
            </text>

            {/* Output */}
            <text x={x + 5} y={y + 86} fill={sw.textMuted} fontSize="6" fontWeight="600" letterSpacing="0.06em">
              OUT
            </text>
            <rect x={x + 4} y={y + 89} width={boxW - 8} height="20" rx="3" fill={sw.surface} stroke={sw.borderSubtle} strokeWidth="0.5" />
            <text x={x + boxW / 2} y={y + 102} textAnchor="middle" fill={s.color} fontSize="6.5" fontFamily={sw.fontMono}>
              {step.data.output.length > 18 ? step.data.output.slice(0, 16) + '…' : step.data.output}
            </text>

            {/* Bottom label */}
            <text x={x + boxW / 2} y={y + 128} textAnchor="middle" fill={sw.textDim} fontSize="6">
              {step.desc}
            </text>
          </g>
        );
      })}

      {/* Bottom note */}
      <text x="200" y={y + boxH + 18} textAnchor="middle" fill={sw.textMuted} fontSize="7" fontStyle="italic">
        Repetido N vezes até max_new_tokens
      </text>
    </svg>
  );
});
