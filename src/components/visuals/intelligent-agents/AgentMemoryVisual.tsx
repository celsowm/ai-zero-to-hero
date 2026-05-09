import React, { useState } from 'react';
import type { AgentMemoryVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props { copy: AgentMemoryVisualCopy }

const memoryTypes = ['conversational', 'semantic', 'procedural'] as const;

export const AgentMemoryVisual = React.memo(({ copy }: Props) => {
  const [active, setActive] = useState<string>('conversational');

  const getDesc = (type: string) => {
    switch (type) {
      case 'conversational': return copy.conversationalDesc;
      case 'semantic': return copy.semanticDesc;
      case 'procedural': return copy.proceduralDesc;
      default: return '';
    }
  };
  const getLabel = (type: string) => {
    switch (type) {
      case 'conversational': return copy.conversationalLabel;
      case 'semantic': return copy.semanticLabel;
      case 'procedural': return copy.proceduralLabel;
      default: return '';
    }
  };
  const colors = [sw.sky, sw.amber, sw.purple];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', color: sw.text, textAlign: 'center' }}>{copy.title}</h4>
      <p style={{ margin: 0, fontSize: '11px', color: sw.textMuted, textAlign: 'center' }}>{copy.subtitle}</p>

      {/* 3 memory types */}
      {memoryTypes.map((type, i) => (
        <button
          key={type}
          onClick={() => setActive(type)}
          style={{
            padding: '8px 10px', borderRadius: '8px', textAlign: 'left',
            border: `1px solid ${active === type ? colors[i] : sw.borderSubtle}44`,
            background: active === type ? `${colors[i]}11` : sw.surface,
            cursor: 'pointer',
          }}
        >
          <div style={{ fontSize: '12px', fontWeight: '700', color: active === type ? colors[i] : sw.text }}>
            {getLabel(type)}
          </div>
          {active === type && (
            <div style={{ fontSize: '11px', color: sw.textMuted, marginTop: '4px', lineHeight: '1.4' }}>
              {getDesc(type)}
            </div>
          )}
        </button>
      ))}

      {/* Example */}
      <div style={{
        background: sw.void, borderRadius: '10px', padding: '10px',
        border: `1px solid ${sw.borderSubtle}33`, fontSize: '10px', color: sw.text, lineHeight: '1.5',
      }}>
        <div style={{ marginBottom: '4px', color: sw.sky }}>{copy.convoExample1}</div>
        <div style={{ marginBottom: '4px', color: sw.amber }}>{copy.semanticExample}</div>
        <div style={{ color: sw.purple }}>{copy.proceduralExample}</div>
      </div>

      <div style={{
        background: `${sw.sky}08`, border: `1px solid ${sw.sky}22`,
        borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: sw.text, lineHeight: '1.4',
      }}>
        <strong style={{ color: sw.sky }}>{copy.insightTitle}</strong> {copy.insightText}
      </div>
    </div>
  );
});
