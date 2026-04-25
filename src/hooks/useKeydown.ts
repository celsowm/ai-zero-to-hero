import { useEffect, useCallback, useRef } from 'react';

/**
 * Generic keydown listener hook.
 * Wraps addEventListener/removeEventListener boilerplate.
 */
export function useKeydown(
  handler: (e: KeyboardEvent) => void,
  deps: React.DependencyList = [],
  target: EventTarget = window,
) {
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  const stableHandler = useCallback((e: Event) => {
    handlerRef.current(e as KeyboardEvent);
  }, []);

  useEffect(() => {
    target.addEventListener('keydown', stableHandler);
    return () => target.removeEventListener('keydown', stableHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Hook that calls `onClose` when Escape is pressed.
 * Ideal for modal dismissal.
 */
export function useEscapeKey(
  onClose: () => void,
  enabled = true,
  target: EventTarget = window,
) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useKeydown(handler, [enabled, onClose, target], target);
}
