import React from 'react';
import { useCourse } from '../context/CourseContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const FloatingNavigation: React.FC = () => {
  const { goToNextSlide, goToPrevSlide, currentSlideIndex, slides } = useCourse();

  const isFirst = currentSlideIndex === 0;
  const isLast = currentSlideIndex === slides.length - 1;

  const baseStyle: React.CSSProperties = {
    width: 44,
    height: 44,
    borderRadius: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s ease',
    border: 'none',
  };

  return (
    <div className="flex justify-end items-center gap-2 px-10 py-6">
      <button
        onClick={goToPrevSlide}
        disabled={isFirst}
        style={{
          ...baseStyle,
          background: isFirst ? 'rgba(26, 22, 40, 0.5)' : 'var(--sw-surface)',
          color: isFirst ? 'var(--sw-text-muted)' : 'var(--sw-text-dim)',
          cursor: isFirst ? 'not-allowed' : 'pointer',
          opacity: isFirst ? 0.3 : 0.8,
        }}
      >
        <ChevronLeft size={18} strokeWidth={2} />
      </button>
      <button
        onClick={goToNextSlide}
        disabled={isLast}
        style={{
          ...baseStyle,
          background: isLast
            ? 'rgba(26, 22, 40, 0.5)'
            : 'linear-gradient(135deg, var(--sw-pink), var(--sw-purple))',
          color: isLast ? 'var(--sw-text-muted)' : '#fff',
          cursor: isLast ? 'not-allowed' : 'pointer',
          opacity: isLast ? 0.3 : 1,
          boxShadow: isLast
            ? 'none'
            : '0 4px 20px rgba(255, 46, 151, 0.3), 0 0 40px rgba(168, 85, 247, 0.1)',
        }}
      >
        <ChevronRight size={18} strokeWidth={2} />
      </button>
    </div>
  );
};
