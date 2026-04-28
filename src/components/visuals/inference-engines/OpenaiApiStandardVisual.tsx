import React, { useState } from 'react';
import type { OpenaiApiStandardCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface OpenaiApiStandardProps {
  copy: OpenaiApiStandardCopy;
}

export const OpenaiApiStandardVisual = React.memo(({ copy }: OpenaiApiStandardProps) => {
  const [activeField, setActiveField] = useState<string | null>(null);

  const requestFields = [
    { key: 'model', label: copy.modelField, value: '"gpt-4o-mini"', color: sw.cyan },
    { key: 'messages', label: copy.messagesField, value: '[{"role": "user", "content": "Explique RAG"}]', color: sw.purple },
    { key: 'temperature', label: copy.temperatureField, value: '0.7', color: sw.pink },
    { key: 'max_tokens', label: copy.maxTokensField, value: '512', color: '#f59e0b' },
    { key: 'stream', label: copy.streamField, value: 'true', color: '#10b981' },
    { key: 'tools', label: copy.toolsField, value: '[{type: "function", function: {...}}]', color: sw.cyan },
    { key: 'response_format', label: copy.responseFormatField, value: '{type: "json_schema"}', color: sw.purple },
  ];

  const responseFields = [
    { key: 'choices', label: copy.choicesField, value: '[{message: {content: "RAG é..."}}]', color: '#10b981' },
    { key: 'content', label: copy.contentField, value: '"RAG (Retrieval-Augmented Generation)..."', color: sw.cyan },
    { key: 'usage', label: copy.usageField, value: `{${copy.promptTokensLabel}: 45, ${copy.completionTokensLabel}: 128, ${copy.totalTokensLabel}: 173}`, color: sw.purple },
  ];

  const allFields = [...requestFields, ...responseFields];
  const active = allFields.find(f => f.key === activeField);

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Request */}
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: sw.cyan, marginBottom: '12px', textTransform: 'uppercase' }}>
            {copy.requestLabel}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {requestFields.map(field => (
              <button
                key={field.key}
                onClick={() => setActiveField(activeField === field.key ? null : field.key)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: `2px solid ${activeField === field.key ? field.color : sw.borderSubtle}`,
                  background: activeField === field.key ? `${field.color}12` : 'rgba(26, 22, 40, 0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: '600', color: activeField === field.key ? field.color : sw.text }}>
                  {field.label}
                </span>
                <span style={{ fontSize: '11px', fontFamily: sw.fontMono, color: sw.textDim }}>
                  {field.value.slice(0, 30)}...
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Response */}
        <div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#10b981', marginBottom: '12px', textTransform: 'uppercase' }}>
            {copy.responseLabel}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {responseFields.map(field => (
              <button
                key={field.key}
                onClick={() => setActiveField(activeField === field.key ? null : field.key)}
                style={{
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: `2px solid ${activeField === field.key ? field.color : sw.borderSubtle}`,
                  background: activeField === field.key ? `${field.color}12` : 'rgba(26, 22, 40, 0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  textAlign: 'left',
                }}
              >
                <span style={{ fontSize: '12px', fontWeight: '600', color: activeField === field.key ? field.color : sw.text }}>
                  {field.label}
                </span>
                <span style={{ fontSize: '11px', fontFamily: sw.fontMono, color: sw.textDim }}>
                  {field.value.slice(0, 30)}...
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Active field detail */}
      {active && (
        <div style={{
          padding: '16px',
          background: `${active.color}08`,
          borderRadius: '12px',
          border: `1px solid ${active.color}22`,
        }}>
          <div style={{ fontSize: '12px', fontWeight: '700', color: active.color, marginBottom: '8px' }}>
            {active.label}
          </div>
          <div style={{ fontSize: '13px', fontFamily: sw.fontMono, color: sw.text }}>
            {active.value}
          </div>
        </div>
      )}
    </div>
  );
});
