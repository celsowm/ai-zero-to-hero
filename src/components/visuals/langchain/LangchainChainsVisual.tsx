import React, { useState } from 'react';
import type { LangchainChainsCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LangchainChainsProps {
  copy: LangchainChainsCopy;
}

export const LangchainChainsVisual = React.memo(({ copy }: LangchainChainsProps) => {
  const [activeChain, setActiveChain] = useState<'lcel' | 'compose'>('lcel');

  const chains = {
    lcel: {
      icon: '⚡',
      label: copy.lcelLabel,
      desc: copy.simpleDesc,
      color: sw.cyan,
      steps: [copy.inputLabel, 'Prompt', 'LLM', 'Parser', copy.outputLabel],
    },
    compose: {
      icon: '🔗',
      label: copy.composeLabel,
      desc: copy.composeDesc,
      color: sw.purple,
      steps: [copy.inputLabel, 'Chain A', 'Chain B', 'Combine', copy.outputLabel],
    },
  };

  const current = chains[activeChain];

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
        {(Object.entries(chains) as [string, typeof current][]).map(([key, c]) => (
          <button
            key={key}
            onClick={() => setActiveChain(key as typeof activeChain)}
            style={{
              padding: '12px 20px',
              borderRadius: '12px',
              border: `2px solid ${activeChain === key ? c.color : sw.borderSubtle}`,
              background: activeChain === key ? `${c.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span style={{ fontSize: '22px' }}>{c.icon}</span>
            <span style={{ fontSize: '12px', fontWeight: '700', color: activeChain === key ? c.color : sw.text }}>
              {c.label}
            </span>
          </button>
        ))}
      </div>

      {/* Pipe diagram */}
      <div style={{
        padding: '20px',
        background: `${current.color}08`,
        borderRadius: '12px',
        border: `1px solid ${current.color}22`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {current.steps.map((step, i, arr) => (
            <React.Fragment key={i}>
              <div style={{
                padding: '10px 14px',
                background: i === 0 ? `${sw.cyan}15` : i === arr.length - 1 ? `${'#10b981'}15` : 'rgba(26, 22, 40, 0.8)',
                borderRadius: '10px',
                border: `1px solid ${i === 0 ? sw.cyan : i === arr.length - 1 ? '#10b981' : sw.borderSubtle}`,
                fontSize: '12px',
                fontWeight: '600',
                color: i === 0 ? sw.cyan : i === arr.length - 1 ? '#10b981' : sw.text,
                textAlign: 'center',
              }}>
                {step}
              </div>
              {i < arr.length - 1 && (
                <span style={{ color: current.color, fontSize: '16px', fontWeight: '700' }}>{copy.pipeSymbol}</span>
              )}
            </React.Fragment>
          ))}
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
