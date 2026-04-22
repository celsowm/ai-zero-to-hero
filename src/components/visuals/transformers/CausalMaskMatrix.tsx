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
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 44px rgba(0,0,0,0.28)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '40px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      <div style={{ display: 'flex', gap: '24px', justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: 'rgba(0,229,255,0.22)', border: '2px solid var(--sw-cyan)', borderRadius: '4px' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--sw-text)' }}>{copy.allowedLabel}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ width: '16px', height: '16px', background: 'rgba(255,46,151,0.22)', border: '2px solid var(--sw-pink)', borderRadius: '4px' }} />
          <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--sw-text)' }}>{copy.maskedLabel}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `auto repeat(${size}, 60px)`, gap: '8px', alignItems: 'center', justifyItems: 'center' }}>
        <div />
        {labels.map(l => <div key={l} style={{ fontWeight: '700', color: 'var(--sw-text-dim)' }}>{l}</div>)}
        
        {labels.map((rowLabel, r) => (
          <React.Fragment key={r}>
            <div style={{ fontWeight: '700', color: 'var(--sw-text-dim)', justifySelf: 'end', marginRight: '16px' }}>{rowLabel}</div>
            {labels.map((_, c) => {
              const allowed = c <= r;
              return (
                <div key={c} style={{
                  width: '60px',
                  height: '60px',
                  background: allowed ? 'rgba(0,229,255,0.12)' : 'rgba(255,46,151,0.12)',
                  border: allowed ? '2px solid var(--sw-cyan)' : '2px dashed var(--sw-pink)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  color: allowed ? 'var(--sw-cyan)' : 'var(--sw-pink)'
                }}>
                  {allowed ? '✓' : '✕'}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '300px' }}>
        <div style={{ color: 'var(--sw-text-muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>↓ {copy.rowLabel}</div>
        <div style={{ color: 'var(--sw-text-muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>→ {copy.colLabel}</div>
      </div>

    </div>
  );
};

