import React from 'react';
import type { EmbeddingSpace3DCopy } from '../../../types/slide';

interface EmbeddingSpace3DProps {
  copy: EmbeddingSpace3DCopy;
}

export const EmbeddingSpace3D: React.FC<EmbeddingSpace3DProps> = ({ copy }) => {
  const points = [
    { word: 'Cat', x: 20, y: 30, color: '#0ea5e9' },
    { word: 'Dog', x: 25, y: 25, color: '#0ea5e9' },
    { word: 'Lion', x: 22, y: 80, color: '#f59e0b' },
    { word: 'Wolf', x: 28, y: 85, color: '#f59e0b' },
    { word: 'Apple', x: 80, y: 20, color: '#10b981' },
    { word: 'Banana', x: 85, y: 25, color: '#10b981' },
  ];

  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: '#0f172a',
      borderRadius: '24px',
      border: '1px solid #1e293b',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      fontFamily: "'Inter', sans-serif",
      color: '#fff'
    }}>
      <div style={{ fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', textAlign: 'center' }}>
        {copy.distanceLabel}
      </div>
      
      <div style={{ position: 'relative', width: '100%', height: '300px', background: '#1e293b', borderRadius: '16px', overflow: 'hidden' }}>
        {/* Grid lines */}
        {[20, 40, 60, 80].map(p => (
          <React.Fragment key={p}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: `${p}%`, borderTop: '1px dashed #334155' }} />
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: `${p}%`, borderLeft: '1px dashed #334155' }} />
          </React.Fragment>
        ))}

        {/* Axes */}
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', borderTop: '2px solid #64748b' }} />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', top: '20px', borderLeft: '2px solid #64748b' }} />
        
        <div style={{ position: 'absolute', bottom: '4px', right: '20px', fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>{copy.xLabel}</div>
        <div style={{ position: 'absolute', top: '20px', left: '24px', fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>{copy.yLabel}</div>

        {/* Points */}
        {points.map((p, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `calc(${p.x}% + 20px)`,
            bottom: `calc(${p.y}% + 20px)`,
            transform: 'translate(-50%, 50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            animation: `float ${3 + i % 2}s ease-in-out infinite alternate`
          }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: p.color, boxShadow: `0 0 10px ${p.color}` }} />
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#e2e8f0', background: 'rgba(15, 23, 42, 0.7)', padding: '2px 6px', borderRadius: '4px' }}>
              {p.word}
            </div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translate(-50%, 50%) translateY(0); }
          100% { transform: translate(-50%, 50%) translateY(-10px); }
        }
      `}} />
    </div>
  );
};

