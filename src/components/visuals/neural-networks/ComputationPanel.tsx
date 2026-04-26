import React from 'react';
import type { SampleSnapshot } from '../../../utils/neuralTrainingEngine';
import { useLocale } from '../../../context/LocaleContext';
import { SectionCard } from './SectionCard';
import { PLACEHOLDER_VALUE } from './constants';
import { fmt } from './utils';

type Phase = 'init' | 'forward' | 'backprop' | 'update' | 'finalize';

interface Props {
  snap: SampleSnapshot | null;
  activePhase: Phase;
}

export const ComputationPanel: React.FC<Props> = ({ snap, activePhase }) => {
  const { language } = useLocale();
  const isInit = activePhase === 'init';
  const forwardRows = snap
    ? [
        ...snap.forward.hiddenZs.map((value, index) => ({ label: `z${index + 1}`, value: isInit ? PLACEHOLDER_VALUE : fmt(value) })),
        ...snap.forward.hiddenActivations.map((value, index) => ({ label: `h${index + 1}`, value: isInit ? PLACEHOLDER_VALUE : fmt(value) })),
        { label: 'z_out', value: isInit ? PLACEHOLDER_VALUE : fmt(snap.forward.outputZ) },
        { label: 'y_hat', value: isInit ? PLACEHOLDER_VALUE : fmt(snap.forward.outputActivation) },
      ]
    : [
        { label: 'z1', value: PLACEHOLDER_VALUE },
        { label: 'z2', value: PLACEHOLDER_VALUE },
        { label: 'z3', value: PLACEHOLDER_VALUE },
        { label: 'h1', value: PLACEHOLDER_VALUE },
        { label: 'h2', value: PLACEHOLDER_VALUE },
        { label: 'h3', value: PLACEHOLDER_VALUE },
        { label: 'z_out', value: PLACEHOLDER_VALUE },
        { label: 'y_hat', value: PLACEHOLDER_VALUE },
      ];
  const targetLabel = language === 'pt-br' ? 'alvo' : 'target';
  const outputErrorLabel = language === 'pt-br' ? 'erro_out' : 'output_error';
  const lossRows = snap
    ? [
        { label: targetLabel, value: fmt(snap.sample.target, 1) },
        { label: outputErrorLabel, value: isInit ? PLACEHOLDER_VALUE : fmt(snap.backward.outputError) },
        { label: 'loss', value: isInit ? PLACEHOLDER_VALUE : fmt(snap.forward.loss, 6) },
      ]
    : [
        { label: targetLabel, value: PLACEHOLDER_VALUE },
        { label: outputErrorLabel, value: PLACEHOLDER_VALUE },
        { label: 'loss', value: PLACEHOLDER_VALUE },
      ];
  const backpropRows = snap
    ? [
        { label: 'delta_out', value: isInit ? PLACEHOLDER_VALUE : fmt(snap.backward.outputDelta) },
        ...snap.backward.hiddenDeltas.map((value, index) => ({ label: `delta_h[${index}]`, value: isInit ? PLACEHOLDER_VALUE : fmt(value) })),
      ]
    : [
        { label: 'delta_out', value: PLACEHOLDER_VALUE },
        { label: 'delta_h[0]', value: PLACEHOLDER_VALUE },
        { label: 'delta_h[1]', value: PLACEHOLDER_VALUE },
        { label: 'delta_h[2]', value: PLACEHOLDER_VALUE },
      ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        alignContent: 'start',
        gap: 10,
        padding: '4px 0',
      }}
    >
      <SectionCard title="Forward" color="#38bdf8" active={activePhase === 'forward'} columns={2} rows={forwardRows} />
      <SectionCard title="Loss" color="#f97316" active={activePhase === 'forward'} columns={2} rows={lossRows} />
      <SectionCard title="Backprop" color="#f472b6" active={activePhase === 'backprop'} columns={2} rows={backpropRows} />
    </div>
  );
};
