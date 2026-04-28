import React, { useState } from 'react';
import type { LlamaIndexChatEngineCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LlamaIndexChatEngineProps {
  copy: LlamaIndexChatEngineCopy;
}

export const LlamaIndexChatEngineVisual = React.memo(({ copy }: LlamaIndexChatEngineProps) => {
  const [activeMode, setActiveMode] = useState<'query' | 'chat'>('chat');

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

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {[
          { key: 'query' as const, label: copy.queryEngineLabel, icon: '❓', color: sw.cyan },
          { key: 'chat' as const, label: copy.chatEngineLabel, icon: '💬', color: sw.purple },
        ].map(mode => (
          <button
            key={mode.key}
            onClick={() => setActiveMode(mode.key)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: `2px solid ${activeMode === mode.key ? mode.color : sw.borderSubtle}`,
              background: activeMode === mode.key ? `${mode.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '20px' }}>{mode.icon}</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: activeMode === mode.key ? mode.color : sw.text }}>
              {mode.label}
            </span>
          </button>
        ))}
      </div>

      {/* Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Query Engine */}
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          border: `1px solid ${activeMode === 'query' ? sw.cyan : sw.borderSubtle}`,
          background: 'rgba(26, 22, 40, 0.6)',
          opacity: activeMode === 'query' ? 1 : 0.6,
        }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: sw.cyan, marginBottom: '12px' }}>
            {copy.oneShot}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {['Pergunta', 'Retriever', copy.contextLabel, 'LLM', 'Resposta'].map((step, i) => (
              <React.Fragment key={i}>
                <div style={{
                  padding: '8px 12px',
                  background: 'rgba(0, 229, 255, 0.08)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: sw.text,
                  textAlign: 'center',
                }}>
                  {step}
                </div>
                {i < 4 && <div style={{ textAlign: 'center', color: sw.cyan, fontSize: '14px' }}>↓</div>}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Chat Engine */}
        <div style={{
          padding: '16px',
          borderRadius: '12px',
          border: `1px solid ${activeMode === 'chat' ? sw.purple : sw.borderSubtle}`,
          background: 'rgba(26, 22, 40, 0.6)',
          opacity: activeMode === 'chat' ? 1 : 0.6,
        }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: sw.purple, marginBottom: '12px' }}>
            {copy.multiTurn}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[copy.historyLabel, copy.condenseQuestion, 'Retriever', copy.contextLabel, 'LLM', 'Resposta'].map((step, i) => (
              <React.Fragment key={i}>
                <div style={{
                  padding: '8px 12px',
                  background: i === 0 ? 'rgba(168, 85, 247, 0.15)' : 'rgba(168, 85, 247, 0.08)',
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: sw.text,
                  textAlign: 'center',
                  border: i === 0 ? `1px solid ${sw.purple}44` : 'none',
                }}>
                  {step}
                </div>
                {i < 5 && <div style={{ textAlign: 'center', color: sw.purple, fontSize: '14px' }}>↓</div>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Memory label */}
      <div style={{
        padding: '12px',
        background: 'rgba(168, 85, 247, 0.08)',
        borderRadius: '10px',
        border: `1px solid ${sw.purple}22`,
        textAlign: 'center',
        fontSize: '13px',
        color: sw.textDim,
      }}>
        <span style={{ color: sw.purple, fontWeight: '700' }}>{copy.memoryLabel}</span>: {copy.chatEngineLabel} mantém histórico de conversação automaticamente
      </div>
    </div>
  );
});
