import React, { useState } from 'react';
import type { DpoPreferenceStepperCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface Props {
  copy: DpoPreferenceStepperCopy;
}

interface TensorRow {
  label: string;
  values: string[];
  accent?: string;
}

const STEP_COLORS = [sw.cyan, sw.sky, sw.orange, sw.purple, sw.green, sw.rose];

const policyTokenLogps: TensorRow[] = [
  { label: 'chosen', values: ['0', '-0.20', '-0.30', '-0.30'], accent: sw.green },
  { label: 'rejected', values: ['0', '-0.35', '-0.35', '-0.40'], accent: sw.rose },
];

const referenceTokenLogps: TensorRow[] = [
  { label: 'chosen', values: ['0', '-0.30', '-0.30', '-0.30'], accent: sw.green },
  { label: 'rejected', values: ['0', '-0.30', '-0.30', '-0.35'], accent: sw.rose },
];

export const DpoPreferenceStepper = React.memo(({ copy }: Props) => {
  const [activeStep, setActiveStep] = useState(0);
  const lastStepIndex = copy.steps.length - 1;
  const currentStep = copy.steps[activeStep];
  const accent = STEP_COLORS[activeStep % STEP_COLORS.length];
  const progress = ((activeStep + 1) / copy.steps.length) * 100;
  const isFirst = activeStep === 0;
  const isLast = activeStep === lastStepIndex;

  if (!currentStep) return null;

  return (
    <TabbedPanelSurface minHeight={0}>
      <PanelCard className="dpo-stepper-panel" minHeight={0} padding={16} gap={10} style={{ height: '100%' }}>
        <div style={{ display: 'grid', gap: 3 }}>
          <div style={{ color: sw.cyan, fontSize: 10, fontWeight: 900, letterSpacing: sw.lsEyebrow, textTransform: 'uppercase' }}>{copy.title}</div>
          <div style={{ color: sw.textDim, fontSize: 12, lineHeight: 1.45 }}>{copy.subtitle}</div>
        </div>

        <ExampleStrip copy={copy} />

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <span style={{ color: sw.textDim, fontSize: 10, fontWeight: 800, letterSpacing: sw.lsSmall, textTransform: 'uppercase' }}>{copy.stepperTitle}</span>
          <span style={{ color: accent, fontFamily: sw.fontMono, fontSize: 10, fontWeight: 900 }}>{copy.progressLabel} {activeStep + 1}/{copy.steps.length}</span>
        </div>

        <div style={{ height: 5, overflow: 'hidden', borderRadius: 999, background: sw.tintStrong }}>
          <div style={{ width: `${progress}%`, height: '100%', borderRadius: 999, background: `linear-gradient(90deg, ${sw.cyan}, ${accent})`, transition: 'width 180ms ease' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${copy.steps.length}, minmax(0, 1fr))`, gap: 6 }}>
          {copy.steps.map((step, index) => {
            const active = index === activeStep;
            const completed = index < activeStep;
            const stepAccent = STEP_COLORS[index % STEP_COLORS.length];
            return (
              <button
                key={step.label}
                type="button"
                onClick={() => setActiveStep(index)}
                aria-current={active ? 'step' : undefined}
                style={{
                  minWidth: 0,
                  padding: '7px 4px',
                  borderRadius: 10,
                  border: `1px solid ${active ? `${stepAccent}88` : sw.borderSubtle}`,
                  background: active ? `${stepAccent}18` : completed ? sw.tintStrong : sw.tint,
                  color: active ? sw.text : sw.textDim,
                  cursor: 'pointer',
                  display: 'grid',
                  justifyItems: 'center',
                  gap: 4,
                  transition: sw.transitionFast,
                }}
              >
                <span style={{ width: 19, height: 19, borderRadius: 999, display: 'grid', placeItems: 'center', color: active ? '#071018' : sw.text, background: active ? stepAccent : completed ? `${stepAccent}66` : sw.tintStrong, fontFamily: sw.fontMono, fontSize: 9, fontWeight: 900 }}>
                  {index + 1}
                </span>
                <span style={{ maxWidth: '100%', overflow: 'hidden', textOverflow: 'ellipsis', color: active ? stepAccent : sw.textDim, fontSize: 9, fontWeight: 800, whiteSpace: 'nowrap' }}>{step.label}</span>
              </button>
            );
          })}
        </div>

        <div className="dpo-stepper-active" style={{ flex: '1 1 0', minHeight: 0, overflowY: 'auto', paddingRight: 3, display: 'flex', flexDirection: 'column', gap: 9 }}>
          <div style={{ padding: '10px 12px', borderRadius: 13, border: `1px solid ${accent}44`, background: `linear-gradient(135deg, ${accent}12, rgba(255,255,255,0.025))`, display: 'grid', gap: 5 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
              <span style={{ color: accent, fontSize: 11, fontWeight: 900, letterSpacing: sw.lsSmall, textTransform: 'uppercase' }}>{currentStep.title}</span>
              <span style={{ color: sw.textDim, fontSize: 9, fontWeight: 800 }}>{activeStep + 1} / {copy.steps.length}</span>
            </div>
            <code style={{ color: sw.text, fontFamily: sw.fontMono, fontSize: 12, lineHeight: 1.45, overflowWrap: 'anywhere' }}>{currentStep.operation}</code>
            <div style={{ color: sw.textDim, fontSize: 11.5, lineHeight: 1.5 }}>{currentStep.description}</div>
          </div>

          <StepTensorView step={activeStep} copy={copy} accent={accent} />

          {isLast ? (
            <div style={{ padding: '9px 11px', borderRadius: 12, border: `1px solid ${sw.green}44`, background: `${sw.green}0f`, display: 'grid', gap: 4 }}>
              <span style={{ color: sw.green, fontSize: 9, fontWeight: 900, letterSpacing: sw.lsSmall, textTransform: 'uppercase' }}>{copy.takeawayTitle}</span>
              <span style={{ color: sw.textDim, fontSize: 11.5, lineHeight: 1.5 }}>{copy.takeawayBody}</span>
            </div>
          ) : null}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 10, alignItems: 'center' }}>
          <NavButton label={copy.previousLabel} disabled={isFirst} onClick={() => setActiveStep((step) => Math.max(0, step - 1))} />
          <div style={{ justifySelf: 'center', color: sw.textDim, fontFamily: sw.fontMono, fontSize: 10, fontWeight: 800 }}>{String(activeStep + 1).padStart(2, '0')} / {String(copy.steps.length).padStart(2, '0')}</div>
          <NavButton label={copy.nextLabel} disabled={isLast} accent={accent} onClick={() => setActiveStep((step) => Math.min(lastStepIndex, step + 1))} />
        </div>
      </PanelCard>
    </TabbedPanelSurface>
  );
});

const ExampleStrip: React.FC<{ copy: DpoPreferenceStepperCopy }> = ({ copy }) => (
  <div style={{ padding: '8px 10px', borderRadius: 12, border: `1px solid ${sw.borderSubtle}`, background: sw.tint, display: 'grid', gap: 6 }}>
    <div style={{ display: 'flex', gap: 7, alignItems: 'baseline', minWidth: 0 }}>
      <span style={{ flexShrink: 0, color: sw.cyan, fontSize: 8.5, fontWeight: 900, letterSpacing: sw.lsSmall, textTransform: 'uppercase' }}>{copy.promptLabel}</span>
      <span style={{ minWidth: 0, overflow: 'hidden', color: sw.text, fontSize: 10.5, fontWeight: 700, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{copy.promptText}</span>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)', gap: 8 }}>
      <AnswerLine label={copy.chosenLabel} text={copy.chosenText} accent={sw.green} />
      <AnswerLine label={copy.rejectedLabel} text={copy.rejectedText} accent={sw.rose} />
    </div>
  </div>
);

const AnswerLine: React.FC<{ label: string; text: string; accent: string }> = ({ label, text, accent }) => (
  <div style={{ minWidth: 0, display: 'flex', gap: 6 }}>
    <span style={{ flexShrink: 0, color: accent, fontSize: 8.5, fontWeight: 900, textTransform: 'uppercase' }}>{label}</span>
    <span style={{ minWidth: 0, overflow: 'hidden', color: sw.textDim, fontSize: 9.5, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{text}</span>
  </div>
);

const StepTensorView: React.FC<{ step: number; copy: DpoPreferenceStepperCopy; accent: string }> = ({ step, copy, accent }) => {
  if (step === 0) {
    return (
      <div className="dpo-tensor-pair" style={twoColumnGrid}>
        <TensorGrid title="input_ids" shapeLabel={copy.shapeLabel} shape="[2B,T] = [2,5]" rows={[
          { label: copy.chosenLabel, values: ['11', '12', '31', '32', '33'], accent: sw.green },
          { label: copy.rejectedLabel, values: ['11', '12', '41', '42', '43'], accent: sw.rose },
        ]} />
        <TensorGrid title="completion_mask" shapeLabel={copy.shapeLabel} shape="[2B,T] = [2,5]" rows={[
          { label: copy.chosenLabel, values: ['0', '0', '1', '1', '1'], accent: sw.green },
          { label: copy.rejectedLabel, values: ['0', '0', '1', '1', '1'], accent: sw.rose },
        ]} />
      </div>
    );
  }

  if (step === 1) {
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <div className="dpo-tensor-pair" style={twoColumnGrid}>
          <BranchCard label={copy.trainablePolicyLabel} detail="requires_grad=True" output="logits: [2,5,V]" accent={sw.cyan} />
          <BranchCard label={copy.frozenReferenceLabel} detail="torch.no_grad()" output="ref_logits: [2,5,V]" accent={sw.purple} />
        </div>
        <TransformationRow items={['logits [2,5,V]', 'logits[:,:-1,:]', 'shift_logits [2,4,V]']} accent={accent} />
        <div className="dpo-tensor-pair" style={twoColumnGrid}>
          <TensorGrid title="shift_labels = input_ids[:,1:]" shapeLabel={copy.shapeLabel} shape="[2B,T-1] = [2,4]" rows={[
            { label: copy.chosenLabel, values: ['12', '31', '32', '33'], accent: sw.green },
            { label: copy.rejectedLabel, values: ['12', '41', '42', '43'], accent: sw.rose },
          ]} />
          <TensorGrid title="shift_completion_mask" shapeLabel={copy.shapeLabel} shape="[2B,T-1] = [2,4]" rows={[
            { label: copy.chosenLabel, values: ['0', '1', '1', '1'], accent: sw.green },
            { label: copy.rejectedLabel, values: ['0', '1', '1', '1'], accent: sw.rose },
          ]} />
        </div>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <TransformationRow items={['[2,4,V]', 'gather(token_id)', '[2,4]', '× mask']} accent={accent} />
        <div className="dpo-tensor-pair" style={twoColumnGrid}>
          <TensorGrid title={copy.trainablePolicyLabel} shapeLabel={copy.shapeLabel} shape="per_token_logps [2,4]" rows={policyTokenLogps} />
          <TensorGrid title={copy.frozenReferenceLabel} shapeLabel={copy.shapeLabel} shape="ref_per_token_logps [2,4]" rows={referenceTokenLogps} />
        </div>
        <InfoLine label={copy.tensorLabel} value={copy.maskedTokenNote} accent={accent} />
      </div>
    );
  }

  if (step === 3) {
    return (
      <div style={{ display: 'grid', gap: 8 }}>
        <div className="dpo-tensor-pair" style={twoColumnGrid}>
          <ReductionCard label={copy.trainablePolicyLabel} source="[[0,-.20,-.30,-.30], [0,-.35,-.35,-.40]]" result="[-0.80, -1.10]" accent={sw.cyan} />
          <ReductionCard label={copy.frozenReferenceLabel} source="[[0,-.30,-.30,-.30], [0,-.30,-.30,-.35]]" result="[-0.90, -0.95]" accent={sw.purple} />
        </div>
        <TransformationRow items={['logps [2B]', '.chunk(2, dim=0)', 'chosen [B]', 'rejected [B]']} accent={accent} />
        <div className="dpo-tensor-pair" style={twoColumnGrid}>
          <ScorePair title="πθ" chosen="chosen_logps = [-0.80]" rejected="rejected_logps = [-1.10]" />
          <ScorePair title="π_ref" chosen="ref_chosen_logps = [-0.90]" rejected="ref_rejected_logps = [-0.95]" />
        </div>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div style={{ display: 'grid', gap: 7 }}>
        <FormulaRow label="chosen_logratio [B]" formula="-0.80 - (-0.90) = 0.10" accent={sw.green} />
        <FormulaRow label="rejected_logratio [B]" formula="-1.10 - (-0.95) = -0.15" accent={sw.rose} />
        <FormulaRow label="delta_score [B]" formula="0.10 - (-0.15) = 0.25" accent={sw.cyan} />
        <FormulaRow label="β · delta_score [B]" formula="0.1 × 0.25 = 0.025" accent={sw.orange} />
        <FormulaRow label="loss [B]" formula="-logsigmoid(0.025) = 0.6807" accent={accent} strong />
      </div>
    );
  }

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <FormulaRow label="∂L/∂delta_score [B]" formula="-β · σ(-βΔ) ≈ -0.0494" accent={sw.orange} />
      <TensorGrid title={copy.gradientDirectionLabel} shapeLabel={copy.shapeLabel} shape="∂L/∂[chosen_logps, rejected_logps] = [2B]" rows={[
        { label: 'grad', values: ['-0.0494', '+0.0494'], accent: accent },
      ]} />
      <div className="dpo-tensor-pair" style={twoColumnGrid}>
        <BranchCard label={copy.trainablePolicyLabel} detail="loss.backward() → ∇θL" output="θ ← θ - η∇θL" accent={sw.green} />
        <BranchCard label={copy.frozenReferenceLabel} detail="requires_grad=False" output={copy.frozenNoUpdateLabel} accent={sw.purple} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 8, alignItems: 'center' }}>
        <DirectionBadge text={copy.chosenUpLabel} accent={sw.green} />
        <span style={{ color: sw.textDim, fontSize: 15 }}>·</span>
        <DirectionBadge text={copy.rejectedDownLabel} accent={sw.rose} />
      </div>
    </div>
  );
};

const TensorGrid: React.FC<{ title: string; shapeLabel: string; shape: string; rows: TensorRow[] }> = ({ title, shapeLabel, shape, rows }) => {
  const columnCount = rows[0]?.values.length ?? 0;
  return (
    <div style={{ minWidth: 0, padding: '9px 10px', borderRadius: 12, border: `1px solid ${sw.borderSubtle}`, background: sw.tint, display: 'grid', gap: 7, overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'baseline' }}>
        <span style={{ color: sw.text, fontFamily: sw.fontMono, fontSize: 9.5, fontWeight: 900 }}>{title}</span>
        <span style={{ color: sw.cyan, fontFamily: sw.fontMono, fontSize: 8.5, fontWeight: 800, whiteSpace: 'nowrap' }}>{shapeLabel}: {shape}</span>
      </div>
      <div style={{ minWidth: columnCount * 42 + 70, display: 'grid', gap: 4 }}>
        {rows.map((row) => (
          <div key={`${title}-${row.label}`} style={{ display: 'grid', gridTemplateColumns: `68px repeat(${columnCount}, minmax(36px, 1fr))`, gap: 4 }}>
            <span style={{ padding: '5px 4px', overflow: 'hidden', color: row.accent ?? sw.textDim, fontSize: 8.5, fontWeight: 900, textOverflow: 'ellipsis', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{row.label}</span>
            {row.values.map((value, index) => (
              <span key={`${row.label}-${index}`} style={{ padding: '5px 4px', borderRadius: 6, border: `1px solid ${(row.accent ?? sw.cyan)}22`, background: `${row.accent ?? sw.cyan}0c`, color: sw.text, fontFamily: sw.fontMono, fontSize: 9.5, fontWeight: 800, textAlign: 'center' }}>{value}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const BranchCard: React.FC<{ label: string; detail: string; output: string; accent: string }> = ({ label, detail, output, accent }) => (
  <div style={{ padding: '9px 10px', borderRadius: 12, border: `1px solid ${accent}33`, background: `${accent}0c`, display: 'grid', gap: 5 }}>
    <span style={{ color: accent, fontSize: 9, fontWeight: 900, letterSpacing: sw.lsSmall, textTransform: 'uppercase' }}>{label}</span>
    <code style={{ color: sw.textDim, fontFamily: sw.fontMono, fontSize: 9.5 }}>{detail}</code>
    <code style={{ color: sw.text, fontFamily: sw.fontMono, fontSize: 10.5, fontWeight: 800 }}>{output}</code>
  </div>
);

const TransformationRow: React.FC<{ items: string[]; accent: string }> = ({ items, accent }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
    {items.map((item, index) => (
      <React.Fragment key={item}>
        {index > 0 ? <span style={{ color: accent, fontSize: 11, fontWeight: 900 }}>→</span> : null}
        <code style={{ padding: '5px 7px', borderRadius: 7, border: `1px solid ${accent}2a`, background: `${accent}0d`, color: sw.text, fontFamily: sw.fontMono, fontSize: 9.5, fontWeight: 800 }}>{item}</code>
      </React.Fragment>
    ))}
  </div>
);

const ReductionCard: React.FC<{ label: string; source: string; result: string; accent: string }> = ({ label, source, result, accent }) => (
  <div style={{ padding: '9px 10px', borderRadius: 12, border: `1px solid ${accent}33`, background: `${accent}0a`, display: 'grid', gap: 5 }}>
    <span style={{ color: accent, fontSize: 9, fontWeight: 900, textTransform: 'uppercase' }}>{label}</span>
    <code style={{ color: sw.textDim, fontFamily: sw.fontMono, fontSize: 8.5, overflowWrap: 'anywhere' }}>{source}</code>
    <span style={{ color: accent, fontSize: 11, fontWeight: 900, textAlign: 'center' }}>↓ sum(dim=1)</span>
    <code style={{ color: sw.text, fontFamily: sw.fontMono, fontSize: 11, fontWeight: 900, textAlign: 'center' }}>{result}</code>
  </div>
);

const ScorePair: React.FC<{ title: string; chosen: string; rejected: string }> = ({ title, chosen, rejected }) => (
  <div style={{ padding: '8px 10px', borderRadius: 11, border: `1px solid ${sw.borderSubtle}`, background: sw.tint, display: 'grid', gap: 5 }}>
    <span style={{ color: sw.cyan, fontFamily: sw.fontMono, fontSize: 9, fontWeight: 900 }}>{title}</span>
    <code style={{ color: sw.green, fontFamily: sw.fontMono, fontSize: 9.5 }}>{chosen}</code>
    <code style={{ color: sw.rose, fontFamily: sw.fontMono, fontSize: 9.5 }}>{rejected}</code>
  </div>
);

const FormulaRow: React.FC<{ label: string; formula: string; accent: string; strong?: boolean }> = ({ label, formula, accent, strong }) => (
  <div style={{ padding: strong ? '10px 12px' : '8px 10px', borderRadius: 11, border: `1px solid ${accent}${strong ? '55' : '2e'}`, background: `${accent}${strong ? '16' : '0b'}`, display: 'grid', gridTemplateColumns: 'minmax(140px,0.72fr) minmax(0,1.28fr)', gap: 10, alignItems: 'center' }}>
    <span style={{ color: accent, fontFamily: sw.fontMono, fontSize: 9.5, fontWeight: 900 }}>{label}</span>
    <code style={{ color: sw.text, fontFamily: sw.fontMono, fontSize: strong ? 12 : 10.5, fontWeight: strong ? 900 : 700, overflowWrap: 'anywhere' }}>{formula}</code>
  </div>
);

const InfoLine: React.FC<{ label: string; value: string; accent: string }> = ({ label, value, accent }) => (
  <div style={{ padding: '7px 9px', borderRadius: 9, border: `1px solid ${accent}22`, background: `${accent}08`, color: sw.textDim, fontSize: 10.5, lineHeight: 1.45 }}>
    <strong style={{ color: accent }}>{label}: </strong>{value}
  </div>
);

const DirectionBadge: React.FC<{ text: string; accent: string }> = ({ text, accent }) => (
  <div style={{ padding: '8px 10px', borderRadius: 10, border: `1px solid ${accent}3d`, background: `${accent}10`, color: accent, fontFamily: sw.fontMono, fontSize: 10.5, fontWeight: 900, textAlign: 'center' }}>{text}</div>
);

const NavButton: React.FC<{ label: string; disabled: boolean; accent?: string; onClick: () => void }> = ({ label, disabled, accent = sw.cyan, onClick }) => (
  <button type="button" disabled={disabled} onClick={onClick} style={{ padding: '7px 11px', borderRadius: 10, border: `1px solid ${disabled ? sw.borderSubtle : `${accent}55`}`, background: disabled ? sw.tint : `${accent}12`, color: disabled ? sw.textMuted : sw.text, cursor: disabled ? 'not-allowed' : 'pointer', fontSize: 10, fontWeight: 800, opacity: disabled ? 0.55 : 1 }}>{label}</button>
);

const twoColumnGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
  gap: 8,
};
