import React from 'react';
import type { ApiLatencyGrowthVisualCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';

interface ApiLatencyGrowthVisualProps {
  copy: ApiLatencyGrowthVisualCopy;
}

type ChartPoint = {
  x: number;
  y: number;
};

const fontFamily = "'Space Grotesk', 'Inter', 'Segoe UI', Arial, sans-serif";

const shellStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 10,
};

const summaryGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1fr)',
  gap: 10,
  alignItems: 'end',
};

const summaryBlockStyle: React.CSSProperties = {
  display: 'grid',
  gap: 6,
  minWidth: 0,
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--sw-cyan)',
};

const titleStyle: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: 'var(--sw-text)',
  lineHeight: 1.2,
};

const descriptionStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 12.5,
  lineHeight: 1.45,
  color: 'var(--sw-text-dim)',
};

const metricsGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
  gap: 8,
};

const metricCardStyle = (accent: string): React.CSSProperties => ({
  padding: '8px 10px',
  borderRadius: 11,
  background: 'rgba(255,255,255,0.03)',
  border: `1px solid ${accent}33`,
  boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03), 0 12px 28px rgba(0,0,0,0.12)`,
  minWidth: 0,
});

const metricTitleStyle: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--sw-text-muted)',
};

const metricRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  gap: 6,
  marginTop: 5,
  minWidth: 0,
};

const metricValueStyle: React.CSSProperties = {
  fontSize: 16,
  lineHeight: 1.05,
  fontWeight: 800,
  letterSpacing: '-0.04em',
  color: 'var(--sw-text)',
};

const metricDescriptionStyle: React.CSSProperties = {
  fontSize: 10.5,
  lineHeight: 1.35,
  color: 'var(--sw-text-dim)',
};

const chartShellStyle: React.CSSProperties = {
  position: 'relative',
  flex: 1,
  minHeight: 0,
  borderRadius: 18,
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.06)',
  background:
    'radial-gradient(circle at 18% 18%, rgba(0, 229, 255, 0.12), transparent 26%), radial-gradient(circle at 82% 14%, rgba(255, 46, 151, 0.12), transparent 24%), linear-gradient(180deg, rgba(8, 12, 24, 0.96), rgba(7, 10, 20, 0.98))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 24px 42px rgba(0,0,0,0.24)',
};

const footerStyle: React.CSSProperties = {
  fontSize: 11.5,
  lineHeight: 1.45,
  color: 'var(--sw-text-muted)',
};

const legendRowStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 8,
  alignItems: 'center',
};

const bottomBarStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'auto minmax(0, 1fr)',
  gap: 12,
  alignItems: 'start',
};

const badgeStyle = (accent: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 10px',
  borderRadius: 999,
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: '0.01em',
  color: 'var(--sw-text)',
  background: `${accent}18`,
  border: `1px solid ${accent}35`,
  whiteSpace: 'nowrap',
});

const chartPadding = {
  left: 70,
  right: 32,
  top: 42,
  bottom: 58,
};

const chartWidth = 640;
const chartHeight = 344;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const toScreenPoint = (users: number, latency: number, minUsers: number, maxUsers: number, minLatency: number, maxLatency: number): ChartPoint => {
  const xRange = chartWidth - chartPadding.left - chartPadding.right;
  const yRange = chartHeight - chartPadding.top - chartPadding.bottom;
  const x = chartPadding.left + ((users - minUsers) / (maxUsers - minUsers || 1)) * xRange;
  const y = chartHeight - chartPadding.bottom - ((latency - minLatency) / (maxLatency - minLatency || 1)) * yRange;

  return {
    x: clamp(x, chartPadding.left, chartWidth - chartPadding.right),
    y: clamp(y, chartPadding.top, chartHeight - chartPadding.bottom),
  };
};

const buildSmoothPath = (points: ChartPoint[]) => {
  if (points.length === 0) {
    return '';
  }

  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`;
  }

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const p0 = points[index - 1] ?? points[index];
    const p1 = points[index];
    const p2 = points[index + 1];
    const p3 = points[index + 2] ?? p2;

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
  }

  return path;
};

