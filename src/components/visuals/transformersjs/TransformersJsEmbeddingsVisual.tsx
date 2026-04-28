import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { TransformersJsEmbeddingsVisualCopy } from '../../../types/slide';

interface TransformersJsEmbeddingsVisualProps {
  copy: TransformersJsEmbeddingsVisualCopy;
}

export const TransformersJsEmbeddingsVisual = React.memo(({ copy }: TransformersJsEmbeddingsVisualProps) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep((s) => (s + 1) % 4), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{
      width: '100%',
      padding: '16px 12px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: sw.text }}>
        {copy.title}
      </div>

      {/* Flow */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        {/* Input text */}
        <div style={{
          padding: '8px 16px',
          background: step >= 1 ? `${sw.cyan}12` : 'rgba(255,255,255,0.05)',
          borderRadius: '6px',
          border: `1px solid ${step >= 1 ? sw.cyan + '33' : sw.borderSubtle}`,
          transition: 'all 0.4s ease',
        }}>
          <span style={{ fontSize: '10px', color: sw.textMuted, display: 'block', marginBottom: '2px' }}>
            {copy.inputLabel}
          </span>
          <span style={{ fontSize: '12px', fontWeight: 600, color: sw.text }}>
            "GPT-2 lançado em 2019"
          </span>
        </div>

        <div style={{ color: sw.textMuted, fontSize: '12px' }}>↓</div>

        {/* Model loading */}
        <div style={{
          padding: '8px 16px',
          background: step >= 2 ? `rgba(168,85,247,0.12)` : 'rgba(255,255,255,0.03)',
          borderRadius: '6px',
          border: `1px solid ${step >= 2 ? '#a855f7' + '33' : sw.borderSubtle}`,
          transition: 'all 0.4s ease',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: '#a855f7' }}>
            {copy.modelLabel}
          </div>
          <div style={{ fontSize: '9px', color: sw.textMuted }}>
            all-MiniLM-L6-v2
          </div>
          {step < 2 && (
            <div style={{ fontSize: '9px', color: sw.yellow, marginTop: '2px' }}>
              {copy.downloadLabel}
            </div>
          )}
          {step >= 2 && (
            <div style={{ fontSize: '9px', color: sw.green, marginTop: '2px' }}>
              ✓ {copy.cacheLabel}
            </div>
          )}
        </div>

        <div style={{ color: sw.textMuted, fontSize: '12px' }}>↓</div>

        {/* Output vector */}
        <div style={{
          padding: '10px 16px',
          background: step >= 3 ? `${sw.green}12` : 'rgba(255,255,255,0.03)',
          borderRadius: '6px',
          border: `1px solid ${step >= 3 ? sw.green + '33' : sw.borderSubtle}`,
          transition: 'all 0.4s ease',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 700, color: sw.green, marginBottom: '4px' }}>
            {copy.outputLabel}
          </div>
          <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {Array.from({ length: 20 }).map((_, i) => {
              const val = (Math.sin(i * 0.5) * 0.5 + 0.5);
              return (
                <div
                  key={i}
                  style={{
                    width: '8px',
                    height: '20px',
                    background: val > 0.5 ? sw.cyan : sw.red,
                    opacity: step >= 3 ? (0.3 + val * 0.7) : 0.1,
                    borderRadius: '2px',
                    transition: `opacity 0.4s ease-out ${i * 0.02}s`,
                  }}
                />
              );
            })}
            <span style={{ fontSize: '10px', color: sw.textMuted, marginLeft: '4px' }}>
              ... (384 total)
            </span>
          </div>
        </div>
      </div>

      {/* Performance */}
      <div style={{
        textAlign: 'center',
        fontSize: '10px',
        color: step >= 3 ? sw.green : sw.textMuted,
        transition: 'color 0.4s ease',
      }}>
        ⚡ {copy.inferLabel}
      </div>
    </div>
  );
});
