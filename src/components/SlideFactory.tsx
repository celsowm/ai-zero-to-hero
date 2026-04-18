import React from 'react';
import type { ISlide, Language } from '../types/slide';
import { MarkdownSlide } from './MarkdownSlide';
import { TwoColumnSlide } from './TwoColumnSlide';

interface SlideFactoryProps {
  slide: ISlide;
  language: Language;
}

export const SlideFactory: React.FC<SlideFactoryProps> = ({ slide, language }) => {
  const content = slide.content[language];

  switch (slide.type) {
    case 'markdown':
      return <MarkdownSlide content={content} />;
    
    case 'two-column':
      return <TwoColumnSlide slide={slide} language={language} />;
    
    // Futuros tipos de slides serão adicionados aqui (ex: svg-anim, code)
    default:
      return (
        <div className="flex items-center justify-center h-full text-slate-500 italic">
          Slide type "{slide.type}" not yet implemented.
        </div>
      );
  }
};
