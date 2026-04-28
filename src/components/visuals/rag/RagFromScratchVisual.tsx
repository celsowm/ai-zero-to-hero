import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { RagFromScratchVisualCopy } from '../../../types/slide';

interface RagFromScratchVisualProps {
  copy: RagFromScratchVisualCopy;
}

export const RagFromScratchVisual = React.memo(({ copy }: RagFromScratchVisualProps) => {
  const [phase, setPhase] = useState<'ingest' | 'query'>('ingest');
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        if (phase === 'ingest') {
          if (s >= 2) {
            setPhase('query');
            return 0;
          }
          return s + 1;
        } else {
          if (s >= 4) {
            setPhase('ingest');
            return 0;
          }
          return s + 1;
        }
      });
    }, 1500);
    return () => clearInterval(interval);
  }, [phase]);

  const ingestSteps = [
    { label: copy.documentsLabel, icon: '📄', color: sw.yellow },
    { label: copy.embedLabel, icon: '🔢', color: '#a855f7' },
    { label: copy.vectorStoreLabel, icon: '🗄️', color: sw.cyan },
  ];

  const querySteps = [
    { label: copy.questionLabel, icon: '💬', color: sw.red },
    { label: copy.searchLabel, icon: '🔍', color: sw.cyan },
    { label: copy.topKLabel, icon: '📋', color: sw.yellow },
    { label: copy.promptLabel, icon: '📝', color: '#a855f7' },
    { label: copy.generateLabel, icon: '🤖', color: sw.green },
    { label: copy.answerLabel, icon: '✅', color: sw.green },
  ];

  const currentSteps = phase === 'ingest' ? ingestSteps : querySteps;

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

      {/* Phase indicator */}
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
        <span style={{
          padding: '3px 10px',
          fontSize: '10px',
          fontWeight: 700,
          borderRadius: '4px',
          background: phase === 'ingest' ? `${sw.cyan}20` : 'transparent',
          color: phase === 'ingest' ? sw.cyan : sw.textMuted,
          border: phase === 'ingest' ? `1px solid ${sw.cyan}44` : `1px solid transparent`,
          transition: 'all 0.3s ease',
        }}>
          {copy.ingestPhase}
        </span>
        <span style={{
          padding: '3px 10px',
          fontSize: '10px',
          fontWeight: 700,
          borderRadius: '4px',
          background: phase === 'query' ? `${sw.green}20` : 'transparent',
          color: phase === 'query' ? sw.green : sw.textMuted,
          border: phase === 'query' ? `1px solid ${sw.green}44` : `1px solid transparent`,
          transition: 'all 0.3s ease',
        }}>
          {copy.queryPhase}
        </span>
      </div>

      {/* Steps */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px', justifyContent: 'center' }}>
        {currentSteps.map((s, i) => {
          const isActive = i <= step;
          const isCurrent = i === step;
          return (
            <div
              key={`${phase}-${i}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 12px',
                background: isCurrent ? `${s.color}12` : isActive ? `${s.color}06` : 'transparent',
                borderRadius: '6px',
                borderLeft: `3px solid ${isActive ? s.color : 'transparent'}`,
                opacity: isActive ? 1 : 0.3,
                transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
                transition: `all 0.4s ease-out`,
              }}
            >
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: isActive ? `${s.color}20` : 'rgba(255,255,255,0.05)',
                border: `2px solid ${isActive ? s.color : sw.borderSubtle}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                flexShrink: 0,
                transition: 'all 0.4s ease',
              }}>
                {s.icon}
              </div>
              <div style={{
                fontSize: '11px',
                fontWeight: isCurrent ? 700 : 600,
                color: isActive ? s.color : sw.textMuted,
                transition: 'all 0.4s ease',
              }}>
                {s.label}
              </div>
              {isCurrent && (
                <span style={{
                  marginLeft: 'auto',
                  fontSize: '10px',
                  color: s.color,
                  fontWeight: 700,
                  animation: 'pulse 1s infinite',
                }}>
                  ●
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
