import React from 'react';
import type { QkvCocktailPartyCopy } from '../../../types/slide';

interface QkvCocktailPartyProps {
  copy: QkvCocktailPartyCopy;
}

export const QkvCocktailParty: React.FC<QkvCocktailPartyProps> = ({ copy }) => {
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
        <div style={{ flex: 1, background: 'rgba(59, 130, 246, 0.1)', border: '2px solid #3b82f6', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: '#3b82f6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800' }}>Q</div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#bfdbfe' }}>{copy.queryLabel}</div>
        </div>

        {/* Key */}
        <div style={{ flex: 1, background: 'rgba(16, 185, 129, 0.1)', border: '2px solid #10b981', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: '#10b981', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800' }}>K</div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#a7f3d0' }}>{copy.keyLabel}</div>
        </div>

        {/* Value */}
        <div style={{ flex: 1, background: 'rgba(245, 158, 11, 0.1)', border: '2px solid #f59e0b', borderRadius: '16px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: '60px', height: '60px', background: '#f59e0b', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: '800' }}>V</div>
          <div style={{ fontSize: '18px', fontWeight: '600', color: '#fde68a' }}>{copy.valueLabel}</div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
        <div style={{ background: '#334155', padding: '12px 24px', borderRadius: '100px', fontWeight: '700', color: '#94a3b8' }}>Query</div>
        <div style={{ fontSize: '24px', color: '#e2e8f0' }}>×</div>
        <div style={{ background: '#334155', padding: '12px 24px', borderRadius: '100px', fontWeight: '700', color: '#94a3b8' }}>Key</div>
        <div style={{ fontSize: '24px', color: '#e2e8f0' }}>=</div>
        <div style={{ background: '#38bdf8', padding: '12px 24px', borderRadius: '100px', fontWeight: '700', color: '#0f172a' }}>Match Score</div>
      </div>

    </div>
  );
};

