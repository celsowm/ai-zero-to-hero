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

interface SoftConnectorProps {
  d: string;
  stroke?: string;
  width?: number;
  opacity?: number;
  headX?: number;
  headY?: number;
  headDx?: number;
  headDy?: number;
  headSize?: number;
  headWidth?: number;
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
  fill = '#233145',
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
  stroke = 'rgba(128, 144, 175, 0.35)',
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

const SoftConnector: React.FC<SoftConnectorProps> = ({
  d,
  stroke = '#76849d',
  width = 4,
  opacity = 1,
  headX,
  headY,
  headDx,
  headDy,
  headSize = 8,
  headWidth = 7,
}) => (
  <g>
    <path d={d} fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth={width + 4} strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
    <path d={d} fill="none" stroke={stroke} strokeWidth={width} strokeLinecap="round" strokeLinejoin="round" opacity={opacity} />
    {headX != null && headY != null && headDx != null && headDy != null ? (
      <>
        {(() => {
          const wings = buildArrowWings(headX, headY, headDx, headDy, headSize, headWidth);
          return (
            <>
              <line x1={headX} y1={headY} x2={wings.left.x} y2={wings.left.y} stroke={stroke} strokeWidth={width} strokeLinecap="round" opacity={opacity} />
              <line x1={headX} y1={headY} x2={wings.right.x} y2={wings.right.y} stroke={stroke} strokeWidth={width} strokeLinecap="round" opacity={opacity} />
            </>
          );
        })()}
      </>
    ) : null}
  </g>
);

const Arrow: React.FC<ArrowProps> = ({
  x1,
  y1,
  x2,
  y2,
  stroke = '#76849d',
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

export const InferenceDiagram: React.FC<InferenceDiagramProps> = ({ copy }) => {
  const trainingLines = copy.trainingTitle.split('\n');
  const footerLines = copy.footerLabel.split('\n');
  const modelNodes = {
    input: [
      { x: 18, y: 28, fill: '#f5c84c' },
      { x: 18, y: 52, fill: '#f5c84c' },
      { x: 18, y: 76, fill: '#f5c84c' },
    ],
    hidden: [
      { x: 58, y: 16, fill: '#8fb2d8' },
      { x: 58, y: 40, fill: '#8fb2d8' },
      { x: 58, y: 64, fill: '#8fb2d8' },
      { x: 58, y: 88, fill: '#8fb2d8' },
    ],
    output: [
      { x: 98, y: 28, fill: '#f5c84c' },
      { x: 98, y: 52, fill: '#f5c84c' },
      { x: 98, y: 76, fill: '#f5c84c' },
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
          <stop offset="0%" stopColor="#f8f9fd" />
          <stop offset="45%" stopColor="#eef2f8" />
          <stop offset="100%" stopColor="#e6ecf5" />
        </linearGradient>
        <linearGradient id="inference-card-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f2f5fa" />
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
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#0f1a2d" floodOpacity="0.14" />
        </filter>
        <filter id="inference-soft-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="3" stdDeviation="5" floodColor="#20304a" floodOpacity="0.10" />
        </filter>
        <clipPath id="inference-card-clip">
          <rect x="0" y="0" width="540" height="405" rx="18" />
        </clipPath>
      </defs>

      <g clipPath="url(#inference-card-clip)">
        <rect width="540" height="405" fill="url(#inference-bg)" />
        <path d="M0 0 H540" stroke="#dbe2ee" strokeWidth="1" opacity="0.45" />
        <path d="M0 0 V405" stroke="#dbe2ee" strokeWidth="1" opacity="0.35" />
        <path d="M0 404 H540" stroke="#cfd7e5" strokeWidth="1" opacity="0.7" />
        <path d="M539 0 V405" stroke="#d5ddea" strokeWidth="1" opacity="0.4" />
        <ellipse cx="458" cy="60" rx="120" ry="78" fill="url(#inference-glow-pink)" />
        <ellipse cx="112" cy="338" rx="140" ry="92" fill="url(#inference-glow-cyan)" />
        <ellipse cx="402" cy="330" rx="118" ry="88" fill="rgba(255,255,255,0.20)" />

        <Panel x={12} y={76} width={160} height={129} filter="url(#inference-shadow)" />
        <Panel x={190} y={76} width={152} height={129} filter="url(#inference-shadow)" />
        <Panel x={364} y={76} width={164} height={129} filter="url(#inference-shadow)" />
        <Panel x={365} y={224} width={151} height={104} filter="url(#inference-shadow)" />

        <MultiLineText x={92} y={44} lines={trainingLines} size={22} weight={700} fill="#233145" anchor="middle" lineHeight={22} />
        <MultiLineText x={266} y={52} lines={[copy.modelTitle]} size={22} weight={700} fill="#233145" anchor="middle" />
        <MultiLineText x={446} y={52} lines={[copy.predictionsTitle]} size={22} weight={700} fill="#233145" anchor="middle" />

        <Arrow x1={174} y1={140} x2={189} y2={140} />
        <Arrow x1={342} y1={140} x2={364} y2={140} />
        <Arrow x1={446} y1={205} x2={446} y2={223} />

        <g transform="translate(25 96)">
          <rect x="0" y="0" width="78" height="82" rx="12" fill="#eef4fb" stroke="#90a8c4" />
          <rect x="0" y="0" width="78" height="16" rx="12" fill="#8fb2d8" />
          <rect x="0" y="12" width="78" height="4" fill="#8fb2d8" opacity="0.9" />
          <path d="M0 28 H78" stroke="#9db0c8" strokeWidth="1.4" />
          <path d="M0 48 H78" stroke="#9db0c8" strokeWidth="1.4" />
          <path d="M0 64 H78" stroke="#9db0c8" strokeWidth="1.4" />
          <path d="M24 0 V82" stroke="#7d98b7" strokeWidth="1.4" />
          <path d="M50 0 V82" stroke="#7d98b7" strokeWidth="1.4" />
          <circle cx="14" cy="37" r="4.6" fill="#5f92c6" />
          <circle cx="34" cy="37" r="4.6" fill="#5f92c6" />
          <circle cx="14" cy="57" r="4.6" fill="#5f92c6" />
          <circle cx="34" cy="57" r="4.6" fill="#5f92c6" />
          <circle cx="14" cy="74" r="4.6" fill="#5f92c6" />
          <circle cx="34" cy="74" r="4.6" fill="#5f92c6" />

          <text x="92" y="23" fontFamily={fontFamily} fontSize="12" fontWeight="700" fill="#395069">
            {copy.featuresLabel}
          </text>
          <g filter="url(#inference-soft-shadow)">
            <rect x="92" y="34" width="48" height="18" rx="9" fill="#fff7dc" stroke="#f0bf35" />
            <rect x="92" y="57" width="48" height="18" rx="9" fill="#fff7dc" stroke="#f0bf35" />
          </g>
          <path d="M103 43 L108 48 L117 39" stroke="#efb72d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <path d="M103 66 L108 71 L117 62" stroke="#efb72d" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </g>

        <g transform="translate(202 92)">
          <ellipse cx="58" cy="42" rx="44" ry="31" fill="#edf4fb" opacity="0.8" />
          {modelEdges.map(([x1, y1, x2, y2], index) => (
            <line
              key={`edge-${index}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#667690"
              strokeWidth="1.6"
              strokeOpacity={0.7}
            />
          ))}
          {modelNodes.input.map((node, index) => (
            <g key={`input-${index}`}>
              <circle cx={node.x} cy={node.y} r="9.4" fill={node.fill} stroke="#50667f" strokeWidth="2" />
              <circle cx={node.x - 2} cy={node.y - 2} r="2.8" fill="rgba(255,255,255,0.7)" />
            </g>
          ))}
          {modelNodes.hidden.map((node, index) => (
            <g key={`hidden-${index}`}>
              <circle cx={node.x} cy={node.y} r="9.8" fill={node.fill} stroke="#50667f" strokeWidth="2" />
              <circle cx={node.x - 2} cy={node.y - 2} r="3" fill="rgba(255,255,255,0.72)" />
            </g>
          ))}
          {modelNodes.output.map((node, index) => (
            <g key={`output-${index}`}>
              <circle cx={node.x} cy={node.y} r="9.4" fill={node.fill} stroke="#50667f" strokeWidth="2" />
              <circle cx={node.x - 2} cy={node.y - 2} r="2.8" fill="rgba(255,255,255,0.7)" />
            </g>
          ))}
        </g>

        <g transform="translate(378 98)">
          <path d="M10 83 V6" stroke="#7b8698" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M10 83 H126" stroke="#7b8698" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M20 23 H112" stroke="#d7deea" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M20 43 H112" stroke="#d7deea" strokeWidth="1" strokeDasharray="3 4" />
          <path d="M20 63 H112" stroke="#d7deea" strokeWidth="1" strokeDasharray="3 4" />
          <rect x="24" y="50" width="14" height="33" rx="2" fill="url(#inference-gold)" />
          <rect x="44" y="32" width="14" height="51" rx="2" fill="url(#inference-blue)" />
          <rect x="64" y="18" width="14" height="65" rx="2" fill="url(#inference-orange)" />
          <rect x="84" y="58" width="14" height="25" rx="2" fill="url(#inference-gold)" />
          <circle cx="111" cy="22" r="14" fill="#f6fbff" stroke="#596a84" strokeWidth="2" />
          <text x="111" y="28" fontFamily={fontFamily} fontSize="18" fontWeight="700" fill="#526176" textAnchor="middle">
            ?
          </text>
        </g>

        <g transform="translate(380 236)">
          <path d="M12 80 V6" stroke="#7b8698" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M12 80 H116" stroke="#7b8698" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M18 24 C 30 18, 36 28, 42 44 C 48 61, 58 70, 72 58 C 86 46, 96 27, 110 34" stroke="#5077c9" strokeWidth="4" fill="none" strokeLinecap="round" />
          <Arrow x1={18} y1={14} x2={10} y2={28} stroke="#5077c9" width={2.8} headSize={6.5} headWidth={5.5} />
          <path d="M65 46 L84 27" stroke="#ea4747" strokeWidth="4.2" strokeLinecap="round" />
          <path d="M65 27 L84 46" stroke="#ea4747" strokeWidth="4.2" strokeLinecap="round" />
          <circle cx="106" cy="55" r="18" fill="none" stroke="#ea4747" strokeWidth="3" />
          <circle cx="106" cy="55" r="10" fill="none" stroke="#ea4747" strokeWidth="3" />
          <line x1="106" y1="35" x2="106" y2="75" stroke="#ea4747" strokeWidth="3" />
          <line x1="86" y1="55" x2="126" y2="55" stroke="#ea4747" strokeWidth="3" />
          <text x="64" y="24" fontFamily={fontFamily} fontSize="14" fontWeight="700" fill="#233145">
            {copy.lossLabel}
          </text>
        </g>

        <SoftConnector
          d="M 412 285 C 372 316, 321 321, 277 302 C 231 282, 221 259, 214 212"
          stroke="#7d8aa3"
          width={3.6}
          opacity={0.95}
          headX={214}
          headY={212}
          headDx={-7}
          headDy={-47}
          headSize={6.5}
          headWidth={5.5}
        />
        <path
          d="M 412 285 C 372 316, 321 321, 277 302 C 231 282, 221 259, 214 212"
          fill="none"
          stroke="#eef3f9"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g filter="url(#inference-soft-shadow)">
          <rect x="248" y="267" width="152" height="26" rx="13" fill="#f6f8fc" stroke="#c8d1df" />
        </g>
        <text x="324" y="284" textAnchor="middle" fontFamily={fontFamily} fontSize="15" fontWeight="700" fontStyle="italic" fill="#7b879d">
          {copy.updateLabel}
        </text>

        <g transform="translate(50 377)">
          <path d="M0 0 H20" stroke="#8191a8" strokeWidth="1.6" strokeLinecap="round" />
          <MultiLineText x={220} y={0} lines={footerLines} size={17} weight={700} fill="#233145" anchor="middle" italic lineHeight={0} />
          <path d="M400 0 H420" stroke="#8191a8" strokeWidth="1.6" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  );
};
