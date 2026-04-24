import React from 'react';
import type { NeuralNetworkToLanguageModelingComparatorCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';

interface Props {
  copy: NeuralNetworkToLanguageModelingComparatorCopy;
}

const LEFT_ACCENT = '#00e5ff';
const RIGHT_ACCENT = '#ff4fa0';

function Pill({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div
      style={{
        padding: '8px 10px',
        borderRadius: 12,
        border: `1px solid ${accent}33`,
        background: `linear-gradient(180deg, ${accent}16, rgba(255,255,255,0.03))`,
        color: 'var(--sw-text)',
        fontSize: 11.8,
        fontWeight: 700,
        lineHeight: 1.3,
        boxShadow: `0 0 0 1px ${accent}10`,
      }}
    >
      {children}
    </div>
  );
}

export const NeuralNetworkToLanguageModelingComparator = React.memo(({ copy }: Props) => {
  return (
    <PanelCard
      minHeight={0}
      padding={16}
      gap={12}
      style={{
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        background:
          'linear-gradient(180deg, rgba(20,18,31,0.98), rgba(12,13,22,0.98)), radial-gradient(circle at top, rgba(0,229,255,0.08), transparent 42%)',
        border: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '2px 2px 0' }}>
        <div
          style={{
            alignSelf: 'flex-start',
            padding: '7px 11px',
            borderRadius: 999,
            background: 'rgba(0,229,255,0.10)',
            border: '1px solid rgba(0,229,255,0.20)',
            color: LEFT_ACCENT,
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: '.14em',
            textTransform: 'uppercase',
          }}
        >
          {copy.eyebrowLabel}
        </div>
        <div style={{ fontSize: 21, lineHeight: 1.08, color: 'var(--sw-text)', fontWeight: 900 }}>
          {copy.title}
        </div>
        <div style={{ fontSize: 12.6, lineHeight: 1.45, color: 'var(--sw-text-dim)' }}>
          {copy.intro}
        </div>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
          padding: 14,
          borderRadius: 18,
          border: '1px solid rgba(255,255,255,0.07)',
          background: 'linear-gradient(180deg, rgba(255,255,255,0.025), rgba(255,255,255,0.015))',
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '120px minmax(0, 1fr) minmax(0, 1fr)', gap: 10, alignItems: 'end' }}>
          <div />
          <div style={{ color: LEFT_ACCENT, fontSize: 13.5, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.08em' }}>
            {copy.leftTitle}
          </div>
          <div style={{ color: RIGHT_ACCENT, fontSize: 13.5, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.08em' }}>
            {copy.rightTitle}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '120px minmax(0, 1fr) minmax(0, 1fr)', gap: 10, marginTop: -4 }}>
          <div />
          <div style={{ color: 'var(--sw-text-dim)', fontSize: 11.5, lineHeight: 1.4 }}>{copy.leftSubtitle}</div>
          <div style={{ color: 'var(--sw-text-dim)', fontSize: 11.5, lineHeight: 1.4 }}>{copy.rightSubtitle}</div>
        </div>

        <div style={{ height: 1, background: 'linear-gradient(90deg, rgba(0,229,255,0.18), rgba(255,255,255,0.09), rgba(255,79,160,0.18))' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 0, flex: 1 }}>
          {copy.rows.map((row) => (
            <div
              key={row.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '120px minmax(0, 1fr) minmax(0, 1fr)',
                gap: 10,
                alignItems: 'center',
                padding: '8px 10px',
                borderRadius: 14,
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <div style={{ fontSize: 10.2, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.1em', fontWeight: 800 }}>
                {row.label}
              </div>
              <Pill accent={LEFT_ACCENT}>{row.leftValue}</Pill>
              <Pill accent={RIGHT_ACCENT}>{row.rightValue}</Pill>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          padding: '12px 14px',
          borderRadius: 16,
          border: '1px solid rgba(255,255,255,0.07)',
          background: 'rgba(255,255,255,0.03)',
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}
      >
        <div style={{ fontSize: 10.5, color: 'var(--sw-text-dim)', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
          {copy.coreLabel}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}>
          <Pill accent={LEFT_ACCENT}>{copy.coreValue}</Pill>
          <div style={{ color: 'var(--sw-text-dim)', fontSize: 12.2, lineHeight: 1.5 }}>{copy.footer}</div>
        </div>
      </div>
    </PanelCard>
  );
});
