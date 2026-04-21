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

const CARD_WIDTH = 94;
const CARD_HEIGHT = 126;
const CARD_ICON_Y = 60;

const Node: React.FC<{
  x: number;
  y: number;
  step: number;
  title: string;
  accent: string;
  children?: React.ReactNode;
}> = ({ x, y, step, title, accent, children }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x="0" y="0" width={CARD_WIDTH} height={CARD_HEIGHT} rx="18" fill="rgba(11, 20, 37, 0.98)" stroke="rgba(129, 150, 182, 0.22)" />
    <rect x="1" y="1" width={CARD_WIDTH - 2} height={CARD_HEIGHT - 2} rx="17" fill="none" stroke="rgba(255,255,255,0.05)" />
    <line x1="18" y1="48" x2={CARD_WIDTH - 18} y2="48" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
    <circle cx="18" cy="18" r="12" fill="rgba(13, 24, 45, 0.98)" stroke={accent} strokeWidth="2" />
    <text x="18" y="22" textAnchor="middle" fontFamily={fontFamily} fontSize="11.5" fontWeight="700" fill={accent}>
      {step}
    </text>
    <text x={CARD_WIDTH / 2} y="34" textAnchor="middle" fontFamily={fontFamily} fontSize="15" fontWeight="700" fill="#e7edf8">
      {title}
    </text>
    <g transform={`translate(0 ${CARD_ICON_Y})`}>{children}</g>
  </g>
);

export const LearningLoopDiagram: React.FC<LearningLoopDiagramProps> = ({ copy }) => {
  const rowY = 108;
  const cardXs = [26, 132, 238, 344, 450];
  const separatorDots = [124, 230, 336, 442];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 560 392"
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
          <stop offset="0%" stopColor="#0a1120" />
          <stop offset="100%" stopColor="#0f1a30" />
        </linearGradient>
        <radialGradient id="loop-glow-cyan" cx="8%" cy="88%" r="72%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="loop-glow-pink" cx="92%" cy="10%" r="56%">
          <stop offset="0%" stopColor="#ec4899" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#ec4899" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="loop-track" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(56,189,248,0.0)" />
          <stop offset="18%" stopColor="rgba(56,189,248,0.22)" />
          <stop offset="82%" stopColor="rgba(236,72,153,0.22)" />
          <stop offset="100%" stopColor="rgba(236,72,153,0.0)" />
        </linearGradient>
      </defs>

      <rect width="560" height="392" fill="url(#loop-bg)" rx="18" />
      <ellipse cx="486" cy="70" rx="116" ry="72" fill="url(#loop-glow-pink)" />
      <ellipse cx="92" cy="350" rx="150" ry="88" fill="url(#loop-glow-cyan)" />
      <path d="M22 20 H538" stroke="#2b3b54" strokeWidth="1" opacity="0.62" />
      <path d="M22 370 H538" stroke="#2b3b54" strokeWidth="1" opacity="0.82" />

      <text x="34" y="44" fontFamily={fontFamily} fontSize="23" fontWeight="700" fill="#f8fafc">
        {copy.diagramTitle}
      </text>
      <WrappedText x={34} y={66} text={copy.diagramDescription} maxWidth={488} fontSize={12.5} fill="#99a8bf" />

      <rect x="44" y="246" width="472" height="1.5" rx="1" fill="url(#loop-track)" />
      {separatorDots.map((x, index) => (
        <g key={`flow-dot-${x}`}>
          <circle cx={x} cy="246.5" r="6.5" fill="#0f1a30" stroke="rgba(160,180,210,0.22)" strokeWidth="1.2" />
          <circle cx={x} cy="246.5" r="2.4" fill={index % 2 === 0 ? '#38bdf8' : '#fbbf24'} />
        </g>
      ))}

      <Node x={cardXs[0]} y={rowY} step={1} title={copy.dataTitle} accent="#38bdf8">
        <rect x="16" y="18" width="60" height="10" rx="5" fill="#facc15" />
        <rect x="16" y="34" width="42" height="10" rx="5" fill="#38bdf8" />
        <rect x="16" y="50" width="28" height="10" rx="5" fill="#60a5fa" />
      </Node>

      <Node x={cardXs[1]} y={rowY} step={2} title={copy.modelTitle} accent="#c084fc">
        <circle cx="22" cy="34" r="8" fill="#facc15" stroke="#ca8a04" strokeWidth="1.6" />
        <circle cx="66" cy="22" r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.6" />
        <circle cx="66" cy="46" r="8" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.6" />
        <path d="M30 34 L58 23" stroke="#8ea3be" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M30 34 L58 45" stroke="#8ea3be" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M74 24 L74 44" stroke="#8ea3be" strokeWidth="2.2" strokeLinecap="round" />
      </Node>

      <Node x={cardXs[2]} y={rowY} step={3} title={copy.predictionTitle} accent="#fbbf24">
        <rect x="15" y="32" width="16" height="34" rx="3.5" fill="#38bdf8" />
        <rect x="39" y="20" width="16" height="46" rx="3.5" fill="#facc15" />
        <rect x="63" y="8" width="16" height="58" rx="3.5" fill="#f97316" />
      </Node>

      <Node x={cardXs[3]} y={rowY} step={4} title={copy.errorTitle} accent="#fb7185">
        <circle cx="47" cy="34" r="21" fill="none" stroke="#7084a2" strokeWidth="2.6" />
        <circle cx="47" cy="34" r="9" fill="none" stroke="#818cf8" strokeWidth="2.1" />
        <circle cx="63" cy="22" r="5" fill="#f43f5e" />
        <path d="M47 34 L63 22" stroke="#f43f5e" strokeWidth="2.3" strokeLinecap="round" />
      </Node>

      <Node x={cardXs[4]} y={rowY} step={5} title={copy.adjustTitle} accent="#22d3ee">
        <path d="M18 18 H76" stroke="#9fb3cb" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="38" cy="18" r="6.2" fill="#38bdf8" />
        <path d="M18 38 H76" stroke="#9fb3cb" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="64" cy="38" r="6.2" fill="#facc15" />
        <path d="M18 58 H76" stroke="#9fb3cb" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="48" cy="58" r="6.2" fill="#f97316" />
      </Node>

      <g transform="translate(0 0)">
        <circle cx="280" cy="304" r="52" fill="rgba(8,15,30,0.56)" stroke="rgba(160,180,210,0.18)" strokeWidth="1.2" />
        <circle cx="280" cy="304" r="36" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1.2" />
        <path d="M 280 252 A 52 52 0 0 1 324 281" fill="none" stroke="rgba(56,189,248,0.48)" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M 236 327 A 52 52 0 0 1 280 356" fill="none" stroke="rgba(236,72,153,0.44)" strokeWidth="2.2" strokeLinecap="round" />
      </g>

      <rect x="134" y="284" width="292" height="40" rx="20" fill="rgba(8,15,30,0.84)" stroke="rgba(166,185,210,0.22)" />
      <text x="280" y="310" textAnchor="middle" fontFamily={fontFamily} fontSize="19.5" fontWeight="700" fill="#f8fafc">
        {copy.loopLabel}
      </text>
      <WrappedText x={280} y={355} text={copy.footerLabel} maxWidth={470} fontSize={13} weight={500} fill="#9cb0c8" anchor="middle" />
    </svg>
  );
};

