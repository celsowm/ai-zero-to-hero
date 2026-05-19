import React, { useState } from 'react';
import type { PytorchDualPanelCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

interface PytorchDualPanelProps {
  copy: PytorchDualPanelCopy;
}

export const PytorchDualPanel = React.memo(({ copy }: PytorchDualPanelProps) => {
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
        {activeTab === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, padding: 12, gap: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.codePanel.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.codePanel.description}</div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <CodeBlock
                language="python"
                code=""
                sourceRef={copy.codePanel.source}
                explanations={copy.codePanel.codeExplanations}
              />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 14 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.visualPanel.title}</div>
            {copy.visualPanel.subtitle && (
              <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.visualPanel.subtitle}</div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {copy.visualPanel.items.map(item => (
                <div
                  key={item.label}
                  style={{
                    border: `1px solid ${sw.borderSubtle}`,
                    borderRadius: 10,
                    background: sw.surface,
                    padding: '10px 12px',
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: sw.cyan, marginBottom: 2 }}>{item.label}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.5, color: sw.text }}>{item.value}</div>
                </div>
              ))}
            </div>
            {copy.visualPanel.footer && (
              <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.5, color: sw.textMuted }}>{copy.visualPanel.footer}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});

