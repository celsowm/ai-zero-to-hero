import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
import { FONT_SCALE_BASE } from '../constants/course';
import { useCourse } from '../context/CourseContext';

interface MarkdownRendererProps {
  body: string;
  variant: 'single' | 'two-column';
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ body, variant }) => {
  const { fontScale } = useCourse();

  return (
    <ReactMarkdown
      rehypePlugins={[[rehypeHighlight, { detect: false }]]}
      components={{
        h1: (props) => <span className="hidden" {...props} />,
        h2: ({ ...props }) => (
          <h2
            style={{
              fontSize: (variant === 'single' ? 18 : 17) * FONT_SCALE_BASE * fontScale,
              fontWeight: 600,
              color: 'var(--sw-text)',
              margin: variant === 'single' ? '32px 0 16px' : '24px 0 14px',
              letterSpacing: '-0.01em',
            }}
            {...props}
          />
        ),
        p: ({ ...props }) => (
          <p style={{ margin: variant === 'single' ? '0 0 20px' : '0 0 16px', lineHeight: variant === 'single' ? 1.8 : 1.75 }} {...props} />
        ),
        ul: ({ ...props }) => (
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              margin: variant === 'single' ? '0 0 24px' : '0 0 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: variant === 'single' ? 12 : 10,
            }}
            {...props}
          />
        ),
        ol: ({ ...props }) => (
          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              margin: variant === 'single' ? '0 0 24px' : '0 0 18px',
              display: 'flex',
              flexDirection: 'column',
              gap: variant === 'single' ? 12 : 10,
              counterReset: 'item',
            }}
            {...props}
          />
        ),
        li: ({ children, ...props }) => (
          <li
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 12,
              paddingLeft: 4,
            }}
            {...props}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--sw-cyan)',
                marginTop: 8,
                flexShrink: 0,
                boxShadow: '0 0 8px rgba(0, 229, 255, 0.4)',
              }}
            />
            <span style={{ flex: 1 }}>{children}</span>
          </li>
        ),
        blockquote: ({ ...props }) => (
          <blockquote
            style={{
              margin: variant === 'single' ? '32px 0' : '24px 0',
              padding: variant === 'single' ? '20px 24px' : '18px 20px',
              borderRadius: 10,
              fontStyle: 'italic',
              fontSize: (variant === 'single' ? 14 : 13) * FONT_SCALE_BASE * fontScale,
              lineHeight: 1.7,
              background: 'rgba(168, 85, 247, 0.05)',
              borderLeft: '3px solid var(--sw-purple)',
              color: 'var(--sw-text-muted)',
            }}
            {...props}
          />
        ),
        strong: ({ ...props }) => (
          <strong
            style={{ color: 'var(--sw-cyan)', fontWeight: 600 }}
            {...props}
          />
        ),
        pre: ({ ...props }) => (
          <pre
            style={{
              margin: variant === 'single' ? '0 0 24px' : '0 0 18px',
              display: 'block',
              width: '100%',
              overflow: 'auto',
              scrollbarGutter: 'stable',
            }}
            {...props}
          />
        ),
        code: ({ className, children, ...props }: React.ComponentPropsWithoutRef<'code'>) => {
          const isBlock = Boolean(className?.includes('hljs') || className?.includes('language-'));

          if (isBlock) {
            return (
              <code
                {...props}
                className={className}
                style={{
                  display: 'block',
                  width: '100%',
                  background: 'transparent',
                  padding: 0,
                  overflow: 'visible',
                  whiteSpace: 'pre',
                  boxSizing: 'border-box',
                }}
              >
                {children}
              </code>
            );
          }

          return (
            <code
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13 * FONT_SCALE_BASE * fontScale,
                color: 'var(--sw-cyan)',
                background: 'transparent',
              }}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {body}
    </ReactMarkdown>
  );
};
