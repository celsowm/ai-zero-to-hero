import React, { useState } from 'react';
import type { Fp16OverflowExplorerCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Fp16OverflowExplorerProps {
  copy: Fp16OverflowExplorerCopy;
}

const FP16_MAX = 65504;
const TEST_VALUES = [1, 100, 1000, 10000, 65504, 70000, 100000];

export const Fp16OverflowExplorer = React.memo(({ copy }: Fp16OverflowExplorerProps) => {
  const [inputVal, setInputVal] = useState(50000);
  const numInput = Number(inputVal) || 0;

  const fp32Str = numInput.toFixed(4);
  const isOverflow = Math.abs(numInput) > FP16_MAX;
  const fp16Str = isOverflow ? 'inf' : numInput.toFixed(4);

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
      gap: '24px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      {/* Title */}
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      {/* Slider */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', fontSize: '13px' }}>{copy.inputLabel}</span>
          <span style={{ fontWeight: '700', fontSize: '15px', color: isOverflow ? sw.pink : sw.cyan }}>
            {numInput.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="-100000" max="100000" step="100"
          value={numInput}
          onChange={(e) => setInputVal(Number(e.target.value))}
          style={{ width: '100%' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: sw.textDim }}>
          <span>-100,000</span>
          <span>0</span>
          <span>+100,000</span>
        </div>
      </div>

      {/* FP32 vs FP16 comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{
          padding: '16px',
          background: isOverflow ? 'rgba(255, 46, 151, 0.08)' : 'rgba(0, 229, 255, 0.06)',
          borderRadius: '12px',
          border: `1px solid ${isOverflow ? sw.pink + '44' : sw.cyan + '33'}`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: sw.textDim, marginBottom: '4px' }}>
            {copy.fp32Label} (32-bit)
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: sw.cyan }}>
            {fp32Str}
          </div>
          <div style={{ fontSize: '10px', color: sw.textDim, marginTop: '4px' }}>{copy.safeLabel}</div>
        </div>

        <div style={{
          padding: '16px',
          background: isOverflow ? 'rgba(255, 46, 151, 0.15)' : 'rgba(0, 229, 255, 0.06)',
          borderRadius: '12px',
          border: `1px solid ${isOverflow ? sw.pink + '66' : sw.cyan + '33'}`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: sw.textDim, marginBottom: '4px' }}>
            {copy.fp16Label} (16-bit)
          </div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: isOverflow ? sw.pink : sw.cyan }}>
            {fp16Str}
          </div>
          <div style={{ fontSize: '10px', color: isOverflow ? sw.pink : sw.textDim, marginTop: '4px' }}>
            {isOverflow ? copy.overflowLabel : copy.safeLabel}
          </div>
        </div>
      </div>

      {/* Threshold indicator */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(255, 204, 0, 0.06)',
        borderRadius: '10px',
        border: `1px solid rgba(255, 204, 0, 0.2)`,
        fontSize: '12px',
        color: sw.textDim,
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <span><strong style={{ color: '#ffcc00' }}>{copy.thresholdLabel}:</strong> ±{FP16_MAX.toLocaleString()}</span>
        <span>{copy.rangeLabel}: [{(-FP16_MAX).toLocaleString()}, {FP16_MAX.toLocaleString()}]</span>
      </div>

      {/* Quick test buttons */}
      <div>
        <div style={{ fontSize: '11px', fontWeight: '600', color: sw.textDim, marginBottom: '8px' }}>
          {copy.valueLabel}:
        </div>
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {TEST_VALUES.map(v => {
            const over = Math.abs(v) > FP16_MAX;
            return (
              <button
                key={v}
                onClick={() => setInputVal(v)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: `1px solid ${over ? sw.pink + '44' : sw.borderSubtle}`,
                  background: over ? 'rgba(255, 46, 151, 0.1)' : 'rgba(26, 22, 40, 0.6)',
                  color: over ? sw.pink : sw.textDim,
                  cursor: 'pointer',
                  fontSize: '11px',
                  fontWeight: '600',
                }}
              >
                {v.toLocaleString()} {over ? '→ inf' : '✓'}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
});
