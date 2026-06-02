import React, { useState } from 'react';
import type { BitsandbytesIntroCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

interface Props {
  copy: BitsandbytesIntroCopy;
}

const VisualPanel: React.FC<{ copy: BitsandbytesIntroCopy }> = ({ copy }) => (
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
    <h4 style={{ fontSize: 15, fontWeight: 700, color: sw.text, margin: '0 0 16px' }}>
      {copy.title}
    </h4>

    {/* Dependency stack */}
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 16 }}>
      {copy.layers.map((layer, i) => {
        const color = layer.color === 'pink' ? sw.pink : sw.cyan;
        const isLast = i === copy.layers.length - 1;
        return (
          <React.Fragment key={layer.label}>
            <div
              style={{
                padding: '12px 16px',
                borderRadius: 10,
                background: `${color}18`,
                border: `1px solid ${color}50`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 999,
                  background: color,
                  boxShadow: `0 0 8px ${color}80`,
                  flexShrink: 0,
                }}
              />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color, fontFamily: sw.fontMono }}>
                  {layer.label}
                </div>
                <div style={{ fontSize: 11, color: sw.textDim, marginTop: 2 }}>{layer.detail}</div>
              </div>
            </div>
            {!isLast && (
              <div style={{ display: 'flex', justifyContent: 'center', color: sw.textMuted, fontSize: 16 }}>
                ↓
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>

    {/* Features grid */}
    <div style={{ borderTop: `1px solid ${sw.borderSubtle}`, paddingTop: 14, marginBottom: 12 }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: sw.text, marginBottom: 10 }}>
        {copy.featuresTitle}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {copy.features.map((feature) => (
          <div
            key={feature.label}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
              padding: '8px 12px',
              borderRadius: 8,
              background: sw.tintStronger,
              border: `1px solid ${sw.borderSubtle}`,
            }}
          >
            <span style={{ fontSize: 16, flexShrink: 0 }}>{feature.icon}</span>
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: sw.text }}>{feature.label}</div>
              <div style={{ fontSize: 11, color: sw.textDim, marginTop: 2 }}>{feature.detail}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Contract */}
    <div
      style={{
        padding: '10px 14px',
        borderRadius: 8,
        background: `${sw.cyan}12`,
        border: `1px solid ${sw.cyan}30`,
        fontSize: 12,
        color: sw.textDim,
        lineHeight: 1.55,
      }}
    >
      <span style={{ fontWeight: 700, color: sw.cyan }}>{copy.contractTitle}: </span>
      {copy.contractNote}
    </div>
  </div>
);

export const BitsandbytesIntroVisual = React.memo(({ copy }: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PanelCard minHeight={0} padding={20} gap={12}>
      <TabsBar
        items={copy.tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
        ariaLabel="Bitsandbytes intro tabs"
      />
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {activeTab === 0 ? (
          <VisualPanel copy={copy} />
        ) : (
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
        )}
      </div>
    </PanelCard>
  );
});
