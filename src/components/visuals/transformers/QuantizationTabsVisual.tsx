import React, { useState } from 'react';
import type { QuantizationTabsCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';

interface QuantizationTabsVisualProps {
  copy: QuantizationTabsCopy;
}

const eyebrowStyle: React.CSSProperties = {
  fontSize: sw.fsEyebrow,
  fontWeight: 700,
  letterSpacing: sw.lsEyebrow,
  textTransform: 'uppercase',
  color: sw.cyan,
};

const titleStyle: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  color: sw.text,
  margin: 0,
  lineHeight: 1.3,
};

const bodyStyle: React.CSSProperties = {
  fontSize: 13,
  lineHeight: 1.55,
  color: sw.textDim,
  margin: 0,
};

const footerStyle: React.CSSProperties = {
  marginTop: 4,
  paddingTop: 12,
  borderTop: `1px solid ${sw.borderSubtle}`,
  fontSize: 12,
  color: sw.textMuted,
  lineHeight: 1.5,
};

const bulletRowStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 8,
  fontSize: 13,
  color: sw.text,
  lineHeight: 1.5,
};

const bulletDotStyle: React.CSSProperties = {
  flexShrink: 0,
  width: 6,
  height: 6,
  borderRadius: 999,
  background: sw.cyan,
  marginTop: 7,
  boxShadow: `0 0 8px ${sw.cyan}88`,
};

const highlightStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 14px',
  borderRadius: 12,
  background: sw.tintStronger,
  border: `1px solid ${sw.borderSubtle}`,
  marginTop: 4,
  marginBottom: 4,
};

const highlightLabelStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: sw.lsSmall,
  textTransform: 'uppercase',
  color: sw.textDim,
};

const highlightValueStyle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: 700,
  color: sw.cyan,
  fontFamily: sw.fontMono,
};

const Panel: React.FC<{ copy: QuantizationTabsCopy['panels'][number] }> = ({ copy }) => (
  <PanelCard minHeight={0} padding={20} gap={12}>
    <div style={eyebrowStyle}>{copy.eyebrow}</div>
    <h4 style={titleStyle}>{copy.title}</h4>
    <p style={bodyStyle}>{copy.body}</p>
    <div style={highlightStyle}>
      <span style={highlightLabelStyle}>{copy.highlight.label}</span>
      <span style={highlightValueStyle}>{copy.highlight.value}</span>
    </div>
    <div style={{ display: 'grid', gap: 6 }}>
      {copy.bullets.map((b, i) => (
        <div key={i} style={bulletRowStyle}>
          <span style={bulletDotStyle} />
          <span>{b}</span>
        </div>
      ))}
    </div>
    <div style={footerStyle}>{copy.footer}</div>
  </PanelCard>
);

export const QuantizationTabsVisual = React.memo(({ copy }: QuantizationTabsVisualProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = copy.panels[activeIndex] ?? copy.panels[0];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontFamily: sw.fontSans,
      color: sw.text,
      minHeight: 0,
    }}>
      <TabsBar
        items={copy.tabs.map(t => ({ label: t.label }))}
        activeIndex={activeIndex}
        onChange={setActiveIndex}
        ariaLabel="Quantization aspects"
      />
      <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
        {active ? <Panel copy={active} /> : null}
      </div>
    </div>
  );
});
