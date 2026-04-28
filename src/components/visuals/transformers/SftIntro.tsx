import React from 'react';
import { sw } from '../../../theme/tokens';
import type { SftIntroCopy } from '../../../types/slide';

interface SftIntroProps {
  copy: SftIntroCopy;
}

const ROLE_COLORS = {
  system: '#facc15',
  user: '#00e5ff',
  assistant: '#34d399',
} as const;

const SpecialToken = React.memo(({ children, color }: { children: React.ReactNode; color: string }) => (
  <span style={{
    display: 'inline-block',
    background: `${color}18`,
    color,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: '4px',
    border: `1px solid ${color}44`,
    fontSize: '12px',
    fontFamily: "'JetBrains Mono', monospace",
  }}>
    {children}
  </span>
));

const MessageBlock = React.memo(({ role, content, color, isLast }: { role: string; content: string; color: string; isLast: boolean }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    paddingLeft: role === 'assistant' ? '12px' : '0',
    borderLeft: `2px solid ${color}55`,
    paddingBottom: isLast ? '0' : '16px',
  }}>
    <div style={{
      fontSize: '11px',
      fontWeight: 700,
      color,
      textTransform: 'uppercase',
      letterSpacing: '0.08em',
    }}>
      {role}
    </div>
    <div style={{
      fontSize: '13px',
      color: 'var(--sw-text)',
      lineHeight: 1.5,
      padding: '6px 10px',
      background: `${color}08`,
      borderRadius: '6px',
      fontFamily: "'Inter', sans-serif",
    }}>
      "{content}"
    </div>
  </div>
));

export const SftIntro = React.memo(({ copy }: SftIntroProps) => {
  return (
    <div style={{
      width: '100%',
      padding: '24px 20px',
      background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(11,11,18,0.98))',
      borderRadius: '20px',
      border: '1px solid rgba(255,255,255,0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* BEFORE: Text Completion */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{
          fontSize: '11px', fontWeight: 700, color: 'var(--sw-text-muted)',
          textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px',
        }}>
          {copy.beforeLabel}
        </div>
        <div style={{
          padding: '14px 16px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '10px',
          border: '1px dashed rgba(255,255,255,0.1)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '13px',
          color: 'var(--sw-text-dim)',
          lineHeight: 1.8,
        }}>
          {copy.exampleText.split(' ').map((word, i, arr) => (
            <React.Fragment key={i}>
              <span style={{ color: 'var(--sw-text)' }}>{word}</span>
              {i < arr.length - 1 && <span style={{ color: 'var(--sw-text-muted)', margin: '0 2px' }}> </span>}
              {i >= 3 && i < arr.length - 1 && (
                <span style={{ color: 'var(--sw-yellow)', fontSize: '10px', fontWeight: 600 }}> ← prevê </span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* arrow */}
      <div style={{ textAlign: 'center', margin: '12px 0' }}>
        <span style={{
          fontSize: '20px', color: 'var(--sw-purple)',
          background: 'rgba(168,85,247,0.12)', padding: '4px 16px', borderRadius: '8px',
          border: '1px solid rgba(168,85,247,0.2)',
        }}>
          {copy.arrowLabel}
        </span>
      </div>

      {/* AFTER: ChatML */}
      <div>
        <div style={{
          fontSize: '11px', fontWeight: 700, color: 'var(--sw-purple)',
          textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '10px',
        }}>
          {copy.afterLabel}
        </div>

        {/* special tokens row */}
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: '6px',
          padding: '10px 12px',
          background: 'rgba(168,85,247,0.06)',
          borderRadius: '10px',
          border: '1px solid rgba(168,85,247,0.15)',
          marginBottom: '16px',
        }}>
          <SpecialToken color={ROLE_COLORS.system}>{copy.specialSystem}</SpecialToken>
          <SpecialToken color={ROLE_COLORS.user}>{copy.specialUser}</SpecialToken>
          <SpecialToken color={ROLE_COLORS.assistant}>{copy.specialAssistant}</SpecialToken>
          <SpecialToken color="#f472b6">{copy.specialEos}</SpecialToken>
        </div>

        {/* conversation blocks */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: '0',
        }}>
          <MessageBlock role={copy.systemRole} content={copy.systemContent} color={ROLE_COLORS.system} isLast={false} />
          <MessageBlock role={copy.userRole} content={copy.userContent} color={ROLE_COLORS.user} isLast={false} />
          <MessageBlock role={copy.assistantRole} content={copy.assistantContent} color={ROLE_COLORS.assistant} isLast={true} />
        </div>

        {/* structure hint */}
        <div style={{
          marginTop: '16px',
          fontSize: '11px',
          color: 'var(--sw-text-muted)',
          padding: '8px 12px',
          background: 'rgba(255,255,255,0.02)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.05)',
          textAlign: 'center',
        }}>
          {copy.structureNote}
        </div>
      </div>
    </div>
  );
});
