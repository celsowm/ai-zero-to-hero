import React from 'react';
import type { Language, SlideVisual } from '../../types/slide';
import { InferenceDiagram } from '../visuals/inference/InferenceDiagram';
import { LearningLoopDiagram } from '../visuals/learning-loop/LearningLoopDiagram';

interface SlideVisualRendererProps {
  visual: SlideVisual;
  language: Language;
}

export const SlideVisualRenderer: React.FC<SlideVisualRendererProps> = ({ visual, language }) => {
  switch (visual.id) {
    case 'inference-diagram':
      return <InferenceDiagram copy={visual.copy[language]} />;
    case 'learning-loop-diagram':
      return <LearningLoopDiagram copy={visual.copy[language]} />;
    default:
      return null;
  }
};
