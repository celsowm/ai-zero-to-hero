import React, { useMemo, useState } from 'react';
import type { TokenBatchShiftInteractiveCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface TokenBatchShiftInteractiveProps {
  copy: TokenBatchShiftInteractiveCopy;
}

function TokenCell({
  token,
  active,
}: {
  token: string;
  active?: boolean;
}) {
  return (
    <div
      style={{
        minWidth: 34,
        textAlign: 'center',
        padding: '6px 8px',
        borderRadius: 8,
        border: `1px solid ${active ? sw.cyan : sw.borderSubtle}`,
        background: active ? 'rgba(34, 211, 238, 0.18)' : sw.surface,
        color: active ? sw.text : sw.textDim,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 12,
        fontWeight: 700,
      }}
    >
      {token}
    </div>
  );
}

export const TokenBatchShiftInteractive = React.memo(({ copy }: TokenBatchShiftInteractiveProps) => {
  const sequences = useMemo(() => copy.sequences ?? [], [copy.sequences]);
  const [rowIndex, setRowIndex] = useState(0);
  const [step, setStep] = useState(0);

  if (sequences.length === 0) {
    return (
      <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12, color: sw.textDim }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.title}</div>
        <div style={{ fontSize: 13, lineHeight: 1.55 }}>{copy.subtitle}</div>
        <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 12, padding: 12, background: sw.surface }}>
          No token sequences were provided for this visual.
        </div>
      </div>
    );
  }

  const sequence = sequences[rowIndex] ?? sequences[0];
  const maxStep = Math.max(0, sequence.length - 2);
  const safeStep = Math.min(step, maxStep);
  const x = sequence.slice(0, -1);
  const y = sequence.slice(1);

  const supervisedPairs = sequences.reduce((acc, seq) => acc + Math.max(0, seq.length - 1), 0);

  return (
    <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.title}</div>
      <div style={{ fontSize: 13, lineHeight: 1.55, color: sw.textDim }}>{copy.subtitle}</div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {sequences.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setRowIndex(idx);
              setStep(0);
            }}
            style={{
              borderRadius: 8,
              padding: '6px 10px',
              fontSize: 12,
              fontWeight: 700,
              border: `1px solid ${rowIndex === idx ? sw.cyan : sw.borderSubtle}`,
              background: rowIndex === idx ? 'rgba(34, 211, 238, 0.16)' : sw.surface,
              color: sw.text,
              cursor: 'pointer',
            }}
          >
            {copy.rowLabel} {idx + 1}
          </button>
        ))}
      </div>

      <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 12, padding: 10, background: sw.surface }}>
        <div style={{ fontSize: 11, color: sw.textMuted, marginBottom: 6 }}>{copy.baseSequenceLabel}</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {sequence.map((tok, idx) => (
            <TokenCell key={`base-${idx}`} token={tok} active={idx === safeStep || idx === safeStep + 1} />
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 12, padding: 10, background: sw.surface }}>
          <div style={{ fontSize: 11, color: sw.textMuted, marginBottom: 6 }}>{copy.inputLabel}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {x.map((tok, idx) => (
              <TokenCell key={`x-${idx}`} token={tok} active={idx === safeStep} />
            ))}
          </div>
        </div>
        <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 12, padding: 10, background: sw.surface }}>
          <div style={{ fontSize: 11, color: sw.textMuted, marginBottom: 6 }}>{copy.targetLabel}</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {y.map((tok, idx) => (
              <TokenCell key={`y-${idx}`} token={tok} active={idx === safeStep} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ border: `1px solid ${sw.cyan}`, borderRadius: 12, padding: 10, background: 'rgba(34, 211, 238, 0.08)' }}>
        <div style={{ fontSize: 12, color: sw.text, marginBottom: 4 }}>
          {copy.currentPairLabel}: <strong>x[{safeStep}] = {x[safeStep] ?? '-'}</strong> → <strong>y[{safeStep}] = {y[safeStep] ?? '-'}</strong>
        </div>
        <div style={{ fontSize: 12, color: sw.textDim }}>
          {copy.parallelLabel}: {x.length} · {copy.positionsPerRowLabel}. {copy.totalPairsLabel}: {supervisedPairs}.
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          style={{ borderRadius: 8, padding: '6px 10px', border: `1px solid ${sw.borderSubtle}`, background: sw.surface, color: sw.text, cursor: 'pointer' }}
        >
          {copy.prevLabel}
        </button>
        <input
          type="range"
          min={0}
          max={maxStep}
          value={safeStep}
          onChange={e => setStep(Number(e.target.value))}
          style={{ flex: 1 }}
        />
        <button
          onClick={() => setStep(s => Math.min(maxStep, s + 1))}
          style={{ borderRadius: 8, padding: '6px 10px', border: `1px solid ${sw.borderSubtle}`, background: sw.surface, color: sw.text, cursor: 'pointer' }}
        >
          {copy.nextLabel}
        </button>
      </div>
    </div>
  );
});
