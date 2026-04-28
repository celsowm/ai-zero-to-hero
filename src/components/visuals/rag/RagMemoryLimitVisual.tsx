import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { RagMemoryLimitVisualCopy } from '../../../types/slide';

interface RagMemoryLimitVisualProps {
  copy: RagMemoryLimitVisualCopy;
}

export const RagMemoryLimitVisual = React.memo(({ copy }: RagMemoryLimitVisualProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  const trainingYear = 2021;
  const currentYear = 2026;

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
      gap: '16px',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: sw.text }}>
        {copy.title}
      </div>

      {/* Timeline */}
      <div style={{ position: 'relative', padding: '20px 0' }}>
        {/* Timeline bar */}
        <div style={{
          height: '4px',
          background: `linear-gradient(90deg, ${sw.green} 0%, ${sw.green} 40%, ${sw.red}66 40%, ${sw.red}66 100%)`,
          borderRadius: '2px',
          position: 'relative',
        }}>
          {/* Cutoff marker */}
          <div style={{
            position: 'absolute',
            left: '40%',
            top: '-8px',
            width: '3px',
            height: '20px',
            background: sw.yellow,
            borderRadius: '1px',
          }} />
          <div style={{
            position: 'absolute',
            left: '40%',
            top: '12px',
            transform: 'translateX(-50%)',
            fontSize: '11px',
            fontWeight: 700,
            color: sw.yellow,
            whiteSpace: 'nowrap',
          }}>
            {copy.trainingDateLabel}: {trainingYear}
          </div>
        </div>

        {/* Before label */}
        <div style={{
          position: 'absolute',
          left: '5%',
          top: '-16px',
          fontSize: '11px',
          fontWeight: 600,
          color: sw.green,
        }}>
          ✓ {copy.beforeLabel}
        </div>

        {/* After / gap label */}
        <div style={{
          position: 'absolute',
          left: '60%',
          top: '-16px',
          fontSize: '11px',
          fontWeight: 600,
          color: sw.red,
        }}>
          ✗ {copy.afterLabel}
        </div>

        {/* Current year marker */}
        <div style={{
          position: 'absolute',
          right: '5%',
          top: '12px',
          fontSize: '12px',
          fontWeight: 700,
          color: sw.text,
        }}>
          {copy.currentDateLabel}: {currentYear}
        </div>
      </div>

      {/* Knowledge gap visualization */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px',
        background: 'rgba(255,46,151,0.08)',
        borderRadius: '10px',
        border: `1px solid rgba(255,46,151,0.2)`,
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'rgba(255,46,151,0.2)',
          border: `2px solid ${sw.red}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '18px',
          flexShrink: 0,
        }}>
          ?
        </div>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 700, color: sw.red }}>
            {copy.knowledgeGapLabel}
          </div>
          <div style={{ fontSize: '11px', color: sw.textMuted }}>
            {copy.unknownLabel} ({currentYear - trainingYear} anos)
          </div>
        </div>
      </div>

      {/* Frozen weights indicator */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        justifyContent: 'center',
        padding: '10px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '8px',
      }}>
        <div style={{
          display: 'flex',
          gap: '3px',
        }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              style={{
                width: '12px',
                height: '20px',
                borderRadius: '3px',
                background: `rgba(0,229,255,${0.15 + (i % 3) * 0.1})`,
                border: `1px solid rgba(0,229,255,0.2)`,
                opacity: mounted ? 1 : 0.3,
                transition: `opacity 0.4s ease-out ${i * 0.05}s`,
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: '11px', fontWeight: 600, color: sw.cyan }}>
          🔒 {copy.frozenLabel}
        </span>
      </div>
    </div>
  );
});
