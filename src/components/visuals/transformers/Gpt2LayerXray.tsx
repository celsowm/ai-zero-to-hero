import React, { useState, useEffect } from 'react';
import type { Gpt2LayerXrayCopy } from '../../../types/slide';

interface Gpt2LayerXrayProps {
  copy: Gpt2LayerXrayCopy;
}

export const Gpt2LayerXray: React.FC<Gpt2LayerXrayProps> = ({ copy }) => {
  const [activeLayer, setActiveLayer] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveLayer(l => (l + 1) % 4);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '20px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      color: '#fff'
    }}>
      
      {/* Output */}
      <div style={{ padding: '8px 24px', background: '#10b981', borderRadius: '100px', fontWeight: '700' }}>{copy.outputLabel}</div>
      <div style={{ width: '4px', height: '20px', background: '#334155' }} />

      {/* Layers */}
      {[3, 2, 1].map(l => (
        <React.Fragment key={l}>
          <div style={{
            width: '280px',
            padding: '20px',
            background: activeLayer === l ? '#3b82f6' : '#1e293b',
            border: activeLayer === l ? '2px solid #60a5fa' : '2px solid #334155',
            borderRadius: '16px',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '18px',
            transition: 'all 0.3s ease',
            boxShadow: activeLayer === l ? '0 10px 30px rgba(59, 130, 246, 0.4)' : 'none',
            transform: activeLayer === l ? 'scale(1.05)' : 'scale(1)'
          }}>
            {copy.layerLabel} {l}
          </div>
          <div style={{ width: '4px', height: '20px', background: '#334155', position: 'relative' }}>
             <div style={{ position: 'absolute', top: '-4px', left: '-3px', width: '10px', height: '10px', borderTop: '2px solid #334155', borderLeft: '2px solid #334155', transform: 'rotate(45deg)' }} />
          </div>
        </React.Fragment>
      ))}

      {/* Input */}
      <div style={{ padding: '8px 24px', background: '#38bdf8', borderRadius: '100px', fontWeight: '700' }}>{copy.inputLabel}</div>

    </div>
  );
};

