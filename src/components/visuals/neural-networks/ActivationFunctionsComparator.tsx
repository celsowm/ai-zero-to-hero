import React, { useMemo, useState } from 'react';
import type { ActivationFunctionsComparatorCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { TabsBar } from '../TabsBar';

interface Props {
  copy: ActivationFunctionsComparatorCopy;
}

type FunctionKey = 'linear' | 'relu' | 'sigmoid';

const CHART_WIDTH = 720;
const CHART_HEIGHT = 380;
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
  if (kind === 'linear') {
    return z;
  }
  if (kind === 'relu') {
    return Math.max(0, z);
  }
  return sigmoid(z);
}

function derivative(kind: FunctionKey, z: number) {
  if (kind === 'linear') {
    return 1;
  }
  if (kind === 'relu') {
    return z > 0 ? 1 : 0;
  }
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

function buildMiniBadge(kind: FunctionKey, z: number) {
  return {
    key: kind,
    label: kind === 'linear' ? 'Linear' : kind === 'relu' ? 'ReLU' : 'Sigmoid',
    formula: kind === 'linear' ? 'a = z' : kind === 'relu' ? 'a = max(0, z)' : 'a = 1 / (1 + e^-z)',
    value: activate(kind, z),
    slope: derivative(kind, z),
  };
}

export const ActivationFunctionsComparator: React.FC<Props> = ({ copy }) => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [zValue, setZValue] = useState(1.35);
  const activeKey = FUNCTION_KEYS[activeIndex];
  const activeFunction = copy.functions[activeKey];
  const activeOutput = activate(activeKey, zValue);
  const outputs = useMemo(() => FUNCTION_KEYS.map((kind) => buildMiniBadge(kind, zValue)), [zValue]);
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
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <TabsBar
          ariaLabel={copy.tabsAriaLabel}
          activeIndex={activeIndex}
          onChange={setActiveIndex}
          items={copy.functions[activeKey]
            ? FUNCTION_KEYS.map((kind) => ({
                label: copy.functions[kind].label,
              }))
            : []}
        />

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            gap: 8,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <StatPill label="z" value={zValue.toFixed(2)} accent={COLORS[activeKey]} />
          <StatPill label={copy.outputLabel} value={activeOutput.toFixed(3)} accent={COLORS[activeKey]} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 0.85fr', gap: 14, minHeight: 0, flex: 1 }}>
        <PanelCard
          minHeight={0}
          padding={18}
          gap={12}
          style={{
            overflow: 'hidden',
            background:
              'radial-gradient(circle at top left, rgba(22,224,255,0.09), transparent 34%), radial-gradient(circle at top right, rgba(255,79,160,0.09), transparent 33%), linear-gradient(180deg, rgba(19,16,30,0.96), rgba(12,12,21,0.96))',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', gap: 12, flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', fontWeight: 800, letterSpacing: '.14em', textTransform: 'uppercase' }}>
                {copy.chartTitle}
              </div>
              <div style={{ fontSize: 17, fontWeight: 900, color: 'var(--sw-text)', marginTop: 6 }}>
                Mesmo `z`, três respostas diferentes
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {outputs.map((item) => (
                <MiniFunctionChip
                  key={item.key}
                  label={item.label}
                  formula={item.formula}
                  value={item.value}
                  slope={item.slope}
                  accent={COLORS[item.key]}
                  active={item.key === activeKey}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              position: 'relative',
              flex: 1,
              minHeight: 0,
              borderRadius: 18,
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01)), radial-gradient(circle at 50% 18%, rgba(22,224,255,0.11), rgba(10,12,19,0.94) 52%)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03)',
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
                    stroke="rgba(255,255,255,0.07)"
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
                    stroke={tick === 0 ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.06)'}
                    strokeDasharray={tick === 0 ? 'none' : '5 7'}
                  />
                  <text x={18} y={yCoord(tick) + 4} fill="rgba(255,255,255,0.42)" fontSize="11">
                    {tick}
                  </text>
                </g>
              ))}

              <line x1={xCoord(0)} x2={xCoord(0)} y1={PADDING.top} y2={CHART_HEIGHT - PADDING.bottom} stroke="rgba(255,255,255,0.24)" />

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

              <text x={CHART_WIDTH - 22} y={36} fill={COLORS[activeKey]} fontSize="13" fontWeight="900" textAnchor="end">
                {activeFunction.formula}
              </text>
              <text x={CHART_WIDTH - 22} y={58} fill="rgba(255,255,255,0.62)" fontSize="11" textAnchor="end">
                {copy.comparisonNote}
              </text>
            </svg>

            <div
              style={{
                position: 'absolute',
                left: 16,
                right: 16,
                bottom: 14,
                display: 'grid',
                gridTemplateColumns: '1.1fr 0.9fr',
                gap: 10,
                alignItems: 'end',
              }}
            >
              <div style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(10,12,18,0.72)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                  {copy.sliderLabel}
                </div>
                <input
                  type="range"
                  min={-6}
                  max={6}
                  step={0.1}
                  value={zValue}
                  onChange={(event) => setZValue(Number(event.target.value))}
                  style={{
                    width: '100%',
                    accentColor: COLORS[activeKey],
                  }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
                  <span>-6</span>
                  <span>0</span>
                  <span>6</span>
                </div>
              </div>

              <div style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(10,12,18,0.72)', border: `1px solid ${COLORS[activeKey]}55` }}>
                <div style={{ fontSize: 11, color: COLORS[activeKey], letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {copy.inputLabel} / {copy.outputLabel}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'end' }}>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginBottom: 2 }}>z</div>
                    <div style={{ fontSize: 22, fontWeight: 900, color: 'var(--sw-text)' }}>{zValue.toFixed(2)}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.55)', marginBottom: 2 }}>{copy.outputLabel}</div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: COLORS[activeKey] }}>{activeOutput.toFixed(3)}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </PanelCard>

        <PanelCard
          minHeight={0}
          padding={18}
          gap={12}
          style={{
            overflow: 'hidden',
            background:
              'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98)), radial-gradient(circle at top, rgba(255,79,160,0.08), transparent 35%)',
          }}
        >
          <div>
            <div style={{ fontSize: 11, color: COLORS[activeKey], fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase', marginBottom: 8 }}>
              {copy.infoTitle}
            </div>
            <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--sw-text)', lineHeight: 1.05, marginBottom: 8 }}>
              {activeFunction.label}
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--sw-text-dim)', lineHeight: 1.65 }}>{activeFunction.headline}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 10 }}>
            <MiniStat label={activeFunction.formula} value={`${copy.outputLabel} ${activeOutput.toFixed(3)}`} accent={COLORS[activeKey]} />
            <MiniStat label={activeFunction.outputRange} value={`grad ${derivative(activeKey, zValue).toFixed(3)}`} accent="#66b84a" />
            <MiniStat label="Comparacao" value={activeKey.toUpperCase()} accent="rgba(255,255,255,0.72)" />
          </div>

          <div
            style={{
              padding: '14px 15px',
              borderRadius: 16,
              border: `1px solid ${COLORS[activeKey]}44`,
              background:
                activeKey === 'linear'
                  ? 'linear-gradient(180deg, rgba(147,164,187,0.10), rgba(255,255,255,0.02))'
                  : activeKey === 'relu'
                    ? 'linear-gradient(180deg, rgba(22,224,255,0.10), rgba(255,255,255,0.02))'
                    : 'linear-gradient(180deg, rgba(255,79,160,0.10), rgba(255,255,255,0.02))',
            }}
          >
            <div style={{ fontSize: 11, color: COLORS[activeKey], fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
              {copy.takeawayTitle}
            </div>
            <div style={{ fontSize: 13, color: 'var(--sw-text-dim)', lineHeight: 1.7 }}>{copy.takeawayBody}</div>
          </div>

          <InfoList
            items={[
              { label: activeFunction.body, value: activeFunction.behavior },
              { label: activeFunction.gradientNote, value: buildGradientSentence(activeKey, zValue) },
              { label: activeFunction.example, value: copy.comparisonNote },
            ]}
            accent={COLORS[activeKey]}
          />

          <div style={{ marginTop: 'auto', display: 'grid', gap: 10 }}>
            {FUNCTION_KEYS.map((kind) => {
              const descriptor = copy.functions[kind];
              return (
                <FunctionSummaryRow
                  key={kind}
                  active={kind === activeKey}
                  accent={COLORS[kind]}
                  label={descriptor.label}
                  formula={descriptor.formula}
                  range={descriptor.outputRange}
                />
              );
            })}
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
};

function buildGradientSentence(kind: FunctionKey, z: number) {
  if (kind === 'linear') {
    return `gradiente local constante em ${derivative(kind, z).toFixed(2)}`;
  }
  if (kind === 'relu') {
    return z > 0 ? 'gradiente local 1.00 porque o sinal esta no lado ativo' : 'gradiente local 0.00 porque o sinal foi cortado';
  }
  return `gradiente local ${derivative(kind, z).toFixed(3)}, com pico perto do centro`;
}

const StatPill: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div
    style={{
      padding: '10px 12px',
      borderRadius: 999,
      border: `1px solid ${accent}55`,
      background: 'rgba(255,255,255,0.03)',
      minWidth: 0,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
    }}
  >
    <span style={{ fontSize: 10, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.12em' }}>{label}</span>
    <strong style={{ color: accent, fontFamily: 'monospace', fontSize: 13 }}>{value}</strong>
  </div>
);

const MiniFunctionChip: React.FC<{
  label: string;
  formula: string;
  value: number;
  slope: number;
  accent: string;
  active: boolean;
}> = ({ label, formula, value, slope, accent, active }) => (
  <div
    style={{
      minWidth: 146,
      padding: '10px 12px',
      borderRadius: 14,
      border: `1px solid ${active ? accent : 'rgba(255,255,255,0.06)'}`,
      background: active ? `${accent}18` : 'rgba(255,255,255,0.03)',
      boxShadow: active ? `0 0 0 1px ${accent}55, 0 0 24px ${accent}22` : 'none',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
      <strong style={{ color: accent, fontSize: 12, letterSpacing: '.05em' }}>{label}</strong>
      <span style={{ color: 'var(--sw-text-dim)', fontSize: 11, fontFamily: 'monospace' }}>{value.toFixed(3)}</span>
    </div>
    <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', lineHeight: 1.45, minHeight: 32 }}>{formula}</div>
    <div style={{ marginTop: 8, fontSize: 11, color: 'var(--sw-text)', display: 'flex', justifyContent: 'space-between' }}>
      <span>grad</span>
      <span style={{ color: accent, fontFamily: 'monospace', fontWeight: 800 }}>{slope.toFixed(3)}</span>
    </div>
  </div>
);

const MiniStat: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div style={{ padding: '10px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}33` }}>
    <div style={{ fontSize: 10, color: 'var(--sw-text-dim)', marginBottom: 4, lineHeight: 1.35 }}>{label}</div>
    <div style={{ color: accent, fontWeight: 900, fontSize: 15 }}>{value}</div>
  </div>
);

const InfoList: React.FC<{
  items: Array<{ label: string; value: string }>;
  accent: string;
}> = ({ items, accent }) => (
  <div style={{ display: 'grid', gap: 10 }}>
    {items.map((item) => (
      <div key={item.label} style={{ padding: '12px 14px', borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: `1px solid ${accent}24` }}>
        <div style={{ fontSize: 12, color: 'var(--sw-text)', fontWeight: 800, marginBottom: 4 }}>{item.label}</div>
        <div style={{ fontSize: 12.5, color: 'var(--sw-text-dim)', lineHeight: 1.6 }}>{item.value}</div>
      </div>
    ))}
  </div>
);

const FunctionSummaryRow: React.FC<{
  label: string;
  formula: string;
  range: string;
  accent: string;
  active: boolean;
}> = ({ label, formula, range, accent, active }) => (
  <div
    style={{
      padding: '10px 12px',
      borderRadius: 14,
      border: `1px solid ${active ? accent : 'rgba(255,255,255,0.06)'}`,
      background: active ? `${accent}12` : 'rgba(255,255,255,0.02)',
      display: 'grid',
      gap: 4,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
      <strong style={{ color: accent, fontSize: 12 }}>{label}</strong>
      <span style={{ color: 'var(--sw-text-dim)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em' }}>{range}</span>
    </div>
    <div style={{ color: 'var(--sw-text-dim)', fontSize: 11.5, lineHeight: 1.45 }}>{formula}</div>
  </div>
);
