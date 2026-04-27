import React, { Suspense } from 'react';
import type { Language, SlideVisual } from '../../types/slide';
import { getVisualComponent } from '../../services/visualRegistry';
import { getUiMessages } from '../../i18n/uiMessages';

interface SlideVisualRendererProps {
  visual: SlideVisual;
  language: Language;
}

export const SlideVisualRenderer: React.FC<SlideVisualRendererProps> = ({ visual, language }) => {
  const LazyComponent = getVisualComponent(visual.id);

  if (!LazyComponent) {
    return null;
  }

  const { loadingVisual } = getUiMessages(language);

  return (
    <Suspense fallback={<div style={{ color: 'var(--sw-text-muted)', fontSize: 14 }}>{loadingVisual}</div>}>
      {React.createElement(LazyComponent, { visual, language })}
    </Suspense>
  );
};
