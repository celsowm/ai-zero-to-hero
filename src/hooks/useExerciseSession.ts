import { useEffect, useState } from 'react';
import type { ExerciseItem, Language } from '../types/slide';
import { usePyodide } from './usePyodide';
import type { ValidationResult } from '../services/exerciseValidators';

interface UseExerciseSessionReturn {
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
  handleRun: () => Promise<void>;
  handleCheck: (exercise: ExerciseItem, language: Language) => Promise<void>;
}

export function useExerciseSession(
  exercise: ExerciseItem,
  _language: Language,
): UseExerciseSessionReturn {
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState('');
  const [stderr, setStderr] = useState('');
  const [results, setResults] = useState<ValidationResult[] | null>(null);
  const [showHints, setShowHints] = useState(false);
  const { run, check, status, error: pyodideError } = usePyodide();

  const isRunning = status === 'loading';

  // Reset session when exercise changes
  useEffect(() => {
    setCode(exercise.starterCode);
    setOutput('');
    setStderr('');
    setResults(null);
    setShowHints(false);
  }, [exercise.id, exercise.starterCode]);

  const handleRun = async () => {
    setResults(null);
    const res = await run(code);
    setOutput(res.stdout);
    setStderr(res.stderr);
  };

  const handleCheck = async (ex: ExerciseItem, lang: Language) => {
    const { results: validationResults, runResult } = await check(code, ex.validators, lang);
    setOutput(runResult.stdout);
    setStderr(runResult.stderr);
    setResults(validationResults);
  };

  const allPassed = results?.every((r) => r.success) ?? false;
  const someFailed = results?.some((r) => !r.success) ?? false;

  return {
    code,
    setCode,
    output,
    stderr,
    results,
    showHints,
    setShowHints,
    isRunning,
    pyodideError,
    allPassed,
    someFailed,
    handleRun,
    handleCheck,
  };
}
