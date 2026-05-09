import React from 'react';
import type { AgenteInActionCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props { copy: AgenteInActionCopy }

export const AgenteInAction = React.memo(({ copy }: Props) => {
  const [mode, setMode] = React.useState<'llm' | 'agent'>('llm');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', color: sw.text, textAlign: 'center' }}>{copy.title}</h4>

      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
        <button
          onClick={() => setMode('llm')}
          style={{
            padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700',
            border: `1px solid ${mode === 'llm' ? sw.pink : sw.borderSubtle}44`,
            background: mode === 'llm' ? `${sw.pink}22` : sw.surface,
            color: mode === 'llm' ? sw.pink : sw.textMuted,
            cursor: 'pointer',
          }}
        >
          {copy.llmOnlyLabel}
        </button>
        <button
          onClick={() => setMode('agent')}
          style={{
            padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700',
            border: `1px solid ${mode === 'agent' ? sw.emerald : sw.borderSubtle}44`,
            background: mode === 'agent' ? `${sw.emerald}22` : sw.surface,
            color: mode === 'agent' ? sw.emerald : sw.textMuted,
            cursor: 'pointer',
          }}
        >
          {copy.agentLabel}
        </button>
      </div>

      <div style={{
        background: sw.void, borderRadius: '10px', padding: '12px',
        border: `1px solid ${mode === 'llm' ? sw.pink : sw.emerald}22`,
        minHeight: '80px',
      }}>
        <div style={{ fontSize: '11px', color: sw.textMuted, marginBottom: '4px' }}>
          {copy.questionLabel} "Qual a temperatura em São Paulo agora?"
        </div>
        <div style={{
          fontSize: '13px', color: sw.text, padding: '8px',
          background: sw.surface, borderRadius: '8px', marginTop: '6px',
        }}>
          {mode === 'llm' ? (
            <>
              {copy.llmResponse}
              <div style={{ fontSize: '10px', color: sw.amber, marginTop: '6px' }}>
                {copy.hallucinationWarning}
              </div>
            </>
          ) : (
            <>
              {copy.agentResponse}
              <div style={{ fontSize: '10px', color: sw.emerald, marginTop: '6px' }}>
                {copy.groundedResult} — {copy.toolUseLabel} buscar_temperatura("São Paulo")
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{
        background: `${sw.sky}08`, border: `1px solid ${sw.sky}22`,
        borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: sw.text,
        lineHeight: '1.4',
      }}>
        <strong style={{ color: sw.sky }}>{copy.insightTitle}</strong> {copy.insightText}
      </div>
    </div>
  );
});
