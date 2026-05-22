import React from 'react';
import type { Gpt2LayerXrayCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Gpt2LayerXrayProps {
  copy: Gpt2LayerXrayCopy;
}

export const Gpt2LayerXray = React.memo(({ copy }: Gpt2LayerXrayProps) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      padding: 22,
      borderRadius: 24,
      border: `1px solid ${sw.borderSubtle}`,
      background: sw.shellBackground,
      boxShadow: sw.shadowDeep,
      display: 'grid',
      gridTemplateRows: 'auto auto 1fr auto',
      gap: 14,
      fontFamily: sw.fontSans,
    }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: sw.cyan }}>
          {copy.title}
        </div>
        <div style={{ marginTop: 5, fontSize: 15, fontWeight: 750, color: sw.text, lineHeight: 1.3 }}>
          {copy.subtitle}
        </div>
      </div>

      <div style={{ padding: '9px 12px', borderRadius: 14, background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.2)', display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <span style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: sw.cyan }}>{copy.shapeInvariantLabel}</span>
        <span style={{ fontSize: 13, fontWeight: 900, fontFamily: sw.fontMono, color: sw.text }}>{copy.shapeInvariant}</span>
      </div>

      <div style={{ minHeight: 0, display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, justifyContent: 'center' }}>
          {copy.stages.map((stage, index) => (
            <React.Fragment key={stage.label}>
              <div style={{
                padding: '10px 12px',
                borderRadius: 15,
                background: index === copy.stages.length - 1 ? 'rgba(255,46,151,0.1)' : 'rgba(255,255,255,0.035)',
                border: index === copy.stages.length - 1 ? '1px solid rgba(255,46,151,0.28)' : '1px solid rgba(255,255,255,0.08)',
                display: 'grid',
                gridTemplateColumns: '92px 1fr',
                gap: 10,
                alignItems: 'center',
              }}>
                <div style={{ fontSize: 13, fontWeight: 900, color: index === copy.stages.length - 1 ? sw.pink : sw.cyan }}>
                  {stage.label}
                </div>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 900, fontFamily: sw.fontMono, color: sw.text }}>{stage.shape}</div>
                  <div style={{ marginTop: 2, fontSize: 11.5, color: sw.textMuted }}>{stage.detail}</div>
                </div>
              </div>
              {index < copy.stages.length - 1 && <div style={{ height: 10, width: 2, margin: '-3px auto', background: 'rgba(255,255,255,0.12)' }} />}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, justifyContent: 'center' }}>
          {copy.checkpoints.map((checkpoint, index) => (
            <div key={checkpoint.layer} style={{ padding: 12, borderRadius: 16, background: 'rgba(255,255,255,0.035)', border: `1px solid ${[sw.cyan, sw.purple, sw.pink][index]}44` }}>
              <div style={{ fontSize: 10, fontWeight: 900, color: [sw.cyan, sw.purple, sw.pink][index], textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {checkpoint.layer}
              </div>
              <div style={{ marginTop: 6, fontSize: 12.5, color: sw.text, fontWeight: 800 }}>{checkpoint.representation}</div>
              <div style={{ marginTop: 4, fontSize: 11.5, color: sw.textDim }}>{checkpoint.prediction}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '9px 12px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: sw.textDim, fontSize: 12.5, fontWeight: 750 }}>
        {copy.footer}
      </div>
    </div>
  );
});
