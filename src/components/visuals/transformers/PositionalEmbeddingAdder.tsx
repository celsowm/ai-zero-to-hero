import React from 'react';
import type { PositionalEmbeddingAdderCopy } from '../../../types/slide';

interface PositionalEmbeddingAdderProps {
  copy: PositionalEmbeddingAdderCopy;
}

export const PositionalEmbeddingAdder: React.FC<PositionalEmbeddingAdderProps> = ({ copy }) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(135deg, #f8f9fd 0%, #eef2f8 100%)',
      borderRadius: '24px',
      border: '1px solid #dbe2ee',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif"
    }}>
      
      {/* Token Embedding */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>{copy.tokenLabel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[0.8, -0.2, 0.5, 0.1].map((v, i) => (
            <div key={i} style={{ width: '80px', height: '30px', background: v > 0 ? `rgba(59, 130, 246, ${v})` : `rgba(239, 68, 68, ${Math.abs(v)})`, border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#1e293b' }}>
              {v}
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '32px', fontWeight: '700', color: '#94a3b8' }}>{copy.plusSign}</div>

      {/* Positional Embedding */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>{copy.positionLabel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[0.1, 0.9, -0.3, 0.4].map((v, i) => (
            <div key={i} style={{ width: '80px', height: '30px', background: v > 0 ? `rgba(16, 185, 129, ${v})` : `rgba(245, 158, 11, ${Math.abs(v)})`, border: '1px solid #cbd5e1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#1e293b' }}>
              {v}
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: '32px', fontWeight: '700', color: '#94a3b8' }}>{copy.equalsSign}</div>

      {/* Sum Embedding */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>{copy.sumLabel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[0.9, 0.7, 0.2, 0.5].map((v, i) => (
            <div key={i} style={{ width: '80px', height: '30px', background: `rgba(139, 92, 246, ${v})`, border: '2px solid #8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#fff', fontWeight: '700', boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)' }}>
              {v}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

