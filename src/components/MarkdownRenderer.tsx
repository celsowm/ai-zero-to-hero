import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import 'highlight.js/styles/github-dark.css';
import { FONT_SCALE_BASE } from '../constants/course';
import { useCourse } from '../context/CourseContext';
import { CodeBlock } from './CodeBlock';
import type { CodeExplanation } from '../types/slide';

interface MarkdownRendererProps {
  body: string;
  variant: 'single' | 'two-column';
  codeExplanations?: CodeExplanation[];
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ body, variant, codeExplanations }) => {
  const { fontScale } = useCourse();

  // Slides use $$...$$ for inline math, but remark-math treats $$ as block math.
  // Convert $$...$$ that appear within a line (no newlines inside) to $...$
  const processedBody = body.replace(/\$\$([^$\n]+?)\$\$/g, (_match, inner: string) => `$${inner}$`);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
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
                // Align bullet with the first text line center (not the whole multi-line block)
                marginTop: 'calc(0.875em - 3px)',
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
        table: ({ ...props }) => (
          <div
            style={{
              width: '100%',
              overflowX: 'auto',
              margin: variant === 'single' ? '0 0 24px' : '0 0 18px',
              borderRadius: 14,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            <table
              style={{
                width: '100%',
                minWidth: 520,
                borderCollapse: 'collapse',
                fontSize: 13 * FONT_SCALE_BASE * fontScale,
              }}
              {...props}
            />
          </div>
        ),
        thead: ({ ...props }) => <thead style={{ background: 'rgba(255,255,255,0.04)' }} {...props} />,
        th: ({ ...props }) => (
          <th
            style={{
              padding: '10px 12px',
              textAlign: 'left',
              color: 'var(--sw-text)',
              fontSize: 11.5 * FONT_SCALE_BASE * fontScale,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
              whiteSpace: 'nowrap',
            }}
            {...props}
          />
        ),
        td: ({ ...props }) => (
          <td
            style={{
              padding: '10px 12px',
              color: 'var(--sw-text-dim)',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              whiteSpace: 'nowrap',
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
        pre: ({ children }) => (
          <div style={{ margin: variant === 'single' ? '0 0 24px' : '0 0 18px', width: '100%' }}>
            {children}
          </div>
        ),
        code: ({
          className,
          children,
          inline,
          ...rest
        }: React.ComponentPropsWithoutRef<'code'> & {
          inline?: boolean;
        }) => {
          const match = /language-(\w+)/.exec(className || '');
          const isBlock = !inline && match;

          if (isBlock) {
            const language = match[1];
            const codeString = String(children).replace(/\n$/, '');

            return (
              <div style={{
                borderRadius: 12,
                background: 'rgba(13, 11, 21, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '16px 12px',
                width: '100%',
                boxSizing: 'border-box',
                marginBottom: 24,
                position: 'relative'
              }}>
                <CodeBlock 
                  code={codeString} 
                  language={language}
                  explanations={codeExplanations}
                />
              </div>
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
              {...rest}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {processedBody}
    </ReactMarkdown>
  );
};
