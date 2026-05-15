export const SUPPORTED_LANGUAGES = ['pt-br', 'en-us'] as const;
export type Language = typeof SUPPORTED_LANGUAGES[number];

export const DEFAULT_LANGUAGE: Language = 'pt-br';

export function isSupportedLanguage(lang: string): lang is Language {
  return SUPPORTED_LANGUAGES.includes(lang as Language);
}
