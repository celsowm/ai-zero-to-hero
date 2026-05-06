import React, { useState, useMemo } from 'react';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { PanelCard } from '../PanelCard';
import { sw } from '../../../theme/tokens';
import type { WeightsBiasesExplorerCopy, WeightsBiasesExplorerPanelCopy, WeightsBiasesExplorerCombinedPanelCopy } from '../../../types/slide';

interface WeightsBiasesExplorerProps {
  copy: WeightsBiasesExplorerCopy;
}

const fontFamily = sw.fontSans;

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--sw-cyan)',
  marginBottom: 12,
};

const SliderControl: React.FC<{
  panel: WeightsBiasesExplorerPanelCopy;
  currentValue: number;
  isWeight: boolean;
  onChange: (val: number) => void;
}> = ({ panel, currentValue, isWeight, onChange }) => (
  <div
    style={{
      padding: 16,
      borderRadius: 16,
      background: sw.tintStrong,
      border: `1px solid ${sw.borderSubtle}`,
      marginBottom: 16,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
      <span style={{ fontSize: 13, color: 'var(--sw-text-muted)' }}>{panel.sliderLabel}</span>
      <span
        style={{
          fontFamily: sw.fontMono,
          fontSize: 13,
          color: sw.cyan,
          background: 'rgba(0, 229, 255, 0.1)',
          padding: '2px 8px',
          borderRadius: 6,
          border: `1px solid ${sw.cyan}44`,
        }}
      >
        {isWeight ? `w = ${currentValue.toFixed(1)}` : `b = ${currentValue.toFixed(1)}`}
      </span>
    </div>
    <input
      type="range"
      min={panel.min}
      max={panel.max}
      step={panel.step}
      value={currentValue}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      style={{ width: '100%', accentColor: sw.cyan, cursor: 'pointer' }}
    />
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: sw.textMuted, marginTop: 4 }}>
      <span>{panel.min}</span>
      <span>{panel.max}</span>
    </div>
  </div>
);

const ControlPanel: React.FC<{
  panel: WeightsBiasesExplorerPanelCopy;
  currentValue: number;
  isWeightTab: boolean;
  onChange: (val: number) => void;
}> = ({ panel, currentValue, isWeightTab, onChange }) => (
  <PanelCard>
    <div style={eyebrowStyle}>{panel.eyebrow}</div>
    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)', marginBottom: 8 }}>
      {panel.title}
    </div>
    <p style={{ margin: '0 0 18px 0', fontSize: 14, lineHeight: 1.7, color: 'var(--sw-text-dim)' }}>
      {panel.description}
    </p>
    <SliderControl panel={panel} currentValue={currentValue} isWeight={isWeightTab} onChange={onChange} />
  </PanelCard>
);

const CombinedControlPanel: React.FC<{
  combinedPanel: WeightsBiasesExplorerCombinedPanelCopy;
  weightPanel: WeightsBiasesExplorerPanelCopy;
  biasPanel: WeightsBiasesExplorerPanelCopy;
  currentW: number;
  currentB: number;
  onWChange: (val: number) => void;
  onBChange: (val: number) => void;
}> = ({ combinedPanel, weightPanel, biasPanel, currentW, currentB, onWChange, onBChange }) => (
  <PanelCard>
    <div style={eyebrowStyle}>{combinedPanel.eyebrow}</div>
    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)', marginBottom: 8 }}>
      {combinedPanel.title}
    </div>
    <p style={{ margin: '0 0 18px 0', fontSize: 14, lineHeight: 1.7, color: 'var(--sw-text-dim)' }}>
      {combinedPanel.description}
    </p>
    <SliderControl panel={weightPanel} currentValue={currentW} isWeight={true} onChange={onWChange} />
    <SliderControl panel={biasPanel} currentValue={currentB} isWeight={false} onChange={onBChange} />
  </PanelCard>
);

