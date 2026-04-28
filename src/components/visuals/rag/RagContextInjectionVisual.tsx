import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { RagContextInjectionVisualCopy } from '../../../types/slide';

interface RagContextInjectionVisualProps {
  copy: RagContextInjectionVisualCopy;
}

export const RagContextInjectionVisual = React.memo(({ copy }: RagContextInjectionVisualProps) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep((s) => (s + 1) % 4), 2500);
    return () => clearInterval(interval);
  }, []);

  const sources = [
    { num: 1, text: 'Copa 2022 no Catar' },
    { num: 2, text: 'Argentina 4x2 França' },
    { num: 3, text: 'Messi = melhor jogador' },
  ];

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

      {/* Retrieved context box */}
      <div style={{
        padding: '10px',
        background: step >= 1 ? `rgba(0,229,255,0.08)` : 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        border: `1px solid ${step >= 1 ? sw.cyan + '33' : sw.borderSubtle}`,
        transition: 'all 0.4s ease',
      }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: sw.cyan, textTransform: 'uppercase', marginBottom: '6px' }}>
          📋 {copy.contextBox}
        </div>
        {sources.map((s, i) => (
          <div key={s.num} style={{
            display: 'flex',
            gap: '6px',
            marginBottom: i < sources.length - 1 ? '4px' : '0',
            opacity: step >= 1 ? 1 : 0.3,
            transform: step >= 1 ? 'translateX(0)' : 'translateX(-10px)',
            transition: `all 0.4s ease-out ${i * 0.1}s`,
          }}>
            <span style={{
              fontSize: '10px',
              fontWeight: 700,
              color: sw.yellow,
              fontFamily: sw.fontMono,
              flexShrink: 0,
            }}>
              {copy.sourceLabel} {s.num}:
            </span>
            <span style={{ fontSize: '11px', color: sw.text, flex: 1 }}>
              {s.text}
            </span>
          </div>
        ))}
      </div>

      {/* Arrow */}
      <div style={{ textAlign: 'center', color: sw.textMuted, fontSize: '16px' }}>
        {step >= 2 ? '↓' : '·'}
      </div>

      {/* Final prompt box */}
      <div style={{
        padding: '12px',
        background: step >= 3 ? `rgba(52,211,153,0.08)` : 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        border: `1px solid ${step >= 3 ? sw.green + '33' : sw.borderSubtle}`,
        transition: 'all 0.4s ease',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
      }}>
        <div style={{ fontSize: '10px', fontWeight: 700, color: sw.green, textTransform: 'uppercase' }}>
          📝 {copy.promptBox}
        </div>

        {/* Instruction */}
        <div style={{
          fontSize: '10px',
          color: sw.yellow,
          fontStyle: 'italic',
          opacity: step >= 3 ? 1 : 0.3,
          transition: 'opacity 0.4s ease-out 0.1s',
        }}>
          {copy.instructionLabel}
        </div>

        {/* Context recap */}
        <div style={{
          fontSize: '10px',
          color: sw.textMuted,
          opacity: step >= 3 ? 1 : 0.3,
          transition: 'opacity 0.4s ease-out 0.2s',
        }}>
          {sources.map((s) => `${copy.sourceLabel} ${s.num}: ${s.text}`).join(' | ')}
        </div>

        {/* Question */}
        <div style={{
          fontSize: '12px',
          fontWeight: 700,
          color: sw.text,
          opacity: step >= 3 ? 1 : 0.3,
          transition: 'opacity 0.4s ease-out 0.3s',
        }}>
          💬 Quem ganhou a Copa de 2022?
        </div>

        {/* Answer */}
        <div style={{
          padding: '8px 12px',
          background: step >= 3 ? `${sw.green}12` : 'transparent',
          borderRadius: '6px',
          border: step >= 3 ? `1px solid ${sw.green}33` : '1px solid transparent',
          fontSize: '12px',
          fontWeight: 600,
          color: step >= 3 ? sw.green : sw.textMuted,
          transition: 'all 0.4s ease-out 0.4s',
          textAlign: 'center',
        }}>
          ✅ Argentina (fundamentado nas fontes)
        </div>
      </div>
    </div>
  );
});
