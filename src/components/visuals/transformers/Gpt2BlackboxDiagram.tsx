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
            <div key={i} style={{ padding: '12px 16px', background: '#334155', borderRadius: '8px', border: '1px solid #475569', fontSize: '18px', fontWeight: '600' }}>
              {t}
            </div>
          ))}
        </div>
        <div style={{ color: '#94a3b8', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
          {copy.inputLabel}
        </div>
      </div>

      {/* Arrow Down */}
      <div style={{ width: '4px', height: '40px', background: '#38bdf8', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-4px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid #38bdf8', borderRight: '2px solid #38bdf8', transform: 'rotate(45deg)' }} />
      </div>

      {/* Model Box */}
      <div style={{
        padding: '32px 64px',
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        borderRadius: '20px',
        fontSize: '32px',
        fontWeight: '800',
        boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
        border: '1px solid rgba(255,255,255,0.2)',
        animation: 'pulseBox 3s infinite alternate'
      }}>
        {copy.modelLabel}
      </div>

      {/* Arrow Down */}
      <div style={{ width: '4px', height: '40px', background: '#f59e0b', position: 'relative' }}>
        <div style={{ position: 'absolute', bottom: '-4px', left: '-3px', width: '10px', height: '10px', borderBottom: '2px solid #f59e0b', borderRight: '2px solid #f59e0b', transform: 'rotate(45deg)' }} />
      </div>

      {/* Output */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end', height: '60px' }}>
          {[20, 60, 10, 80, 30].map((h, i) => (
            <div key={i} style={{ width: '20px', height: `${h}%`, background: '#f59e0b', borderRadius: '4px 4px 0 0' }} />
          ))}
        </div>
        <div style={{ color: '#94a3b8', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
          {copy.outputLabel}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulseBox {
          0% { box-shadow: 0 10px 30px rgba(99, 102, 241, 0.4); }
          100% { box-shadow: 0 10px 50px rgba(99, 102, 241, 0.8); }
        }
      `}} />
    </div>
  );
};

