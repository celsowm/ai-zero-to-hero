import React from 'react';
import type { SoftmaxVisualizerCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface SoftmaxVisualizerProps {
  copy: SoftmaxVisualizerCopy;
}

export const SoftmaxVisualizer = React.memo(({ copy }: SoftmaxVisualizerProps) => {
  const data = [
    { word: 'the', count: 32, prob: 84 },
    { word: 'a', count: 4, prob: 11 },
    { word: 'it', count: 2, prob: 5 },
  ];

  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: sw.void,
      borderRadius: '24px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      color: '#fff'
    }}>
      
      <div style={{ display: 'flex', gap: '24px', width: '100%' }}>
        {/* Counts Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '14px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', textAlign: 'center' }}>
            {copy.countsLabel} (Logits)
          </div>
          <div style={{ background: sw.surface, borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: '#334155', borderRadius: '8px' }}>
                <span style={{ fontWeight: '600' }}>{item.word}</span>
                <span style={{ color: '#38bdf8', fontWeight: '700' }}>{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Arrow Column */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
            padding: '12px 24px',
            borderRadius: '100px',
            fontWeight: '700',
            fontSize: '18px',
            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)',
            position: 'relative',
            zIndex: 1
          }}>
            Softmax
          </div>
          <div style={{
            height: '40px',
            width: '4px',
            background: '#8b5cf6',
            marginTop: '-10px',
            position: 'relative'
          }}>
             <div style={{
                position: 'absolute',
                bottom: '-4px',
                left: '-3px',
                width: '10px',
                height: '10px',
                borderBottom: '2px solid #8b5cf6',
                borderRight: '2px solid #8b5cf6',
                transform: 'rotate(45deg)'
              }} />
          </div>
        </div>

        {/* Probabilities Column */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '14px', color: '#a855f7', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600', textAlign: 'center' }}>
            {copy.softmaxLabel} (0 - 100%)
          </div>
          <div style={{ background: sw.surface, borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {data.map((item, i) => (
              <div key={i} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '12px', 
                background: `linear-gradient(90deg, rgba(168, 85, 247, 0.2) ${item.prob}%, #334155 ${item.prob}%)`, 
                borderRadius: '8px',
                animation: `softmax-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.12}s both`
              }}>
                <span style={{ fontWeight: '600' }}>{item.word}</span>
                <span style={{ color: '#c084fc', fontWeight: '700' }}>{item.prob}%</span>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #475569', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', padding: '12px 12px 0' }}>
              <span style={{ fontWeight: '600', color: '#94a3b8' }}>{copy.sumLabel}</span>
              <span style={{ color: '#fff', fontWeight: '700' }}>100%</span>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes softmax-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
});

