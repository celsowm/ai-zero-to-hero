import React, { useState } from 'react';
import type { ClassificationProblemCopy } from '../../../types/slide/classification-problem';
import { sw } from '../../../theme/tokens';

interface ClassificationProblemVisualProps {
  copy: ClassificationProblemCopy;
}

const CLASS_0_COLOR = '#22c55e';
const CLASS_1_COLOR = '#ef4444';

export const ClassificationProblemVisual = React.memo(({ copy }: ClassificationProblemVisualProps) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  const {
    tableTitle,
    tableCaption,
    columns,
    rows,
    class0Label,
    class1Label,
    scatterTitle,
    scatterXLabel,
    scatterYLabel,
    footerNote,
  } = copy;

  // Scatter plot constants
  const scatterPadding = 40;
  const scatterWidth = 520;
  const scatterHeight = 180;
  const plotX = scatterPadding;
  const plotY = 15;
  const plotW = scatterWidth - scatterPadding * 2;
  const plotH = scatterHeight - scatterPadding - 5;

  // Use columns[0] (idade) as X and columns[2] (colesterol) as Y
  const col0Idx = 0;
  const col2Idx = 2;

  const numericRows = rows.map((r) => ({
    x: parseFloat(r.values[col0Idx]),
    y: parseFloat(r.values[col2Idx]),
    target: r.target,
    label: r.label,
  }));

  const xMin = Math.min(...numericRows.map((r) => r.x)) - 0.05;
  const xMax = Math.max(...numericRows.map((r) => r.x)) + 0.05;
  const yMin = Math.min(...numericRows.map((r) => r.y)) - 0.05;
  const yMax = Math.max(...numericRows.map((r) => r.y)) + 0.05;

  const scaleX = (v: number) => plotX + ((v - xMin) / (xMax - xMin)) * plotW;
  const scaleY = (v: number) => plotY + plotH - ((v - yMin) / (yMax - yMin)) * plotH;

  // Table layout
  const headerY = 34;
  const rowHeight = 22;
  const tableBottom = headerY + rows.length * rowHeight;
  const scatterYOffset = tableBottom + 20;

  return (
    <svg
      viewBox="0 0 540 420"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      role="img"
      aria-label={tableCaption}
    >
      {/* Table title */}
      <text x="10" y="18" fill={sw.text} fontSize="13" fontWeight="700">
        {tableTitle}
      </text>

      {/* Table header background */}
      <rect x="10" y={headerY - 12} width="520" height="20" rx="4" fill={sw.surfaceLight} />

      {/* Table header labels */}
      {columns.map((col) => (
        <text key={col} x={15 + columns.indexOf(col) * 75} y={headerY} fill={sw.textDim} fontSize="9" fontWeight="600">
          {col.toUpperCase()}
        </text>
      ))}
      <text x={15 + 4 * 75} y={headerY} fill={sw.textDim} fontSize="9" fontWeight="600">
        CLASSE
      </text>

      {/* Table rows */}
      {rows.map((row, rowIdx) => {
        const y = headerY + rowIdx * rowHeight + rowHeight;
        const isHovered = hoveredRow === rowIdx;
        const dotColor = row.target === 0 ? CLASS_0_COLOR : CLASS_1_COLOR;

        return (
          <g
            key={rowIdx}
            onMouseEnter={() => setHoveredRow(rowIdx)}
            onMouseLeave={() => setHoveredRow(null)}
            style={{ cursor: 'pointer' }}
          >
            <rect
              x="10"
              y={y - 12}
              width="520"
              height={rowHeight}
              rx="3"
              fill={isHovered ? sw.tintStronger : 'transparent'}
            />
            {row.values.map((val, i) => (
              <text key={i} x={15 + i * 75} y={y} fill={sw.text} fontSize="10">
                {val}
              </text>
            ))}
            {/* Class dot + label */}
            <circle cx={15 + 4 * 75 + 5} cy={y - 4} r="5" fill={dotColor} />
            <text x={15 + 4 * 75 + 15} y={y} fill={sw.text} fontSize="10">
              {row.target === 0 ? class0Label : class1Label}
            </text>
          </g>
        );
      })}

      {/* Separator line */}
      <line
        x1="10"
        y1={scatterYOffset - 8}
        x2="530"
        y2={scatterYOffset - 8}
        stroke={sw.borderSubtle}
        strokeWidth="1"
      />

      {/* Scatter plot title */}
      <text x="10" y={scatterYOffset} fill={sw.text} fontSize="12" fontWeight="700">
        {scatterTitle}
      </text>

      {/* Scatter plot area */}
      <g transform={`translate(0, ${scatterYOffset + 10})`}>
        {/* Plot background */}
        <rect x={plotX} y={plotY} width={plotW} height={plotH} fill={sw.surfaceLight} rx="4" />

        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <React.Fragment key={`grid-${t}`}>
            <line
              x1={plotX + t * plotW}
              y1={plotY}
              x2={plotX + t * plotW}
              y2={plotY + plotH}
              stroke={sw.borderSubtle}
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
            <line
              x1={plotX}
              y1={plotY + t * plotH}
              x2={plotX + plotW}
              y2={plotY + t * plotH}
              stroke={sw.borderSubtle}
              strokeWidth="0.5"
              strokeDasharray="2,2"
            />
          </React.Fragment>
        ))}

        {/* Data points */}
        {numericRows.map((point, i) => {
          const cx = scaleX(point.x);
          const cy = scaleY(point.y);
          const color = point.target === 0 ? CLASS_0_COLOR : CLASS_1_COLOR;
          const isHovered = hoveredRow === i;
          const r = isHovered ? 7 : 5;

          return (
            <g key={`point-${i}`}>
              <circle cx={cx} cy={cy} r={r} fill={color} opacity={isHovered ? 1 : 0.85} />
              {isHovered && (
                <text x={cx} y={cy - 10} textAnchor="middle" fill={sw.text} fontSize="8">
                  {point.label}
                </text>
              )}
            </g>
          );
        })}

        {/* Axis labels */}
        <text x={plotX + plotW / 2} y={plotY + plotH + 16} textAnchor="middle" fill={sw.textDim} fontSize="9">
          {scatterXLabel}
        </text>
        <text
          x={plotX - 8}
          y={plotY + plotH / 2}
          textAnchor="middle"
          fill={sw.textDim}
          fontSize="9"
          transform={`rotate(-90, ${plotX - 8}, ${plotY + plotH / 2})`}
        >
          {scatterYLabel}
        </text>

        {/* Legend */}
        <circle cx={plotX + 10} cy={plotY + 10} r="4" fill={CLASS_0_COLOR} />
        <text x={plotX + 18} y={plotY + 13} fill={sw.textDim} fontSize="8">
          {class0Label}
        </text>
        <circle cx={plotX + 10} cy={plotY + 24} r="4" fill={CLASS_1_COLOR} />
        <text x={plotX + 18} y={plotY + 27} fill={sw.textDim} fontSize="8">
          {class1Label}
        </text>
      </g>

      {/* Footer note */}
      <text x="10" y={scatterYOffset + scatterHeight + 30} fill={sw.textMuted} fontSize="8" fontStyle="italic">
        {footerNote}
      </text>
    </svg>
  );
});
