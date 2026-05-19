import React from 'react';
import type { PytorchDecisionMatrixCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface PytorchDecisionMatrixVisualProps {
  copy: PytorchDecisionMatrixCopy;
}

const CALLOUT_COLORS = [sw.cyan, sw.purple, sw.pink];

export const PytorchDecisionMatrixVisual = React.memo(({ copy }: PytorchDecisionMatrixVisualProps) => (
  <PytorchTabbedCodeLayout
    tabs={copy.tabs}
    codePanel={copy.codePanel}
    altPanel={(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.matrixPanel.title}</div>
          {copy.matrixPanel.subtitle && (
            <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.matrixPanel.subtitle}</div>
          )}
        </div>

        {copy.matrixPanel.callouts && copy.matrixPanel.callouts.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${copy.matrixPanel.callouts.length}, minmax(0, 1fr))`, gap: 10 }}>
            {copy.matrixPanel.callouts.map((item, index) => {
              const accent = CALLOUT_COLORS[index % CALLOUT_COLORS.length];
              return (
                <div key={item.label} style={{ border: `1px solid ${accent}44`, borderRadius: 14, background: `${accent}14`, padding: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 800, color: accent, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                  <div style={{ marginTop: 6, fontSize: 12, lineHeight: 1.55, color: sw.text }}>{item.value}</div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, overflow: 'hidden', background: sw.surface }}>
          <div style={{ display: 'grid', gridTemplateColumns: `1.05fr repeat(${copy.matrixPanel.columns.length}, minmax(0, 1fr))`, background: sw.surfaceLight }}>
            <div style={{ padding: '12px 10px', borderRight: `1px solid ${sw.borderSubtle}` }} />
            {copy.matrixPanel.columns.map(column => (
              <div key={column} style={{ padding: '12px 10px', borderRight: `1px solid ${sw.borderSubtle}`, fontSize: 11, fontWeight: 800, color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {column}
              </div>
            ))}
          </div>

          {copy.matrixPanel.rows.map((row, rowIndex) => (
            <div key={row.label} style={{ display: 'grid', gridTemplateColumns: `1.05fr repeat(${copy.matrixPanel.columns.length}, minmax(0, 1fr))`, borderTop: rowIndex === 0 ? 'none' : `1px solid ${sw.borderSubtle}` }}>
              <div style={{ padding: '12px 10px', borderRight: `1px solid ${sw.borderSubtle}`, fontSize: 12, fontWeight: 700, color: sw.text }}>
                {row.label}
              </div>
              {row.cells.map((cell, cellIndex) => (
                <div key={`${row.label}-${cellIndex}`} style={{ padding: '12px 10px', borderRight: cellIndex < row.cells.length - 1 ? `1px solid ${sw.borderSubtle}` : 'none', fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>
                  {cell}
                </div>
              ))}
            </div>
          ))}
        </div>

        {copy.matrixPanel.footer && (
          <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.matrixPanel.footer}</div>
        )}
      </div>
    )}
  />
));
