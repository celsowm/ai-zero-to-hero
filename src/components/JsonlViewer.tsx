import React, { useMemo, useState, useCallback, useRef } from 'react';
import { CodeBlock } from './CodeBlock';
import { Download } from 'lucide-react';

interface JsonlEntry {
  id: string;
  category: string;
  messages: Array<{ role: string; content: string }>;
}

interface JsonlViewerProps {
  jsonlContent: string;
  fileName?: string;
}

const PAGE_SIZE = 12;

function getContent(msg: Array<{ role: string; content: string }>, role: string): string {
  const entry = msg.find(m => m.role === role);
  return entry ? entry.content : '';
}

function extractPreview(msg: Array<{ role: string; content: string }>, role: string, max = 50): string {
  const text = getContent(msg, role);
  if (!text) return '—';
  return text.length > max ? text.slice(0, max) + '…' : text;
}

interface TooltipState {
  text: string;
  x: number;
  y: number;
}

export const JsonlViewer: React.FC<JsonlViewerProps> = ({ jsonlContent, fileName = 'dataset' }) => {
  const [mode, setMode] = useState<'table' | 'code'>('table');
  const [filter, setFilter] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback((e: React.MouseEvent, text: string) => {
    if (text.length <= 80) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({ text, x: rect.left + rect.width / 2, y: rect.top - 8 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltip(null);
  }, []);


  const entries = useMemo<JsonlEntry[]>(() => {
    return jsonlContent
      .split('\n')
      .filter(Boolean)
      .map(line => JSON.parse(line));
  }, [jsonlContent]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const e of entries) {
      counts[e.category] = (counts[e.category] || 0) + 1;
    }
    return counts;
  }, [entries]);

  const filtered = useMemo(() => {
    if (!filter) return entries;
    return entries.filter(e => e.category === filter);
  }, [entries, filter]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const currentPage = Math.min(page, totalPages - 1);
  const pageEntries = filtered.slice(currentPage * PAGE_SIZE, (currentPage + 1) * PAGE_SIZE);

  const handleDownload = useCallback(() => {
    const blob = new Blob([jsonlContent], { type: 'application/jsonl' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.jsonl`;
    a.click();
    URL.revokeObjectURL(url);
  }, [jsonlContent, fileName]);

  const formatJson = (obj: JsonlEntry): string => JSON.stringify(obj, null, 2);

  const allCategories = useMemo(() => {
    return Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);
  }, [categoryCounts]);

  // Build code view content: page of formatted JSON objects
  const codeContent = useMemo(() => {
    return pageEntries.map(e => formatJson(e)).join('\n');
  }, [pageEntries]);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Toolbar: mode + filter + download */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        marginBottom: '10px',
        flexWrap: 'wrap',
      }}>
        {/* Mode toggle */}
        <div style={{
          display: 'flex',
          gap: '3px',
          background: 'rgba(255,255,255,0.04)',
          borderRadius: '6px',
          padding: '2px',
        }}>
          <button
            onClick={() => setMode('table')}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              background: mode === 'table' ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: mode === 'table' ? 'var(--sw-text)' : 'var(--sw-text-muted)',
            }}
          >
            📊 Tabela
          </button>
          <button
            onClick={() => setMode('code')}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              background: mode === 'code' ? 'rgba(255,255,255,0.1)' : 'transparent',
              color: mode === 'code' ? 'var(--sw-text)' : 'var(--sw-text-muted)',
            }}
          >
            📋 Código
          </button>
        </div>

        {/* Filter */}
        <div style={{ flex: 1 }}>
          <select
            value={filter ?? ''}
            onChange={e => { setFilter(e.target.value || null); setPage(0); }}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              fontWeight: 600,
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.04)',
              color: 'var(--sw-text)',
              cursor: 'pointer',
              maxWidth: '200px',
            }}
          >
            <option value="">Todas ({entries.length})</option>
            {allCategories.map(([cat, count]) => (
              <option key={cat} value={cat}>{cat} ({count})</option>
            ))}
          </select>
        </div>

        {/* Download */}
        <button
          onClick={handleDownload}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '4px 10px',
            fontSize: '12px',
            fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '6px',
            cursor: 'pointer',
            background: 'rgba(255,255,255,0.04)',
            color: 'var(--sw-text-muted)',
          }}
        >
          <Download size={14} />
          Download
        </button>
      </div>

      {/* Mode: Table */}
      {mode === 'table' && (
        <div style={{
          flex: 1,
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(0,0,0,0.3)',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.06)',
          overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '50px 70px 1fr 1fr',
            gap: '0',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '6px 10px',
            fontSize: '12px',
            fontWeight: 700,
            color: 'var(--sw-text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            <div>id</div>
            <div>cat</div>
            <div>pergunta</div>
            <div>resposta</div>
          </div>

          {/* Rows */}
          {pageEntries.map((entry, i) => {
            return (
              <div key={currentPage * PAGE_SIZE + i}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '50px 70px 1fr 1fr',
                  gap: '0',
                  padding: '5px 10px',
                  borderBottom: '1px solid rgba(255,255,255,0.04)',
                  fontSize: '13px',
                  color: 'var(--sw-text)',
                  background: 'transparent',
                  alignItems: 'start',
                }}>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '12px', color: 'var(--sw-text-muted)' }}>
                    {entry.id}
                  </div>
                  <div>
                    <span style={{
                      padding: '2px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: getCategoryColor(entry.category) + '20',
                      color: getCategoryColor(entry.category),
                    }}>
                      {entry.category}
                    </span>
                  </div>
                  <div
                    onMouseEnter={e => handleMouseEnter(e, getContent(entry.messages, 'user'))}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      fontSize: '13px',
                      color: 'var(--sw-text-muted)',
                      lineHeight: 1.4,
                      wordBreak: 'break-word',
                      cursor: 'help',
                    }}
                  >
                    {extractPreview(entry.messages, 'user', 80)}
                  </div>
                  <div
                    onMouseEnter={e => handleMouseEnter(e, getContent(entry.messages, 'assistant'))}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      fontSize: '13px',
                      color: '#6ee7b7',
                      lineHeight: 1.4,
                      wordBreak: 'break-word',
                      cursor: 'help',
                    }}
                  >
                    {extractPreview(entry.messages, 'assistant', 80)}
                  </div>
                </div>
              </div>
            );
          })}

          {pageEntries.length === 0 && (
            <div style={{ padding: '20px', textAlign: 'center', fontSize: '13px', color: 'var(--sw-text-muted)' }}>
              Nenhum resultado para este filtro.
            </div>
          )}
        </div>
      )}

      {/* Mode: Code */}
      {mode === 'code' && (
        <div style={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.06)',
        }}>
          <CodeBlock
            code={codeContent}
            language="json"
          />
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '4px',
          marginTop: '10px',
          fontSize: '12px',
        }}>
          <button
            onClick={() => setPage(0)}
            disabled={currentPage === 0}
            style={{
              padding: '4px 10px',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === 0 ? 'default' : 'pointer',
              background: 'rgba(255,255,255,0.04)',
              color: currentPage === 0 ? 'rgba(255,255,255,0.2)' : 'var(--sw-text-muted)',
              fontSize: '12px',
            }}
          >
            «
          </button>
          <button
            onClick={() => setPage(currentPage - 1)}
            disabled={currentPage === 0}
            style={{
              padding: '4px 10px',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage === 0 ? 'default' : 'pointer',
              background: 'rgba(255,255,255,0.04)',
              color: currentPage === 0 ? 'rgba(255,255,255,0.2)' : 'var(--sw-text-muted)',
              fontSize: '12px',
            }}
          >
            ‹
          </button>

          {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
            let pageNum: number;
            if (totalPages <= 7) {
              pageNum = i;
            } else if (currentPage < 3) {
              pageNum = i;
            } else if (currentPage > totalPages - 4) {
              pageNum = totalPages - 7 + i;
            } else {
              pageNum = currentPage - 3 + i;
            }
            return (
              <button
                key={pageNum}
                onClick={() => setPage(pageNum)}
                style={{
                  padding: '4px 10px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  background: pageNum === currentPage ? 'rgba(100,200,255,0.15)' : 'transparent',
                  color: pageNum === currentPage ? '#64c8ff' : 'var(--sw-text-muted)',
                  fontSize: '12px',
                  fontWeight: pageNum === currentPage ? 700 : 400,
                }}
              >
                {pageNum + 1}
              </button>
            );
          })}

          <button
            onClick={() => setPage(currentPage + 1)}
            disabled={currentPage >= totalPages - 1}
            style={{
              padding: '4px 10px',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage >= totalPages - 1 ? 'default' : 'pointer',
              background: 'rgba(255,255,255,0.04)',
              color: currentPage >= totalPages - 1 ? 'rgba(255,255,255,0.2)' : 'var(--sw-text-muted)',
              fontSize: '12px',
            }}
          >
            ›
          </button>
          <button
            onClick={() => setPage(totalPages - 1)}
            disabled={currentPage >= totalPages - 1}
            style={{
              padding: '4px 10px',
              border: 'none',
              borderRadius: '4px',
              cursor: currentPage >= totalPages - 1 ? 'default' : 'pointer',
              background: 'rgba(255,255,255,0.04)',
              color: currentPage >= totalPages - 1 ? 'rgba(255,255,255,0.2)' : 'var(--sw-text-muted)',
              fontSize: '12px',
            }}
          >
            »
          </button>

          <span style={{ marginLeft: '8px', color: 'var(--sw-text-muted)', fontSize: '12px' }}>
            {currentPage * PAGE_SIZE + 1}–{Math.min((currentPage + 1) * PAGE_SIZE, filtered.length)} de {filtered.length}
          </span>
        </div>
      )}

      {/* Floating tooltip */}
      {tooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translate(-50%, -100%)',
            background: 'rgba(15,15,25,0.95)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '8px',
            padding: '10px 12px',
            fontSize: '12px',
            lineHeight: 1.5,
            color: 'var(--sw-text)',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            maxWidth: '400px',
            minWidth: '200px',
            pointerEvents: 'none',
            zIndex: 99999,
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            opacity: 1,
            transition: 'opacity 0.15s ease',
          }}
        >
          {tooltip.text}
          <div style={{
            position: 'absolute',
            bottom: '-6px',
            left: '50%',
            transform: 'translateX(-50%)',
            border: '5px solid transparent',
            borderTopColor: 'rgba(255,255,255,0.12)',
          }} />
        </div>
      )}
    </div>
  );
};

function getCategoryColor(cat: string): string {
  const map: Record<string, string> = {
    knowledge: '#f472b6',
    analysis: '#a855f7',
    transformation: '#6366f1',
    reasoning: '#3b82f6',
    decision: '#10b981',
    interaction: '#f59e0b',
    behavior: '#ef4444',
  };
  return map[cat] || '#94a3b8';
}
