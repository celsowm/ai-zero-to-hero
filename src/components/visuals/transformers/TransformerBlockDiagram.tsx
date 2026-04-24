import React from 'react';
import type { TransformerBlockDiagramCopy } from '../../../types/slide';

interface TransformerBlockDiagramProps {
  copy: TransformerBlockDiagramCopy;
}

export const TransformerBlockDiagram = React.memo(({ copy }: TransformerBlockDiagramProps) => {
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
      <div style={{ padding: '12px 24px', background: 'rgba(0,229,255,0.14)', border: '1px solid rgba(0,229,255,0.35)', borderRadius: '100px', fontWeight: '600', color: 'var(--sw-cyan)' }}>{copy.inputLabel}</div>
      
      <div style={{ width: '4px', height: '30px', background: 'rgba(255,255,255,0.12)' }} />

      <div style={{
        padding: '30px',
        background: 'rgba(26,22,40,0.94)',
        border: '1px solid rgba(255,255,255,0.08)',
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
          background: 'linear-gradient(135deg, var(--sw-cyan) 0%, var(--sw-purple) 100%)',
          borderRadius: '12px',
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '18px',
          boxShadow: '0 0 20px rgba(0,229,255,0.16), 0 10px 20px rgba(168,85,247,0.18)'
        }}>
          {copy.attentionLabel}
        </div>

        <div style={{ width: '4px', height: '20px', background: 'rgba(255,255,255,0.12)' }} />

        {/* MLP */}
        <div style={{
          width: '100%',
          padding: '20px',
          background: 'linear-gradient(135deg, var(--sw-pink) 0%, var(--sw-purple) 100%)',
          borderRadius: '12px',
          textAlign: 'center',
          fontWeight: '700',
          fontSize: '18px',
          boxShadow: '0 0 20px rgba(255,46,151,0.16), 0 10px 20px rgba(168,85,247,0.18)'
        }}>
          {copy.mlpLabel}
        </div>
      </div>

      <div style={{ width: '4px', height: '30px', background: 'rgba(255,255,255,0.12)', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-4px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid rgba(255,255,255,0.12)', borderRight: '2px solid rgba(255,255,255,0.12)', transform: 'rotate(45deg)' }} />
      </div>

      <div style={{ padding: '12px 24px', background: 'linear-gradient(135deg, var(--sw-pink), var(--sw-purple))', borderRadius: '100px', fontWeight: '600', marginTop: '4px', boxShadow: '0 0 18px rgba(255,46,151,0.2)' }}>{copy.outputLabel}</div>
    </div>
  );
});

