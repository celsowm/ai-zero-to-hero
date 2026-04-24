import React from 'react';
import { sw } from '../../../theme/tokens';
import type { PositionalEmbeddingAdderCopy } from '../../../types/slide';

interface PositionalEmbeddingAdderProps {
  copy: PositionalEmbeddingAdderCopy;
}

export const PositionalEmbeddingAdder = React.memo(({ copy }: PositionalEmbeddingAdderProps) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      {/* Token Embedding */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--sw-text-dim)', textTransform: 'uppercase' }}>{copy.tokenLabel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[0.8, -0.2, 0.5, 0.1].map((v, i) => (
            <div key={i} style={{ width: '80px', height: '30px', background: v > 0 ? `rgba(0, 229, 255, ${Math.max(0.18, v * 0.55)})` : `rgba(255, 46, 151, ${Math.max(0.18, Math.abs(v) * 0.55)})`, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--sw-text)' }}>
              {v}
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--sw-cyan)' }}>{copy.plusSign}</div>

      {/* Positional Embedding */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--sw-text-dim)', textTransform: 'uppercase' }}>{copy.positionLabel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[0.1, 0.9, -0.3, 0.4].map((v, i) => (
            <div key={i} style={{ width: '80px', height: '30px', background: v > 0 ? `rgba(168, 85, 247, ${Math.max(0.18, v * 0.55)})` : `rgba(251, 191, 36, ${Math.max(0.18, Math.abs(v) * 0.45)})`, border: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'var(--sw-text)' }}>
              {v}
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '32px', fontWeight: '700', color: 'var(--sw-pink)' }}>{copy.equalsSign}</div>

      {/* Sum Embedding */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--sw-text-dim)', textTransform: 'uppercase' }}>{copy.sumLabel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[0.9, 0.7, 0.2, 0.5].map((v, i) => (
            <div key={i} style={{ width: '80px', height: '30px', background: `rgba(168, 85, 247, ${Math.max(0.3, v * 0.7)})`, border: '2px solid var(--sw-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', fontWeight: '700', boxShadow: '0 0 16px rgba(168, 85, 247, 0.25)' }}>
              {v}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
});

