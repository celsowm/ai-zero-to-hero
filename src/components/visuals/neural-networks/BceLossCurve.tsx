import React, { useMemo, useState } from 'react';
import type { BceLossCurveCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: BceLossCurveCopy;
}

const W = 600;
const H = 320;
const PAD = { top: 28, right: 32, bottom: 44, left: 56 };

function bceLoss(p: number): number {
  return -Math.log(Math.max(p, 1e-7));
}

function xC(v: number) {
  return PAD.left + (v / 1) * (W - PAD.left - PAD.right);
}

function yC(v: number, max: number) {
  const h = H - PAD.top - PAD.bottom;
  const n = Math.max(0, Math.min(1, v / max));
  return H - PAD.bottom - n * h;
}

function curvePath(max: number) {
  return Array.from({ length: 200 }, (_, i) => {
    const p = 0.01 + i * 0.005;
    return `${i === 0 ? 'M' : 'L'} ${xC(p)} ${yC(bceLoss(p), max)}`;
  }).join(' ');
}

function fmt(v: number): string {
  return v.toFixed(2).replace(/\.?0+$/, '');
}

interface PointDef {
  p: number;
  label: string;
  color: string;
  tooltipKey: keyof Pick<BceLossCurveCopy, 'tooltipNearMiss' | 'tooltipConfident' | 'tooltipAlmost' | 'tooltipRight'>;
}

