import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { ChromadbSearchVisualCopy } from '../../../types/slide';

interface ChromadbSearchVisualProps {
  copy: ChromadbSearchVisualCopy;
}

const RESULTS = [
  { label: 'Transformers', score: 0.45, color: sw.cyan },
  { label: 'PyTorch', score: 0.62, color: '#a855f7' },
  { label: 'Vector databases', score: 0.89, color: sw.yellow },
];

export const ChromadbSearchVisual = React.memo(({ copy }: ChromadbSearchVisualProps) => {
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
        padding: '10px 14px',
        background: 'rgba(255,46,151,0.08)',
        borderRadius: '8px',
        border: `1px solid rgba(255,46,151,0.2)`,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '10px', color: sw.textMuted, textTransform: 'uppercase', fontWeight: 600 }}>
          {copy.queryLabel}
        </div>
        <div style={{ fontSize: '12px', fontWeight: 700, color: sw.pink, marginTop: '2px' }}>
          "{copy.queryText}"
        </div>
      </div>

      {/* ChromaDB search */}
      <div style={{
        padding: '8px',
        background: `${sw.cyan}06`,
        borderRadius: '6px',
        border: `1px solid ${sw.cyan}15`,
        textAlign: 'center',
      }}>
        <span style={{ fontSize: '10px', fontWeight: 600, color: sw.cyan }}>
          🗄️ {copy.dbLabel} — {copy.searchLabel}
        </span>
      </div>

      {/* Ranked results */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <div style={{ fontSize: '10px', fontWeight: 600, color: sw.textMuted, textTransform: 'uppercase' }}>
          {copy.rankLabel} ({copy.topKLabel})
        </div>
        {RESULTS.map((r, i) => {
          const barWidth = animated ? (1 - r.score) * 100 : 0;
          return (
            <div
              key={r.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr 40px',
                gap: '8px',
                alignItems: 'center',
                padding: '8px 10px',
                background: i === 0 ? `${r.color}08` : 'transparent',
                borderRadius: '6px',
                border: `1px solid ${i === 0 ? r.color + '22' : sw.borderSubtle}`,
                opacity: animated ? 1 : 0,
                transform: animated ? 'translateX(0)' : 'translateX(-15px)',
                transition: `all 0.5s ease-out ${i * 0.15}s`,
              }}
            >
              {/* Rank */}
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: i === 0 ? r.color : sw.tintStronger,
                color: i === 0 ? '#000' : sw.textMuted,
                fontSize: '10px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {i + 1}
              </div>

              {/* Bar */}
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
                  color: i === 0 ? r.color : sw.textMuted,
                  whiteSpace: 'nowrap',
                }}>
                  {r.label}
                </span>
              </div>

              {/* Distance score */}
              <div style={{
                textAlign: 'right',
                fontSize: '11px',
                fontWeight: 700,
                color: i === 0 ? sw.green : sw.textMuted,
                fontFamily: sw.fontMono,
              }}>
                {i === 0 ? copy.score1 : i === 1 ? copy.score2 : copy.score3}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});
