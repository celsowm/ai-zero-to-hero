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
      background: 'linear-gradient(135deg, #f8f9fd 0%, #eef2f8 100%)',
      borderRadius: '24px',
      border: '1px solid #dbe2ee',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.7)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '32px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      <div style={{ display: 'flex', gap: '20px', width: '100%' }}>
        {[
          { label: copy.head1Label, color: '#3b82f6', bg: '#eff6ff' },
          { label: copy.head2Label, color: '#10b981', bg: '#ecfdf5' },
          { label: copy.head3Label, color: '#f59e0b', bg: '#fffbeb' },
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
            boxShadow: `0 4px 12px ${h.color}33`
          }}>
            <div style={{ width: '40px', height: '40px', background: h.color, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <div style={{ fontSize: '16px', fontWeight: '700', color: h.color, textAlign: 'center' }}>{h.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '20px', width: '100%', padding: '0 40px' }}>
        <div style={{ flex: 1, height: '40px', borderRight: '2px solid #cbd5e1', borderBottom: '2px solid #cbd5e1', borderRadius: '0 0 8px 0' }} />
        <div style={{ flex: 1, height: '40px', borderLeft: '2px solid #cbd5e1', borderBottom: '2px solid #cbd5e1', borderRadius: '0 0 0 8px', marginLeft: '-2px' }} />
      </div>

      <div style={{
        padding: '20px 40px',
        background: '#1e293b',
        color: '#fff',
        borderRadius: '100px',
        fontSize: '18px',
        fontWeight: '700',
        boxShadow: '0 10px 20px rgba(15, 23, 42, 0.2)'
      }}>
        {copy.combineLabel}
      </div>

    </div>
  );
};

