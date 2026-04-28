import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { ChromadbRagE2eVisualCopy } from '../../../types/slide';

interface ChromadbRagE2eVisualProps {
  copy: ChromadbRagE2eVisualCopy;
}

export const ChromadbRagE2eVisual = React.memo(({ copy }: ChromadbRagE2eVisualProps) => {
  const [phase, setPhase] = useState<'index' | 'retrieve' | 'generate'>('index');
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => {
        const maxStep = phase === 'index' ? 2 : phase === 'retrieve' ? 3 : 2;
        if (s >= maxStep) {
          setPhase((p) => {
            if (p === 'index') return 'retrieve';
            if (p === 'retrieve') return 'generate';
            return 'index';
          });
          return 0;
        }
        return s + 1;
      });
    }, 1800);
    return () => clearInterval(interval);
  }, [phase]);

  const indexSteps = [
    { label: copy.documentsLabel, icon: '📄', color: sw.cyan },
    { label: copy.embedderLabel, icon: '🔢', color: sw.purple },
    { label: copy.chromaLabel, icon: '🗄️', color: sw.green },
  ];

  const retrieveSteps = [
    { label: copy.queryLabel, icon: '💬', color: sw.pink },
    { label: copy.searchLabel, icon: '🔍', color: sw.cyan },
    { label: copy.contextLabel, icon: '📋', color: sw.yellow },
    { label: copy.promptLabel, icon: '📝', color: sw.purple },
  ];

  const generateSteps = [
    { label: copy.modelLabel, icon: '🤖', color: sw.purple },
    { label: copy.answerLabel, icon: '✅', color: sw.green },
  ];

  const currentSteps = phase === 'index' ? indexSteps : phase === 'retrieve' ? retrieveSteps : generateSteps;

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
        {(['index', 'retrieve', 'generate'] as const).map((p) => (
          <span
            key={p}
            style={{
              padding: '3px 10px',
              fontSize: '10px',
              fontWeight: 700,
              borderRadius: '4px',
              background: phase === p ? `${p === 'index' ? sw.cyan : p === 'retrieve' ? sw.yellow : sw.green}20` : 'transparent',
              color: phase === p ? (p === 'index' ? sw.cyan : p === 'retrieve' ? sw.yellow : sw.green) : sw.textMuted,
              border: phase === p ? `1px solid ${(p === 'index' ? sw.cyan : p === 'retrieve' ? sw.yellow : sw.green)}44` : `1px solid transparent`,
              transition: 'all 0.3s ease',
            }}
          >
            {p === 'index' ? copy.indexPhase : p === 'retrieve' ? copy.retrievePhase : copy.generatePhase}
          </span>
        ))}
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

      {/* Tech stack */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
        fontSize: '9px',
        color: sw.textMuted,
      }}>
        <span>SentenceTransformer</span>
        <span>•</span>
        <span>ChromaDB</span>
        <span>•</span>
        <span>Transformers (GPT-2)</span>
      </div>
    </div>
  );
});
