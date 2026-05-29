import React, { useState } from 'react';
import type { PytorchDualCodeCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

interface PytorchDualCodeProps {
  copy: PytorchDualCodeCopy;
}

export const PytorchDualCode = React.memo(({ copy }: PytorchDualCodeProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col h-full min-h-0">
      <TabsBar
        ariaLabel={copy.tabs[0]?.label ?? 'Code tabs'}
        items={copy.tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <div className="flex-1 min-h-0 overflow-auto">
        {copy.codePanels.map((panel, i) => (
          <div
            key={i}
            style={{ display: activeTab === i ? 'flex' : 'none', flexDirection: 'column', height: '100%', minHeight: 0, padding: 12, gap: 10 }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{panel.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{panel.description}</div>
            <div style={{ flex: 1, minHeight: 0 }}>
              <CodeBlock
                language="python"
                code=""
                sourceRef={panel.source}
                explanations={panel.codeExplanations}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
