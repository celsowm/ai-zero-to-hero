import React, { useState } from 'react';
import type { LangchainPromptTemplatesCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LangchainPromptTemplatesProps {
  copy: LangchainPromptTemplatesCopy;
}

export const LangchainPromptTemplatesVisual = React.memo(({ copy }: LangchainPromptTemplatesProps) => {
  const [activeType, setActiveType] = useState<'simple' | 'chat' | 'fewshot'>('simple');

  const templates = {
    simple: {
      icon: '📄',
      label: copy.simpleLabel,
      desc: copy.simpleDesc,
      color: sw.cyan,
      template: 'Translate this to French: {text}',
      input: '"Hello, how are you?"',
      result: '"Bonjour, comment allez-vous?"',
    },
    chat: {
      icon: '💬',
      label: copy.chatLabel,
      desc: copy.chatDesc,
      color: sw.purple,
      template: 'System: {system}\nHuman: {input}',
      input: 'system: "You are a helpful assistant"\ninput: "What is Python?"',
      result: 'Python is a high-level programming language...',
    },
    fewshot: {
      icon: '🎯',
      label: copy.fewShotLabel,
      desc: copy.fewShotDesc,
      color: '#10b981',
      template: 'Q: {q1}\nA: {a1}\nQ: {q2}\nA: {a2}\nQ: {q3}',
      input: 'q1: "2+2"\na1: "4"\nq2: "3*3"\na2: "9"\nq3: "4+5"',
      result: '"9"',
    },
  };

  const current = templates[activeType];

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
        {(Object.entries(templates) as [string, typeof current][]).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setActiveType(key as typeof activeType)}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: `2px solid ${activeType === key ? t.color : sw.borderSubtle}`,
              background: activeType === key ? `${t.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '22px' }}>{t.icon}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: activeType === key ? t.color : sw.text }}>
              {t.label}
            </span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {[
          { label: copy.templateLabel, value: current.template, color: sw.cyan },
          { label: copy.inputLabel, value: current.input, color: sw.purple },
          { label: copy.resultLabel, value: current.result, color: '#10b981' },
        ].map((row, i) => (
          <div key={i} style={{
            padding: '12px 16px',
            borderRadius: '10px',
            border: `1px solid ${row.color}22`,
            background: `${row.color}08`,
          }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: row.color, textTransform: 'uppercase', marginBottom: '6px' }}>
              {row.label}
            </div>
            <div style={{ fontSize: '13px', fontFamily: sw.fontMono, color: sw.text }}>
              {row.value}
            </div>
          </div>
        ))}
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
