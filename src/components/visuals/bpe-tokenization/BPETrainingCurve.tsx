import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { BPETrainingCurveCopy } from '../../../types/slide';

interface BPETrainingCurveProps {
  copy: BPETrainingCurveCopy;
}

// Simulated data points for coverage and OOV rate
const dataPoints = [
  { merges: 0, coverage: 45, oov: 55 },
  { merges: 5000, coverage: 72, oov: 28 },
  { merges: 10000, coverage: 83, oov: 17 },
  { merges: 15000, coverage: 89, oov: 11 },
  { merges: 20000, coverage: 93, oov: 7 },
  { merges: 25000, coverage: 95, oov: 5 },
  { merges: 30000, coverage: 97, oov: 3 },
  { merges: 35000, coverage: 98, oov: 2 },
  { merges: 40000, coverage: 98.5, oov: 1.5 },
  { merges: 45000, coverage: 99, oov: 1 },
  { merges: 50000, coverage: 99.3, oov: 0.7 },
];

export const BPETrainingCurve = React.memo(({ copy }: BPETrainingCurveProps) => {
  const [hoveredMerges, setHoveredMerges] = useState<number | null>(null);

  const chartWidth = 400;
  const chartHeight = 220;
  const padding = { top: 20, right: 50, bottom: 30, left: 40 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  // Scales
  const xScale = (merges: number) => (merges / 50000) * innerWidth;
  const yScale = (pct: number) => innerHeight - (pct / 100) * innerHeight;

  // Coverage curve path
  const coveragePath = dataPoints
    .map((dp, i) => `${i === 0 ? 'M' : 'L'} ${xScale(dp.merges)} ${yScale(dp.coverage)}`)
    .join(' ');

  // OOV curve path
  const oovPath = dataPoints
    .map((dp, i) => `${i === 0 ? 'M' : 'L'} ${xScale(dp.merges)} ${yScale(dp.oov)}`)
    .join(' ');

  // Area fill for coverage
  const coverageArea = `${coveragePath} L ${innerWidth} ${innerHeight} L 0 ${innerHeight} Z`;

  // Sweet spot region (30k-40k merges)
  const sweetSpotX1 = xScale(30000);
  const sweetSpotX2 = xScale(40000);

  const hoveredPoint = hoveredMerges
    ? dataPoints.find((dp) => dp.merges === hoveredMerges)
    : null;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: '20px',
        background: sw.shellBackground,
        borderRadius: sw.shellBorderRadius,
        border: sw.shellBorder,
        boxShadow: sw.shellShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: sw.fontSans,
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: sw.fsTitle,
          fontWeight: 700,
          color: sw.text,
          textAlign: 'center',
        }}
      >
        {copy.title}
      </div>

      {/* Tradeoff description */}
      <div
        style={{
          fontSize: sw.fsSmall,
          color: sw.textDim,
          textAlign: 'center',
          fontStyle: 'italic',
        }}
      >
        {copy.tradeoffDesc}
      </div>

      {/* Chart */}
      <div style={{ flex: 1, position: 'relative' }}>
        <svg
          width="100%"
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="coverageGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sw.cyan} stopOpacity="0.4" />
              <stop offset="100%" stopColor={sw.cyan} stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {/* Sweet spot region */}
          <rect
            x={sweetSpotX1 + padding.left}
            y={padding.top}
            width={sweetSpotX2 - sweetSpotX1}
            height={innerHeight}
            fill={sw.green}
            opacity="0.08"
          />

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((pct) => (
            <g key={pct}>
              <line
                x1={padding.left}
                y1={yScale(pct) + padding.top}
                x2={chartWidth - padding.right}
                y2={yScale(pct) + padding.top}
                stroke={sw.borderSubtle}
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <text
                x={padding.left - 8}
                y={yScale(pct) + padding.top + 4}
                textAnchor="end"
                fill={sw.textMuted}
                fontSize="10"
              >
                {pct}%
              </text>
            </g>
          ))}

          {/* X-axis labels */}
          {[0, 10000, 20000, 30000, 40000, 50000].map((merges) => (
            <text
              key={merges}
              x={xScale(merges) + padding.left}
              y={chartHeight - 5}
              textAnchor="middle"
              fill={sw.textMuted}
              fontSize="10"
            >
              {(merges / 1000).toFixed(0)}k
            </text>
          ))}

          {/* Axes */}
          <line
            x1={padding.left}
            y1={padding.top}
            x2={padding.left}
            y2={chartHeight - padding.bottom}
            stroke={sw.borderMedium}
            strokeWidth="1"
          />
          <line
            x1={padding.left}
            y1={chartHeight - padding.bottom}
            x2={chartWidth - padding.right}
            y2={chartHeight - padding.bottom}
            stroke={sw.borderMedium}
            strokeWidth="1"
          />

          {/* Coverage area fill */}
          <path
            d={coverageArea}
            fill="url(#coverageGradient)"
            transform={`translate(${padding.left}, ${padding.top})`}
          />

          {/* Coverage curve */}
          <path
            d={coveragePath}
            fill="none"
            stroke={sw.cyan}
            strokeWidth="2.5"
            transform={`translate(${padding.left}, ${padding.top})`}
          />

          {/* OOV curve */}
          <path
            d={oovPath}
            fill="none"
            stroke={sw.pink}
            strokeWidth="2.5"
            strokeDasharray="6,3"
            transform={`translate(${padding.left}, ${padding.top})`}
          />

          {/* Hover interaction areas */}
          {dataPoints.map((dp) => (
            <g
              key={dp.merges}
              onMouseEnter={() => setHoveredMerges(dp.merges)}
              onMouseLeave={() => setHoveredMerges(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={xScale(dp.merges) + padding.left}
                cy={yScale(dp.coverage) + padding.top}
                r={hoveredMerges === dp.merges ? 6 : 4}
                fill={sw.cyan}
                stroke="#000"
                strokeWidth="1"
              />
              <circle
                cx={xScale(dp.merges) + padding.left}
                cy={yScale(dp.oov) + padding.top}
                r={hoveredMerges === dp.merges ? 6 : 4}
                fill={sw.pink}
                stroke="#000"
                strokeWidth="1"
              />
              {/* Invisible hover area */}
              <rect
                x={xScale(dp.merges) + padding.left - 15}
                y={padding.top}
                width={30}
                height={innerHeight}
                fill="transparent"
              />
            </g>
          ))}

          {/* Hovered point tooltip */}
          {hoveredPoint && (
            <g>
              <line
                x1={xScale(hoveredPoint.merges) + padding.left}
                y1={padding.top}
                x2={xScale(hoveredPoint.merges) + padding.left}
                y2={chartHeight - padding.bottom}
                stroke={sw.textMuted}
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <rect
                x={xScale(hoveredPoint.merges) + padding.left - 40}
                y={padding.top - 18}
                width={80}
                height={16}
                rx="4"
                fill={sw.tintStronger}
                stroke={sw.borderSubtle}
              />
              <text
                x={xScale(hoveredPoint.merges) + padding.left}
                y={padding.top - 6}
                textAnchor="middle"
                fill={sw.text}
                fontSize="10"
                fontWeight="600"
              >
                {(hoveredPoint.merges / 1000).toFixed(0)}k merges
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '24px',
          paddingTop: '8px',
          borderTop: `1px solid ${sw.borderSubtle}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '20px',
              height: '3px',
              background: sw.cyan,
              borderRadius: '2px',
            }}
          />
          <span style={{ fontSize: sw.fsSmall, color: sw.textDim }}>
            {copy.coverageAxis}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '20px',
              height: '3px',
              background: sw.pink,
              borderRadius: '2px',
              backgroundImage: `repeating-linear-gradient(90deg, ${sw.pink} 0, ${sw.pink} 6px, transparent 6px, transparent 9px)`,
            }}
          />
          <span style={{ fontSize: sw.fsSmall, color: sw.textDim }}>
            {copy.oovLabel}
          </span>
        </div>
      </div>

      {/* Labels */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          fontSize: sw.fsSmall,
          fontWeight: 600,
          color: sw.textMuted,
        }}
      >
        <span>{copy.smallVocab}</span>
        <span style={{ color: sw.green }}>{copy.optimalLabel}</span>
        <span>{copy.largeVocab}</span>
      </div>
    </div>
  );
});
