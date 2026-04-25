import { useCallback } from 'react';
import { useKeydown } from './useKeydown';

interface SearchResult {
  index: number;
  id: string;
}

interface UseKeyboardNavigationArgs {
  isOpen: boolean;
  results: SearchResult[];
  selectedIndex: number;
  onSelect: (index: number) => void;
  onClose: () => void;
  setSelectedIndex: (fn: number | ((prev: number) => number)) => void;
}

/**
 * Handles keyboard shortcuts when the search modal is open:
 * - Escape: close
 * - ArrowDown/ArrowUp: navigate results
 * - Enter: select current
 */
export function useKeyboardNavigation({
  isOpen,
  results,
  selectedIndex,
  onSelect,
  onClose,
  setSelectedIndex,
}: UseKeyboardNavigationArgs) {
  const handleSelect = useCallback(
    (result: SearchResult) => {
      onSelect(result.index);
    },
    [onSelect],
  );

  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    },
    [isOpen, results, selectedIndex, onClose, setSelectedIndex, handleSelect],
  );

  useKeydown(handler, [isOpen, results, selectedIndex, onClose, setSelectedIndex, handleSelect]);
}
