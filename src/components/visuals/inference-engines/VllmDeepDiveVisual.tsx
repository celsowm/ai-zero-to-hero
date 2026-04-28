import React, { useState } from 'react';
import type { VllmDeepDiveCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface VllmDeepDiveProps {
  copy: VllmDeepDiveCopy;
}

interface Req {
  id: number;
  status: 'waiting' | 'processing' | 'done';
  progress: number;
}

export const VllmDeepDiveVisual = React.memo(({ copy }: VllmDeepDiveProps) => {
  const [mode, setMode] = useState<'static' | 'continuous'>('continuous');

  const staticReqs: Req[] = [
    { id: 1, status: 'done', progress: 100 },
    { id: 2, status: 'waiting', progress: 0 },
    { id: 3, status: 'waiting', progress: 0 },
  ];

  const continuousReqs: Req[] = [
    { id: 1, status: 'done', progress: 100 },
    { id: 2, status: 'processing', progress: 60 },
    { id: 3, status: 'processing', progress: 30 },
  ];

  const reqs = mode === 'static' ? staticReqs : continuousReqs;

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeeper,
      display: 'flex',
      flexDirection: 'column',
      gap: '28px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.titleLabel}
      </div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {[
          { key: 'static' as const, label: copy.staticLabel, color: sw.pink },
          { key: 'continuous' as const, label: copy.continuousLabel, color: '#10b981' },
        ].map(m => (
          <button
            key={m.key}
            onClick={() => setMode(m.key)}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: `2px solid ${mode === m.key ? m.color : sw.borderSubtle}`,
              background: mode === m.key ? `${m.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              fontSize: '13px',
              fontWeight: '700',
              color: mode === m.key ? m.color : sw.text,
            }}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div style={{
        padding: '20px',
        background: 'rgba(26, 22, 40, 0.6)',
        borderRadius: '12px',
        border: `1px solid ${sw.borderSubtle}`,
      }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: mode === 'static' ? sw.pink : '#10b981', marginBottom: '16px' }}>
          {mode === 'static' ? copy.staticDesc : copy.continuousDesc}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {reqs.map(req => (
            <div key={req.id} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '12px', fontWeight: '700', color: sw.textDim, width: '80px' }}>
                {copy.requestLabel} #{req.id}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{
                  height: '24px',
                  background: 'rgba(26, 22, 40, 0.8)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${req.progress}%`,
                    background: req.status === 'done' ? '#10b981'
                      : req.status === 'processing' ? '#10b981'
                      : sw.pink,
                    opacity: req.status === 'processing' ? 0.7 : 1,
                    borderRadius: '6px',
                    transition: 'all 0.3s ease',
                  }} />
                </div>
              </div>
              <span style={{
                fontSize: '11px',
                fontWeight: '700',
                color: req.status === 'done' ? '#10b981'
                  : req.status === 'processing' ? '#10b981'
                  : sw.pink,
                width: '100px',
                textAlign: 'right',
              }}>
                {req.status === 'done' ? copy.doneLabel
                  : req.status === 'processing' ? copy.processingLabel
                  : copy.waitingLabel}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Params */}
      <div style={{
        padding: '16px',
        background: 'rgba(0, 229, 255, 0.06)',
        borderRadius: '12px',
        border: `1px solid ${sw.cyan}22`,
        fontFamily: sw.fontMono,
        fontSize: '12px',
        color: sw.textDim,
        lineHeight: 1.8,
      }}>
        <span style={{ color: sw.cyan, fontWeight: '700' }}>--gpu-memory-utilization</span> 0.92<br />
        <span style={{ color: sw.cyan, fontWeight: '700' }}>--max-num-seqs</span> 256<br />
        <span style={{ color: sw.cyan, fontWeight: '700' }}>--max-model-len</span> 4096<br />
        <span style={{ color: sw.cyan, fontWeight: '700' }}>--enable-prefix-caching</span><br />
        <span style={{ color: sw.cyan, fontWeight: '700' }}>-tp</span> 2
      </div>
    </div>
  );
});
