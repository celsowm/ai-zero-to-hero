import React, { useMemo, useState } from 'react';
import type { SigmoidDerivativeExplorerCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';

interface Props {
  copy: SigmoidDerivativeExplorerCopy;
}

const W = 600;
const H = 280;
const PAD = { top: 22, right: 28, bottom: 34, left: 42 };

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x: number) {
  const y = sigmoid(x);
  return y * (1 - y);
}

function xC(v: number) {
  return PAD.left + ((v + 6) / 12) * (W - PAD.left - PAD.right);
}

function yC(v: number, max: number) {
  const h = H - PAD.top - PAD.bottom;
  const n = Math.max(0, Math.min(1, v / max));
  return H - PAD.bottom - n * h;
}

function path(fn: (z: number) => number, max: number) {
  return Array.from({ length: 241 }, (_, i) => {
    const z = -6 + i * 0.05;
    return `${i === 0 ? 'M' : 'L'} ${xC(z)} ${yC(fn(z), max)}`;
  }).join(' ');
}

function fmt(v: number) {
  return v.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
}

function zone(z: number): { key: 'center' | 'transition' | 'tail'; color: string } {
  const abs = Math.abs(z);
  if (abs < 1.5) return { key: 'center', color: '#16e0ff' };
  if (abs < 3.5) return { key: 'transition', color: '#f0c040' };
  return { key: 'tail', color: '#ff5da2' };
}

