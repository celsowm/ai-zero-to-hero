import type { PyodideInterface } from 'pyodide';
import type {
  AssertDerivedVariableValidator,
  AssertFunctionReturnValidator,
  AssertOutputValidator,
  AssertOutputMatchesVariableValidator,
  AssertVariableValidator,
  ExerciseValidator,
} from '../types/slide';
import type { Language } from '../types/slide';
import { getExerciseMessages } from '../i18n/messages';

export interface ValidationContext {
  pyodide: PyodideInterface;
  stdout: string;
  stderr: string;
  error?: string;
  language: Language;
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

function getGlobalValue(context: ValidationContext, variableName: string): unknown {
  const raw = context.pyodide.globals.get(variableName);
  return jsValue(raw);
}

function getGlobalNumber(context: ValidationContext, variableName: string): number {
  const value = getGlobalValue(context, variableName);
  const numeric = typeof value === 'number' ? value : Number(value);
  const msg = getExerciseMessages(context.language);

  if (!Number.isFinite(numeric)) {
    throw new Error(msg.variableNotNumeric(variableName, value));
  }

  return numeric;
}

const assertOutputStrategy: ValidatorStrategy = async (context, validator) => {
  const v = validator as AssertOutputValidator;
  const msg = getExerciseMessages(context.language);
  const matched = v.exact
    ? context.stdout.trim() === v.expected.trim()
    : context.stdout.includes(v.expected);

  return {
    success: matched,
    message: matched
      ? undefined
      : v.exact
        ? `${msg.expectedOutputExactly}: "${v.expected}"`
        : `${msg.expectedOutputContaining}: "${v.expected}"`,
  };
};

const assertVariableStrategy: ValidatorStrategy = async (context, validator) => {
  const v = validator as AssertVariableValidator;
  const msg = getExerciseMessages(context.language);
  const raw = context.pyodide.globals.get(v.variableName);
  const value = jsValue(raw);

  const matched = compareValues(value, v.expectedValue, v.tolerance);

  return {
    success: matched,
    message: matched
      ? undefined
      : msg.variableExpected(v.variableName, v.expectedValue, value),
  };
};

const assertFunctionReturnStrategy: ValidatorStrategy = async (context, validator) => {
  const v = validator as AssertFunctionReturnValidator;
  const msg = getExerciseMessages(context.language);
  const rawFn = context.pyodide.globals.get(v.functionName);

  if (!rawFn || typeof rawFn !== 'function') {
    return { success: false, message: msg.functionNotFound(v.functionName) };
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
      : msg.functionExpected(v.functionName, v.expectedReturn, result),
  };
};

type DerivedValueResolver = (inputs: Record<string, number>) => unknown;

const derivedValueRegistry: Record<string, DerivedValueResolver> = {
  bmi: ({ altura, peso }) => peso / ((altura / 100) ** 2),
  bmi_en: ({ height, weight }) => weight / ((height / 100) ** 2),
};

const assertDerivedVariableStrategy: ValidatorStrategy = async (context, validator) => {
  const v = validator as AssertDerivedVariableValidator;
  const msg = getExerciseMessages(context.language);
  const resolver = derivedValueRegistry[v.formulaId];

  if (!resolver) {
    return {
      success: false,
      message: msg.unknownFormula(v.formulaId),
    };
  }

  try {
    const inputs = Object.fromEntries(
      Object.entries(v.inputs).map(([paramName, variableName]) => [paramName, getGlobalNumber(context, variableName)]),
    ) as Record<string, number>;

    const expected = resolver(inputs);
    const actual = getGlobalValue(context, v.variableName);
    const matched = compareValues(actual, expected, v.tolerance);

    return {
      success: matched,
      message: matched
        ? undefined
        : msg.validationFailure(v.variableName, `expected by formula "${v.formulaId}", got: ${JSON.stringify(actual)}`),
    };
  } catch (error) {
    return {
      success: false,
      message: msg.validationFailure(v.variableName, error instanceof Error ? error.message : String(error)),
    };
  }
};

const assertOutputMatchesVariableStrategy: ValidatorStrategy = async (context, validator) => {
  const v = validator as AssertOutputMatchesVariableValidator;
  const msg = getExerciseMessages(context.language);

  try {
    const value = getGlobalValue(context, v.variableName);
    const expectedOutput = String(value);
    const matched = context.stdout.trim() === expectedOutput;

    return {
      success: matched,
      message: matched
        ? undefined
        : msg.expectedOutputForVariable(v.variableName, expectedOutput, context.stdout.trim(), value),
    };
  } catch (error) {
    return {
      success: false,
      message: msg.validationFailure(v.variableName, error instanceof Error ? error.message : String(error)),
    };
  }
};

const assertNoErrorStrategy: ValidatorStrategy = async (context) => {
  const msg = getExerciseMessages(context.language);
  const hasError = Boolean(context.error) || context.stderr.trim().length > 0;
  return {
    success: !hasError,
    message: hasError ? msg.executionError(context.error || context.stderr) : undefined,
  };
};

const strategyRegistry: Record<string, ValidatorStrategy> = {
  assertOutput: assertOutputStrategy,
  assertVariable: assertVariableStrategy,
  assertFunctionReturn: assertFunctionReturnStrategy,
  assertDerivedVariable: assertDerivedVariableStrategy,
  assertOutputMatchesVariable: assertOutputMatchesVariableStrategy,
  assertNoError: assertNoErrorStrategy,
};

export function registerValidatorStrategy(type: string, strategy: ValidatorStrategy): void {
  strategyRegistry[type] = strategy;
}

export async function validateExercise(
  context: ValidationContext,
  validators: ExerciseValidator[],
): Promise<{ success: boolean; results: ValidationResult[] }> {
  const msg = getExerciseMessages(context.language);
  const results: ValidationResult[] = [];

  for (const validator of validators) {
    const strategy = strategyRegistry[validator.type];
    if (!strategy) {
      results.push({ success: false, message: msg.unknownValidatorType(validator.type) });
      continue;
    }

    const result = await strategy(context, validator);
    results.push(result);
  }

  const success = results.every((r) => r.success);
  return { success, results };
}
