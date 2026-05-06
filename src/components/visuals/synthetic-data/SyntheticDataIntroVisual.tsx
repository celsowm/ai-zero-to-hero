import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { SyntheticDataIntroVisualCopy } from '../../../types/slide';

interface SyntheticDataIntroVisualProps {
  copy: SyntheticDataIntroVisualCopy;
}

const StepNode = ({ label, isActive, color }: { label: string; isActive: boolean; color: string }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: isActive ? `${color}15` : 'rgba(255,255,255,0.02)',
    borderRadius: '8px',
    border: `1px solid ${isActive ? color : 'rgba(255,255,255,0.06)'}`,
    transition: 'all 0.2s ease',
  }}>
    <div style={{
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      background: color,
      boxShadow: isActive ? `0 0 8px ${color}` : 'none',
    }} />
    <span style={{
      fontSize: '12px',
      color: isActive ? 'var(--sw-text)' : 'var(--sw-text-dim)',
      fontWeight: isActive ? 600 : 400,
    }}>
      {label}
    </span>
  </div>
);

export const SyntheticDataIntroVisual = React.memo(({ copy }: SyntheticDataIntroVisualProps) => {
  const [activeSide, setActiveSide] = useState<'human' | 'synthetic'>('human');

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
      <div style={{
        fontSize: '14px',
        fontWeight: 700,
        color: 'var(--sw-text)',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        {copy.title}
      </div>

      {/* Toggle Buttons */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '20px',
      }}>
        <button
          onClick={() => setActiveSide('human')}
          style={{
            flex: 1,
            padding: '10px 16px',
            background: activeSide === 'human' ? 'rgba(251,191,36,0.15)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${activeSide === 'human' ? '#fbbf24' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '10px',
            color: activeSide === 'human' ? '#fbbf24' : 'var(--sw-text-muted)',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {copy.humanLabel}
        </button>
        <button
          onClick={() => setActiveSide('synthetic')}
          style={{
            flex: 1,
            padding: '10px 16px',
            background: activeSide === 'synthetic' ? 'rgba(168,85,247,0.15)' : 'rgba(255,255,255,0.03)',
            border: `1px solid ${activeSide === 'synthetic' ? '#a855f7' : 'rgba(255,255,255,0.08)'}`,
            borderRadius: '10px',
            color: activeSide === 'synthetic' ? '#a855f7' : 'var(--sw-text-muted)',
            fontSize: '13px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {copy.syntheticLabel}
        </button>
      </div>

      {/* Flow Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        marginBottom: '20px',
      }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          color: activeSide === 'human' ? '#fbbf24' : '#a855f7',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          marginBottom: '4px',
        }}>
          {activeSide === 'human' ? copy.humanFlow : copy.syntheticFlow}
        </div>

        {activeSide === 'human' ? (
          copy.humanSteps.map((step, i) => (
            <StepNode key={i} label={step} isActive={i === copy.humanSteps.length - 1} color="#fbbf24" />
          ))
        ) : (
          copy.syntheticSteps.map((step, i) => (
            <StepNode key={i} label={step} isActive={i === copy.syntheticSteps.length - 1} color="#a855f7" />
          ))
        )}
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '12px',
      }}>
        <div style={{
          padding: '12px',
          background: 'rgba(251,191,36,0.06)',
          borderRadius: '10px',
          border: '1px solid rgba(251,191,36,0.15)',
        }}>
          <div style={{ fontSize: '10px', color: 'var(--sw-text-muted)', marginBottom: '4px' }}>{copy.humanCost}</div>
          <div style={{ fontSize: '13px', color: '#fbbf24', fontWeight: 600 }}>{copy.humanQuality}</div>
        </div>
        <div style={{
          padding: '12px',
          background: 'rgba(168,85,247,0.06)',
          borderRadius: '10px',
          border: '1px solid rgba(168,85,247,0.15)',
        }}>
          <div style={{ fontSize: '10px', color: 'var(--sw-text-muted)', marginBottom: '4px' }}>{copy.syntheticCost}</div>
          <div style={{ fontSize: '13px', color: '#a855f7', fontWeight: 600 }}>{copy.syntheticQuality}</div>
        </div>
      </div>

      {/* Hint */}
      <div style={{
        marginTop: '16px',
        fontSize: '11px',
        color: 'var(--sw-text-muted)',
        textAlign: 'center',
      }}>
        {copy.clickHint}
      </div>
    </div>
  );
});