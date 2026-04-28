import React, { useState } from 'react';
import type { LlamaIndexQueryEnginesCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LlamaIndexQueryEnginesProps {
  copy: LlamaIndexQueryEnginesCopy;
}

export const LlamaIndexQueryEnginesVisual = React.memo(({ copy }: LlamaIndexQueryEnginesProps) => {
  const [activeEngine, setActiveEngine] = useState<'basic' | 'subquestion' | 'routing'>('basic');

  const engines = {
    basic: {
      icon: '➡️',
      label: copy.basicLabel,
      desc: copy.basicDesc,
      color: sw.cyan,
      flow: [copy.queryLabel, 'Retriever', copy.answerLabel],
    },
    subquestion: {
      icon: '🔀',
      label: copy.subQuestionLabel,
      desc: copy.subQuestionDesc,
      color: sw.purple,
      flow: [copy.queryLabel, 'SubQ 1', 'SubQ 2', 'SubQ 3', 'Combine', copy.answerLabel],
    },
    routing: {
      icon: '🎯',
      label: copy.routingLabel,
      desc: copy.routingDesc,
      color: '#10b981',
      flow: [copy.queryLabel, 'Router', 'Best Tool', copy.answerLabel],
    },
  };

  const current = engines[activeEngine];

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

      {/* Engine selector */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {(Object.entries(engines) as [string, typeof current][]).map(([key, e]) => (
          <button
            key={key}
            onClick={() => setActiveEngine(key as typeof activeEngine)}
            style={{
              padding: '12px 18px',
              borderRadius: '12px',
              border: `2px solid ${activeEngine === key ? e.color : sw.borderSubtle}`,
              background: activeEngine === key ? `${e.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
              minWidth: '100px',
            }}
          >
            <span style={{ fontSize: '22px' }}>{e.icon}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: activeEngine === key ? e.color : sw.text }}>
              {e.label}
            </span>
          </button>
        ))}
      </div>

      {/* Flow diagram */}
      <div style={{
        padding: '20px',
        background: `${current.color}08`,
        borderRadius: '12px',
        border: `1px solid ${current.color}22`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {current.flow.map((step, i, arr) => (
            <React.Fragment key={i}>
              <div style={{
                padding: '10px 16px',
                background: i === 0 ? `${sw.cyan}15` : i === arr.length - 1 ? `${'#10b981'}15` : 'rgba(26, 22, 40, 0.8)',
                borderRadius: '10px',
                border: `1px solid ${i === 0 ? sw.cyan : i === arr.length - 1 ? '#10b981' : sw.borderSubtle}`,
                fontSize: '13px',
                fontWeight: '600',
                color: i === 0 ? sw.cyan : i === arr.length - 1 ? '#10b981' : sw.text,
              }}>
                {step}
              </div>
              {i < arr.length - 1 && <span style={{ color: current.color, fontSize: '14px' }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Description */}
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
