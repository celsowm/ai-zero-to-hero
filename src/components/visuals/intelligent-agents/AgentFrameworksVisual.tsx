import React, { useState } from 'react';
import type { AgentFrameworksVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props { copy: AgentFrameworksVisualCopy }

const frameworks = [
  { key: 'from-scratch', labelKey: 'fromScratchLabel', descKey: 'fromScratchDesc', color: sw.pink, complexity: '▁', flexibility: '█████' },
  { key: 'langgraph', labelKey: 'langgraphLabel', descKey: 'langgraphDesc', color: sw.sky, complexity: '▂▂', flexibility: '████' },
  { key: 'openai-agents', labelKey: 'openaiAgentsLabel', descKey: 'openaiAgentsDesc', color: sw.emerald, complexity: '▂▂▂', flexibility: '███' },
  { key: 'pydanticai', labelKey: 'pydanticaiLabel', descKey: 'pydanticaiDesc', color: sw.purple, complexity: '▂▂▂', flexibility: '████' },
];

function getLabel(fw: typeof frameworks[0], copy: AgentFrameworksVisualCopy) {
  switch (fw.key) {
    case 'from-scratch': return copy.fromScratchLabel;
    case 'langgraph': return copy.langgraphLabel;
    case 'openai-agents': return copy.openaiAgentsLabel;
    case 'pydanticai': return copy.pydanticaiLabel;
    default: return '';
  }
}
function getDesc(fw: typeof frameworks[0], copy: AgentFrameworksVisualCopy) {
  switch (fw.key) {
    case 'from-scratch': return copy.fromScratchDesc;
    case 'langgraph': return copy.langgraphDesc;
    case 'openai-agents': return copy.openaiAgentsDesc;
    case 'pydanticai': return copy.pydanticaiDesc;
    default: return '';
  }
}

export const AgentFrameworksVisual = React.memo(({ copy }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', color: sw.text, textAlign: 'center' }}>{copy.title}</h4>
      <p style={{ margin: 0, fontSize: '11px', color: sw.textMuted, textAlign: 'center' }}>{copy.subtitle}</p>

      {frameworks.map(fw => {
        const isSelected = selected === fw.key;
        return (
          <button
            key={fw.key}
            onClick={() => setSelected(isSelected ? null : fw.key)}
            style={{
              padding: '8px 10px', borderRadius: '8px', textAlign: 'left',
              border: `1px solid ${isSelected ? fw.color : sw.borderSubtle}44`,
              background: isSelected ? `${fw.color}11` : sw.surface,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: isSelected ? fw.color : sw.text }}>
                {getLabel(fw, copy)}
              </span>
              <span style={{ fontSize: '9px', color: sw.textMuted }}>{fw.complexity} {copy.complexityLabel}</span>
            </div>
            {isSelected && (
              <div style={{ fontSize: '11px', color: sw.textMuted, marginTop: '4px', lineHeight: '1.4' }}>
                {getDesc(fw, copy)}<br />
                <span style={{ fontFamily: 'monospace', fontSize: '9px' }}>
                  {copy.flexibilityLabel}: {fw.flexibility}
                </span>
              </div>
            )}
          </button>
        );
      })}

      <div style={{
        background: `${sw.sky}08`, border: `1px solid ${sw.sky}22`,
        borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: sw.text, lineHeight: '1.4',
      }}>
        <strong style={{ color: sw.sky }}>{copy.insightTitle}</strong> {copy.insightText}
      </div>
    </div>
  );
});
