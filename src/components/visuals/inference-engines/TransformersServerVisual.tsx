import React from 'react';
import type { TransformersServerCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface TransformersServerProps {
  copy: TransformersServerCopy;
}

export const TransformersServerVisual = React.memo(({ copy }: TransformersServerProps) => {
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

      {/* Client-Server diagram */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '24px', alignItems: 'center' }}>
        {/* Client */}
        <div style={{
          padding: '20px',
          background: 'rgba(0, 229, 255, 0.06)',
          borderRadius: '16px',
          border: `1px solid ${sw.cyan}22`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>💻</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: sw.cyan }}>{copy.clientLabel}</div>
          <div style={{ fontSize: '12px', color: sw.textDim, fontFamily: sw.fontMono, marginTop: '8px' }}>
            POST /v1/chat/completions
          </div>
        </div>

        {/* Arrow */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'center' }}>
          <div style={{ fontSize: '11px', fontWeight: '700', color: sw.purple, textTransform: 'uppercase' }}>
            {copy.endpointLabel}
          </div>
          <div style={{ fontSize: '24px', color: sw.purple }}>→</div>
        </div>

        {/* Server */}
        <div style={{
          padding: '20px',
          background: 'rgba(168, 85, 247, 0.06)',
          borderRadius: '16px',
          border: `1px solid ${sw.purple}22`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖥️</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: sw.purple }}>{copy.serverLabel}</div>
          <div style={{ fontSize: '12px', color: sw.textDim, fontFamily: sw.fontMono, marginTop: '8px' }}>
            transformers.server
          </div>
          <div style={{ fontSize: '12px', color: sw.textDim, marginTop: '4px' }}>
            {copy.modelLabel}
          </div>
        </div>
      </div>

      {/* Response */}
      <div style={{
        padding: '16px',
        background: 'rgba(16, 185, 129, 0.06)',
        borderRadius: '12px',
        border: `1px solid rgba(16, 185, 129, 0.2)`,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', textTransform: 'uppercase', marginBottom: '8px' }}>
          {copy.responseLabel}
        </div>
        <div style={{ fontSize: '13px', fontFamily: sw.fontMono, color: sw.text }}>
          {"{"} "content": "O futuro da IA é...", "finish_reason": "length" {"}"}
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
        OpenAI-compatible endpoint — mesma API que OpenAI, vLLM, sglang, Ollama
      </div>
    </div>
  );
});
