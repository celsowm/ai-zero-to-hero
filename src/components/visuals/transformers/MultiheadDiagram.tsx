import React from 'react';
import { sw } from '../../../theme/tokens';
import type { MultiheadDiagramCopy } from '../../../types/slide';

interface MultiheadDiagramProps {
  copy: MultiheadDiagramCopy;
}

const stepColors = ['var(--sw-cyan)', 'var(--sw-purple)', 'var(--sw-pink)', '#f59e0b', '#22c55e'];

export const MultiheadDiagram = React.memo(({ copy }: MultiheadDiagramProps) => {
  const steps = [
    { label: copy.inputLabel, shape: copy.inputShape },
    { label: copy.qkvLabel, shape: copy.qkvShape },
    { label: copy.splitLabel, shape: copy.headShape },
    { label: copy.attentionLabel, shape: copy.attentionShape },
    { label: copy.concatLabel, shape: copy.outputShape },
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      padding: 24,
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: 24,
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      display: 'grid',
      gridTemplateRows: 'auto auto 1fr auto',
      gap: 18,
      fontFamily: sw.fontSans,
    }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)' }}>
          {copy.title}
        </div>
        <div style={{ marginTop: 6, fontSize: 15, color: 'var(--sw-text-dim)', lineHeight: 1.35 }}>
          768 = 12 x 64
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
        gap: 10,
      }}>
        {steps.map((step, index) => {
          const color = stepColors[index];
          return (
            <div key={step.label} style={{
              position: 'relative',
              minHeight: 86,
              padding: '12px 10px',
              borderRadius: 16,
              background: `linear-gradient(135deg, color-mix(in srgb, ${color} 13%, transparent), rgba(255,255,255,0.03))`,
              border: `1px solid color-mix(in srgb, ${color} 42%, transparent)`,
            }}>
              {index < steps.length - 1 && (
                <div style={{
                  position: 'absolute',
                  right: -10,
                  top: '50%',
                  width: 10,
                  height: 2,
                  background: 'rgba(255,255,255,0.22)',
                }} />
              )}
              <div style={{ fontSize: 11, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {step.label}
              </div>
              <div style={{ marginTop: 10, fontSize: 13, fontWeight: 800, color: 'var(--sw-text)', fontFamily: sw.fontMono }}>
                {step.shape}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
        gap: 10,
        alignContent: 'center',
      }}>
        {copy.headLabels.map((label, index) => {
          const color = stepColors[index % stepColors.length];
          return (
            <div key={label} style={{
              minHeight: 92,
              padding: 12,
              borderRadius: 16,
              background: 'rgba(255,255,255,0.035)',
              border: `1px solid ${index === 3 ? 'rgba(255,255,255,0.1)' : `color-mix(in srgb, ${color} 32%, transparent)`}`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
              <div style={{
                width: 34,
                height: 34,
                borderRadius: 10,
                background: index === 3 ? 'rgba(255,255,255,0.08)' : color,
                boxShadow: index === 3 ? 'none' : `0 0 18px color-mix(in srgb, ${color} 30%, transparent)`,
              }} />
              <div style={{ fontSize: 12.5, fontWeight: 700, lineHeight: 1.25, color: index === 3 ? 'var(--sw-text-muted)' : 'var(--sw-text-dim)' }}>
                {label}
              </div>
            </div>
          );
        })}
      </div>

      <div style={{
        padding: '12px 16px',
        borderRadius: 16,
        background: 'linear-gradient(90deg, rgba(0,229,255,0.09), rgba(34,197,94,0.08))',
        border: '1px solid rgba(0,229,255,0.18)',
        color: 'var(--sw-text)',
        fontSize: 13,
        fontWeight: 700,
        lineHeight: 1.35,
      }}>
        {copy.takeaway}
      </div>
    </div>
  );
});
