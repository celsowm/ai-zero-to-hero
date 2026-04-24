import type { Language } from '../types/slide';

export interface UiMessages {
  // SearchModal
  searchPlaceholder: string;
  searchEmptyTitle: string;
  searchEmptyDesc: string;
  searchNoResults: string;
  searchSelect: string;
  searchNavigate: string;

  // Sidebar
  searchButton: string;
  languageLabel: string;

  // SlideVisualRenderer
  loadingVisual: string;
}

const ptBr: UiMessages = {
  searchPlaceholder: 'O que você quer aprender?',
  searchEmptyTitle: 'BUSCA RÁPIDA',
  searchEmptyDesc: 'Digite o título de um tópico para pular diretamente para o conteúdo.',
  searchNoResults: 'Nenhum slide encontrado',
  searchSelect: 'Selecionar',
  searchNavigate: 'Navegar',
  searchButton: 'Buscar...',
  languageLabel: 'Português (BR)',
  loadingVisual: 'Carregando visual...',
};

const enUs: UiMessages = {
  searchPlaceholder: 'What do you want to learn?',
  searchEmptyTitle: 'QUICK SEARCH',
  searchEmptyDesc: 'Type a topic title to jump directly to the content.',
  searchNoResults: 'No slides found',
  searchSelect: 'Select',
  searchNavigate: 'Navigate',
  searchButton: 'Search...',
  languageLabel: 'English (US)',
  loadingVisual: 'Loading visual...',
};

const uiMessages: Record<Language, UiMessages> = {
  'pt-br': ptBr,
  'en-us': enUs,
};

export function getUiMessages(lang: Language): UiMessages {
  return uiMessages[lang];
}
