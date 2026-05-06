import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { SyntheticDataPipelineVisualCopy } from '../../../types/slide';

interface SyntheticDataPipelineVisualProps {
  copy: SyntheticDataPipelineVisualCopy;
}

const STAGES = [
  { key: 'stage1', color: '#f472b6' },
  { key: 'stage2', color: '#a855f7' },
  { key: 'stage3', color: '#6366f1' },
  { key: 'stage4', color: '#3b82f6' },
  { key: 'stage5', color: '#10b981' },
] as const;

export const SyntheticDataPipelineVisual = React.memo(({ copy }: SyntheticDataPipelineVisualProps) => {
  const [activeStage, setActiveStage] = useState(0);

  const getStageTitle = (idx: number): string => {
    const titles = [copy.stage1Title, copy.stage2Title, copy.stage3Title, copy.stage4Title, copy.stage5Title];
    return titles[idx] || '';
  };

  const getStageDesc = (idx: number): string => {
    const descs = [copy.stage1Desc, copy.stage2Desc, copy.stage3Desc, copy.stage4Desc, copy.stage5Desc];
    return descs[idx] || '';
  };

  const goNext = () => setActiveStage((prev) => Math.min(prev + 1, STAGES.length - 1));
  const goBack = () => setActiveStage((prev) => Math.max(prev - 1, 0));

  const currentColor = STAGES[activeStage].color;

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
      {/* Title */}
      <div style={{
        fontSize: '14px',
        fontWeight: 700,
        color: 'var(--sw-text)',
        marginBottom: '20px',
        textAlign: 'center',
      }}>
        {copy.title}
      </div>

      {/* Progress Dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '8px',
        marginBottom: '20px',
      }}>
        {STAGES.map((stage, idx) => (
          <button
            key={stage.key}
            onClick={() => setActiveStage(idx)}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: idx === activeStage ? stage.color : 'rgba(255,255,255,0.05)',
              border: `2px solid ${idx <= activeStage ? stage.color : 'rgba(255,255,255,0.1)'}`,
              color: idx === activeStage ? '#000' : 'var(--sw-text-muted)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {idx + 1}
          </button>
        ))}
      </div>

      {/* Active Stage Content */}
      <div style={{
        padding: '20px',
        background: `${currentColor}10`,
        borderRadius: '16px',
        border: `1px solid ${currentColor}30`,
        marginBottom: '16px',
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: '16px',
          fontWeight: 700,
          color: currentColor,
          marginBottom: '8px',
        }}>
          {getStageTitle(activeStage)}
        </div>
        <div style={{
          fontSize: '13px',
          color: 'var(--sw-text)',
          lineHeight: 1.5,
        }}>
          {getStageDesc(activeStage)}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div style={{
        display: 'flex',
        gap: '12px',
      }}>
        <button
          onClick={goBack}
          disabled={activeStage === 0}
          style={{
            flex: 1,
            padding: '10px 16px',
            background: activeStage === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '10px',
            color: activeStage === 0 ? 'var(--sw-text-dim)' : 'var(--sw-text)',
            fontSize: '13px',
            fontWeight: 500,
            cursor: activeStage === 0 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          ← {copy.backLabel}
        </button>
        <button
          onClick={goNext}
          disabled={activeStage === STAGES.length - 1}
          style={{
            flex: 1,
            padding: '10px 16px',
            background: activeStage === STAGES.length - 1 ? 'rgba(255,255,255,0.03)' : `${currentColor}20`,
            border: `1px solid ${activeStage === STAGES.length - 1 ? 'rgba(255,255,255,0.08)' : currentColor}`,
            borderRadius: '10px',
            color: activeStage === STAGES.length - 1 ? 'var(--sw-text-dim)' : currentColor,
            fontSize: '13px',
            fontWeight: 600,
            cursor: activeStage === STAGES.length - 1 ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {copy.continueLabel} →
        </button>
      </div>

      {/* Hint */}
      <div style={{
        marginTop: '16px',
        fontSize: '11px',
        color: 'var(--sw-text-muted)',
        textAlign: 'center',
      }}>
        {copy.interactionHint}
      </div>
    </div>
  );
});