import React, { useState } from 'react';
import type { FewShotPromptingCopy } from '../../../types/slide/prompt-engineering';
import { sw } from '../../../theme/tokens';

interface FewShotPromptingProps {
  copy: FewShotPromptingCopy;
}

export const FewShotPromptingVisual = React.memo(({ copy }: FewShotPromptingProps) => {
  const [revealedPattern, setRevealedPattern] = useState(false);

  const examples = [
    { label: copy.example1Label, input: 'positivo → 😊', output: 'Sentimento: positivo' },
    { label: copy.example2Label, input: 'neutro → 😐', output: 'Sentimento: neutro' },
    { label: copy.example3Label, input: 'negativo → 😞', output: 'Sentimento: negativo' },
  ];

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
      gap: '16px',
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

      {/* Examples */}
      {examples.map((ex, i) => (
        <div
          key={i}
          style={{
            padding: '12px 16px',
            borderRadius: '10px',
            border: `1px solid ${sw.borderSubtle}`,
            background: sw.surfaceLight,
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          <span style={{ fontSize: sw.fsSmall, fontWeight: 600, color: sw.cyan }}>
            {ex.label}
          </span>
          <span style={{ fontSize: sw.fsSmall, color: sw.textDim }}>
            Input: {ex.input}
          </span>
          <span style={{ fontSize: sw.fsSmall, color: sw.textMuted }}>
            {copy.arrowLabel} {ex.output}
          </span>
        </div>
      ))}

      {/* Real input */}
      <div style={{
        padding: '12px 16px',
        borderRadius: '10px',
        border: `1px solid ${sw.yellow}44`,
        background: `${sw.yellow}08`,
      }}>
        <span style={{ fontSize: sw.fsSmall, fontWeight: 600, color: sw.yellow }}>
          {copy.realInputLabel}
        </span>
        <span style={{ fontSize: sw.fsSmall, color: sw.textDim, display: 'block', marginTop: '4px' }}>
          " adorei o filme!
        </span>
      </div>

      {/* Pattern reveal button */}
      <button
        onClick={() => setRevealedPattern(!revealedPattern)}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          border: `1px solid ${revealedPattern ? sw.green : sw.cyan}`,
          background: revealedPattern ? `${sw.green}14` : `${sw.cyan}08`,
          color: revealedPattern ? sw.green : sw.cyan,
          cursor: 'pointer',
          transition: sw.transitionFast,
          fontFamily: sw.fontSans,
          fontSize: sw.fsSmall,
          fontWeight: 600,
        }}
      >
        {revealedPattern ? '✓ ' : '🔍 '}{copy.patternLabel}
      </button>

      {revealedPattern && (
        <div style={{
          padding: '16px',
          borderRadius: '10px',
          border: `1px solid ${sw.green}44`,
          background: `${sw.green}08`,
          textAlign: 'center',
        }}>
          <p style={{
            margin: 0,
            fontSize: sw.fsSmall,
            color: sw.green,
            lineHeight: 1.6,
          }}>
            {copy.outputLabel}: <strong>"Sempre classifique baseado no emoji/sentimento da frase"</strong>
          </p>
        </div>
      )}
    </div>
  );
});
