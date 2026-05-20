import React, { useState } from 'react';
import type { PytorchExecutionPipelineCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface PytorchExecutionPipelineVisualProps {
  copy: PytorchExecutionPipelineCopy;
}

const STEP_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b'];

export const PytorchExecutionPipelineVisual = React.memo(({ copy }: PytorchExecutionPipelineVisualProps) => {
  const tabs = copy.tabs ?? [];
  const [activeStep, setActiveStep] = useState(0);
  const steps = copy.pipelinePanel?.steps ?? [];
  if (tabs.length === 0 || steps.length === 0) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 p-6 text-center">
        <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>Execution pipeline unavailable</div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>
          This visual is missing tab or step data for the current locale.
        </div>
      </div>
    );
  }
  const step = steps[activeStep] ?? steps[0];
  const progress = steps.length > 1 ? activeStep / (steps.length - 1) : 1;

  return (
    <PytorchTabbedCodeLayout
      tabs={tabs}
      codePanel={copy.codePanel}
      altPanel={(
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.pipelinePanel.title}</div>
            {copy.pipelinePanel.subtitle && (
              <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.pipelinePanel.subtitle}</div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`, gap: 8 }}>
            {steps.map((item, index) => {
              const accent = STEP_COLORS[index % STEP_COLORS.length];
              const isActive = index === activeStep;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveStep(index)}
                  style={{
                    border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                    borderRadius: 12,
                    background: isActive ? `${accent}18` : sw.surface,
                    padding: '10px 8px',
                    cursor: 'pointer',
                    color: isActive ? accent : sw.textDim,
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    lineHeight: 1.25,
                  }}
                >
                  {index + 1}. {item.label}
                </button>
              );
            })}
          </div>

          <div style={{ height: 8, borderRadius: 999, background: sw.surfaceLight, overflow: 'hidden' }}>
            <div style={{ width: `${Math.max(5, progress * 100)}%`, height: '100%', background: `linear-gradient(90deg, ${STEP_COLORS[0]}, ${STEP_COLORS[2]})`, transition: 'width 220ms ease' }} />
          </div>

          <div
            style={{
              border: `1px solid ${STEP_COLORS[activeStep % STEP_COLORS.length]}33`,
              borderRadius: 18,
              background: `linear-gradient(180deg, ${STEP_COLORS[activeStep % STEP_COLORS.length]}10, rgba(255,255,255,0.01))`,
              padding: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: STEP_COLORS[activeStep % STEP_COLORS.length], letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {copy.pipelinePanel.title}
                </div>
                <div style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: sw.text }}>{step.title ?? step.label}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, color: STEP_COLORS[activeStep % STEP_COLORS.length], fontFamily: sw.fontMono }}>
                {String(activeStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </div>
            </div>

            {step.shape && (
              <div style={{
                marginTop: 12,
                padding: '8px 10px',
                borderRadius: 10,
                border: `1px solid ${STEP_COLORS[activeStep % STEP_COLORS.length]}44`,
                background: `${STEP_COLORS[activeStep % STEP_COLORS.length]}14`,
                fontFamily: sw.fontMono,
                fontSize: 12,
                fontWeight: 700,
                color: STEP_COLORS[activeStep % STEP_COLORS.length],
                display: 'inline-flex',
              }}>
                {step.shape}
              </div>
            )}

            <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.65, color: sw.text }}>
              {step.body}
            </div>

            <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.6, color: sw.textMuted }}>
              <strong style={{ color: sw.pink }}>Risco:</strong> {step.risk}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.pink }}>
                {copy.pipelinePanel.failureTitle}
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.pipelinePanel.failureModes.map(item => (
                  <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 10, alignItems: 'start' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: sw.text }}>{item.label}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: 'linear-gradient(180deg, rgba(0,229,255,0.08), rgba(255,255,255,0.01))', padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.cyan, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {copy.pipelinePanel.mentalModelTitle}
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.pipelinePanel.mentalModel.map(item => (
                  <div key={item} style={{ fontSize: 12, lineHeight: 1.55, color: sw.text }}>{item}</div>
                ))}
              </div>
            </div>
          </div>

          {copy.pipelinePanel.footer && (
            <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.pipelinePanel.footer}</div>
          )}
        </div>
      )}
    />
  );
});
