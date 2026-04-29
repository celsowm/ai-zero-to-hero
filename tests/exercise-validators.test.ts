import { describe, it, expect } from 'vitest';
import { validateExercise, type ValidationContext } from '../src/services/exerciseValidators';
import type { PyodideInterface } from 'pyodide';

// ── Mock Pyodide for Node.js test environment ──────────────────────────────
// We don't need real Python execution to test the validators.
// The validators consume a ValidationContext with stdout, stderr, error,
// and pyodide.globals.get(). We mock those.

function makeMockGlobals(globals: Record<string, unknown>): PyodideInterface {
  const globalMap = new Map<string, unknown>(Object.entries(globals));
  // Create a minimal PyodideInterface mock with only what validators use
  return {
    globals: {
      get: (name: string) => globalMap.get(name),
      set: (name: string, value: unknown) => { globalMap.set(name, value); },
      has: (name: string) => globalMap.has(name),
      delete: (name: string) => { globalMap.delete(name); },
      clear: () => { globalMap.clear(); },
      keys: () => Array.from(globalMap.keys()),
      toPy: (obj: unknown) => obj,
    },
    toPy: (obj: unknown) => obj,
    runPython: () => null,
    runPythonAsync: () => Promise.resolve(null),
  } as unknown as PyodideInterface;
}

function makeContext(
  code: string,
  globals: Record<string, unknown>,
  language: 'pt-br' | 'en-us' = 'pt-br',
): ValidationContext {
  return {
    pyodide: makeMockGlobals(globals),
    stdout: '',
    stderr: '',
    error: undefined,
    language,
  };
}

// ─────────────────────────────────────────────
// assertOutput
// ─────────────────────────────────────────────

describe('assertOutput', () => {
  it('passes when stdout matches exactly (exact: true)', async () => {
    const ctx = { ...makeContext('print("ola")', {}), stdout: 'ola\n' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutput', expected: 'ola', exact: true },
    ]);
    expect(result.success).toBe(true);
    expect(result.results[0].success).toBe(true);
  });

  it('fails when stdout does not match exactly', async () => {
    const ctx = { ...makeContext('print("ola mundo")', {}), stdout: 'ola mundo\n' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutput', expected: 'ola', exact: true },
    ]);
    expect(result.success).toBe(false);
    expect(result.results[0].success).toBe(false);
  });

  it('passes when stdout contains expected substring (exact: false)', async () => {
    const ctx = { ...makeContext('print("O resultado e 42")', {}), stdout: 'O resultado e 42\n' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutput', expected: '42', exact: false },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when stdout does not contain expected substring', async () => {
    const ctx = { ...makeContext('print("O resultado e 42")', {}), stdout: 'O resultado e 42\n' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutput', expected: '99', exact: false },
    ]);
    expect(result.success).toBe(false);
    expect(result.results[0].message).toContain('99');
  });

  it('handles numeric output correctly', async () => {
    const ctx = { ...makeContext('print(7 * 6)', {}), stdout: '42\n' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutput', expected: '42', exact: true },
    ]);
    expect(result.success).toBe(true);
  });

  it('detects when user prints wrong calculation', async () => {
    const ctx = { ...makeContext('print(7 * 5)', {}), stdout: '35\n' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutput', expected: '42', exact: true },
    ]);
    expect(result.success).toBe(false);
  });

  it('handles extra whitespace correctly (trimming)', async () => {
    const ctx = { ...makeContext('print("ola")', {}), stdout: '  ola  \n' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutput', expected: 'ola', exact: true },
    ]);
    expect(result.success).toBe(true);
  });
});

// ─────────────────────────────────────────────
// assertVariable
// ─────────────────────────────────────────────

