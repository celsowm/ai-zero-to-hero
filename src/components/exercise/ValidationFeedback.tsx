import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { ValidationResult } from '../../services/exerciseValidators';
import type { Language } from '../../types/slide';
import { getExerciseMessages } from '../../i18n/messages';

interface ValidationFeedbackProps {
  results: ValidationResult[];
  allPassed: boolean;
  someFailed: boolean;
  successMessage: string;
  errorMessage: string;
  language: Language;
}

export const ValidationFeedback: React.FC<ValidationFeedbackProps> = ({
  results,
  allPassed,
  someFailed,
  successMessage,
  errorMessage,
  language,
}) => {
  const msg = getExerciseMessages(language);

  return (
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
  );
};
