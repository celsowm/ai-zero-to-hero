import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ReactNode } from 'react';

interface UIContextType {
  fontScale: number;
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [fontScale, setFontScale] = useState(1);
  const [isSearchOpen, setSearchOpen] = useState(false);

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
  }), [fontScale, increaseFontScale, decreaseFontScale, isSearchOpen, setSearchOpen]);

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};
