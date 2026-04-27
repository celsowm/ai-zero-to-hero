import React from 'react';
import type { Language } from '../types/slide';

export interface LocaleContextType {
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  switchLanguage: (lang: Language) => void;
}

export const LocaleContext = React.createContext<LocaleContextType | null>(null);

export function useLocale() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used within a LocaleProvider');
  return ctx;
}
