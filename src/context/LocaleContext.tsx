import React, { useState } from 'react';
import type { ReactNode } from 'react';
import type { Language } from '../types/slide';
import { LocaleContext } from '../hooks/useLocale';

export const LocaleProvider: React.FC<{ children: ReactNode; defaultLanguage?: Language }> = ({ children, defaultLanguage = 'pt-br' }) => {
  const [language, setLanguage] = useState<Language>(defaultLanguage);

  const switchLanguage = (lang: Language) => {
    setLanguage(lang);
  };

  return (
    <LocaleContext.Provider value={{ language, setLanguage, switchLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
};
