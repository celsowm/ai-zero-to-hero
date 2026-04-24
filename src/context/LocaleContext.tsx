import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '../types/slide';

interface LocaleContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  switchLanguage: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

function isLanguage(value: string): value is Language {
  return value === 'pt-br' || value === 'en-us';
}

function normalizeBrowserLanguage(): Language {
  const raw = navigator.languages?.find((l) => {
    const low = l.toLowerCase();
    return low.startsWith('pt') || low.startsWith('en');
  });
  if (!raw) return 'pt-br';
  const low = raw.toLowerCase();
  if (low.startsWith('pt')) return 'pt-br';
  if (low.startsWith('en')) return 'en-us';
  return 'pt-br';
}

function getInitialLanguage(): Language {
  const stored = localStorage.getItem('lang');
  if (stored && isLanguage(stored)) return stored;
  return normalizeBrowserLanguage();
}

interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem('lang', language);
    document.documentElement.lang = language;
  }, [language]);

  const switchLanguage = useMemo(
    () => () => setLanguage((prev) => (prev === 'pt-br' ? 'en-us' : 'pt-br')),
    [],
  );

  return (
    <LocaleContext.Provider value={{ language, setLanguage, switchLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};
