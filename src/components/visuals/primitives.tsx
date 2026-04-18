import React from 'react';

interface DiagramFrameProps {
  width: number;
  height: number;
}

interface DiagramTextProps {
  x: number;
  y: number;
  text: string;
  size?: number;
  weight?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  italic?: boolean;
}

interface PanelProps {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
  fill?: string;
  stroke?: string;
}

interface ArrowProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  strokeWidth?: number;
}

interface LossLoopProps {
  path: string;
  label: string;
  labelX: number;
  labelY: number;
  stroke?: string;
  strokeWidth?: number;
}

interface FeatureMatrixProps {
  x: number;
  y: number;
  title: string;
}

interface NeuralNodeGridProps {
  x: number;
  y: number;
}

interface BarChartProps {
  x: number;
  y: number;
  title?: string;
}

interface LossPanelProps {
  x: number;
  y: number;
  title: string;
}

export const DiagramFrame: React.FC<DiagramFrameProps> = ({ width, height }) => (
  <>
    <rect width={width} height={height} fill="url(#diagram-bg)" />
    <rect x="2" y="2" width={width - 4} height={height - 4} rx="18" fill="none" stroke="#dfe5ef" />
  </>
);

export const DiagramText: React.FC<DiagramTextProps> = ({
  x,
  y,
  text,
  size = 14,
  weight = 700,
  fill = '#24324a',
  anchor = 'start',
  italic = false,
}) => (
  <text
    x={x}
    y={y}
    textAnchor={anchor}
    fontFamily="Arial, Helvetica, sans-serif"
    fontSize={size}
    fontWeight={weight}
    fontStyle={italic ? 'italic' : 'normal'}
    fill={fill}
  >
    {text}
  </text>
);

export const Panel: React.FC<PanelProps> = ({
  x,
  y,
  width,
  height,
  radius = 14,
  fill = 'url(#diagram-panel)',
  stroke = '#bcc7d7',
}) => <rect x={x} y={y} width={width} height={height} rx={radius} fill={fill} stroke={stroke} />;

export const Arrow: React.FC<ArrowProps> = ({
  x1,
  y1,
  x2,
  y2,
  stroke = '#6d7b91',
  strokeWidth = 3,
}) => (
  <line
    x1={x1}
    y1={y1}
    x2={x2}
    y2={y2}
    stroke={stroke}
    strokeWidth={strokeWidth}
    markerEnd="url(#diagram-arrow-head)"
  />
);

export const LossLoop: React.FC<LossLoopProps> = ({
  path,
  label,
  labelX,
  labelY,
  stroke = '#6d7b91',
  strokeWidth = 16,
}) => (
  <g>
    <path
      d={path}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      opacity={0.88}
      markerEnd="url(#diagram-arrow-head)"
    />
    <path d={path} fill="none" stroke="#eef2f7" strokeWidth={8} strokeLinecap="round" strokeLinejoin="round" />
    <DiagramText x={labelX} y={labelY} text={label} size={17} italic fill="#ffffff" />
  </g>
);

export const FeatureMatrix: React.FC<FeatureMatrixProps> = ({ x, y, title }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={52} height={30} fill="#87afd0" stroke="#5e7fa1" />
    <rect x={0} y={30} width={52} height={27} fill="#edf3f9" stroke="#5e7fa1" />
    <rect x={0} y={57} width={52} height={26} fill="#edf3f9" stroke="#5e7fa1" />
    <rect x={0} y={83} width={52} height={17} fill="#edf3f9" stroke="#5e7fa1" />
    <rect x={52} y={0} width={39} height={30} fill="#87afd0" stroke="#5e7fa1" />
    <rect x={52} y={30} width={39} height={27} fill="#edf3f9" stroke="#5e7fa1" />
    <rect x={52} y={57} width={39} height={26} fill="#edf3f9" stroke="#5e7fa1" />
    <rect x={52} y={83} width={39} height={17} fill="#edf3f9" stroke="#5e7fa1" />
    <DiagramText x={100} y={23} text={title} size={12} weight={500} fill="#3b4a61" />
    <circle cx={15} cy={43} r={4} fill="#4d87bf" />
    <circle cx={35} cy={43} r={4} fill="#4d87bf" />
    <circle cx={15} cy={66} r={4} fill="#4d87bf" />
    <circle cx={35} cy={66} r={4} fill="#4d87bf" />
    <circle cx={15} cy={90} r={4} fill="#4d87bf" />
    <circle cx={35} cy={90} r={4} fill="#4d87bf" />
    <path d="M104 36 L111 43 L122 31" stroke="#f3b927" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M104 62 L111 69 L122 57" stroke="#f3b927" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </g>
);

