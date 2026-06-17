import React from 'react';
import type { LoraDiagramCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface LoraDiagramProps {
  copy: LoraDiagramCopy;
}

export const LoraDiagram = React.memo(({ copy }: LoraDiagramProps) => {
  const d = 4096; // hidden dim
  const r = 8; // lora rank
  const fullParams = d * d;
  const loraParams = 2 * d * r;
  const savings = ((1 - loraParams / fullParams) * 100).toFixed(1);

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '8px',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeeper,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      {/* Title */}
      <div style={{ fontWeight: '800', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      <div style={{
        padding: '12px 16px',
        border: `1px solid ${sw.cyan}55`,
        borderRadius: '8px',
        background: 'rgba(0, 229, 255, 0.08)',
        textAlign: 'center',
        fontWeight: 800,
        color: sw.text,
      }}>
        W_eff = W0 + B x A
      </div>

      {/* Side by side comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        {/* Full-rank */}
        <div style={{
          padding: '20px',
          background: 'rgba(255, 46, 151, 0.06)',
          borderRadius: '8px',
          border: `1px solid ${sw.pink}33`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{ fontWeight: '700', fontSize: '14px', color: sw.pink }}>{copy.fullRankLabel}</div>
          <div style={{
            width: '120px',
            height: '120px',
            background: `linear-gradient(135deg, ${sw.pink}, ${sw.purple})`,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '800',
            fontSize: '16px',
            boxShadow: `0 0 20px ${sw.pink}33`,
          }}>
            {d}×{d}
          </div>
          <div style={{ fontSize: '12px', color: sw.textDim }}>
            {fullParams.toLocaleString()} params
          </div>
        </div>

        {/* Low-rank */}
        <div style={{
          padding: '20px',
          background: 'rgba(0, 229, 255, 0.06)',
          borderRadius: '8px',
          border: `1px solid ${sw.cyan}33`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}>
          <div style={{ fontWeight: '700', fontSize: '14px', color: sw.cyan }}>{copy.lowRankLabel}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '40px',
              height: '120px',
              background: `linear-gradient(180deg, ${sw.cyan}, ${sw.purple})`,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '13px',
              writingMode: 'vertical-lr',
            }}>
              {d}×{r}
            </div>
            <span style={{ fontSize: '20px', fontWeight: '800', color: sw.purple }}>×</span>
            <div style={{
              width: '120px',
              height: '40px',
              background: `linear-gradient(90deg, ${sw.purple}, ${sw.cyan})`,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '13px',
            }}>
              {r}×{d}
            </div>
          </div>
          <div style={{ fontSize: '12px', color: sw.textDim }}>
            {loraParams.toLocaleString()} params
          </div>
        </div>
      </div>

      {/* Matrix labels */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
        <div style={{
          padding: '8px 12px',
          background: 'rgba(0, 229, 255, 0.06)',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: '600',
          color: sw.cyan,
          textAlign: 'center',
        }}>
          {copy.matrixALabel} (down-projection)
        </div>
        <div style={{
          padding: '8px 12px',
          background: 'rgba(168, 85, 247, 0.06)',
          borderRadius: '8px',
          fontSize: '11px',
          fontWeight: '600',
          color: sw.purple,
          textAlign: 'center',
        }}>
          {copy.matrixBLabel} (up-projection)
        </div>
      </div>

      {/* Key insights */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        padding: '16px',
        background: 'rgba(26, 22, 40, 0.6)',
        borderRadius: '12px',
        border: `1px solid ${sw.borderSubtle}`,
      }}>
        {[
          { label: copy.originalFrozen, value: 'W0' },
          { label: copy.trainableParams, value: `A + B = ${(loraParams / 1e6).toFixed(1)}M` },
          { label: copy.savedMemory, value: `-${savings}% vs full fine-tuning` },
          { label: `${copy.rankLabel} (r)`, value: `${r} << ${d} (hidden dim)` },
          { label: 'W_eff', value: 'W0 + B x A' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ fontWeight: '600', color: sw.cyan }}>{item.label}:</span>
            <span style={{ color: sw.textDim }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
});
