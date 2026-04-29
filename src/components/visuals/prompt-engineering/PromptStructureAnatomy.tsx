import React, { useState } from 'react';
import type { PromptStructureAnatomyCopy } from '../../../types/slide/prompt-engineering';
import { sw } from '../../../theme/tokens';

interface PromptStructureAnatomyProps {
  copy: PromptStructureAnatomyCopy;
}

const COMPONENTS = [
  { key: 'systemLabel', icon: '🎭', color: 'sw.pink' as const },
  { key: 'contextLabel', icon: '📖', color: 'sw.purple' as const },
  { key: 'instructionLabel', icon: '🎯', color: 'sw.cyan' as const },
  { key: 'examplesLabel', icon: '💡', color: 'sw.yellow' as const },
  { key: 'formatLabel', icon: '📐', color: 'sw.green' as const },
] as const;

export const PromptStructureAnatomyVisual = React.memo(({ copy }: PromptStructureAnatomyProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <h3 style={{
        margin: 0,
        fontSize: sw.fsBody,
        fontWeight: 600,
        color: sw.text,
        textAlign: 'center',
      }}>
        {copy.title}
      </h3>

      {/* Component blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {COMPONENTS.map((comp, i) => {
          const isActive = activeIndex === i;
          const color = sw[comp.color.split('.')[1] as keyof typeof sw] as string;
          return (
            <div
              key={comp.key}
              onClick={() => setActiveIndex(isActive ? null : i)}
              onMouseOver={(e) => { if (!isActive) e.currentTarget.style.background = `${color}18`; }}
              onMouseOut={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent'; }}
              style={{
                padding: '14px 18px',
                borderRadius: '10px',
                border: `1px solid ${isActive ? `${color}66` : sw.borderSubtle}`,
                background: isActive ? `${color}14` : 'transparent',
                cursor: 'pointer',
                transition: sw.transitionFast,
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
              }}
            >
              <span style={{ fontSize: '20px' }}>{comp.icon}</span>
              <span style={{
                fontSize: sw.fsSmall,
                fontWeight: isActive ? 700 : 500,
                color: isActive ? color : sw.textDim,
                transition: sw.transitionFast,
              }}>
                {(copy as unknown as Record<string, string>)[comp.key]}
              </span>
              {i < COMPONENTS.length - 1 && (
                <span style={{ marginLeft: 'auto', color: sw.textMuted, fontSize: sw.fsSmall }}>
                  {copy.flowArrow}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Combined preview */}
      <div style={{
        marginTop: '8px',
        padding: '16px',
        borderRadius: '10px',
        border: `1px solid ${sw.borderSubtle}`,
        background: sw.surfaceLight,
      }}>
        <p style={{
          margin: 0,
          fontSize: sw.fsSmall,
          color: sw.textDim,
          textAlign: 'center',
        }}>
          {copy.combinedLabel}: {COMPONENTS.map(c => (copy as unknown as Record<string, string>)[c.key]).join(` ${copy.flowArrow} `)}
        </p>
      </div>
    </div>
  );
});
