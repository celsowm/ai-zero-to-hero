import { useCallback, useState } from 'react';
import type { Language, ExerciseValidator } from '../types/slide';
import { runPython } from '../services/pyodideRunner';
import { validateExercise } from '../services/exerciseValidators';
import type { ValidationResult } from '../services/exerciseValidators';
import type { ValidationContext } from '../services/exerciseValidators';
import { usePyodideLoader } from './usePyodideLoader';

interface ExerciseRunResult {
  stdout: string;
  stderr: string;
}

interface ExerciseCheckResult {
  runResult: ExerciseRunResult;
  results: ValidationResult[];
}

interface UseExerciseRunnerReturn {
  run: (code: string) => Promise<ExerciseRunResult>;
  check: (code: string, validators: ExerciseValidator[], language: Language) => Promise<ExerciseCheckResult>;
  status: ReturnType<typeof usePyodideLoader>['status'];
  error: string | null;
}

export function useExerciseRunner(): UseExerciseRunnerReturn {
  const { status, pyodide, loadPyodide } = usePyodideLoader();
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    async (code: string) => {
      await loadPyodide();
      try {
        const result = await runPython(code);
        return { stdout: result.stdout, stderr: result.stderr };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return { stdout: '', stderr: message };
      }
    },
    [loadPyodide],
  );

  const check = useCallback(
    async (code: string, validators: ExerciseValidator[], language: Language) => {
      await loadPyodide();
      try {
        const result = await runPython(code);
        if (!pyodide) {
          throw new Error('Pyodide not loaded');
        }
        const context: ValidationContext = {
          pyodide,
          stdout: result.stdout,
          stderr: result.stderr,
          language,
        };
        const validation = await validateExercise(context, validators);
        return { runResult: { stdout: result.stdout, stderr: result.stderr }, results: validation.results };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return {
          runResult: { stdout: '', stderr: message },
          results: [{ success: false, message: `Erro na execução: ${message}` }],
        };
      }
    },
    [loadPyodide, pyodide],
  );

  return { run, check, status, error };
}
