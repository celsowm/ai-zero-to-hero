import React from 'react';
import type { Language, SlideVisual } from '../../types/slide';
import { InferenceDiagram } from '../visuals/inference/InferenceDiagram';

interface SlideVisualRendererProps {
  visual: SlideVisual;
  language: Language;
}

export const SlideVisualRenderer: React.FC<SlideVisualRendererProps> = ({ visual, language }) => {
  switch (visual.id) {
    case 'inference-diagram':
      return <InferenceDiagram copy={visual.copy[language]} />;
    default:
      return null;
  }
};
