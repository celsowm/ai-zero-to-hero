import { useCallback, useRef, useState } from 'react';
import type { PyodideInterface } from 'pyodide';
import { getPyodide } from '../services/pyodideRunner';

type PyodideStatus = 'idle' | 'loading' | 'ready' | 'error';

interface UsePyodideLoaderReturn {
  status: PyodideStatus;
  pyodide: PyodideInterface | null;
  loadPyodide: () => Promise<PyodideInterface | null>;
}

export function usePyodideLoader(): UsePyodideLoaderReturn {
  const [status, setStatus] = useState<PyodideStatus>('idle');
  const [pyodide, setPyodide] = useState<PyodideInterface | null>(null);
  const loadingRef = useRef(false);

  const loadPyodide = useCallback(async () => {
    if (loadingRef.current) return null;
    loadingRef.current = true;
    setStatus('loading');

    try {
      const instance = await getPyodide();
      setPyodide(instance);
      setStatus('ready');
      return instance;
    } catch {
      setStatus('error');
      return null;
    } finally {
      loadingRef.current = false;
    }
  }, []);

  return { status, pyodide, loadPyodide };
}

export type { PyodideStatus };
