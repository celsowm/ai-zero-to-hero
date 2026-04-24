import React from 'react';
import type { QkvCocktailPartyCopy } from '../../../types/slide';

interface QkvCocktailPartyProps {
  copy: QkvCocktailPartyCopy;
}

export const QkvCocktailParty = React.memo(({ copy }: QkvCocktailPartyProps) => {
  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      borderRadius: '24px',
      border: '1px solid #334155',
      boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: "'Space Grotesk', 'Inter', sans-serif",
      color: '#fff'
    }}>
      
      <div style={{ display: 'flex', gap: '24px' }}>
        {/* Query */}
        <div style={{ flex: 1, background: 'rgba(0,229,255,0.08)', border: '2px solid var(--sw-cyan)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--sw-cyan)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800', color: '#0b0b12', boxShadow: '0 0 20px rgba(0,229,255,0.35)' }}>Q</div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--sw-text)' }}>{copy.queryLabel}</div>
        </div>

        {/* Key */}
        <div style={{ flex: 1, background: 'rgba(168,85,247,0.08)', border: '2px solid var(--sw-purple)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--sw-purple)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800', color: '#fff', boxShadow: '0 0 20px rgba(168,85,247,0.28)' }}>K</div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--sw-text)' }}>{copy.keyLabel}</div>
        </div>

        {/* Value */}
        <div style={{ flex: 1, background: 'rgba(255,46,151,0.08)', border: '2px solid var(--sw-pink)', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--sw-pink)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800', color: '#fff', boxShadow: '0 0 20px rgba(255,46,151,0.3)' }}>V</div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: 'var(--sw-text)' }}>{copy.valueLabel}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <div style={{ background: 'rgba(26,22,40,0.92)', padding: '12px 24px', borderRadius: '100px', fontWeight: '700', color: 'var(--sw-cyan)', border: '1px solid rgba(0,229,255,0.24)' }}>Query</div>
        <div style={{ fontSize: '24px', color: '#e2e8f0' }}>×</div>
        <div style={{ background: 'rgba(26,22,40,0.92)', padding: '12px 24px', borderRadius: '100px', fontWeight: '700', color: 'var(--sw-purple)', border: '1px solid rgba(168,85,247,0.24)' }}>Key</div>
        <div style={{ fontSize: '24px', color: '#e2e8f0' }}>=</div>
        <div style={{ background: 'linear-gradient(135deg, var(--sw-cyan), var(--sw-pink))', padding: '12px 24px', borderRadius: '100px', fontWeight: '700', color: '#0f172a' }}>Match Score</div>
      </div>

    </div>
  );
});

