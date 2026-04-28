import React, { useState } from 'react';
import type { OnnxOptimizationCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface OnnxOptimizationProps {
  copy: OnnxOptimizationCopy;
}

export const OnnxOptimizationVisual = React.memo(({ copy }: OnnxOptimizationProps) => {
  const [activeFormat, setActiveFormat] = useState<'fp32' | 'fp16' | 'int8' | 'int4'>('fp32');

  const formats = {
    fp32: { label: copy.fp32Label, color: sw.cyan, speedup: 1, vram: '16 GB', desc: copy.fp32Desc },
    fp16: { label: copy.fp16Label, color: sw.purple, speedup: 1.8, vram: '8 GB', desc: copy.fp16Desc },
    int8: { label: copy.int8Label, color: sw.pink, speedup: 3.2, vram: '4 GB', desc: copy.int8Desc },
    int4: { label: copy.int4Label, color: '#10b981', speedup: 5.0, vram: '2 GB', desc: copy.int4Desc },
  };

  const current = formats[activeFormat];

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

      {/* Format selector */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {(Object.entries(formats) as [string, typeof current][]).map(([key, f]) => (
          <button
            key={key}
            onClick={() => setActiveFormat(key as typeof activeFormat)}
            style={{
              padding: '12px 18px',
              borderRadius: '12px',
              border: `2px solid ${activeFormat === key ? f.color : sw.borderSubtle}`,
              background: activeFormat === key ? `${f.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <span style={{ fontSize: '14px', fontWeight: '700', color: activeFormat === key ? f.color : sw.text }}>
              {f.label}
            </span>
          </button>
        ))}
      </div>

      {/* Speedup bar */}
      <div>
        <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, marginBottom: '12px', textTransform: 'uppercase' }}>
          {copy.speedupLabel}
        </div>
        {(Object.entries(formats) as [string, typeof current][]).map(([key, f]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: activeFormat === key ? f.color : sw.textDim, width: '50px', textAlign: 'right', fontWeight: activeFormat === key ? '700' : '400' }}>
              {f.label}
            </span>
            <div style={{
              flex: 1,
              height: '22px',
              background: 'rgba(26, 22, 40, 0.6)',
              borderRadius: '4px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${(f.speedup / 5) * 100}%`,
                background: activeFormat === key ? f.color : `${f.color}55`,
                borderRadius: '4px',
                transition: 'all 0.3s ease',
              }} />
            </div>
            <span style={{ fontSize: '12px', fontWeight: '700', color: activeFormat === key ? f.color : sw.textDim, width: '50px' }}>
              {f.speedup}x
            </span>
          </div>
        ))}
      </div>

      {/* VRAM */}
      <div style={{
        padding: '16px',
        background: `${current.color}08`,
        borderRadius: '12px',
        border: `1px solid ${current.color}22`,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, textTransform: 'uppercase' }}>
            {copy.vramLabel}
          </div>
          <div style={{ fontSize: '18px', fontWeight: '700', color: current.color }}>
            {current.vram}
          </div>
        </div>
        <div style={{ fontSize: '13px', color: sw.textDim, maxWidth: '250px', textAlign: 'right' }}>
          {current.desc}
        </div>
      </div>

      {/* Export command */}
      <div style={{
        padding: '14px',
        background: 'rgba(26, 22, 40, 0.8)',
        borderRadius: '10px',
        border: `1px solid ${sw.borderSubtle}`,
        fontFamily: sw.fontMono,
        fontSize: '12px',
        color: sw.textDim,
      }}>
        {copy.exportLabel}:<br />
        <span style={{ color: sw.cyan }}>optimum-cli export onnx -m model --task text-generation --optimize O3</span>
      </div>
    </div>
  );
});
