import React, { useMemo } from 'react';
import type { ExerciseItem, ExerciseLayout, Language } from '../../types/slide';
import { resolveSnippetCode } from '../../content/registry';
import { ExerciseEditor } from './ExerciseEditor';
import { ValidationFeedback } from './ValidationFeedback';
import { HintSection } from './HintSection';
import { ExerciseInstructions } from './ExerciseInstructions';
import { ExerciseCardTwoColumn } from './ExerciseCardTwoColumn';
import { useExerciseSession } from '../../hooks/useExerciseSession';
import { getExerciseMessages } from '../../i18n/messages';

interface ExerciseCardProps {
  exercise: ExerciseItem;
  layout?: ExerciseLayout;
  runButtonLabel: string;
  checkButtonLabel: string;
  successMessage: string;
  errorMessage: string;
  hintLabel: string;
  outputLabel: string;
  language: Language;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  layout = 'stacked',
  runButtonLabel,
  checkButtonLabel,
  successMessage,
  errorMessage,
  hintLabel,
  outputLabel,
  language,
}) => {
  // Resolve starter code from snippet file if snippetId is present,
  // otherwise fall back to inline starterCode (legacy compatibility).
  const resolvedExercise = useMemo<ExerciseItem>(() => {
    if (exercise.snippetId) {
      try {
        const starterCode = resolveSnippetCode(
          { snippetId: exercise.snippetId, language: 'python' },
          language,
        );
        return { ...exercise, starterCode };
      } catch {
        // Snippet not found — fall back to inline starterCode if available
        return { ...exercise, starterCode: exercise.starterCode ?? '' };
      }
    }
    return { ...exercise, starterCode: exercise.starterCode ?? '' };
  }, [exercise, language]);

  // Hooks must be called unconditionally (rules of hooks)
  const session = useExerciseSession(resolvedExercise);
  const msg = getExerciseMessages(language);

  // Two-column layout: delegate to specialized component
  if (layout === 'two-column') {
    return (
      <ExerciseCardTwoColumn
        exercise={resolvedExercise}
        runButtonLabel={runButtonLabel}
        checkButtonLabel={checkButtonLabel}
        successMessage={successMessage}
        errorMessage={errorMessage}
        hintLabel={hintLabel}
        outputLabel={outputLabel}
        language={language}
      />
    );
  }

  // Default: stacked layout (instructions above editor)
  const {
    code,
    setCode,
    output,
    stderr,
    results,
    showHints,
    setShowHints,
    isRunning,
    pyodideError,
    allPassed,
    someFailed,
    handleRun,
    handleCheck,
  } = session;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {/* Header: instructions + hints — scrollable, max 45% height */}
      <div
        style={{
          flexShrink: 0,
          maxHeight: '45%',
          overflowY: 'auto',
          paddingRight: 4,
        }}
      >
        <ExerciseInstructions>{exercise.instructions}</ExerciseInstructions>

        {exercise.hints && exercise.hints.length > 0 && (
          <HintSection
            hints={exercise.hints}
            hintLabel={hintLabel}
            showHints={showHints}
            onToggle={() => setShowHints((prev) => !prev)}
          />
        )}
      </div>

      {pyodideError && (
        <div
          style={{
            padding: 12,
            borderRadius: 8,
            background: 'rgba(248, 113, 113, 0.1)',
            border: '1px solid rgba(248, 113, 113, 0.2)',
            color: '#f87171',
            fontSize: 13,
            flexShrink: 0,
          }}
        >
          {msg.pyodideLoadFailed}: {pyodideError}
        </div>
      )}

      {/* Editor */}
      <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <ExerciseEditor
          key={resolvedExercise.id}
          code={code}
          onChange={setCode}
          onRun={handleRun}
          onCheck={() => handleCheck(resolvedExercise, language)}
          output={output}
          stderr={stderr}
          isRunning={isRunning}
          runButtonLabel={runButtonLabel}
          checkButtonLabel={checkButtonLabel}
          outputLabel={outputLabel}
          language={language}
        />
      </div>

      {/* Results */}
      {results && (
        <ValidationFeedback
          results={results}
          allPassed={allPassed}
          someFailed={someFailed}
          successMessage={successMessage}
          errorMessage={errorMessage}
        />
      )}
    </div>
  );
};
