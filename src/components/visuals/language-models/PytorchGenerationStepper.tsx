import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';

interface GenerationCopy {
  title: string;
  subtitle?: string;
  initialTokens: string[];
  generatedTokens: string[];
  vocabularyHint?: string;
  embeddingLabel: string;
  linearLabel: string;
  logitsLabel: string;
  contextLabel: string;
  nextLabel: string;
  prevLabel: string;
  nextStepLabel: string;
  stepLabel: string;
  completionLabel: string;
}

interface PytorchGenerationStepperProps {
  copy: GenerationCopy;
}

/**
 * Bottom-half visualization for the Code tab on the prediction slide.
 * Renders a tiny autoregressive network: tokens -> Embedding -> Linear -> logits,
 * with a step button that progressively appends generated tokens to the context.
 */
export const PytorchGenerationStepper = React.memo(({ copy }: PytorchGenerationStepperProps) => {
  const [step, setStep] = useState(0);
  const totalSteps = copy.generatedTokens.length;
  const visibleGenerated = copy.generatedTokens.slice(0, step);
  const allTokens = [...copy.initialTokens, ...visibleGenerated];
  const currentlyEmittedIndex = step > 0 ? copy.initialTokens.length + step - 1 : -1;
  const isComplete = step >= totalSteps;

  const accent = sw.cyan;
  const accent2 = sw.purple;
  const accent3 = sw.pink;

  return (
    <div
      style={{
        border: `1px solid ${sw.borderSubtle}`,
        borderRadius: 14,
        background: 'linear-gradient(180deg, rgba(0,229,255,0.04), rgba(255,255,255,0.01))',
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: accent }}>
            {copy.title}
          </div>
          {copy.subtitle && (
            <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.5, color: sw.textDim }}>{copy.subtitle}</div>
          )}
        </div>
        <div
          style={{
            fontFamily: sw.fontMono,
            fontSize: 11,
            fontWeight: 800,
            padding: '4px 10px',
            borderRadius: 999,
            background: `${accent}15`,
            border: `1px solid ${accent}44`,
            color: accent,
          }}
        >
          {copy.stepLabel} {step} / {totalSteps}
        </div>
      </div>

      {/* Tiny network diagram */}
      <svg viewBox="0 0 320 110" style={{ width: '100%', height: 110, display: 'block' }}>
        <defs>
          <marker id="genArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill={accent} />
          </marker>
        </defs>
        {/* Tokens column */}
        <text x="40" y="14" textAnchor="middle" fontSize="9" fill={sw.textMuted} fontWeight="800">
          {copy.contextLabel}
        </text>
        {allTokens.slice(-4).map((token, i, arr) => {
          const y = 30 + i * 16;
          const isJustEmitted = arr.length - 1 - i === arr.length - 1 - (allTokens.length - 1 - currentlyEmittedIndex) && currentlyEmittedIndex >= 0 && allTokens.length - 1 === currentlyEmittedIndex && i === arr.length - 1;
          return (
            <g key={`tok-${i}`}>
              <rect
                x={10} y={y - 8} rx={4} ry={4} width={60} height={14}
                fill={isJustEmitted ? `${accent3}25` : sw.surface}
                stroke={isJustEmitted ? accent3 : sw.borderSubtle}
                strokeWidth={isJustEmitted ? 1.5 : 1}
              />
              <text x={40} y={y + 2} textAnchor="middle" fontSize="10" fontFamily="monospace" fill={isJustEmitted ? accent3 : sw.text} fontWeight="700">
                {token}
              </text>
            </g>
          );
        })}

        {/* Arrow tokens -> embedding */}
        <line x1={72} y1={60} x2={108} y2={60} stroke={accent} strokeWidth="1.5" markerEnd="url(#genArrow)" />

        {/* Embedding node */}
        <rect x={110} y={45} rx={6} ry={6} width={60} height={30} fill={`${accent}22`} stroke={accent} strokeWidth="1.5" />
        <text x={140} y={58} textAnchor="middle" fontSize="9" fill={accent} fontWeight="800">{copy.embeddingLabel}</text>
        <text x={140} y={70} textAnchor="middle" fontSize="8" fontFamily="monospace" fill={sw.textDim}>(B,T,C)</text>

        {/* Arrow embedding -> linear */}
        <line x1={172} y1={60} x2={208} y2={60} stroke={accent2} strokeWidth="1.5" markerEnd="url(#genArrow)" />

        {/* Linear node */}
        <rect x={210} y={45} rx={6} ry={6} width={60} height={30} fill={`${accent2}22`} stroke={accent2} strokeWidth="1.5" />
        <text x={240} y={58} textAnchor="middle" fontSize="9" fill={accent2} fontWeight="800">{copy.linearLabel}</text>
        <text x={240} y={70} textAnchor="middle" fontSize="8" fontFamily="monospace" fill={sw.textDim}>(B,T,V)</text>

        {/* Arrow linear -> logits */}
        <line x1={272} y1={60} x2={304} y2={60} stroke={accent3} strokeWidth="1.5" markerEnd="url(#genArrow)" />

        {/* logits label */}
        <text x="304" y="46" textAnchor="end" fontSize="9" fill={accent3} fontWeight="800">{copy.logitsLabel}</text>
        <text x="304" y="86" textAnchor="end" fontSize="8" fontFamily="monospace" fill={sw.textDim}>argmax(-1)</text>

        {/* Animated dot on the wire when stepping */}
        {step > 0 && !isComplete && (
          <circle r="3" fill={accent3}>
            <animate attributeName="cx" values="80;108;172;208;272;304" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="cy" values="60;60;60;60;60;60" dur="1.2s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      {/* Context tokens chip list */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center', padding: '6px 0' }}>
        <span style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', color: sw.textMuted, marginRight: 4 }}>
          {copy.contextLabel}:
        </span>
        {allTokens.map((token, i) => {
          const isGenerated = i >= copy.initialTokens.length;
          const isLast = i === allTokens.length - 1 && isGenerated;
          return (
            <span
              key={`chip-${i}`}
              style={{
                fontFamily: sw.fontMono,
                fontSize: 11,
                fontWeight: 700,
                padding: '3px 8px',
                borderRadius: 999,
                background: isLast ? `${accent3}20` : isGenerated ? `${accent2}15` : sw.surfaceLight,
                border: `1px solid ${isLast ? accent3 : isGenerated ? `${accent2}55` : sw.borderSubtle}`,
                color: isLast ? accent3 : isGenerated ? accent2 : sw.textDim,
                animation: isLast ? 'pulseToken 0.6s ease' : undefined,
              }}
            >
              {token}
            </span>
          );
        })}
      </div>

      {/* Controls + status line */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'center' }}>
        <button
          type="button"
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          style={{
            padding: '8px 12px',
            fontSize: 11,
            fontWeight: 700,
            borderRadius: 10,
            border: `1px solid ${sw.borderSubtle}`,
            background: step === 0 ? 'rgba(255,255,255,0.025)' : sw.surface,
            color: step === 0 ? sw.textMuted : sw.text,
            cursor: step === 0 ? 'not-allowed' : 'pointer',
          }}
        >
          {copy.prevLabel}
        </button>
        <div style={{ fontSize: 11, lineHeight: 1.5, color: sw.textDim, textAlign: 'center' }}>
          {isComplete ? copy.completionLabel : copy.nextStepLabel}
        </div>
        <button
          type="button"
          onClick={() => setStep(s => Math.min(totalSteps, s + 1))}
          disabled={isComplete}
          style={{
            padding: '8px 12px',
            fontSize: 11,
            fontWeight: 700,
            borderRadius: 10,
            border: `1px solid ${isComplete ? sw.borderSubtle : `${accent}55`}`,
            background: isComplete ? 'rgba(255,255,255,0.025)' : `linear-gradient(135deg, ${accent}20, rgba(255,255,255,0.04))`,
            color: isComplete ? sw.textMuted : sw.text,
            cursor: isComplete ? 'not-allowed' : 'pointer',
            boxShadow: isComplete ? 'none' : `0 8px 16px ${accent}12`,
          }}
        >
          {copy.nextLabel}
        </button>
      </div>

      {copy.vocabularyHint && (
        <div style={{ fontSize: 11, lineHeight: 1.5, color: sw.textMuted, fontStyle: 'italic' }}>
          {copy.vocabularyHint}
        </div>
      )}
    </div>
  );
});
