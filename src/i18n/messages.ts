import type { Language } from '../types/slide';

export interface ExerciseMessages {
  expectedOutputExactly: string;
  expectedOutputContaining: string;
  variableNotNumeric: (name: string, value: unknown) => string;
  variableExpected: (name: string, expected: unknown, actual: unknown) => string;
  functionNotFound: (name: string) => string;
  functionExpected: (name: string, expected: unknown, actual: unknown) => string;
  unknownFormula: (formulaId: string) => string;
  validationFailure: (variableName: string, message: string) => string;
  expectedOutputForVariable: (name: string, expected: string, actual: string, value: unknown) => string;
  executionError: (error: string) => string;
  unknownValidatorType: (type: string) => string;
  errorLabel: string;
  noOutputPlaceholder: string;
  pyodideLoadFailed: string;
}

const ptBr: ExerciseMessages = {
  expectedOutputExactly: 'Saída esperada exatamente',
  expectedOutputContaining: 'Saída esperada contendo',
  variableNotNumeric: (name, value) => `Variável "${name}" não é numérica: ${JSON.stringify(value)}`,
  variableExpected: (name, expected, actual) =>
    `Variável "${name}" esperada: ${JSON.stringify(expected)}, obtida: ${JSON.stringify(actual)}`,
  functionNotFound: (name) => `Função "${name}" não encontrada`,
  functionExpected: (name, expected, actual) =>
    `Função "${name}" esperada: ${JSON.stringify(expected)}, obtida: ${JSON.stringify(actual)}`,
  unknownFormula: (formulaId) => `Fórmula desconhecida: ${formulaId}`,
  validationFailure: (variableName, message) =>
    `Falha ao validar a variável "${variableName}": ${message}`,
  expectedOutputForVariable: (name, expected, actual, value) =>
    `Saída esperada para "${name}": "${expected}", obtida: "${actual}" (valor atual: ${JSON.stringify(value)})`,
  executionError: (error) => `Erro na execução: ${error}`,
  unknownValidatorType: (type) => `Tipo de validador desconhecido: ${type}`,
  errorLabel: 'Erro',
  noOutputPlaceholder: 'Execute ou verifique para ver a saída.',
  pyodideLoadFailed: 'Falha ao carregar o interpretador Python',
};

const enUs: ExerciseMessages = {
  expectedOutputExactly: 'Expected output exactly',
  expectedOutputContaining: 'Expected output containing',
  variableNotNumeric: (name, value) => `Variable "${name}" is not numeric: ${JSON.stringify(value)}`,
  variableExpected: (name, expected, actual) =>
    `Expected variable "${name}": ${JSON.stringify(expected)}, got: ${JSON.stringify(actual)}`,
  functionNotFound: (name) => `Function "${name}" not found`,
  functionExpected: (name, expected, actual) =>
    `Expected function "${name}": ${JSON.stringify(expected)}, got: ${JSON.stringify(actual)}`,
  unknownFormula: (formulaId) => `Unknown formula: ${formulaId}`,
  validationFailure: (variableName, message) =>
    `Failed to validate variable "${variableName}": ${message}`,
  expectedOutputForVariable: (name, expected, actual, value) =>
    `Expected output for "${name}": "${expected}", got: "${actual}" (current value: ${JSON.stringify(value)})`,
  executionError: (error) => `Execution error: ${error}`,
  unknownValidatorType: (type) => `Unknown validator type: ${type}`,
  errorLabel: 'Error',
  noOutputPlaceholder: 'Run or check to see the output.',
  pyodideLoadFailed: 'Failed to load Python interpreter',
};

const messages: Record<Language, ExerciseMessages> = {
  'pt-br': ptBr,
  'en-us': enUs,
};

export function getExerciseMessages(lang: Language): ExerciseMessages {
  return messages[lang];
}