export const SigmoidDerivativeExplorer = React.memo(({ copy }: Props) => {
  const [z, setZ] = useState(0.4);
  const sig = sigmoid(z);
  const deriv = dsigmoid(z);
  const equivalent = sig * (1 - sig);
  const zoneInfo = zone(z);
  const curves = useMemo(() => ({ sig: path(sigmoid, 1), deriv: path(dsigmoid, 0.25) }), []);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
      {/* ── TOP: Slider + live readouts ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 16,
          alignItems: 'center',
          padding: '12px 18px',
          borderRadius: 16,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', minWidth: 0 }}>
          <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', whiteSpace: 'nowrap' }}>
            {copy.sliderLabel}
          </span>
          <input
            type="range"
            min={-6}
            max={6}
            step={0.1}
            value={z}
            onChange={(e) => setZ(Number(e.target.value))}
            style={{ flex: 1, minWidth: 80, accentColor: '#16e0ff' }}
          />
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <Readout label="z" value={z.toFixed(2)} color="#93a4bb" />
          <Readout label={copy.sigmoidLabel} value={sig.toFixed(4)} color="#16e0ff" />
          <Readout label={copy.derivativeLabel} value={fmt(deriv)} color="#ff5da2" />
          <Readout label={copy.equivalenceLabel} value={fmt(equivalent)} color="#66b84a" />
          <div
            style={{
              padding: '4px 12px',
              borderRadius: 999,
              background: `${zoneInfo.color}18`,
              border: `1px solid ${zoneInfo.color}44`,
              fontSize: 11,
              color: zoneInfo.color,
              fontWeight: 700,
              whiteSpace: 'nowrap',
            }}
          >
            {copy.zones[zoneInfo.key]}
          </div>
        </div>
      </div>

      {/* ── MIDDLE: Two charts side by side ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, flex: 1, minHeight: 0 }}>
        <ChartPanel
          title={copy.sigmoidChartTitle}
          accent="#16e0ff"
          curvePath={curves.sig}
          maxY={1}
          yTicks={[0, 0.5, 1]}
          z={z}
          pointValue={sig}
          ariaLabel={copy.ariaLabel}
        />
        <ChartPanel
          title={copy.derivativeChartTitle}
          accent="#ff5da2"
          curvePath={curves.deriv}
          maxY={0.25}
          yTicks={[0, 0.125, 0.25]}
          z={z}
          pointValue={deriv}
          ariaLabel={copy.ariaLabel}
          referenceLine={{
            value: 0.25,
            label: copy.maxDerivativeLabel,
          }}
        />
      </div>

      {/* ── BOTTOM: Three insight cards in a row ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
        <InsightCard eyebrow={copy.peakTitle} body={copy.peakBody} accent="#16e0ff" />
        <InsightCard eyebrow={copy.saturationTitle} body={copy.saturationBody} accent="#ff5da2" />
        <InsightCard eyebrow={copy.trainingTitle} body={copy.trainingBody} accent="#66b84a" />
      </div>
    </div>
  )
});

/* ── Sub-components ── */

const Readout: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</span>
    <strong style={{ color, fontFamily: 'monospace', fontSize: 14, fontWeight: 900 }}>{value}</strong>
  </div>
);

const ChartPanel: React.FC<{
  title: string;
  accent: string;
  curvePath: string;
  maxY: number;
  yTicks: number[];
  z: number;
  pointValue: number;
  ariaLabel: string;
  referenceLine?: {
    value: number;
    label: string;
  };
}> = ({ title, accent, curvePath, maxY, yTicks, z, pointValue, ariaLabel, referenceLine }) => {
  const px = xC(z);
  const py = yC(pointValue, maxY);

  return (
    <PanelCard
      minHeight={0}
      padding={16}
      gap={8}
      style={{
        flex: 1,
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), radial-gradient(circle at 50% 20%, rgba(22,224,255,0.08), rgba(10,12,19,0.96) 55%)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={{ fontSize: 11, color: accent, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>{title}</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>{fmt(pointValue)}</span>
      </div>

      <div style={{ flex: 1, minHeight: 0, borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)' }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" aria-label={ariaLabel} style={{ display: 'block' }}>
          <defs>
            <filter id={`glow-${title}`}>
              <feGaussianBlur stdDeviation="3" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* grid */}
          {[-6, -3, 0, 3, 6].map((t) => (
            <g key={`x${t}`}>
              <line x1={xC(t)} x2={xC(t)} y1={PAD.top} y2={H - PAD.bottom} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6" />
              <text x={xC(t)} y={H - 12} fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">{t}</text>
            </g>
          ))}
          {yTicks.map((t) => (
            <g key={`y${t}`}>
              <line x1={PAD.left} x2={W - PAD.right} y1={yC(t, maxY)} y2={yC(t, maxY)} stroke={t === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.06)'} strokeDasharray={t === 0 ? 'none' : '4 6'} />
              <text x={8} y={yC(t, maxY) + 4} fill="rgba(255,255,255,0.4)" fontSize="10">{fmt(t)}</text>
            </g>
          ))}

          {referenceLine ? (
            <g>
              <line x1={PAD.left} x2={W - PAD.right} y1={yC(referenceLine.value, maxY)} y2={yC(referenceLine.value, maxY)} stroke="#66b84a" strokeDasharray="7 7" opacity="0.8" />
              <text x={W - PAD.right - 4} y={yC(referenceLine.value, maxY) - 8} fill="#66b84a" fontSize="10" textAnchor="end">
                {referenceLine.label}
              </text>
            </g>
          ) : null}

          {/* zero axis */}
          <line x1={xC(0)} x2={xC(0)} y1={PAD.top} y2={H - PAD.bottom} stroke="rgba(255,255,255,0.18)" />

          {/* curve */}
          <path d={curvePath} fill="none" stroke={accent} strokeWidth="3.5" strokeLinecap="round" filter={`url(#glow-${title})`} />

          {/* marker */}
          <line x1={px} x2={px} y1={PAD.top} y2={H - PAD.bottom} stroke={accent} strokeDasharray="5 7" opacity="0.5" />
          <circle cx={px} cy={py} r="18" fill={accent} opacity="0.08" />
          <circle cx={px} cy={py} r="7" fill={accent} />
        </svg>
      </div>
    </PanelCard>
  );
};

const InsightCard: React.FC<{ eyebrow: string; body: string; accent: string }> = ({ eyebrow, body, accent }) => (
  <PanelCard
    minHeight={0}
    padding={16}
    gap={6}
    style={{
      background: `linear-gradient(180deg, ${accent}0d, rgba(255,255,255,0.02))`,
      border: `1px solid ${accent}30`,
    }}
  >
    <div style={{ fontSize: 10, color: accent, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>{eyebrow}</div>
    <div style={{ fontSize: 12.5, color: 'var(--sw-text-dim)', lineHeight: 1.7 }}>{body}</div>
  </PanelCard>
);
