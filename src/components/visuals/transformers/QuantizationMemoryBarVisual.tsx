import React, { useState } from 'react';
import type { QuantizationMemoryBarCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

interface Props {
  copy: QuantizationMemoryBarCopy;
}

const VisualPanel: React.FC<{ copy: QuantizationMemoryBarCopy }> = ({ copy }) => {
  const maxVram = Math.max(...copy.entries.map((e) => e.vram7b));

  return (
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
      <h4 style={{ fontSize: 16, fontWeight: 700, color: sw.text, margin: '0 0 16px' }}>
        {copy.title}
      </h4>

      {/* Bar chart */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {copy.entries.map((entry) => {
          const pct = (entry.vram7b / maxVram) * 100;
          const barColor = entry.color === 'pink' ? sw.pink : sw.cyan;
          return (
            <div key={entry.label}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                }}
              >
                <span style={{ fontWeight: 700, fontSize: 13, fontFamily: sw.fontMono, color: barColor }}>
                  {entry.label}
                </span>
                <span style={{ fontSize: 12, color: sw.textDim }}>
                  {entry.vram7b} {copy.gbUnit} — {entry.bytes} bytes/peso
                </span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: 28,
                  borderRadius: 6,
                  background: sw.tintStronger,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: `${pct}%`,
                    borderRadius: 6,
                    background: `linear-gradient(90deg, ${barColor}40, ${barColor}90)`,
                    border: `1px solid ${barColor}60`,
                    transition: 'width 0.3s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 11,
                    color: sw.textDim,
                  }}
                >
                  {entry.note}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 16,
          paddingTop: 12,
          borderTop: `1px solid ${sw.borderSubtle}`,
          fontSize: 12,
          color: sw.textMuted,
          lineHeight: 1.5,
        }}
      >
        {copy.note}
      </div>
    </div>
  );
};

export const QuantizationMemoryBarVisual = React.memo(({ copy }: Props) => {
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
            ariaLabel="Quantization overview tabs"
          />
          <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            {activeTab === 0 ? (
              <VisualPanel copy={copy} />
            ) : copy.codePanel ? (
              <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
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
