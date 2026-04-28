import React, { useState } from 'react';
import type { LangchainToolsCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LangchainToolsProps {
  copy: LangchainToolsCopy;
}

export const LangchainToolsVisual = React.memo(({ copy }: LangchainToolsProps) => {
  const [activeTool, setActiveTool] = useState<'search' | 'calc' | 'custom'>('search');

  const tools = {
    search: {
      icon: '🔍',
      label: copy.searchLabel,
      desc: copy.searchDesc,
      color: sw.cyan,
      input: '"current weather in SP"',
      output: '{"temp": 28, "condition": "sunny"}',
    },
    calc: {
      icon: '🧮',
      label: copy.calcLabel,
      desc: copy.calcDesc,
      color: sw.pink,
      input: '"what is 23 * 47?"',
      output: '"1081"',
    },
    custom: {
      icon: '🛠️',
      label: copy.customLabel,
      desc: copy.customDesc,
      color: '#10b981',
      input: '"get github stars for langchain"',
      output: '{"stars": 54000}',
    },
  };

  const current = tools[activeTool];

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
        {(Object.entries(tools) as [string, typeof current][]).map(([key, t]) => (
          <button
            key={key}
            onClick={() => setActiveTool(key as typeof activeTool)}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: `2px solid ${activeTool === key ? t.color : sw.borderSubtle}`,
              background: activeTool === key ? `${t.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '22px' }}>{t.icon}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: activeTool === key ? t.color : sw.text }}>
              {t.label}
            </span>
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{
          padding: '12px 16px',
          borderRadius: '10px',
          border: `1px solid ${sw.cyan}22`,
          background: `${sw.cyan}08`,
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: sw.cyan, textTransform: 'uppercase', marginBottom: '6px' }}>
            {copy.inputLabel}
          </div>
          <div style={{ fontSize: '13px', fontFamily: sw.fontMono, color: sw.text }}>
            {current.input}
          </div>
        </div>

        <div style={{ textAlign: 'center', color: current.color, fontSize: '18px' }}>↓</div>

        <div style={{
          padding: '12px 16px',
          borderRadius: '10px',
          border: `1px solid ${current.color}22`,
          background: `${current.color}08`,
        }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: current.color, textTransform: 'uppercase', marginBottom: '6px' }}>
            {copy.outputLabel}
          </div>
          <div style={{ fontSize: '13px', fontFamily: sw.fontMono, color: sw.text }}>
            {current.output}
          </div>
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
