import React from 'react';
import type { PytorchBridgeShiftCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface PytorchBridgeShiftVisualProps {
  copy: PytorchBridgeShiftCopy;
}

export const PytorchBridgeShiftVisual = React.memo(({ copy }: PytorchBridgeShiftVisualProps) => (
  <PytorchTabbedCodeLayout
    tabs={copy.tabs}
    codePanel={copy.codePanel}
    altPanel={(
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.mapPanel.title}</div>
          {copy.mapPanel.subtitle && (
            <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.mapPanel.subtitle}</div>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 44px 1fr', gap: 10, alignItems: 'stretch' }}>
          <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.textMuted }}>
              {copy.mapPanel.beforeLabel}
            </div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {copy.mapPanel.rows.map(row => (
                <div key={`before-${row.label}`} style={{ paddingBottom: 10, borderBottom: `1px solid ${sw.borderSubtle}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: sw.cyan }}>{row.label}</div>
                  <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.55, color: sw.text }}>{row.before}</div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: sw.pink, fontSize: 22, fontWeight: 900 }}>
            →
          </div>

          <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: 'linear-gradient(180deg, rgba(0,229,255,0.08), rgba(255,255,255,0.01))', padding: 14 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.textMuted }}>
              {copy.mapPanel.afterLabel}
            </div>
            <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {copy.mapPanel.rows.map(row => (
                <div key={`after-${row.label}`} style={{ paddingBottom: 10, borderBottom: `1px solid ${sw.borderSubtle}` }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: sw.pink }}>{row.label}</div>
                  <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.55, color: sw.text }}>{row.after}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 10 }}>
          {copy.mapPanel.rows.map(row => (
            <div key={row.label} style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 14, background: sw.surface, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.purple, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{row.label}</div>
              <div style={{ marginTop: 6, fontSize: 11, lineHeight: 1.5, color: sw.textDim }}>{row.why}</div>
            </div>
          ))}
        </div>

        {copy.mapPanel.footer && (
          <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.mapPanel.footer}</div>
        )}
      </div>
    )}
  />
));
