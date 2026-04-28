import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { TransformersJsVectorSearchVisualCopy } from '../../../types/slide';

interface TransformersJsVectorSearchVisualProps {
  copy: TransformersJsVectorSearchVisualCopy;
}

const RESULTS = [
  { label: 'doc1', score: 0.85, text: 'GPT-2 pela OpenAI', color: sw.cyan },
  { label: 'doc2', score: 0.02, text: 'Python para ML', color: '#a855f7' },
  { label: 'doc3', score: 0.01, text: 'Copa 2022 no Catar', color: sw.yellow },
];

export const TransformersJsVectorSearchVisual = React.memo(({ copy }: TransformersJsVectorSearchVisualProps) => {
  const [animated, setAnimated] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{
      width: '100%',
      padding: '16px 12px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: sw.text }}>
        {copy.title}
      </div>

      {/* Query */}
      <div style={{
        padding: '8px 14px',
        background: 'rgba(255,46,151,0.08)',
        borderRadius: '8px',
        border: `1px solid rgba(255,46,151,0.2)`,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '10px', color: sw.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
          {copy.queryLabel}
        </div>
      </div>

      {/* No server badge */}
      <div style={{
        textAlign: 'center',
        padding: '4px 12px',
        background: `${sw.green}08`,
        borderRadius: '4px',
        border: `1px solid ${sw.green}22`,
        display: 'inline-block',
        alignSelf: 'center',
      }}>
        <span style={{ fontSize: '10px', fontWeight: 700, color: sw.green }}>
          🖥️ {copy.noServerLabel}
        </span>
      </div>

      {/* Ranked results */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        {RESULTS.map((r, i) => {
          const barWidth = animated ? r.score * 100 : 0;
          return (
            <div
              key={r.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr 40px',
                gap: '8px',
                alignItems: 'center',
                padding: '8px 10px',
                background: r.score > 0.5 ? `${r.color}08` : 'transparent',
                borderRadius: '6px',
                border: `1px solid ${r.score > 0.5 ? r.color + '22' : sw.borderSubtle}`,
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateX(0)' : 'translateX(-15px)',
                transition: `all 0.5s ease-out ${i * 0.15}s`,
              }}
            >
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: r.score > 0.5 ? r.color : sw.tintStronger,
                color: r.score > 0.5 ? '#000' : sw.textMuted,
                fontSize: '10px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {i + 1}
              </div>

              <div style={{ position: 'relative' }}>
                <div style={{
                  height: '18px',
                  background: `${r.color}15`,
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    width: `${barWidth}%`,
                    height: '100%',
                    background: r.color,
                    borderRadius: '4px',
                    transition: 'width 0.8s ease-out',
                  }} />
                </div>
                <span style={{
                  position: 'absolute',
                  left: '6px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  fontSize: '10px',
                  fontWeight: 600,
                  color: r.score > 0.5 ? r.color : sw.textMuted,
                  whiteSpace: 'nowrap',
                }}>
                  {r.text}
                </span>
              </div>

              <div style={{
                textAlign: 'right',
                fontSize: '11px',
                fontWeight: 700,
                color: r.score > 0.5 ? r.color : sw.textMuted,
                fontFamily: sw.fontMono,
              }}>
                {r.score.toFixed(2)}
              </div>
            </div>
          );
        })}
      </div>

      {/* Speed */}
      <div style={{ textAlign: 'center', fontSize: '10px', color: sw.green, fontWeight: 600 }}>
        ⚡ {copy.searchLabel}
      </div>
    </div>
  );
});
