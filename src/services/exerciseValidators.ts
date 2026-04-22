import type { PyodideInterface } from 'pyodide';
import type {
  AssertFunctionReturnValidator,
  AssertOutputValidator,
  AssertVariableValidator,
  ExerciseValidator,
} from '../types/slide';

export interface ValidationContext {
  pyodide: PyodideInterface;
  stdout: string;
  stderr: string;
  error?: string;
}

export interface ValidationResult {
  success: boolean;
  message?: string;
}

export type ValidatorStrategy = (
  context: ValidationContext,
  validator: ExerciseValidator,
) => Promise<ValidationResult>;

function jsValue(pyValue: unknown): unknown {
  if (pyValue && typeof pyValue === 'object' && 'toJs' in pyValue && typeof (pyValue as { toJs: unknown }).toJs === 'function') {
    return (pyValue as { toJs: (opts?: unknown) => unknown }).toJs({ dict_converter: Object.fromEntries });
  }
  return pyValue;
}

function compareValues(actual: unknown, expected: unknown, tolerance?: number): boolean {
  if (typeof expected === 'number' && typeof actual === 'number' && tolerance !== undefined) {
    return Math.abs(actual - expected) <= tolerance;
  }
  return JSON.stringify(actual) === JSON.stringify(expected);
}

const assertOutputStrategy: ValidatorStrategy = async (context, validator) => {
  const v = validator as AssertOutputValidator;
  const matched = v.exact
    ? context.stdout.trim() === v.expected.trim()
    : context.stdout.includes(v.expected);

  return {
    success: matched,
    message: matched
      ? undefined
      : `Saída esperada${v.exact ? ' exatamente' : ' contendo'}: "${v.expected}"`,
  };
};

const assertVariableStrategy: ValidatorStrategy = async (context, validator) => {
  const v = validator as AssertVariableValidator;
  const raw = context.pyodide.globals.get(v.variableName);
  const value = jsValue(raw);

  const matched = compareValues(value, v.expectedValue, v.tolerance);

  return {
    success: matched,
    message: matched
      ? undefined
      : `Variável "${v.variableName}" esperada: ${JSON.stringify(v.expectedValue)}, obtida: ${JSON.stringify(value)}`,
  };
};

const assertFunctionReturnStrategy: ValidatorStrategy = async (context, validator) => {
  const v = validator as AssertFunctionReturnValidator;
  const rawFn = context.pyodide.globals.get(v.functionName);

  if (!rawFn || typeof rawFn !== 'function') {
    return { success: false, message: `Função "${v.functionName}" não encontrada` };
  }

  const args = v.args.map((arg) =>
    typeof arg === 'object' && arg !== null ? context.pyodide.toPy(arg) : arg,
  );

  const rawResult = rawFn(...args);
  const result = jsValue(rawResult);
  const matched = compareValues(result, v.expectedReturn, v.tolerance);

  return {
    success: matched,
    message: matched
      ? undefined
      : `Função "${v.functionName}" esperada: ${JSON.stringify(v.expectedReturn)}, obtida: ${JSON.stringify(result)}`,
  };
};

const assertNoErrorStrategy: ValidatorStrategy = async (context) => {
  const hasError = Boolean(context.error) || context.stderr.trim().length > 0;
  return {
    success: !hasError,
    message: hasError ? `Erro na execução: ${context.error || context.stderr}` : undefined,
  };
};

const strategyRegistry: Record<string, ValidatorStrategy> = {
  assertOutput: assertOutputStrategy,
  assertVariable: assertVariableStrategy,
  assertFunctionReturn: assertFunctionReturnStrategy,
  assertNoError: assertNoErrorStrategy,
};

export function registerValidatorStrategy(type: string, strategy: ValidatorStrategy): void {
  strategyRegistry[type] = strategy;
}

export async function validateExercise(
  context: ValidationContext,
  validators: ExerciseValidator[],
): Promise<{ success: boolean; results: ValidationResult[] }> {
  const results: ValidationResult[] = [];

  for (const validator of validators) {
    const strategy = strategyRegistry[validator.type];
    if (!strategy) {
      results.push({ success: false, message: `Tipo de validador desconhecido: ${validator.type}` });
      continue;
    }

    const result = await strategy(context, validator);
    results.push(result);
  }

  const success = results.every((r) => r.success);
  return { success, results };
}
