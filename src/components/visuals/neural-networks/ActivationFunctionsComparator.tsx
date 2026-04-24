import React, { useMemo, useState } from 'react';
import type { ActivationFunctionsComparatorCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: ActivationFunctionsComparatorCopy;
}

type FunctionKey = 'linear' | 'relu' | 'sigmoid';

const CHART_WIDTH = 720;
const CHART_HEIGHT = 340;
const PADDING = { top: 26, right: 34, bottom: 42, left: 48 };
const FUNCTION_KEYS: FunctionKey[] = ['linear', 'relu', 'sigmoid'];

const COLORS: Record<FunctionKey, string> = {
  linear: '#93a4bb',
  relu: '#16e0ff',
  sigmoid: '#ff4fa0',
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function sigmoid(x: number) {
  return 1 / (1 + Math.exp(-x));
}

function activate(kind: FunctionKey, z: number) {
  if (kind === 'linear') return z;
  if (kind === 'relu') return Math.max(0, z);
  return sigmoid(z);
}

function derivative(kind: FunctionKey, z: number) {
  if (kind === 'linear') return 1;
  if (kind === 'relu') return z > 0 ? 1 : 0;
  const y = sigmoid(z);
  return y * (1 - y);
}

function xCoord(value: number) {
  const width = CHART_WIDTH - PADDING.left - PADDING.right;
  return PADDING.left + ((value + 6) / 12) * width;
}

function yCoord(value: number, min = -1.5, max = 6.5) {
  const height = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const normalized = clamp((value - min) / (max - min), 0, 1);
  return CHART_HEIGHT - PADDING.bottom - normalized * height;
}

function buildPath(kind: FunctionKey) {
  return Array.from({ length: 241 }, (_, index) => {
    const z = -6 + index * 0.05;
    const x = xCoord(z);
    const y = yCoord(activate(kind, z));
    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
  }).join(' ');
}

function buildGradientSentence(kind: FunctionKey, z: number) {
  if (kind === 'linear') return `gradiente local constante em ${derivative(kind, z).toFixed(2)}`;
  if (kind === 'relu') return z > 0 ? 'gradiente local 1.00 porque o sinal esta no lado ativo' : 'gradiente local 0.00 porque o sinal foi cortado';
  return `gradiente local ${derivative(kind, z).toFixed(3)}, com pico perto do centro`;
}

export const ActivationFunctionsComparator = React.memo(({ copy }: Props) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [zValue, setZValue] = useState(1.35);
  const activeKey = FUNCTION_KEYS[activeIndex];
  const activeFunction = copy.functions[activeKey];
  const activeOutput = activate(activeKey, zValue);
  const paths = useMemo(
    () => ({
      linear: buildPath('linear'),
      relu: buildPath('relu'),
      sigmoid: buildPath('sigmoid'),
    }),
    [],
  );

  return (
    <TabbedPanelSurface minHeight={0}>
      {/* ── TOP BAR: Tabs + Slider + Live Values ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', gap: 6, padding: 6, borderRadius: 14, background: sw.tintStrong, border: `1px solid ${sw.tintOverlay}` }}>
          {FUNCTION_KEYS.map((kind, index) => {
            const active = activeIndex === index;
            return (
              <button
                key={kind}
                type="button"
                onClick={() => setActiveIndex(index)}
                style={{
                  padding: '9px 18px',
                  borderRadius: 10,
                  border: '1px solid transparent',
                  fontSize: 13,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  color: active ? '#091018' : 'var(--sw-text-dim)',
                  background: active
                    ? 'linear-gradient(135deg, rgba(0,229,255,0.95), rgba(102,184,74,0.92))'
                    : 'rgba(255,255,255,0.04)',
                  boxShadow: active ? '0 12px 30px rgba(0,229,255,0.12)' : 'none',
                  cursor: 'pointer',
                  transition: 'background 180ms ease, color 180ms ease',
                }}
              >
                {copy.functions[kind].label}
              </button>
            );
          })}
        </div>

        <div
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: '8px 16px',
            borderRadius: 999,
            background: sw.tintStronger,
            border: `1px solid ${sw.borderMediumStrong}`,
          }}
        >
          <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em' }}>
            {copy.sliderLabel}
          </span>
          <input
            type="range"
            min={-6}
            max={6}
            step={0.1}
            value={zValue}
            onChange={(event) => setZValue(Number(event.target.value))}
            style={{ width: 120, accentColor: COLORS[activeKey] }}
          />
          <ValueBadge label="z" value={zValue.toFixed(2)} color={COLORS[activeKey]} />
          <ValueBadge label={copy.outputLabel} value={activeOutput.toFixed(3)} color={COLORS[activeKey]} />
        </div>
      </div>

      {/* ── MAIN CONTENT: Chart (left) + Info (right) ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, minHeight: 0, flex: 1 }}>
        {/* ── LEFT: Chart + Comparison Cards ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
          <PanelCard
            minHeight={0}
            padding={0}
            gap={0}
            style={{
              flex: 1,
              overflow: 'hidden',
              borderRadius: 18,
              border: `1px solid ${sw.borderSubtle}`,
              background:
                `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint}), radial-gradient(circle at 50% 18%, rgba(22,224,255,0.11), rgba(10,12,19,0.94) 52%)`,
            }}
          >
            <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`} width="100%" height="100%" aria-label={copy.ariaLabel}>
              <defs>
                <linearGradient id="activation-bg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(22,224,255,0.13)" />
                  <stop offset="100%" stopColor="rgba(255,79,160,0.08)" />
                </linearGradient>
                <filter id="activation-glow">
                  <feGaussianBlur stdDeviation="3.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <rect x="0" y="0" width={CHART_WIDTH} height={CHART_HEIGHT} fill="url(#activation-bg)" opacity="0.55" />

              {[-6, -3, 0, 3, 6].map((tick) => (
                <g key={`x-${tick}`}>
                  <line
                    x1={xCoord(tick)}
                    x2={xCoord(tick)}
                    y1={PADDING.top}
                    y2={CHART_HEIGHT - PADDING.bottom}
                    stroke={sw.borderMediumStrong}
                    strokeDasharray="5 7"
                  />
                  <text x={xCoord(tick)} y={CHART_HEIGHT - 14} fill="rgba(255,255,255,0.45)" fontSize="11" textAnchor="middle">
                    {tick}
                  </text>
                </g>
              ))}

              {[-1, 0, 1, 2, 3, 4, 5, 6].map((tick) => (
                <g key={`y-${tick}`}>
                  <line
                    x1={PADDING.left}
                    x2={CHART_WIDTH - PADDING.right}
                    y1={yCoord(tick)}
                    y2={yCoord(tick)}
                    stroke={tick === 0 ? sw.tintActive : sw.borderSubtle}
                    strokeDasharray={tick === 0 ? 'none' : '5 7'}
                  />
                  <text x={18} y={yCoord(tick) + 4} fill="rgba(255,255,255,0.42)" fontSize="11">
                    {tick}
                  </text>
                </g>
              ))}

              <line x1={xCoord(0)} x2={xCoord(0)} y1={PADDING.top} y2={CHART_HEIGHT - PADDING.bottom} stroke={sw.tintState} />

              {FUNCTION_KEYS.map((kind) => (
                <path
                  key={kind}
                  d={paths[kind]}
                  fill="none"
                  stroke={COLORS[kind]}
                  strokeWidth={kind === activeKey ? 4.5 : 2.4}
                  opacity={kind === activeKey ? 1 : 0.24}
                  strokeLinecap="round"
                  filter={kind === activeKey ? 'url(#activation-glow)' : undefined}
                />
              ))}

              {FUNCTION_KEYS.map((kind) => {
                const value = activate(kind, zValue);
                const y = yCoord(value);
                const x = xCoord(zValue);
                return (
                  <g key={`marker-${kind}`}>
                    <line
                      x1={x}
                      x2={x}
                      y1={PADDING.top}
                      y2={CHART_HEIGHT - PADDING.bottom}
                      stroke={COLORS[kind]}
                      strokeDasharray={kind === activeKey ? '7 7' : '3 10'}
                      strokeWidth={kind === activeKey ? 1.4 : 0.7}
                      opacity={kind === activeKey ? 0.95 : 0.22}
                    />
                    <circle cx={x} cy={y} r={kind === activeKey ? 8 : 5} fill={COLORS[kind]} opacity={kind === activeKey ? 1 : 0.45} />
                    <circle cx={x} cy={y} r={kind === activeKey ? 16 : 10} fill={COLORS[kind]} opacity={kind === activeKey ? 0.18 : 0.08} />
                    <text x={x + 10} y={y - 10} fill={COLORS[kind]} fontSize="11" fontWeight="800">
                      {kind === 'linear' ? 'Linear' : kind === 'relu' ? 'ReLU' : 'Sigmoid'}
                    </text>
                    <text x={x + 10} y={y + 5} fill="rgba(255,255,255,0.72)" fontSize="11" fontFamily="monospace">
                      {value.toFixed(3)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </PanelCard>

          {/* ── Comparison row below chart ── */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {FUNCTION_KEYS.map((kind) => {
              const desc = copy.functions[kind];
              const val = activate(kind, zValue);
              const grad = derivative(kind, zValue);
              const isActive = kind === activeKey;
              return (
                <div
                  key={kind}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 14,
                    border: `1px solid ${isActive ? COLORS[kind] : sw.borderSubtle}`,
                    background: isActive ? `${COLORS[kind]}14` : sw.tint,
                    boxShadow: isActive ? `0 0 0 1px ${COLORS[kind]}44, 0 0 20px ${COLORS[kind]}18` : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <strong style={{ color: COLORS[kind], fontSize: 13 }}>{desc.label}</strong>
                    <span style={{ color: 'var(--sw-text-dim)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em' }}>
                      {desc.outputRange}
                    </span>
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--sw-text-dim)', lineHeight: 1.4, marginBottom: 8 }}>{desc.formula}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                    <span style={{ color: 'var(--sw-text-dim)' }}>
                      a = <span style={{ color: COLORS[kind], fontFamily: 'monospace', fontWeight: 800 }}>{val.toFixed(3)}</span>
                    </span>
                    <span style={{ color: 'var(--sw-text-dim)' }}>
                      grad = <span style={{ color: '#66b84a', fontFamily: 'monospace', fontWeight: 800 }}>{grad.toFixed(3)}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Info panel ── */}
        <PanelCard
          minHeight={0}
          padding={22}
          gap={16}
          style={{
            overflow: 'auto',
            background:
              'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98)), radial-gradient(circle at top, rgba(255,79,160,0.08), transparent 35%)',
          }}
        >
          <div>
            <div style={{ fontSize: 10, color: COLORS[activeKey], fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 6 }}>
              {copy.infoTitle}
            </div>
            <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--sw-text)', lineHeight: 1.1, marginBottom: 10 }}>
              {activeFunction.label}
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--sw-text-dim)', lineHeight: 1.65 }}>{activeFunction.headline}</div>
          </div>

          <div
            style={{
              padding: '14px 16px',
              borderRadius: 14,
              border: `1px solid ${COLORS[activeKey]}44`,
              background:
                activeKey === 'linear'
                  ? 'linear-gradient(180deg, rgba(147,164,187,0.10), rgba(255,255,255,0.02))'
                  : activeKey === 'relu'
                    ? 'linear-gradient(180deg, rgba(22,224,255,0.10), rgba(255,255,255,0.02))'
                    : 'linear-gradient(180deg, rgba(255,79,160,0.10), rgba(255,255,255,0.02))',
            }}
          >
            <div style={{ fontSize: 10, color: COLORS[activeKey], fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              {copy.takeawayTitle}
            </div>
            <div style={{ fontSize: 13, color: 'var(--sw-text-dim)', lineHeight: 1.7 }}>{copy.takeawayBody}</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <InfoRow label={activeFunction.body} value={activeFunction.behavior} accent={COLORS[activeKey]} />
            <InfoRow label={activeFunction.gradientNote} value={buildGradientSentence(activeKey, zValue)} accent={COLORS[activeKey]} />
            <InfoRow label={activeFunction.example} value={copy.comparisonNote} accent={COLORS[activeKey]} />
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
});

const ValueBadge: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
    <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.1em' }}>{label}</span>
    <strong style={{ color, fontFamily: 'monospace', fontSize: 14, fontWeight: 900 }}>{value}</strong>
  </div>
);

const InfoRow: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div style={{ padding: '12px 14px', borderRadius: 12, background: sw.tintStrong, border: `1px solid ${accent}20` }}>
    <div style={{ fontSize: 12, color: 'var(--sw-text)', fontWeight: 700, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 12, color: 'var(--sw-text-dim)', lineHeight: 1.6 }}>{value}</div>
  </div>
);
