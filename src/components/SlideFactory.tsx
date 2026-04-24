import React from 'react';
import type { ISlide, Language } from '../types/slide';
import { CodeSlide } from './CodeSlide';
import { CustomVisualSlide } from './CustomVisualSlide';
import { MarkdownSlide } from './MarkdownSlide';
import { TwoColumnSlide } from './TwoColumnSlide';

interface SlideFactoryProps {
  slide: ISlide;
  language: Language;
}

interface SlideRenderer {
  render: (slide: ISlide, language: Language) => React.ReactNode;
}

const slideRenderers: Record<string, SlideRenderer> = {
  markdown: {
    render: (slide, language) => <MarkdownSlide content={slide.content[language]} />,
  },
  'two-column': {
    render: (slide, language) => <TwoColumnSlide slide={slide} language={language} />,
  },
  code: {
    render: (slide, language) => <CodeSlide content={slide.content[language]} />,
  },
  custom: {
    render: (slide, language) => <CustomVisualSlide slide={slide} language={language} />,
  },
  exercise: {
    render: (slide, language) => <CustomVisualSlide slide={slide} language={language} />,
  },
};

export const SlideFactory: React.FC<SlideFactoryProps> = ({ slide, language }) => {
  const renderer = slideRenderers[slide.type];
  if (!renderer) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 italic">
        Slide type &quot;{slide.type}&quot; not yet implemented.
      </div>
    );
  }
  return <>{renderer.render(slide, language)}</>;
};
