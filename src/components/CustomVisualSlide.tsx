import React from 'react';
import type { ISlide, Language } from '../types/slide';
import { SlideFrame } from './SlideFrame';
import { SlideVisualRenderer } from './slide-visuals';

interface CustomVisualSlideProps {
  slide: ISlide;
  language: Language;
}

export const CustomVisualSlide: React.FC<CustomVisualSlideProps> = ({ slide, language }) => {
  const content = slide.content[language];

  if (!slide.visual) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500 italic">
        Custom slide "{slide.id}" has no visual configured.
      </div>
    );
  }

  return (
    <SlideFrame title={content.title} maxWidthClassName="max-w-6xl">
      <div style={{ flex: 1, minHeight: 0, display: 'flex', overflow: 'hidden' }}>
        <SlideVisualRenderer visual={slide.visual} language={language} />
      </div>
    </SlideFrame>
  );
};
