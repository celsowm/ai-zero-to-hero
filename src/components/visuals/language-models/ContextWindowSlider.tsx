import React, { useState } from 'react';
import type { ContextWindowSliderCopy } from '../../../types/slide';

interface ContextWindowSliderProps {
  copy: ContextWindowSliderCopy;
}

export const ContextWindowSlider = React.memo(({ copy }: ContextWindowSliderProps) => {
  const [position, setPosition] = useState(3);
  
  const tokens = copy.fullText.split(' ').map(t => t.trim()).filter(Boolean);
  const windowSize = 5;

  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: '#fff',
      borderRadius: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a' }}>{copy.windowLabel}</div>
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

          let bg = '#f1f5f9';
          let color = '#94a3b8';
          let border = '1px solid #e2e8f0';

          if (isActive) {
            bg = '#eff6ff';
            color = '#1d4ed8';
            border = '2px solid #3b82f6';
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
          <div style={{ width: '16px', height: '16px', background: '#f1f5f9', border: '1px solid #e2e8f0', borderRadius: '4px', opacity: 0.4 }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748b' }}>{copy.forgottenLabel}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: '#eff6ff', border: '2px solid #3b82f6', borderRadius: '4px' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#1d4ed8' }}>{copy.activeLabel}</span>
        </div>
      </div>
    </div>
  );
});

