import React, { useState } from 'react';
import type { VllmIntroCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface VllmIntroProps {
  copy: VllmIntroCopy;
}

export const VllmIntroVisual = React.memo(({ copy }: VllmIntroProps) => {
  const [activeView, setActiveView] = useState<'contiguous' | 'paged'>('contiguous');

  // Simulate memory blocks
  const contiguousBlocks = [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]; // 6 used, 6 wasted
  const pagedBlocks = [1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]; // 6 used, scattered, 0 wasted

  const activeBlocks = activeView === 'contiguous' ? contiguousBlocks : pagedBlocks;
  const usedCount = activeBlocks.filter(b => b === 1).length;
  const wasteCount = activeBlocks.filter(b => b === 0).length;
  const wastePercent = activeView === 'contiguous' ? '60%' : '5%';

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeeper,
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.titleLabel}
      </div>

      {/* View toggle */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {[
          { key: 'contiguous' as const, label: copy.contiguousLabel, color: sw.pink },
          { key: 'paged' as const, label: copy.pagedLabel, color: '#10b981' },
        ].map(v => (
          <button
            key={v.key}
            onClick={() => setActiveView(v.key)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: `2px solid ${activeView === v.key ? v.color : sw.borderSubtle}`,
              background: activeView === v.key ? `${v.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '13px',
              fontWeight: '700',
              color: activeView === v.key ? v.color : sw.text,
            }}
          >
            {v.label}
          </button>
        ))}
      </div>

      {/* Memory blocks visualization */}
      <div style={{
        padding: '20px',
        background: `${activeView === 'contiguous' ? sw.pink : '#10b981'}08`,
        borderRadius: '12px',
        border: `1px solid ${activeView === 'contiguous' ? sw.pink : '#10b981'}22`,
      }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: activeView === 'contiguous' ? sw.pink : '#10b981', marginBottom: '16px' }}>
          KV Cache — {activeView === 'contiguous' ? copy.contiguousDesc : copy.pagedDesc}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: '6px' }}>
          {activeBlocks.map((block, i) => (
            <div
              key={i}
              style={{
                aspectRatio: '1',
                borderRadius: '6px',
                background: block === 1
                  ? `${activeView === 'contiguous' ? sw.pink : '#10b981'}66`
                  : 'rgba(26, 22, 40, 0.6)',
                border: `1px solid ${block === 1
                  ? activeView === 'contiguous' ? sw.pink : '#10b981'
                  : sw.borderSubtle}`,
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', marginTop: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: `${activeView === 'contiguous' ? sw.pink : '#10b981'}66`, border: `1px solid ${activeView === 'contiguous' ? sw.pink : '#10b981'}` }} />
            <span style={{ fontSize: '12px', color: sw.textDim }}>{copy.efficiencyLabel}: {usedCount}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: 'rgba(26, 22, 40, 0.6)', border: `1px solid ${sw.borderSubtle}` }} />
            <span style={{ fontSize: '12px', color: sw.textDim }}>{copy.wasteLabel}: {wasteCount}</span>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '14px', fontWeight: '700', color: activeView === 'contiguous' ? sw.pink : '#10b981' }}>
          {copy.wasteLabel}: {wastePercent} → {activeView === 'contiguous' ? copy.efficiencyLabel.toLowerCase() + ': 40%' : copy.efficiencyLabel.toLowerCase() + ': 95%'}
        </div>
      </div>

      <div style={{
        padding: '14px',
        background: 'rgba(26, 22, 40, 0.6)',
        borderRadius: '10px',
        border: `1px solid ${sw.borderSubtle}`,
        fontSize: '13px',
        color: sw.textDim,
        textAlign: 'center',
      }}>
        <span style={{ color: sw.cyan, fontWeight: '700' }}>24x throughput</span> vs HuggingFace Transformers
      </div>
    </div>
  );
});
