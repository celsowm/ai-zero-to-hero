import { describe, expect, it } from 'vitest';
import { resolveTorchPyodideWheelInfo } from '../torchPyodideWheel';

describe('resolveTorchPyodideWheelInfo', () => {
  it('extracts version and pypi spec when there is exactly one valid wheel', () => {
    const info = resolveTorchPyodideWheelInfo(
      ['torch_pyodide-0.1.2-py3-none-any.whl'],
      'test-dir',
    );

    expect(info.fileName).toBe('torch_pyodide-0.1.2-py3-none-any.whl');
    expect(info.version).toBe('0.1.2');
    expect(info.pypiSpec).toBe('torch-pyodide==0.1.2');
  });

  it('throws when there are no files', () => {
    expect(() => resolveTorchPyodideWheelInfo([], 'test-dir')).toThrowError(
      /Nenhum wheel torch-pyodide válido encontrado/i,
    );
  });

  it('throws when there are only invalid file names', () => {
    expect(() =>
      resolveTorchPyodideWheelInfo(['torch_pyodide-latest.whl'], 'test-dir'),
    ).toThrowError(/Nenhum wheel torch-pyodide válido encontrado/i);
  });

  it('throws when more than one valid wheel is present', () => {
    expect(() =>
      resolveTorchPyodideWheelInfo(
        [
          'torch_pyodide-0.0.68-py3-none-any.whl',
          'torch_pyodide-0.0.69-py3-none-any.whl',
        ],
        'test-dir',
      ),
    ).toThrowError(/Mais de um wheel torch-pyodide encontrado/i);
  });
});
