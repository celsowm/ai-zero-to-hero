import React from 'react';
import type { LearningLoopDiagramCopy } from '../../../types/slide';

interface LearningLoopDiagramProps {
  copy: LearningLoopDiagramCopy;
}

const fontFamily = "'Space Grotesk', 'Inter', 'Segoe UI', Arial, sans-serif";

const wrapText = (text: string, maxWidth: number, fontSize: number) => {
  const approxCharWidth = fontSize * 0.56;
  const maxCharsPerLine = Math.max(8, Math.floor(maxWidth / approxCharWidth));
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      currentLine = candidate;
      continue;
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    if (word.length > maxCharsPerLine) {
      let chunk = '';
      for (const char of word) {
        if ((chunk + char).length > maxCharsPerLine) {
          lines.push(chunk);
          chunk = char;
        } else {
          chunk += char;
        }
      }
      currentLine = chunk;
    } else {
      currentLine = word;
    }
  }

  if (currentLine) {
    lines.push(currentLine);
  }

  return lines;
};

const WrappedText: React.FC<{
  x: number;
  y: number;
  text: string;
  maxWidth: number;
  fontSize: number;
  weight?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  lineHeight?: number;
}> = ({
  x,
  y,
  text,
  maxWidth,
  fontSize,
  weight = 500,
  fill = '#233145',
  anchor = 'start',
  lineHeight = fontSize * 1.35,
}) => {
  const lines = wrapText(text, maxWidth, fontSize);

  return (
    <text x={x} y={y} textAnchor={anchor} fontFamily={fontFamily} fontSize={fontSize} fontWeight={weight} fill={fill}>
      {lines.map((line, index) => (
        <tspan key={`${line}-${index}`} x={x} dy={index === 0 ? 0 : lineHeight}>
          {line}
        </tspan>
      ))}
    </text>
  );
};

const Node: React.FC<{
  x: number;
  y: number;
  title: string;
  subtitle: string;
  accent: string;
  children?: React.ReactNode;
}> = ({ x, y, title, subtitle, accent, children }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="0" y="0" width="88" height="108" rx="18" fill="#1e293b" stroke="rgba(148, 163, 184, 0.2)" />
    <rect x="0" y="0" width="88" height="7" rx="18" fill={accent} />
    <text x="44" y="30" textAnchor="middle" fontFamily={fontFamily} fontSize="16.5" fontWeight="700" fill="#f8fafc">
      {title}
    </text>
    <text x="44" y="49" textAnchor="middle" fontFamily={fontFamily} fontSize="11" fontWeight="500" fill="#94a3b8">
      {subtitle}
    </text>
    {children}
  </g>
);

const Arrow: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  curvature?: number;
  color?: string;
}> = ({ x1, y1, x2, y2, curvature = 0, color = '#94a3b8' }) => {
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2 + curvature;
  const d = `M ${x1} ${y1} Q ${midX} ${midY} ${x2} ${y2}`;
  return (
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth="3.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd="url(#arrow-head)"
    />
  );
};

export const LearningLoopDiagram: React.FC<LearningLoopDiagramProps> = ({ copy }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 540 405"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="loop-title loop-desc"
      shapeRendering="geometricPrecision"
    >
      <title id="loop-title">{copy.diagramTitle}</title>
      <desc id="loop-desc">{copy.diagramDescription}</desc>
      <defs>
        <linearGradient id="loop-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>
        <radialGradient id="loop-glow-cyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="loop-glow-pink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f472b6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
        </radialGradient>
        <marker id="arrow-head" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8" />
        </marker>
      </defs>

      <rect width="540" height="405" fill="url(#loop-bg)" rx="18" />
      <ellipse cx="430" cy="72" rx="108" ry="72" fill="url(#loop-glow-pink)" />
      <ellipse cx="98" cy="336" rx="134" ry="82" fill="url(#loop-glow-cyan)" />
      <path d="M24 20 H516" stroke="#334155" strokeWidth="1" opacity="0.45" />
      <path d="M24 383 H516" stroke="#334155" strokeWidth="1" opacity="0.7" />

      <text x="34" y="42" fontFamily={fontFamily} fontSize="24" fontWeight="700" fill="#f8fafc">
        {copy.diagramTitle}
      </text>
      <WrappedText x={34} y={64} text={copy.diagramDescription} maxWidth={470} fontSize={13.5} fill="#94a3b8" />

      <Arrow x1={122} y1={168} x2={160} y2={168} />
      <Arrow x1={210} y1={168} x2={248} y2={168} />
      <Arrow x1={298} y1={168} x2={336} y2={168} />
      <Arrow x1={386} y1={168} x2={424} y2={168} />

      <Arrow x1={448} y1={248} x2={114} y2={248} curvature={56} color="#cbd5e1" />

      <Node x={34} y={118} title={copy.dataTitle} subtitle="input" accent="#8fb2d8">
        <rect x="18" y="72" width="52" height="10" rx="5" fill="#facc15" />
        <rect x="18" y="86" width="26" height="10" rx="5" fill="#38bdf8" />
      </Node>

      <Node x={122} y={118} title={copy.modelTitle} subtitle="aprende" accent="#a855f7">
        <circle cx="28" cy="76" r="7" fill="#facc15" stroke="#ca8a04" strokeWidth="1.8" />
        <circle cx="60" cy="68" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.8" />
        <circle cx="60" cy="90" r="7" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.8" />
        <path d="M35 76 L53 68" stroke="#475569" strokeWidth="2.1" />
        <path d="M35 76 L53 90" stroke="#475569" strokeWidth="2.1" />
        <path d="M67 68 L67 90" stroke="#475569" strokeWidth="2.1" />
      </Node>

      <Node x={210} y={118} title={copy.predictionTitle} subtitle="saída" accent="#f3b72c">
        <rect x="18" y="72" width="16" height="22" rx="3" fill="#38bdf8" />
        <rect x="38" y="62" width="16" height="32" rx="3" fill="#facc15" />
        <rect x="58" y="54" width="16" height="40" rx="3" fill="#f97316" />
      </Node>

      <Node x={298} y={118} title={copy.errorTitle} subtitle="loss" accent="#ef5b5b">
        <path d="M18 82 C28 76, 34 64, 44 54 C54 44, 60 46, 70 62" fill="none" stroke="#818cf8" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M26 54 L56 84" stroke="#f43f5e" strokeWidth="3.6" strokeLinecap="round" />
        <path d="M56 54 L26 84" stroke="#f43f5e" strokeWidth="3.6" strokeLinecap="round" />
      </Node>

      <Node x={386} y={118} title={copy.adjustTitle} subtitle="corrige" accent="#00b8f0">
        <rect x="18" y="72" width="14" height="22" rx="3" fill="#38bdf8" />
        <rect x="38" y="60" width="14" height="34" rx="3" fill="#facc15" />
        <rect x="58" y="50" width="14" height="44" rx="3" fill="#f97316" />
        <path d="M68 44 C76 48, 80 56, 80 64" fill="none" stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round" />
        <path d="M80 64 L73 59" stroke="#38bdf8" strokeWidth="3.2" strokeLinecap="round" />
      </Node>

      <text x="270" y="304" textAnchor="middle" fontFamily={fontFamily} fontSize="20" fontWeight="700" fill="#f8fafc">
        {copy.loopLabel}
      </text>
      <WrappedText x={270} y={328} text={copy.footerLabel} maxWidth={420} fontSize={13.5} weight={500} fill="#94a3b8" anchor="middle" />
    </svg>
  );
};

