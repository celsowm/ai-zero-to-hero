import React, { useState, useMemo } from 'react';
import { sw } from '../../../theme/tokens';
import type { BPEMergeStackCopy } from '../../../types/slide';

interface BPEMergeStackProps {
  copy: BPEMergeStackCopy;
}

interface MergeStep {
  pair: [string, string];
  label: string;
  before: string[];
  after: string[];
}

function applyMerge(pieces: string[], pair: [string, string]): string[] {
  const result: string[] = [];
  let i = 0;
  while (i < pieces.length) {
    if (i + 1 < pieces.length && pieces[i] === pair[0] && pieces[i + 1] === pair[1]) {
      result.push(pair[0] + pair[1]);
      i += 2;
    } else {
      result.push(pieces[i]);
      i++;
    }
  }
  return result;
}

function computeMergeSteps(chars: string[], rules: [string, string][]): MergeStep[] {
  const steps: MergeStep[] = [];
  let current = [...chars];
  for (const rule of rules) {
    const before = [...current];
    const after = applyMerge(current, rule);
    steps.push({
      pair: rule,
      label: `${rule[0]} + ${rule[1]} → ${rule[0]}${rule[1]}`,
      before,
      after,
    });
    current = after;
  }
  return steps;
}

const COLORS = ['#00e5ff', '#a855f7', '#facc15', '#34d399', '#f472b6', '#fb923c', '#818cf8', '#2dd4bf'];

