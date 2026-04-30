import React, { useState } from 'react';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { PanelCard } from '../PanelCard';
import { sw } from '../../../theme/tokens';
import type { WeightsBiasesExplorerCopy, WeightsBiasesExplorerPanelCopy, WeightsBiasesExplorerCombinedPanelCopy } from '../../../types/slide';

interface WeightsBiasesExplorerProps {
  copy: WeightsBiasesExplorerCopy;
}

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
    <div
      style={{
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--sw-text)',
        marginBottom: 8,
      }}
    >
      {panel.title}
    </div>
    <p
      style={{
        margin: '0 0 18px 0',
        fontSize: 14,
        lineHeight: 1.7,
        color: 'var(--sw-text-dim)',
      }}
    >
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
    <div
      style={{
        fontSize: 20,
        fontWeight: 700,
        letterSpacing: '-0.02em',
        color: 'var(--sw-text)',
        marginBottom: 8,
      }}
    >
      {combinedPanel.title}
    </div>
    <p
      style={{
        margin: '0 0 18px 0',
        fontSize: 14,
        lineHeight: 1.7,
        color: 'var(--sw-text-dim)',
      }}
    >
      {combinedPanel.description}
    </p>
    <SliderControl panel={weightPanel} currentValue={currentW} isWeight={true} onChange={onWChange} />
    <SliderControl panel={biasPanel} currentValue={currentB} isWeight={false} onChange={onBChange} />
  </PanelCard>
);

export const WeightsBiasesExplorer = React.memo(({ copy }: WeightsBiasesExplorerProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [weightValue, setWeightValue] = useState(copy.weightPanel.initialValue);
  const [biasValue, setBiasValue] = useState(copy.biasPanel.initialValue);

  const isWeightTab = activeTab === 0;
  const isBiasTab = activeTab === 1;
  const isCombinedTab = activeTab === 2;

  const currentW = isWeightTab ? weightValue : isBiasTab ? 1 : weightValue;
  const currentB = isWeightTab ? 0 : isBiasTab ? biasValue : biasValue;

  const handleWChange = (val: number) => setWeightValue(val);
  const handleBChange = (val: number) => setBiasValue(val);

  // ViewBox: -5 to 5 on X and Y axes.
  const svgMinX = -5;
  const svgMaxX = 5;
  const svgMinY = -5;
  const svgMaxY = 5;
  
  const getY = (x: number) => currentW * x + currentB;

  const x1 = svgMinX;
  const y1 = getY(x1);
  const x2 = svgMaxX;
  const y2 = getY(x2);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TabsBar
        ariaLabel="Weights and biases views"
        items={copy.tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <TabbedPanelSurface>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 16 }}>
          {isCombinedTab ? (
            <CombinedControlPanel
              combinedPanel={copy.combinedPanel}
              weightPanel={copy.weightPanel}
              biasPanel={copy.biasPanel}
              currentW={currentW}
              currentB={currentB}
              onWChange={handleWChange}
              onBChange={handleBChange}
            />
          ) : (
            <ControlPanel
              panel={isWeightTab ? copy.weightPanel : copy.biasPanel}
              currentValue={isWeightTab ? weightValue : biasValue}
              isWeightTab={isWeightTab}
              onChange={isWeightTab ? handleWChange : handleBChange}
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
            <div style={{ position: 'absolute', top: 16, left: 16, fontSize: 13, fontWeight: 600, color: 'var(--sw-text)' }}>
              {copy.chartTitle}
            </div>
            <div style={{ position: 'absolute', bottom: 16, right: 16, fontSize: 11, fontWeight: 500, color: 'var(--sw-text-muted)' }}>
              {copy.xLabel}
            </div>
            <div style={{ position: 'absolute', top: 16, right: 16, fontSize: 11, fontWeight: 500, color: 'var(--sw-text-muted)' }}>
              {copy.yLabel}
            </div>
            
            <svg
              viewBox={`${svgMinX} ${svgMinY} ${svgMaxX - svgMinX} ${svgMaxY - svgMinY}`}
              style={{ width: '100%', height: '100%', display: 'block', transform: 'scaleY(-1)' }}
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Grid Lines */}
              {Array.from({ length: 11 }).map((_, i) => {
                const pos = -5 + i;
                return (
                  <React.Fragment key={`grid-${i}`}>
                    <line x1={pos} y1={svgMinY} x2={pos} y2={svgMaxY} stroke={sw.gridLineAlt} strokeWidth="0.05" />
                    <line x1={svgMinX} y1={pos} x2={svgMaxX} y2={pos} stroke={sw.gridLineAlt} strokeWidth="0.05" />
                  </React.Fragment>
                );
              })}

              {/* Axes */}
              <line x1={svgMinX} y1={0} x2={svgMaxX} y2={0} stroke={sw.axisLineStrong} strokeWidth="0.1" />
              <line x1={0} y1={svgMinY} x2={0} y2={svgMaxY} stroke={sw.axisLineStrong} strokeWidth="0.1" />

              {/* Dynamic Line */}
              <line
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={sw.pink}
                strokeWidth="0.15"
                strokeLinecap="round"
                style={{ transition: 'all 0.1s ease-out' }}
              />

              {/* Pivot Point */}
              <circle
                cx={0}
                cy={currentB}
                r="0.2"
                fill={sw.cyan}
                style={{ transition: 'all 0.1s ease-out' }}
              />
            </svg>
          </div>
        </div>
      </TabbedPanelSurface>
    </div>
  );
});