import React, { useMemo, useState } from 'react';
import type { SigmoidDerivativeExplorerCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';

interface Props {
  copy: SigmoidDerivativeExplorerCopy;
}

const WIDTH = 430;
const HEIGHT = 220;
const PADDING = { top: 24, right: 26, bottom: 32, left: 34 };

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(x: number) {
  const y = sigmoid(x);
  return y * (1 - y);
}

function xCoord(value: number) {
  const width = WIDTH - PADDING.left - PADDING.right;
  return PADDING.left + ((value + 6) / 12) * width;
}

function yCoord(value: number, maxValue: number) {
  const height = HEIGHT - PADDING.top - PADDING.bottom;
  return HEIGHT - PADDING.bottom - (value / maxValue) * height;
}

function buildPath(fn: (value: number) => number, maxValue: number) {
  return Array.from({ length: 241 }, (_, index) => {
    const z = -6 + index * 0.05;
    const x = xCoord(z);
    const y = yCoord(fn(z), maxValue);
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
}

function formatTail(value: number) {
  return value.toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
}

export const SigmoidDerivativeExplorer: React.FC<Props> = ({ copy }) => {
  const [zValue, setZValue] = useState(0.4);
  const sigma = sigmoid(zValue);
  const derivative = dsigmoid(zValue);
  const band = useMemo(
    () => [
      { label: 'tail left', zone: 'low gradient', accent: '#ff5da2', intensity: sigmoid(-4) * (1 - sigmoid(-4)) },
      { label: 'center', zone: 'peak gradient', accent: '#16e0ff', intensity: derivative },
      { label: 'tail right', zone: 'low gradient', accent: '#66b84a', intensity: sigmoid(4) * (1 - sigmoid(4)) },
    ],
    [derivative],
  );
  const paths = useMemo(
    () => ({
      sigmoid: buildPath(sigmoid, 1),
      derivative: buildPath(dsigmoid, 0.25),
    }),
    [],
  );

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.2fr 0.88fr', gap: 14, minHeight: 0 }}>
      <PanelCard
        minHeight={0}
        padding={18}
        gap={12}
        style={{
          overflow: 'hidden',
          background:
            'radial-gradient(circle at top left, rgba(22,224,255,0.10), transparent 32%), radial-gradient(circle at top right, rgba(255,79,160,0.08), transparent 30%), linear-gradient(180deg, rgba(18,16,29,0.98), rgba(12,13,22,0.98))',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'baseline', flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, color: '#16e0ff', fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase' }}>
              {copy.formulaTitle}
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--sw-text)', marginTop: 6, lineHeight: 1.06 }}>
              O gradiente vive no meio da curva
            </div>
          </div>
          <div style={{ color: 'var(--sw-text-dim)', fontSize: 12.5, lineHeight: 1.45, textAlign: 'right' }}>{copy.formula}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, minHeight: 0, flex: 1 }}>
          <CurveCard
            title={copy.sigmoidChartTitle}
            accent="#16e0ff"
            ariaLabel={copy.ariaLabel}
            path={paths.sigmoid}
            pointX={xCoord(zValue)}
            pointY={yCoord(sigma, 1)}
            valueLabel={`${copy.sigmoidLabel}: ${sigma.toFixed(4)}`}
            maxValue={1}
          />
          <CurveCard
            title={copy.derivativeChartTitle}
            accent="#ff5da2"
            ariaLabel={copy.ariaLabel}
            path={paths.derivative}
            pointX={xCoord(zValue)}
            pointY={yCoord(derivative, 0.25)}
            valueLabel={`${copy.derivativeLabel}: ${formatTail(derivative)}`}
            maxValue={0.25}
          />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.35fr 0.95fr',
            gap: 10,
            alignItems: 'center',
          }}
        >
          <div style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 11, color: 'var(--sw-text-dim)', fontWeight: 800, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                {copy.sliderLabel}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', fontFamily: 'monospace' }}>
                z = {zValue.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min={-6}
              max={6}
              step={0.1}
              value={zValue}
              onChange={(event) => setZValue(Number(event.target.value))}
              style={{ width: '100%', accentColor: '#16e0ff' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
            <MetricPill label="z" value={zValue.toFixed(2)} accent="#93a4bb" />
            <MetricPill label={copy.sigmoidLabel} value={sigma.toFixed(4)} accent="#16e0ff" />
            <MetricPill label={copy.derivativeLabel} value={formatTail(derivative)} accent="#ff5da2" />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
          {band.map((item) => (
            <BandCard key={item.label} label={item.label} zone={item.zone} accent={item.accent} intensity={item.intensity} />
          ))}
        </div>
      </PanelCard>

      <PanelCard
        minHeight={0}
        padding={18}
        gap={12}
        style={{
          overflow: 'hidden',
          background:
            'linear-gradient(180deg, rgba(20,18,31,0.98), rgba(13,13,22,0.98)), radial-gradient(circle at top, rgba(255,79,160,0.08), transparent 35%)',
        }}
      >
        <div>
          <div style={{ fontSize: 11, color: '#ff5da2', fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 8 }}>
            Leitura do ponto atual
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <HeroStat label={copy.inputLabel} value={zValue.toFixed(2)} accent="#93a4bb" />
            <HeroStat label={copy.sigmoidLabel} value={sigma.toFixed(4)} accent="#16e0ff" />
            <HeroStat label={copy.derivativeLabel} value={formatTail(derivative)} accent="#ff5da2" />
          </div>
        </div>

        <div style={{ display: 'grid', gap: 10 }}>
          <LessonCard
            accent="#16e0ff"
            title={copy.peakTitle}
            body={copy.peakBody}
            eyebrow="melhor zona de aprendizagem"
          />
          <LessonCard
            accent="#66b84a"
            title={copy.saturationTitle}
            body={copy.saturationBody}
            eyebrow="saturacao"
          />
          <LessonCard
            accent="#ff5da2"
            title={copy.trainingTitle}
            body={copy.trainingBody}
            eyebrow="backprop"
          />
        </div>

        <div
          style={{
            marginTop: 'auto',
            padding: '14px 15px',
            borderRadius: 16,
            background: 'linear-gradient(180deg, rgba(22,224,255,0.10), rgba(255,79,160,0.08))',
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div style={{ fontSize: 11, color: '#66b84a', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
            {copy.trainingTitle}
          </div>
          <div style={{ fontSize: 13.5, color: 'var(--sw-text-dim)', lineHeight: 1.75 }}>{copy.trainingBody}</div>
        </div>
      </PanelCard>
    </div>
  );
};

const CurveCard: React.FC<{
  title: string;
  accent: string;
  ariaLabel: string;
  path: string;
  pointX: number;
  pointY: number;
  valueLabel: string;
  maxValue: number;
}> = ({ title, accent, ariaLabel, path, pointX, pointY, valueLabel, maxValue }) => (
  <div
    style={{
      padding: '12px 12px 10px',
      borderRadius: 16,
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      minHeight: 0,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline', marginBottom: 8 }}>
      <div style={{ fontSize: 11, color: accent, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>{title}</div>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontFamily: 'monospace' }}>{valueLabel}</div>
    </div>
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%" height="170" aria-label={ariaLabel}>
      <defs>
        <filter id="sigmoid-glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {[-6, -3, 0, 3, 6].map((tick) => (
        <g key={`x-${tick}`}>
          <line x1={xCoord(tick)} x2={xCoord(tick)} y1={PADDING.top} y2={HEIGHT - PADDING.bottom} stroke="rgba(255,255,255,0.06)" strokeDasharray="4 6" />
          <text x={xCoord(tick)} y={HEIGHT - 12} fill="rgba(255,255,255,0.40)" fontSize="10" textAnchor="middle">
            {tick}
          </text>
        </g>
      ))}
      {([0, maxValue / 2, maxValue] as number[]).map((tick) => (
        <g key={`y-${tick}`}>
          <line x1={PADDING.left} x2={WIDTH - PADDING.right} y1={yCoord(tick, maxValue)} y2={yCoord(tick, maxValue)} stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />
          <text x={10} y={yCoord(tick, maxValue) + 4} fill="rgba(255,255,255,0.40)" fontSize="10">
            {tick.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}
          </text>
        </g>
      ))}

      <path d={path} fill="none" stroke={accent} strokeWidth="3.4" strokeLinecap="round" filter="url(#sigmoid-glow)" />
      <line x1={pointX} x2={pointX} y1={PADDING.top} y2={HEIGHT - PADDING.bottom} stroke={accent} strokeDasharray="5 7" />
      <circle cx={pointX} cy={pointY} r="6" fill={accent} />
      <circle cx={pointX} cy={pointY} r="13" fill={accent} opacity="0.16" />
      <circle cx={pointX} cy={pointY} r="22" fill={accent} opacity="0.06" />
    </svg>
  </div>
);

const MetricPill: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div style={{ padding: '10px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}33` }}>
    <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 17, fontWeight: 900, color: accent, fontFamily: 'monospace' }}>{value}</div>
  </div>
);

const HeroStat: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div style={{ padding: '14px 16px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}33` }}>
    <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em', marginBottom: 6 }}>{label}</div>
    <div style={{ fontSize: 25, fontWeight: 900, color: accent, fontFamily: 'monospace', lineHeight: 1 }}>{value}</div>
  </div>
);

const LessonCard: React.FC<{ title: string; body: string; accent: string; eyebrow: string }> = ({ title, body, accent, eyebrow }) => (
  <div style={{ padding: '13px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}24` }}>
    <div style={{ fontSize: 10, color: accent, letterSpacing: '.12em', textTransform: 'uppercase', fontWeight: 900, marginBottom: 6 }}>{eyebrow}</div>
    <div style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--sw-text)', marginBottom: 6, lineHeight: 1.2 }}>{title}</div>
    <div style={{ fontSize: 12.5, color: 'var(--sw-text-dim)', lineHeight: 1.7 }}>{body}</div>
  </div>
);

const BandCard: React.FC<{ label: string; zone: string; accent: string; intensity: number }> = ({ label, zone, accent, intensity }) => (
  <div
    style={{
      padding: '12px 13px',
      borderRadius: 16,
      border: `1px solid ${accent}26`,
      background: `linear-gradient(180deg, ${accent}15, rgba(255,255,255,0.02))`,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline', marginBottom: 6 }}>
      <div style={{ color: accent, fontSize: 11, fontWeight: 900, letterSpacing: '.1em', textTransform: 'uppercase' }}>{label}</div>
      <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'monospace' }}>{zone}</div>
    </div>
    <div style={{ height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
      <div style={{ width: `${Math.min(100, Math.max(8, intensity * 420))}%`, height: '100%', background: accent, borderRadius: 999 }} />
    </div>
  </div>
);
