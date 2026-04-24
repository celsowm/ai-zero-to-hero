import React from 'react';
import { Beaker, Brain, Database, Rocket, SlidersHorizontal, Split } from 'lucide-react';
import type { MachineLearningPipelineCopy } from '../../../types/slide';
import { ClippedAccentMarker } from '../primitives';
import { sw } from '../../../theme/tokens';

interface MachineLearningPipelineDiagramProps {
  copy: MachineLearningPipelineCopy;
}

const fontFamily = sw.fontSans;

const wrapText = (text: string, maxWidth: number, fontSize: number) => {
  const approxCharWidth = fontSize * 0.57;
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

const StageCard: React.FC<{
  clipId: string;
  x: number;
  y: number;
  width: number;
  height: number;
  title: string;
  subtitle: string;
  accent: string;
  Icon: React.ComponentType<{
    size?: number | string;
    color?: string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
  }>;
  }> = ({ clipId, x, y, width, height, title, subtitle, accent, Icon }) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={0} y={0} width={width} height={height} rx={14} fill="#1e293b" stroke="rgba(148, 163, 184, 0.2)" />

    <ClippedAccentMarker clipId={clipId} width={width} height={height} accent={accent} />

    <g transform={`translate(${30 - 7} ${height / 2 - 7})`}>
      <Icon size={14} color="#f8fafc" strokeWidth={2.4} />
    </g>
    <text x={60} y={20} fontFamily={fontFamily} fontSize="13.8" fontWeight="700" fill="#f8fafc">
      {title}
    </text>
    <text x={60} y={31} fontFamily={fontFamily} fontSize="10.4" fontWeight="500" fill="#94a3b8">
      {subtitle}
    </text>
  </g>
);

const ArrowDown: React.FC<{
  x: number;
  y1: number;
  y2: number;
}> = ({ x, y1, y2 }) => (
  <g>
    <line x1={x} y1={y1} x2={x} y2={y2} stroke="#94a3b8" strokeWidth="3.2" strokeLinecap="round" />
    <path d={`M ${x - 6} ${y2 - 8} L ${x} ${y2} L ${x + 6} ${y2 - 8}`} stroke="#94a3b8" strokeWidth="3.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
  </g>
);

export const MachineLearningPipelineDiagram = React.memo(({ copy }: MachineLearningPipelineDiagramProps) => {
  const startY = 100;
  const cardWidth = 370;
  const cardHeight = 36;
  const gap = 6;
  const cardX = 24;
  const arrowX = 210;
  const stages = copy.stages;
  const stageIcons = [Database, SlidersHorizontal, Split, Brain, Beaker, Rocket] as const;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 540 405"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-labelledby="ml-pipeline-title ml-pipeline-desc"
      shapeRendering="geometricPrecision"
    >
      <title id="ml-pipeline-title">{copy.diagramTitle}</title>
      <desc id="ml-pipeline-desc">{copy.diagramDescription}</desc>
      <defs>
        <linearGradient id="pipeline-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={sw.tintStrong} />
          <stop offset="100%" stopColor={sw.tint} />
        </linearGradient>
        <radialGradient id="pipeline-glow-pink" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={sw.pink} stopOpacity="0.15" />
          <stop offset="100%" stopColor={sw.pink} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="pipeline-glow-cyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={sw.sky} stopOpacity="0.15" />
          <stop offset="100%" stopColor={sw.sky} stopOpacity="0" />
        </radialGradient>
        <marker id="pipeline-arrow-head" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
          <path d="M0,0 L10,5 L0,10 z" fill="#94a3b8" />
        </marker>
      </defs>

      <rect width="540" height="405" fill="url(#pipeline-bg)" rx="18" />
      <ellipse cx="448" cy="78" rx="96" ry="64" fill="url(#pipeline-glow-pink)" />
      <ellipse cx="90" cy="332" rx="110" ry="72" fill="url(#pipeline-glow-cyan)" />
      <path d="M24 20 H516" stroke="#334155" strokeWidth="1" opacity="0.45" />
      <path d="M24 383 H516" stroke="#334155" strokeWidth="1" opacity="0.7" />

      <text x="34" y="42" fontFamily={fontFamily} fontSize="24" fontWeight="700" fill="#f8fafc">
        {copy.diagramTitle}
      </text>
      <WrappedText x={34} y={64} text={copy.diagramDescription} maxWidth={468} fontSize={13.2} fill="#94a3b8" />

      {stages.map((stage, index) => (
        <StageCard
          key={stage.title}
          clipId={`pipeline-stage-clip-${index}`}
          x={cardX}
          y={startY + index * (cardHeight + gap)}
          width={cardWidth}
          height={cardHeight}
          title={stage.title}
          subtitle={stage.subtitle}
          accent={stage.accent}
          Icon={stageIcons[index] ?? Brain}
        />
      ))}

      {stages.slice(0, -1).map((_, index) => {
        const y1 = startY + index * (cardHeight + gap) + cardHeight;
        const y2 = startY + index * (cardHeight + gap) + cardHeight + gap;
        return <ArrowDown key={`arrow-${index}`} x={arrowX} y1={y1 + 1} y2={y2 - 1} />;
      })}

      <path
        d="M 404 338 C 476 332, 500 286, 490 246 C 482 214, 460 194, 424 186"
        fill="none"
        stroke="#94a3b8"
        strokeWidth="3.0"
        strokeLinecap="round"
        strokeLinejoin="round"
        markerEnd="url(#pipeline-arrow-head)"
      />
      <text x="495" y="334" textAnchor="end" fontFamily={fontFamily} fontSize="11.8" fontWeight="700" fill="#f8fafc">
        {copy.loopLabel}
      </text>

      <text x="270" y="398" textAnchor="middle" fontFamily={fontFamily} fontSize="12.4" fontWeight="500" fill="#94a3b8">
        {copy.footerLabel}
      </text>
    </svg>
  );
});

