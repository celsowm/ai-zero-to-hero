import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { BPEMergeStackCopy } from '../../../types/slide';

interface BPEMergeStackProps {
  copy: BPEMergeStackCopy;
}

interface MergeRule {
  priority: number;
  pair: [string, string];
  applied: boolean;
}

export const BPEMergeStack = React.memo(({ copy }: BPEMergeStackProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const mergeRules: MergeRule[] = copy.mergeRules.map((rule, idx) => {
    const match = rule.match(/\(([^,]+),\s*([^)]*)\)/);
    return {
      priority: idx + 1,
      pair: match ? [match[1].trim(), match[2].trim()] : ['', ''],
      applied: idx < currentStep,
    };
  });

  const originalToken = copy.originalToken ?? 'unbelievable';

  const isComplete = currentStep >= mergeRules.length;

  const handleNextMerge = () => {
    if (currentStep < mergeRules.length) {
      setCurrentStep((s) => s + 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        padding: '24px',
        background: sw.shellBackground,
        borderRadius: sw.shellBorderRadius,
        border: sw.shellBorder,
        boxShadow: sw.shellShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        fontFamily: sw.fontSans,
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <div
        style={{
          fontSize: sw.fsTitle,
          fontWeight: 700,
          color: sw.text,
          textAlign: 'center',
        }}
      >
        {copy.title}
      </div>

      {/* Original token */}
      <div
        style={{
          textAlign: 'center',
          padding: '12px',
          background: sw.tint,
          borderRadius: '8px',
          border: `1px solid ${sw.borderSubtle}`,
        }}
      >
        <div
          style={{
            fontSize: sw.fsEyebrow,
            fontWeight: 600,
            color: sw.textMuted,
            textTransform: 'uppercase',
            letterSpacing: sw.lsEyebrow,
            marginBottom: '8px',
          }}
        >
          {copy.originalToken}
        </div>
        <div
          style={{
            fontSize: sw.fsTitle,
            fontFamily: sw.fontMono,
            fontWeight: 700,
            color: sw.cyan,
          }}
        >
          {originalToken}
        </div>
      </div>

      {/* Merge stack */}
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: sw.fsEyebrow,
            fontWeight: 600,
            color: sw.textMuted,
            textTransform: 'uppercase',
            letterSpacing: sw.lsEyebrow,
            marginBottom: '12px',
            textAlign: 'center',
          }}
        >
          {copy.stackLabel}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          {mergeRules.map((rule, idx) => {
            const isActive = idx === currentStep;
            const isApplied = idx < currentStep;

            return (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '12px',
                  alignItems: 'center',
                  padding: '10px 14px',
                  background: isActive ? `${sw.cyan}15` : isApplied ? `${sw.green}15` : sw.tint,
                  borderRadius: '8px',
                  border: isActive
                    ? `1px solid ${sw.cyan}66`
                    : isApplied
                    ? `1px solid ${sw.green}44`
                    : `1px solid ${sw.borderSubtle}`,
                  boxShadow: isActive ? `0 0 12px ${sw.cyan}33` : 'none',
                  transition: sw.transitionFast,
                }}
              >
                {/* Priority number */}
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: sw.fsSmall,
                    fontWeight: 700,
                    background: isApplied ? sw.green : isActive ? sw.cyan : sw.tintStronger,
                    color: isApplied || isActive ? '#000' : sw.textMuted,
                    transition: sw.transitionFast,
                  }}
                >
                  {rule.priority}
                </div>

                {/* Pair display */}
                <div
                  style={{
                    fontFamily: sw.fontMono,
                    fontSize: sw.fsValue,
                    fontWeight: 600,
                    color: isApplied ? sw.green : isActive ? sw.cyan : sw.textDim,
                    transition: sw.transitionFast,
                  }}
                >
                  {rule.pair[0]}{rule.pair[1]}
                </div>

                {/* Status */}
                <div
                  style={{
                    fontSize: sw.fsSmall,
                    fontWeight: 600,
                    color: isApplied ? sw.green : isActive ? sw.cyan : sw.textMuted,
                    textTransform: 'uppercase',
                  }}
                >
                  {isApplied ? '✓' : isActive ? copy.nextMergeLabel : '—'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Result */}
      <div
        style={{
          padding: '12px',
          background: sw.tint,
          borderRadius: '8px',
          border: `1px solid ${sw.borderSubtle}`,
        }}
      >
        <div
          style={{
            fontSize: sw.fsEyebrow,
            fontWeight: 600,
            color: sw.textMuted,
            textTransform: 'uppercase',
            letterSpacing: sw.lsEyebrow,
            marginBottom: '8px',
          }}
        >
          {copy.resultLabel}
        </div>
        <div
          style={{
            fontFamily: sw.fontMono,
            fontSize: sw.fsTitle,
            fontWeight: 700,
            color: isComplete ? sw.green : sw.text,
            transition: sw.transitionFast,
          }}
        >
          {isComplete ? copy.completedLabel : originalToken}
        </div>
      </div>

      {/* Controls */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
        }}
      >
        {!isComplete && (
          <button
            onClick={handleNextMerge}
            style={{
              padding: '10px 24px',
              background: sw.cyan,
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: sw.fsSmall,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: `0 0 16px ${sw.cyan}44`,
              transition: sw.transitionFast,
              flex: 1,
            }}
          >
            {copy.nextMergeLabel} →
          </button>
        )}
        <button
          onClick={handleReset}
          style={{
            padding: '10px 20px',
            background: sw.tintStronger,
            color: sw.text,
            border: `1px solid ${sw.borderSubtle}`,
            borderRadius: '8px',
            fontSize: sw.fsSmall,
            fontWeight: 600,
            cursor: 'pointer',
            transition: sw.transitionFast,
          }}
        >
          {copy.resetLabel}
        </button>
      </div>
    </div>
  );
});
