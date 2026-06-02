import React, { useMemo, useState } from 'react';
import type { QuantizationInt8Copy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { ChartFrame } from '../charts/ChartFrame';

interface Props {
  copy: QuantizationInt8Copy;
}

// Deterministic normal samples using Box-Muller seeded approach
function generateNormalSamples(n: number): number[] {
  const samples: number[] = [];
  let seed = 42;
  const lcg = () => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return (seed >>> 0) / 0xffffffff;
  };
  while (samples.length < n) {
    const u1 = lcg();
    const u2 = lcg();
    const z0 = Math.sqrt(-2 * Math.log(Math.max(u1, 1e-10))) * Math.cos(2 * Math.PI * u2);
    const z1 = Math.sqrt(-2 * Math.log(Math.max(u1, 1e-10))) * Math.sin(2 * Math.PI * u2);
    samples.push(z0, z1);
  }
  return samples.slice(0, n);
}

function gaussian(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

const CHART_W = 380;
const CHART_H = 180;
const N_SAMPLES = 400;

export const QuantizationInt8Visual = React.memo(({ copy }: Props) => {
  const [threshold, setThreshold] = useState(6.0);

  const samples = useMemo(() => generateNormalSamples(N_SAMPLES), []);

  const { outlierCount, normalCount } = useMemo(() => {
    const oc = samples.filter((s) => Math.abs(s) > threshold).length;
    return { outlierCount: oc, normalCount: samples.length - oc };
  }, [samples, threshold]);

  const outlierPct = ((outlierCount / samples.length) * 100).toFixed(1);
  const normalPct = ((normalCount / samples.length) * 100).toFixed(1);

  const curvePoints = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let i = 0; i <= 300; i++) {
      const x = -8 + i * 0.054;
      pts.push({ x, y: gaussian(x) });
    }
    return pts;
  }, []);

  const xDomain: [number, number] = [-8, 8];
  const yDomain: [number, number] = [0, 0.45];

  return (
    <PanelCard minHeight={0} padding={20} gap={14}>
      <div style={{ fontFamily: sw.fontSans, color: sw.text }}>
        <div
          style={{
            fontSize: sw.fsEyebrow,
            fontWeight: 700,
            letterSpacing: sw.lsEyebrow,
            textTransform: 'uppercase',
            color: sw.cyan,
            marginBottom: 4,
          }}
        >
          {copy.subtitle}
        </div>
        <h4 style={{ fontSize: 15, fontWeight: 700, color: sw.text, margin: '0 0 12px' }}>
          {copy.title}
        </h4>

        {/* Threshold slider */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
          <label style={{ fontSize: 11, color: sw.textDim, fontWeight: 600, whiteSpace: 'nowrap' }}>
            {copy.thresholdLabel}: {threshold.toFixed(1)}σ
          </label>
          <input
            type="range"
            min={2}
            max={8}
            step={0.5}
            value={threshold}
            onChange={(e) => setThreshold(Number(e.target.value))}
            style={{ flex: 1, accentColor: sw.cyan }}
          />
        </div>

        {/* Chart */}
        <ChartFrame
          width={CHART_W}
          height={CHART_H}
          xDomain={xDomain}
          yDomain={yDomain}
          xLabel="Weight magnitude (σ)"
          yLabel="Density"
          tickCount={5}
        >
          {(ctx) => {
            // Threshold lines
            const thxPos = ctx.xScale(threshold);
            const thxNeg = ctx.xScale(-threshold);
            const y0 = ctx.yScale(0);
            const yTop = ctx.yScale(0.43);

            return (
              <>
                {/* Shaded outlier regions */}
                <rect
                  x={thxPos} y={yTop} width={ctx.xScale(8) - thxPos} height={y0 - yTop}
                  fill={`${sw.pink}18`}
                />
                <rect
                  x={ctx.xScale(-8)} y={yTop} width={thxNeg - ctx.xScale(-8)} height={y0 - yTop}
                  fill={`${sw.pink}18`}
                />

                {/* Gaussian curve — normal region (cyan) */}
                {(() => {
                  const normalPts = curvePoints.filter((p) => p.x >= -threshold && p.x <= threshold);
                  const outlierPtsR = curvePoints.filter((p) => p.x >= threshold);
                  const outlierPtsL = curvePoints.filter((p) => p.x <= -threshold);
                  return (
                    <>
                      <path
                        d={normalPts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${ctx.xScale(p.x)} ${ctx.yScale(p.y)}`).join(' ')}
                        fill="none" stroke={sw.cyan} strokeWidth={2.5}
                      />
                      <path
                        d={outlierPtsR.map((p, i) => `${i === 0 ? 'M' : 'L'} ${ctx.xScale(p.x)} ${ctx.yScale(p.y)}`).join(' ')}
                        fill="none" stroke={sw.pink} strokeWidth={2.5}
                      />
                      <path
                        d={outlierPtsL.map((p, i) => `${i === 0 ? 'M' : 'L'} ${ctx.xScale(p.x)} ${ctx.yScale(p.y)}`).join(' ')}
                        fill="none" stroke={sw.pink} strokeWidth={2.5}
                      />
                    </>
                  );
                })()}

                {/* Scatter dots */}
                {samples.map((s, i) => {
                  const isOutlier = Math.abs(s) > threshold;
                  const cx = ctx.xScale(Math.min(Math.max(s, xDomain[0] + 0.1), xDomain[1] - 0.1));
                  const cy = ctx.yScale(gaussian(s) * (0.6 + (i % 5) * 0.08));
                  return (
                    <circle
                      key={i}
                      cx={cx}
                      cy={cy}
                      r={2}
                      fill={isOutlier ? sw.pink : sw.cyan}
                      opacity={0.5}
                    />
                  );
                })}

                {/* Threshold lines */}
                <line x1={thxPos} y1={y0} x2={thxPos} y2={yTop} stroke={sw.pink} strokeWidth={1.5} strokeDasharray="4 3" />
                <line x1={thxNeg} y1={y0} x2={thxNeg} y2={yTop} stroke={sw.pink} strokeWidth={1.5} strokeDasharray="4 3" />
                <text x={thxPos + 4} y={yTop + 10} fill={sw.pink} fontSize={9} fontWeight={700}>
                  +{threshold}σ
                </text>
                <text x={thxNeg - 28} y={yTop + 10} fill={sw.pink} fontSize={9} fontWeight={700}>
                  −{threshold}σ
                </text>
              </>
            );
          }}
        </ChartFrame>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              background: `${sw.cyan}15`,
              border: `1px solid ${sw.cyan}40`,
            }}
          >
            <div style={{ fontSize: 10, color: sw.textMuted, marginBottom: 2 }}>{copy.int8Label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.cyan, fontFamily: sw.fontMono }}>
              {normalPct}%
            </div>
            <div style={{ fontSize: 10, color: sw.textDim }}>{copy.normalPercentLabel}</div>
          </div>
          <div
            style={{
              padding: '10px 12px',
              borderRadius: 10,
              background: `${sw.pink}15`,
              border: `1px solid ${sw.pink}40`,
            }}
          >
            <div style={{ fontSize: 10, color: sw.textMuted, marginBottom: 2 }}>{copy.fp16Label}</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.pink, fontFamily: sw.fontMono }}>
              {outlierPct}%
            </div>
            <div style={{ fontSize: 10, color: sw.textDim }}>{copy.outlierPercentLabel}</div>
          </div>
        </div>

        {/* Insight */}
        <div
          style={{
            marginTop: 10,
            padding: '10px 12px',
            borderRadius: 8,
            background: sw.tintStronger,
            border: `1px solid ${sw.borderSubtle}`,
            fontSize: 11,
            color: sw.textDim,
            lineHeight: 1.55,
          }}
        >
          <span style={{ fontWeight: 700, color: sw.text }}>{copy.insightTitle}: </span>
          {copy.insight}
        </div>
      </div>
    </PanelCard>
  );
});
