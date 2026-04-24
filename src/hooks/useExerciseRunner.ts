import { useCallback, useState } from 'react';
import type { Language } from '../types/slide';
import type { ExerciseValidator, ValidationResult } from '../services/exerciseValidators';
import { runPython } from '../services/pyodideRunner';
import { validateExercise } from '../services/exerciseValidators';
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
  const { status, loadPyodide } = usePyodideLoader();
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
        const validationResults = validateExercise(validators, language, result.stdout);
        return { runResult: { stdout: result.stdout, stderr: result.stderr }, results: validationResults };
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        setError(message);
        return {
          runResult: { stdout: '', stderr: message },
          results: [{ success: false, message: `Erro na execução: ${message}` }],
        };
      }
    },
    [loadPyodide],
  );

  return { run, check, status, error };
}
