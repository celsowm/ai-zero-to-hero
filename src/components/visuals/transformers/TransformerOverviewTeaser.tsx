import React from 'react';
import type { TransformerOverviewTeaserCopy } from '../../../types/slide';

interface TransformerOverviewTeaserProps {
  copy: TransformerOverviewTeaserCopy;
}

const tokenStrip = (count: number, colors: string[]) =>
  Array.from({ length: count }, (_, index) => (
    <div
      key={index}
      style={{
        width: 12,
        height: 10,
        borderRadius: 3,
        background: colors[index % colors.length],
        border: '1px solid rgba(15, 23, 42, 0.16)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.38)',
      }}
    />
  ));

export const TransformerOverviewTeaser: React.FC<TransformerOverviewTeaserProps> = ({ copy }) => {
  return (
    <div
      style={{
        width: '100%',
        padding: 28,
        borderRadius: 24,
        background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 24px 44px rgba(0,0,0,0.28)',
        fontFamily: "'Space Grotesk', 'Inter', sans-serif",
        color: 'var(--sw-text)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 18,
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sw-text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {copy.stepLabel}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--sw-text-dim)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
            {copy.outputLabel}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ color: 'var(--sw-cyan)', fontWeight: 700 }}>I</span>
            <span style={{ color: 'var(--sw-pink)', fontWeight: 700 }}>am</span>
          </div>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
          borderRadius: 20,
          border: '2px solid rgba(0,229,255,0.36)',
          padding: '18px 14px 16px',
          background: 'linear-gradient(180deg, rgba(26,22,40,0.9), rgba(16,14,26,0.95))',
          marginBottom: 20,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at top left, rgba(0,229,255,0.08), transparent 38%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, position: 'relative' }}>
          <div style={{ display: 'flex', gap: 6 }}>{tokenStrip(5, ['#43a5f5', '#3b82f6', '#3182ce'])}</div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--sw-pink)' }}>K</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 10px)', gap: 2 }}>{tokenStrip(9, ['#fed7aa', '#fdba74', '#fb923c'])}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--sw-cyan)' }}>V</span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 10px)', gap: 2 }}>{tokenStrip(9, ['#bfdbfe', '#93c5fd', '#60a5fa'])}</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 14, position: 'relative' }}>
          <div
            style={{
              flex: 1.1,
              minHeight: 112,
              borderRadius: 14,
              background: 'linear-gradient(180deg, rgba(0,229,255,0.1) 0%, rgba(0,229,255,0.06) 100%)',
              border: '2px solid rgba(0,229,255,0.26)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: 'var(--sw-text)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {copy.encoderLabel}
          </div>

          <div style={{ flex: 0.65, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: 999,
                background: 'linear-gradient(180deg, rgba(255,46,151,0.18) 0%, rgba(168,85,247,0.18) 100%)',
                border: '2px solid rgba(255,46,151,0.28)',
                textAlign: 'center',
                fontSize: 13,
                fontWeight: 700,
                color: 'var(--sw-text)',
              }}
            >
              {copy.linearLabel}
            </div>
            <div style={{ width: 2, height: 24, background: 'rgba(255,255,255,0.16)', position: 'relative' }}>
              <div style={{ position: 'absolute', top: -1, left: -4, width: 10, height: 10, borderTop: '2px solid rgba(255,255,255,0.16)', borderLeft: '2px solid rgba(255,255,255,0.16)', transform: 'rotate(45deg)' }} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sw-text-muted)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              {copy.crossAttentionLabel}
            </div>
          </div>

          <div
            style={{
              flex: 1,
              minHeight: 112,
              borderRadius: 14,
              background: 'linear-gradient(180deg, rgba(255,46,151,0.12) 0%, rgba(168,85,247,0.12) 100%)',
              border: '2px solid rgba(255,46,151,0.26)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              color: 'var(--sw-text)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {copy.decoderLabel}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'end' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {copy.positionLabel}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>{tokenStrip(5, ['#f1f5a5', '#e7ee8f'])}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>
            {copy.embeddingsLabel}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>{tokenStrip(5, ['#a8dd8f', '#8bd17d'])}</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 140, fontSize: 12, color: 'var(--sw-cyan)', fontWeight: 700 }}>
            <span>Je</span>
            <span>suis</span>
            <span>etudiant</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {copy.inputLabel}
          </div>
        </div>

        <div style={{ width: 2, alignSelf: 'stretch', background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.12), transparent)' }} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {copy.positionLabel}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>{tokenStrip(2, ['#f1f5a5', '#e7ee8f'])}</div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: 2 }}>
            {copy.embeddingsLabel}
          </div>
          <div style={{ display: 'flex', gap: 6 }}>{tokenStrip(2, ['#a8dd8f', '#8bd17d'])}</div>
          <div style={{ display: 'flex', gap: 10, fontSize: 12, color: 'var(--sw-pink)', fontWeight: 700 }}>
            <span>I</span>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {copy.previousOutputsLabel}
          </div>
        </div>
      </div>
    </div>
  );
};
