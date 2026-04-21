import React from 'react';

interface LossChartProps {
  lossHistory: number[];
  totalEpochs: number;
  convergenceThreshold: number;
  accent: string;
}

export const LossChart: React.FC<LossChartProps> = ({
  lossHistory,
  totalEpochs,
  convergenceThreshold,
  accent,
}) => {
  const width = 260;
  const height = 80;
  const padding = { top: 8, right: 8, bottom: 16, left: 36 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const maxLoss = Math.max(...lossHistory, 0.3);
  const minLoss = Math.min(...lossHistory, 0);

  const points = lossHistory.map((loss, i) => {
    const x = padding.left + (i / Math.max(totalEpochs - 1, 1)) * chartW;
    const y = padding.top + (1 - (loss - minLoss) / (maxLoss - minLoss || 1)) * chartH;
    return { x, y, loss, epoch: i + 1 };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

  const convergY = padding.top + (1 - (convergenceThreshold - minLoss) / (maxLoss - minLoss || 1)) * chartH;
  const thresholdInChart = convergY > padding.top && convergY < padding.top + chartH;

  const formatLoss = (v: number) => v < 0.001 ? v.toFixed(6) : v < 0.01 ? v.toFixed(5) : v.toFixed(4);

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="100%" aria-label="Loss chart">
      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => (
        <line
          key={frac}
          x1={padding.left}
          y1={padding.top + frac * chartH}
          x2={padding.left + chartW}
          y2={padding.top + frac * chartH}
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={1}
        />
      ))}

      {/* Y axis labels */}
      {[0, 0.25, 0.5, 0.75, 1].map((frac) => {
        const val = maxLoss - frac * (maxLoss - minLoss);
        return (
          <text
            key={frac}
            x={padding.left - 4}
            y={padding.top + frac * chartH + 3}
            textAnchor="end"
            fontSize={8}
            fill="var(--sw-text-dim)"
          >
            {formatLoss(val)}
          </text>
        );
      })}

      {/* Convergence threshold line */}
      {thresholdInChart && (
        <>
          <line
            x1={padding.left}
            y1={convergY}
            x2={padding.left + chartW}
            y2={convergY}
            stroke="#22c55e"
            strokeWidth={1}
            strokeDasharray="4 3"
            opacity={0.5}
          />
          <text
            x={padding.left + chartW + 2}
            y={convergY + 3}
            fontSize={7}
            fill="#22c55e"
            opacity={0.7}
          >
            threshold
          </text>
        </>
      )}

      {/* Loss line */}
      {points.length > 1 && (
        <>
          <path
            d={pathD}
            fill="none"
            stroke={accent}
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
          {/* End dot */}
          {points.length > 0 && (
            <circle
              cx={points[points.length - 1].x}
              cy={points[points.length - 1].y}
              r={3}
              fill={accent}
              opacity={0.9}
            />
          )}
        </>
      )}

      {/* X axis label */}
      <text
        x={padding.left + chartW / 2}
        y={height - 2}
        textAnchor="middle"
        fontSize={8}
        fill="var(--sw-text-dim)"
      >
        epochs
      </text>
    </svg>
  );
};
