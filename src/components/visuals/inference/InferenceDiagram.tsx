import React from 'react';
import type { InferenceDiagramCopy } from '../../../types/slide';

interface InferenceDiagramProps {
  copy: InferenceDiagramCopy;
}

interface MultiLineTextProps {
  x: number;
  y: number;
  lines: string[];
  size?: number;
  weight?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  italic?: boolean;
  lineHeight?: number;
  family?: string;
}

interface PanelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  rx?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  filter?: string;
}

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  width?: number;
  headSize?: number;
  headWidth?: number;
}

const fontFamily = "'Space Grotesk', 'Inter', 'Segoe UI', Arial, sans-serif";

const MultiLineText: React.FC<MultiLineTextProps> = ({
  x,
  y,
  lines,
  size = 14,
  weight = 600,
  fill = '#f8fafc',
  anchor = 'start',
  italic = false,
  lineHeight = 18,
  family = fontFamily,
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontFamily={family}
    fontSize={size}
    fontWeight={weight}
    fontStyle={italic ? 'italic' : 'normal'}
    fill={fill}
  >
    {lines.map((line, index) => (
      <tspan key={`${line}-${index}`} x={x} dy={index === 0 ? 0 : lineHeight}>
        {line}
      </tspan>
    ))}
  </text>
);

const buildArrowWings = (x: number, y: number, dx: number, dy: number, headSize: number, headWidth: number) => {
  const angle = Math.atan2(dy, dx);
  const ux = Math.cos(angle);
  const uy = Math.sin(angle);
  const px = -uy;
  const py = ux;
  const baseX = x - ux * headSize;
  const baseY = y - uy * headSize;
  const leftX = baseX + px * (headWidth / 2);
  const leftY = baseY + py * (headWidth / 2);
  const rightX = baseX - px * (headWidth / 2);
  const rightY = baseY - py * (headWidth / 2);
  return {
    left: { x: leftX, y: leftY },
    right: { x: rightX, y: rightY },
  };
};

const Panel: React.FC<PanelProps> = ({
  x,
  y,
  width,
  height,
  rx = 18,
  fill = 'url(#inference-card-fill)',
  stroke = 'rgba(148, 163, 184, 0.2)',
  strokeWidth = 1,
  filter,
}) => (
  <rect
    x={x}
    y={y}
    width={width}
    height={height}
    rx={rx}
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    filter={filter}
  />
);

const Arrow: React.FC<ArrowProps> = ({
  x1,
  y1,
  x2,
  y2,
  stroke = '#94a3b8',
  width = 3.2,
  headSize = 7,
  headWidth = 6,
}) => (
  <g>
    <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={stroke} strokeWidth={width} strokeLinecap="round" />
    {(() => {
      const wings = buildArrowWings(x2, y2, x2 - x1, y2 - y1, headSize, headWidth);
      return (
        <>
          <line x1={x2} y1={y2} x2={wings.left.x} y2={wings.left.y} stroke={stroke} strokeWidth={width} strokeLinecap="round" />
          <line x1={x2} y1={y2} x2={wings.right.x} y2={wings.right.y} stroke={stroke} strokeWidth={width} strokeLinecap="round" />
        </>
      );
    })()}
  </g>
);

export const InferenceDiagram = React.memo(({ copy }: InferenceDiagramProps) => {
  const trainingLines = copy.trainingTitle.split('\n');
  const footerLines = copy.footerLabel.split('\n');
  const modelNodes = {
    input: [
      { x: 18, y: 28, fill: '#facc15', stroke: '#ca8a04' },
      { x: 18, y: 52, fill: '#facc15', stroke: '#ca8a04' },
      { x: 18, y: 76, fill: '#facc15', stroke: '#ca8a04' },
    ],
    hidden: [
      { x: 58, y: 16, fill: '#38bdf8', stroke: '#0284c7' },
      { x: 58, y: 40, fill: '#38bdf8', stroke: '#0284c7' },
      { x: 58, y: 64, fill: '#38bdf8', stroke: '#0284c7' },
      { x: 58, y: 88, fill: '#38bdf8', stroke: '#0284c7' },
    ],
    output: [
      { x: 98, y: 28, fill: '#facc15', stroke: '#ca8a04' },
      { x: 98, y: 52, fill: '#facc15', stroke: '#ca8a04' },
      { x: 98, y: 76, fill: '#facc15', stroke: '#ca8a04' },
    ],
  } as const;

  const modelEdges: Array<[number, number, number, number]> = [
    [26, 28, 50, 16],
    [26, 28, 50, 40],
    [26, 28, 50, 64],
    [26, 28, 50, 88],
    [26, 52, 50, 16],
    [26, 52, 50, 40],
    [26, 52, 50, 64],
    [26, 52, 50, 88],
    [26, 76, 50, 16],
    [26, 76, 50, 40],
    [26, 76, 50, 64],
    [26, 76, 50, 88],
    [66, 16, 90, 28],
    [66, 16, 90, 52],
    [66, 16, 90, 76],
    [66, 40, 90, 28],
    [66, 40, 90, 52],
    [66, 40, 90, 76],
    [66, 64, 90, 28],
    [66, 64, 90, 52],
    [66, 64, 90, 76],
    [66, 88, 90, 28],
    [66, 88, 90, 52],
    [66, 88, 90, 76],
  ];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 540 405"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="diagram-title diagram-desc"
      shapeRendering="geometricPrecision"
    >
      <title id="diagram-title">{copy.diagramTitle}</title>
      <desc id="diagram-desc">{copy.diagramDescription}</desc>
      <defs>
        <linearGradient id="inference-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="45%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="inference-card-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="inference-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8cb8e1" />
          <stop offset="100%" stopColor="#5d8fc0" />
        </linearGradient>
        <linearGradient id="inference-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffdc6d" />
          <stop offset="100%" stopColor="#f3b72c" />
        </linearGradient>
        <linearGradient id="inference-orange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffa15d" />
          <stop offset="100%" stopColor="#ef7327" />
        </linearGradient>
        <linearGradient id="inference-red" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ff6b72" />
          <stop offset="100%" stopColor="#e24545" />
        </linearGradient>
        <radialGradient id="inference-glow-pink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff2e97" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#ff2e97" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="inference-glow-cyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
        </radialGradient>
        <filter id="inference-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000000" floodOpacity="0.5" />
        </filter>
        <filter id="inference-soft-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#000000" floodOpacity="0.4" />
        </filter>
        <clipPath id="inference-card-clip">
          <rect x="0" y="0" width="540" height="405" rx="18" />
        </clipPath>
        <marker id="inference-loop-arrow" markerWidth="14" markerHeight="14" refX="10" refY="7" orient="auto">
          <path d="M0,2 L12,7 L0,12 z" fill="#94a3b8" />
        </marker>
      </defs>

      <g clipPath="url(#inference-card-clip)">
        <rect width="540" height="405" fill="url(#inference-bg)" />
        <path d="M0 0 H540" stroke="#334155" strokeWidth="1" opacity="0.45" />
        <path d="M0 0 V405" stroke="#334155" strokeWidth="1" opacity="0.35" />
        <path d="M0 404 H540" stroke="#334155" strokeWidth="1" opacity="0.7" />
        <path d="M539 0 V405" stroke="#334155" strokeWidth="1" opacity="0.4" />
        <ellipse cx="458" cy="60" rx="120" ry="78" fill="url(#inference-glow-pink)" />
        <ellipse cx="112" cy="338" rx="140" ry="92" fill="url(#inference-glow-cyan)" />
        <ellipse cx="402" cy="330" rx="118" ry="88" fill="rgba(255,255,255,0.20)" />

        <Panel x={12} y={76} width={160} height={129} filter="url(#inference-shadow)" />
        <Panel x={190} y={76} width={152} height={129} filter="url(#inference-shadow)" />
        <Panel x={364} y={76} width={164} height={129} filter="url(#inference-shadow)" />
        <Panel x={365} y={224} width={151} height={104} filter="url(#inference-shadow)" />

        <MultiLineText x={92} y={44} lines={trainingLines} size={22} weight={700} fill="#f8fafc" anchor="middle" lineHeight={22} />
        <MultiLineText x={266} y={52} lines={[copy.modelTitle]} size={22} weight={700} fill="#f8fafc" anchor="middle" />
        <MultiLineText x={446} y={52} lines={[copy.predictionsTitle]} size={22} weight={700} fill="#f8fafc" anchor="middle" />

        <Arrow x1={174} y1={140} x2={189} y2={140} stroke="#94a3b8" />
        <Arrow x1={342} y1={140} x2={364} y2={140} stroke="#94a3b8" />
        <Arrow x1={446} y1={205} x2={446} y2={223} stroke="#94a3b8" />

        <g transform="translate(25 96)">
          <rect x="0" y="0" width="78" height="82" rx="12" fill="#0f172a" stroke="#475569" />
          <rect x="0" y="0" width="78" height="16" rx="12" fill="#38bdf8" />
          <rect x="0" y="12" width="78" height="4" fill="#38bdf8" opacity="0.9" />
          <path d="M0 28 H78" stroke="#334155" strokeWidth="1.4" />
          <path d="M0 48 H78" stroke="#334155" strokeWidth="1.4" />
          <path d="M0 64 H78" stroke="#334155" strokeWidth="1.4" />
          <path d="M24 0 V82" stroke="#334155" strokeWidth="1.4" />
          <path d="M50 0 V82" stroke="#334155" strokeWidth="1.4" />
          <circle cx="14" cy="37" r="4.6" fill="#38bdf8" />
          <circle cx="34" cy="37" r="4.6" fill="#38bdf8" />
          <circle cx="14" cy="57" r="4.6" fill="#38bdf8" />
          <circle cx="34" cy="57" r="4.6" fill="#38bdf8" />
          <circle cx="14" cy="74" r="4.6" fill="#38bdf8" />
          <circle cx="34" cy="74" r="4.6" fill="#38bdf8" />

          <text x="116" y="23" textAnchor="middle" fontFamily={fontFamily} fontSize="12" fontWeight="700" fill="#94a3b8">
            {copy.featuresLabel}
          </text>
          <g filter="url(#inference-soft-shadow)">
            <rect x="92" y="34" width="48" height="18" rx="9" fill="#1e293b" stroke="#eab308" />
            <rect x="92" y="57" width="48" height="18" rx="9" fill="#1e293b" stroke="#eab308" />
          </g>
          <path d="M103 43 L108 48 L117 39" stroke="#facc15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M103 66 L108 71 L117 62" stroke="#facc15" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        <g transform="translate(202 92)">
          <ellipse cx="58" cy="42" rx="44" ry="31" fill="#1e293b" opacity="0.8" />
          {modelEdges.map(([x1, y1, x2, y2], index) => (
            <line
              key={`edge-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#475569"
              strokeWidth="1.6"
              strokeOpacity={0.7}
            />
          ))}
          {modelNodes.input.map((node, index) => (
            <g key={`input-${index}`}>
              <circle cx={node.x} cy={node.y} r="9.4" fill={node.fill} stroke={node.stroke} strokeWidth="2" />
              <circle cx={node.x - 2} cy={node.y - 2} r="2.8" fill="rgba(255,255,255,0.7)" />
            </g>
          ))}
          {modelNodes.hidden.map((node, index) => (
            <g key={`hidden-${index}`}>
              <circle cx={node.x} cy={node.y} r="9.8" fill={node.fill} stroke={node.stroke} strokeWidth="2" />
              <circle cx={node.x - 2} cy={node.y - 2} r="3" fill="rgba(255,255,255,0.72)" />
            </g>
          ))}
          {modelNodes.output.map((node, index) => (
            <g key={`output-${index}`}>
              <circle cx={node.x} cy={node.y} r="9.4" fill={node.fill} stroke={node.stroke} strokeWidth="2" />
              <circle cx={node.x - 2} cy={node.y - 2} r="2.8" fill="rgba(255,255,255,0.7)" />
            </g>
          ))}
        </g>

        <g transform="translate(378 98)">
          <path d="M10 83 V6" stroke="#475569" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M10 83 H126" stroke="#475569" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M20 23 H112" stroke="#334155" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M20 43 H112" stroke="#334155" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M20 63 H112" stroke="#334155" strokeWidth="1" strokeDasharray="3 4" />
          <rect x="24" y="50" width="14" height="33" rx="2" fill="url(#inference-gold)" />
          <rect x="44" y="32" width="14" height="51" rx="2" fill="url(#inference-blue)" />
          <rect x="64" y="18" width="14" height="65" rx="2" fill="url(#inference-orange)" />
          <rect x="84" y="58" width="14" height="25" rx="2" fill="url(#inference-gold)" />
          <circle cx="111" cy="22" r="14" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
          <text x="111" y="28" fontFamily={fontFamily} fontSize="18" fontWeight="700" fill="#f8fafc" textAnchor="middle">
            ?
          </text>
        </g>

        <g transform="translate(380 236)">
          <path d="M12 80 V6" stroke="#475569" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M12 80 H116" stroke="#475569" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M18 24 C 30 18, 36 28, 42 44 C 48 61, 58 70, 72 58 C 86 46, 96 27, 110 34" stroke="#818cf8" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M65 46 L84 27" stroke="#f43f5e" strokeWidth="4.2" strokeLinecap="round" />
          <path d="M65 27 L84 46" stroke="#f43f5e" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="106" cy="55" r="18" fill="none" stroke="#f43f5e" strokeWidth="3" />
          <circle cx="106" cy="55" r="10" fill="none" stroke="#f43f5e" strokeWidth="3" />
          <line x1="106" y1="35" x2="106" y2="75" stroke="#f43f5e" strokeWidth="3" />
          <line x1="86" y1="55" x2="126" y2="55" stroke="#f43f5e" strokeWidth="3" />
          <text x="124" y="16" textAnchor="end" fontFamily={fontFamily} fontSize="14" fontWeight="700" fill="#f8fafc">
            {copy.lossLabel}
          </text>
        </g>

        <path
          d="M 365 276 C 315 310, 266 270, 266 205"
          fill="none"
          stroke="rgba(56,189,248,0.25)"
          strokeWidth="7.6"
        />
        <path
          d="M 365 276 C 315 310, 266 270, 266 205"
          fill="none"
          stroke="#94a3b8"
          strokeWidth="3.6"
          markerEnd="url(#inference-loop-arrow)"
        />
        <g filter="url(#inference-soft-shadow)">
          <rect x="189" y="257" width="220" height="26" rx="13" fill="#1e293b" stroke="#475569" />
        </g>
        <text x="299" y="275" textAnchor="middle" fontFamily={fontFamily} fontSize="15" fontWeight="700" fontStyle="italic" fill="#cbd5e1">
          {copy.updateLabel}
        </text>

        <g transform="translate(50 377)">
          <MultiLineText x={220} y={0} lines={footerLines} size={17} weight={700} fill="#f8fafc" anchor="middle" italic lineHeight={0} />
        </g>
      </g>
    </svg>
  );
});

