import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { RagVectorSearchVisualCopy } from '../../../types/slide';

interface RagVectorSearchVisualProps {
  copy: RagVectorSearchVisualCopy;
}

const DOCS = [
  { label: 'doc1', score: 0.85, color: sw.cyan },
  { label: 'doc3', score: 0.78, color: sw.cyan },
  { label: 'doc2', score: 0.02, color: '#a855f7' },
  { label: 'doc4', score: 0.01, color: sw.yellow },
];

export const RagVectorSearchVisual = React.memo(({ copy }: RagVectorSearchVisualProps) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      width: '100%',
      padding: '20px 16px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: sw.text }}>
        {copy.title}
      </div>

      {/* Query */}
      <div style={{
        padding: '10px 16px',
        background: 'rgba(255,46,151,0.08)',
        borderRadius: '8px',
        border: `1px solid rgba(255,46,151,0.2)`,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '10px', color: sw.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
          {copy.queryLabel}
        </div>
        <div style={{ fontSize: '13px', fontWeight: 700, color: sw.red, marginTop: '2px' }}>
          "Quem ganhou a Copa?"
        </div>
      </div>

      {/* Ranked results */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {DOCS.map((doc, i) => {
          const isRelevant = doc.score > 0.5;
          const barWidth = animated ? doc.score * 100 : 0;
          return (
            <div
              key={doc.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '28px 1fr 50px',
                gap: '8px',
                alignItems: 'center',
                padding: '8px 10px',
                background: isRelevant ? `${doc.color}08` : 'transparent',
                borderRadius: '6px',
                border: `1px solid ${isRelevant ? doc.color + '22' : sw.borderSubtle}`,
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateX(0)' : 'translateX(-20px)',
                transition: `all 0.5s ease-out ${i * 0.15}s`,
              }}
            >
              {/* Rank */}
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: isRelevant ? doc.color : sw.tintStronger,
                color: isRelevant ? '#000' : sw.textMuted,
                fontSize: '11px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {i + 1}
              </div>

              {/* Bar + label */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  height: '20px',
                  background: `${doc.color}15`,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${barWidth}%`,
                    height: '100%',
                    background: doc.color,
                    borderRadius: '4px',
                    transition: 'width 0.8s ease-out',
                  }} />
                </div>
                <span style={{
                  position: 'absolute',
                  left: '8px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: isRelevant ? doc.color : sw.textMuted,
                  whiteSpace: 'nowrap',
                }}>
                  {doc.label === 'doc1' ? copy.doc1Label : doc.label === 'doc2' ? copy.doc2Label : doc.label === 'doc3' ? copy.doc3Label : copy.doc4Label}
                </span>
              </div>

              {/* Score */}
              <div style={{
                textAlign: 'right',
                fontSize: '12px',
                fontWeight: 700,
                color: isRelevant ? doc.color : sw.textMuted,
                fontFamily: sw.fontMono,
              }}>
                {doc.score.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ textAlign: 'center', fontSize: '10px', color: sw.textMuted }}>
        Cosine Similarity: 1.0 = idêntico, 0.0 = não relacionado
      </div>
    </div>
  );
});
