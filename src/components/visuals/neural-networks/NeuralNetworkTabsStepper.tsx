import React, { useState } from 'react';
import type { NeuralNetworkTabsStepperVisualCopy } from '../../../types/slide';
import { CodeBlock } from '../../CodeBlock';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { TabsBar } from '../TabsBar';

interface NeuralNetworkTabsStepperProps {
  copy: NeuralNetworkTabsStepperVisualCopy;
}

const sectionStyle = (active: boolean, accent: string): React.CSSProperties => ({
  padding: 14,
  borderRadius: 16,
  background: active ? `${accent}14` : 'rgba(255,255,255,0.03)',
  border: `1px solid ${active ? `${accent}66` : 'rgba(255,255,255,0.06)'}`,
  boxShadow: active ? `inset 0 0 0 1px ${accent}22` : 'none',
  transition: 'all 180ms ease',
});

const sectionTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--sw-text-muted)',
  marginBottom: 10,
};

const valueGridStyle: React.CSSProperties = {
  display: 'grid',
  gap: 8,
};

const valueCardStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 12,
  padding: '10px 12px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.06)',
};

const metricGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
  gap: 10,
};

const diagramCardStyle: React.CSSProperties = {
  padding: 16,
  borderRadius: 18,
  background: 'linear-gradient(180deg, rgba(13, 15, 27, 0.92), rgba(10, 12, 22, 0.96))',
  border: '1px solid rgba(255,255,255,0.06)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)',
};

const findValue = (
  items: NeuralNetworkTabsStepperVisualCopy['stepperPanel']['steps'][number]['inputs'],
  fragments: string[],
) => {
  const match = items.find((item) => {
    const label = item.label.toLowerCase();
    return fragments.some((fragment) => label.includes(fragment));
  });

  return match?.value ?? '-';
};

