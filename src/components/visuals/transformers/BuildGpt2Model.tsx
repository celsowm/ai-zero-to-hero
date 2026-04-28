import React, { useState, useEffect, useMemo } from 'react';
import { sw } from '../../../theme/tokens';
import type { BuildGpt2ModelCopy } from '../../../types/slide';
import { resolveSnippetCode } from '../../../content/registry';
import { useLocale } from '../../../hooks/useLocale';

interface BuildGpt2ModelProps {
  copy: BuildGpt2ModelCopy;
}

/* ── Tabbed Code + Architecture Diagram ─── */

const TabBar = ({ tabs, active, onChange }: { tabs: { label: string; id: 'code' | 'diagram' }[]; active: 'code' | 'diagram'; onChange: (id: 'code' | 'diagram') => void }) => (
  <div style={{ display: 'flex', gap: '4px', marginBottom: '12px', borderBottom: `1px solid ${sw.borderSubtle}`, paddingBottom: '8px' }}>
    {tabs.map((t) => (
      <button
        key={t.id}
        onClick={() => onChange(t.id)}
        style={{
          padding: '6px 16px',
          fontSize: '12px',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: active === t.id ? sw.cyan : sw.textMuted,
          background: active === t.id ? `${sw.cyan}15` : 'transparent',
          border: active === t.id ? `1px solid ${sw.cyan}44` : `1px solid transparent`,
          borderRadius: '6px 6px 0 0',
          cursor: 'pointer',
          transition: sw.transitionFast,
        }}
      >
        {t.label}
      </button>
    ))}
  </div>
);

const CodeViewer = ({ snippetId }: { snippetId: string }) => {
  const { language: courseLanguage } = useLocale();

  const code = useMemo(() => {
    try {
      return resolveSnippetCode({ snippetId, language: 'python' }, courseLanguage);
    } catch {
      return '# Snippet not found';
    }
  }, [snippetId, courseLanguage]);

  return (
    <pre style={{
      flex: 1,
      margin: 0,
      padding: '16px',
      background: 'rgba(13,11,21,0.6)',
      borderRadius: '8px',
      border: `1px solid ${sw.borderSubtle}`,
      fontSize: '11px',
      lineHeight: 1.6,
      fontFamily: "'JetBrains Mono', monospace",
      color: sw.text,
      overflow: 'auto',
      whiteSpace: 'pre',
    }}>
      {code}
    </pre>
  );
};

const Gpt2ArchitectureDiagram = React.memo(({ copy }: { copy: BuildGpt2ModelCopy }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const blocks = 12;

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 0',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Input */}
      <div style={{
        padding: '10px 20px',
        background: 'rgba(0,229,255,0.1)',
        border: `1px solid ${sw.cyan}44`,
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 700,
        color: sw.cyan,
        textAlign: 'center',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.5s ease-out 0.1s',
      }}>
        {copy.inputLabel}
      </div>

      {/* Embeddings */}
      <div style={{
        padding: '10px 20px',
        background: 'rgba(168,85,247,0.1)',
        border: `1px solid rgba(168,85,247,0.3)`,
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 600,
        color: '#a855f7',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.5s ease-out 0.2s',
      }}>
        {copy.embedLabel} (wte + wpe)
      </div>

      {/* Arrow down */}
      <div style={{ color: sw.textMuted, fontSize: '16px' }}>↓</div>

      {/* Residual stream bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease-out 0.3s',
      }}>
        <div style={{
          flex: 1,
          height: '3px',
          background: `linear-gradient(90deg, ${sw.green}, ${sw.green}22)`,
          borderRadius: '2px',
        }} />
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          color: sw.green,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          {copy.residualLabel}
        </span>
        <div style={{
          flex: 1,
          height: '3px',
          background: `linear-gradient(270deg, ${sw.green}, ${sw.green}22)`,
          borderRadius: '2px',
        }} />
      </div>

      {/* Transformer blocks */}
      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.5s ease-out 0.4s',
      }}>
        {/* Single block detail */}
        <div style={{
          padding: '12px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '10px',
          border: `1px solid ${sw.borderSubtle}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
          <div style={{
            textAlign: 'center',
            fontSize: '11px',
            fontWeight: 700,
            color: sw.yellow,
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}>
            {copy.blockLabel}
          </div>

          {/* Attention */}
          <div style={{
            padding: '8px 12px',
            background: 'rgba(0,229,255,0.08)',
            border: `1px solid ${sw.cyan}22`,
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            color: sw.cyan,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: sw.cyan }}>⊗</span>
            {copy.attentionLabel}
          </div>

          {/* Residual add */}
          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 700,
            color: sw.green,
          }}>
            +
          </div>

          {/* LayerNorm */}
          <div style={{
            padding: '6px 12px',
            background: 'rgba(251,191,36,0.08)',
            border: `1px solid rgba(251,191,36,0.2)`,
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#fbbf24',
            textAlign: 'center',
          }}>
            {copy.normLabel}
          </div>

          {/* MLP */}
          <div style={{
            padding: '8px 12px',
            background: 'rgba(168,85,247,0.08)',
            border: `1px solid rgba(168,85,247,0.2)`,
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#a855f7',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: '#a855f7' }}>⊙</span>
            {copy.mlpLabel}
          </div>

          {/* Residual add */}
          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 700,
            color: sw.green,
          }}>
            +
          </div>

          {/* LayerNorm */}
          <div style={{
            padding: '6px 12px',
            background: 'rgba(251,191,36,0.08)',
            border: `1px solid rgba(251,191,36,0.2)`,
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#fbbf24',
            textAlign: 'center',
          }}>
            {copy.normLabel}
          </div>
        </div>

        {/* × N blocks indicator */}
        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 700,
          color: sw.textMuted,
          padding: '4px',
        }}>
          {copy.blocksLabel.replace('N', String(blocks))}
        </div>
      </div>

      {/* Arrow down */}
      <div style={{ color: sw.textMuted, fontSize: '16px' }}>↓</div>

      {/* Output */}
      <div style={{
        padding: '10px 20px',
        background: 'rgba(255,46,151,0.1)',
        border: `1px solid rgba(255,46,151,0.3)`,
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 700,
        color: '#ff2e97',
        textAlign: 'center',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.5s ease-out 0.6s',
      }}>
        {copy.outputLabel} (lm_head)
      </div>
    </div>
  );
});

export const BuildGpt2Model = React.memo(({ copy }: BuildGpt2ModelProps) => {
  const [tab, setTab] = useState<'code' | 'diagram'>('code');

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      overflow: 'hidden',
    }}>
      <TabBar
        tabs={[
          { label: copy.tabCode, id: 'code' },
          { label: copy.tabDiagram, id: 'diagram' },
        ]}
        active={tab}
        onChange={setTab}
      />

      {tab === 'code' ? (
        <CodeViewer snippetId={copy.snippetId} />
      ) : (
        <Gpt2ArchitectureDiagram copy={copy} />
      )}
    </div>
  );
});
