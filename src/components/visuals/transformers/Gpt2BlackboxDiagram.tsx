import React from 'react';
import type { Gpt2BlackboxDiagramCopy } from '../../../types/slide';

interface Gpt2BlackboxDiagramProps {
  copy: Gpt2BlackboxDiagramCopy;
}

export const Gpt2BlackboxDiagram: React.FC<Gpt2BlackboxDiagramProps> = ({ copy }) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      color: '#fff',
      alignItems: 'center'
    }}>
      
      {/* Input */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['T1', 'T2', 'T3', '...'].map((t, i) => (
            <div key={i} style={{ padding: '12px 16px', background: 'rgba(26,22,40,0.92)', borderRadius: '8px', border: '1px solid rgba(0,229,255,0.22)', fontSize: '18px', fontWeight: '600', boxShadow: '0 0 16px rgba(0,229,255,0.08)' }}>
              {t}
            </div>
          ))}
        </div>
        <div style={{ color: 'var(--sw-text-dim)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
          {copy.inputLabel}
        </div>
      </div>

      {/* Arrow Down */}
      <div style={{ width: '4px', height: '40px', background: 'var(--sw-cyan)', position: 'relative', boxShadow: '0 0 14px rgba(0,229,255,0.4)' }}>
        <div style={{ position: 'absolute', bottom: '-4px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--sw-cyan)', borderRight: '2px solid var(--sw-cyan)', transform: 'rotate(45deg)' }} />
      </div>

      {/* Model Box */}
      <div style={{
        padding: '32px 64px',
        background: 'linear-gradient(135deg, var(--sw-pink) 0%, var(--sw-purple) 100%)',
        borderRadius: '20px',
        fontSize: '32px',
        fontWeight: '800',
        boxShadow: '0 0 24px rgba(255,46,151,0.24), 0 12px 30px rgba(168,85,247,0.24)',
        border: '1px solid rgba(255,255,255,0.2)',
        animation: 'pulseBox 3s infinite alternate'
      }}>
        {copy.modelLabel}
      </div>

      {/* Arrow Down */}
      <div style={{ width: '4px', height: '40px', background: 'var(--sw-purple)', position: 'relative', boxShadow: '0 0 14px rgba(168,85,247,0.38)' }}>
        <div style={{ position: 'absolute', bottom: '-4px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid var(--sw-purple)', borderRight: '2px solid var(--sw-purple)', transform: 'rotate(45deg)' }} />
      </div>

      {/* Output */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: '60px' }}>
          {[20, 60, 10, 80, 30].map((h, i) => (
            <div key={i} style={{ width: '20px', height: `${h}%`, background: 'linear-gradient(180deg, var(--sw-cyan), var(--sw-pink))', borderRadius: '4px 4px 0 0', boxShadow: '0 0 12px rgba(255,46,151,0.15)' }} />
          ))}
        </div>
        <div style={{ color: 'var(--sw-text-dim)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
          {copy.outputLabel}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseBox {
          0% { box-shadow: 0 0 24px rgba(255,46,151,0.18), 0 12px 28px rgba(168,85,247,0.2); }
          100% { box-shadow: 0 0 38px rgba(255,46,151,0.32), 0 18px 48px rgba(168,85,247,0.28); }
        }
      `}} />
    </div>
  );
};

