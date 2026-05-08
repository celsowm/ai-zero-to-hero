import React from 'react';
import type { ExerciseItem, Language } from '../../types/slide';
import { ExerciseEditor } from './ExerciseEditor';
import { ValidationFeedback } from './ValidationFeedback';
import { HintSection } from './HintSection';
import { ExerciseInstructions } from './ExerciseInstructions';
import { useExerciseSession } from '../../hooks/useExerciseSession';
import { getExerciseMessages } from '../../i18n/messages';

interface ExerciseCardTwoColumnProps {
  exercise: ExerciseItem;
  runButtonLabel: string;
  checkButtonLabel: string;
  successMessage: string;
  errorMessage: string;
  hintLabel: string;
  outputLabel: string;
  language: Language;
}

export const ExerciseCardTwoColumn: React.FC<ExerciseCardTwoColumnProps> = ({
  exercise,
  runButtonLabel,
  checkButtonLabel,
  successMessage,
  errorMessage,
  hintLabel,
  outputLabel,
  language,
}) => {
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
  } = useExerciseSession(exercise);

  const msg = getExerciseMessages(language);

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '25% 1fr',
        gap: 16,
        flex: 1,
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      {/* Left column: instructions + hints */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          overflowY: 'auto',
          paddingRight: 4,
          minWidth: 0,
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
      </div>

      {/* Right column: editor + console + results */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          minHeight: 0,
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <ExerciseEditor
            key={exercise.id}
            code={code}
            onChange={setCode}
            onRun={handleRun}
            onCheck={() => handleCheck(exercise, language)}
            output={output}
            stderr={stderr}
            isRunning={isRunning}
            runButtonLabel={runButtonLabel}
            checkButtonLabel={checkButtonLabel}
            outputLabel={outputLabel}
            language={language}
          />
        </div>

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
    </div>
  );
};
