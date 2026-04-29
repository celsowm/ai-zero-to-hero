import React, { useState } from 'react';
import type { ChainOfThoughtCopy } from '../../../types/slide/prompt-engineering';
import { sw } from '../../../theme/tokens';

interface ChainOfThoughtProps {
  copy: ChainOfThoughtCopy;
}

export const ChainOfThoughtVisual = React.memo(({ copy }: ChainOfThoughtProps) => {
  const [mode, setMode] = useState<'direct' | 'cot'>('cot');

  const isCot = mode === 'cot';

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <h3 style={{
        margin: 0,
        fontSize: sw.fsBody,
        fontWeight: 600,
        color: sw.text,
        textAlign: 'center',
      }}>
        {copy.title}
      </h3>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={() => setMode('direct')}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: `1px solid ${!isCot ? sw.yellow : sw.borderSubtle}`,
            background: !isCot ? `${sw.yellow}18` : 'transparent',
            color: !isCot ? sw.yellow : sw.textDim,
            cursor: 'pointer',
            transition: sw.transitionFast,
            fontFamily: sw.fontSans,
            fontSize: sw.fsSmall,
            fontWeight: !isCot ? 700 : 400,
          }}
        >
          {copy.directLabel}
        </button>
        <button
          onClick={() => setMode('cot')}
          style={{
            padding: '8px 20px',
            borderRadius: '8px',
            border: `1px solid ${isCot ? sw.cyan : sw.borderSubtle}`,
            background: isCot ? `${sw.cyan}18` : 'transparent',
            color: isCot ? sw.cyan : sw.textDim,
            cursor: 'pointer',
            transition: sw.transitionFast,
            fontFamily: sw.fontSans,
            fontSize: sw.fsSmall,
            fontWeight: isCot ? 700 : 400,
          }}
        >
          {copy.cotLabel}
        </button>
      </div>

      {/* Input */}
      <div style={{
        padding: '12px 16px',
        borderRadius: '10px',
        border: `1px solid ${sw.borderSubtle}`,
        background: sw.surfaceLight,
        textAlign: 'center',
      }}>
        <span style={{ fontSize: sw.fsSmall, color: sw.textDim }}>
          {copy.inputLabel}: "João tinha 5 maçãs. Comeu 2. Depois comprou o triplo do que sobrou. Quantas tem?"
        </span>
      </div>

      {/* Flow */}
      {isCot ? (
        <>
          <div style={{
            padding: '14px 16px',
            borderRadius: '10px',
            border: `1px solid ${sw.cyan}44`,
            background: `${sw.cyan}08`,
          }}>
            <span style={{ fontSize: sw.fsSmall, fontWeight: 600, color: sw.cyan, display: 'block', marginBottom: '6px' }}>
              {copy.reasoningLabel}:
            </span>
            <span style={{ fontSize: sw.fsSmall, color: sw.textDim, lineHeight: 1.7 }}>
              1. João tinha 5 maçãs<br />
              2. Comeu 2 → sobrou 5 - 2 = <strong style={{ color: sw.cyan }}>3</strong><br />
              3. Comprou o triplo de 3 → 3 × 3 = <strong style={{ color: sw.cyan }}>9</strong>
            </span>
          </div>
          <div style={{ textAlign: 'center', color: sw.textMuted, fontSize: '20px' }}>↓</div>
          <div style={{
            padding: '14px 16px',
            borderRadius: '10px',
            border: `1px solid ${sw.green}44`,
            background: `${sw.green}08`,
            textAlign: 'center',
          }}>
            <span style={{ fontSize: sw.fsSmall, color: sw.green, fontWeight: 700 }}>
              {copy.outputLabel}: 9 maçãs ✓
            </span>
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign: 'center', color: sw.textMuted, fontSize: '20px' }}>↓</div>
          <div style={{
            padding: '14px 16px',
            borderRadius: '10px',
            border: `1px solid ${sw.yellow}44`,
            background: `${sw.yellow}08`,
            textAlign: 'center',
          }}>
            <span style={{ fontSize: sw.fsSmall, color: sw.yellow, fontWeight: 700 }}>
              {copy.outputLabel}: 15 maçãs ✗ (errou!)
            </span>
          </div>
        </>
      )}

      {/* Accuracy comparison */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: sw.fsSmall, color: sw.textDim }}>
          <span>{copy.accuracyDirectLabel}</span>
          <span style={{ color: sw.yellow }}>35% ▓▓▓░░░░░░░</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: sw.fsSmall, color: sw.textDim }}>
          <span>{copy.accuracyCotLabel}</span>
          <span style={{ color: sw.cyan }}>78% ▓▓▓▓▓▓▓▓░░</span>
        </div>
      </div>
    </div>
  );
});
