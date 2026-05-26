import { readdirSync } from 'fs';

const TORCH_PYODIDE_WHEEL_RE = /^torch_pyodide-(.+)-py3-none-any\.whl$/;

export interface TorchPyodideWheelInfo {
  fileName: string;
  version: string;
  pypiSpec: string;
}

function toWheelInfo(fileName: string): TorchPyodideWheelInfo | null {
  const match = TORCH_PYODIDE_WHEEL_RE.exec(fileName);
  if (!match) return null;

  const version = match[1];
  return {
    fileName,
    version,
    pypiSpec: `torch-pyodide==${version}`,
  };
}

export function resolveTorchPyodideWheelInfo(
  fileNames: string[],
  sourceLabel = 'public/vendor/python',
): TorchPyodideWheelInfo {
  const wheelMatches = fileNames
    .map((fileName) => toWheelInfo(fileName))
    .filter((info): info is TorchPyodideWheelInfo => info !== null);

  if (wheelMatches.length === 0) {
    throw new Error(
      `[pyodide] Nenhum wheel torch-pyodide válido encontrado em "${sourceLabel}". ` +
        'Esperado: exatamente 1 arquivo no formato "torch_pyodide-<versao>-py3-none-any.whl".',
    );
  }

  if (wheelMatches.length > 1) {
    const found = wheelMatches.map((item) => item.fileName).sort().join(', ');
    throw new Error(
      `[pyodide] Mais de um wheel torch-pyodide encontrado em "${sourceLabel}": ${found}. ` +
        'Mantenha apenas 1 arquivo para evitar ambiguidades.',
    );
  }

  return wheelMatches[0];
}

export function discoverTorchPyodideWheelInfo(directoryPath: string): TorchPyodideWheelInfo {
  let fileNames: string[];
  try {
    fileNames = readdirSync(directoryPath, { withFileTypes: true })
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name);
  } catch (error) {
    const details = error instanceof Error ? error.message : String(error);
    throw new Error(`[pyodide] Falha ao ler diretório de wheels "${directoryPath}": ${details}`);
  }

  return resolveTorchPyodideWheelInfo(fileNames, directoryPath);
}
