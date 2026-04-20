import React from 'react';
import type { HiddenStatesToLogitsCopy } from '../../../types/slide';

interface HiddenStatesToLogitsProps {
  copy: HiddenStatesToLogitsCopy;
}

export const HiddenStatesToLogits: React.FC<HiddenStatesToLogitsProps> = ({ copy }) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: '#0f172a',
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '20px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      color: '#fff'
    }}>
      
      {/* Hidden State */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>{copy.hiddenStateLabel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[0.8, -0.2, 0.5, 0.1].map((v, i) => (
            <div key={i} style={{ width: '80px', height: '40px', background: v > 0 ? `rgba(16, 185, 129, ${v})` : `rgba(239, 68, 68, ${Math.abs(v)})`, border: '1px solid #334155', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700' }}>
              {v}
            </div>
          ))}
        </div>
      </div>

      {/* Unembedding Layer */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>{copy.unembedLabel}</div>
        <div style={{
          width: '160px',
          height: '160px',
          background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)',
          position: 'relative'
        }}>
          ×
          <div style={{ position: 'absolute', top: '20px', left: '-20px', width: '20px', height: '20px', borderTop: '2px solid #fff', borderRight: '2px solid #fff', transform: 'rotate(45deg)' }} />
          <div style={{ position: 'absolute', bottom: '20px', right: '-20px', width: '20px', height: '20px', borderTop: '2px solid #fff', borderRight: '2px solid #fff', transform: 'rotate(45deg)' }} />
        </div>
      </div>

      {/* Logits */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase' }}>{copy.logitsLabel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { word: 'the', score: 3.2 },
            { word: 'a', score: 1.1 },
            { word: 'it', score: -0.5 },
            { word: '...', score: '...' }
          ].map((item, i) => (
            <div key={i} style={{ width: '120px', height: '40px', background: '#1e293b', border: '1px solid #334155', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', fontSize: '14px' }}>
              <span style={{ fontWeight: '600', color: '#cbd5e1' }}>{item.word}</span>
              <span style={{ fontWeight: '700', color: typeof item.score === 'number' ? (item.score > 0 ? '#38bdf8' : '#f87171') : '#94a3b8' }}>{item.score}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

