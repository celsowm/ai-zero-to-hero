import React from 'react';
import { sw } from '../../../theme/tokens';

interface Props {
  history: number[];
  total: number;
  threshold: number;
}

export const MiniLossChart: React.FC<Props> = ({ history, total, threshold }) => {
  if (history.length < 2) {
    return null;
  }

  const width = 200;
  const height = 60;
  const padding = { top: 6, right: 4, bottom: 12, left: 28 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const maxLoss = Math.max(...history, threshold, 0.3);
  const points = history.map((loss, index) => ({
    x: padding.left + (index / Math.max(total - 1, 1)) * chartWidth,
    y: padding.top + (1 - loss / maxLoss) * chartHeight,
  }));
  const path = points.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ');
  const thresholdY = padding.top + (1 - threshold / maxLoss) * chartHeight;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height} style={{ display: 'block' }}>
      {thresholdY > padding.top && thresholdY < padding.top + chartHeight ? (
        <line
          x1={padding.left}
          y1={thresholdY}
          x2={padding.left + chartWidth}
          y2={thresholdY}
          stroke="#22c55e"
          strokeWidth={0.6}
          strokeDasharray="3 2"
          opacity={0.4}
        />
      ) : null}
      <path d={path} fill="none" stroke={sw.cyan} strokeWidth={1.2} strokeLinejoin="round" />
      <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r={2} fill={sw.cyan} />
    </svg>
  );
};