describe('assertVariable', () => {
  it('passes when variable has expected string value', async () => {
    const ctx = makeContext('nome = "Maria"', { nome: 'Maria' });
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'nome', expectedValue: 'Maria' },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when variable has wrong string value', async () => {
    const ctx = makeContext('nome = "Joao"', { nome: 'Joao' });
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'nome', expectedValue: 'Maria' },
    ]);
    expect(result.success).toBe(false);
  });

  it('passes when variable has expected numeric value', async () => {
    const ctx = makeContext('idade = 25', { idade: 25 });
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'idade', expectedValue: 25 },
    ]);
    expect(result.success).toBe(true);
  });

  it('passes with numeric tolerance', async () => {
    const ctx = makeContext('pi = 3.14159', { pi: 3.14159 });
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'pi', expectedValue: 3.14, tolerance: 0.01 },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when value is outside tolerance', async () => {
    const ctx = makeContext('pi = 3.0', { pi: 3.0 });
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'pi', expectedValue: 3.14, tolerance: 0.01 },
    ]);
    expect(result.success).toBe(false);
  });

  it('passes when variable is a list', async () => {
    const ctx = makeContext('numeros = [1, 2, 3]', { numeros: [1, 2, 3] });
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'numeros', expectedValue: [1, 2, 3] },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when list has wrong order', async () => {
    const ctx = makeContext('numeros = [3, 2, 1]', { numeros: [3, 2, 1] });
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'numeros', expectedValue: [1, 2, 3] },
    ]);
    expect(result.success).toBe(false);
  });

  it('fails when variable does not exist', async () => {
    const ctx = makeContext('x = 10', { x: 10 });
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'inexistente', expectedValue: 42 },
    ]);
    expect(result.success).toBe(false);
  });
});

// ─────────────────────────────────────────────
// assertFunctionReturn
// ─────────────────────────────────────────────

describe('assertFunctionReturn', () => {
  it('passes when function returns correct value', async () => {
    const dobro = (x: number) => x * 2;
    const ctx = makeContext('def dobro(x): return x * 2', { dobro });
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'dobro', args: [5], expectedReturn: 10 },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when function returns wrong value', async () => {
    const dobro = (x: number) => x + 2;
    const ctx = makeContext('def dobro(x): return x + 2', { dobro });
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'dobro', args: [5], expectedReturn: 10 },
    ]);
    expect(result.success).toBe(false);
  });

  it('passes with float tolerance', async () => {
    const raiz = (x: number) => Math.sqrt(x);
    const ctx = makeContext('def raiz(x): return math.sqrt(x)', { raiz });
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'raiz', args: [2], expectedReturn: 1.414, tolerance: 0.001 },
    ]);
    expect(result.success).toBe(true);
  });

  it('passes with string arguments', async () => {
    const saudacao = (nome: string) => `Ola, ${nome}!`;
    const ctx = makeContext('def saudacao(nome): return f"Ola, {nome}!"', { saudacao });
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'saudacao', args: ['Ana'], expectedReturn: 'Ola, Ana!' },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when function does not exist', async () => {
    const dbr = (x: number) => x * 2;
    const ctx = makeContext('def dbr(x): return x * 2', { dbr });
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'dobro', args: [5], expectedReturn: 10 },
    ]);
    expect(result.success).toBe(false);
    expect(result.results[0].message).toContain('dobro');
  });

  it('detects off-by-one bug in user function', async () => {
    // Simulates range(1, 5) = [1,2,3,4] instead of range(1, 6) = [1,2,3,4,5]
    const fatorial = (n: number) => {
      let result = 1;
      for (let i = 1; i < n; i++) result *= i;
      return result;
    };
    const ctx = makeContext('def fatorial(n): ...', { fatorial });
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'fatorial', args: [5], expectedReturn: 120 },
    ]);
    // 1*2*3*4 = 24, not 120
    expect(result.success).toBe(false);
  });

  it('passes with multiple arguments', async () => {
    const somar = (a: number, b: number) => a + b;
    const ctx = makeContext('def somar(a, b): return a + b', { somar });
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'somar', args: [3, 7], expectedReturn: 10 },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when user swaps subtraction order', async () => {
    const subtrair = (a: number, b: number) => b - a;
    const ctx = makeContext('def subtrair(a, b): return b - a', { subtrair });
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'subtrair', args: [3, 10], expectedReturn: -7 },
    ]);
    // b - a = 10 - 3 = 7, but expected -7 (a - b)
    expect(result.success).toBe(false);
  });

  it('passes when subtraction order is correct', async () => {
    const subtrair = (a: number, b: number) => a - b;
    const ctx = makeContext('def subtrair(a, b): return a - b', { subtrair });
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'subtrair', args: [3, 10], expectedReturn: -7 },
    ]);
    expect(result.success).toBe(true);
  });
});

