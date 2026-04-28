import React, { useEffect, useState } from 'react';
import { sw } from '../../../theme/tokens';
import type { RagArchitectureVisualCopy } from '../../../types/slide';

interface RagArchitectureVisualProps {
  copy: RagArchitectureVisualCopy;
}

export const RagArchitectureVisual = React.memo(({ copy }: RagArchitectureVisualProps) => {
  const [phase, setPhase] = useState<'ingest' | 'query'>('ingest');

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((p) => (p === 'ingest' ? 'query' : 'ingest'));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const ArrowDown = ({ color }: { color: string }) => (
    <div style={{ textAlign: 'center', color, fontSize: '14px', margin: '2px 0' }}>↓</div>
  );

  return (
    <div style={{
      width: '100%',
      padding: '16px 12px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      overflow: 'hidden',
    }}>
      <div style={{ textAlign: 'center', fontSize: '13px', fontWeight: 700, color: sw.text }}>
        {copy.title}
      </div>

      {/* Phase toggle indicator */}
      <div style={{ display: 'flex', gap: '4px', justifyContent: 'center' }}>
        <span style={{
          padding: '3px 10px',
          fontSize: '10px',
          fontWeight: 700,
          borderRadius: '4px',
          background: phase === 'ingest' ? `${sw.cyan}20` : 'transparent',
          color: phase === 'ingest' ? sw.cyan : sw.textMuted,
          border: phase === 'ingest' ? `1px solid ${sw.cyan}44` : `1px solid transparent`,
          transition: 'all 0.3s ease',
        }}>
          {copy.ingestPhase}
        </span>
        <span style={{
          padding: '3px 10px',
          fontSize: '10px',
          fontWeight: 700,
          borderRadius: '4px',
          background: phase === 'query' ? `${sw.green}20` : 'transparent',
          color: phase === 'query' ? sw.green : sw.textMuted,
          border: phase === 'query' ? `1px solid ${sw.green}44` : `1px solid transparent`,
          transition: 'all 0.3s ease',
        }}>
          {copy.queryPhase}
        </span>
      </div>

      {/* Diagram */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0' }}>
        {/* Documents */}
        <div style={{
          padding: '8px 14px',
          background: phase === 'ingest' ? `${sw.yellow}12` : 'rgba(255,255,255,0.03)',
          borderRadius: '6px',
          border: `1px solid ${phase === 'ingest' ? sw.yellow + '44' : sw.borderSubtle}`,
          fontSize: '11px',
          fontWeight: 600,
          color: phase === 'ingest' ? sw.yellow : sw.textMuted,
          transition: 'all 0.4s ease',
        }}>
          📄 {copy.documentsLabel}
        </div>

        <ArrowDown color={phase === 'ingest' ? sw.yellow : sw.textMuted} />

        {/* Embed */}
        <div style={{
          padding: '8px 14px',
          background: phase === 'ingest' ? `rgba(168,85,247,0.12)` : 'rgba(255,255,255,0.03)',
          borderRadius: '6px',
          border: `1px solid ${phase === 'ingest' ? '#a855f7' + '44' : sw.borderSubtle}`,
          fontSize: '11px',
          fontWeight: 600,
          color: phase === 'ingest' ? '#a855f7' : sw.textMuted,
          transition: 'all 0.4s ease',
        }}>
          🔢 {copy.embedLabel}
        </div>

        <ArrowDown color={phase === 'ingest' ? '#a855f7' : sw.textMuted} />

        {/* Vector Store */}
        <div style={{
          padding: '10px 18px',
          background: 'rgba(0,229,255,0.08)',
          borderRadius: '8px',
          border: `2px solid ${sw.cyan}33`,
          fontSize: '12px',
          fontWeight: 700,
          color: sw.cyan,
          boxShadow: `0 0 12px ${sw.cyan}11`,
        }}>
          🗄️ {copy.vectorStoreLabel}
        </div>

        <ArrowDown color={sw.cyan} />

        {/* Query */}
        <div style={{
          padding: '8px 14px',
          background: phase === 'query' ? `${sw.cyan}12` : 'rgba(255,255,255,0.03)',
          borderRadius: '6px',
          border: `1px solid ${phase === 'query' ? sw.cyan + '44' : sw.borderSubtle}`,
          fontSize: '11px',
          fontWeight: 600,
          color: phase === 'query' ? sw.cyan : sw.textMuted,
          transition: 'all 0.4s ease',
        }}>
          💬 {copy.queryLabel}
        </div>

        <ArrowDown color={phase === 'query' ? sw.cyan : sw.textMuted} />

        {/* Retrieve */}
        <div style={{
          padding: '8px 14px',
          background: phase === 'query' ? `${sw.green}12` : 'rgba(255,255,255,0.03)',
          borderRadius: '6px',
          border: `1px solid ${phase === 'query' ? sw.green + '44' : sw.borderSubtle}`,
          fontSize: '11px',
          fontWeight: 600,
          color: phase === 'query' ? sw.green : sw.textMuted,
          transition: 'all 0.4s ease',
        }}>
          🔍 {copy.retrieveLabel}
        </div>

        <ArrowDown color={phase === 'query' ? sw.green : sw.textMuted} />

        {/* Context */}
        <div style={{
          padding: '8px 14px',
          background: phase === 'query' ? `rgba(168,85,247,0.12)` : 'rgba(255,255,255,0.03)',
          borderRadius: '6px',
          border: `1px solid ${phase === 'query' ? '#a855f7' + '44' : sw.borderSubtle}`,
          fontSize: '11px',
          fontWeight: 600,
          color: phase === 'query' ? '#a855f7' : sw.textMuted,
          transition: 'all 0.4s ease',
        }}>
          📋 {copy.contextLabel}
        </div>

        <ArrowDown color={phase === 'query' ? '#a855f7' : sw.textMuted} />

        {/* Prompt + Context */}
        <div style={{
          padding: '8px 14px',
          background: phase === 'query' ? `${sw.yellow}12` : 'rgba(255,255,255,0.03)',
          borderRadius: '6px',
          border: `1px solid ${phase === 'query' ? sw.yellow + '44' : sw.borderSubtle}`,
          fontSize: '11px',
          fontWeight: 600,
          color: phase === 'query' ? sw.yellow : sw.textMuted,
          transition: 'all 0.4s ease',
        }}>
          📝 {copy.promptLabel}
        </div>

        <ArrowDown color={phase === 'query' ? sw.yellow : sw.textMuted} />

        {/* LLM */}
        <div style={{
          padding: '10px 18px',
          background: 'rgba(168,85,247,0.08)',
          borderRadius: '8px',
          border: `2px solid rgba(168,85,247,0.3)`,
          fontSize: '12px',
          fontWeight: 700,
          color: '#a855f7',
          boxShadow: phase === 'query' ? `0 0 12px rgba(168,85,247,0.2)` : 'none',
          transition: 'all 0.4s ease',
        }}>
          🤖 {copy.llmLabel}
        </div>

        <ArrowDown color={sw.green} />

        {/* Answer */}
        <div style={{
          padding: '8px 14px',
          background: phase === 'query' ? `${sw.green}12` : 'rgba(255,255,255,0.03)',
          borderRadius: '6px',
          border: `1px solid ${phase === 'query' ? sw.green + '44' : sw.borderSubtle}`,
          fontSize: '11px',
          fontWeight: 600,
          color: phase === 'query' ? sw.green : sw.textMuted,
          transition: 'all 0.4s ease',
        }}>
          ✅ {copy.answerLabel}
        </div>
      </div>
    </div>
  );
});
