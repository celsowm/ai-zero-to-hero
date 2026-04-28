import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { TransformersJsRagE2eVisualCopy } from '../../../types/slide';

interface TransformersJsRagE2eVisualProps {
  copy: TransformersJsRagE2eVisualCopy;
}

export const TransformersJsRagE2eVisual = React.memo(({ copy }: TransformersJsRagE2eVisualProps) => {
  const [phase, setPhase] = useState<'ingest' | 'query'>('ingest');
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        const maxStep = phase === 'ingest' ? 2 : 5;
        if (s >= maxStep) {
          setPhase((p) => (p === 'ingest' ? 'query' : 'ingest'));
          return 0;
        }
        return s + 1;
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

      {/* Browser-only badge */}
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
          🖥️ 100% Browser — Zero Servidor
        </span>
      </div>

      {/* Phase toggle */}
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
                transition: 'all 0.4s ease-out',
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
                }}>
                  ●
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Models info */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        fontSize: '9px',
        color: sw.textMuted,
      }}>
        <span>Embedder: MiniLM (~80MB)</span>
        <span>•</span>
        <span>Generator: Llama-3.2-1B (~2GB)</span>
      </div>
    </div>
  );
});
