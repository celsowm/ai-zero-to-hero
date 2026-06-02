import React, { useState } from 'react';
import type { QuantizationFp8Copy, QuantizationFp8FormatSpec } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

interface Props {
  copy: QuantizationFp8Copy;
}

const FIELD_COLORS: Record<string, string> = {
  sign: '#FFD166',
  exponent: sw.pink,
  mantissa: sw.cyan,
};

function BitRegister({ spec }: { spec: QuantizationFp8FormatSpec }) {
  const totalBits = spec.fields.reduce((s, f) => s + f.bits, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: sw.text, fontFamily: sw.fontMono }}>
        {spec.name} ({totalBits} bits)
      </div>
      <div style={{ display: 'flex', gap: 2 }}>
        {spec.fields.map((field) => {
          const color = FIELD_COLORS[field.label.toLowerCase()] ?? sw.cyan;
          return (
            <div
              key={field.label}
              style={{
                flex: field.bits,
                height: 32,
                borderRadius: 5,
                background: `${color}30`,
                border: `1px solid ${color}80`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 10,
                fontWeight: 700,
                color,
                fontFamily: sw.fontMono,
                minWidth: 0,
              }}
            >
              {field.bits}b
            </div>
          );
        })}
      </div>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {spec.fields.map((field) => {
          const color = FIELD_COLORS[field.label.toLowerCase()] ?? sw.cyan;
          return (
            <div key={field.label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <div style={{ width: 10, height: 10, borderRadius: 3, background: color }} />
              <span style={{ fontSize: 11, color: sw.textDim }}>
                {field.label} ({field.bits}b): {field.description}
              </span>
            </div>
          );
        })}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 6,
        }}
      >
        <div
          style={{
            padding: '8px 10px',
            borderRadius: 8,
            background: sw.tintStronger,
            border: `1px solid ${sw.borderSubtle}`,
          }}
        >
          <div style={{ fontSize: 10, color: sw.textMuted, marginBottom: 2 }}>Range máximo</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: sw.text, fontFamily: sw.fontMono }}>
            {spec.maxValue}
          </div>
        </div>
        <div
          style={{
            padding: '8px 10px',
            borderRadius: 8,
            background: sw.tintStronger,
            border: `1px solid ${sw.borderSubtle}`,
          }}
        >
          <div style={{ fontSize: 10, color: sw.textMuted, marginBottom: 2 }}>Menor positivo</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: sw.text, fontFamily: sw.fontMono }}>
            {spec.minPositive}
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: 11,
          color: sw.textMuted,
          lineHeight: 1.5,
          fontStyle: 'italic',
          padding: '6px 10px',
          background: sw.tintStronger,
          borderRadius: 6,
          border: `1px solid ${sw.borderSubtle}`,
        }}
      >
        {spec.insight}
      </div>
    </div>
  );
}

const VisualPanel: React.FC<{ copy: QuantizationFp8Copy }> = ({ copy }) => (
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
    <h4 style={{ fontSize: 15, fontWeight: 700, color: sw.text, margin: '0 0 14px' }}>
      {copy.title}
    </h4>

    {/* Forward vs Backward use case row */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        marginBottom: 14,
      }}
    >
      <div
        style={{
          padding: '8px 12px',
          borderRadius: 10,
          background: `${sw.cyan}15`,
          border: `1px solid ${sw.cyan}40`,
        }}
      >
        <div style={{ fontSize: 10, color: sw.textMuted, marginBottom: 2, textTransform: 'uppercase', letterSpacing: sw.lsSmall, fontWeight: 700 }}>
          {copy.forwardLabel}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: sw.cyan, fontFamily: sw.fontMono }}>
          E4M3
        </div>
      </div>
      <div
        style={{
          padding: '8px 12px',
          borderRadius: 10,
          background: `${sw.pink}15`,
          border: `1px solid ${sw.pink}40`,
        }}
      >
        <div style={{ fontSize: 10, color: sw.textMuted, marginBottom: 2, textTransform: 'uppercase', letterSpacing: sw.lsSmall, fontWeight: 700 }}>
          {copy.backwardLabel}
        </div>
        <div style={{ fontSize: 12, fontWeight: 700, color: sw.pink, fontFamily: sw.fontMono }}>
          E5M2
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      <BitRegister spec={copy.fp16} />
      <div style={{ borderTop: `1px solid ${sw.borderSubtle}` }} />
      <BitRegister spec={copy.e4m3} />
      <div style={{ borderTop: `1px solid ${sw.borderSubtle}` }} />
      <BitRegister spec={copy.e5m2} />
    </div>

    <div
      style={{
        marginTop: 14,
        padding: '10px 14px',
        borderRadius: 10,
        background: `${sw.pink}15`,
        border: `1px solid ${sw.pink}40`,
        fontSize: 12,
        color: sw.text,
        lineHeight: 1.6,
      }}
    >
      {copy.takeaway}
    </div>
  </div>
);

export const QuantizationFp8Visual = React.memo(({ copy }: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PanelCard minHeight={0} padding={20} gap={12}>
      <TabsBar
        items={copy.tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
        ariaLabel="Quantization FP8 tabs"
      />
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex' }}>
        {activeTab === 0 ? (
          <VisualPanel copy={copy} />
        ) : (
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
        )}
      </div>
    </PanelCard>
  );
});
