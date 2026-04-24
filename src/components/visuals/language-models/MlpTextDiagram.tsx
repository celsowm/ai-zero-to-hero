import React, { useState } from 'react';
import type { MlpTextDiagramCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface MlpTextDiagramProps {
  copy: MlpTextDiagramCopy;
}

export const MlpTextDiagram = React.memo(({ copy }: MlpTextDiagramProps) => {
  const [active, setActive] = useState<0 | 1>(0);

  const tokens1 = copy.sentence1.split(' ');
  const tokens2 = copy.sentence2.split(' ');

  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(135deg, #f8f9fd 0%, #eef2f8 100%)',
      borderRadius: '24px',
      border: '1px solid #dbe2ee',
      boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.7)',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button 
          onClick={() => setActive(0)}
          style={{ padding: '12px 24px', borderRadius: '100px', border: 'none', background: active === 0 ? '#3b82f6' : '#e2e8f0', color: active === 0 ? '#fff' : '#64748b', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Sentence 1
        </button>
        <button 
          onClick={() => setActive(1)}
          style={{ padding: '12px 24px', borderRadius: '100px', border: 'none', background: active === 1 ? '#3b82f6' : '#e2e8f0', color: active === 1 ? '#fff' : '#64748b', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s' }}
        >
          Sentence 2
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        {/* Input Slots */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {[0, 1, 2].map(slot => (
            <div key={slot} style={{
              width: '120px',
              height: '60px',
              background: '#fff',
              border: '2px dashed #94a3b8',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '600',
              color: '#0f172a',
              position: 'relative'
            }}>
              {(active === 0 ? tokens1[slot] : tokens2[slot]) || ''}
              <div style={{ position: 'absolute', top: '-24px', fontSize: '12px', color: '#64748b', fontWeight: '700' }}>Slot {slot + 1}</div>
            </div>
          ))}
          {/* Overflows */}
          {active === 1 && tokens2.slice(3).map((token, i) => (
            <div key={i+3} style={{
              width: '120px',
              height: '60px',
              background: '#fee2e2',
              border: `2px solid ${sw.red}`,
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              fontWeight: '600',
              color: '#b91c1c',
              animation: 'shake 0.5s',
              position: 'relative'
            }}>
              {token}
            </div>
          ))}
        </div>

        {/* MLP Architecture Box */}
        <div style={{
          width: '392px', // 120*3 + 16*2
          height: '100px',
          background: '#1e293b',
          borderRadius: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: '24px',
          fontWeight: '700',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
        }}>
          MLP
        </div>

        {active === 1 && (
          <div style={{ background: sw.red, color: '#fff', padding: '12px 24px', borderRadius: '100px', fontWeight: '700', fontSize: '16px', animation: 'pop 0.3s' }}>
            {copy.errorLabel}
          </div>
        )}
      </div>
    </div>
  );
});

