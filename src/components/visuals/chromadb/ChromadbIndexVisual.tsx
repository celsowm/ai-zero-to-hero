import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { ChromadbIndexVisualCopy } from '../../../types/slide';

interface ChromadbIndexVisualProps {
  copy: ChromadbIndexVisualCopy;
}

const DOCS = [
  { text: 'Transformers são...', color: sw.cyan },
  { text: 'PyTorch é o...', color: '#a855f7' },
  { text: 'Vector databases...', color: sw.yellow },
  { text: 'ChromaDB é...', color: sw.green },
];

export const ChromadbIndexVisual = React.memo(({ copy }: ChromadbIndexVisualProps) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStep((s) => (s + 1) % 5), 2000);
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
      gap: '12px',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: sw.text }}>
        {copy.title}
      </div>

      {/* Flow */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        {/* Documents */}
        <div style={{
          padding: '10px',
          background: step >= 0 ? `${sw.cyan}08` : 'transparent',
          borderRadius: '8px',
          border: `1px solid ${step >= 0 ? sw.cyan + '22' : sw.borderSubtle}`,
          transition: 'all 0.4s ease',
          width: '100%',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: sw.textMuted, textTransform: 'uppercase', marginBottom: '6px' }}>
            📄 {copy.docLabel}
          </div>
          {DOCS.map((d, i) => (
            <div key={i} style={{
              fontSize: '11px',
              color: d.color,
              padding: '2px 0',
              opacity: step >= 0 ? 1 : 0.3,
              transition: `opacity 0.3s ease ${i * 0.1}s`,
            }}>
              {d.text}
            </div>
          ))}
        </div>

        {/* Arrow */}
        <div style={{ color: step >= 1 ? sw.cyan : sw.textMuted, fontSize: '16px', transition: 'color 0.3s ease' }}>↓</div>

        {/* Embedding */}
        <div style={{
          padding: '10px',
          background: step >= 1 ? `${sw.purple}08` : 'transparent',
          borderRadius: '8px',
          border: `1px solid ${step >= 1 ? sw.purple + '22' : sw.borderSubtle}`,
          transition: 'all 0.4s ease',
          width: '100%',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '10px', fontWeight: 600, color: sw.textMuted, textTransform: 'uppercase', marginBottom: '4px' }}>
            🔢 {copy.embedLabel}
          </div>
          <div style={{ fontSize: '10px', color: sw.purple, fontWeight: 600 }}>
            {copy.embedderLabel}
          </div>
          {step >= 1 && (
            <div style={{ display: 'flex', gap: '3px', justifyContent: 'center', marginTop: '6px', flexWrap: 'wrap' }}>
              {Array.from({ length: 24 }).map((_, i) => {
                const val = Math.sin(i * 0.6) * 0.5 + 0.5;
                return (
                  <div
                    key={i}
                    style={{
                      width: '6px',
                      height: '16px',
                      background: val > 0.5 ? sw.cyan : sw.pink,
                      opacity: 0.3 + val * 0.7,
                      borderRadius: '2px',
                    }}
                  />
                );
              })}
            </div>
          )}
          <div style={{ fontSize: '9px', color: sw.textMuted, marginTop: '4px' }}>
            [{copy.dimLabel}]
          </div>
        </div>

        {/* Arrow */}
        <div style={{ color: step >= 2 ? sw.green : sw.textMuted, fontSize: '16px', transition: 'color 0.3s ease' }}>↓</div>

        {/* ChromaDB */}
        <div style={{
          padding: '12px',
          background: step >= 2 ? `${sw.green}08` : 'transparent',
          borderRadius: '8px',
          border: `1px solid ${step >= 2 ? sw.green + '33' : sw.borderSubtle}`,
          transition: 'all 0.4s ease',
          width: '100%',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', fontWeight: 700, color: sw.green, marginBottom: '4px' }}>
            🗄️ {copy.dbLabel}
          </div>
          <div style={{ fontSize: '10px', color: sw.textMuted }}>
            {copy.addLabel}
          </div>
          {step >= 2 && (
            <div style={{
              marginTop: '6px',
              padding: '4px 8px',
              background: `${sw.green}12`,
              borderRadius: '4px',
              fontSize: '10px',
              color: sw.green,
              fontWeight: 600,
            }}>
              ✅ 4 docs indexed
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
