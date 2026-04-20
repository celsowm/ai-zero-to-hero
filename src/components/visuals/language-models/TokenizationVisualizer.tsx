import React, { useState, useEffect } from 'react';
import type { TokenizationVisualizerCopy } from '../../../types/slide';

interface TokenizationVisualizerProps {
  copy: TokenizationVisualizerCopy;
}

export const TokenizationVisualizer: React.FC<TokenizationVisualizerProps> = ({ copy }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 10);
    return () => clearTimeout(t);
  }, []);

  const isPT = copy.inputText === 'Nós o povo';
  const tokens = isPT ? ['Nós', ' o', ' povo'] : ['We', ' the', ' people'];
  const ids = isPT ? [43105, 302, 14289] : [1135, 262, 661];

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
      color: '#fff'
    }}>
      
      {/* Input Text */}
      <div style={{ textAlign: 'center', fontSize: '32px', fontWeight: '700', color: '#f8fafc', marginBottom: '16px' }}>
        "{copy.inputText}"
      </div>

      {/* Mapping visualization */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
        {tokens.map((token, i) => (
          <div key={i} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
            transform: mounted ? 'translateY(0)' : 'translateY(20px)',
            opacity: mounted ? 1 : 0,
            transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.2 + (i * 0.2)}s`
          }}>
            {/* Token Card */}
            <div style={{
              background: '#334155',
              padding: '16px 24px',
              borderRadius: '12px',
              fontSize: '20px',
              fontWeight: '600',
              border: '1px solid #475569',
              minWidth: '100px',
              textAlign: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              {token.replace(' ', '·')}
            </div>

            {/* Arrow */}
            <div style={{
              width: '2px',
              height: '30px',
              background: '#38bdf8',
              position: 'relative',
              opacity: 0.7
            }}>
              <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: '-4px',
                width: '10px',
                height: '10px',
                borderBottom: '2px solid #38bdf8',
                borderRight: '2px solid #38bdf8',
                transform: 'rotate(45deg)'
              }} />
            </div>

            {/* ID Card */}
            <div style={{
              background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
              padding: '16px 24px',
              borderRadius: '12px',
              fontSize: '24px',
              fontWeight: '700',
              fontFamily: 'monospace',
              border: '1px solid #0284c7',
              minWidth: '100px',
              textAlign: 'center',
              boxShadow: '0 8px 16px rgba(2, 132, 199, 0.3)'
            }}>
              {ids[i]}
            </div>
          </div>
        ))}
      </div>

      {/* Labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 20px', marginTop: '16px' }}>
        <div style={{ fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
          {copy.tokenLabel}
        </div>
        <div style={{ fontSize: '14px', color: '#38bdf8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>
          {copy.idLabel}
        </div>
      </div>
    </div>
  );
};

