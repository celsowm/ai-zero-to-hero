import React, { useState, useEffect } from 'react';
import type { StreamingModeCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface StreamingModeProps {
  copy: StreamingModeCopy;
}

const sampleTokens = ['RAG', ' é', ' uma', ' técnica', ' que', ' combina', ' retrieval', ' com', ' geração', '.'];

export const StreamingModeVisual = React.memo(({ copy }: StreamingModeProps) => {
  const [mode, setMode] = useState<'blocking' | 'streaming'>('streaming');
  const [tokenIndex, setTokenIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || mode !== 'streaming') return;
    if (tokenIndex >= sampleTokens.length) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => setTokenIndex(prev => prev + 1), 400);
    return () => clearTimeout(timer);
  }, [isPlaying, tokenIndex, mode]);

  const startStreaming = () => {
    setTokenIndex(0);
    setIsPlaying(true);
  };

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
        {copy.title}
      </div>

      {/* Mode toggle */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {[
          { key: 'blocking' as const, label: copy.blockingLabel, icon: '⏳', color: sw.pink },
          { key: 'streaming' as const, label: copy.streamingLabel, icon: '⚡', color: '#10b981' },
        ].map(m => (
          <button
            key={m.key}
            onClick={() => { setMode(m.key); setIsPlaying(false); setTokenIndex(0); }}
            style={{
              padding: '12px 24px',
              borderRadius: '12px',
              border: `2px solid ${mode === m.key ? m.color : sw.borderSubtle}`,
              background: mode === m.key ? `${m.color}12` : 'rgba(26, 22, 40, 0.6)',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ fontSize: '20px' }}>{m.icon}</span>
            <span style={{ fontSize: '13px', fontWeight: '700', color: mode === m.key ? m.color : sw.text }}>
              {m.label}
            </span>
          </button>
        ))}
      </div>

      {mode === 'blocking' ? (
        /* Blocking mode */
        <div style={{
          padding: '24px',
          background: 'rgba(239, 68, 68, 0.06)',
          borderRadius: '12px',
          border: `1px solid ${sw.pink}22`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
          <div style={{ fontSize: '14px', fontWeight: '700', color: sw.pink, marginBottom: '8px' }}>
            {copy.blockingDesc}
          </div>
          <div style={{ fontSize: '12px', color: sw.textDim }}>
            Usuário espera ~3-10s sem feedback... depois texto aparece de uma vez
          </div>
        </div>
      ) : (
        /* Streaming mode */
        <div>
          <div style={{
            padding: '20px',
            background: 'rgba(16, 185, 129, 0.06)',
            borderRadius: '12px',
            border: `1px solid rgba(16, 185, 129, 0.2)`,
            minHeight: '80px',
          }}>
            <div style={{ fontSize: '12px', fontWeight: '700', color: '#10b981', marginBottom: '12px', textTransform: 'uppercase' }}>
              {copy.sseLabel}
            </div>
            <div style={{ fontSize: '16px', fontFamily: sw.fontMono, color: sw.text, lineHeight: 1.6 }}>
              {sampleTokens.slice(0, tokenIndex).join('')}
              {isPlaying && <span style={{ animation: 'blink 1s infinite', color: '#10b981' }}>▊</span>}
            </div>
          </div>

          {/* Token progress */}
          <div style={{ marginTop: '16px' }}>
            <div style={{ fontSize: '12px', fontWeight: '600', color: sw.textDim, marginBottom: '8px' }}>
              {copy.progressLabel}: {tokenIndex}/{sampleTokens.length} {copy.tokenLabel}s
            </div>
            <div style={{
              height: '6px',
              background: 'rgba(26, 22, 40, 0.8)',
              borderRadius: '3px',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                width: `${(tokenIndex / sampleTokens.length) * 100}%`,
                background: '#10b981',
                transition: 'width 0.3s ease',
                borderRadius: '3px',
              }} />
            </div>
          </div>

          {tokenIndex >= sampleTokens.length && (
            <div style={{
              padding: '12px',
              background: 'rgba(16, 185, 129, 0.08)',
              borderRadius: '8px',
              textAlign: 'center',
              fontSize: '13px',
              fontWeight: '700',
              color: '#10b981',
            }}>
              ✓ {copy.doneLabel} — data: [DONE]
            </div>
          )}

          <button
            onClick={startStreaming}
            disabled={isPlaying}
            style={{
              marginTop: '12px',
              padding: '10px 24px',
              borderRadius: '10px',
              border: `1px solid ${sw.cyan}`,
              background: isPlaying ? 'rgba(26, 22, 40, 0.8)' : `${sw.cyan}15`,
              color: isPlaying ? sw.textDim : sw.cyan,
              cursor: isPlaying ? 'not-allowed' : 'pointer',
              fontSize: '13px',
              fontWeight: '600',
            }}
          >
            {isPlaying ? '⚡ Streaming...' : '▶ Replay Stream'}
          </button>
        </div>
      )}
    </div>
  );
});
