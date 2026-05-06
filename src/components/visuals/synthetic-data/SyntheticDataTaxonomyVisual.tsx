import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { SyntheticDataTaxonomyVisualCopy } from '../../../types/slide';

interface SyntheticDataTaxonomyVisualProps {
  copy: SyntheticDataTaxonomyVisualCopy;
}

const CATEGORIES = [
  { key: 'saber', color: '#f472b6', icon: '💡' },
  { key: 'analisar', color: '#a855f7', icon: '🔍' },
  { key: 'raciocinar', color: '#3b82f6', icon: '🧠' },
  { key: 'decidir', color: '#10b981', icon: '⚖️' },
  { key: 'seguirFormato', color: '#f59e0b', icon: '📋' },
  { key: 'saberLimitar', color: '#ef4444', icon: '🚫' },
] as const;

export const SyntheticDataTaxonomyVisual = React.memo(({ copy }: SyntheticDataTaxonomyVisualProps) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const getCategoryLabel = (key: string): string => {
    const labels: Record<string, string> = {
      saber: copy.saberLabel,
      analisar: copy.analisarLabel,
      raciocinar: copy.raciocinarLabel,
      decidir: copy.decidirLabel,
      seguirFormato: copy.seguirFormatoLabel,
      saberLimitar: copy.saberLimitarLabel,
    };
    return labels[key] || key;
  };

  const getCategoryExamples = (key: string): string[] => {
    const examples: Record<string, string[]> = {
      saber: copy.saberExamples,
      analisar: copy.analisarExamples,
      raciocinar: copy.raciocinarExamples,
      decidir: copy.decidirExamples,
      seguirFormato: copy.seguirFormatoExamples,
      saberLimitar: copy.saberLimitarExamples,
    };
    return examples[key] || [];
  };

  return (
    <div style={{
      width: '100%',
      padding: '20px 16px',
      background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(11,11,18,0.98))',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Title */}
      <div style={{
        fontSize: '13px',
        fontWeight: 700,
        color: 'var(--sw-text)',
        marginBottom: '16px',
        textAlign: 'center',
      }}>
        {copy.title}
      </div>

      {/* Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        marginBottom: '16px',
      }}>
        {CATEGORIES.map((cat, idx) => {
          const isActive = activeCategory === idx;
          const label = getCategoryLabel(cat.key);

          return (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(isActive ? null : idx)}
              style={{
                padding: '10px 8px',
                background: isActive ? `${cat.color}20` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${isActive ? cat.color : 'rgba(255,255,255,0.06)'}`,
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '18px' }}>{cat.icon}</span>
              <span style={{
                fontSize: '10px',
                fontWeight: 600,
                color: isActive ? cat.color : 'var(--sw-text-muted)',
                textAlign: 'center',
                lineHeight: 1.2,
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Expanded Examples */}
      {activeCategory !== null && (
        <div style={{
          padding: '16px',
          background: `${CATEGORIES[activeCategory].color}10`,
          borderRadius: '12px',
          border: `1px solid ${CATEGORIES[activeCategory].color}30`,
        }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 600,
            color: CATEGORIES[activeCategory].color,
            marginBottom: '10px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {getCategoryLabel(CATEGORIES[activeCategory].key)}
          </div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}>
            {getCategoryExamples(CATEGORIES[activeCategory].key).map((example, i) => (
              <div key={i} style={{
                fontSize: '12px',
                color: 'var(--sw-text)',
                padding: '6px 10px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '6px',
                fontFamily: "'JetBrains Mono', monospace",
              }}>
                {example}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Professor Speech */}
      <div style={{
        marginTop: '12px',
        padding: '10px 14px',
        background: 'rgba(100,200,255,0.05)',
        borderRadius: '8px',
        borderLeft: '3px solid #64c8ff',
        fontSize: '11px',
        color: 'var(--sw-text-muted)',
        lineHeight: 1.5,
        fontStyle: 'italic',
      }}>
        {copy.professorSpeech}
      </div>

      {/* Hint */}
      <div style={{
        marginTop: '12px',
        fontSize: '10px',
        color: 'var(--sw-text-muted)',
        textAlign: 'center',
      }}>
        {copy.clickHint}
      </div>
    </div>
  );
});