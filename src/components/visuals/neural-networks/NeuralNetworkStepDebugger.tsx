import React, { useMemo } from 'react';
import type { NeuralNetworkStepDebuggerVisualCopy } from '../../../types/slide';
import { useLocale } from '../../../hooks/useLocale';
import { resolveSnippetSource } from '../../../content/registry';
import { PanelCard } from '../PanelCard';
import { CodeBlock } from '../../CodeBlock';
import { sw } from '../../../theme/tokens';
import { NetworkGraph } from './NetworkGraph';
import { ComputationPanel } from './ComputationPanel';
import { TrainingControls } from './TrainingControls';
import { TrainingMetricsPanel } from './TrainingMetricsPanel';
import { useTrainingDebugger } from './useTrainingDebugger';

interface Props {
  copy: NeuralNetworkStepDebuggerVisualCopy;
}

export const NeuralNetworkStepDebugger = React.memo(({ copy }: Props) => {
  const { language } = useLocale();
  const {
    snap,
    engineState,
    isPlaying,
    speed,
    phase,
    activeTooltip,
    setActiveTooltip,
    explanationRef,
    mse,
    accuracy,
    handlePlayPause,
    handleStep,
    handleReset,
    setSpeed,
  } = useTrainingDebugger(copy);

  const resolvedCode = useMemo(() => {
    if (!copy.pythonSource) return '';
    try {
      const snippet = resolveSnippetSource(copy.pythonSource, language);
      return snippet?.code ?? copy.pythonCode ?? '';
    } catch {
      return copy.pythonCode ?? '';
    }
  }, [copy.pythonCode, copy.pythonSource, language]);

  const codeRange = useMemo(() => {
    try {
      const snippet = resolveSnippetSource(copy.pythonSource!, language);
      return snippet?.regions[phase] ?? copy.codeHighlightRanges?.[phase] ?? null;
    } catch {
      return copy.codeHighlightRanges?.[phase] ?? null;
    }
  }, [copy.codeHighlightRanges, copy.pythonSource, language, phase]);

  if (!engineState) return null;

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.4fr 1.3fr 0.7fr', gap: 14, minHeight: 0, position: 'relative' }}>
      {activeTooltip ? (
        <div
          style={{
            position: 'absolute',
            top: 20,
            left: 20,
            zIndex: 100,
            padding: '8px 12px',
            borderRadius: 8,
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.15)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
            maxWidth: 240,
            pointerEvents: 'none',
          }}
        >
          <div style={{ fontSize: 11, color: 'var(--sw-text)', lineHeight: 1.4, fontWeight: 500 }}>{activeTooltip}</div>
        </div>
      ) : null}

      {/* Left panel: Network graph + controls */}
      <PanelCard minHeight={0} gap={10} style={{ height: '100%', padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${sw.borderSubtle}`, paddingBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.04em', color: sw.cyan, textTransform: 'uppercase' }}>
            {copy.trainingLabels.archLabel}: {copy.architecture.label}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)' }}>
            {copy.trainingLabels.epochLabel} <span style={{ color: 'var(--sw-text)' }}>{engineState.epoch}/{copy.totalEpochs}</span>
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, borderRadius: 12, overflow: 'hidden', border: `1px solid ${sw.borderSubtle}`, background: 'rgba(0,0,0,0.2)' }}>
          <NetworkGraph snap={snap} copy={copy} activePhase={phase} onHover={setActiveTooltip} />
        </div>

        <TrainingControls
          copy={copy}
          engineState={engineState}
          isPlaying={isPlaying}
          speed={speed}
          onStep={handleStep}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onSpeedChange={setSpeed}
        />
      </PanelCard>

      {/* Center panel: Sample info + computation + code */}
      <PanelCard minHeight={0} gap={12} style={{ height: '100%', padding: 14 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 10px', borderRadius: 10, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: sw.cyan }}>
              {copy.labels.sampleLabel} {snap ? `${snap.sampleIndex + 1}/${copy.dataset.length}` : `—/${copy.dataset.length}`}
            </span>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'rgba(0,229,255,0.3)' }} />
            <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)', textTransform: 'uppercase', letterSpacing: '.05em' }}>{phase}</span>
          </div>
          <span style={{ fontSize: 10, fontWeight: 800, color: snap && snap.forward.loss < 0.1 ? '#22c55e' : '#f97316' }}>
            {copy.labels.lossLabel}: {!snap ? '—' : snap.forward.loss.toFixed(4)}
          </span>
        </div>

        <ComputationPanel snap={snap} activePhase={phase} />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minHeight: 120 }}>
          <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 12, height: 1, background: 'currentColor', opacity: 0.3 }} />
            {copy.labels.codeTitle}
          </div>
          <CodeBlock
            code={resolvedCode}
            language="python"
            activeRange={codeRange}
            compact
            sourceRef={copy.pythonSource}
          />
        </div>
      </PanelCard>

      {/* Right panel: Metrics + explanation + prediction */}
      <PanelCard minHeight={0} gap={10} style={{ height: '100%', padding: 12 }}>
        <TrainingMetricsPanel
          engineState={engineState}
          snap={snap}
          phase={phase}
          mse={mse}
          accuracy={accuracy}
          copy={copy}
          explanationRef={explanationRef}
        />
      </PanelCard>
    </div>
  );
});
