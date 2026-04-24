import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Language, ISlide } from '../types/slide';
import { useNavigation } from './NavigationContext';

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
    // Ignore storage access issues and fall back to the default.
  }

  const preferredLanguage = window.navigator.languages?.[0] ?? window.navigator.language;
  return normalizeBrowserLanguage(preferredLanguage) ?? 'pt-br';
}

interface CourseContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentSlide: ISlide;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);
  const { currentSlideIndex, slides } = useNavigation();

  useEffect(() => {
    try {
      window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    } catch {
      // Ignore storage access issues and keep the current in-memory language.
    }

    document.documentElement.lang = language === 'pt-br' ? 'pt-BR' : 'en-US';
  }, [language]);

  const currentSlide = slides[currentSlideIndex];

  const value = useMemo(() => ({
    language,
    setLanguage,
    currentSlide,
  }), [language, currentSlide]);

  return (
    <CourseContext.Provider value={value}>
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

// Re-export navigation and UI hooks for convenience during migration
export { useNavigation } from './NavigationContext';
export { useUI } from './UIContext';
