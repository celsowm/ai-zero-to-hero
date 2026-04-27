import React from 'react';
import type { IContent } from '../types/slide';
import { useUI } from '../hooks/useUI';
import { DESIGN_SCALE_MULTIPLIER } from '../constants/course';
import { MarkdownRenderer } from './MarkdownRenderer';
import { SlideFrame } from './SlideFrame';

interface CodeSlideProps {
  content: IContent;
}

export const CodeSlide: React.FC<CodeSlideProps> = ({ content }) => {
  const { fontScale } = useUI();

  return (
    <SlideFrame title={content.title} maxWidthClassName="max-w-5xl">
      <div
        style={{
          flex: 1,
          minHeight: 0,
          borderRadius: 16,
          padding: 24,
          background: 'rgba(26, 22, 40, 0.42)',
          border: '1px solid rgba(168, 85, 247, 0.12)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            minHeight: 0,
            overflow: 'auto',
            paddingRight: 4,
            fontSize: 14 * DESIGN_SCALE_MULTIPLIER * fontScale,
            lineHeight: 1.8,
            color: 'var(--sw-text-dim)',
          }}
        >
          <MarkdownRenderer body={content.body} variant="single" codeExplanations={content.codeExplanations} />
        </div>
      </div>
    </SlideFrame>
  );
};
