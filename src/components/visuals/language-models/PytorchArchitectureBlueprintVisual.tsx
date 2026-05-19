import React from 'react';
import type { PytorchArchitectureBlueprintCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface PytorchArchitectureBlueprintVisualProps {
  copy: PytorchArchitectureBlueprintCopy;
}

const STAGE_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green];

export const PytorchArchitectureBlueprintVisual = React.memo(({ copy }: PytorchArchitectureBlueprintVisualProps) => (
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

        <div style={{ position: 'relative', padding: '8px 0' }}>
          <div
            style={{
              position: 'absolute',
              left: 30,
              right: 30,
              top: 58,
              height: 2,
              background: `linear-gradient(90deg, ${sw.cyan}, ${sw.purple}, ${sw.pink}, ${sw.green})`,
              opacity: 0.35,
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${copy.blueprintPanel.stages.length}, minmax(0, 1fr))`, gap: 12 }}>
            {copy.blueprintPanel.stages.map((stage, index) => {
              const accent = STAGE_COLORS[index % STAGE_COLORS.length];
              return (
                <div key={stage.label} style={{ position: 'relative', border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14, minHeight: 230 }}>
                  <div style={{ position: 'absolute', top: -10, left: 16, width: 22, height: 22, borderRadius: 999, background: accent, boxShadow: `0 0 0 4px ${sw.deep}` }} />
                  <div style={{ fontSize: 11, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{stage.label}</div>
                  <div style={{ marginTop: 8, fontSize: 15, fontWeight: 700, lineHeight: 1.35, color: sw.text }}>{stage.title}</div>
                  <div style={{ marginTop: 10, padding: '8px 10px', borderRadius: 10, fontFamily: sw.fontMono, fontSize: 12, fontWeight: 700, color: accent, background: `${accent}14`, border: `1px solid ${accent}33` }}>
                    {stage.shape}
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1.55, color: sw.text }}>{stage.body}</div>
                  <div style={{ marginTop: 10, fontSize: 11, lineHeight: 1.5, color: sw.textMuted }}>{stage.reading}</div>
                </div>
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
));
