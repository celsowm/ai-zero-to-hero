import { useCallback, useRef, useState } from 'react';
import type { PyodideInterface } from 'pyodide';
import { getPyodide, runPython, type PythonRunResult } from '../services/pyodideRunner';
import type { ExerciseValidator, Language } from '../types/slide';
import { validateExercise, type ValidationResult } from '../services/exerciseValidators';

type PyodideStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface UsePyodideReturn {
  status: PyodideStatus;
  error: string | null;
  run: (code: string) => Promise<PythonRunResult>;
  check: (code: string, validators: ExerciseValidator[], language: Language) => Promise<{ success: boolean; results: ValidationResult[]; runResult: PythonRunResult }>;
}

export function usePyodide(): UsePyodideReturn {
  const [status, setStatus] = useState<PyodideStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const loadingRef = useRef(false);

  const ensureReady = useCallback(async (): Promise<PyodideInterface> => {
    if (status === 'ready') {
      return getPyodide();
    }

    if (loadingRef.current) {
      // Aguarda o carregamento atual
      return getPyodide();
    }

    loadingRef.current = true;
    setStatus('loading');
    setError(null);

    try {
      const instance = await getPyodide();
      setStatus('ready');
      return instance;
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      setError(message);
      setStatus('error');
      throw e;
    } finally {
      loadingRef.current = false;
    }
  }, [status]);

  const run = useCallback(
    async (code: string): Promise<PythonRunResult> => {
      await ensureReady();
      return runPython(code);
    },
    [ensureReady],
  );

  const check = useCallback(
    async (code: string, validators: ExerciseValidator[], language: Language) => {
      const instance = await ensureReady();
      const runResult = await runPython(code);

      const context = {
        pyodide: instance,
        stdout: runResult.stdout,
        stderr: runResult.stderr,
        error: runResult.error,
        language,
      };

      const validation = await validateExercise(context, validators);
      return { ...validation, runResult };
    },
    [ensureReady],
  );

  return { status, error, run, check };
}