// ─────────────────────────────────────────────
// assertDerivedVariable (BMI formula)
// ─────────────────────────────────────────────

describe('assertDerivedVariable', () => {
  it('passes when user calculates BMI correctly (pt-br)', async () => {
    const peso = 70;
    const altura = 175;
    const imc = peso / ((altura / 100) ** 2); // correct
    const ctx = makeContext('imc = peso / ((altura / 100) ** 2)', { peso, altura, imc });
    const result = await validateExercise(ctx, [
      {
        type: 'assertDerivedVariable',
        variableName: 'imc',
        formulaId: 'bmi',
        inputs: { peso: 'peso', altura: 'altura' },
        tolerance: 0.01,
      },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when user uses wrong BMI formula', async () => {
    const peso = 70;
    const altura = 175;
    const imc = peso / altura; // wrong — forgot to convert cm to m
    const ctx = makeContext('imc = peso / altura', { peso, altura, imc });
    const result = await validateExercise(ctx, [
      {
        type: 'assertDerivedVariable',
        variableName: 'imc',
        formulaId: 'bmi',
        inputs: { peso: 'peso', altura: 'altura' },
        tolerance: 0.01,
      },
    ]);
    expect(result.success).toBe(false);
  });

  it('passes when user calculates BMI correctly (en-us)', async () => {
    const weight = 70;
    const height = 175;
    const bmi = weight / ((height / 100) ** 2);
    const ctx = makeContext('bmi = weight / ((height / 100) ** 2)', { weight, height, bmi }, 'en-us');
    const result = await validateExercise(ctx, [
      {
        type: 'assertDerivedVariable',
        variableName: 'bmi',
        formulaId: 'bmi_en',
        inputs: { weight: 'weight', height: 'height' },
        tolerance: 0.01,
      },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails with unknown formula id', async () => {
    const ctx = makeContext('x = 10', { x: 10 });
    const result = await validateExercise(ctx, [
      {
        type: 'assertDerivedVariable',
        variableName: 'x',
        formulaId: 'formula_inexistente',
        inputs: {},
      },
    ]);
    expect(result.success).toBe(false);
    expect(result.results[0].message).toContain('formula_inexistente');
  });

  it('fails when required input variable does not exist', async () => {
    const peso = 70;
    const imc = peso / 3.0625; // hardcoded result
    const ctx = makeContext('imc = peso / 3.0625', { peso, imc });
    // altura is missing from globals
    const result = await validateExercise(ctx, [
      {
        type: 'assertDerivedVariable',
        variableName: 'imc',
        formulaId: 'bmi',
        inputs: { peso: 'peso', altura: 'altura' },
        tolerance: 0.01,
      },
    ]);
    expect(result.success).toBe(false);
  });

  it('fails when user variable has wrong value despite correct inputs', async () => {
    const peso = 70;
    const altura = 175;
    const imc = 999; // completely wrong
    const ctx = makeContext('imc = 999', { peso, altura, imc });
    const result = await validateExercise(ctx, [
      {
        type: 'assertDerivedVariable',
        variableName: 'imc',
        formulaId: 'bmi',
        inputs: { peso: 'peso', altura: 'altura' },
        tolerance: 0.01,
      },
    ]);
    expect(result.success).toBe(false);
  });
});

// ─────────────────────────────────────────────
// assertOutputMatchesVariable
// ─────────────────────────────────────────────

describe('assertOutputMatchesVariable', () => {
  it('passes when stdout matches variable value', async () => {
    const ctx = { ...makeContext('print(resultado)', { resultado: 42 }), stdout: '42' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutputMatchesVariable', variableName: 'resultado' },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when stdout does not match variable', async () => {
    const ctx = { ...makeContext('print(99)', { resultado: 42 }), stdout: '99' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutputMatchesVariable', variableName: 'resultado' },
    ]);
    expect(result.success).toBe(false);
  });

  it('passes with float values', async () => {
    const ctx = { ...makeContext('print(pi)', { pi: 3.14159 }), stdout: '3.14159' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutputMatchesVariable', variableName: 'pi' },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when variable does not exist', async () => {
    const ctx = { ...makeContext('print(42)', {}), stdout: '42' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutputMatchesVariable', variableName: 'inexistente' },
    ]);
    expect(result.success).toBe(false);
  });

  it('passes with string values', async () => {
    const ctx = { ...makeContext('print(nome)', { nome: 'Maria' }), stdout: 'Maria' };
    const result = await validateExercise(ctx, [
      { type: 'assertOutputMatchesVariable', variableName: 'nome' },
    ]);
    expect(result.success).toBe(true);
  });
});

// ─────────────────────────────────────────────
// assertNoError
// ─────────────────────────────────────────────

describe('assertNoError', () => {
  it('passes when code ran without errors', async () => {
    const ctx = makeContext('x = 1 + 1', { x: 2 });
    const result = await validateExercise(ctx, [
      { type: 'assertNoError' },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when code raised an exception', async () => {
    const ctx = makeContext('x = 1 / 0', { x: 0 }, 'pt-br');
    (ctx as Partial<ValidationContext>).error = 'ZeroDivisionError: division by zero';
    const result = await validateExercise(ctx as ValidationContext, [
      { type: 'assertNoError' },
    ]);
    expect(result.success).toBe(false);
  });

  it('fails when stderr is not empty', async () => {
    const ctx = {
      ...makeContext('import warnings; warnings.warn("deprecated")', {}),
      stderr: 'deprecated\n',
    };
    const result = await validateExercise(ctx, [
      { type: 'assertNoError' },
    ]);
    expect(result.success).toBe(false);
  });

  it('fails when variable is undefined (NameError)', async () => {
    const ctx = {
      ...makeContext('print(inexistente)', {}),
      error: 'NameError: name \'inexistente\' is not defined',
    };
    const result = await validateExercise(ctx, [
      { type: 'assertNoError' },
    ]);
    expect(result.success).toBe(false);
  });
});

// ─────────────────────────────────────────────
// Combined validators (real exercise scenarios)
// ─────────────────────────────────────────────

describe('combined validators', () => {
  it('passes a complete IMC exercise with correct code', async () => {
    const peso = 70;
    const altura = 175;
    const imc = peso / ((altura / 100) ** 2); // 22.86
    const ctx = {
      ...makeContext('imc = peso / ((altura / 100) ** 2)', { peso, altura, imc }),
      stdout: 'Seu IMC e 22.9\n',
    };
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'peso', expectedValue: 70 },
      { type: 'assertVariable', variableName: 'altura', expectedValue: 175 },
      {
        type: 'assertDerivedVariable',
        variableName: 'imc',
        formulaId: 'bmi',
        inputs: { peso: 'peso', altura: 'altura' },
        tolerance: 0.01,
      },
      { type: 'assertNoError' },
    ]);
    expect(result.success).toBe(true);
    expect(result.results.every((r) => r.success)).toBe(true);
  });

  it('fails when IMC formula is wrong but variables are correct', async () => {
    const peso = 70;
    const altura = 175;
    const imc = peso / altura; // wrong — 0.4
    const ctx = {
      ...makeContext('imc = peso / altura', { peso, altura, imc }),
      stdout: 'Seu IMC e 0.4\n',
    };
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'peso', expectedValue: 70 },
      { type: 'assertVariable', variableName: 'altura', expectedValue: 175 },
      {
        type: 'assertDerivedVariable',
        variableName: 'imc',
        formulaId: 'bmi',
        inputs: { peso: 'peso', altura: 'altura' },
        tolerance: 0.01,
      },
    ]);
    expect(result.success).toBe(false);
    // Variables pass, but formula fails
    expect(result.results[0].success).toBe(true);
    expect(result.results[1].success).toBe(true);
    expect(result.results[2].success).toBe(false);
  });

  it('passes a function-based exercise with multiple checks', async () => {
    const calcular_area = (largura: number, altura: number) => largura * altura;
    const area = 15;
    const ctx = {
      ...makeContext('area = calcular_area(5, 3)', { calcular_area, area }),
      stdout: '15\n',
    };
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'calcular_area', args: [5, 3], expectedReturn: 15 },
      { type: 'assertVariable', variableName: 'area', expectedValue: 15 },
      { type: 'assertOutput', expected: '15', exact: true },
    ]);
    expect(result.success).toBe(true);
  });

  it('fails when function has wrong implementation despite correct call', async () => {
    // User called calcular_area correctly but implemented it as addition
    const calcular_area = (largura: number, altura: number) => largura + altura;
    const area = 8; // 5 + 3, not 5 * 3
    const ctx = {
      ...makeContext('area = calcular_area(5, 3)', { calcular_area, area }),
      stdout: '8\n',
    };
    const result = await validateExercise(ctx, [
      { type: 'assertFunctionReturn', functionName: 'calcular_area', args: [5, 3], expectedReturn: 15 },
      { type: 'assertOutput', expected: '15', exact: true },
    ]);
    expect(result.success).toBe(false);
    expect(result.results[0].success).toBe(false);
    expect(result.results[1].success).toBe(false);
  });

  it('passes when some validators pass and some fail (partial credit scenario)', async () => {
    const ctx = {
      ...makeContext('x = 10', { x: 10 }),
      stdout: '10\n',
    };
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'x', expectedValue: 10 }, // pass
      { type: 'assertOutput', expected: '10', exact: true },             // pass
      { type: 'assertFunctionReturn', functionName: 'foo', args: [], expectedReturn: 1 }, // fail
    ]);
    expect(result.success).toBe(false);
    expect(result.results[0].success).toBe(true);
    expect(result.results[1].success).toBe(true);
    expect(result.results[2].success).toBe(false);
  });
});

