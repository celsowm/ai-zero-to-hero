import React from 'react';
import type { AttentionVsMlpCopy } from '../../../types/slide';

interface AttentionVsMlpProps {
  copy: AttentionVsMlpCopy;
}

export const AttentionVsMlp = React.memo(({ copy }: AttentionVsMlpProps) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 44px rgba(0,0,0,0.28)',
      display: 'flex',
      gap: '40px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      {/* Attention Side */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--sw-cyan)' }}>Attention</div>
        
        <div style={{ width: '100%', height: '160px', background: 'rgba(0,229,255,0.07)', borderRadius: '16px', position: 'relative', border: '1px solid rgba(0,229,255,0.24)' }}>
          {/* Nodes */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', background: 'var(--sw-cyan)', borderRadius: '50%', zIndex: 2, boxShadow: '0 0 18px rgba(0,229,255,0.45)' }} />
          <div style={{ position: 'absolute', top: '60px', left: '120px', width: '40px', height: '40px', background: 'var(--sw-cyan)', borderRadius: '50%', zIndex: 2, boxShadow: '0 0 18px rgba(0,229,255,0.45)' }} />
          <div style={{ position: 'absolute', top: '100px', right: '40px', width: '40px', height: '40px', background: 'var(--sw-cyan)', borderRadius: '50%', zIndex: 2, boxShadow: '0 0 18px rgba(0,229,255,0.45)' }} />
          
          {/* Lines */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <line x1="40" y1="40" x2="140" y2="80" stroke="rgba(0,229,255,0.7)" strokeWidth="3" />
            <line x1="140" y1="80" x2="250" y2="120" stroke="rgba(0,229,255,0.7)" strokeWidth="3" />
            <line x1="40" y1="40" x2="250" y2="120" stroke="rgba(0,229,255,0.7)" strokeWidth="3" />
          </svg>
        </div>

        <div style={{ fontSize: '14px', color: 'var(--sw-text-dim)', textAlign: 'center', fontWeight: '500', lineHeight: '1.6' }}>
          {copy.attentionDesc}
        </div>
      </div>

      <div style={{ width: '1px', background: 'rgba(255,255,255,0.08)' }} />

      {/* MLP Side */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', color: 'var(--sw-pink)' }}>MLP</div>
        
        <div style={{ width: '100%', height: '160px', background: 'rgba(255,46,151,0.07)', borderRadius: '16px', position: 'relative', border: '1px solid rgba(255,46,151,0.24)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ width: '40px', height: '80px', background: 'linear-gradient(180deg, rgba(255,46,151,0.88), rgba(168,85,247,0.88))', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 0 18px rgba(168,85,247,0.28)' }}>
                <div style={{ width: '20px', height: '4px', background: 'rgba(255,255,255,0.88)', borderRadius: '2px' }} />
                <div style={{ width: '20px', height: '4px', background: 'rgba(255,255,255,0.88)', borderRadius: '2px' }} />
                <div style={{ width: '20px', height: '4px', background: 'rgba(255,255,255,0.88)', borderRadius: '2px' }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '14px', color: 'var(--sw-text-dim)', textAlign: 'center', fontWeight: '500', lineHeight: '1.6' }}>
          {copy.mlpDesc}
        </div>
      </div>

    </div>
  );
});

