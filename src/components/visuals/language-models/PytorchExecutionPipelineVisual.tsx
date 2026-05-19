import React from 'react';
import type { PytorchExecutionPipelineCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface PytorchExecutionPipelineVisualProps {
  copy: PytorchExecutionPipelineCopy;
}

const STEP_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b'];

export const PytorchExecutionPipelineVisual = React.memo(({ copy }: PytorchExecutionPipelineVisualProps) => (
  <PytorchTabbedCodeLayout
    tabs={copy.tabs}
    codePanel={copy.codePanel}
    altPanel={(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.pipelinePanel.title}</div>
          {copy.pipelinePanel.subtitle && (
            <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.pipelinePanel.subtitle}</div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${copy.pipelinePanel.steps.length}, minmax(0, 1fr))`, gap: 10 }}>
          {copy.pipelinePanel.steps.map((step, index) => {
            const accent = STEP_COLORS[index % STEP_COLORS.length];
            return (
              <div key={step.label} style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 12, minHeight: 210 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 999, background: `${accent}20`, color: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800 }}>
                    {index + 1}
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{step.label}</div>
                </div>
                {step.shape && (
                  <div style={{ marginTop: 10, padding: '7px 9px', borderRadius: 10, border: `1px solid ${accent}33`, background: `${accent}14`, fontFamily: sw.fontMono, fontSize: 12, fontWeight: 700, color: accent }}>
                    {step.shape}
                  </div>
                )}
                <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1.55, color: sw.text }}>{step.body}</div>
                <div style={{ marginTop: 10, fontSize: 11, lineHeight: 1.5, color: sw.textMuted }}>{step.risk}</div>
              </div>
            );
          })}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: sw.pink, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{copy.pipelinePanel.failureTitle}</div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {copy.pipelinePanel.failureModes.map(item => (
                <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 10 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: sw.text }}>{item.label}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: 'linear-gradient(180deg, rgba(0,229,255,0.08), rgba(255,255,255,0.01))', padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, color: sw.cyan, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{copy.pipelinePanel.mentalModelTitle}</div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {copy.pipelinePanel.mentalModel.map(item => (
                <div key={item} style={{ fontSize: 12, lineHeight: 1.55, color: sw.text }}>
                  {item}
                </div>
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
));
