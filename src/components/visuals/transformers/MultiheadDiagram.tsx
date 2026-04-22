import React from 'react';
import type { MultiheadDiagramCopy } from '../../../types/slide';

interface MultiheadDiagramProps {
  copy: MultiheadDiagramCopy;
}

export const MultiheadDiagram: React.FC<MultiheadDiagramProps> = ({ copy }) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 44px rgba(0,0,0,0.28)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '32px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
        {[
          { label: copy.head1Label, color: 'var(--sw-cyan)', bg: 'rgba(0,229,255,0.08)' },
          { label: copy.head2Label, color: 'var(--sw-purple)', bg: 'rgba(168,85,247,0.08)' },
          { label: copy.head3Label, color: 'var(--sw-pink)', bg: 'rgba(255,46,151,0.08)' },
        ].map((h, i) => (
          <div key={i} style={{
            flex: 1,
            background: h.bg,
            border: `2px solid ${h.color}`,
            borderRadius: '16px',
            padding: '24px 16px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px',
            boxShadow: `0 0 18px color-mix(in srgb, ${h.color} 18%, transparent)`
          }}>
            <div style={{ width: '40px', height: '40px', background: h.color, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: h.color, textAlign: 'center' }}>{h.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '20px', width: '100%', padding: '0 40px' }}>
        <div style={{ flex: 1, height: '40px', borderRight: '2px solid rgba(255,255,255,0.12)', borderBottom: '2px solid rgba(255,255,255,0.12)', borderRadius: '0 0 8px 0' }} />
        <div style={{ flex: 1, height: '40px', borderLeft: '2px solid rgba(255,255,255,0.12)', borderBottom: '2px solid rgba(255,255,255,0.12)', borderRadius: '0 0 0 8px', marginLeft: '-2px' }} />
      </div>

      <div style={{
        padding: '20px 40px',
        background: 'linear-gradient(135deg, rgba(255,46,151,0.9), rgba(168,85,247,0.9))',
        color: 'var(--sw-text)',
        borderRadius: '100px',
        fontSize: '18px',
        fontWeight: '700',
        boxShadow: '0 0 24px rgba(255,46,151,0.22), 0 10px 24px rgba(168,85,247,0.22)'
      }}>
        {copy.combineLabel}
      </div>

    </div>
  );
};

