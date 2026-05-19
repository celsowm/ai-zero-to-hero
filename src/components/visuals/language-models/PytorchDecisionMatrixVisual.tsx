import React, { useState } from 'react';
import type { PytorchDecisionMatrixCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface PytorchDecisionMatrixVisualProps {
  copy: PytorchDecisionMatrixCopy;
}

const CALLOUT_COLORS = [sw.cyan, sw.purple, sw.pink];

export const PytorchDecisionMatrixVisual = React.memo(({ copy }: PytorchDecisionMatrixVisualProps) => {
  const [activeRow, setActiveRow] = useState(0);
  const rows = copy.matrixPanel.rows;
  const row = rows[activeRow] ?? rows[0];

  return (
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

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${rows.length}, minmax(0, 1fr))`, gap: 8 }}>
            {rows.map((item, index) => {
              const accent = CALLOUT_COLORS[index % CALLOUT_COLORS.length];
              const isActive = index === activeRow;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveRow(index)}
                  style={{
                    border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                    borderRadius: 14,
                    background: isActive ? `${accent}18` : sw.surface,
                    padding: '10px 12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: isActive ? accent : sw.textDim,
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    lineHeight: 1.25,
                    boxShadow: isActive ? `0 10px 24px ${accent}12` : 'none',
                  }}
                >
                  {index + 1}. {item.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 12, alignItems: 'stretch' }}>
            <div
              style={{
                border: `1px solid ${CALLOUT_COLORS[activeRow % CALLOUT_COLORS.length]}33`,
                borderRadius: 18,
                background: `linear-gradient(180deg, ${CALLOUT_COLORS[activeRow % CALLOUT_COLORS.length]}10, rgba(255,255,255,0.01))`,
                padding: 16,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: CALLOUT_COLORS[activeRow % CALLOUT_COLORS.length], letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Linha ativa
              </div>
              <div style={{ marginTop: 6, fontSize: 16, fontWeight: 700, color: sw.text }}>{row.label}</div>
              <div style={{ marginTop: 10, display: 'grid', gap: 8 }}>
                {copy.matrixPanel.columns.map((column, index) => (
                  <div key={column} style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: 10, alignItems: 'start' }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {column}
                    </div>
                    <div style={{ fontSize: 13, lineHeight: 1.6, color: index === 0 ? sw.text : sw.textDim }}>
                      {row.cells[index]}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 18, background: sw.surface, padding: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.cyan, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                Leitura rápida
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.65, color: sw.text }}>
                {row.cells[1]}
              </div>
              <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>
                {row.cells[2]}
              </div>
            </div>
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

            {copy.matrixPanel.rows.map((item, rowIndex) => {
              const isActive = rowIndex === activeRow;
              const accent = CALLOUT_COLORS[rowIndex % CALLOUT_COLORS.length];
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveRow(rowIndex)}
                  style={{
                    display: 'grid',
                    width: '100%',
                    gridTemplateColumns: `1.05fr repeat(${copy.matrixPanel.columns.length}, minmax(0, 1fr))`,
                    borderTop: rowIndex === 0 ? 'none' : `1px solid ${sw.borderSubtle}`,
                    background: isActive ? `${accent}10` : 'transparent',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderBottom: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{ padding: '12px 10px', borderRight: `1px solid ${sw.borderSubtle}`, fontSize: 12, fontWeight: 700, color: isActive ? accent : sw.text }}>
                    {item.label}
                  </div>
                  {item.cells.map((cell, cellIndex) => (
                    <div
                      key={`${item.label}-${cellIndex}`}
                      style={{
                        padding: '12px 10px',
                        borderRight: cellIndex < item.cells.length - 1 ? `1px solid ${sw.borderSubtle}` : 'none',
                        fontSize: 12,
                        lineHeight: 1.55,
                        color: isActive && cellIndex === 0 ? sw.text : sw.textDim,
                      }}
                    >
                      {cell}
                    </div>
                  ))}
                </button>
              );
            })}
          </div>

          {copy.matrixPanel.footer && (
            <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.matrixPanel.footer}</div>
          )}
        </div>
      )}
    />
  );
});
