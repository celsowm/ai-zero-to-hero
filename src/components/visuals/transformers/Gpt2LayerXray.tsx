import React, { useState, useEffect } from 'react';
import type { Gpt2LayerXrayCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Gpt2LayerXrayProps {
  copy: Gpt2LayerXrayCopy;
}

export const Gpt2LayerXray = React.memo(({ copy }: Gpt2LayerXrayProps) => {
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
      fontFamily: sw.fontSans,
      color: '#fff'
    }}>
      
      {/* Output */}
      <div style={{ padding: '8px 24px', background: 'linear-gradient(135deg, var(--sw-cyan), var(--sw-purple))', borderRadius: '100px', fontWeight: '700', boxShadow: '0 0 18px rgba(0,229,255,0.2)' }}>{copy.outputLabel}</div>
      <div style={{ width: '4px', height: '20px', background: sw.tintStrong }} />

      {/* Layers */}
      {[3, 2, 1].map(l => (
        <React.Fragment key={l}>
          <div style={{
            width: '280px',
            padding: '20px',
            background: activeLayer === l ? 'linear-gradient(135deg, rgba(255,46,151,0.9), rgba(168,85,247,0.9))' : 'rgba(26,22,40,0.92)',
            border: activeLayer === l ? '2px solid rgba(0,229,255,0.7)' : `2px solid ${sw.borderMedium}`,
            borderRadius: '16px',
            textAlign: 'center',
            fontWeight: '700',
            fontSize: '18px',
            transition: 'all 0.3s ease',
            boxShadow: activeLayer === l ? '0 0 22px rgba(255,46,151,0.28), 0 10px 30px rgba(168,85,247,0.25)' : 'none',
            transform: activeLayer === l ? 'scale(1.05)' : 'scale(1)'
          }}>
            {copy.layerLabel} {l}
          </div>
          <div style={{ width: '4px', height: '20px', background: sw.tintStrong, position: 'relative' }}>
             <div style={{ position: 'absolute', top: '-4px', left: '-3px', width: '10px', height: '10px', borderTop: `2px solid ${sw.tintStrong}`, borderLeft: `2px solid ${sw.tintStrong}`, transform: 'rotate(45deg)' }} />
          </div>
        </React.Fragment>
      ))}

      {/* Input */}
      <div style={{ padding: '8px 24px', background: 'rgba(0,229,255,0.14)', border: '1px solid rgba(0,229,255,0.4)', borderRadius: '100px', fontWeight: '700', color: 'var(--sw-cyan)' }}>{copy.inputLabel}</div>

    </div>
  );
});

