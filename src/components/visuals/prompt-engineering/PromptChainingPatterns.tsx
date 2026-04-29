import React, { useState } from 'react';
import type { PromptChainingPatternsCopy } from '../../../types/slide/prompt-engineering';
import { sw } from '../../../theme/tokens';

interface PromptChainingPatternsProps {
  copy: PromptChainingPatternsCopy;
}

const STEPS = [
  { key: 'step1Label', icon: '📥', color: 'cyan' as const, desc: 'Extrair entidades do texto' },
  { key: 'step2Label', icon: '🔍', color: 'purple' as const, desc: 'Analisar sentimento de cada entidade' },
  { key: 'step3Label', icon: '✅', color: 'green' as const, desc: 'Validar resultados com regras' },
  { key: 'step4Label', icon: '📋', color: 'yellow' as const, desc: 'Resumir em formato JSON' },
];

export const PromptChainingPatternsVisual = React.memo(({ copy }: PromptChainingPatternsProps) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <h3 style={{
        margin: 0,
        fontSize: sw.fsBody,
        fontWeight: 600,
        color: sw.text,
        textAlign: 'center',
      }}>
        {copy.title}
      </h3>

      {/* Input */}
      <div style={{
        padding: '12px 16px',
        borderRadius: '10px',
        border: `1px solid ${sw.borderSubtle}`,
        background: sw.surfaceLight,
        textAlign: 'center',
      }}>
        <span style={{ fontSize: sw.fsSmall, color: sw.textDim }}>
          {copy.inputLabel}: "A Apple reportou lucro recorde, mas investidores estão preocupados com a China."
        </span>
      </div>

      {/* Chain steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {STEPS.map((step, i) => {
          const isActive = i <= activeStep;
          const isCurrent = i === activeStep;
          const color = sw[step.color as keyof typeof sw] as string;

          return (
            <React.Fragment key={i}>
              <div
                onClick={() => setActiveStep(i)}
                style={{
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: `1px solid ${isActive ? `${color}55` : sw.borderSubtle}`,
                  background: isCurrent ? `${color}12` : isActive ? `${color}06` : 'transparent',
                  cursor: 'pointer',
                  transition: sw.transitionFast,
                  opacity: isActive ? 1 : 0.4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: isActive ? `${color}22` : sw.surfaceLight,
                  border: `1px solid ${isActive ? color : sw.borderSubtle}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: isActive ? color : sw.textMuted,
                  fontWeight: 700,
                  transition: sw.transitionFast,
                }}>
                  {i + 1}
                </span>
                <span style={{ fontSize: '18px' }}>{step.icon}</span>
                <span style={{
                  fontSize: sw.fsSmall,
                  color: isActive ? color : sw.textMuted,
                  fontWeight: isCurrent ? 700 : 500,
                  transition: sw.transitionFast,
                }}>
                  {(copy as unknown as Record<string, string>)[step.key]}
                </span>
                {isCurrent && (
                  <span style={{
                    marginLeft: 'auto',
                    fontSize: '10px',
                    color: sw.textMuted,
                    background: sw.surfaceLight,
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}>
                    {step.desc}
                  </span>
                )}
              </div>

              {/* Arrow between steps */}
              {i < STEPS.length - 1 && (
                <div style={{ textAlign: 'center', color: sw.textMuted, fontSize: '14px' }}>
                  {copy.arrowLabel}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Validation badge */}
      {activeStep === 2 && (
        <div style={{
          padding: '8px 14px',
          borderRadius: '8px',
          background: `${sw.green}14`,
          border: `1px solid ${sw.green}44`,
          textAlign: 'center',
          fontSize: sw.fsSmall,
          color: sw.green,
          fontWeight: 600,
        }}>
          ✓ {copy.validationLabel}: todas entidades válidas
        </div>
      )}

      {/* Output */}
      {activeStep === 3 && (
        <div style={{
          padding: '14px 16px',
          borderRadius: '10px',
          border: `1px solid ${sw.yellow}44`,
          background: `${sw.yellow}08`,
          fontFamily: sw.fontMono,
          fontSize: '11px',
          color: sw.yellow,
        }}>
          {`{`}<br />
          &nbsp;&nbsp;"entidades": ["Apple", "China"],<br />
          &nbsp;&nbsp;"sentimentos": {"{"}"positivo", "negativo{"}"}<br />
          {`}`}
        </div>
      )}
    </div>
  );
});