type GuideCallout = {
  xOffset: number;
  yOffset: number;
  width: number;
};

const guideCalloutLayouts: GuideCallout[] = [
  { xOffset: 14, yOffset: -50, width: 152 },
  { xOffset: -12, yOffset: 18, width: 140 },
  { xOffset: -160, yOffset: -12, width: 152 },
];

const splitGuideLabel = (label: string) => {
  const parts = label.split(':').map(part => part.trim()).filter(Boolean);
  if (parts.length >= 2) {
    return [parts[0], parts.slice(1).join(': ')] as const;
  }

  const words = label.trim().split(/\s+/);
  if (words.length <= 2) {
    return [label, ''] as const;
  }

  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')] as const;
};

export const ApiLatencyGrowthVisual: React.FC<ApiLatencyGrowthVisualProps> = ({ copy }) => {
  const minUsers = Math.min(...copy.points.map(point => point.users));
  const maxUsers = Math.max(...copy.points.map(point => point.users));
  const minLatency = Math.min(...copy.points.map(point => point.latency));
  const maxLatency = Math.max(...copy.points.map(point => point.latency));
  const chartPoints = copy.points.map(point => toScreenPoint(point.users, point.latency, minUsers, maxUsers, minLatency, maxLatency));
  const curvePath = buildSmoothPath(chartPoints);
  const referencePath = `M ${chartPoints[0].x} ${chartPoints[0].y} L ${chartPoints[chartPoints.length - 1].x} ${chartPoints[chartPoints.length - 1].y}`;
  const guideIndexes = [0, 4, chartPoints.length - 1];
  const guideLabels = [copy.lowLoadLabel, copy.saturationLabel, copy.explosionLabel];

  return (
    <div style={shellStyle}>
      <PanelCard minHeight={0} gap={10}>
        <div style={summaryGridStyle}>
          <div style={summaryBlockStyle}>
            <div style={eyebrowStyle}>{copy.eyebrow}</div>
            <div style={{ display: 'grid', gap: 6 }}>
              <div style={titleStyle}>{copy.title}</div>
              <p style={descriptionStyle}>{copy.description}</p>
            </div>
          </div>

          <div style={metricsGridStyle}>
            {copy.metrics.map(metric => (
              <div key={`${metric.title}-${metric.value}`} style={metricCardStyle(metric.accent)}>
                <div style={metricTitleStyle}>{metric.title}</div>
                <div style={metricRowStyle}>
                  <div style={{ ...metricValueStyle, color: metric.accent }}>{metric.value}</div>
                  <div style={metricDescriptionStyle}>{metric.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={chartShellStyle}>
          <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="100%" role="img" aria-label={copy.title} style={{ display: 'block' }}>
            <defs>
              <linearGradient id="api-latency-curve" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00e5ff" />
                <stop offset="55%" stopColor="#ff2e97" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
              <linearGradient id="api-latency-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.24" />
                <stop offset="100%" stopColor="#ff2e97" stopOpacity="0.04" />
              </linearGradient>
              <filter id="api-latency-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect x="0" y="0" width={chartWidth} height={chartHeight} fill="rgba(255,255,255,0.015)" />

            {[120, 220, 320, 420, 520, 620].map(x => (
              <line key={`grid-v-${x}`} x1={x} y1={chartPadding.top} x2={x} y2={chartHeight - chartPadding.bottom} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}
            {[96, 156, 216, 276, 336].map(y => (
              <line key={`grid-h-${y}`} x1={chartPadding.left} y1={y} x2={chartWidth - chartPadding.right} y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
            ))}

            <line x1={chartPadding.left} y1={chartHeight - chartPadding.bottom} x2={chartWidth - chartPadding.right} y2={chartHeight - chartPadding.bottom} stroke="rgba(255,255,255,0.36)" strokeWidth="2.2" />
            <line x1={chartPadding.left} y1={chartHeight - chartPadding.bottom} x2={chartPadding.left} y2={chartPadding.top} stroke="rgba(255,255,255,0.36)" strokeWidth="2.2" />

            <path d={`${referencePath}`} fill="none" stroke="rgba(255,255,255,0.24)" strokeDasharray="8 8" strokeWidth="2.4" />
            <path d={`${curvePath}`} fill="none" stroke="url(#api-latency-curve)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" filter="url(#api-latency-glow)" />
            <path d={`${curvePath} L ${chartPoints[chartPoints.length - 1].x} ${chartHeight - chartPadding.bottom} L ${chartPoints[0].x} ${chartHeight - chartPadding.bottom} Z`} fill="url(#api-latency-fill)" opacity="0.34" />

            {copy.points.map((point, index) => {
              const screenPoint = chartPoints[index];
              const isHighlight = guideIndexes.includes(index);
              const pointRadius = isHighlight ? 7 : 5.3;
              const outerRadius = isHighlight ? 13 : 9;

              return (
                <g key={point.label}>
                  <circle cx={screenPoint.x} cy={screenPoint.y} r={outerRadius} fill={point.accent} opacity="0.14" />
                  <circle cx={screenPoint.x} cy={screenPoint.y} r={pointRadius} fill={point.accent} stroke="rgba(255,255,255,0.92)" strokeWidth={1.5} />
                  <text
                    x={screenPoint.x}
                    y={screenPoint.y - 15}
                    textAnchor="middle"
                    fontSize="10.5"
                    fontFamily={fontFamily}
                    fill="rgba(248,250,252,0.86)"
                  >
                    {point.label}
                  </text>
                </g>
              );
            })}

            {guideIndexes.map((index, guideIndex) => {
              const point = chartPoints[index];
              const label = guideLabels[guideIndex];
              const layout = guideCalloutLayouts[guideIndex];
              const [primaryLine, secondaryLine] = splitGuideLabel(label);

              return (
                <g key={`${label}-${index}`}>
                  <rect
                    x={point.x + layout.xOffset}
                    y={point.y + layout.yOffset}
                    width={layout.width}
                    height="42"
                    rx="12"
                    fill="rgba(8, 12, 24, 0.84)"
                    stroke="rgba(255,255,255,0.08)"
                  />
                  <text
                    x={point.x + layout.xOffset + 12}
                    y={point.y + layout.yOffset + 16}
                    fontSize="10.5"
                    fontWeight="700"
                    fontFamily={fontFamily}
                    fill="rgba(248,250,252,0.92)"
                  >
                    {primaryLine}
                  </text>
                  <text
                    x={point.x + layout.xOffset + 12}
                    y={point.y + layout.yOffset + 30}
                    fontSize="10"
                    fontWeight="500"
                    fontFamily={fontFamily}
                    fill="rgba(248,250,252,0.74)"
                  >
                    {secondaryLine}
                  </text>
                </g>
              );
            })}

            <text x={chartWidth - 34} y={chartPadding.top + 16} textAnchor="end" fontSize="11.5" fontFamily={fontFamily} fill="rgba(248,250,252,0.76)">
              {copy.referenceLabel}
            </text>
            <text x={chartPadding.left + 10} y={chartHeight - 14} fontSize="11.5" fontFamily={fontFamily} fill="rgba(248,250,252,0.76)">
              {copy.xLabel}
            </text>
            <text
              x={18}
              y={chartHeight / 2}
              transform={`rotate(-90 18 ${chartHeight / 2})`}
              textAnchor="middle"
              fontSize="11.5"
              fontFamily={fontFamily}
              fill="rgba(248,250,252,0.76)"
            >
              {copy.yLabel}
            </text>
          </svg>
        </div>

        <div style={bottomBarStyle}>
          <div style={{ display: 'grid', gap: 5 }}>
            <div style={eyebrowStyle}>{copy.legendTitle}</div>
            <div style={legendRowStyle}>
              <span style={badgeStyle('#00e5ff')}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: '#00e5ff', boxShadow: '0 0 18px rgba(0,229,255,0.55)' }} />
                {copy.curveLabel}
              </span>
              <span style={badgeStyle('#f8fafc')}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(248,250,252,0.88)', boxShadow: '0 0 18px rgba(248,250,252,0.35)' }} />
                {copy.referenceLabel}
              </span>
            </div>
          </div>

          <div style={footerStyle}>{copy.footer}</div>
        </div>
      </PanelCard>
    </div>
  );
};

