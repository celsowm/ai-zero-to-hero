import React, { useMemo } from 'react';
import type { Gpt2PytorchE2eDebuggerCopy } from '../../../types/slide';
import { useLocale } from '../../../hooks/useLocale';
import { resolveSnippetSource } from '../../../content/registry';
import { PanelCard } from '../PanelCard';
import { CodeBlock } from '../../CodeBlock';
import { sw } from '../../../theme/tokens';
import { Gpt2ArchitectureGraph } from './Gpt2ArchitectureGraph';
import { TokenPredictionPanel } from './TokenPredictionPanel';
import { Gpt2InferenceControls } from './Gpt2InferenceControls';
import { useGpt2InferenceEngine } from './useGpt2InferenceEngine';

interface Props {
  copy: Gpt2PytorchE2eDebuggerCopy;
}

export const Gpt2PytorchE2eDebugger = React.memo(({ copy }: Props) => {
  const { language } = useLocale();
  const { snap, isPlaying, speed, phase, isComplete, handlePlayPause, handleStep, handleReset, setSpeed } = useGpt2InferenceEngine(copy);

   
  const resolvedCode = useMemo(() => {
    try {
      const snippet = resolveSnippetSource({ snippetId: copy.pythonSource.snippetId, language: 'python' }, language);
      return snippet?.code ?? '';
    } catch {
      return '';
    }
  }, [copy.pythonSource.snippetId, language]);

  const codeRange = useMemo(() => {
    const rangeMap: Record<string, keyof typeof copy.codeHighlightRanges> = {
      embedding: 'embedding',
      attention: 'attention',
      mlp: 'mlp',
      residual: 'residual',
      finalNorm: 'finalNorm',
      lmHead: 'lmHead',
      softmax: 'generation',
      nextToken: 'generation',
    };
    return copy.codeHighlightRanges[rangeMap[phase] ?? 'embedding'] ?? null;
  }, [copy.codeHighlightRanges, phase]);

  const explanation = copy.phaseExplanations?.[phase] ?? '';

  const stageLabels = copy.stages
    ? [
        copy.stages.tokenEmbedding,
        copy.stages.positionEmbedding,
        copy.stages.blockPrefix,
        copy.stages.blockPrefix,
        copy.stages.blockPrefix,
        copy.stages.finalNorm,
        copy.stages.lmHead,
        copy.stages.softmax,
      ]
    : [];

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.4fr 1.3fr 0.7fr', gridTemplateRows: '1fr auto', gap: 14, minHeight: 0, position: 'relative' }}>
      {/* Left panel: Architecture graph + phase info */}
      <PanelCard minHeight={0} gap={8} style={{ height: '100%', padding: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `1px solid ${sw.borderSubtle}`, paddingBottom: 8 }}>
          <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '.04em', color: sw.cyan, textTransform: 'uppercase' }}>
            {copy.labels.archLabel}: {copy.architecture.label}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--sw-text-dim)' }}>
            {copy.labels.phaseTitle}: <span style={{ color: sw.cyan }}>{phase}</span>
          </div>
        </div>

        <div style={{ flex: 1, minHeight: 0, borderRadius: 12, overflow: 'hidden', border: `1px solid ${sw.borderSubtle}`, background: 'rgba(0,0,0,0.2)' }}>
          <Gpt2ArchitectureGraph
            snap={snap}
            copy={{
              archLabel: copy.labels.archLabel,
              inputTokensLabel: copy.labels.inputTokensLabel,
              currentTensorLabel: copy.labels.currentTensorLabel,
              attentionWeightsLabel: copy.labels.attentionLabel,
              logitsLabel: copy.labels.logitsLabel,
              stageLabels,
            }}
            phase={phase}
            onHover={() => {}}
          />
        </div>
      </PanelCard>

      {/* Center panel: Code + explanation */}
      <PanelCard minHeight={0} gap={12} style={{ height: '100%', padding: 14 }}>
        {/* Phase header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 12px',
          borderRadius: 10,
          background: 'rgba(0,229,255,0.08)',
          border: '1px solid rgba(0,229,255,0.2)',
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, fontWeight: 900, color: sw.cyan }}>
              {copy.labels.stageInfo}: {phase}
            </span>
          </div>
        </div>

        {/* Explanation text */}
        {explanation && (
          <div style={{
            fontSize: 12,
            lineHeight: 1.6,
            color: 'var(--sw-text)',
            padding: '10px 12px',
            borderRadius: 10,
            background: 'rgba(0,0,0,0.15)',
            border: `1px solid ${sw.borderSubtle}`,
          }}>
            {explanation}
          </div>
        )}

        {/* Code block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minHeight: 120 }}>
          <div style={{
            fontSize: 9,
            fontWeight: 800,
            letterSpacing: '.06em',
            textTransform: 'uppercase',
            color: 'var(--sw-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{ width: 12, height: 1, background: 'currentColor', opacity: 0.3 }} />
            {copy.labels.codeTitle}
          </div>
          <CodeBlock
            code={resolvedCode}
            language="python"
            activeRange={codeRange}
            compact
            sourceRef={{ snippetId: copy.pythonSource.snippetId, language: 'python' }}
          />
        </div>
      </PanelCard>

      {/* Right panel: Token prediction + shapes */}
      <PanelCard minHeight={0} gap={10} style={{ height: '100%', padding: 12 }}>
        <TokenPredictionPanel
          snap={snap}
          copy={{
            nextTokenLabel: copy.stages.nextToken,
            topTokensLabel: copy.labels.topTokensLabel,
            tokenLabel: copy.labels.tokenTextLabel,
            idLabel: copy.labels.tokenIdLabel,
            tensorShapesLabel: copy.labels.tensorShapesLabel,
            wteLabel: copy.labels.wteLabel,
            wpeLabel: copy.labels.wpeLabel,
            cAttnLabel: copy.labels.cAttnLabel,
            cFcLabel: copy.labels.cFcLabel,
            lmHeadLabel: copy.labels.lmHeadLabel,
          }}
        />
      </PanelCard>

      {/* Bottom row: Controls (span all 3 columns) */}
      <div style={{ gridColumn: '1 / -1' }}>
        <Gpt2InferenceControls
          copy={{
            stepButton: copy.stepButton,
            playButton: copy.playButton,
            pauseButton: copy.pauseButton,
            resetButton: copy.resetButton,
            speedLabel: copy.labels.speedLabel,
          }}
          isPlaying={isPlaying}
          isComplete={isComplete}
          speed={speed}
          onStep={handleStep}
          onPlayPause={handlePlayPause}
          onReset={handleReset}
          onSpeedChange={setSpeed}
        />
      </div>
    </div>
  );
});
