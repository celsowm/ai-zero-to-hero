import React, { useState, useMemo } from 'react';
import { sw } from '../../../theme/tokens';
import type { TemperatureSliderInteractiveCopy } from '../../../types/slide';

interface TemperatureSliderInteractiveProps {
  copy: TemperatureSliderInteractiveCopy;
}

const BASE_LOGITS = [3.0, 2.0, 1.0, 0.5, -1.0];
const WORDS = ['the', 'a', 'it', 'he', 'she'];

export const TemperatureSliderInteractive = React.memo(({ copy }: TemperatureSliderInteractiveProps) => {
  const [temp, setTemp] = useState(0.7);

  const { probs } = useMemo(() => {
    const adjustedLogits = BASE_LOGITS.map((l: number) => l / Math.max(0.01, temp));
    const maxLogit = Math.max(...adjustedLogits);
    const exps = adjustedLogits.map((l: number) => Math.exp(l - maxLogit));
    const sumExp = exps.reduce((a: number, b: number) => a + b, 0);
    const p = exps.map((e: number) => e / sumExp);
    return { probs: p };
  }, [temp]);

  const barColor = temp < 0.4 ? sw.cyan : temp < 0.8 ? sw.purple : sw.pink;

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      fontFamily: "'Inter', sans-serif"
    }}>

      {/* Temperature slider */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '600', color: sw.text, fontSize: '14px' }}>
            Temperatura
          </span>
          <span style={{
            fontWeight: '700',
            color: barColor,
            fontSize: '18px',
            fontFamily: "'JetBrains Mono', monospace"
          }}>
            {temp.toFixed(2)}
          </span>
        </div>
        <input
          type="range"
          min="0.1"
          max="2.0"
          step="0.05"
          value={temp}
          onChange={(e) => setTemp(parseFloat(e.target.value))}
          style={{ width: '100%', accentColor: barColor }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: sw.textMuted, fontWeight: '500' }}>
          <span>{copy.lowTemp}</span>
          <span>{copy.highTemp}</span>
        </div>
      </div>

      {/* Probability bars */}
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '180px', padding: '16px 0', borderBottom: '2px solid rgba(255,255,255,0.08)' }}>
        {probs.map((p, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: barColor, fontFamily: "'JetBrains Mono', monospace" }}>
              {(p * 100).toFixed(1)}%
            </div>
            <div style={{
              width: '100%',
              height: `${Math.max(p * 140, 4)}px`,
              background: `linear-gradient(180deg, ${barColor} 0%, ${sw.pink}40 100%)`,
              borderRadius: '8px 8px 0 0',
              transition: 'height 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: `0 0 12px ${barColor}30`
            }} />
            <div style={{ fontWeight: '600', color: sw.text, fontSize: '13px', marginTop: '4px' }}>
              {WORDS[i]}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
});
