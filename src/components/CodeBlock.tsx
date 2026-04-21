import React, { useMemo, useState } from 'react';
import hljs from 'highlight.js';
import { Copy, Check } from 'lucide-react';
import 'highlight.js/styles/github-dark.css';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A component that renders a code block with syntax highlighting,
 * line numbers, and a copy button.
 */
export const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'javascript', 
  className, 
  style 
}) => {
  const [copied, setCopied] = useState(false);

  const highlighted = useMemo(() => {
    try {
      return hljs.highlight(code, { language }).value;
    } catch (e) {
      console.warn(`Highlight.js error for language "${language}":`, e);
      // Fallback to plain text if highlighting fails
      return code.replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      }[m] || m));
    }
  }, [code, language]);

  const lineNumbers = useMemo(() => {
    const lines = code.trim().split('\n');
    return lines.map((_, i) => i + 1).join('\n');
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Copy Button - Fixed at top-right */}
      <div style={{ position: 'absolute', top: -4, right: 8, zIndex: 20 }}>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            padding: '8px',
            borderRadius: '8px',
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: copied ? 'var(--sw-cyan)' : 'var(--sw-text-muted)',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(12px)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          }}
          title="Copy code"
        >
          {copied ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Check size={14} strokeWidth={3} />
              <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Copied</span>
            </div>
          ) : (
            <Copy size={14} strokeWidth={2.5} />
          )}
        </button>
      </div>

      <div style={{ display: 'flex', width: '100%', height: '100%', overflow: 'auto' }}>
        {/* Line Numbers - Sticky left to stay visible during horizontal scroll */}
        <div
          style={{
            padding: '0 8px 0 0',
            textAlign: 'right',
            userSelect: 'none',
            color: 'rgba(255, 255, 255, 0.12)',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
            fontSize: '12.5px',
            lineHeight: '1.65',
            borderRight: '1px solid rgba(255, 255, 255, 0.05)',
            marginRight: '8px',
            minWidth: '1.75rem',
            whiteSpace: 'pre',
            position: 'sticky',
            left: 0,
            background: 'transparent',
            zIndex: 5,
          }}
        >
          {lineNumbers}
        </div>

        {/* Highlighted Code */}
        <pre 
          className={className} 
          style={{ 
            margin: 0, 
            padding: 0, 
            background: 'transparent', 
            overflow: 'visible',
            flex: 1,
            ...style 
          }}
        >
          <code
            className={`hljs language-${language}`}
            style={{ 
              background: 'transparent',
              padding: 0,
              display: 'block',
              width: '100%',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace',
              fontSize: '12.5px',
              lineHeight: '1.65',
              color: 'rgba(243, 244, 246, 0.95)',
            }}
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </pre>
      </div>
    </div>
  );
};
