import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { SamplingControlsCopy } from '../../../types/slide';

interface SamplingControlsProps {
  copy: SamplingControlsCopy;
}

export const SamplingControls = React.memo(({ copy }: SamplingControlsProps) => {
  const [temp, setTemp] = useState(1.0);
  
  const baseLogits = [3.0, 2.0, 1.0, 0.5, -1.0];
  const words = ['the', 'a', 'it', 'he', 'she'];

  // Apply temperature
  const adjustedLogits = baseLogits.map(l => l / Math.max(0.1, temp));
  const maxLogit = Math.max(...adjustedLogits);
  const exps = adjustedLogits.map(l => Math.exp(l - maxLogit)); // stable softmax
  const sumExp = exps.reduce((a, b) => a + b, 0);
  const probs = exps.map(e => e / sumExp);

  return (
    <div style={{
      width: '100%',
      padding: '40px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: '40px', background: 'rgba(26,22,40,0.92)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: 'var(--sw-text)' }}>
            <span>{copy.tempLabel}</span>
            <span>{temp.toFixed(1)}</span>
          </div>
          <input 
            type="range" 
            min="0.1" max="2.0" step="0.1" 
            value={temp} 
            onChange={(e) => setTemp(parseFloat(e.target.value))}
            style={{ width: '100%' }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--sw-text-muted)', fontWeight: '500' }}>
            <span>{copy.lowTempDesc}</span>
            <span>{copy.highTempDesc}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '200px', padding: '20px 0', borderBottom: '2px solid rgba(255,255,255,0.08)' }}>
        {probs.map((p, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--sw-cyan)' }}>{(p * 100).toFixed(0)}%</div>
            <div style={{ 
              width: '100%', 
              height: `${p * 150}px`, 
              background: 'linear-gradient(180deg, var(--sw-cyan) 0%, var(--sw-pink) 100%)', 
              borderRadius: '8px 8px 0 0',
              transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 0 18px rgba(255,46,151,0.12)'
            }} />
            <div style={{ fontWeight: '600', color: 'var(--sw-text)', marginTop: '8px' }}>{words[i]}</div>
          </div>
        ))}
      </div>

    </div>
  );
});

