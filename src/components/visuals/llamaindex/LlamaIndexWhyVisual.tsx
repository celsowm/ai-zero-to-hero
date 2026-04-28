import React from 'react';
import type { LlamaIndexWhyCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LlamaIndexWhyProps {
  copy: LlamaIndexWhyCopy;
}

export const LlamaIndexWhyVisual = React.memo(({ copy }: LlamaIndexWhyProps) => {
  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeeper,
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Before: pain points */}
        <div style={{
          padding: '20px',
          background: 'rgba(239, 68, 68, 0.06)',
          borderRadius: '16px',
          border: `1px solid rgba(239, 68, 68, 0.25)`,
        }}>
          <div style={{
            fontWeight: '700', fontSize: '15px', color: sw.pink, marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ fontSize: '20px' }}>❌</span> {copy.beforeLabel}
          </div>
          {[copy.pain1, copy.pain2, copy.pain3].map((pain, i) => (
            <div key={i} style={{
              padding: '10px 14px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              marginBottom: i < 2 ? '8px' : 0,
              fontSize: '13px',
              color: sw.textDim,
              borderLeft: `3px solid ${sw.pink}55`,
            }}>
              {pain}
            </div>
          ))}
        </div>

        {/* After: solutions */}
        <div style={{
          padding: '20px',
          background: 'rgba(16, 185, 129, 0.06)',
          borderRadius: '16px',
          border: `1px solid rgba(16, 185, 129, 0.25)`,
        }}>
          <div style={{
            fontWeight: '700', fontSize: '15px', color: '#10b981', marginBottom: '16px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <span style={{ fontSize: '20px' }}>✅</span> {copy.afterLabel}
          </div>
          {[copy.solution1, copy.solution2, copy.solution3].map((sol, i) => (
            <div key={i} style={{
              padding: '10px 14px',
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '8px',
              marginBottom: i < 2 ? '8px' : 0,
              fontSize: '13px',
              color: sw.textDim,
              borderLeft: '3px solid rgba(16, 185, 129, 0.55)',
            }}>
              {sol}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow between */}
      <div style={{ textAlign: 'center', fontSize: '24px', color: sw.cyan }}>
        ↓ LlamaIndex ↓
      </div>
    </div>
  );
});
