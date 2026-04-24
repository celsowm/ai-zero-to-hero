import React from 'react';
import type { HiddenStatesToLogitsCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface HiddenStatesToLogitsProps {
  copy: HiddenStatesToLogitsCopy;
}

export const HiddenStatesToLogits = React.memo(({ copy }: HiddenStatesToLogitsProps) => {
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
      fontFamily: sw.fontSans,
      color: '#fff'
    }}>
      
      {/* Hidden State */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--sw-text-dim)', textTransform: 'uppercase' }}>{copy.hiddenStateLabel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[0.8, -0.2, 0.5, 0.1].map((v, i) => (
            <div key={i} style={{ width: '80px', height: '40px', background: v > 0 ? `rgba(0, 229, 255, ${Math.max(0.18, v * 0.55)})` : `rgba(255, 46, 151, ${Math.max(0.18, Math.abs(v) * 0.55)})`, border: `1px solid ${sw.borderMedium}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: '700' }}>
              {v}
            </div>
          ))}
        </div>
      </div>

      {/* Unembedding Layer */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--sw-text-dim)', textTransform: 'uppercase' }}>{copy.unembedLabel}</div>
        <div style={{
          width: '160px',
          height: '160px',
          background: 'linear-gradient(135deg, var(--sw-pink) 0%, var(--sw-purple) 100%)',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          boxShadow: '0 0 26px rgba(255,46,151,0.22), 0 10px 30px rgba(168,85,247,0.22)',
          position: 'relative'
        }}>
          ×
          <div style={{ position: 'absolute', top: '20px', left: '-20px', width: '20px', height: '20px', borderTop: '2px solid #fff', borderRight: '2px solid #fff', transform: 'rotate(45deg)' }} />
          <div style={{ position: 'absolute', bottom: '20px', right: '-20px', width: '20px', height: '20px', borderTop: '2px solid #fff', borderRight: '2px solid #fff', transform: 'rotate(45deg)' }} />
        </div>
      </div>

      {/* Logits */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '600', color: 'var(--sw-text-dim)', textTransform: 'uppercase' }}>{copy.logitsLabel}</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {[
            { word: 'the', score: 3.2 },
            { word: 'a', score: 1.1 },
            { word: 'it', score: -0.5 },
            { word: '...', score: '...' }
          ].map((item, i) => (
            <div key={i} style={{ width: '120px', height: '40px', background: 'rgba(26,22,40,0.9)', border: `1px solid ${sw.borderMedium}`, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', fontSize: '14px' }}>
              <span style={{ fontWeight: '600', color: 'var(--sw-text)' }}>{item.word}</span>
              <span style={{ fontWeight: '700', color: typeof item.score === 'number' ? (item.score > 0 ? 'var(--sw-cyan)' : 'var(--sw-pink)') : 'var(--sw-text-muted)' }}>{item.score}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
});

