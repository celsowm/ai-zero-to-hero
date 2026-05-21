import React, { useState } from 'react';
import type { PytorchShapeTraceFlowCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';
import VocabExplorer from './VocabExplorer';

interface PytorchShapeTraceFlowProps {
  copy: PytorchShapeTraceFlowCopy;
}

export const PytorchShapeTraceFlow = React.memo(({ copy }: PytorchShapeTraceFlowProps) => {
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
          <VocabExplorer copy={copy.vocabPanel} />
        )}
      </div>
    </div>
  );
});