export const BceLossCurve = React.memo(({ copy }: Props) => {
  const maxLoss = 5;
  const [hovered, setHovered] = useState<string | null>(null);

  const points: PointDef[] = useMemo(
    () => [
      { p: 0.01, label: copy.confidentWrong, color: sw.pink, tooltipKey: 'tooltipConfident' },
      { p: 0.3, label: copy.nearMiss, color: sw.yellow, tooltipKey: 'tooltipNearMiss' },
      { p: 0.6, label: copy.almostRight, color: sw.green, tooltipKey: 'tooltipAlmost' },
      { p: 0.9, label: copy.rightAnswer, color: sw.cyan, tooltipKey: 'tooltipRight' },
    ],
    [copy],
  );

  const pathD = useMemo(() => curvePath(maxLoss), [maxLoss]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
      {/* ── Chart ── */}
      <PanelCard style={{ padding: 0, overflow: 'hidden' }}>
        <svg
          viewBox={`0 0 ${W} ${H}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label={copy.title}
        >
          {/* Grid lines */}
          {[0, 1, 2, 3, 4, 5].map((v) => (
            <g key={`grid-${v}`}>
              <line
                x1={PAD.left}
                y1={yC(v, maxLoss)}
                x2={W - PAD.right}
                y2={yC(v, maxLoss)}
                stroke={sw.gridLine}
                strokeWidth={1}
                strokeDasharray={v === 0 ? '0' : '4 4'}
              />
              <text
                x={PAD.left - 8}
                y={yC(v, maxLoss) + 4}
                textAnchor="end"
                fill={sw.textMuted}
                fontSize={11}
              >
                {v}
              </text>
            </g>
          ))}

          {/* X axis labels */}
          {[0, 0.2, 0.4, 0.6, 0.8, 1.0].map((v) => (
            <text
              key={`x-${v}`}
              x={xC(v)}
              y={H - PAD.bottom + 20}
              textAnchor="middle"
              fill={sw.textMuted}
              fontSize={11}
            >
              {v.toFixed(1)}
            </text>
          ))}

          {/* Axis labels */}
          <text
            x={W / 2}
            y={H - 4}
            textAnchor="middle"
            fill={sw.text}
            fontSize={12}
            fontWeight={600}
          >
            {copy.xAxis}
          </text>
          <text
            x={14}
            y={H / 2}
            textAnchor="middle"
            fill={sw.text}
            fontSize={12}
            fontWeight={600}
            transform={`rotate(-90, 14, ${H / 2})`}
          >
            {copy.yAxis}
          </text>

          {/* Curve */}
          <path
            d={pathD}
            fill="none"
            stroke={sw.cyan}
            strokeWidth={3}
            strokeLinecap="round"
          />

          {/* Gradient fill under curve */}
          <defs>
            <linearGradient id="bce-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sw.pink} stopOpacity={0.3} />
              <stop offset="100%" stopColor={sw.cyan} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <path
            d={`${pathD} L ${xC(1.0)} ${yC(0, maxLoss)} L ${xC(0.01)} ${yC(0, maxLoss)} Z`}
            fill="url(#bce-gradient)"
          />

          {/* Points */}
          {points.map((pt) => {
            const loss = bceLoss(pt.p);
            const clampedLoss = Math.min(loss, maxLoss);
            const isHovered = hovered === pt.label;
            return (
              <g
                key={pt.label}
                onMouseEnter={() => setHovered(pt.label)}
                onMouseLeave={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Vertical dashed line */}
                <line
                  x1={xC(pt.p)}
                  y1={yC(clampedLoss, maxLoss)}
                  x2={xC(pt.p)}
                  y2={yC(0, maxLoss)}
                  stroke={pt.color}
                  strokeWidth={1}
                  strokeDasharray="3 3"
                  opacity={isHovered ? 1 : 0.4}
                />
                {/* Dot */}
                <circle
                  cx={xC(pt.p)}
                  cy={yC(clampedLoss, maxLoss)}
                  r={isHovered ? 8 : 6}
                  fill={pt.color}
                  stroke={sw.void}
                  strokeWidth={2}
                  style={{ transition: 'r 0.15s ease' }}
                />
                {/* Label */}
                <text
                  x={xC(pt.p)}
                  y={yC(clampedLoss, maxLoss) - 14}
                  textAnchor="middle"
                  fill={pt.color}
                  fontSize={10}
                  fontWeight={600}
                  opacity={isHovered ? 1 : 0.7}
                >
                  {pt.label}
                </text>
                {/* Tooltip on hover */}
                {isHovered && (
                  <g>
                    <rect
                      x={xC(pt.p) - 75}
                      y={yC(clampedLoss, maxLoss) - 48}
                      width={150}
                      height={30}
                      rx={6}
                      fill={sw.surface}
                      stroke={pt.color}
                      strokeWidth={1}
                      opacity={0.95}
                    />
                    <text
                      x={xC(pt.p)}
                      y={yC(clampedLoss, maxLoss) - 30}
                      textAnchor="middle"
                      fill={sw.text}
                      fontSize={10}
                    >
                      {copy[pt.tooltipKey].replace('{value}', fmt(loss))}
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Asymptote arrow */}
          <text
            x={xC(0.01) - 4}
            y={yC(maxLoss, maxLoss) - 8}
            textAnchor="end"
            fill={sw.pink}
            fontSize={10}
            fontStyle="italic"
          >
            → ∞
          </text>
        </svg>
      </PanelCard>

      {/* ── Insight panel ── */}
      <div
        style={{
          display: 'flex',
          gap: 12,
          alignItems: 'flex-start',
          padding: '12px 16px',
          borderRadius: 12,
          background: sw.tintStrong,
          border: `1px solid ${sw.borderSubtle}`,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: `${sw.pink}20`,
            border: `1px solid ${sw.pink}50`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            fontSize: 16,
          }}
        >
          💡
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: sw.text }}>
            {copy.insightShort}
          </p>
          <p style={{ margin: '4px 0 0', fontSize: 12, color: sw.textMuted, lineHeight: 1.5 }}>
            {copy.insight}
          </p>
        </div>
      </div>

      {/* ── Key points table ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 8,
        }}
      >
        {points.map((pt) => {
          const loss = bceLoss(pt.p);
          return (
            <div
              key={pt.label}
              style={{
                padding: '10px 12px',
                borderRadius: 10,
                background: `${pt.color}10`,
                border: `1px solid ${pt.color}30`,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 10, color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                p = {pt.p}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: pt.color, marginTop: 2 }}>
                {loss > 99 ? '∞' : fmt(loss)}
              </div>
              <div style={{ fontSize: 11, color: sw.textDim, marginTop: 2 }}>
                {pt.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
