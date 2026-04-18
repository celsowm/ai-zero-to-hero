import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Language, ISlide } from '../types/slide';
import { courseContent } from '../data/course-content';

export const FONT_SCALE_BASE = 1.4;

interface CourseContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentSlideIndex: number;
  goToNextSlide: () => void;
  goToPrevSlide: () => void;
  goToSlide: (index: number) => void;
  fontScale: number;
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
  currentSlide: ISlide;
  slides: ISlide[];
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

function getSlideIndexFromHash(slides: ISlide[]): number {
  const hash = window.location.hash.replace(/^#\/?/, '');
  if (!hash) return 0;
  const idx = slides.findIndex(s => s.id === hash);
  return idx >= 0 ? idx : 0;
}

function setHash(slideId: string) {
  window.history.pushState(null, '', `#/${slideId}`);
}

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt-br');
  const [fontScale, setFontScale] = useState(1);
  const slides = courseContent;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => getSlideIndexFromHash(slides));

  // Sync URL on slide change
  useEffect(() => {
    const currentHash = window.location.hash.replace(/^#\/?/, '');
    if (slides[currentSlideIndex].id !== currentHash) {
      setHash(slides[currentSlideIndex].id);
    }
  }, [currentSlideIndex, slides]);

  // Handle browser back/forward
  useEffect(() => {
    const onHashChange = () => {
      setCurrentSlideIndex(getSlideIndexFromHash(slides));
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [slides]);

  // Set initial hash if empty
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

  const increaseFontScale = useCallback(() => {
    setFontScale(prev => Math.min(prev + 0.1, 1.4));
  }, []);

  const decreaseFontScale = useCallback(() => {
    setFontScale(prev => Math.max(prev - 0.1, 0.8));
  }, []);

  const currentSlide = slides[currentSlideIndex];

  return (
    <CourseContext.Provider
      value={{
        language,
        setLanguage,
        currentSlideIndex,
        goToNextSlide,
        goToPrevSlide,
        goToSlide,
        fontScale,
        increaseFontScale,
        decreaseFontScale,
        currentSlide,
        slides,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
