import { useCallback } from 'react';
import { useLocale } from '../context/LocaleContext';
import type { Language } from '../types/slide';
import { getExerciseMessages, type ExerciseMessages } from '../i18n/messages';
import { getUiMessages, type UiMessages } from '../i18n/uiMessages';

/**
 * Unified i18n message accessor.
 * Returns typed message getters for exercise and UI namespaces, driven by LocaleContext.
 * Falls back to 'en-us' automatically if a locale is missing (defensive).
 */
export function useT() {
  const { language } = useLocale();

  const exercise = useCallback(
    () => getExerciseMessages(safeLanguage(language)),
    [language],
  );

  const ui = useCallback(
    () => getUiMessages(safeLanguage(language)),
    [language],
  );

  return { exercise, ui };
}

function safeLanguage(lang: Language): Language {
  return lang ?? 'en-us';
}

export type { ExerciseMessages, UiMessages };
