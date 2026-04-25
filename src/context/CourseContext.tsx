import React, { useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Language, ISlide } from '../types/slide';
import { useNavigation } from './NavigationContext';
import { useLocale } from './LocaleContext';
import { findSlideById } from '../data/course-content';
import { createSafeContext } from './createSafeContext';

export interface CourseContextValue {
  currentSlide: ISlide | null;
  language: Language;
}

const [CourseProviderInternal, useCourseInternal, CourseContext] =
  createSafeContext<CourseContextValue>('Course');

interface CourseProviderProps {
  children: ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
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

export const useCourse = useCourseInternal;
export { CourseContext };
