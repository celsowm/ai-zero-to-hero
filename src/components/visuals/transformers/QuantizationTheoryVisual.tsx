import React, { useMemo, useState } from 'react';
import type { QuantizationTheoryCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { ChartFrame } from '../charts/ChartFrame';

interface Props {
  copy: QuantizationTheoryCopy;
}

// ── Styles ──

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
  footer: {
    marginTop: 4,
    paddingTop: 10,
    borderTop: `1px solid ${sw.borderSubtle}`,
    fontSize: 11,
    color: sw.textMuted,
    lineHeight: 1.5,
  },
  highlight: {
    display: 'flex' as const,
    alignItems: 'center' as const,
    justifyContent: 'space-between' as const,
    padding: '8px 12px',
    borderRadius: 10,
    background: sw.tintStronger,
    border: `1px solid ${sw.borderSubtle}`,
    marginTop: 4,
    marginBottom: 4,
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
};

function Bullets({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'grid', gap: 5 }}>
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

// ── Gaussian helpers ──

function gaussian(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

// ── Mapping Section ──

const CHART_W = 380;
const CHART_H = 160;

function MappingSection({ copy }: { copy: QuantizationTheoryCopy }) {
  const [bits, setBits] = useState(4);

  const { levels, scale } = useMemo(() => {
    const k = 2 ** bits;
    const xMin = -3;
    const xMax = 3;
    const S_val = (xMax - xMin) / (k - 1);
    const lvls = Array.from({ length: k }, (_, i) => xMin + i * S_val);
    return { levels: lvls, scale: S_val };
  }, [bits]);

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
      <h4 style={s.title}>{copy.mappingPanel.title}</h4>
      <p style={s.body}>{copy.mappingPanel.body}</p>

      {/* Slider */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <label style={{ fontSize: 11, color: sw.textDim, fontWeight: 600 }}>Bits (k):</label>
        <input
          type="range"
          min={2}
          max={8}
          step={1}
          value={bits}
          onChange={(e) => setBits(Number(e.target.value))}
          style={{ flex: 1, accentColor: sw.cyan }}
        />
        <span style={{ fontSize: 13, fontWeight: 700, color: sw.cyan, fontFamily: sw.fontMono, minWidth: 20 }}>
          {bits}
        </span>
      </div>

      {/* Chart */}
      <ChartFrame
        width={CHART_W}
        height={CHART_H}
        xDomain={[-3.5, 3.5]}
        yDomain={[0, 0.45]}
        xLabel="Weight value"
        yLabel="Density"
        tickCount={5}
      >
        {(ctx) => (
          <>
            <path
              d={curvePoints
                .map((p, i) => `${i === 0 ? 'M' : 'L'} ${ctx.xScale(p.x)} ${ctx.yScale(p.y)}`)
                .join(' ')}
              fill="none"
              stroke={sw.cyan}
              strokeWidth={2}
              strokeLinecap="round"
            />
            {levels.map((v, i) => {
              const xPx = ctx.xScale(v);
              const yPx = ctx.yScale(gaussian(v));
              const isActive = v >= -3 && v <= 3;
              return (
                <g key={i}>
                  <line
                    x1={xPx} y1={yPx} x2={xPx} y2={ctx.yScale(0)}
                    stroke={sw.pink} strokeWidth={1} strokeDasharray="2 2"
                    opacity={isActive ? 0.6 : 0.2}
                  />
                  <circle cx={xPx} cy={yPx} r={2.5} fill={sw.pink} opacity={isActive ? 1 : 0.3} />
                </g>
              );
            })}
            <text x={ctx.xScale(1.5)} y={ctx.yScale(0.4)} fill={sw.textMuted} fontSize={9}>
              {`S=${scale.toFixed(4)}`}
            </text>
            <text x={ctx.xScale(1.5)} y={ctx.yScale(0.36)} fill={sw.textMuted} fontSize={9}>
              {`buckets=${levels.length}`}
            </text>
          </>
        )}
      </ChartFrame>

      <HighlightBlock label={copy.mappingPanel.highlight.label} value={copy.mappingPanel.highlight.value} />
      <Bullets items={copy.mappingPanel.bullets} />
      <div style={s.footer}>{copy.mappingPanel.footer}</div>
    </div>
  );
}

// ── Stepper Section ──

function StepperSection({ copy }: { copy: QuantizationTheoryCopy }) {
  const [step, setStep] = useState(0);
  const x = 0.37;
  const bits = 4;
  const k = 2 ** bits;
  const xMin = -1;
  const xMax = 1;
  const S = (xMax - xMin) / (k - 1);
  const Z = Math.round(-xMin / S);
  const scaled = x / S;
  const rounded = Math.round(scaled);
  const withZ = rounded + Z;
  const clamped = Math.min(Math.max(withZ, 0), k - 1);
  const deq = (clamped - Z) * S;

  const steps = [
    { label: 'x original', formula: 'x', value: x.toFixed(4), result: String(x) },
    { label: 'x / S', formula: 'x / S', value: `${x} / ${S.toFixed(4)}`, result: scaled.toFixed(4) },
    { label: 'round(x/S)', formula: 'round(x / S)', value: scaled.toFixed(4), result: String(rounded) },
    { label: '+ Z', formula: 'round(x/S) + Z', value: `${rounded} + ${Z}`, result: String(withZ) },
    { label: 'clamp + deq', formula: 'clamp → × S', value: `clamp=${clamped}`, result: deq.toFixed(4) },
  ];

  const active = steps[step];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <h4 style={s.title}>{copy.formulaPanel.title}</h4>
      <p style={s.body}>{copy.formulaPanel.body}</p>

      {/* Step buttons */}
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' as const }}>
        {steps.map((st, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            style={{
              padding: '5px 10px',
              borderRadius: 7,
              border: `1px solid ${i === step ? sw.cyan : sw.borderSubtle}`,
              background: i === step ? `${sw.cyan}20` : 'transparent',
              color: i === step ? sw.cyan : sw.textDim,
              fontSize: 10,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: sw.fontMono,
            }}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Step result */}
      <div
        style={{
          padding: '12px 14px',
          borderRadius: 10,
          background: sw.tintStronger,
          border: `1px solid ${sw.borderSubtle}`,
        }}
      >
        <div style={{ fontSize: 10, color: sw.textMuted, marginBottom: 3 }}>{active.formula}</div>
        <div style={{ fontSize: 22, fontWeight: 700, color: sw.cyan, fontFamily: sw.fontMono }}>
          = {active.result}
        </div>
        {step === steps.length - 1 && (
          <div style={{ fontSize: 11, color: sw.pink, marginTop: 6 }}>
            ε = {(x - deq).toFixed(6)}
          </div>
        )}
      </div>

      <HighlightBlock label={copy.formulaPanel.highlight.label} value={copy.formulaPanel.highlight.value} />
      <Bullets items={copy.formulaPanel.bullets} />
      <div style={s.footer}>{copy.formulaPanel.footer}</div>
    </div>
  );
}

// ── Main Visual ──

export const QuantizationTheoryVisual = React.memo(({ copy }: Props) => {
  return (
    <PanelCard minHeight={0} padding={18} gap={16}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          fontFamily: sw.fontSans,
          color: sw.text,
          minHeight: 0,
          overflow: 'auto',
        }}
      >
        <MappingSection copy={copy} />
        <div style={{ borderTop: `1px solid ${sw.borderSubtle}` }} />
        <StepperSection copy={copy} />
      </div>
    </PanelCard>
  );
});
