import React, { useState } from 'react';
import type { Language, PythonExerciseVisualCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { ExerciseCard } from '../../exercise/ExerciseCard';
import { sw } from '../../../theme/tokens';

interface PythonExerciseVisualProps {
  copy: PythonExerciseVisualCopy;
  language: Language;
}

export const PythonExerciseVisual = React.memo(({ copy, language }: PythonExerciseVisualProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultiple = copy.exercises.length > 1;

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0 }}>
      <div style={{ flexShrink: 0 }}>
        <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>
          {copy.title}
        </div>
        <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--sw-text-dim)', marginTop: 4 }}>
          {copy.description}
        </div>
      </div>

      {hasMultiple && (
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            gap: 6,
            overflowX: 'auto',
            padding: '4px 2px',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {copy.exercises.map((exercise, index) => {
            const active = activeIndex === index;
            return (
              <button
                key={exercise.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                style={{
                  flexShrink: 0,
                  padding: '8px 16px',
                  borderRadius: 10,
                  border: active ? `1px solid ${sw.cyan}35` : `1px solid ${sw.borderSubtle}`,
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                  color: active ? '#091018' : 'var(--sw-text-dim)',
                  background: active
                    ? `linear-gradient(135deg, ${sw.cyan}95, ${sw.green}92)`
                    : sw.tintStronger,
                  boxShadow: active ? `0 8px 20px ${sw.cyan}12` : 'none',
                  cursor: 'pointer',
                  transition: 'all 180ms ease',
                }}
              >
                {exercise.id}
              </button>
            );
          })}
        </div>
      )}

      <PanelCard style={{ flex: 1, minHeight: 0, overflow: 'hidden', padding: 18, gap: 12 }}>
        <ExerciseCard
          key={copy.exercises[activeIndex].id}
          exercise={copy.exercises[activeIndex]}
          runButtonLabel={copy.runButtonLabel}
          checkButtonLabel={copy.checkButtonLabel}
          successMessage={copy.successMessage}
          errorMessage={copy.errorMessage}
          hintLabel={copy.hintLabel}
          outputLabel={copy.outputLabel}
          language={language}
        />
      </PanelCard>
    </div>
  );
});
