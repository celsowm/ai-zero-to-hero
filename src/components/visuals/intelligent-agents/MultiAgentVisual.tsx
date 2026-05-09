import React, { useState } from 'react';
import type { MultiAgentVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props { copy: MultiAgentVisualCopy }

export const MultiAgentVisual = React.memo(({ copy }: Props) => {
  const [showComparison, setShowComparison] = useState(false);
  const [running, setRunning] = useState(false);

  const runComparison = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setShowComparison(true);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', color: sw.text, textAlign: 'center' }}>{copy.title}</h4>
      <p style={{ margin: 0, fontSize: '11px', color: sw.textMuted, textAlign: 'center' }}>{copy.subtitle}</p>

      <button
        onClick={runComparison}
        disabled={running}
        style={{
          padding: '6px 16px', borderRadius: '8px', fontSize: '12px', fontWeight: '700',
          border: `1px solid ${sw.purple}44`, background: `${sw.purple}22`, color: sw.purple,
          cursor: running ? 'not-allowed' : 'pointer', opacity: running ? 0.5 : 1,
        }}
      >
        {running ? 'Executando...' : `▶ ${copy.runButton}`}
      </button>

      {showComparison && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {/* Single agent */}
          <div style={{ background: `${sw.amber}08`, border: `1px solid ${sw.amber}22`, borderRadius: '10px', padding: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: sw.amber, marginBottom: '6px' }}>
              {copy.singleAgentLabel}
            </div>
            <div style={{ fontSize: '10px', color: sw.textMuted, lineHeight: '1.4' }}>
              {copy.qualitySingle}: ⭐⭐⭐<br />
              {copy.timeSingle}: 30s<br />
              1 agente genérico fazendo tudo
            </div>
          </div>

          {/* Multi-agent */}
          <div style={{ background: `${sw.emerald}08`, border: `1px solid ${sw.emerald}22`, borderRadius: '10px', padding: '10px' }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: sw.emerald, marginBottom: '6px' }}>
              {copy.multiAgentLabel}
            </div>
            <div style={{ fontSize: '10px', color: sw.textMuted, lineHeight: '1.4' }}>
              {copy.qualityMulti}: ⭐⭐⭐⭐⭐<br />
              {copy.timeMulti}: 18s<br />
              <div style={{ marginTop: '4px' }}>
                <span style={{ color: sw.sky }}>🔍 {copy.researcherLabel}</span> →
                <span style={{ color: sw.purple }}> ✍️ {copy.writerLabel}</span> →
                <span style={{ color: sw.pink }}> 🔎 {copy.reviewerLabel}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{
        background: `${sw.sky}08`, border: `1px solid ${sw.sky}22`,
        borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: sw.text, lineHeight: '1.4',
      }}>
        <strong style={{ color: sw.sky }}>{copy.insightTitle}</strong> {copy.insightText}
      </div>
    </div>
  );
});
