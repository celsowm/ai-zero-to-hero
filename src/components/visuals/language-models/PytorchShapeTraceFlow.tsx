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
  const tabs = copy.tabs ?? [];
  const stages = copy.tracePanel?.stages ?? [];
  const [activeTab, setActiveTab] = useState(0);
  const [activeStage, setActiveStage] = useState(0);

  if (tabs.length === 0 || stages.length === 0) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 p-6 text-center">
        <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>Shape trace data unavailable</div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>
          The current slide copy is missing the tab or stage data required to render this visual.
        </div>
      </div>
    );
  }

  const stage = stages[activeStage] ?? stages[0];

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

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`, gap: 8 }}>
              {stages.map((item, index) => {
                const accent = STAGE_COLORS[index] ?? sw.cyan;
                const isActive = index === activeStage;
                return (
                  <button
                    key={item.kicker}
                    type="button"
                    onClick={() => setActiveStage(index)}
                    style={{
                      border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                      borderRadius: 14,
                      background: isActive ? `${accent}18` : sw.surface,
                      padding: '10px 12px',
                      textAlign: 'left',
                      cursor: 'pointer',
                      color: isActive ? accent : sw.textDim,
                      boxShadow: isActive ? `0 10px 24px ${accent}12` : 'none',
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{item.kicker}</div>
                    <div style={{ marginTop: 5, fontSize: 11, fontWeight: 700, lineHeight: 1.35, color: isActive ? sw.text : sw.textDim }}>
                      {item.title}
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{ height: 8, borderRadius: 999, background: sw.surfaceLight, overflow: 'hidden' }}>
              <div
                style={{
                  width: `${stages.length > 1 ? (activeStage / (stages.length - 1)) * 100 : 100}%`,
                  height: '100%',
                  background: `linear-gradient(90deg, ${STAGE_COLORS[0]}, ${STAGE_COLORS[4]})`,
                  transition: 'width 220ms ease',
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 12, alignItems: 'stretch' }}>
              <div
                style={{
                  border: `1px solid ${STAGE_COLORS[activeStage] ? `${STAGE_COLORS[activeStage]}33` : sw.borderSubtle}`,
                  borderRadius: 18,
                  background: `linear-gradient(180deg, ${(STAGE_COLORS[activeStage] ?? sw.cyan)}10, rgba(255,255,255,0.01))`,
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: STAGE_COLORS[activeStage] ?? sw.cyan }}>
                  Etapa ativa
                </div>
                <div style={{ marginTop: 6, fontSize: 16, fontWeight: 700, lineHeight: 1.35, color: sw.text }}>{stage.title}</div>
                <div
                  style={{
                    marginTop: 10,
                    padding: '8px 10px',
                    borderRadius: 10,
                    background: `${(STAGE_COLORS[activeStage] ?? sw.cyan)}14`,
                    border: `1px solid ${(STAGE_COLORS[activeStage] ?? sw.cyan)}33`,
                    fontFamily: sw.fontMono,
                    fontSize: 12,
                    fontWeight: 700,
                    color: STAGE_COLORS[activeStage] ?? sw.cyan,
                    display: 'inline-flex',
                  }}
                >
                  {stage.shape}
                </div>
                <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.65, color: sw.text }}>{stage.role}</div>
                <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{stage.debugHint}</div>
              </div>

              <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 18, background: sw.surface, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontSize: 11, fontWeight: 800, color: sw.pink, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  Linha do forward
                </div>
                {stages.map((item, index) => {
                  const accent = STAGE_COLORS[index] ?? sw.cyan;
                  const isActive = index === activeStage;
                  return (
                    <button
                      key={`${item.kicker}-rail`}
                      type="button"
                      onClick={() => setActiveStage(index)}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        padding: 0,
                        cursor: 'pointer',
                        textAlign: 'left',
                        opacity: isActive ? 1 : 0.72,
                      }}
                    >
                      <div style={{ display: 'grid', gridTemplateColumns: '18px 1fr', gap: 10, alignItems: 'start', padding: '7px 0' }}>
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            marginTop: 3,
                            borderRadius: 999,
                            background: isActive ? accent : sw.surfaceLight,
                            border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                            boxShadow: isActive ? `0 0 0 4px ${accent}18` : 'none',
                          }}
                        />
                        <div>
                          <div style={{ fontSize: 10, fontWeight: 800, color: isActive ? accent : sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                            {item.kicker}
                          </div>
                          <div style={{ marginTop: 3, fontSize: 12, lineHeight: 1.45, color: isActive ? sw.text : sw.textDim }}>
                            {item.title}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.pink }}>
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
