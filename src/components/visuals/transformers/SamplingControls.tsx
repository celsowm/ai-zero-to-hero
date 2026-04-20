import React, { useState } from 'react';
import type { SamplingControlsCopy } from '../../../types/slide';

interface SamplingControlsProps {
  copy: SamplingControlsCopy;
}

export const SamplingControls: React.FC<SamplingControlsProps> = ({ copy }) => {
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
      background: '#fff',
      borderRadius: '24px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 30px rgba(15, 23, 42, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '40px',
      fontFamily: "'Inter', sans-serif"
    }}>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: '40px', background: '#f8fafc', padding: '24px', borderRadius: '16px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', color: '#334155' }}>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94a3b8', fontWeight: '500' }}>
            <span>{copy.lowTempDesc}</span>
            <span>{copy.highTempDesc}</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '200px', padding: '20px 0', borderBottom: '2px solid #e2e8f0' }}>
        {probs.map((p, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '14px', fontWeight: '700', color: '#0ea5e9' }}>{(p * 100).toFixed(0)}%</div>
            <div style={{ 
              width: '100%', 
              height: `${p * 150}px`, 
              background: 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)', 
              borderRadius: '8px 8px 0 0',
              transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }} />
            <div style={{ fontWeight: '600', color: '#334155', marginTop: '8px' }}>{words[i]}</div>
          </div>
        ))}
      </div>

    </div>
  );
};

