import React, { useMemo, useState } from 'react';
import type { QuantizationTheoryWhyCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { ChartFrame } from '../charts/ChartFrame';

interface Props {
  copy: QuantizationTheoryWhyCopy;
}

function gaussian(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

const CHART_W = 380;
const CHART_H = 170;

const s = {
  eyebrow: {
    fontSize: sw.fsEyebrow,
    fontWeight: 700 as const,
    letterSpacing: sw.lsEyebrow,
    textTransform: 'uppercase' as const,
    color: sw.cyan,
  },
  title: {
    fontSize: 15,
    fontWeight: 700 as const,
    color: sw.text,
    margin: 0,
    lineHeight: 1.3,
  },
  body: {
    fontSize: 12,
    lineHeight: 1.55,
    color: sw.textDim,
    margin: 0,
  },
  highlight: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: '8px 12px',
    borderRadius: 10,
    background: sw.tintStronger,
    border: `1px solid ${sw.borderSubtle}`,
    marginTop: 6,
    marginBottom: 6,
  },
  highlightLabel: {
    fontSize: 10,
    fontWeight: 700 as const,
    letterSpacing: sw.lsSmall,
    textTransform: 'uppercase' as const,
    color: sw.textDim,
  },
  highlightValue: {
    fontSize: 13,
    fontWeight: 700 as const,
    color: sw.cyan,
    fontFamily: sw.fontMono,
  },
  bulletRow: {
    display: 'flex' as const,
    alignItems: 'flex-start' as const,
    gap: 8,
    fontSize: 12,
    color: sw.text,
    lineHeight: 1.5,
  },
  bulletDot: {
    flexShrink: 0,
    width: 5,
    height: 5,
    borderRadius: 999,
    background: sw.cyan,
    marginTop: 6,
    boxShadow: `0 0 6px ${sw.cyan}88`,
  },
  footer: {
    marginTop: 6,
    paddingTop: 8,
    borderTop: `1px solid ${sw.borderSubtle}`,
    fontSize: 11,
    color: sw.textMuted,
    lineHeight: 1.5,
  },
};

function Bullets({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'grid', gap: 4 }}>
      {items.map((b, i) => (
        <div key={i} style={s.bulletRow}>
          <span style={s.bulletDot} />
          <span>{b}</span>
        </div>
      ))}
    </div>
  );
}

function HighlightBlock({ label, value }: { label: string; value: string }) {
  return (
    <div style={s.highlight}>
      <span style={s.highlightLabel}>{label}</span>
      <span style={s.highlightValue}>{value}</span>
    </div>
  );
}

function PanelContent({
  title,
  body,
  highlight,
  bullets,
  footer,
}: {
  title: string;
  body: string;
  highlight: { label: string; value: string };
  bullets: string[];
  footer: string;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <h4 style={s.title}>{title}</h4>
      <p style={s.body}>{body}</p>
      <HighlightBlock label={highlight.label} value={highlight.value} />
      <Bullets items={bullets} />
      <div style={s.footer}>{footer}</div>
    </div>
  );
}

