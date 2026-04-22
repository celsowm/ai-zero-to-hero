import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import hljs from 'highlight.js';
import { Copy, Check, Info } from 'lucide-react';
import type { CodeExplanation as ICodeExplanation, CodeSourceRef } from '../types/slide';
import { useCourse } from '../context/CourseContext';
import { resolveSnippetCode } from '../content/registry';
import 'highlight.js/styles/github-dark.css';

export type CodeExplanation = ICodeExplanation;

interface CodeBlockProps {
  code?: string;
  language?: string;
  className?: string;
  explanations?: CodeExplanation[];
  activeRange?: [number, number] | null;
  compact?: boolean;
  sourceRef?: CodeSourceRef;
}

/**
 * A modern tooltip for code explanations.
 */
const ExplanationTooltip: React.FC<{
  content: string;
  top: number;
  left: number;
  visible: boolean;
}> = ({ content, top, left, visible }) => {
  if (!visible || typeof document === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        left,
        top,
        width: '280px',
        zIndex: 100,
        pointerEvents: 'none',
        animation: 'tooltipIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        transform: 'translateY(-50%)',
      }}
    >
      <div
        style={{
          padding: '16px',
          borderRadius: '12px',
          background: 'rgba(26, 22, 40, 0.9)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          boxShadow: '0 12px 32px rgba(0,0,0,0.4), 0 0 20px rgba(168, 85, 247, 0.1)',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Info size={16} color="var(--sw-purple)" style={{ flexShrink: 0, marginTop: 2 }} />
          <div
            style={{
              fontSize: '13px',
              lineHeight: '1.6',
              color: 'var(--sw-text)',
              fontWeight: 400,
            }}
          >
            {content}
          </div>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes tooltipIn {
          from { opacity: 0; transform: translateX(-10px) translateY(-50%); }
          to { opacity: 1; transform: translateX(0) translateY(-50%); }
        }
      `,
        }}
      />
    </div>,
    document.body,
  );
};

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'javascript',
  className,
  explanations = [],
  activeRange,
  compact = false,
  sourceRef,
}) => {
  const { fontScale, language: courseLanguage } = useCourse();
  const [copied, setCopied] = useState(false);
  const [hoveredRange, setHoveredRange] = useState<[number, number] | null>(null);
  const [tooltipData, setTooltipData] = useState<{ content: string; top: number; left: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);

  const resolvedCode = useMemo(() => {
    if (!sourceRef) {
      return code ?? '';
    }

    try {
      return resolveSnippetCode(sourceRef, courseLanguage);
    } catch (error) {
      console.error(`Failed to resolve snippet "${sourceRef.snippetId}"`, error);
      return code ?? '';
    }
  }, [code, courseLanguage, sourceRef]);

  const codeFontSize = (compact ? 10 : 11.5) * fontScale;
  const uiFontSize = (compact ? 9 : 10) * fontScale;
  const lineHeight = compact ? 1.55 : 1.7;

  const lang = useMemo(() => {
    const l = language.toLowerCase();
    if (l === 'py') return 'python';
    if (l === 'js') return 'javascript';
    return l;
  }, [language]);

  const processedLines = useMemo(() => {
    const highlighted = hljs.getLanguage(lang)
      ? hljs.highlight(resolvedCode, { language: lang }).value
      : hljs.highlightAuto(resolvedCode).value;

    return highlighted.split('\n');
  }, [lang, resolvedCode]);

  const visualRange = activeRange !== undefined ? activeRange : hoveredRange;

  useEffect(() => {
    if (!scrollerRef.current) {
      return;
    }

    scrollerRef.current.scrollTo({
      left: 0,
      top: 0,
      behavior: 'auto',
    });
  }, [resolvedCode]);

  useEffect(() => {
    if (!activeRange) {
      return;
    }

    const targetLine = lineRefs.current[activeRange[0] - 1];
    if (!targetLine) {
      return;
    }

    targetLine.scrollIntoView({
      block: 'center',
      behavior: 'smooth',
    });
  }, [activeRange]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resolvedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code', err);
    }
  };

  const onLineMouseEnter = (lineIdx: number, e: React.MouseEvent) => {
    if (activeRange !== undefined) {
      return;
    }

    const activeExpl = explanations.find(
      exp => lineIdx + 1 >= exp.lineRange[0] && lineIdx + 1 <= exp.lineRange[1],
    );

    if (activeExpl) {
      setHoveredRange(activeExpl.lineRange);

      if (containerRef.current) {
        const rect = e.currentTarget.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const tooltipWidth = 280;
        const gutter = 12;
        const leftAnchor = Math.max(8, containerRect.left - tooltipWidth - gutter);
        setTooltipData({
          content: activeExpl.content,
          top: rect.top + rect.height / 2,
          left: leftAnchor,
        });
      }
    } else {
      setHoveredRange(null);
      setTooltipData(null);
    }
  };

  const onLineMouseLeave = () => {
    if (activeRange !== undefined) {
      return;
    }

    setHoveredRange(null);
    setTooltipData(null);
  };

  const shellStyle: React.CSSProperties = compact
    ? {
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        minHeight: 0,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 8,
        background: 'rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(255,255,255,0.05)',
      }
    : {
        display: 'flex',
        flex: 1,
        minHeight: 0,
        width: '100%',
        overflow: 'visible',
        position: 'relative',
        borderRadius: 8,
        background: 'rgba(0, 0, 0, 0.2)',
      };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'JetBrains Mono', monospace",
      }}
    >
      {tooltipData && (
        <ExplanationTooltip
          content={tooltipData.content}
          top={tooltipData.top}
          left={tooltipData.left}
          visible={!!tooltipData}
        />
      )}

      {!compact && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
            padding: '0 4px',
          }}
        >
          <div
            style={{
              fontSize: uiFontSize,
              fontWeight: 800,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--sw-cyan)',
              opacity: 0.8,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--sw-cyan)' }} />
            {lang}
          </div>

          <button
            type="button"
            onClick={handleCopy}
            style={{
              padding: '6px',
              borderRadius: '6px',
              background: copied ? 'rgba(52, 211, 153, 0.1)' : 'rgba(255, 255, 255, 0.04)',
              border: `1px solid ${copied ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.08)'}`,
              color: copied ? '#34d399' : 'var(--sw-text-muted)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}
            title={copied ? 'Copied' : 'Copy code'}
          >
            {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
          </button>
        </div>
      )}

      {compact && (
        <button
          type="button"
          onClick={handleCopy}
          style={{
            position: 'absolute',
            top: 6,
            right: 6,
            width: 30,
            height: 30,
            borderRadius: 8,
            background: copied ? 'rgba(52, 211, 153, 0.12)' : 'rgba(255, 255, 255, 0.05)',
            border: `1px solid ${copied ? 'rgba(52, 211, 153, 0.22)' : 'rgba(255, 255, 255, 0.08)'}`,
            color: copied ? '#34d399' : 'var(--sw-text-muted)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backdropFilter: 'blur(8px)',
            flexShrink: 0,
            zIndex: 10,
          }}
          title={copied ? 'Copied' : 'Copy code'}
        >
          {copied ? <Check size={14} strokeWidth={3} /> : <Copy size={14} strokeWidth={2.5} />}
        </button>
      )}

      <div style={shellStyle}>
        <div
          ref={scrollerRef}
          style={{
            display: 'flex',
            width: '100%',
            minHeight: 0,
            overflow: 'auto',
            maxHeight: 420,
          }}
        >
          <div
            style={{
              position: 'sticky',
              left: 0,
              padding: compact ? '12px 12px 12px 8px' : '16px 12px 16px 8px',
              textAlign: 'right',
              userSelect: 'none',
              color: 'rgba(255, 255, 255, 0.15)',
              fontSize: codeFontSize,
              lineHeight,
              borderRight: '1px solid rgba(255, 255, 255, 0.05)',
              minWidth: compact ? 18 : '2.5rem',
              whiteSpace: 'pre',
              background: 'rgba(13, 11, 21, 0.86)',
              zIndex: 5,
              borderRadius: compact ? '8px 0 0 8px' : '8px 0 0 8px',
            }}
          >
            {processedLines.map((_, i) => (
              <div
                key={i}
                style={{
                  height: `${lineHeight}em`,
                  color: visualRange && i + 1 >= visualRange[0] && i + 1 <= visualRange[1] ? 'var(--sw-cyan)' : 'inherit',
                  transition: 'color 0.2s ease',
                }}
              >
                {i + 1}
              </div>
            ))}
          </div>

          <div style={{ flex: 1, minHeight: 0, padding: compact ? '12px 0' : '16px 0' }}>
            {processedLines.map((lineHtml, i) => {
              const isHighlighted = visualRange && i + 1 >= visualRange[0] && i + 1 <= visualRange[1];
              const isDimmed = visualRange && !isHighlighted;

              return (
                <div
                  key={i}
                  ref={(node) => {
                    lineRefs.current[i] = node;
                  }}
                  onMouseEnter={(e) => onLineMouseEnter(i, e)}
                  onMouseLeave={onLineMouseLeave}
                  style={{
                    padding: compact ? '0 12px' : '0 16px',
                    height: `${lineHeight}em`,
                    width: 'max-content',
                    minWidth: '100%',
                    background: isHighlighted
                      ? compact
                        ? 'rgba(56, 189, 248, 0.12)'
                        : 'rgba(168, 85, 247, 0.15)'
                      : 'transparent',
                    borderLeft: isHighlighted && compact ? '2px solid #38bdf8' : '2px solid transparent',
                    opacity: isDimmed ? 0.3 : 1,
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    whiteSpace: 'pre',
                    fontSize: codeFontSize,
                    lineHeight,
                    cursor:
                      explanations.some(
                        e => i + 1 >= e.lineRange[0] && i + 1 <= e.lineRange[1],
                      ) && activeRange === undefined
                        ? 'help'
                        : 'default',
                  }}
                >
                  {isHighlighted && i + 1 === visualRange?.[0] && compact && (
                    <div
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        width: '2px',
                        background: '#38bdf8',
                        boxShadow: '0 0 10px #38bdf8',
                      }}
                    />
                  )}

                  <span
                    className="hljs"
                    style={{ background: 'transparent' }}
                    dangerouslySetInnerHTML={{ __html: lineHtml || ' ' }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
