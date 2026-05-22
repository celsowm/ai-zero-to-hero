import React from 'react';
import type { Gpt2BlockAnatomyCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Gpt2BlockAnatomyProps {
  copy: Gpt2BlockAnatomyCopy;
}

export const Gpt2BlockAnatomy = React.memo(({ copy }: Gpt2BlockAnatomyProps) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      padding: 22,
      borderRadius: 24,
      border: `1px solid ${sw.borderSubtle}`,
      background: 'linear-gradient(180deg, rgba(9,12,22,0.97), rgba(7,8,14,0.99))',
      boxShadow: sw.shadowDeep,
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gap: 16,
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

      <div style={{ display: 'grid', gridTemplateColumns: '0.55fr 1fr 0.55fr', gap: 14, alignItems: 'center', minHeight: 0 }}>
        <StatePill label={copy.inputLabel} shape={copy.shapeLabel} color={sw.cyan} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {copy.steps.map((step, index) => (
            <React.Fragment key={step.label}>
              <div style={{
                padding: '10px 12px',
                borderRadius: 15,
                background: `${step.color}12`,
                border: `1px solid ${step.color}44`,
                display: 'grid',
                gridTemplateColumns: '90px 1fr',
                gap: 10,
                alignItems: 'center',
              }}>
                <div style={{ fontSize: 13, fontWeight: 950, color: step.color, fontFamily: sw.fontMono }}>
                  {step.label}
                </div>
                <div style={{ fontSize: 12, fontWeight: 750, color: sw.textDim }}>
                  {step.detail}
                </div>
              </div>
              {(index === 1 || index === 4) && (
                <div style={{ alignSelf: 'center', padding: '5px 10px', borderRadius: 999, background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.25)', color: sw.purple, fontSize: 11, fontWeight: 900 }}>
                  {copy.addLabel}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        <StatePill label={copy.outputLabel} shape={copy.shapeLabel} color={sw.pink} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
        {copy.takeaways.map((takeaway, index) => (
          <div key={takeaway} style={{ padding: '8px 10px', borderRadius: 14, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', color: sw.textDim, fontSize: 11.5, fontWeight: 750 }}>
            <span style={{ color: [sw.cyan, sw.green, sw.pink][index] }}>●</span> {takeaway}
          </div>
        ))}
      </div>
    </div>
  );
});

function StatePill({ label, shape, color }: { label: string; shape: string; color: string }) {
  return (
    <div style={{ padding: 14, borderRadius: 18, background: `${color}12`, border: `1px solid ${color}44`, textAlign: 'center' }}>
      <div style={{ fontSize: 12, fontWeight: 950, color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      <div style={{ marginTop: 7, fontSize: 13, fontWeight: 900, fontFamily: sw.fontMono, color: sw.text }}>{shape}</div>
    </div>
  );
}
