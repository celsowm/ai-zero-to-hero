import React from 'react';
import type { TransformerBlockDiagramCopy } from '../../../types/slide';

interface TransformerBlockDiagramProps {
  copy: TransformerBlockDiagramCopy;
}

export const TransformerBlockDiagram: React.FC<TransformerBlockDiagramProps> = ({ copy }) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: '#0f172a',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: "'Inter', sans-serif",
      color: '#fff'
    }}>
      <div style={{ padding: '12px 24px', background: '#334155', borderRadius: '100px', fontWeight: '600' }}>{copy.inputLabel}</div>
      
      <div style={{ width: '4px', height: '30px', background: '#64748b' }} />

      <div style={{
        padding: '30px',
        background: '#1e293b',
        border: '1px solid #334155',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        width: '300px'
      }}>
        {/* Attention */}
        <div style={{
          width: '100%',
          padding: '20px',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #3b82f6 100%)',
          borderRadius: '12px',
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '18px',
          boxShadow: '0 10px 20px rgba(14, 165, 233, 0.3)'
        }}>
          {copy.attentionLabel}
        </div>

        <div style={{ width: '4px', height: '20px', background: '#64748b' }} />

        {/* MLP */}
        <div style={{
          width: '100%',
          padding: '20px',
          background: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
          borderRadius: '12px',
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '18px',
          boxShadow: '0 10px 20px rgba(239, 68, 68, 0.3)'
        }}>
          {copy.mlpLabel}
        </div>
      </div>

      <div style={{ width: '4px', height: '30px', background: '#64748b', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-4px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid #64748b', borderRight: '2px solid #64748b', transform: 'rotate(45deg)' }} />
      </div>

      <div style={{ padding: '12px 24px', background: '#10b981', borderRadius: '100px', fontWeight: '600', marginTop: '4px' }}>{copy.outputLabel}</div>
    </div>
  );
};

