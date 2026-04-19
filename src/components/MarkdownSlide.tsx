import React from 'react';
import type { IContent } from '../types/slide';
import { FONT_SCALE_BASE } from '../constants/course';
import { useCourse } from '../context/CourseContext';
import { MarkdownRenderer } from './MarkdownRenderer';
import { SlideFrame } from './SlideFrame';

interface MarkdownSlideProps {
  content: IContent;
}

export const MarkdownSlide: React.FC<MarkdownSlideProps> = ({ content }) => {
  const { fontScale } = useCourse();

  return (
    <SlideFrame title={content.title} maxWidthClassName="max-w-2xl">
      <div
        className="h-full min-h-0 overflow-y-auto pr-1"
        style={{ fontSize: 15 * FONT_SCALE_BASE * fontScale, lineHeight: 1.8, color: 'var(--sw-text-dim)' }}
      >
        <MarkdownRenderer body={content.body} variant="single" />
      </div>
    </SlideFrame>
  );
};
