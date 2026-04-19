import React from 'react';
import type { Language, SlideVisual } from '../../types/slide';
import {
  InferenceDiagram,
  GradientDescent3DVisual,
  LinearRegression3DChartVisual,
  LinearRegressionNotationVisual,
  LinearRegressionTabsVisual,
  ApiLatencyGrowthVisual,
  NonlinearRegressionBoundaryVisual,
  LearningLoopDiagram,
  LocalizedImageVisual,
  MachineLearningPipelineDiagram,
  ProgressStepperVisual,
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
    case 'nonlinear-regression-boundary':
      return <NonlinearRegressionBoundaryVisual copy={visual.copy[language]} />;
    case 'api-latency-growth':
      return <ApiLatencyGrowthVisual copy={visual.copy[language]} />;
    case 'linear-regression-tabs':
      return <LinearRegressionTabsVisual copy={visual.copy[language]} />;
    case 'gradient-descent-3d':
      return <GradientDescent3DVisual copy={visual.copy[language]} />;
    case 'linear-regression-3d-chart':
      return <LinearRegression3DChartVisual copy={visual.copy[language]} />;
    case 'linear-regression-notation':
      return <LinearRegressionNotationVisual copy={visual.copy[language]} />;
    case 'progress-stepper':
      return <ProgressStepperVisual copy={visual.copy[language]} />;
    default:
      return null;
  }
};