export const BPEMergeStack = React.memo(({ copy }: BPEMergeStackProps) => {
  const [step, setStep] = useState(-1);

  const charPieces = useMemo(() => copy.originalToken.split(''), [copy.originalToken]);

  const rules: [string, string][] = useMemo(() => {
    return copy.mergeRules.map((r) => {
      const m = r.match(/\(([^,]+),\s*([^)]*)\)/);
      return m ? [m[1].trim(), m[2].trim()] as [string, string] : ['', ''] as [string, string];
    });
  }, [copy.mergeRules]);

  const mergeSteps = useMemo(() => computeMergeSteps(charPieces, rules), [charPieces, rules]);

  const currentState = step < 0 ? charPieces : mergeSteps[step]?.after ?? charPieces;
  const totalSteps = mergeSteps.length;

  const getPieceColor = (piece: string, idx: number): string => {
    // Assign colors based on first occurrence of the piece in original chars
    for (const s of mergeSteps) {
      for (let i = 0; i < s.before.length; i++) {
        if (s.before[i] === piece && piece.length === 1) {
          return COLORS[i % COLORS.length];
        }
      }
    }
    return COLORS[idx % COLORS.length];
  };

  const renderPieces = (pieces: string[], highlight: [string, string] | null = null) => {
    const tokens: React.ReactNode[] = [];
    let mergedIdx = -1;

    for (let i = 0; i < pieces.length; i++) {
      const piece = pieces[i];
      const isMerged = highlight && piece === highlight[0] + highlight[1];

      if (isMerged && mergedIdx === -1) {
        mergedIdx = i;
        tokens.push(
          <span
            key={`merged-${i}`}
            style={{
              display: 'inline-block',
              padding: '6px 10px',
              background: `${sw.cyan}20`,
              border: `2px solid ${sw.cyan}`,
              borderRadius: '8px',
              color: sw.cyan,
              fontWeight: 700,
              fontSize: '18px',
              fontFamily: sw.fontMono,
              boxShadow: `0 0 12px ${sw.cyan}33`,
              animation: 'pulse 0.4s ease-out',
            }}
          >
            {piece}
          </span>
        );
        i++; // skip next (it's part of the merged piece)
      } else if (highlight && piece === highlight[0]) {
        // Show the two parts about to merge
        const nextPiece = pieces[i + 1];
        if (nextPiece === highlight[1]) {
          tokens.push(
            <React.Fragment key={`pre-merge-${i}`}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 8px',
                  background: `${sw.yellow}15`,
                  border: `2px dashed ${sw.yellow}`,
                  borderRadius: '6px',
                  color: sw.yellow,
                  fontWeight: 700,
                  fontSize: '16px',
                  fontFamily: sw.fontMono,
                }}
              >
                {piece}
              </span>
              <span style={{ color: sw.textMuted, fontSize: '14px', margin: '0 4px' }}>+</span>
              <span
                style={{
                  display: 'inline-block',
                  padding: '6px 8px',
                  background: `${sw.yellow}15`,
                  border: `2px dashed ${sw.yellow}`,
                  borderRadius: '6px',
                  color: sw.yellow,
                  fontWeight: 700,
                  fontSize: '16px',
                  fontFamily: sw.fontMono,
                }}
              >
                {nextPiece}
              </span>
            </React.Fragment>
          );
          i++; // skip next
        } else {
          tokens.push(
            <span
              key={i}
              style={{
                display: 'inline-block',
                padding: '6px 8px',
                borderRadius: '6px',
                color: getPieceColor(piece, i),
                fontWeight: 600,
                fontSize: '16px',
                fontFamily: sw.fontMono,
              }}
            >
              {piece}
            </span>
          );
        }
      } else {
        tokens.push(
          <span
            key={i}
            style={{
              display: 'inline-block',
              padding: '6px 8px',
              borderRadius: '6px',
              color: getPieceColor(piece, i),
              fontWeight: 600,
              fontSize: '16px',
              fontFamily: sw.fontMono,
            }}
          >
            {piece}
          </span>
        );
      }
    }

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', justifyContent: 'center' }}>
        {tokens}
      </div>
    );
  };

  return (
    <div
      style={{
        width: '100%',
        padding: '20px 16px',
        background: sw.shellBackground,
        borderRadius: sw.shellBorderRadius,
        border: sw.shellBorder,
        boxShadow: sw.shellShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        fontFamily: sw.fontSans,
        overflow: 'hidden',
      }}
    >
      {/* Step counter */}
      <div style={{ textAlign: 'center' }}>
        <span style={{
          fontSize: '11px',
          fontWeight: 700,
          color: sw.textMuted,
          textTransform: 'uppercase',
          letterSpacing: sw.lsEyebrow,
        }}>
          {step < 0 ? 'Estado Inicial (caracteres)' : `Merge ${step + 1} de ${totalSteps}`}
        </span>
      </div>

      {/* Current token state */}
      <div style={{
        padding: '16px',
        background: sw.tint,
        borderRadius: '12px',
        border: `1px solid ${sw.borderSubtle}`,
        minHeight: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {renderPieces(currentState, step >= 0 ? mergeSteps[step].pair : null)}
      </div>

      {/* Merge rules timeline */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: '11px',
          fontWeight: 600,
          color: sw.textMuted,
          textTransform: 'uppercase',
          letterSpacing: sw.lsEyebrow,
          marginBottom: '10px',
          textAlign: 'center',
        }}>
          {copy.stackLabel}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {mergeSteps.map((s, idx) => {
            const isApplied = idx < step;
            const isActive = idx === step;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  background: isActive ? `${sw.cyan}12` : isApplied ? `${sw.green}08` : 'transparent',
                  borderRadius: '8px',
                  border: `1px solid ${isActive ? sw.cyan + '55' : isApplied ? sw.green + '33' : sw.borderSubtle}`,
                  transition: sw.transitionFast,
                  opacity: isApplied || isActive ? 1 : 0.4,
                }}
              >
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: 700,
                  background: isApplied ? sw.green : isActive ? sw.cyan : sw.tintStronger,
                  color: isApplied || isActive ? '#000' : sw.textMuted,
                  flexShrink: 0,
                }}>
                  {isApplied ? '✓' : idx + 1}
                </div>
                <div style={{
                  fontFamily: sw.fontMono,
                  fontSize: '13px',
                  fontWeight: 600,
                  color: isApplied ? sw.green : isActive ? sw.cyan : sw.textDim,
                  flex: 1,
                }}>
                  {s.label}
                </div>
                {isApplied && (
                  <span style={{ fontSize: '11px', color: sw.green, fontWeight: 600 }}>aplicado</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Final result */}
      {step === totalSteps - 1 && (
        <div style={{
          padding: '12px',
          background: `${sw.green}08`,
          borderRadius: '10px',
          border: `1px solid ${sw.green}33`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', color: sw.green, fontWeight: 700, textTransform: 'uppercase' }}>
            {copy.completedLabel}
          </div>
          <div style={{
            fontFamily: sw.fontMono,
            fontSize: '16px',
            color: sw.green,
            fontWeight: 700,
            marginTop: '4px',
          }}>
            {currentState.join(' ')}
          </div>
        </div>
      )}

      {/* Controls */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
        {step < totalSteps - 1 && (
          <button
            onClick={() => setStep((s) => s + 1)}
            style={{
              flex: 1,
              padding: '10px 20px',
              background: sw.cyan,
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              fontSize: sw.fsSmall,
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: `0 0 12px ${sw.cyan}33`,
              transition: sw.transitionFast,
            }}
          >
            {step < 0 ? `Iniciar: ${mergeSteps[0]?.label}` : `Próximo: ${mergeSteps[step + 1]?.label}`} →
          </button>
        )}
        {step >= 0 && (
          <button
            onClick={() => setStep(-1)}
            style={{
              padding: '10px 16px',
              background: sw.tintStronger,
              color: sw.text,
              border: `1px solid ${sw.borderSubtle}`,
              borderRadius: '8px',
              fontSize: sw.fsSmall,
              fontWeight: 600,
              cursor: 'pointer',
              transition: sw.transitionFast,
            }}
          >
            {copy.resetLabel}
          </button>
        )}
      </div>
    </div>
  );
});