const NetworkDiagram: React.FC<{
  copy: NeuralNetworkTabsStepperVisualCopy['stepperPanel'];
  step: NeuralNetworkTabsStepperVisualCopy['stepperPanel']['steps'][number];
}> = ({ copy, step }) => {
  const inputNodes = step.inputs.slice(0, 4);
  const h1Value = findValue(step.hidden, ['h1']);
  const h2Value = findValue(step.hidden, ['h2']);
  const outputValue = findValue(step.output, ['ŷ', 'prob', 'probability']);

  const activeInputs = step.activeSection === 'inputs' || step.activeSection === 'metrics';
  const activeHidden = step.activeSection === 'hidden' || step.activeSection === 'metrics';
  const activeOutput = step.activeSection === 'output' || step.activeSection === 'metrics';

  const inputPositions = [88, 158, 228, 298];
  const hiddenPositions = [124, 262];
  const outputPosition = 193;
  const accent = step.accent;

  return (
    <div style={diagramCardStyle}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 12,
          marginBottom: 12,
        }}
      >
        {[copy.inputSectionLabel, copy.hiddenSectionLabel, copy.outputSectionLabel].map((label, index) => (
          <div
            key={`${label}-${index}`}
            style={{
              padding: '8px 10px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.06)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--sw-text-muted)',
              textAlign: 'center',
            }}
          >
            {label}
          </div>
        ))}
      </div>

      <svg viewBox="0 0 760 386" width="100%" height="auto" aria-label={copy.title} style={{ display: 'block' }}>
        <defs>
          <linearGradient id="nn-edge-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(0,229,255,0.85)" />
            <stop offset="100%" stopColor="rgba(255,46,151,0.82)" />
          </linearGradient>
          <marker id="nn-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={accent} />
          </marker>
        </defs>

        <style>{`
          @keyframes nnPulse {
            0% { opacity: 0.28; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.08); }
            100% { opacity: 0.28; transform: scale(1); }
          }
          @keyframes nnFlow {
            from { stroke-dashoffset: 0; }
            to { stroke-dashoffset: -36; }
          }
        `}</style>

        <rect x="10" y="10" width="740" height="366" rx="28" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />

        {inputPositions.flatMap((y1, inputIndex) =>
          hiddenPositions.map((y2, hiddenIndex) => {
            const highlighted = activeInputs || activeHidden;
            return (
              <path
                key={`edge-i-${inputIndex}-h-${hiddenIndex}`}
                d={`M 166 ${y1} C 228 ${y1}, 282 ${y2}, 330 ${y2}`}
                fill="none"
                stroke={highlighted ? 'url(#nn-edge-grad)' : 'rgba(148,163,184,0.24)'}
                strokeWidth={highlighted ? 2.5 : 1.5}
                strokeDasharray={highlighted ? '8 8' : undefined}
                markerEnd={highlighted ? 'url(#nn-arrow)' : undefined}
                style={highlighted ? { animation: 'nnFlow 1.8s linear infinite' } : undefined}
              />
            );
          }),
        )}

        {hiddenPositions.map((y, hiddenIndex) => (
          <path
            key={`edge-h-${hiddenIndex}-o`}
            d={`M 426 ${y} C 502 ${y}, 544 ${outputPosition}, 590 ${outputPosition}`}
            fill="none"
            stroke={activeHidden || activeOutput ? 'url(#nn-edge-grad)' : 'rgba(148,163,184,0.24)'}
            strokeWidth={activeHidden || activeOutput ? 3 : 1.5}
            strokeDasharray={activeHidden || activeOutput ? '8 8' : undefined}
            markerEnd={activeHidden || activeOutput ? 'url(#nn-arrow)' : undefined}
            style={activeHidden || activeOutput ? { animation: 'nnFlow 1.6s linear infinite' } : undefined}
          />
        ))}

        {inputNodes.map((item, index) => {
          const y = inputPositions[index] ?? inputPositions[inputPositions.length - 1];
          return (
            <g key={item.label}>
              <circle
                cx="126"
                cy={y}
                r="26"
                fill={activeInputs ? `${accent}18` : 'rgba(255,255,255,0.04)'}
                stroke={activeInputs ? accent : 'rgba(255,255,255,0.16)'}
                strokeWidth="2"
                style={activeInputs ? { animation: 'nnPulse 1.8s ease-in-out infinite' } : undefined}
              />
              <text x="126" y={y + 6} textAnchor="middle" fontSize="15" fontWeight="800" fill="var(--sw-text)">
                x{index + 1}
              </text>

              <rect x="22" y={y - 21} width="84" height="42" rx="12" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.08)" />
              <text x="30" y={y - 3} fontSize="11.5" fill="var(--sw-text-dim)">
                {item.label}
              </text>
              <text x="30" y={y + 13} fontSize="13" fontWeight="700" fill="var(--sw-text)">
                {item.value}
              </text>
            </g>
          );
        })}

        {[
          { x: 378, y: hiddenPositions[0], label: 'h1', value: h1Value },
          { x: 378, y: hiddenPositions[1], label: 'h2', value: h2Value },
        ].map((node) => (
          <g key={node.label}>
            <circle
              cx={node.x}
              cy={node.y}
              r="34"
              fill={activeHidden ? `${accent}18` : 'rgba(255,255,255,0.04)'}
              stroke={activeHidden ? accent : 'rgba(255,255,255,0.16)'}
              strokeWidth="2.4"
              style={activeHidden ? { animation: 'nnPulse 1.7s ease-in-out infinite' } : undefined}
            />
            <text x={node.x} y={node.y - 4} textAnchor="middle" fontSize="16" fontWeight="800" fill="var(--sw-text)">
              {node.label}
            </text>
            <text x={node.x} y={node.y + 16} textAnchor="middle" fontSize="12" fill="var(--sw-text-dim)">
              {node.value}
            </text>
          </g>
        ))}

        <g>
          <circle
            cx="628"
            cy={outputPosition}
            r="38"
            fill={activeOutput ? `${accent}18` : 'rgba(255,255,255,0.04)'}
            stroke={activeOutput ? accent : 'rgba(255,255,255,0.16)'}
            strokeWidth="2.6"
            style={activeOutput ? { animation: 'nnPulse 1.5s ease-in-out infinite' } : undefined}
          />
          <text x="628" y={outputPosition - 4} textAnchor="middle" fontSize="16" fontWeight="800" fill="var(--sw-text)">
            ŷ
          </text>
          <text x="628" y={outputPosition + 16} textAnchor="middle" fontSize="12" fill="var(--sw-text-dim)">
            {outputValue}
          </text>
        </g>

        <text x="126" y="46" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="0.12em" fill="rgba(255,255,255,0.7)">
          INPUTS
        </text>
        <text x="378" y="46" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="0.12em" fill="rgba(255,255,255,0.7)">
          HIDDEN
        </text>
        <text x="628" y="46" textAnchor="middle" fontSize="12" fontWeight="700" letterSpacing="0.12em" fill="rgba(255,255,255,0.7)">
          OUTPUT
        </text>
      </svg>
    </div>
  );
};

