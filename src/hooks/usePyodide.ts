// Re-export for backward compatibility.
// New code should use usePyodideLoader or useExerciseRunner directly.
export { usePyodideLoader } from './usePyodideLoader';
export { useExerciseRunner } from './useExerciseRunner';

// Legacy façade — delegates to useExerciseRunner.
import { useExerciseRunner as useRunner } from './useExerciseRunner';

export function usePyodide() {
  return useRunner();
}
