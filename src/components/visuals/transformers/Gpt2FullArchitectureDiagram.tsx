import React from 'react';
import { sw } from '../../../theme/tokens';
import type { Gpt2FullArchitectureDiagramCopy } from '../../../types/slide';

interface Gpt2FullArchitectureDiagramProps {
  copy: Gpt2FullArchitectureDiagramCopy;
}

export const Gpt2FullArchitectureDiagram = React.memo(({ copy }: Gpt2FullArchitectureDiagramProps) => {
  return (
    <div style={{
      width: '100%',
      padding: 28,
      borderRadius: 24,
      border: `1px solid ${sw.borderSubtle}`,
      background: sw.shellBackground,
      boxShadow: sw.shadowDeep,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
    }}>
      <div style={{ fontSize: 12, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color: sw.cyan }}>
        {copy.title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {copy.stages.map((stage, index) => (
          <React.Fragment key={stage.label}>
            <div style={{ padding: 12, borderRadius: 14, background: 'rgba(255,255,255,0.035)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 900, color: [sw.cyan, sw.purple, sw.pink][index % 3] }}>{stage.label}</span>
                <span style={{ fontSize: 12, fontWeight: 850, fontFamily: sw.fontMono, color: sw.text }}>{stage.shape}</span>
              </div>
              <div style={{ marginTop: 5, fontSize: 12, color: sw.textDim }}>{stage.detail}</div>
            </div>
            {index < copy.stages.length - 1 && <div style={{ textAlign: 'center', color: sw.textMuted }}>↓</div>}
          </React.Fragment>
        ))}
      </div>
      <div style={{ padding: '9px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.12)', color: sw.textDim, fontSize: 12 }}>
        <span style={{ color: sw.pink, fontWeight: 900 }}>{copy.loopLabel}</span> {copy.loopText}
      </div>
    </div>
  );
});