export const NeuralNodeGrid: React.FC<NeuralNodeGridProps> = ({ x, y }) => (
  <g transform={`translate(${x} ${y})`} stroke="#5f6f88" strokeWidth="2.2" fill="none">
    <circle cx="52" cy="12" r="8" fill="#8fb7dc" stroke="#4f6885" />
    <circle cx="52" cy="36" r="8" fill="#8fb7dc" stroke="#4f6885" />
    <circle cx="52" cy="60" r="8" fill="#8fb7dc" stroke="#4f6885" />
    <circle cx="52" cy="84" r="8" fill="#8fb7dc" stroke="#4f6885" />
    <circle cx="12" cy="24" r="8" fill="#f3c64d" stroke="#4f6885" />
    <circle cx="12" cy="48" r="8" fill="#f3c64d" stroke="#4f6885" />
    <circle cx="12" cy="72" r="8" fill="#f3c64d" stroke="#4f6885" />
    <circle cx="92" cy="24" r="8" fill="#f3c64d" stroke="#4f6885" />
    <circle cx="92" cy="48" r="8" fill="#f3c64d" stroke="#4f6885" />
    <circle cx="92" cy="72" r="8" fill="#f3c64d" stroke="#4f6885" />
    <path d="M20 24 L44 12" />
    <path d="M20 24 L44 36" />
    <path d="M20 24 L44 60" />
    <path d="M20 48 L44 12" />
    <path d="M20 48 L44 36" />
    <path d="M20 48 L44 60" />
    <path d="M20 72 L44 12" />
    <path d="M20 72 L44 36" />
    <path d="M20 72 L44 60" />
    <path d="M60 12 L84 24" />
    <path d="M60 12 L84 48" />
    <path d="M60 12 L84 72" />
    <path d="M60 36 L84 24" />
    <path d="M60 36 L84 48" />
    <path d="M60 36 L84 72" />
    <path d="M60 60 L84 24" />
    <path d="M60 60 L84 48" />
    <path d="M60 60 L84 72" />
    <path d="M60 84 L84 24" />
    <path d="M60 84 L84 48" />
    <path d="M60 84 L84 72" />
  </g>
);

export const BarChart: React.FC<BarChartProps> = ({ x, y, title }) => (
  <g transform={`translate(${x} ${y})`}>
    <line x1="10" y1="1" x2="10" y2="83" stroke="#6d7b91" strokeWidth="3" />
    <line x1="6" y1="83" x2="116" y2="83" stroke="#6d7b91" strokeWidth="3" />
    <rect x="21" y="46" width="14" height="37" fill="url(#diagram-bar-1)" />
    <rect x="41" y="31" width="14" height="52" fill="url(#diagram-bar-2)" />
    <rect x="61" y="18" width="14" height="65" fill="url(#diagram-bar-3)" />
    <rect x="81" y="55" width="14" height="28" fill="url(#diagram-bar-4)" />
    <path d="M101 6 C109 8 113 14 114 24" stroke="#4d5a70" strokeWidth="6" fill="none" strokeLinecap="round" />
    <DiagramText x={96} y={40} text="?" size={58} weight={700} fill="#445469" />
    {title ? <DiagramText x={0} y={-8} text={title} size={12} weight={500} fill="#3b4a61" /> : null}
  </g>
);

export const LossPanel: React.FC<LossPanelProps> = ({ x, y, title }) => (
  <g transform={`translate(${x} ${y})`}>
    <line x1="12" y1="0" x2="12" y2="71" stroke="#6d7b91" strokeWidth="3" />
    <line x1="8" y1="71" x2="113" y2="71" stroke="#6d7b91" strokeWidth="3" />
    <path d="M16 10 C28 6 34 25 40 40 C47 57 57 64 72 48 C87 32 97 24 111 31" stroke="#5079c7" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M17 9 L10 17" stroke="#5079c7" strokeWidth="3" fill="none" markerEnd="url(#diagram-arrow-head-dark)" />
    <path d="M60 49 L80 29" stroke="#e14040" strokeWidth="4" strokeLinecap="round" />
    <path d="M60 29 L80 49" stroke="#e14040" strokeWidth="4" strokeLinecap="round" />
    <circle cx="104" cy="55" r="18" fill="none" stroke="#e14040" strokeWidth="3" />
    <circle cx="104" cy="55" r="10" fill="none" stroke="#e14040" strokeWidth="3" />
    <line x1="104" y1="34" x2="104" y2="76" stroke="#e14040" strokeWidth="3" />
    <line x1="83" y1="55" x2="125" y2="55" stroke="#e14040" strokeWidth="3" />
    <DiagramText x={61} y={21} text={title} size={14} weight={700} fill="#24324a" />
  </g>
);
