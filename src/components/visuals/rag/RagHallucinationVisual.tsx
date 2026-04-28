import React from 'react';
import { sw } from '../../../theme/tokens';
import type { RagHallucinationVisualCopy } from '../../../types/slide';

interface RagHallucinationVisualProps {
  copy: RagHallucinationVisualCopy;
}

export const RagHallucinationVisual = React.memo(({ copy }: RagHallucinationVisualProps) => {
  return (
    <div style={{
      width: '100%',
      padding: '20px 16px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: sw.text }}>
        {copy.title}
      </div>

      {/* Question */}
      <div style={{
        padding: '10px 16px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '8px',
        border: `1px solid ${sw.borderSubtle}`,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '10px', color: sw.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
          {copy.questionLabel}
        </div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: sw.text, marginTop: '4px' }}>
          "Qual a fórmula do Unobtanium?"
        </div>
      </div>

      {/* Two paths */}
      <div style={{ display: 'flex', gap: '10px', flex: 1 }}>
        {/* LEFT: With external source (grounded) */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '12px',
          background: 'rgba(52,211,153,0.06)',
          borderRadius: '10px',
          border: `1px solid rgba(52,211,153,0.2)`,
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            color: sw.green,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            ✓ {copy.truthLabel}
          </div>

          {/* External source icon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            background: 'rgba(52,211,153,0.1)',
            borderRadius: '8px',
            fontSize: '11px',
            color: sw.green,
            fontWeight: 600,
          }}>
            📚 Wikipedia + Papers
          </div>

          {/* Arrow */}
          <div style={{ textAlign: 'center', color: sw.green, fontSize: '16px' }}>↓</div>

          {/* Grounded answer */}
          <div style={{
            padding: '10px',
            background: 'rgba(52,211,153,0.12)',
            borderRadius: '8px',
            border: `1px solid rgba(52,211,153,0.3)`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '10px', color: sw.textMuted, marginBottom: '4px' }}>
              {copy.answerLabel}
            </div>
            <div style={{ fontSize: '12px', color: sw.green, fontWeight: 600 }}>
              "Unobtanium não existe na tabela periódica."
            </div>
          </div>
        </div>

        {/* RIGHT: Without source (hallucination) */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          padding: '12px',
          background: 'rgba(255,46,151,0.06)',
          borderRadius: '10px',
          border: `1px solid rgba(255,46,151,0.2)`,
        }}>
          <div style={{
            fontSize: '10px',
            fontWeight: 700,
            color: sw.red,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
            ✗ {copy.hallucinationLabel}
          </div>

          {/* No source icon */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            background: 'rgba(255,46,151,0.1)',
            borderRadius: '8px',
            fontSize: '11px',
            color: sw.red,
            fontWeight: 600,
          }}>
            🚫 Sem fonte externa
          </div>

          {/* Arrow */}
          <div style={{ textAlign: 'center', color: sw.red, fontSize: '16px' }}>↓</div>

          {/* Hallucinated answer */}
          <div style={{
            padding: '10px',
            background: 'rgba(255,46,151,0.12)',
            borderRadius: '8px',
            border: `1px solid rgba(255,46,151,0.3)`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '10px', color: sw.textMuted, marginBottom: '4px' }}>
              {copy.answerLabel}
            </div>
            <div style={{ fontSize: '12px', color: sw.red, fontWeight: 600 }}>
              "A fórmula é Un₂Ob₃..."
            </div>
            <div style={{ fontSize: '9px', color: sw.textMuted, marginTop: '4px', fontStyle: 'italic' }}>
              {copy.plausibleLabel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
