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
  nextStepLabel?: string;
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
  const isComplete = step >= totalSteps;
  const svgW = 520;
  const svgH = 200;
  const tokenX = 14;
  const tokenGap = 22;
  const tokenW = 96;
  const tokenH = 16;
  const centerY = 100;
  const tokenYStart = centerY - ((allTokens.length - 1) * tokenGap) / 2;
  const blockH = 100;

  const accent = sw.cyan;
  const accent2 = sw.purple;
  const accent3 = sw.pink;

  return (
    <div
      style={{
        border: `1px solid ${sw.borderSubtle}`,
        borderRadius: 14,
        background: 'linear-gradient(180deg, rgba(0,229,255,0.04), rgba(255,255,255,0.01))',
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        flex: '1 1 0',
        minHeight: 0,
        height: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: accent }}>
            {copy.title}
          </div>
          {copy.subtitle && (
            <div style={{ marginTop: 3, fontSize: 12, lineHeight: 1.35, color: sw.textDim }}>{copy.subtitle}</div>
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

      <svg viewBox={`0 0 ${svgW} ${svgH}`} preserveAspectRatio="xMidYMid meet" style={{ width: '100%', flex: '1 1 0', minHeight: 0, height: 'auto', display: 'block' }}>
        <defs>
          <marker id="genArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M 0 0 L 6 3 L 0 6 Z" fill={accent} />
          </marker>
        </defs>
        <text x={tokenX + tokenW / 2} y={Math.max(14, tokenYStart - 14)} textAnchor="middle" fontSize="11" fill={sw.textMuted} fontWeight="800">
          {copy.contextLabel}
        </text>
        {allTokens.map((token, i) => {
          const y = tokenYStart + i * tokenGap;
          const isGenerated = i >= copy.initialTokens.length;
          const isLast = isGenerated && i === allTokens.length - 1;
          return (
            <g key={`tok-${i}`}>
              <rect
                x={tokenX} y={y - tokenH / 2} rx={6} ry={6} width={tokenW} height={tokenH}
                fill={isLast ? `${accent3}25` : isGenerated ? `${accent2}10` : sw.surface}
                stroke={isLast ? accent3 : isGenerated ? `${accent2}88` : sw.borderSubtle}
                strokeWidth={isLast ? 1.5 : 1}
              />
              <text x={tokenX + tokenW / 2} y={y + 4} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={isLast ? accent3 : isGenerated ? accent2 : sw.text} fontWeight="700">
                {token}
              </text>
            </g>
          );
        })}

        <line
          x1={tokenX + tokenW + 6}
          y1={centerY}
          x2={168}
          y2={centerY}
          stroke={accent}
          strokeWidth="2"
          markerEnd="url(#genArrow)"
        />

        <rect x={170} y={centerY - blockH / 2} rx={12} ry={12} width={110} height={blockH} fill={`${accent}22`} stroke={accent} strokeWidth="2" />
        <text x={225} y={centerY - 4} textAnchor="middle" fontSize="16" fill={accent} fontWeight="800">{copy.embeddingLabel}</text>
        <text x={225} y={centerY + 16} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={sw.textDim}>(B,T,C)</text>

        <line x1={282} y1={centerY} x2={338} y2={centerY} stroke={accent2} strokeWidth="2" markerEnd="url(#genArrow)" />

        <rect x={340} y={centerY - blockH / 2} rx={12} ry={12} width={110} height={blockH} fill={`${accent2}22`} stroke={accent2} strokeWidth="2" />
        <text x={395} y={centerY - 4} textAnchor="middle" fontSize="16" fill={accent2} fontWeight="800">{copy.linearLabel}</text>
        <text x={395} y={centerY + 16} textAnchor="middle" fontSize="11" fontFamily="monospace" fill={sw.textDim}>(B,T,V)</text>

        <line x1={452} y1={centerY} x2={504} y2={centerY} stroke={accent3} strokeWidth="2" markerEnd="url(#genArrow)" />

        <text x="504" y={centerY - 36} textAnchor="end" fontSize="11" fill={accent3} fontWeight="800">{copy.logitsLabel}</text>
        <text x="504" y={centerY + 36} textAnchor="end" fontSize="10" fontFamily="monospace" fill={sw.textDim}>argmax(-1)</text>

        {step > 0 && !isComplete && (
          <circle r="3" fill={accent3}>
            <animate attributeName="cx" values="106;168;282;338;452;504" dur="1.2s" repeatCount="indefinite" />
            <animate attributeName="cy" values={`${centerY};${centerY};${centerY};${centerY};${centerY};${centerY}`} dur="1.2s" repeatCount="indefinite" />
          </circle>
        )}
      </svg>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'center', marginTop: 0 }}>
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            flexWrap: 'wrap',
            fontFamily: sw.fontMono,
            fontSize: 11,
            color: sw.text,
            padding: '4px 8px',
            borderRadius: 8,
            border: `1px solid ${sw.borderSubtle}`,
            background: sw.surface,
          }}
        >
          <span style={{ fontWeight: 800, color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: 10 }}>
            {copy.contextLabel}:
          </span>
          {allTokens.map((token, i) => {
            const isGenerated = i >= copy.initialTokens.length;
            const isLast = i === allTokens.length - 1 && isGenerated;
            return (
              <span
                key={`ctl-${i}`}
                style={{
                  fontWeight: 700,
                  padding: '1px 6px',
                  borderRadius: 6,
                  background: isLast ? `${accent3}20` : isGenerated ? `${accent2}15` : sw.surfaceLight,
                  border: `1px solid ${isLast ? accent3 : isGenerated ? `${accent2}55` : sw.borderSubtle}`,
                  color: isLast ? accent3 : isGenerated ? accent2 : sw.text,
                }}
              >
                {token}
              </span>
            );
          })}
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
    </div>
  );
});
