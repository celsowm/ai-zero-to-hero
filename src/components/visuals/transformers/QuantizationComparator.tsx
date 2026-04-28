import React, { useState } from 'react';
import type { QuantizationComparatorCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface QuantizationComparatorProps {
  copy: QuantizationComparatorCopy;
}

interface QuantLevel {
  id: string;
  bits: number;
  label: string;
  color: string;
  vram7B: string;
  precision: number; // 0-1
  quality: number; // 0-1
}

const LEVELS: QuantLevel[] = [
  { id: 'fp32', bits: 32, label: 'FP32', color: sw.pink, vram7B: '28 GB', precision: 1.0, quality: 1.0 },
  { id: 'fp16', bits: 16, label: 'FP16', color: sw.purple, vram7B: '14 GB', precision: 0.85, quality: 0.95 },
  { id: 'int8', bits: 8, label: 'INT8', color: sw.cyan, vram7B: '7 GB', precision: 0.7, quality: 0.92 },
  { id: 'nf4', bits: 4, label: 'NF4', color: '#ffcc00', vram7B: '~4 GB', precision: 0.55, quality: 0.88 },
];

export const QuantizationComparator = React.memo(({ copy }: QuantizationComparatorProps) => {
  const [selected, setSelected] = useState<string>('int8');
  const current = LEVELS.find(l => l.id === selected)!;

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
      {/* Title */}
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      {/* Level selector */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        {LEVELS.map(l => (
          <button
            key={l.id}
            onClick={() => setSelected(l.id)}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: `2px solid ${l.id === selected ? l.color : sw.borderSubtle}`,
              background: l.id === selected ? `${l.color}18` : 'rgba(26, 22, 40, 0.6)',
              color: l.id === selected ? l.color : sw.textDim,
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '700',
              transition: 'all 0.2s ease',
            }}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Comparison bars */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Bits */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, marginBottom: '8px' }}>
            {copy.bitsLabel}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {LEVELS.map(l => (
              <div key={l.id} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '100%',
                  height: `${(l.bits / 32) * 60}px`,
                  background: `linear-gradient(180deg, ${l.color}, ${l.color}44)`,
                  borderRadius: '6px',
                  transition: 'height 0.3s ease',
                  opacity: l.id === selected ? 1 : 0.5,
                  boxShadow: l.id === selected ? `0 0 12px ${l.color}44` : 'none',
                }} />
                <span style={{ fontSize: '14px', fontWeight: '700', color: l.color }}>{l.bits}</span>
              </div>
            ))}
          </div>
        </div>

        {/* VRAM for 7B */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, marginBottom: '8px' }}>
            {copy.gpuVramLabel} (7B)
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            {LEVELS.map(l => (
              <div key={l.id} style={{
                flex: 1,
                padding: '10px',
                background: l.id === selected ? `${l.color}12` : 'rgba(26, 22, 40, 0.4)',
                borderRadius: '8px',
                border: `1px solid ${l.id === selected ? l.color + '44' : sw.borderSubtle}`,
                textAlign: 'center',
                fontSize: '13px',
                fontWeight: '700',
                color: l.id === selected ? l.color : sw.textDim,
              }}>
                {l.vram7B}
              </div>
            ))}
          </div>
        </div>

        {/* Precision bar */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, marginBottom: '8px' }}>
            {copy.precisionLabel}
          </div>
          <div style={{ height: '12px', background: 'rgba(26, 22, 40, 0.6)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{
              width: `${current.precision * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${current.color}, ${current.color}88)`,
              borderRadius: '6px',
              transition: 'width 0.3s ease',
            }} />
          </div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: current.color, marginTop: '4px' }}>
            {(current.precision * 100).toFixed(0)}%
          </div>
        </div>

        {/* Quality bar */}
        <div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, marginBottom: '8px' }}>
            {copy.qualityLabel}
          </div>
          <div style={{ height: '12px', background: 'rgba(26, 22, 40, 0.6)', borderRadius: '6px', overflow: 'hidden' }}>
            <div style={{
              width: `${current.quality * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, ${current.color}, ${current.color}88)`,
              borderRadius: '6px',
              transition: 'width 0.3s ease',
            }} />
          </div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: current.color, marginTop: '4px' }}>
            {(current.quality * 100).toFixed(0)}%
          </div>
        </div>
      </div>

      {/* Selected highlight */}
      <div style={{
        padding: '12px 16px',
        background: `${current.color}08`,
        borderRadius: '10px',
        border: `1px solid ${current.color}33`,
        fontSize: '12px',
        color: sw.textDim,
        textAlign: 'center',
      }}>
        <strong style={{ color: current.color }}>{current.label}</strong>: {current.bits}-bit → {current.vram7B} VRAM para modelo 7B
      </div>
    </div>
  );
});
