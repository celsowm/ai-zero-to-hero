import React from 'react';
import type { LinearRegressionNotationVisualCopy } from '../../../types/slide';

interface LinearRegressionNotationVisualProps {
  copy: LinearRegressionNotationVisualCopy;
}

const shellStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: 0,
  display: 'grid',
  gap: 16,
  gridTemplateRows: 'auto auto 1fr auto',
};

const cardStyle: React.CSSProperties = {
  borderRadius: 18,
  padding: 20,
  background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.94), rgba(14, 13, 24, 0.96))',
  border: '1px solid rgba(255,255,255,0.06)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.24)',
};

const eyebrowStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
  color: 'var(--sw-cyan)',
  marginBottom: 10,
};

export const LinearRegressionNotationVisual = React.memo(({ copy }: LinearRegressionNotationVisualProps) => (
  <div style={shellStyle}>
    <div style={cardStyle}>
      <div style={eyebrowStyle}>{copy.eyebrow}</div>
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)', marginBottom: 8 }}>
        {copy.title}
      </div>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: 'var(--sw-text-dim)' }}>{copy.description}</p>
    </div>

    <div
      style={{
        ...cardStyle,
        padding: 24,
        background:
          'radial-gradient(circle at 12% 20%, rgba(0, 229, 255, 0.12), transparent 28%), radial-gradient(circle at 88% 10%, rgba(255, 46, 151, 0.12), transparent 30%), linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(14, 13, 24, 0.98))',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: '-0.03em',
          color: 'var(--sw-text)',
          textAlign: 'center',
        }}
      >
        <span style={{ color: '#34d399' }}>ŷ</span>
        <span>=</span>
        <span style={{ color: '#fbbf24' }}>β₀</span>
        <span>+</span>
        <span style={{ color: '#00e5ff' }}>β₁</span>
        <span>* altura</span>
        <span>+</span>
        <span style={{ color: '#ff2e97' }}>β₂</span>
        <span>* idade</span>
      </div>
      <div style={{ marginTop: 14, textAlign: 'center', fontSize: 13.5, color: 'var(--sw-text-muted)' }}>{copy.formula}</div>
    </div>

    <div style={{ ...cardStyle, minHeight: 0, overflowY: 'auto' }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 12 }}>
        {copy.legendTitle}
      </div>
      <div style={{ display: 'grid', gap: 10 }}>
        {copy.legend.map(item => (
          <div
            key={item.symbol}
            style={{
              display: 'grid',
              gridTemplateColumns: '72px 1fr',
              gap: 12,
              alignItems: 'start',
              padding: '12px 14px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.025)',
              border: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 40,
                borderRadius: 12,
                background: `${item.accent}18`,
                color: item.accent,
                fontSize: 20,
                fontWeight: 800,
              }}
            >
              {item.symbol}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--sw-text)', marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{item.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div style={{ ...cardStyle, padding: 18 }}>
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 8 }}>
        {copy.comparisonTitle}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--sw-text)', marginBottom: 6 }}>{copy.comparisonFormula}</div>
      <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)', marginBottom: 10 }}>{copy.comparisonDescription}</div>
      <div style={{ paddingTop: 10, borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: 12.5, color: 'var(--sw-text-muted)' }}>{copy.footer}</div>
    </div>
  </div>
));

