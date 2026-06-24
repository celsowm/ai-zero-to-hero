import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { SyntheticDataValdoriaVisualCopy } from '../../../types/slide';

interface SyntheticDataValdoriaVisualProps {
  copy: SyntheticDataValdoriaVisualCopy;
}

const GROUP_COLORS = [
  { accent: '#64c8ff', bg: 'rgba(100,200,255,0.1)', border: 'rgba(100,200,255,0.2)' },
  { accent: '#a78bfa', bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)' },
  { accent: '#f87171', bg: 'rgba(248,113,113,0.1)', border: 'rgba(248,113,113,0.2)' },
  { accent: '#34d399', bg: 'rgba(52,211,153,0.1)', border: 'rgba(52,211,153,0.2)' },
  { accent: '#fbbf24', bg: 'rgba(251,191,36,0.1)', border: 'rgba(251,191,36,0.2)' },
];

export const SyntheticDataValdoriaVisual = React.memo(({ copy }: SyntheticDataValdoriaVisualProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px 16px',
      background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(11,11,18,0.98))',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Title + Subtitle */}
      <div style={{ textAlign: 'center', marginBottom: '12px' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--sw-text)' }}>
          {copy.title}
        </div>
        <div style={{ fontSize: '11px', color: 'var(--sw-text-muted)', marginTop: '2px' }}>
          {copy.subtitle}
        </div>
      </div>

      {/* Tab bar — 5 groups */}
      <div style={{
        display: 'flex',
        gap: '3px',
        marginBottom: '12px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
        padding: '3px',
      }}>
        {copy.groups.map((group, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(idx)}
            style={{
              flex: 1,
              padding: '5px 4px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '10px',
              fontWeight: 600,
              lineHeight: 1.2,
              background: activeTab === idx
                ? GROUP_COLORS[idx].bg
                : 'transparent',
              color: activeTab === idx
                ? GROUP_COLORS[idx].accent
                : 'var(--sw-text-muted)',
              transition: 'all 0.2s ease',
            }}
          >
            {group.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {copy.groups.map((group, idx) => {
        if (idx !== activeTab) return null;
        const colors = GROUP_COLORS[idx];
        return (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0, gap: '8px' }}>
            {/* Pedagogical function */}
            <div style={{
              padding: '8px 10px',
              background: colors.bg,
              borderRadius: '8px',
              borderLeft: `3px solid ${colors.accent}`,
            }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: colors.accent, marginBottom: '3px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Função pedagógica
              </div>
              <div style={{ fontSize: '11px', color: 'var(--sw-text)', lineHeight: 1.5 }}>
                {group.pedagogicalFunction}
              </div>
            </div>

            {/* Description */}
            <div style={{ fontSize: '11px', color: 'var(--sw-text-muted)', lineHeight: 1.4 }}>
              {group.description}
            </div>

            {/* Categories list */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '4px',
            }}>
              {group.categories.map((cat, ci) => (
                <span key={ci} style={{
                  fontSize: '10px',
                  padding: '3px 7px',
                  background: 'rgba(255,255,255,0.04)',
                  borderRadius: '4px',
                  color: 'var(--sw-text-muted)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  {cat.name} <span style={{ color: colors.accent }}>({cat.count})</span>
                </span>
              ))}
              <span style={{
                fontSize: '10px',
                padding: '3px 7px',
                background: `${colors.accent}15`,
                borderRadius: '4px',
                color: colors.accent,
                fontWeight: 600,
              }}>
                Total: {group.total}
              </span>
            </div>

            {/* Example card */}
            <div style={{
              flex: 1,
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '8px',
              padding: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              minHeight: 0,
              overflow: 'auto',
            }}>
              <div style={{ fontSize: '10px', fontWeight: 600, color: colors.accent, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Exemplo
              </div>
              <div style={{ fontSize: '10px', color: 'var(--sw-text-muted)', fontFamily: "'JetBrains Mono', monospace", lineHeight: 1.4 }}>
                <span style={{ color: '#64c8ff' }}>User: </span>{group.exampleInput}
              </div>
              <div style={{
                fontSize: '11px',
                color: colors.accent,
                lineHeight: 1.5,
                padding: '6px 8px',
                background: `${colors.accent}08`,
                borderRadius: '5px',
                borderLeft: `2px solid ${colors.accent}`,
              }}>
                {group.exampleOutput}
              </div>
            </div>
          </div>
        );
      })}

      {/* Hint */}
      <div style={{
        marginTop: '10px',
        fontSize: '10px',
        color: 'var(--sw-text-muted)',
        textAlign: 'center',
      }}>
        {copy.tapHint}
      </div>
    </div>
  );
});