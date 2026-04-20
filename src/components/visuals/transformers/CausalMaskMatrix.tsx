import React from 'react';
import type { CausalMaskMatrixCopy } from '../../../types/slide';

interface CausalMaskMatrixProps {
  copy: CausalMaskMatrixCopy;
}

export const CausalMaskMatrix: React.FC<CausalMaskMatrixProps> = ({ copy }) => {
  const size = 4;
  const labels = ['T1', 'T2', 'T3', 'T4'];

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
      alignItems: 'center',
      gap: '40px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: '#d1fae5', border: '2px solid #10b981', borderRadius: '4px' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{copy.allowedLabel}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: '#fee2e2', border: '2px solid #ef4444', borderRadius: '4px' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>{copy.maskedLabel}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `auto repeat(${size}, 60px)`, gap: '8px', alignItems: 'center', justifyItems: 'center' }}>
        <div />
        {labels.map(l => <div key={l} style={{ fontWeight: '700', color: '#64748b' }}>{l}</div>)}
        
        {labels.map((rowLabel, r) => (
          <React.Fragment key={r}>
            <div style={{ fontWeight: '700', color: '#64748b', justifySelf: 'end', marginRight: '16px' }}>{rowLabel}</div>
            {labels.map((_, c) => {
              const allowed = c <= r;
              return (
                <div key={c} style={{
                  width: '60px',
                  height: '60px',
                  background: allowed ? '#d1fae5' : '#fee2e2',
                  border: allowed ? '2px solid #10b981' : '2px dashed #ef4444',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: allowed ? '#059669' : '#dc2626'
                }}>
                  {allowed ? '✓' : '✕'}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
        <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>↓ {copy.rowLabel}</div>
        <div style={{ color: '#94a3b8', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>→ {copy.colLabel}</div>
      </div>

    </div>
  );
};