/* ── Chart constants ─────────────────────────────────────────── */
const CHART_W = 400;
const CHART_H = 280;
const PAD = { left: 52, right: 20, top: 28, bottom: 36 };
const PLOT_W = CHART_W - PAD.left - PAD.right;
const PLOT_H = CHART_H - PAD.top - PAD.bottom;

/** Generate "nice" tick marks for a given range */
function niceTicks(min: number, max: number, maxTicks = 6): number[] {
  const range = max - min;
  if (range === 0) return [min];
  const roughStep = range / (maxTicks - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual = roughStep / magnitude;
  let niceStep: number;
  if (residual <= 1.5) niceStep = 1 * magnitude;
  else if (residual <= 3) niceStep = 2 * magnitude;
  else if (residual <= 7) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;

  const ticks: number[] = [];
  let t = Math.ceil(min / niceStep) * niceStep;
  while (t <= max + niceStep * 0.01) {
    ticks.push(parseFloat(t.toFixed(10)));
    t += niceStep;
  }
  return ticks;
}

function formatTick(v: number): string {
  if (Math.abs(v) < 1e-9) return '0';
  return Number.isInteger(v) ? String(v) : v.toFixed(1);
}

export const WeightsBiasesExplorer = React.memo(({ copy }: WeightsBiasesExplorerProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [weightValue, setWeightValue] = useState(copy.weightPanel.initialValue);
  const [biasValue, setBiasValue] = useState(copy.biasPanel.initialValue);

  const isWeightTab = activeTab === 0;
  const isBiasTab = activeTab === 1;
  const isCombinedTab = activeTab === 2;

  const currentW = isWeightTab ? weightValue : isBiasTab ? 1 : weightValue;
  const currentB = isWeightTab ? 0 : isBiasTab ? biasValue : biasValue;

  /* ── Dynamic Y range ─────────────────────────────────────── */
  const xMin = -5;
  const xMax = 5;
  const yAtMin = currentW * xMin + currentB;
  const yAtMax = currentW * xMax + currentB;
  const yAbsMax = Math.max(Math.abs(yAtMin), Math.abs(yAtMax), Math.abs(currentB), 1);
  // Add 15% padding so the line never touches the edge
  const yMargin = yAbsMax * 0.15 + 0.5;
  const yMin = -yAbsMax - yMargin;
  const yMax = yAbsMax + yMargin;

  /* ── Coordinate transforms ───────────────────────────────── */
  const toSvgX = (x: number) => PAD.left + ((x - xMin) / (xMax - xMin)) * PLOT_W;
  const toSvgY = (y: number) => PAD.top + PLOT_H - ((y - yMin) / (yMax - yMin)) * PLOT_H;

  /* ── Ticks ───────────────────────────────────────────────── */
  const xTicks = useMemo(() => niceTicks(xMin, xMax, 6), [xMin, xMax]);
  const yTicks = useMemo(() => niceTicks(yMin, yMax, 6), [yMin, yMax]);

  /* ─ Line endpoints (extended beyond plot so it always crosses) ── */
  const lineX1 = xMin;
  const lineY1 = currentW * lineX1 + currentB;
  const lineX2 = xMax;
  const lineY2 = currentW * lineX2 + currentB;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TabsBar ariaLabel="Weights and biases views" items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />

      <TabbedPanelSurface>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
          {isCombinedTab ? (
            <CombinedControlPanel
              combinedPanel={copy.combinedPanel}
              weightPanel={copy.weightPanel}
              biasPanel={copy.biasPanel}
              currentW={currentW}
              currentB={currentB}
              onWChange={(v) => setWeightValue(v)}
              onBChange={(v) => setBiasValue(v)}
            />
          ) : (
            <ControlPanel
              panel={isWeightTab ? copy.weightPanel : copy.biasPanel}
              currentValue={isWeightTab ? weightValue : biasValue}
              isWeightTab={isWeightTab}
              onChange={isWeightTab ? (v) => setWeightValue(v) : (v) => setBiasValue(v)}
            />
          )}

          <div
            style={{
              flex: 1,
              position: 'relative',
              borderRadius: 16,
              background: `radial-gradient(circle at 50% 50%, rgba(255, 46, 151, 0.08), transparent 50%), ${sw.tint}`,
              border: `1px solid ${sw.borderSubtle}`,
              overflow: 'hidden',
              minHeight: 200,
            }}
          >
            {/* Chart title */}
            <div style={{ position: 'absolute', top: 8, left: PAD.left + 4, fontSize: 12, fontWeight: 600, color: 'var(--sw-text)', fontFamily }}>
              {copy.chartTitle}
            </div>
            {/* Axis labels */}
            <div style={{ position: 'absolute', bottom: 6, right: PAD.right + 4, fontSize: 10, color: 'var(--sw-text-muted)', fontFamily }}>
              {copy.xLabel}
            </div>
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: 2,
                transform: 'translateY(-50%) rotate(-90deg)',
                fontSize: 10,
                color: 'var(--sw-text-muted)',
                fontFamily,
                whiteSpace: 'nowrap',
              }}
            >
              {copy.yLabel}
            </div>

            <svg viewBox={`0 0 ${CHART_W} ${CHART_H}`} width="100%" height="100%" style={{ display: 'block' }}>
              {/* Grid lines */}
              {xTicks.map((tick) => (
                <line key={`gx-${tick}`} x1={toSvgX(tick)} y1={PAD.top} x2={toSvgX(tick)} y2={PAD.top + PLOT_H} stroke={sw.gridLineAlt} strokeWidth="0.8" />
              ))}
              {yTicks.map((tick) => (
                <line key={`gy-${tick}`} x1={PAD.left} y1={toSvgY(tick)} x2={PAD.left + PLOT_W} y2={toSvgY(tick)} stroke={sw.gridLineAlt} strokeWidth="0.8" />
              ))}

              {/* Axes */}
              {yMin <= 0 && yMax >= 0 && (
                <line x1={PAD.left} y1={toSvgY(0)} x2={PAD.left + PLOT_W} y2={toSvgY(0)} stroke={sw.axisLineStrong} strokeWidth="1.5" />
              )}
              {xMin <= 0 && xMax >= 0 && (
                <line x1={toSvgX(0)} y1={PAD.top} x2={toSvgX(0)} y2={PAD.top + PLOT_H} stroke={sw.axisLineStrong} strokeWidth="1.5" />
              )}

              {/* Plot border */}
              <rect x={PAD.left} y={PAD.top} width={PLOT_W} height={PLOT_H} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

              {/* Dynamic line */}
              <line
                x1={toSvgX(lineX1)}
                y1={toSvgY(lineY1)}
                x2={toSvgX(lineX2)}
                y2={toSvgY(lineY2)}
                stroke={sw.pink}
                strokeWidth="2.5"
                strokeLinecap="round"
                style={{ transition: 'all 0.1s ease-out' }}
              />

              {/* Pivot point at (0, b) */}
              <circle cx={toSvgX(0)} cy={toSvgY(currentB)} r="5" fill={sw.cyan} style={{ transition: 'all 0.1s ease-out' }} />
              <circle cx={toSvgX(0)} cy={toSvgY(currentB)} r="3" fill={sw.tint} style={{ transition: 'all 0.1s ease-out' }} />

              {/* X-axis tick labels */}
              {xTicks.map((tick) => (
                <text key={`xl-${tick}`} x={toSvgX(tick)} y={PAD.top + PLOT_H + 16} textAnchor="middle" fontSize="9" fontFamily={fontFamily} fill="rgba(248,250,252,0.45)">
                  {formatTick(tick)}
                </text>
              ))}

              {/* Y-axis tick labels */}
              {yTicks.map((tick) => (
                <text key={`yl-${tick}`} x={PAD.left - 6} y={toSvgY(tick) + 3.5} textAnchor="end" fontSize="9" fontFamily={fontFamily} fill="rgba(248,250,252,0.45)">
                  {formatTick(tick)}
                </text>
              ))}
            </svg>
          </div>
        </div>
      </TabbedPanelSurface>
    </div>
  );
});
