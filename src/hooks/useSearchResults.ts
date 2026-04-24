import { useMemo } from 'react';
import type { ISlide, Language } from '../types/slide';

interface SearchResult {
  index: number;
  id: string;
  title: string;
  preview: string;
}

/**
 * Filters slides by title/body match against the user's search query.
 */
export function useSearchResults(
  slides: ISlide[],
  query: string,
  language: Language,
): SearchResult[] {
  return useMemo(() => {
    if (!query.trim()) return [];
    const normalizedQuery = query.toLowerCase().trim();
    return slides
      .map((slide, index) => {
        const title = slide.content[language].title;
        const body = slide.content[language].body;
        if (title.toLowerCase().includes(normalizedQuery) || body.toLowerCase().includes(normalizedQuery)) {
          return { index, id: slide.id, title, preview: body.substring(0, 80) + '...' };
        }
        return null;
      })
      .filter((r): r is SearchResult => r !== null);
  }, [query, slides, language]);
}