const StepperPanel: React.FC<{ copy: NeuralNetworkTabsStepperVisualCopy['stepperPanel']; footer: string }> = ({ copy, footer }) => {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = copy.steps[activeStep];
  const lastStepIndex = copy.steps.length - 1;
  const progress = ((activeStep + 1) / copy.steps.length) * 100;
  const isFirst = activeStep === 0;
  const isLast = activeStep === lastStepIndex;

  return (
    <PanelCard minHeight={0} gap={14} style={{ height: '100%' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr auto',
          gap: 10,
          alignItems: 'center',
          padding: '8px 10px',
          borderRadius: 14,
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: currentStep.accent }}>
          {copy.title}
        </div>
        <div style={{ height: 5, borderRadius: 999, overflow: 'hidden', background: 'rgba(255,255,255,0.06)' }}>
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: 999,
              background: `linear-gradient(90deg, ${currentStep.accent}, rgba(255,255,255,0.92))`,
              transition: 'width 180ms ease',
            }}
          />
        </div>
        <div
          style={{
            padding: '6px 10px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: 'var(--sw-text-muted)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
          }}
        >
          {activeStep + 1} / {copy.steps.length}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${copy.steps.length}, minmax(0, 1fr))`, gap: 6 }}>
          {copy.steps.map((step, index) => {
            const active = index === activeStep;
            const completed = index < activeStep;

            return (
              <button
                key={step.label}
                type="button"
                onClick={() => setActiveStep(index)}
                style={{
                  minWidth: 0,
                  padding: '7px 8px',
                  borderRadius: 11,
                  border: `1px solid ${active ? `${step.accent}88` : 'rgba(255,255,255,0.06)'}`,
                  background: active ? `${step.accent}18` : completed ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.02)',
                  color: active ? 'var(--sw-text)' : 'var(--sw-text-dim)',
                  fontSize: 11,
                  fontWeight: 700,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  cursor: 'pointer',
                }}
              >
                {step.label}
              </button>
            );
          })}
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          overflowY: 'auto',
          display: 'grid',
          gap: 14,
          paddingRight: 4,
        }}
      >
        <NetworkDiagram copy={copy} step={currentStep} />

        <div
          style={{
            padding: 16,
            borderRadius: 18,
            border: `1px solid ${currentStep.accent}55`,
            background: `linear-gradient(180deg, ${currentStep.accent}18, rgba(255,255,255,0.025))`,
            display: 'grid',
            gap: 8,
          }}
        >
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: currentStep.accent }}>
            {activeStep + 1} / {copy.steps.length}
          </div>
          <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.12, color: 'var(--sw-text)' }}>
            {currentStep.title}
          </div>
          <div
            style={{
              alignSelf: 'start',
              display: 'inline-flex',
              padding: '8px 12px',
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'var(--sw-text)',
              fontSize: 12.5,
              fontWeight: 700,
              wordBreak: 'break-word',
            }}
          >
            {currentStep.formula}
          </div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{currentStep.description}</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.95fr 0.95fr', gap: 12 }}>
          <div style={sectionStyle(currentStep.activeSection === 'inputs', currentStep.accent)}>
            <div style={sectionTitleStyle}>{copy.inputSectionLabel}</div>
            <div style={valueGridStyle}>
              {currentStep.inputs.map((item) => (
                <div key={item.label} style={valueCardStyle}>
                  <span style={{ fontSize: 12.5, color: 'var(--sw-text-dim)' }}>{item.label}</span>
                  <strong style={{ fontSize: 14, color: 'var(--sw-text)' }}>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div style={sectionStyle(currentStep.activeSection === 'hidden', currentStep.accent)}>
            <div style={sectionTitleStyle}>{copy.hiddenSectionLabel}</div>
            <div style={valueGridStyle}>
              {currentStep.hidden.map((item) => (
                <div key={item.label} style={valueCardStyle}>
                  <span style={{ fontSize: 12.5, color: 'var(--sw-text-dim)' }}>{item.label}</span>
                  <strong style={{ fontSize: 14, color: 'var(--sw-text)' }}>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>

          <div style={sectionStyle(currentStep.activeSection === 'output', currentStep.accent)}>
            <div style={sectionTitleStyle}>{copy.outputSectionLabel}</div>
            <div style={valueGridStyle}>
              {currentStep.output.map((item) => (
                <div key={item.label} style={valueCardStyle}>
                  <span style={{ fontSize: 12.5, color: 'var(--sw-text-dim)' }}>{item.label}</span>
                  <strong style={{ fontSize: 14, color: 'var(--sw-text)' }}>{item.value}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={sectionStyle(currentStep.activeSection === 'metrics', currentStep.accent)}>
          <div style={sectionTitleStyle}>{copy.metricsSectionLabel}</div>
          <div style={metricGridStyle}>
            {currentStep.metrics.map((metric) => (
              <div key={metric.label} style={valueCardStyle}>
                <span style={{ fontSize: 12.5, color: 'var(--sw-text-dim)' }}>{metric.label}</span>
                <strong style={{ fontSize: 14, color: 'var(--sw-text)' }}>{metric.value}</strong>
              </div>
            ))}
          </div>
        </div>

        {isLast ? (
          <div
            style={{
              padding: '14px 16px',
              borderRadius: 16,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
          >
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: currentStep.accent, marginBottom: 6 }}>
              {copy.completionLabel}
            </div>
            <div style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--sw-text)' }}>{copy.completionDescription}</div>
          </div>
        ) : null}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 12, alignItems: 'center' }}>
        <button
          type="button"
          disabled={isFirst}
          onClick={() => setActiveStep((step) => Math.max(0, step - 1))}
          style={{
            padding: '9px 12px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: isFirst ? 'rgba(255,255,255,0.025)' : 'rgba(255,255,255,0.05)',
            color: isFirst ? 'rgba(232,228,240,0.42)' : 'var(--sw-text)',
            fontSize: 12,
            fontWeight: 700,
            cursor: isFirst ? 'not-allowed' : 'pointer',
          }}
        >
          {copy.previousLabel}
        </button>

        <div
          style={{
            justifySelf: 'center',
            padding: '8px 12px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.07)',
            color: 'var(--sw-text-muted)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          {activeStep + 1} / {copy.steps.length}
        </div>

        <button
          type="button"
          disabled={isLast}
          onClick={() => setActiveStep((step) => Math.min(lastStepIndex, step + 1))}
          style={{
            padding: '9px 12px',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.08)',
            background: isLast ? 'rgba(255,255,255,0.025)' : `linear-gradient(135deg, ${currentStep.accent}, rgba(255,255,255,0.85))`,
            color: isLast ? 'rgba(232,228,240,0.42)' : '#091018',
            fontSize: 12,
            fontWeight: 700,
            cursor: isLast ? 'not-allowed' : 'pointer',
            boxShadow: isLast ? 'none' : `0 14px 28px ${currentStep.accent}22`,
          }}
        >
          {copy.nextLabel}
        </button>
      </div>

      <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-muted)' }}>{footer}</div>
    </PanelCard>
  );
};

const CodePanel: React.FC<{ copy: NeuralNetworkTabsStepperVisualCopy['codePanel']; footer: string }> = ({ copy, footer }) => (
  <PanelCard minHeight={0} gap={12} style={{ height: '100%' }}>
    <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{copy.title}</div>
    <div style={{ fontSize: 13.5, lineHeight: 1.6, color: 'var(--sw-text-dim)' }}>{copy.description}</div>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', padding: 12, borderRadius: 14, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
      <CodeBlock code={copy.code} language="python" explanations={copy.codeExplanations} />
    </div>
    <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-muted)' }}>{footer}</div>
  </PanelCard>
);

export const NeuralNetworkTabsStepper: React.FC<NeuralNetworkTabsStepperProps> = ({ copy }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16 }}>
      <TabsBar ariaLabel={copy.codePanel.title} items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />
      <TabbedPanelSurface>{activeTab === 0 ? <CodePanel copy={copy.codePanel} footer={copy.footer} /> : <StepperPanel copy={copy.stepperPanel} footer={copy.footer} />}</TabbedPanelSurface>
    </div>
  );
};
