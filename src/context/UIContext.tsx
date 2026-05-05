import React, { useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';
import { UIProviderInternal } from '../hooks/useUI';

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontScale, setFontScale] = useState(1);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [isCodeToolOpen, setIsCodeToolOpen] = useState(false);
  const [codeToolCode, setCodeToolCode] = useState('# Escreva seu código Python aqui\n');

  const increaseFontScale = useCallback(() => {
    setFontScale(prev => Math.min(prev + 0.1, 1.4));
  }, []);

  const decreaseFontScale = useCallback(() => {
    setFontScale(prev => Math.max(prev - 0.1, 0.8));
  }, []);

  const value = useMemo(() => ({
    fontScale,
    increaseFontScale,
    decreaseFontScale,
    isSearchOpen,
    setSearchOpen,
    isCodeToolOpen,
    setIsCodeToolOpen,
    codeToolCode,
    setCodeToolCode,
  }), [fontScale, increaseFontScale, decreaseFontScale, isSearchOpen, setSearchOpen, isCodeToolOpen, setIsCodeToolOpen, codeToolCode, setCodeToolCode]);

  return (
    <UIProviderInternal value={value}>
      {children}
    </UIProviderInternal>
  );
};
