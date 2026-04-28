import React, { useState } from 'react';
import type { LangchainMemoryCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LangchainMemoryProps {
  copy: LangchainMemoryCopy;
}

export const LangchainMemoryVisual = React.memo(({ copy }: LangchainMemoryProps) => {
  const [activeType, setActiveType] = useState<'buffer' | 'summary' | 'vector'>('buffer');

  const memories = {
    buffer: {
      icon: '💾',
      label: copy.bufferLabel,
      desc: copy.bufferDesc,
      color: sw.cyan,
      example: 'H1: "What is Python?"\nA1: "A programming language"\nH2: "And Java?"\nA2: "Also a language"',
    },
    summary: {
      icon: '📋',
      label: copy.summaryLabel,
      desc: copy.summaryDesc,
      color: sw.purple,
      example: 'Summary: "User asked about programming languages (Python, Java)"\nCurrent: "What about Go?"',
      tokens: '~120 tokens',
    },
    vector: {
      icon: '🔢',
      label: copy.vectorLabel,
      desc: copy.vectorDesc,
      color: '#10b981',
      example: 'Query: "What did I ask about?"\n→ Embed → search vector store → retrieve relevant messages',
    },
  };

  const current = memories[activeType];

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

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {(Object.entries(memories) as [string, typeof current][]).map(([key, m]) => (
          <button
            key={key}
            onClick={() => setActiveType(key as typeof activeType)}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: `2px solid ${activeType === key ? m.color : sw.borderSubtle}`,
              background: activeType === key ? `${m.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '22px' }}>{m.icon}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: activeType === key ? m.color : sw.text }}>
              {m.label}
            </span>
          </button>
        ))}
      </div>

      <div style={{
        padding: '16px',
        background: `${current.color}08`,
        borderRadius: '12px',
        border: `1px solid ${current.color}22`,
      }}>
        <div style={{ fontSize: '13px', fontFamily: sw.fontMono, color: sw.text, whiteSpace: 'pre-line' }}>
          {current.example}
        </div>
      </div>

      <div style={{
        padding: '14px',
        background: 'rgba(26, 22, 40, 0.6)',
        borderRadius: '10px',
        border: `1px solid ${sw.borderSubtle}`,
        fontSize: '13px',
        color: sw.textDim,
        textAlign: 'center',
      }}>
        {current.desc}
      </div>
    </div>
  );
});
