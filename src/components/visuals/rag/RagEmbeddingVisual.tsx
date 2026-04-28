import React, { useEffect, useState, useMemo } from 'react';
import { sw } from '../../../theme/tokens';
import type { RagEmbeddingVisualCopy } from '../../../types/slide';

interface RagEmbeddingVisualProps {
  copy: RagEmbeddingVisualCopy;
}

// Simulated 2D projection of embeddings
const DOC_POINTS = [
  { x: 0.75, y: 0.7, label: 'doc1', color: sw.cyan },
  { x: 0.25, y: 0.2, label: 'doc2', color: '#a855f7' },
  { x: 0.7, y: 0.65, label: 'doc3', color: sw.cyan },
  { x: 0.3, y: 0.75, label: 'doc4', color: sw.yellow },
];

const QUERY_POINT = { x: 0.72, y: 0.68 };

export const RagEmbeddingVisual = React.memo(({ copy }: RagEmbeddingVisualProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 300);
    return () => clearTimeout(t);
  }, []);

  const distances = useMemo(() =>
    DOC_POINTS.map((d) => ({
      ...d,
      dist: Math.sqrt((d.x - QUERY_POINT.x) ** 2 + (d.y - QUERY_POINT.y) ** 2),
    })).sort((a, b) => a.dist - b.dist),
  []);

  const W = 300;
  const H = 220;
  const pad = 30;

  return (
    <div style={{
      width: '100%',
      padding: '16px 12px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: sw.text }}>
        {copy.title}
      </div>

      {/* 2D embedding space visualization */}
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75].map((v) => (
          <React.Fragment key={v}>
            <line x1={pad} y1={pad + v * (H - 2 * pad)} x2={W - pad} y2={pad + v * (H - 2 * pad)} stroke="rgba(255,255,255,0.05)" />
            <line x1={pad + v * (W - 2 * pad)} y1={pad} x2={pad + v * (W - 2 * pad)} y2={H - pad} stroke="rgba(255,255,255,0.05)" />
          </React.Fragment>
        ))}

        {/* Axes labels */}
        <text x={pad + 4} y={pad - 4} fill="var(--sw-text-muted)" fontSize="8">d₁</text>
        <text x={W - pad + 4} y={H - pad + 12} fill="var(--sw-text-muted)" fontSize="8">d₀</text>

        {/* Distance circles from query */}
        {distances.slice(0, 2).map((d, i) => (
          <circle
            key={`circle-${i}`}
            cx={pad + QUERY_POINT.x * (W - 2 * pad)}
            cy={pad + QUERY_POINT.y * (H - 2 * pad)}
            r={d.dist * (W - 2 * pad) * 1.1}
            fill="none"
            stroke={d.color}
            strokeWidth="1"
            strokeDasharray="3,3"
            opacity={0.2}
          />
        ))}

        {/* Document points */}
        {distances.map((d) => {
          const cx = pad + d.x * (W - 2 * pad);
          const cy = pad + d.y * (H - 2 * pad);
          const isClose = d.dist < 0.15;
          const rank = distances.findIndex((dd) => dd.label === d.label) + 1;
          return (
            <g key={d.label}>
              <circle
                cx={cx}
                cy={cy}
                r={isClose ? 12 : 8}
                fill={d.color}
                opacity={mounted ? (isClose ? 0.8 : 0.3) : 0.1}
              />
              <text
                x={cx}
                y={cy + 3}
                textAnchor="middle"
                fill="#000"
                fontSize={isClose ? '10' : '8'}
                fontWeight={isClose ? 700 : 400}
              >
                {rank <= 2 ? `#${rank}` : ''}
              </text>
              <text
                x={cx}
                y={cy + (isClose ? -16 : -12)}
                textAnchor="middle"
                fill={d.color}
                fontSize="8"
                fontWeight={600}
                opacity={mounted ? 1 : 0}
                style={{ transition: 'opacity 0.5s ease-out 0.3s' }}
              >
                {d.label === 'doc1' ? copy.doc1Label : d.label === 'doc2' ? copy.doc2Label : d.label === 'doc3' ? copy.doc3Label : copy.doc4Label}
              </text>
            </g>
          );
        })}

        {/* Query point */}
        <circle
          cx={pad + QUERY_POINT.x * (W - 2 * pad)}
          cy={pad + QUERY_POINT.y * (H - 2 * pad)}
          r="14"
          fill="none"
          stroke={sw.red}
          strokeWidth="2"
          strokeDasharray="4,2"
          opacity={mounted ? 1 : 0}
          style={{ transition: 'opacity 0.5s ease-out 0.2s' }}
        />
        <text
          x={pad + QUERY_POINT.x * (W - 2 * pad)}
          y={pad + QUERY_POINT.y * (H - 2 * pad) + 4}
          textAnchor="middle"
          fill={sw.red}
          fontSize="10"
          fontWeight={700}
          opacity={mounted ? 1 : 0}
          style={{ transition: 'opacity 0.5s ease-out 0.2s' }}
        >
          ?
        </text>
        <text
          x={pad + QUERY_POINT.x * (W - 2 * pad)}
          y={pad + QUERY_POINT.y * (H - 2 * pad) + 22}
          textAnchor="middle"
          fill={sw.red}
          fontSize="8"
          fontWeight={600}
          opacity={mounted ? 1 : 0}
          style={{ transition: 'opacity 0.5s ease-out 0.4s' }}
        >
          {copy.queryLabel}
        </text>
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '10px' }}>
        <span style={{ color: sw.cyan }}>● {copy.similarLabel}</span>
        <span style={{ color: sw.textMuted }}>● {copy.dissimilarLabel}</span>
      </div>

      {/* Dim label */}
      <div style={{ textAlign: 'center', fontSize: '10px', color: sw.textMuted }}>
        ({copy.embeddingDim})
      </div>
    </div>
  );
});
