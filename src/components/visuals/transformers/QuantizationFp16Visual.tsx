import React from 'react';
import type { QuantizationFp16Copy, QuantizationFp16FormatSpec } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';

interface Props {
  copy: QuantizationFp16Copy;
}

const FIELD_COLORS: Record<string, string> = {
  sign: '#FFD166',
  exponent: sw.pink,
  mantissa: sw.cyan,
};

function BitRegister({ spec }: { spec: QuantizationFp16FormatSpec }) {
  const totalBits = spec.fields.reduce((s, f) => s + f.bits, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: sw.text, fontFamily: sw.fontMono }}>
        {spec.name} ({totalBits} bits)
      </div>
      {/* Bit layout */}
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
      {/* Legend */}
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
      {/* Stats */}
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

export const QuantizationFp16Visual = React.memo(({ copy }: Props) => {
  return (
    <PanelCard minHeight={0} padding={20} gap={16}>
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

        {/* Two registers side by side */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <BitRegister spec={copy.fp32} />
          <div style={{ borderTop: `1px solid ${sw.borderSubtle}` }} />
          <BitRegister spec={copy.fp16} />
        </div>

        {/* Takeaway */}
        <div
          style={{
            marginTop: 16,
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
    </PanelCard>
  );
});
