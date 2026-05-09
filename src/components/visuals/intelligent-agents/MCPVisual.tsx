import React, { useState } from 'react';
import type { MCPVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props { copy: MCPVisualCopy }

export const MCPVisual = React.memo(({ copy }: Props) => {
  const [showPayload, setShowPayload] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', color: sw.text, textAlign: 'center' }}>{copy.title}</h4>
      <p style={{ margin: 0, fontSize: '11px', color: sw.textMuted, textAlign: 'center' }}>{copy.subtitle}</p>

      {/* Client ↔ Server diagram */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        <div style={{
          padding: '8px 12px', borderRadius: '10px', textAlign: 'center',
          border: `1px solid ${sw.purple}44`, background: `${sw.purple}11`,
          fontSize: '11px', fontWeight: '700', color: sw.purple,
        }}>
          🤖 {copy.clientLabel}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: '16px', color: sw.textMuted }}>⟷</span>
          <span style={{ fontSize: '8px', color: sw.amber, fontWeight: '700' }}>MCP</span>
        </div>
        <div style={{
          padding: '8px 12px', borderRadius: '10px', textAlign: 'center',
          border: `1px solid ${sw.emerald}44`, background: `${sw.emerald}11`,
          fontSize: '11px', fontWeight: '700', color: sw.emerald,
        }}>
          🔌 {copy.serverLabel}
        </div>
      </div>

      {/* Tools/Resources/Prompts */}
      <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
        {[
          { label: copy.toolsLabel, icon: '🔧', color: sw.sky },
          { label: copy.resourcesLabel, icon: '📁', color: sw.amber },
          { label: copy.promptsLabel, icon: '💬', color: sw.purple },
        ].map(item => (
          <div key={item.label} style={{
            padding: '4px 8px', borderRadius: '6px', fontSize: '10px', fontWeight: '700',
            border: `1px solid ${item.color}33`, background: `${item.color}08`,
            color: item.color,
          }}>
            {item.icon} {item.label}
          </div>
        ))}
      </div>

      {/* Example tool */}
      <div style={{
        background: sw.void, borderRadius: '10px', padding: '10px',
        border: `1px solid ${sw.borderSubtle}33`, fontSize: '10px', color: sw.text, lineHeight: '1.5',
      }}>
        <strong style={{ color: sw.emerald }}>{copy.exampleTool}</strong>
        <br />
        {copy.exampleToolDesc}
        <br /><br />
        <span style={{ fontFamily: 'monospace', fontSize: '9px' }}>
          {`{
  "name": "${copy.exampleTool}",
  "parameters": {"cidade": "str"},
  "description": "${copy.exampleToolDesc}"
}`}
        </span>
      </div>

      <button
        onClick={() => setShowPayload(!showPayload)}
        style={{
          padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700',
          border: `1px solid ${sw.purple}44`, background: `${sw.purple}22`, color: sw.purple,
          cursor: 'pointer',
        }}
      >
        {copy.buildPayload}
      </button>

      {showPayload && (
        <div style={{
          background: `${sw.sky}08`, border: `1px solid ${sw.sky}22`,
          borderRadius: '8px', padding: '10px', fontSize: '10px', color: sw.text, lineHeight: '1.4',
          fontFamily: 'monospace',
        }}>
          <strong>{copy.responseLabel}</strong><br />
          {`{
  "content": [
    {"cidade": "São Paulo", "temperatura": "23.4°C", "fonte": "clima.com.br"}
  ]
}`}
        </div>
      )}

      <div style={{
        background: `${sw.sky}08`, border: `1px solid ${sw.sky}22`,
        borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: sw.text, lineHeight: '1.4',
      }}>
        <strong style={{ color: sw.sky }}>{copy.insightTitle}</strong> {copy.insightText}
      </div>
    </div>
  );
});