// ─────────────────────────────────────────────
// Edge cases and i18n messages
// ─────────────────────────────────────────────

describe('i18n and edge cases', () => {
  it('returns pt-br error messages when validation fails', async () => {
    const ctx = makeContext('nome = "Joao"', { nome: 'Joao' });
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'nome', expectedValue: 'Maria' },
    ]);
    expect(result.results[0].message).toBeDefined();
    expect(result.results[0].message).not.toContain('expectedValue');
  });

  it('returns en-us error messages when language is en-us', async () => {
    const ctx = makeContext('name = "John"', { name: 'John' }, 'en-us');
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'name', expectedValue: 'Mary' },
    ]);
    expect(result.results[0].message).toBeDefined();
    // Should be in English, not Portuguese
    expect(result.results[0].message).not.toContain('esperado');
  });

  it('handles unknown validator type gracefully', async () => {
    const ctx = makeContext('x = 10', { x: 10 });
    const result = await validateExercise(ctx, [
      { type: 'assertUnknown' as never, variableName: 'x', expectedValue: 10 },
    ]);
    expect(result.success).toBe(false);
    expect(result.results[0].message).toContain('assertUnknown');
  });

  it('empty validators array returns success', async () => {
    const ctx = makeContext('x = 10', { x: 10 });
    const result = await validateExercise(ctx, []);
    expect(result.success).toBe(true);
    expect(result.results).toHaveLength(0);
  });

  it('multiple validators all pass', async () => {
    const ctx = {
      ...makeContext('x = 10; print(x)', { x: 10 }),
      stdout: '10\n',
    };
    const result = await validateExercise(ctx, [
      { type: 'assertVariable', variableName: 'x', expectedValue: 10 },
      { type: 'assertOutput', expected: '10', exact: true },
      { type: 'assertNoError' },
    ]);
    expect(result.success).toBe(true);
    expect(result.results).toHaveLength(3);
  });
});
