import React, { useState } from 'react';
import type { PytorchShapeTraceFlowCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

interface PytorchShapeTraceFlowProps {
  copy: PytorchShapeTraceFlowCopy;
}

const STAGE_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b'];

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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 16 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.tracePanel.title}</div>
              {copy.tracePanel.subtitle && (
                <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.tracePanel.subtitle}</div>
              )}
            </div>

            <div style={{ position: 'relative', paddingTop: 10 }}>
              <div
                style={{
                  position: 'absolute',
                  top: 28,
                  left: 18,
                  right: 18,
                  height: 2,
                  background: `linear-gradient(90deg, ${sw.cyan}, ${sw.purple}, ${sw.pink}, ${sw.green}, #f59e0b)`,
                  opacity: 0.4,
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0, 1fr))', gap: 10 }}>
                {copy.tracePanel.stages.map((stage, index) => {
                  const accent = STAGE_COLORS[index] ?? sw.cyan;
                  return (
                    <div
                      key={stage.kicker}
                      style={{
                        position: 'relative',
                        border: `1px solid ${sw.borderSubtle}`,
                        borderRadius: 16,
                        background: sw.surface,
                        padding: '14px 12px 12px',
                        minHeight: 210,
                        boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03), 0 10px 30px ${accent}18`,
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          top: -8,
                          left: 12,
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          background: accent,
                          boxShadow: `0 0 0 4px ${sw.deep}`,
                        }}
                      />
                      <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: accent }}>
                        {stage.kicker}
                      </div>
                      <div style={{ marginTop: 6, fontSize: 15, fontWeight: 700, lineHeight: 1.3, color: sw.text }}>{stage.title}</div>
                      <div
                        style={{
                          marginTop: 10,
                          padding: '8px 10px',
                          borderRadius: 10,
                          background: `${accent}14`,
                          border: `1px solid ${accent}33`,
                          fontFamily: sw.fontMono,
                          fontSize: 12,
                          fontWeight: 700,
                          color: accent,
                        }}
                      >
                        {stage.shape}
                      </div>
                      <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1.55, color: sw.text }}>{stage.role}</div>
                      <div style={{ marginTop: 10, fontSize: 11, lineHeight: 1.5, color: sw.textMuted }}>{stage.debugHint}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 12 }}>
              <div
                style={{
                  border: `1px solid ${sw.borderSubtle}`,
                  borderRadius: 16,
                  background: sw.surface,
                  padding: 14,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.pink }}>
                  {copy.tracePanel.failureTitle}
                </div>
                <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {copy.tracePanel.failureModes.map(item => (
                    <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 10, alignItems: 'start' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: sw.text }}>{item.label}</div>
                      <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                style={{
                  border: `1px solid ${sw.borderSubtle}`,
                  borderRadius: 16,
                  background: 'linear-gradient(180deg, rgba(0,229,255,0.08), rgba(255,255,255,0.01))',
                  padding: 14,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.cyan }}>
                  {copy.tracePanel.inferenceTitle}
                </div>
                <div style={{ marginTop: 10, fontFamily: sw.fontMono, fontSize: 13, color: sw.text }}>
                  {copy.tracePanel.inferenceSnippet}
                </div>
                <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>
                  {copy.tracePanel.inferenceBody}
                </div>
                <div style={{ marginTop: 12, paddingTop: 10, borderTop: `1px solid ${sw.borderSubtle}`, fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>
                  {copy.tracePanel.footer}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
