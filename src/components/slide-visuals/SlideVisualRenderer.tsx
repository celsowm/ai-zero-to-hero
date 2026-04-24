import React, { Suspense } from 'react';
import type { Language, SlideVisual } from '../../types/slide';
import { getVisualComponent } from '../../services/visualRegistry';

interface SlideVisualRendererProps {
  visual: SlideVisual;
  language: Language;
}

export const SlideVisualRenderer: React.FC<SlideVisualRendererProps> = ({ visual, language }) => {
  const LazyComponent = getVisualComponent(visual.id);

  if (!LazyComponent) {
    return null;
  }

  return (
    <Suspense fallback={<div style={{ color: 'var(--sw-text-muted)', fontSize: 14 }}>Carregando visual...</div>}>
      <LazyComponent visual={visual} language={language} />
    </Suspense>
  );
};
