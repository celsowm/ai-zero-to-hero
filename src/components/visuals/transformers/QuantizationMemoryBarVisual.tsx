import React from 'react';
import type { QuantizationMemoryBarCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';

interface Props {
  copy: QuantizationMemoryBarCopy;
}

export const QuantizationMemoryBarVisual = React.memo(({ copy }: Props) => {
  const maxVram = Math.max(...copy.entries.map((e) => e.vram7b));

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
                {/* Label row */}
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
                {/* Bar */}
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

        {/* Footer note */}
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
    </PanelCard>
  );
});
