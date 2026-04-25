import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { ISlide } from '../types/slide';
import { courseContent } from '../data/course-content';
import { createSafeContext } from './createSafeContext';

function getSlideIndexFromHash(slides: ISlide[]): number {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return 0;
  const idx = slides.findIndex(s => s.id === hash);
  return idx >= 0 ? idx : 0;
}

function setHash(slideId: string) {
  window.history.pushState(null, '', `#/${slideId}`);
}

export interface NavigationContextType {
  currentSlideIndex: number;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  goToSlide: (index: number) => void;
  slides: ISlide[];
}

const [NavigationProviderInternal, useNavigationInternal, NavigationContext] =
  createSafeContext<NavigationContextType>('Navigation');

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const slides = courseContent;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => getSlideIndexFromHash(slides));

  useEffect(() => {
    const currentHash = window.location.hash.replace(/^#\/?/, '');
    if (slides[currentSlideIndex].id !== currentHash) {
      setHash(slides[currentSlideIndex].id);
    }
  }, [currentSlideIndex, slides]);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentSlideIndex(getSlideIndexFromHash(slides));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [slides]);

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', `#/${slides[0].id}`);
    }
  }, [slides]);

  const goToNextSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev < slides.length - 1 ? prev + 1 : prev));
  }, [slides.length]);

  const goToPrevSlide = useCallback(() => {
    setCurrentSlideIndex(prev => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (index >= 0 && index < slides.length) {
      setCurrentSlideIndex(index);
    }
  }, [slides.length]);

  const value = useMemo(() => ({
    currentSlideIndex,
    goToNextSlide,
    goToPrevSlide,
    goToSlide,
    slides,
  }), [currentSlideIndex, goToNextSlide, goToPrevSlide, goToSlide, slides]);

  return (
    <NavigationProviderInternal value={value}>
      {children}
    </NavigationProviderInternal>
  );
};

export const useNavigation = useNavigationInternal;
export { NavigationContext };
