import React, { useState } from 'react';
import type { PytorchArchitectureBlueprintCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface PytorchArchitectureBlueprintVisualProps {
  copy: PytorchArchitectureBlueprintCopy;
}

const STAGE_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green];

export const PytorchArchitectureBlueprintVisual = React.memo(({ copy }: PytorchArchitectureBlueprintVisualProps) => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = copy.blueprintPanel.stages;
  const stage = stages[activeStage] ?? stages[0];

  return (
    <PytorchTabbedCodeLayout
      tabs={copy.tabs}
      codePanel={copy.codePanel}
      altPanel={(
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.blueprintPanel.title}</div>
            {copy.blueprintPanel.subtitle && (
              <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.blueprintPanel.subtitle}</div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`, gap: 8 }}>
            {stages.map((item, index) => {
              const accent = STAGE_COLORS[index % STAGE_COLORS.length];
              const isActive = index === activeStage;
              return (
                <button
                  key={item.label}
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
                  <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                  <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, lineHeight: 1.35, color: isActive ? sw.text : sw.textDim }}>
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
                background: `linear-gradient(90deg, ${STAGE_COLORS[0]}, ${STAGE_COLORS[2]})`,
                transition: 'width 220ms ease',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 12 }}>
            <div
              style={{
                border: `1px solid ${STAGE_COLORS[activeStage % STAGE_COLORS.length]}33`,
                borderRadius: 18,
                background: `linear-gradient(180deg, ${STAGE_COLORS[activeStage % STAGE_COLORS.length]}10, rgba(255,255,255,0.01))`,
                padding: 16,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: STAGE_COLORS[activeStage % STAGE_COLORS.length], textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Etapa ativa
              </div>
              <div style={{ marginTop: 6, fontSize: 16, fontWeight: 700, lineHeight: 1.35, color: sw.text }}>{stage.title}</div>
              <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 10, fontFamily: sw.fontMono, fontSize: 12, fontWeight: 700, color: STAGE_COLORS[activeStage % STAGE_COLORS.length], background: `${STAGE_COLORS[activeStage % STAGE_COLORS.length]}14`, border: `1px solid ${STAGE_COLORS[activeStage % STAGE_COLORS.length]}33` }}>
                {stage.shape}
              </div>
              <div style={{ marginTop: 10, fontSize: 13, lineHeight: 1.65, color: sw.text }}>{stage.body}</div>
              <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{stage.reading}</div>
            </div>

            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 18, background: sw.surface, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.pink, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Ordem visível
              </div>
              {stages.map((item, index) => {
                const accent = STAGE_COLORS[index % STAGE_COLORS.length];
                const isActive = index === activeStage;
                return (
                  <button
                    key={`${item.label}-rail`}
                    type="button"
                    onClick={() => setActiveStage(index)}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      padding: 0,
                      textAlign: 'left',
                      cursor: 'pointer',
                    }}
                  >
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '24px 1fr',
                        gap: 10,
                        alignItems: 'start',
                        padding: '8px 0',
                        opacity: isActive ? 1 : 0.68,
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: 999,
                          marginTop: 2,
                          background: isActive ? accent : sw.surfaceLight,
                          border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                          boxShadow: isActive ? `0 0 0 4px ${accent}18` : 'none',
                        }}
                      />
                      <div>
                        <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: isActive ? accent : sw.textMuted }}>
                          {item.label}
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
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.pink, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{copy.blueprintPanel.invariantsTitle}</div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.blueprintPanel.invariants.map(item => (
                  <div key={item} style={{ fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.cyan, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{copy.blueprintPanel.diagnosticsTitle}</div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.blueprintPanel.diagnostics.map(item => (
                  <div key={item} style={{ fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {copy.blueprintPanel.footer && (
            <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.blueprintPanel.footer}</div>
          )}
        </div>
      )}
    />
  );
});
