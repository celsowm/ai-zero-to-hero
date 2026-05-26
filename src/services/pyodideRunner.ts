import { loadPyodide, version as pyodideVersion, type PyodideInterface } from 'pyodide';

const TORCH_IMPORT_RE = /(^|\n)\s*(import\s+torch\b|from\s+torch\b)|(^|[^\w.])torch\./;
const WEBGPU_ERROR = 'Torch snippets in the browser require WebGPU. Use a WebGPU-capable browser and device.';
const TORCH_PYODIDE_MANIFEST_URL = `${import.meta.env.BASE_URL}vendor/python/torch-pyodide.json`;
const TORCH_PYODIDE_WHEEL_RE = /^torch_pyodide-(.+)-py3-none-any\.whl$/;

let pyodideInstance: PyodideInterface | null = null;
let loadingPromise: Promise<PyodideInterface> | null = null;
let torchRuntimeInstallPromise: Promise<void> | null = null;
let torchInstallPromise: Promise<void> | null = null;
let torchPyodideInfoPromise: Promise<TorchPyodideInfo> | null = null;

interface TorchPyodideInfo {
  fileName: string;
  version: string;
  pypiSpec: string;
}

function parseTorchPyodideInfoFromWheelFile(fileName: string, pypiSpec: string): TorchPyodideInfo {
  const match = TORCH_PYODIDE_WHEEL_RE.exec(fileName);
  if (!match) {
    throw new Error(`Invalid torch-pyodide wheel file name: ${fileName}`);
  }

  return {
    fileName,
    version: match[1],
    pypiSpec,
  };
}

function getFallbackTorchPyodideInfo(): TorchPyodideInfo {
  return parseTorchPyodideInfoFromWheelFile(__TORCH_PYODIDE_WHEEL_FILE__, __TORCH_PYODIDE_PYPI_SPEC__);
}

async function getTorchPyodideInfo(): Promise<TorchPyodideInfo> {
  if (torchPyodideInfoPromise) {
    return torchPyodideInfoPromise;
  }

  torchPyodideInfoPromise = (async () => {
    try {
      const response = await fetch(TORCH_PYODIDE_MANIFEST_URL, { cache: 'no-store' });
      if (response.ok) {
        const manifest = (await response.json()) as Partial<TorchPyodideInfo>;
        if (
          typeof manifest.fileName === 'string' &&
          typeof manifest.version === 'string' &&
          typeof manifest.pypiSpec === 'string'
        ) {
          return manifest as TorchPyodideInfo;
        }
      }
    } catch {
      // Fall back to the build-time metadata when the runtime manifest is unavailable.
    }

    return getFallbackTorchPyodideInfo();
  })();

  try {
    return await torchPyodideInfoPromise;
  } catch (error) {
    torchPyodideInfoPromise = null;
    throw error;
  }
}

export function usesTorch(code: string): boolean {
  return TORCH_IMPORT_RE.test(code);
}

export async function getPyodide(): Promise<PyodideInterface> {
  if (pyodideInstance) return pyodideInstance;
  if (loadingPromise) return loadingPromise;

  const indexURL = `${import.meta.env.BASE_URL}pyodide/`;

  loadingPromise = loadPyodide({ indexURL });
  pyodideInstance = await loadingPromise;
  console.info(`[Pyodide] version ${pyodideVersion}`);
  return pyodideInstance;
}

export interface PythonRunResult {
  stdout: string;
  stderr: string;
  result: unknown;
  error?: string;
}

async function ensureTorchRuntime(): Promise<void> {
  if (torchRuntimeInstallPromise) {
    return torchRuntimeInstallPromise;
  }

  torchRuntimeInstallPromise = (async () => {
    const runtimeUrl = `${import.meta.env.BASE_URL}vendor/torch-pyodide/runtime.mjs`;
    const importRuntime = new Function('url', 'return import(url)') as (url: string) => Promise<{
      installTorchRuntime?: (target?: typeof globalThis) => unknown;
    }>;
    const runtimeModule = await importRuntime(runtimeUrl);

    if (typeof runtimeModule.installTorchRuntime !== 'function') {
      throw new Error('Torch runtime bundle did not export installTorchRuntime.');
    }

    runtimeModule.installTorchRuntime(globalThis);
  })();

  try {
    await torchRuntimeInstallPromise;
  } catch (error) {
    torchRuntimeInstallPromise = null;
    throw error;
  }
}

async function ensureTorchPyodide(pyodide: PyodideInterface): Promise<void> {
  if (typeof navigator !== 'undefined' && !('gpu' in navigator)) {
    throw new Error(WEBGPU_ERROR);
  }

  if (torchInstallPromise) {
    return torchInstallPromise;
  }

  torchInstallPromise = (async () => {
    const torchPyodideInfo = await getTorchPyodideInfo();
    await ensureTorchRuntime();
    await pyodide.loadPackage('micropip');

    console.info(`[torch-pyodide] wheel version ${torchPyodideInfo.version}`);

    const localWheelUrl = `${import.meta.env.BASE_URL}vendor/python/${torchPyodideInfo.fileName}`;
    pyodide.globals.set('torch_pyodide_local_wheel_url', localWheelUrl);
    pyodide.globals.set('torch_pyodide_pypi_spec', torchPyodideInfo.pypiSpec);

    await pyodide.runPythonAsync(`
import micropip

try:
    await micropip.install(torch_pyodide_local_wheel_url)
except Exception:
    await micropip.install(torch_pyodide_pypi_spec)
`);
  })();

  try {
    await torchInstallPromise;
  } catch (error) {
    torchInstallPromise = null;
    throw error;
  }
}

export async function runPython(code: string): Promise<PythonRunResult> {
  const pyodide = await getPyodide();

  if (usesTorch(code)) {
    try {
      await ensureTorchPyodide(pyodide);
    } catch (e) {
      const error = String(e);
      return {
        stdout: '',
        stderr: error,
        result: undefined,
        error,
      };
    }
  }

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
    if (usesTorch(code) && error.includes('Failed to get WebGPU adapter')) {
      error = `${WEBGPU_ERROR}\n\n${error}`;
    }
  }

  const captured = pyodide.runPython(`
_ex_stdout.getvalue(), _ex_stderr.getvalue()
`) as { get: (index: number) => string };

  const stdout = captured.get(0) ?? '';
  let stderr = captured.get(1) ?? '';
  if (usesTorch(code) && stderr.includes('Failed to get WebGPU adapter') && !stderr.startsWith(WEBGPU_ERROR)) {
    stderr = `${WEBGPU_ERROR}\n\n${stderr}`;
  }

  pyodide.runPython(`
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__
`);

  return {
    stdout: String(stdout),
    stderr: error ? `${stderr}\n${error}`.trim() : stderr,
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
