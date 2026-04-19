import React from 'react';
import type { Language, SlideVisual } from '../../types/slide';
import {
  InferenceDiagram,
  LinearRegressionTabsVisual,
  LearningLoopDiagram,
  LocalizedImageVisual,
  MachineLearningPipelineDiagram,
} from '../visuals';

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
    case 'localized-image':
      return <LocalizedImageVisual copy={visual.copy[language]} />;
    case 'machine-learning-pipeline':
      return <MachineLearningPipelineDiagram copy={visual.copy[language]} />;
    case 'linear-regression-tabs':
      return <LinearRegressionTabsVisual copy={visual.copy[language]} />;
    default:
      return null;
  }
};
