import React, { useState } from 'react';
import type { DataCollatorVisualizerCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface DataCollatorVisualizerProps {
  copy: DataCollatorVisualizerCopy;
}

const SAMPLE_SEQUENCES = [
  ['The', 'cat', 'sat', 'on', 'the'],
  ['Hello', 'world'],
  ['Transformers', 'are', 'powerful', 'and', 'efficient', 'models', 'for', 'NLP'],
];

export const DataCollatorVisualizer = React.memo(({ copy }: DataCollatorVisualizerProps) => {
  const [mode, setMode] = useState<'dynamic' | 'static'>('dynamic');

  const maxLen = mode === 'static' ? 16 : Math.max(...SAMPLE_SEQUENCES.map(s => s.length));

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
      {/* Title + mode toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan }}>{copy.title}</div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {(['dynamic', 'static'] as const).map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              style={{
                padding: '6px 14px',
                borderRadius: '8px',
                border: `1px solid ${m === mode ? sw.cyan : sw.borderSubtle}`,
                background: m === mode ? 'rgba(0, 229, 255, 0.12)' : 'rgba(26, 22, 40, 0.6)',
                color: m === mode ? sw.cyan : sw.textDim,
                cursor: 'pointer',
                fontSize: '12px',
                fontWeight: '600',
              }}
            >
              {m === 'dynamic' ? copy.dynamicPadding : copy.staticPadding}
            </button>
          ))}
        </div>
      </div>

      {/* Sequences before padding */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, marginBottom: '8px', textTransform: 'uppercase' }}>
          {copy.sequenceLabel}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {SAMPLE_SEQUENCES.map((seq, i) => (
            <div key={i} style={{ display: 'flex', gap: '4px' }}>
              {seq.map((token, j) => (
                <div key={j} style={{
                  padding: '4px 8px',
                  background: 'rgba(0, 229, 255, 0.1)',
                  border: `1px solid ${sw.cyan}33`,
                  borderRadius: '4px',
                  fontSize: '11px',
                  fontWeight: '600',
                  color: sw.cyan,
                  minWidth: '36px',
                  textAlign: 'center',
                }}>
                  {token}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Arrow */}
      <div style={{ textAlign: 'center', fontSize: '20px', color: sw.purple }}>↓ {copy.batchLabel}</div>

      {/* Padded batch */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, marginBottom: '8px', textTransform: 'uppercase' }}>
          {copy.paddedLabel} (max_len={maxLen})
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {SAMPLE_SEQUENCES.map((seq, i) => (
            <div key={i} style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: maxLen }).map((_, j) => {
                const isPad = j >= seq.length;
                return (
                  <div key={j} style={{
                    padding: '4px 8px',
                    background: isPad ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 229, 255, 0.1)',
                    border: `1px solid ${isPad ? sw.borderSubtle : sw.cyan + '33'}`,
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: isPad ? sw.textDim : sw.cyan,
                    minWidth: '36px',
                    textAlign: 'center',
                    opacity: isPad ? 0.5 : 1,
                  }}>
                    {isPad ? copy.padToken : seq[j]}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Max len info */}
      <div style={{
        padding: '10px 16px',
        background: 'rgba(168, 85, 247, 0.08)',
        borderRadius: '10px',
        border: `1px solid ${sw.purple}33`,
        fontSize: '12px',
        color: sw.textDim,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span><strong style={{ color: sw.purple }}>{copy.maxLenLabel}:</strong> {maxLen}</span>
        <span>
          <strong style={{ color: sw.cyan }}>{mode === 'dynamic' ? copy.dynamicPadding : copy.staticPadding}</strong>: {mode === 'dynamic' ? 'adapta ao batch' : 'fixo em 16'}
        </span>
      </div>
    </div>
  );
});
