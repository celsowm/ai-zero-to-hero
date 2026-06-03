import React, { useState } from 'react';
import type { LlmServeTransformersCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

interface LlmServeTransformersProps {
  copy: LlmServeTransformersCopy;
}

export const LlmServeTransformersVisual = React.memo(({ copy }: LlmServeTransformersProps) => {
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
        {copy.codePanels.map((panel, i) => (
          <div
            key={i}
            style={{ display: activeTab === i ? 'flex' : 'none', flexDirection: 'column', height: '100%', minHeight: 0, padding: 12, gap: 10 }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{panel.title}</div>
            {panel.description && (
              <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{panel.description}</div>
            )}
            <div style={{ flex: 1, minHeight: 0 }}>
              {panel.kind === 'html' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: sw.cyan, textAlign: 'center' }}>
                    {copy.title}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '20px', alignItems: 'center' }}>
                    <div style={{ padding: '18px', background: 'rgba(0,229,255,0.06)', borderRadius: '14px', border: `1px solid ${sw.cyan}22`, textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', marginBottom: '6px' }}>💻</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: sw.cyan }}>{copy.clientLabel}</div>
                      <div style={{ fontSize: '11px', color: sw.textDim, fontFamily: sw.fontMono, marginTop: '6px' }}>{copy.installLabel}</div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
                      <div style={{ fontSize: '22px', color: sw.purple }}>→</div>
                    </div>

                    <div style={{ padding: '18px', background: 'rgba(168,85,247,0.06)', borderRadius: '14px', border: `1px solid ${sw.purple}22`, textAlign: 'center' }}>
                      <div style={{ fontSize: '28px', marginBottom: '6px' }}>🖥️</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: sw.purple }}>{copy.serverLabel}</div>
                      <div style={{ fontSize: '11px', color: sw.textDim, fontFamily: sw.fontMono, marginTop: '6px' }}>{copy.startLabel}</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ padding: '14px', background: 'rgba(16,185,129,0.06)', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.2)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: '6px' }}>{copy.endpointChatLabel}</div>
                      <div style={{ fontSize: '12px', fontFamily: sw.fontMono, color: sw.text }}>POST /v1/chat/completions</div>
                    </div>
                    <div style={{ padding: '14px', background: 'rgba(16,185,129,0.06)', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.2)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', marginBottom: '6px' }}>{copy.endpointModelsLabel}</div>
                      <div style={{ fontSize: '12px', fontFamily: sw.fontMono, color: sw.text }}>GET /v1/models</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div style={{ padding: '12px', background: 'rgba(26,22,40,0.6)', borderRadius: '10px', border: `1px solid ${sw.borderSubtle}`, textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: sw.purple, textTransform: 'uppercase', marginBottom: '4px' }}>{copy.quantLabel}</div>
                      <div style={{ fontSize: '11px', color: sw.textDim, fontFamily: sw.fontMono, marginTop: '4px' }}>{copy.modelLabel}</div>
                    </div>
                    <div style={{ padding: '12px', background: 'rgba(245,158,11,0.06)', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.2)', textAlign: 'center' }}>
                      <div style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '4px' }}>{copy.endpointHealthLabel}</div>
                      <div style={{ fontSize: '12px', fontFamily: sw.fontMono, color: sw.text }}>GET /health</div>
                    </div>
                  </div>

                  <div style={{ padding: '12px', background: 'rgba(245,158,11,0.06)', borderRadius: '10px', border: '1px solid rgba(245,158,11,0.2)', textAlign: 'center' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', marginBottom: '4px' }}>⏱ {copy.timeoutLabel}</div>
                  </div>
                </div>
              ) : 'source' in panel && (
                <CodeBlock
                  language="python"
                  code=""
                  sourceRef={panel.source}
                  explanations={panel.codeExplanations}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
