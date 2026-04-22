import { loadPyodide, type PyodideInterface } from 'pyodide';

let pyodideInstance: PyodideInterface | null = null;
let loadingPromise: Promise<PyodideInterface> | null = null;

export async function getPyodide(): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance;
  if (loadingPromise) return loadingPromise;

  const indexURL = `${import.meta.env.BASE_URL}pyodide/`;

  loadingPromise = loadPyodide({ indexURL });
  pyodideInstance = await loadingPromise;
  return pyodideInstance;
}

export interface PythonRunResult {
  stdout: string;
  stderr: string;
  result: unknown;
  error?: string;
}

export async function runPython(code: string): Promise<PythonRunResult> {
  const pyodide = await getPyodide();

  pyodide.runPython(`
import sys
from io import StringIO
_ex_stdout = StringIO()
_ex_stderr = StringIO()
sys.stdout = _ex_stdout
sys.stderr = _ex_stderr
`);

  let result: unknown;
  let error: string | undefined;

  try {
    result = await pyodide.runPythonAsync(code);
  } catch (e) {
    error = String(e);
  }

  const captured = pyodide.runPython(`
_ex_stdout.getvalue(), _ex_stderr.getvalue()
`) as { get: (index: number) => string };

  const stdout = captured.get(0) ?? '';
  const stderr = captured.get(1) ?? '';

  pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

  return {
    stdout: String(stdout),
    stderr: error ? `${String(stderr)}\n${error}`.trim() : String(stderr),
    result,
    error,
  };
}
