import React from 'react';
import { useCourse } from '../context/CourseContext';

export const SlideCounter: React.FC = () => {
  const { currentSlideIndex, slides } = useCourse();

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        fontWeight: 500,
        letterSpacing: '0.15em',
        paddingRight: 8,
        borderRight: '1px solid rgba(168, 85, 247, 0.12)',
      }}
    >
      <span className="glow-cyan" style={{ color: 'var(--sw-cyan)', fontSize: 14, fontWeight: 700 }}>
        {String(currentSlideIndex + 1).padStart(2, '0')}
      </span>
      <span style={{ color: 'var(--sw-purple)', opacity: 0.5 }}>/</span>
      <span style={{ color: 'var(--sw-text-muted)' }}>
        {String(slides.length).padStart(2, '0')}
      </span>
    </div>
  );
};
