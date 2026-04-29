import React, { useState, useMemo } from 'react';
import type { ManyShotPromptingCopy } from '../../../types/slide/prompt-engineering';
import { sw } from '../../../theme/tokens';

interface ManyShotPromptingProps {
  copy: ManyShotPromptingCopy;
}

export const ManyShotPromptingVisual = React.memo(({ copy }: ManyShotPromptingProps) => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  // Generate accuracy curve data: accuracy = 50 + 35 * (1 - e^(-n/20))
  const dataPoints = useMemo(() => {
    const points: { n: number; accuracy: number }[] = [];
    for (let n = 0; n <= 100; n += 5) {
      const accuracy = 50 + 35 * (1 - Math.exp(-n / 20));
      points.push({ n, accuracy: Math.round(accuracy * 10) / 10 });
    }
    return points;
  }, []);

  const svgWidth = 400;
  const svgHeight = 220;
  const padding = { top: 20, right: 20, bottom: 40, left: 45 };
  const chartW = svgWidth - padding.left - padding.right;
  const chartH = svgHeight - padding.top - padding.bottom;

  const xScale = (n: number) => padding.left + (n / 100) * chartW;
  const yScale = (acc: number) => padding.top + chartH - ((acc - 50) / 40) * chartH;

  const pathD = dataPoints
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${xScale(p.n)} ${yScale(p.accuracy)}`)
    .join(' ');

  // Few-shot zone (0-5)
  const fewShotX = xScale(5);
  // Many-shot zone (50+)
  const manyShotX = xScale(50);

  return (
    <div style={{
      width: '100%',
      padding: '24px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    }}>
      <h3 style={{
        margin: 0,
        fontSize: sw.fsBody,
        fontWeight: 600,
        color: sw.text,
        textAlign: 'center',
      }}>
        {copy.title}
      </h3>

      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%' }}>
        {/* Grid lines */}
        {[50, 60, 70, 80, 90].map((val) => (
          <g key={val}>
            <line
              x1={padding.left} y1={yScale(val)}
              x2={svgWidth - padding.right} y2={yScale(val)}
              stroke={sw.borderSubtle} strokeWidth="0.5" strokeDasharray="4 4"
            />
            <text x={padding.left - 8} y={yScale(val) + 4} textAnchor="end" fill={sw.textMuted} fontSize="10">
              {val}
            </text>
          </g>
        ))}

        {/* X axis labels */}
        {[0, 20, 40, 60, 80, 100].map((val) => (
          <text key={val} x={xScale(val)} y={svgHeight - 8} textAnchor="middle" fill={sw.textMuted} fontSize="10">
            {val}
          </text>
        ))}

        {/* Axis labels */}
        <text x={svgWidth / 2} y={svgHeight - 0} textAnchor="middle" fill={sw.textDim} fontSize="11">
          {copy.xLabel}
        </text>
        <text x={8} y={svgHeight / 2} textAnchor="middle" fill={sw.textDim} fontSize="11" transform={`rotate(-90, 8, ${svgHeight / 2})`}>
          {copy.yLabel}
        </text>

        {/* Few-shot zone */}
        <rect x={padding.left} y={padding.top} width={fewShotX - padding.left} height={chartH} fill={`${sw.yellow}08`} />
        <text x={(padding.left + fewShotX) / 2} y={padding.top + 14} textAnchor="middle" fill={sw.yellow} fontSize="9" fontWeight="600">
          {copy.fewShotLabel}
        </text>

        {/* Many-shot zone */}
        <rect x={manyShotX} y={padding.top} width={svgWidth - padding.right - manyShotX} height={chartH} fill={`${sw.cyan}08`} />
        <text x={(manyShotX + svgWidth - padding.right) / 2} y={padding.top + 14} textAnchor="middle" fill={sw.cyan} fontSize="9" fontWeight="600">
          {copy.manyShotLabel}
        </text>

        {/* Curve */}
        <path d={pathD} fill="none" stroke={sw.cyan} strokeWidth="2.5" />

        {/* Interactive data points */}
        {dataPoints.filter((_, i) => i % 4 === 0).map((p, i) => {
          const isHovered = hoveredPoint === i;
          return (
            <g
              key={i}
              onMouseOver={() => setHoveredPoint(i)}
              onMouseOut={() => setHoveredPoint(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle
                cx={xScale(p.n)} cy={yScale(p.accuracy)}
                r={isHovered ? 6 : 3.5}
                fill={isHovered ? sw.cyan : `${sw.cyan}88`}
                stroke={sw.surface} strokeWidth="1.5"
              />
              {isHovered && (
                <text x={xScale(p.n)} y={yScale(p.accuracy) - 12} textAnchor="middle" fill={sw.text} fontSize="10" fontWeight="600">
                  {p.n} ex → {p.accuracy}%
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div style={{ textAlign: 'center', fontSize: sw.fsSmall, color: sw.green, fontWeight: 600 }}>
        ↑ {copy.improvementLabel}
      </div>
    </div>
  );
});
