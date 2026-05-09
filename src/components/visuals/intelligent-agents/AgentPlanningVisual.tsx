import React, { useState } from 'react';
import type { AgentPlanningVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props { copy: AgentPlanningVisualCopy }

export const AgentPlanningVisual = React.memo(({ copy }: Props) => {
  const [running, setRunning] = useState(false);
  const [showBoth, setShowBoth] = useState(false);

  const runComparison = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      setShowBoth(true);
    }, 1500);
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

      {showBoth && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          {/* Without planning */}
          <div style={{
            background: `${sw.pink}08`, border: `1px solid ${sw.pink}22`,
            borderRadius: '10px', padding: '10px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: sw.pink, marginBottom: '6px' }}>
              {copy.withoutPlanningLabel}
            </div>
            <div style={{ fontSize: '10px', color: sw.textMuted, lineHeight: '1.4' }}>
              {copy.stepsLabel}: 12 passos desnecessários<br />
              {copy.timeLabel}: 45s<br />
              {copy.qualityLabel}: ⭐⭐ (resposta confusa)
            </div>
          </div>

          {/* With planning */}
          <div style={{
            background: `${sw.emerald}08`, border: `1px solid ${sw.emerald}22`,
            borderRadius: '10px', padding: '10px',
          }}>
            <div style={{ fontSize: '11px', fontWeight: '700', color: sw.emerald, marginBottom: '6px' }}>
              {copy.withPlanningLabel}
            </div>
            <div style={{ fontSize: '10px', color: sw.textMuted, lineHeight: '1.4' }}>
              {copy.stepsLabel}: 3 passos diretos<br />
              {copy.timeLabel}: 12s<br />
              {copy.qualityLabel}: ⭐⭐⭐⭐⭐ (resposta clara)
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
