import React, { useMemo } from 'react';
import type { ReactNode } from 'react';
import { CourseProviderInternal } from '../hooks/useCourse';
import { useNavigation } from '../hooks/useNavigation';
import { useLocale } from '../hooks/useLocale';
import { findSlideById } from '../data/course-content';

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { slides, currentSlideIndex } = useNavigation();
  const { language } = useLocale();

  const currentSlide = useMemo(() => {
    const currentIndex = currentSlideIndex ?? 0;
    const currentSlideId = slides[currentIndex]?.id;
    if (!currentSlideId) return null;
    return findSlideById(currentSlideId);
  }, [currentSlideIndex, slides]);

  return (
    <CourseProviderInternal value={{ currentSlide, language }}>
      {children}
    </CourseProviderInternal>
  );
};
