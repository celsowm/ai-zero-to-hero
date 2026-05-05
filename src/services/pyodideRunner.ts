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

  // Set up stdout/stderr capture for this run.
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

export interface SyntaxErrorDetail {
  line: number;
  column: number;
  message: string;
}

export async function checkPythonSyntax(code: string): Promise<SyntaxErrorDetail | null> {
  const pyodide = await getPyodide();

  try {
    // We use Python's ast module to check syntax without executing
    pyodide.globals.set('code_to_check', code);
    pyodide.runPython(`
import ast
try:
    ast.parse(code_to_check)
    syntax_error = None
except SyntaxError as e:
    syntax_error = {'line': e.lineno, 'column': e.offset, 'message': str(e)}
except Exception as e:
    syntax_error = {'line': 1, 'column': 0, 'message': str(e)}
`);
    const error = pyodide.globals.get('syntax_error');

    if (error) {
      const errorObj = error.toJs();
      return {
        line: errorObj.line,
        column: errorObj.column ?? 0,
        message: errorObj.message,
      };
    }
    return null;
  } catch (e) {
    console.error('Failed to check syntax:', e);
    return null;
  }
}
