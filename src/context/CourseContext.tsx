import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Language, ISlide } from '../types/slide';
import { courseContent } from '../data/course-content';

const LANGUAGE_STORAGE_KEY = 'ai-zero-to-hero-language';

function isLanguage(value: string | null | undefined): value is Language {
  return value === 'pt-br' || value === 'en-us';
}

function normalizeBrowserLanguage(value: string | null | undefined): Language | null {
  if (!value) return null;

  const normalized = value.toLowerCase();

  if (normalized.startsWith('pt')) return 'pt-br';
  if (normalized.startsWith('en')) return 'en-us';

  return null;
}

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') {
    return 'pt-br';
  }

  try {
    const storedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (isLanguage(storedLanguage)) {
      return storedLanguage;
    }
  } catch {
    // Ignore storage access issues and fall back to the browser locale.
  }

  const preferredLanguage = window.navigator.languages?.[0] ?? window.navigator.language;
  return normalizeBrowserLanguage(preferredLanguage) ?? 'pt-br';
}


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
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const [fontScale, setFontScale] = useState(1);
  const slides = courseContent;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(() => getSlideIndexFromHash(slides));

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage access issues and keep the current in-memory language.
    }

    document.documentElement.lang = language === 'pt-br' ? 'pt-BR' : 'en-US';
  }, [language]);

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const target = event.target as HTMLElement;
      const isInput =
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable;

      if (isInput) return;

      if (event.key === 'ArrowRight' || event.key === 'PageDown') {
        goToNextSlide();
      } else if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        goToPrevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);

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

// eslint-disable-next-line react-refresh/only-export-components
export const useCourse = () => {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error('useCourse must be used within a CourseProvider');
  }
  return context;
};
