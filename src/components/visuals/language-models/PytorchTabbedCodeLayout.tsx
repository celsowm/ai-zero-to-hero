import React, { useState } from 'react';
import type { CodeExplanation, CodeSourceRef } from '../../../types/slide/base';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

interface PytorchTabbedCodeLayoutProps {
  tabs: Array<{ label: string }>;
  codePanel: {
    title: string;
    description: string;
    source: CodeSourceRef;
    codeExplanations?: CodeExplanation[];
  };
  altPanel: React.ReactNode;
  /**
   * Optional content rendered at the bottom of the Code tab, below the code editor.
   * Used to add an iterative network diagram or auxiliary visualization underneath the code.
   */
  codeTabFooter?: React.ReactNode;
}

export const PytorchTabbedCodeLayout = React.memo(({ tabs, codePanel, altPanel, codeTabFooter }: PytorchTabbedCodeLayoutProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col h-full min-h-0">
      <TabsBar
        ariaLabel={tabs[0]?.label ?? 'Tabs'}
        items={tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <div className="flex-1 min-h-0 overflow-auto">
        {activeTab === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, padding: 12, gap: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{codePanel.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{codePanel.description}</div>
            <div style={{ flex: codeTabFooter ? '1 1 0' : 1, minHeight: 0 }}>
              <CodeBlock
                language="python"
                code=""
                sourceRef={codePanel.source}
                explanations={codePanel.codeExplanations}
              />
            </div>
            {codeTabFooter && (
              <div style={{ flex: '1 1 0', minHeight: 0, overflow: 'auto' }}>
                {codeTabFooter}
              </div>
            )}
          </div>
        ) : altPanel}
      </div>
    </div>
  );
});
