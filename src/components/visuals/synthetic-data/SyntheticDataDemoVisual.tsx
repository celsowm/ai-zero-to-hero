import React from 'react';
import { sw } from '../../../theme/tokens';
import type { SyntheticDataNegativesVisualCopy } from '../../../types/slide';

interface SyntheticDataDemoVisualProps {
  copy: SyntheticDataNegativesVisualCopy;
}

const NEGATIVE_TYPES = [
  { key: 'negativeCase', color: '#ef4444', icon: '✋' },
  { key: 'refusal', color: '#f97316', icon: '🚫' },
  { key: 'clarification', color: '#f59e0b', icon: '❓' },
  { key: 'uncertainty', color: '#eab308', icon: '🤷' },
] as const;

export const SyntheticDataDemoVisual = React.memo(({ copy }: SyntheticDataDemoVisualProps) => {
  const getTypeData = (key: string) => {
    const map: Record<string, { title: string; desc: string }> = {
      negativeCase: { title: copy.negativeCaseTitle, desc: copy.negativeCaseDesc },
      refusal: { title: copy.refusalTitle, desc: copy.refusalDesc },
      clarification: { title: copy.clarificationTitle, desc: copy.clarificationDesc },
      uncertainty: { title: copy.uncertaintyTitle, desc: copy.uncertaintyDesc },
    };
    return map[key] || { title: key, desc: '' };
  };

  return (
    <div style={{
      width: '100%',
      padding: '20px 16px',
      background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(11,11,18,0.98))',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Title */}
      <div style={{
        fontSize: '13px',
        fontWeight: 700,
        color: 'var(--sw-text)',
        marginBottom: '4px',
        textAlign: 'center',
      }}>
        {copy.title}
      </div>
      <div style={{
        fontSize: '10px',
        color: 'var(--sw-text-muted)',
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        {copy.subtitle}
      </div>

      {/* 4 Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '8px',
        marginBottom: '16px',
      }}>
        {NEGATIVE_TYPES.map((nt) => {
          const data = getTypeData(nt.key);
          return (
            <div key={nt.key} style={{
              padding: '12px',
              background: 'rgba(255,255,255,0.02)',
              borderRadius: '10px',
              border: `1px solid ${nt.color}25`,
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginBottom: '6px',
              }}>
                <span style={{ fontSize: '14px' }}>{nt.icon}</span>
                <span style={{
                  fontSize: '10px',
                  fontWeight: 700,
                  color: nt.color,
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}>
                  {data.title}
                </span>
              </div>
              <div style={{
                fontSize: '10px',
                color: 'var(--sw-text-muted)',
                lineHeight: 1.5,
              }}>
                {data.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Example Block */}
      <div style={{
        padding: '14px',
        background: 'rgba(59,130,246,0.06)',
        borderRadius: '10px',
        border: '1px solid rgba(59,130,246,0.2)',
        marginBottom: '12px',
      }}>
        <div style={{
          fontSize: '10px',
          fontWeight: 600,
          color: '#64c8ff',
          marginBottom: '8px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {copy.exampleLabel}
        </div>

        {/* Prompt bubble */}
        <div style={{
          padding: '8px 10px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '6px',
          fontSize: '10px',
          color: 'var(--sw-text)',
          marginBottom: '6px',
          fontFamily: "'JetBrains Mono', monospace",
          borderLeft: '2px solid rgba(255,255,255,0.15)',
        }}>
          <span style={{ color: 'var(--sw-text-muted)' }}>User: </span>{copy.examplePrompt}
        </div>

        {/* Response bubble */}
        <div style={{
          padding: '8px 10px',
          background: 'rgba(239,68,68,0.06)',
          borderRadius: '6px',
          fontSize: '10px',
          color: '#fca5a5',
          fontFamily: "'JetBrains Mono', monospace",
          borderLeft: '2px solid #ef4444',
        }}>
          <span style={{ color: '#ef4444' }}>Assistant (refusal): </span>{copy.exampleResponse}
        </div>
      </div>

      {/* Professor Speech */}
      <div style={{
        padding: '10px 14px',
        background: 'rgba(100,200,255,0.05)',
        borderRadius: '8px',
        borderLeft: '3px solid #64c8ff',
        fontSize: '11px',
        color: 'var(--sw-text-muted)',
        lineHeight: 1.5,
        fontStyle: 'italic',
        marginBottom: '12px',
      }}>
        {copy.professorSpeech}
      </div>

      {/* Hint */}
      <div style={{
        fontSize: '10px',
        color: 'var(--sw-text-muted)',
        textAlign: 'center',
      }}>
        {copy.hint}
      </div>
    </div>
  );
});
