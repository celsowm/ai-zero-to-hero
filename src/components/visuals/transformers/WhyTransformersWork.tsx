import React from 'react';
import type { WhyTransformersWorkCopy } from '../../../types/slide';

interface WhyTransformersWorkProps {
  copy: WhyTransformersWorkCopy;
}

export const WhyTransformersWork = React.memo(({ copy }: WhyTransformersWorkProps) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 44px rgba(0,0,0,0.28)',
      display: 'flex',
      justifyContent: 'space-between',
      gap: '24px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      {[
        { label: copy.reason1, color: 'var(--sw-cyan)', bg: 'rgba(0,229,255,0.08)' },
        { label: copy.reason2, color: 'var(--sw-purple)', bg: 'rgba(168,85,247,0.08)' },
        { label: copy.reason3, color: 'var(--sw-pink)', bg: 'rgba(255,46,151,0.08)' },
      ].map((r, i) => (
        <div key={i} style={{
          flex: 1,
          background: 'rgba(26,22,40,0.92)',
          padding: '32px 24px',
          borderRadius: '20px',
          boxShadow: '0 0 22px rgba(168,85,247,0.08)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          textAlign: 'center',
          borderTop: `4px solid ${r.color}`,
          border: '1px solid rgba(255,255,255,0.06)'
        }}>
          <div style={{ width: '80px', height: '80px', background: r.bg, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 20px color-mix(in srgb, ${r.color} 22%, transparent)` }}>
            <div style={{ width: 24, height: 24, borderRadius: 999, background: r.color, boxShadow: `0 0 18px color-mix(in srgb, ${r.color} 46%, transparent)` }} />
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: 'var(--sw-text)' }}>
            {r.label}
          </div>
        </div>
      ))}

    </div>
  );
});

