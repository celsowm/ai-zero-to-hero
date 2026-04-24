import React, { useEffect, useState } from 'react';
import { Lightbulb, ChevronDown, ChevronUp, CheckCircle2, XCircle } from 'lucide-react';
import type { ExerciseItem, Language } from '../../types/slide';
import { usePyodide } from '../../hooks/usePyodide';
import type { ValidationResult } from '../../services/exerciseValidators';
import { ExerciseEditor } from './ExerciseEditor';
import { getExerciseMessages } from '../../i18n/messages';

interface ExerciseCardProps {
  exercise: ExerciseItem;
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
  runButtonLabel,
  checkButtonLabel,
  successMessage,
  errorMessage,
  hintLabel,
  outputLabel,
  language,
}) => {
  const [code, setCode] = useState(exercise.starterCode);
  const [output, setOutput] = useState('');
  const [stderr, setStderr] = useState('');
  const [results, setResults] = useState<ValidationResult[] | null>(null);
  const [showHints, setShowHints] = useState(false);
  const { run, check, status, error: pyodideError } = usePyodide();

  const isRunning = status === 'loading';

  useEffect(() => {
    setCode(exercise.starterCode);
    setOutput('');
    setStderr('');
    setResults(null);
    setShowHints(false);
  }, [exercise.id, exercise.starterCode]);

  const handleRun = async () => {
    setResults(null);
    const res = await run(code);
    setOutput(res.stdout);
    setStderr(res.stderr);
  };

  const handleCheck = async () => {
    const { results: validationResults, runResult } = await check(code, exercise.validators, language);
    setOutput(runResult.stdout);
    setStderr(runResult.stderr);
    setResults(validationResults);
  };

  const allPassed = results?.every((r) => r.success) ?? false;
  const someFailed = results?.some((r) => !r.success) ?? false;
  const msg = getExerciseMessages(language);

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
      {/* Header: instructions + hints */}
      <div style={{ flexShrink: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 600,
            lineHeight: 1.6,
            color: 'var(--sw-text)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {exercise.instructions}
        </div>

        {exercise.hints && exercise.hints.length > 0 && (
          <div style={{ marginTop: 10 }}>
            <button
              type="button"
              onClick={() => setShowHints((prev) => !prev)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--sw-purple)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <Lightbulb size={14} />
              {hintLabel}
              {showHints ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
            {showHints && (
              <ul
                style={{
                  marginTop: 8,
                  paddingLeft: 18,
                  fontSize: 12.5,
                  lineHeight: 1.6,
                  color: 'var(--sw-text-dim)',
                }}
              >
                {exercise.hints.map((hint, idx) => (
                  <li key={idx}>{hint}</li>
                ))}
              </ul>
            )}
          </div>
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
          key={exercise.id}
          code={code}
          onChange={setCode}
          onRun={handleRun}
          onCheck={handleCheck}
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
        <div
          style={{
            padding: 12,
            borderRadius: 10,
            background: allPassed ? 'rgba(52, 211, 153, 0.08)' : 'rgba(248, 113, 113, 0.08)',
            border: `1px solid ${allPassed ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, fontWeight: 700 }}>
            {allPassed ? (
              <>
                <CheckCircle2 size={16} color="#34d399" />
                <span style={{ color: '#34d399' }}>{successMessage}</span>
              </>
            ) : (
              <>
                <XCircle size={16} color="#f87171" />
                <span style={{ color: '#f87171' }}>{errorMessage}</span>
              </>
            )}
          </div>

          {someFailed && (
            <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>
              {results
                .filter((r) => !r.success)
                .map((r, idx) => (
                  <li key={idx}>{r.message}</li>
                ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
