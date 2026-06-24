import React, { useState } from 'react';
import type { SftMetricsTabsCopy } from '../../types/slide/base';
import { sw } from '../../theme/tokens';
import { TabsBar } from './TabsBar';
import { CodeBlock } from '../CodeBlock';

interface SftMetricsTabsVisualProps {
  copy: SftMetricsTabsCopy;
}

export const SftMetricsTabsVisual = React.memo(({ copy }: SftMetricsTabsVisualProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col h-full min-h-0">
      <TabsBar
        ariaLabel={copy.tabs[0]?.label ?? 'Tabs'}
        items={copy.tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <div className="flex-1 min-h-0 overflow-auto">
        {copy.panels.map((panel, i) => (
          <div
            key={i}
            style={{ display: activeTab === i ? 'flex' : 'none', flexDirection: 'column', height: '100%', minHeight: 0, padding: 12, gap: 14 }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color: sw.text }}>{panel.title}</div>
            {panel.description && (
              <div style={{ fontSize: 12.5, lineHeight: 1.6, color: sw.textDim }}>{panel.description}</div>
            )}

            <div style={{ minHeight: 100, flexShrink: 0 }}>
              <CodeBlock
                language={panel.language}
                code={panel.code}
                compact
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {panel.fields.map((field, j) => (
                <div
                  key={j}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 8,
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <div style={{ display: 'flex', gap: 8, alignItems: 'baseline', flexWrap: 'wrap' }}>
                    <code style={{ fontSize: 13.5, fontWeight: 700, color: sw.cyan, whiteSpace: 'nowrap' }}>
                      {field.name}
                    </code>
                    <span style={{ fontSize: 13, fontWeight: 500, color: sw.text, lineHeight: 1.5 }}>
                      {field.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim, marginTop: 6 }}>
                    {field.explanation}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
