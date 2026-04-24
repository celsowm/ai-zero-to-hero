import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { ContextWindowSliderCopy } from '../../../types/slide';

interface ContextWindowSliderProps {
  copy: ContextWindowSliderCopy;
}

export const ContextWindowSlider = React.memo(({ copy }: ContextWindowSliderProps) => {
  const [position, setPosition] = useState(3);

  const fullText = copy.fullText ?? 'The quick brown fox jumps over the lazy dog and keeps running through the open field until sunset arrives';
  const windowSize = 5;
  const tokens = fullText.split(' ').map(t => t.trim()).filter(Boolean);
  const forgottenLabel = copy.forgottenLabel ?? 'Forgotten';
  const activeLabel = copy.activeLabel ?? 'Active Window';

  if (tokens.length <= windowSize) {
    return (
      <div style={{ padding: 24, fontFamily: sw.fontSans, color: sw.textDim }}>
        Not enough tokens to display.
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: sw.surface,
      borderRadius: '24px',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowSoft,
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: sw.fontSans
    }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', color: sw.void }}>{copy.windowLabel}</div>
        <input
          type="range"
          min="0"
          max={tokens.length - windowSize}
          value={position}
          onChange={(e) => setPosition(parseInt(e.target.value))}
          style={{ width: '200px', cursor: 'pointer' }}
        />
      </div>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', position: 'relative', padding: '20px 0' }}>
        {tokens.map((token, i) => {
          const isForgotten = i < position;
          const isActive = i >= position && i < position + windowSize;
          const isFuture = i >= position + windowSize;

          let bg: string = sw.tint;
          let color: string = sw.textMuted;
          let border: string = `1px solid ${sw.borderSubtle}`;

          if (isActive) {
            bg = 'rgba(0, 229, 255, 0.08)' as string;
            color = sw.cyan as string;
            border = `2px solid ${sw.cyan}` as string;
          }

          return (
            <div key={i} style={{
              padding: '12px 20px',
              background: bg,
              color: color,
              border: border,
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: isActive ? '700' : '500',
              transition: 'all 0.3s ease',
              opacity: isForgotten ? 0.4 : isFuture ? 0.4 : 1,
              transform: isActive ? 'scale(1.05)' : 'scale(1)'
            }}>
              {token}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: sw.tint, border: `1px solid ${sw.borderSubtle}`, borderRadius: '4px', opacity: 0.4 }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: sw.textDim }}>{forgottenLabel}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: 'rgba(0, 229, 255, 0.08)', border: `2px solid ${sw.cyan}`, borderRadius: '4px' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: sw.cyan }}>{activeLabel}</span>
        </div>
      </div>
    </div>
  );
});

