import React from 'react';
import type { AttentionVsMlpCopy } from '../../../types/slide';

interface AttentionVsMlpProps {
  copy: AttentionVsMlpCopy;
}

export const AttentionVsMlp: React.FC<AttentionVsMlpProps> = ({ copy }) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: '#fff',
      borderRadius: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
      display: 'flex',
      gap: '40px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      {/* Attention Side */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', color: '#0369a1' }}>Attention</div>
        
        <div style={{ width: '100%', height: '160px', background: '#f0f9ff', borderRadius: '16px', position: 'relative', border: '1px solid #bae6fd' }}>
          {/* Nodes */}
          <div style={{ position: 'absolute', top: '20px', left: '20px', width: '40px', height: '40px', background: '#38bdf8', borderRadius: '50%', zIndex: 2 }} />
          <div style={{ position: 'absolute', top: '60px', left: '120px', width: '40px', height: '40px', background: '#38bdf8', borderRadius: '50%', zIndex: 2 }} />
          <div style={{ position: 'absolute', top: '100px', right: '40px', width: '40px', height: '40px', background: '#38bdf8', borderRadius: '50%', zIndex: 2 }} />
          
          {/* Lines */}
          <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
            <line x1="40" y1="40" x2="140" y2="80" stroke="#7dd3fc" strokeWidth="3" />
            <line x1="140" y1="80" x2="250" y2="120" stroke="#7dd3fc" strokeWidth="3" />
            <line x1="40" y1="40" x2="250" y2="120" stroke="#7dd3fc" strokeWidth="3" />
          </svg>
        </div>

        <div style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', fontWeight: '500', lineHeight: '1.6' }}>
          {copy.attentionDesc}
        </div>
      </div>

      <div style={{ width: '1px', background: '#e2e8f0' }} />

      {/* MLP Side */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <div style={{ fontSize: '24px', fontWeight: '800', color: '#b45309' }}>MLP</div>
        
        <div style={{ width: '100%', height: '160px', background: '#fffbeb', borderRadius: '16px', position: 'relative', border: '1px solid #fde68a', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[1, 2, 3].map(i => (
              <div key={i} style={{ width: '40px', height: '80px', background: '#fbbf24', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{ width: '20px', height: '4px', background: '#fff', borderRadius: '2px' }} />
                <div style={{ width: '20px', height: '4px', background: '#fff', borderRadius: '2px' }} />
                <div style={{ width: '20px', height: '4px', background: '#fff', borderRadius: '2px' }} />
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: '14px', color: '#64748b', textAlign: 'center', fontWeight: '500', lineHeight: '1.6' }}>
          {copy.mlpDesc}
        </div>
      </div>

    </div>
  );
};

