export interface ExerciseValidatorBase {
  type: string;
}

export interface AssertOutputValidator extends ExerciseValidatorBase {
  type: 'assertOutput';
  expected: string;
  exact?: boolean;
}

export interface AssertVariableValidator extends ExerciseValidatorBase {
  type: 'assertVariable';
  variableName: string;
  expectedValue: unknown;
  tolerance?: number;
}

export interface AssertFunctionReturnValidator extends ExerciseValidatorBase {
  type: 'assertFunctionReturn';
  functionName: string;
  args: unknown[];
  expectedReturn: unknown;
  tolerance?: number;
}

export interface AssertDerivedVariableValidator extends ExerciseValidatorBase {
  type: 'assertDerivedVariable';
  formulaId: string;
  variableName: string;
  inputs: Record<string, string>;
  tolerance?: number;
}

export interface AssertOutputMatchesVariableValidator extends ExerciseValidatorBase {
  type: 'assertOutputMatchesVariable';
  variableName: string;
}

export interface AssertNoErrorValidator extends ExerciseValidatorBase {
  type: 'assertNoError';
}

export type ExerciseValidator =
  | AssertOutputValidator
  | AssertVariableValidator
  | AssertFunctionReturnValidator
  | AssertDerivedVariableValidator
  | AssertOutputMatchesVariableValidator
  | AssertNoErrorValidator;

export type ExerciseLayout = 'stacked' | 'two-column';

export interface ExerciseItem {
  id: string;
  instructions: string;
  /** Reference to a snippet file in src/content/snippets/ (e.g. "linear-reg-exercise-3-starter").
   *  When present, takes precedence over starterCode. */
  snippetId?: string;
  /** Inline starter code. Used when snippetId is not set (legacy compatibility). */
  starterCode?: string;
  validators: ExerciseValidator[];
  hints?: string[];
}

export interface PythonExerciseVisualCopy {
  title: string;
  description: string;
  exercises: ExerciseItem[];
  layout?: ExerciseLayout;
  runButtonLabel: string;
  checkButtonLabel: string;
  successMessage: string;
  errorMessage: string;
  hintLabel: string;
  outputLabel: string;
}
