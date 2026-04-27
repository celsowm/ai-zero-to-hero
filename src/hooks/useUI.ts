import { createSafeContext } from '../context/createSafeContext';

export interface UIContextType {
  fontScale: number;
  increaseFontScale: () => void;
  decreaseFontScale: () => void;
  isSearchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
}

export const [UIProviderInternal, useUI, UIContext] =
  createSafeContext<UIContextType>('UI');
