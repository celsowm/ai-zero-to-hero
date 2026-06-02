import React, { useState } from 'react';
import type { QuantizationNf4Copy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';
import { ChartFrame } from '../charts/ChartFrame';

interface Props {
  copy: QuantizationNf4Copy;
}

function gaussian(x: number): number {
  return Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
}

const NF4_LEVELS = [
  -1.0, -0.6961928009986877, -0.5250730514526367, -0.39491748809814453,
  -0.28444138169288635, -0.18477343022823334, -0.09105003625154495, 0.0,
  0.07958029955625534, 0.16093020141124725, 0.24611230194568634, 0.33791524171829224,
  0.44070982933044434, 0.5626170039176941, 0.7229568362236023, 1.0,
];

const CHART_W = 340;
const CHART_H = 130;

function LevelChart({
  title,
  levels,
  showError,
  color,
}: {
  title: string;
  levels: number[];
  showError: boolean;
  color: string;
}) {
  const curvePoints: { x: number; y: number }[] = [];
  for (let i = 0; i <= 200; i++) {
    const x = -3.5 + i * 0.035;
    curvePoints.push({ x, y: gaussian(x) });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color, fontFamily: sw.fontMono }}>{title}</div>
      <ChartFrame
        width={CHART_W}
        height={CHART_H}
        xDomain={[-3.5, 3.5]}
        yDomain={[0, 0.45]}
        xLabel="Weight value"
        yLabel=""
        tickCount={4}
      >
        {(ctx) => (
          <>
            <path
              d={curvePoints
                .map((p, i) => `${i === 0 ? 'M' : 'L'} ${ctx.xScale(p.x)} ${ctx.yScale(p.y)}`)
                .join(' ')}
              fill="none"
              stroke={sw.textMuted}
              strokeWidth={1.5}
              opacity={0.5}
            />

            {levels.filter((v) => v >= -3.5 && v <= 3.5).map((v, i) => {
              const xPx = ctx.xScale(v);
              const yPx = ctx.yScale(gaussian(v));
              const y0 = ctx.yScale(0);
              return (
                <g key={i}>
                  <line
                    x1={xPx} y1={yPx} x2={xPx} y2={y0}
                    stroke={color} strokeWidth={1}
                    strokeDasharray="2 2" opacity={0.7}
                  />
                  <circle cx={xPx} cy={yPx} r={3} fill={color} opacity={0.9} />
                </g>
              );
            })}

            {showError &&
              curvePoints
                .filter((_, i) => i % 8 === 0)
                .map((p, i) => {
                  const nearestLevel = levels.reduce((best, l) =>
                    Math.abs(l - p.x) < Math.abs(best - p.x) ? l : best,
                  );
                  const err = Math.abs(p.x - nearestLevel);
                  const xPx = ctx.xScale(p.x);
                  const yPx = ctx.yScale(p.y);
                  const errH = err * 20;
                  return (
                    <rect
                      key={i}
                      x={xPx - 2}
                      y={yPx - errH}
                      width={4}
                      height={errH}
                      fill="#FFD166"
                      opacity={0.5}
                    />
                  );
                })}
          </>
        )}
      </ChartFrame>
      <div style={{ fontSize: 10, color: sw.textMuted }}>
        {levels.length} níveis — espaçamento {levels[1] !== undefined ? Math.abs(levels[1] - levels[0]).toFixed(3) : '?'}
      </div>
    </div>
  );
}

const VisualPanel: React.FC<{ copy: QuantizationNf4Copy }> = ({ copy }) => {
  const [showError, setShowError] = useState(false);
  const uniformLevels = Array.from({ length: 16 }, (_, i) => -1 + i * (2 / 15));

  return (
    <div style={{ fontFamily: sw.fontSans, color: sw.text, overflow: 'auto', flex: 1, minHeight: 0 }}>
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

      <button
        onClick={() => setShowError((v) => !v)}
        style={{
          padding: '5px 12px',
          borderRadius: 8,
          border: `1px solid ${showError ? '#FFD166' : sw.borderSubtle}`,
          background: showError ? '#FFD16620' : 'transparent',
          color: showError ? '#FFD166' : sw.textDim,
          fontSize: 11,
          fontWeight: 600,
          cursor: 'pointer',
          marginBottom: 12,
        }}
      >
        {showError ? copy.hideErrorLabel : copy.showErrorLabel}
      </button>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <LevelChart
          title={copy.uniformLabel}
          levels={uniformLevels}
          showError={showError}
          color={sw.pink}
        />
        <LevelChart
          title={copy.nf4Label}
          levels={NF4_LEVELS}
          showError={showError}
          color={sw.cyan}
        />
      </div>

      <div
        style={{
          marginTop: 12,
          padding: '8px 12px',
          borderRadius: 8,
          background: `${sw.cyan}15`,
          border: `1px solid ${sw.cyan}40`,
          fontSize: 11,
          color: sw.textDim,
        }}
      >
        <span style={{ fontWeight: 700, color: sw.cyan }}>{copy.centralCoverageLabel}</span>
      </div>

      <div
        style={{
          marginTop: 8,
          padding: '10px 12px',
          borderRadius: 8,
          background: sw.tintStronger,
          border: `1px solid ${sw.borderSubtle}`,
          fontSize: 11,
          color: sw.textDim,
          lineHeight: 1.55,
        }}
      >
        {copy.takeaway}
      </div>
    </div>
  );
};

export const QuantizationNf4Visual = React.memo(({ copy }: Props) => {
  const hasCode = !!copy.codePanel;
  const tabs = copy.tabs ?? [{ label: 'Visual' }, { label: 'Código' }];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PanelCard minHeight={0} padding={20} gap={12}>
      {hasCode && tabs.length > 1 ? (
        <>
          <TabsBar
            items={tabs}
            activeIndex={activeTab}
            onChange={setActiveTab}
            ariaLabel="Quantization NF4 tabs"
          />
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex' }}>
            {activeTab === 0 ? (
              <VisualPanel copy={copy} />
            ) : copy.codePanel ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, width: '100%' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: sw.text, marginBottom: 4 }}>
                  {copy.codePanel.title}
                </div>
                <div style={{ fontSize: 12, color: sw.textDim, marginBottom: 10, lineHeight: 1.5 }}>
                  {copy.codePanel.description}
                </div>
                <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                  <CodeBlock
                    sourceRef={copy.codePanel.source}
                    language="python"
                    explanations={copy.codePanel.codeExplanations}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <VisualPanel copy={copy} />
      )}
    </PanelCard>
  );
});
