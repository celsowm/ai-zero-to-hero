import React, { useState } from 'react';
import type { AgentAnatomyCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props { copy: AgentAnatomyCopy }

const components = [
  { key: 'perception', icon: '👁️', color: sw.sky },
  { key: 'memory', icon: '🧠', color: sw.amber },
  { key: 'reasoning', icon: '⚙️', color: sw.purple },
  { key: 'tools', icon: '🔧', color: sw.emerald },
  { key: 'action', icon: '🚀', color: sw.pink },
] as const;

export const AgentAnatomy = React.memo(({ copy }: Props) => {
  const [active, setActive] = useState<string | null>(null);

  const getDesc = (key: string) => {
    switch (key) {
      case 'perception': return copy.perceptionDesc;
      case 'memory': return copy.memoryDesc;
      case 'reasoning': return copy.reasoningDesc;
      case 'tools': return copy.toolsDesc;
      case 'action': return copy.actionDesc;
      default: return '';
    }
  };
  const getLabel = (key: string) => {
    switch (key) {
      case 'perception': return copy.perceptionLabel;
      case 'memory': return copy.memoryLabel;
      case 'reasoning': return copy.reasoningLabel;
      case 'tools': return copy.toolsLabel;
      case 'action': return copy.actionLabel;
      default: return '';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', color: sw.text, textAlign: 'center' }}>{copy.title}</h4>
      <p style={{ margin: 0, fontSize: '11px', color: sw.textMuted, textAlign: 'center' }}>{copy.subtitle}</p>

      {/* Flow diagram */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', flexWrap: 'wrap' }}>
        {components.map((comp, i) => (
          <React.Fragment key={comp.key}>
            <button
              onClick={() => setActive(active === comp.key ? null : comp.key)}
              style={{
                padding: '6px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: '700',
                border: `1px solid ${active === comp.key ? comp.color : sw.borderSubtle}44`,
                background: active === comp.key ? `${comp.color}22` : sw.surface,
                color: active === comp.key ? comp.color : sw.textMuted,
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}
            >
              <span>{comp.icon}</span> {getLabel(comp.key)}
            </button>
            {i < components.length - 1 && <span style={{ color: sw.textMuted, fontSize: '14px' }}>→</span>}
          </React.Fragment>
        ))}
      </div>

      {/* Active component details */}
      {active && (
        <div style={{
          background: sw.void, borderRadius: '10px', padding: '10px',
          border: `1px solid ${components.find(c => c.key === active)?.color || sw.borderSubtle}33`,
          fontSize: '11px', color: sw.text, lineHeight: '1.5',
        }}>
          <strong>{getLabel(active)}</strong>: {getDesc(active)}
        </div>
      )}

      {/* Example flow */}
      <div style={{
        background: `${sw.purple}08`, border: `1px solid ${sw.purple}22`,
        borderRadius: '8px', padding: '10px', fontSize: '11px', color: sw.text, lineHeight: '1.5',
      }}>
        <strong style={{ color: sw.purple }}>{copy.flowTitle}</strong><br />
        <span style={{ fontFamily: 'monospace', fontSize: '10px' }}>
          Input: "{copy.inputExample}"<br />
          → Percepção → Memória → Raciocínio → Ferramentas → Ação<br />
          Output: "{copy.outputExample}"
        </span>
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
