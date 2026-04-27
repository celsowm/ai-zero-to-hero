import React from 'react';
import type { IContent } from '../types/slide';
import { useUI } from '../hooks/useUI';
import { DESIGN_SCALE_MULTIPLIER } from '../constants/course';
import { MarkdownRenderer } from './MarkdownRenderer';
import { SlideFrame } from './SlideFrame';

interface MarkdownSlideProps {
  content: IContent;
}

export const MarkdownSlide: React.FC<MarkdownSlideProps> = ({ content }) => {
  const { fontScale } = useUI();

  return (
    <SlideFrame title={content.title} maxWidthClassName="max-w-2xl">
      <div
        className="h-full min-h-0 overflow-y-auto pr-1"
        style={{ fontSize: 15 * DESIGN_SCALE_MULTIPLIER * fontScale, lineHeight: 1.8, color: 'var(--sw-text-dim)' }}
      >
        <MarkdownRenderer body={content.body} variant="single" codeExplanations={content.codeExplanations} />
      </div>
    </SlideFrame>
  );
};
