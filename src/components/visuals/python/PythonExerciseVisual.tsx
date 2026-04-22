import React, { useState } from 'react';
import type { PythonExerciseVisualCopy } from '../../../types/slide';
import { PanelCard } from '../PanelCard';
import { ExerciseCard } from '../../exercise/ExerciseCard';

interface PythonExerciseVisualProps {
  copy: PythonExerciseVisualCopy;
}

export const PythonExerciseVisual: React.FC<PythonExerciseVisualProps> = ({ copy }) => {
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
                  border: active ? '1px solid rgba(0, 229, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.06)',
                  fontSize: 12.5,
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  lineHeight: 1.3,
                  whiteSpace: 'nowrap',
                  color: active ? '#091018' : 'var(--sw-text-dim)',
                  background: active
                    ? 'linear-gradient(135deg, rgba(0, 229, 255, 0.95), rgba(102, 184, 74, 0.92))'
                    : 'rgba(255, 255, 255, 0.04)',
                  boxShadow: active ? '0 8px 20px rgba(0, 229, 255, 0.12)' : 'none',
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
          exercise={copy.exercises[activeIndex]}
          runButtonLabel={copy.runButtonLabel}
          checkButtonLabel={copy.checkButtonLabel}
          successMessage={copy.successMessage}
          errorMessage={copy.errorMessage}
          hintLabel={copy.hintLabel}
          outputLabel={copy.outputLabel}
        />
      </PanelCard>
    </div>
  );
};
