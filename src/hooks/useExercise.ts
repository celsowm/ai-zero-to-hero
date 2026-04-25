import { useCallback, useEffect, useState } from 'react';
import type { ExerciseItem, Language } from '../types/slide';
import { usePyodideLoader } from './usePyodideLoader';
import { runPython } from '../services/pyodideRunner';
import { validateExercise } from '../services/exerciseValidators';
import type { ValidationResult, ValidationContext } from '../services/exerciseValidators';

export interface ExerciseRunResult {
  stdout: string;
  stderr: string;
}

export interface ExerciseCheckResult {
  runResult: ExerciseRunResult;
  results: ValidationResult[];
}

export interface UseExerciseReturn {
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  output: string;
  stderr: string;
  results: ValidationResult[] | null;
  showHints: boolean;
  setShowHints: React.Dispatch<React.SetStateAction<boolean>>;
  isRunning: boolean;
  pyodideError: string | null;
  allPassed: boolean;
  someFailed: boolean;
  run: () => Promise<void>;
  check: () => Promise<void>;
  reset: () => void;
}

/**
 * Unified exercise hook.
 * Collapses useExerciseRunner + useExerciseSession into a single hook.
 */
export function useExercise(exercise: ExerciseItem, _language: Language): UseExerciseReturn {
  const { status, pyodide, loadPyodide } = usePyodideLoader();
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState('');
  const [stderr, setStderr] = useState('');
  const [results, setResults] = useState<ValidationResult[] | null>(null);
  const [showHints, setShowHints] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isRunning = status === 'loading';

  // Reset session when exercise changes
  useEffect(() => {
    setCode(exercise.starterCode);
    setOutput('');
    setStderr('');
    setResults(null);
    setShowHints(false);
    setError(null);
  }, [exercise.id, exercise.starterCode]);

  const run = useCallback(async () => {
    setResults(null);
    await loadPyodide();
    try {
      const result = await runPython(code);
      setOutput(result.stdout);
      setStderr(result.stderr);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setStderr(message);
    }
  }, [code, loadPyodide]);

  const check = useCallback(async () => {
    await loadPyodide();
    try {
      const result = await runPython(code);
      if (!pyodide) throw new Error('Pyodide not loaded');
      const context: ValidationContext = {
        pyodide,
        stdout: result.stdout,
        stderr: result.stderr,
        language: _language,
      };
      const validation = await validateExercise(context, exercise.validators);
      setOutput(result.stdout);
      setStderr(result.stderr);
      setResults(validation.results);
      setError(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      setResults([{ success: false, message: `Erro na execução: ${message}` }]);
    }
  }, [code, exercise.validators, _language, loadPyodide, pyodide]);

  const reset = useCallback(() => {
    setCode(exercise.starterCode);
    setOutput('');
    setStderr('');
    setResults(null);
    setShowHints(false);
    setError(null);
  }, [exercise.starterCode]);

  const allPassed = results?.every(r => r.success) ?? false;
  const someFailed = results?.some(r => !r.success) ?? false;

  return {
    code,
    setCode,
    output,
    stderr,
    results,
    showHints,
    setShowHints,
    isRunning,
    pyodideError: error,
    allPassed,
    someFailed,
    run,
    check,
    reset,
  };
}