const DistributionSection: React.FC<{ copy: QuantizationTheoryWhyCopy }> = ({ copy }) => {
  const curvePoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= 200; i++) {
      const x = -4 + i * 0.04;
      pts.push({ x, y: gaussian(x) });
    }
    return pts;
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PanelContent
        title={copy.distributionPanel.title}
        body={copy.distributionPanel.body}
        highlight={copy.distributionPanel.highlight}
        bullets={copy.distributionPanel.bullets}
        footer={copy.distributionPanel.footer}
      />
      <ChartFrame
        width={CHART_W}
        height={CHART_H}
        xDomain={[-3.5, 3.5]}
        yDomain={[0, 0.45]}
        xLabel="Weight value (σ)"
        yLabel="Density"
        tickCount={5}
      >
        {(ctx) => {
          const y0 = ctx.yScale(0);
          return (
            <>
              {/* Shade ±1σ region (where 68% lives) */}
              <rect
                x={ctx.xScale(-1)} y={ctx.yScale(0.42)}
                width={ctx.xScale(1) - ctx.xScale(-1)} height={y0 - ctx.yScale(0.42)}
                fill={`${sw.cyan}15`}
              />
              <path
                d={curvePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${ctx.xScale(p.x)} ${ctx.yScale(p.y)}`).join(' ')}
                fill="none"
                stroke={sw.cyan}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
              {/* ±1σ and ±2σ vertical guides */}
              {[-2, -1, 1, 2].map((sig) => (
                <line
                  key={sig}
                  x1={ctx.xScale(sig)} y1={y0}
                  x2={ctx.xScale(sig)} y2={ctx.yScale(0.42)}
                  stroke={sw.pink}
                  strokeWidth={1}
                  strokeDasharray="2 3"
                  opacity={0.5}
                />
              ))}
              <text x={ctx.xScale(1.4)} y={ctx.yScale(0.4)} fill={sw.cyan} fontSize={9} fontWeight={700}>
                68% em ±1σ
              </text>
              <text x={ctx.xScale(2.0)} y={ctx.yScale(0.34)} fill={sw.textMuted} fontSize={9}>
                95% em ±2σ
              </text>
            </>
          );
        }}
      </ChartFrame>
    </div>
  );
};

const OutliersSection: React.FC<{ copy: QuantizationTheoryWhyCopy }> = ({ copy }) => {
  const [zoom, setZoom] = useState(1.0);

  const samples = useMemo(() => {
    // 1000 points from N(0,1) — ~0.1% will be >3σ
    const arr: number[] = [];
    let seed = 42;
    const lcg = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 0xffffffff;
    };
    for (let i = 0; i < 1000; i++) {
      const u1 = lcg();
      const u2 = lcg();
      const z = Math.sqrt(-2 * Math.log(Math.max(u1, 1e-10))) * Math.cos(2 * Math.PI * u2);
      arr.push(z);
    }
    return arr;
  }, []);

  const threshold = 3.0;
  const outliers = samples.filter((s) => Math.abs(s) > threshold);
  const outlierMagnitude = outliers.length > 0
    ? (outliers.reduce((max, s) => Math.max(max, Math.abs(s)), 0)).toFixed(1)
    : '0.0';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <PanelContent
        title={copy.outliersPanel.title}
        body={copy.outliersPanel.body}
        highlight={copy.outliersPanel.highlight}
        bullets={copy.outliersPanel.bullets}
        footer={copy.outliersPanel.footer}
      />
      {/* Mini visualization: dots on a 1D axis, outliers in pink */}
      <div
        style={{
          padding: '10px 14px',
          borderRadius: 10,
          background: sw.tintStronger,
          border: `1px solid ${sw.borderSubtle}`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
          <label style={{ fontSize: 10, color: sw.textDim, fontWeight: 600 }}>
            Zoom: {zoom.toFixed(1)}×
          </label>
          <input
            type="range"
            min={1}
            max={5}
            step={0.5}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            style={{ flex: 1, accentColor: sw.cyan }}
          />
        </div>
        <div
          style={{
            position: 'relative',
            height: 56,
            background: `${sw.textMuted}10`,
            borderRadius: 6,
            overflow: 'hidden',
          }}
        >
          {/* Center line */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: 1,
              background: sw.textMuted,
              opacity: 0.4,
            }}
          />
          {/* Threshold lines at ±3σ */}
          <div style={{ position: 'absolute', left: `${50 - 30 / zoom}%`, top: 0, bottom: 0, width: 1, background: sw.pink, opacity: 0.5 }} />
          <div style={{ position: 'absolute', left: `${50 + 30 / zoom}%`, top: 0, bottom: 0, width: 1, background: sw.pink, opacity: 0.5 }} />
          {/* Dots */}
          {samples.map((s, i) => {
            const xPct = 50 + (s / 5) * 50 * zoom;
            const isOutlier = Math.abs(s) > threshold;
            if (xPct < 0 || xPct > 100) return null;
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${xPct}%`,
                  top: 4 + (i % 23),
                  width: 3,
                  height: 3,
                  borderRadius: 999,
                  background: isOutlier ? sw.pink : sw.cyan,
                  opacity: isOutlier ? 0.9 : 0.4,
                  transform: 'translateX(-50%)',
                }}
              />
            );
          })}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 10, color: sw.textMuted, fontFamily: sw.fontMono }}>
          <span>-5σ</span>
          <span style={{ color: sw.pink }}>±3σ = outliers</span>
          <span>+5σ</span>
        </div>
        <div style={{ marginTop: 6, fontSize: 11, color: sw.textDim }}>
          {outliers.length} outliers em 1000 pesos ({((outliers.length / 1000) * 100).toFixed(1)}%) — maior magnitude: <span style={{ color: sw.pink, fontWeight: 700, fontFamily: sw.fontMono }}>{outlierMagnitude}σ</span>
        </div>
      </div>
    </div>
  );
};

export const QuantizationTheoryWhyVisual = React.memo(({ copy }: Props) => {
  return (
    <PanelCard minHeight={0} padding={20} gap={16}>
      <div style={{ fontFamily: sw.fontSans, color: sw.text, overflow: 'auto', flex: 1, minHeight: 0 }}>
        <div style={s.eyebrow}>{copy.subtitle}</div>
        <h4 style={{ ...s.title, fontSize: 16, marginBottom: 16 }}>{copy.title}</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <DistributionSection copy={copy} />
          <div style={{ borderTop: `1px solid ${sw.borderSubtle}` }} />
          <OutliersSection copy={copy} />
        </div>
      </div>
    </PanelCard>
  );
});
