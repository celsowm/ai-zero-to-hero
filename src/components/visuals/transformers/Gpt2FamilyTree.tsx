import React, { useState, useCallback, useMemo } from 'react';
import type { Gpt2FamilyTreeCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

// ── Data ──────────────────────────────────────────────────────────────────────

interface GptModel {
  name: string;
  year: number;
  params: number; // in billions, 0 = unknown
  context: number; // tokens, 0 = unknown
  color: string;
  icon: string;
  description: string;
  descriptionEn: string;
  isGpt2?: boolean;
  isEstimate?: boolean; // specs not officially confirmed
}

const MODELS: GptModel[] = [
  {
    name: 'GPT-2',
    year: 2019,
    params: 1.5,
    context: 1024,
    color: sw.pink,
    icon: '🌟',
    description: 'O ponto de partida. Provou que atenção pura gera texto coerente. Specs documentados pela OpenAI.',
    descriptionEn: 'The starting point. Proved pure attention generates coherent text. Specs documented by OpenAI.',
    isGpt2: true,
  },
  {
    name: 'GPT-3',
    year: 2020,
    params: 175,
    context: 2048,
    color: sw.purple,
    icon: '🔵',
    description: '117× mais parâmetros. Few-shot learning emergente. Paper oficial: arxiv.org/abs/2005.14165',
    descriptionEn: '117× more parameters. Emergent few-shot learning. Official paper: arxiv.org/abs/2005.14165',
  },
  {
    name: 'GPT-3.5',
    year: 2022,
    params: 0,
    context: 4096,
    color: sw.indigo,
    icon: '💬',
    description: 'Primeiro ChatGPT. RLHF — o modelo que alinhou LLMs para uso humano. Specs não divulgados.',
    descriptionEn: 'First ChatGPT. RLHF — the model that aligned LLMs for human use. Specs not disclosed.',
    isEstimate: true,
  },
  {
    name: 'GPT-4',
    year: 2023,
    params: 0,
    context: 128000,
    color: sw.cyan,
    icon: '🟢',
    description: 'Raciocínio complexo, código, visão. OpenAI não divulgou specs. Estimativas: ~1.8T parâmetros.',
    descriptionEn: 'Complex reasoning, code, vision. OpenAI did not disclose specs. Estimates: ~1.8T parameters.',
    isEstimate: true,
  },
  {
    name: 'GPT-4o',
    year: 2024,
    params: 0,
    context: 128000,
    color: sw.emerald,
    icon: '⚡',
    description: 'Multimodal nativo (texto+voz+visão). Base para o "thinking" — raciocínio passo-a-passo revelado.',
    descriptionEn: 'Native multimodal (text+voice+vision). Base for "thinking" — revealed step-by-step reasoning.',
    isEstimate: true,
  },
  {
    name: 'GPT-5',
    year: 2026,
    params: 0,
    context: 0,
    color: sw.yellow,
    icon: '⭐',
    description: 'Specs totalmente desconhecidos. Sucessor com raciocínio mais profundo e ferramentas integradas.',
    descriptionEn: 'Specs completely unknown. Successor with deeper reasoning and integrated tools.',
    isEstimate: true,
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function SpecBadge({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: `${color}15`,
      border: `1px solid ${color}40`,
      borderRadius: '8px',
      padding: '6px 10px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2px',
      minWidth: '80px',
    }}>
      <span style={{ fontSize: '9px', color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</span>
      <span style={{ fontSize: '13px', fontWeight: '700', color, fontFamily: "'JetBrains Mono', monospace" }}>{value}</span>
    </div>
  );
}

function ModelNode({
  model, isHighlighted, isClickable, onClick, showDetails, isPtBr,
}: {
  model: GptModel;
  isHighlighted: boolean;
  isClickable: boolean;
  onClick: () => void;
  showDetails: boolean;
  isPtBr: boolean;
}) {
  const paramDisplay = model.params === 0
    ? '?'
    : model.params >= 1000
      ? `${(model.params / 1000).toFixed(0)}T`
      : model.params >= 1
        ? `${model.params}B`
        : `${model.params * 1000}M`;

  const contextDisplay = model.context === 0
    ? '?'
    : model.context >= 1000000
      ? `${(model.context / 1000000).toFixed(0)}M`
      : model.context >= 1000
        ? `${(model.context / 1000).toFixed(0)}K`
        : model.context.toString();

  return (
    <div
      onClick={isClickable ? onClick : undefined}
      style={{
        padding: '10px 14px',
        background: isHighlighted ? `${model.color}18` : sw.surface,
        border: `1px solid ${isHighlighted ? model.color : sw.borderSubtle}`,
        borderRadius: '10px',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        boxShadow: isHighlighted ? `0 0 16px ${model.color}22` : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <span style={{ fontSize: '16px' }}>{model.icon}</span>
        <span style={{ fontWeight: '800', fontSize: '14px', color: isHighlighted ? model.color : sw.text }}>
          {model.name}
        </span>
        {model.isEstimate && (
          <span style={{
            fontSize: '9px',
            color: sw.amber,
            background: `${sw.amber}18`,
            border: `1px solid ${sw.amber}40`,
            borderRadius: '4px',
            padding: '1px 6px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
          }}>
            {isPtBr ? 'não oficial' : 'unofficial'}
          </span>
        )}
        <span style={{ fontSize: '10px', color: sw.textMuted, marginLeft: 'auto' }}>{model.year}</span>
      </div>

      {showDetails && (
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
          <SpecBadge label="Params" value={paramDisplay} color={paramDisplay === '?' ? sw.amber : model.color} />
          <SpecBadge label="Ctx" value={contextDisplay} color={contextDisplay === '?' ? sw.amber : model.color} />
          <div style={{
            fontSize: '11px',
            color: sw.textDim,
            flex: '1 1 100%',
            marginTop: '4px',
            lineHeight: '1.4',
          }}>
            {isPtBr ? model.description : model.descriptionEn}
          </div>
        </div>
      )}
    </div>
  );
}

function ParamBar({ model, maxParams }: { model: GptModel; maxParams: number }) {
  if (model.params === 0) {
    return (
      <div style={{ marginBottom: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
          <span style={{ color: model.color, fontWeight: '600' }}>{model.name}</span>
          <span style={{ fontFamily: 'monospace', color: sw.amber }}>Desconhecido</span>
        </div>
        <div style={{ height: '6px', background: sw.void, borderRadius: '3px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: '100%',
              background: `repeating-linear-gradient(90deg, ${model.color}44, ${model.color}44 4px, transparent 4px, transparent 8px)`,
              borderRadius: '3px',
            }}
          />
        </div>
      </div>
    );
  }

  const logMax = Math.log10(maxParams);
  const logVal = Math.log10(model.params);
  const pct = (logVal / logMax) * 100;

  const paramDisplay = model.params >= 1000
    ? `${(model.params / 1000).toFixed(0)}T`
    : model.params >= 1
      ? `${model.params}B`
      : `${model.params * 1000}M`;

  return (
    <div style={{ marginBottom: '8px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
        <span style={{ color: model.color, fontWeight: '600' }}>{model.name}</span>
        <span style={{ fontFamily: 'monospace', color: sw.textMuted }}>{paramDisplay}</span>
      </div>
      <div style={{ height: '6px', background: sw.void, borderRadius: '3px', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            width: `${pct}%`,
            background: `linear-gradient(90deg, ${model.color}88, ${model.color})`,
            borderRadius: '3px',
            transition: 'width 0.4s ease',
            boxShadow: model.isGpt2 ? `0 0 8px ${model.color}44` : 'none',
          }}
        />
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface Gpt2FamilyTreeProps {
  copy: Gpt2FamilyTreeCopy;
}

export const Gpt2FamilyTree = React.memo(({ copy }: Gpt2FamilyTreeProps) => {
  const [selectedModel, setSelectedModel] = useState<string>('GPT-2');
  const [showScale, setShowScale] = useState(true);
  const isPtBr = true;

  const selected = MODELS.find(m => m.name === selectedModel)!;

  const handleModelClick = useCallback((name: string) => {
    setSelectedModel(prev => prev === name ? 'GPT-2' : name);
  }, []);

  const scaleModels = useMemo(() => {
    return MODELS.map(m => {
      const ratio = m.params === 0 ? 0 : m.params / MODELS[0].params;
      return {
        name: m.name,
        color: m.color,
        ratio,
        ratioDisplay: ratio === 0
          ? '?'
          : ratio >= 1000
            ? `${(ratio / 1000).toFixed(0)}mil×`
            : `${ratio.toFixed(0)}×`,
        isGpt2: m.isGpt2,
      };
    });
  }, []);

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    }}>
      {/* GPT-2 Profile Card */}
      <div style={{
        background: sw.surface,
        borderRadius: '16px',
        border: `1px solid ${sw.pink}55`,
        padding: '16px',
        boxShadow: `0 0 20px ${sw.pink}15`,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '24px' }}>🌟</span>
          <div>
            <div style={{ fontWeight: '800', fontSize: '18px', color: sw.pink }}>GPT-2</div>
            <div style={{ fontSize: '11px', color: sw.textMuted }}>
              {isPtBr ? 'OpenAI · Fev 2019 · Decoder-only' : 'OpenAI · Feb 2019 · Decoder-only'}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <SpecBadge label="Params" value="1.5B" color={sw.pink} />
          <SpecBadge label="Ctx" value="1024" color={sw.pink} />
          <SpecBadge label="Layers" value="48" color={sw.pink} />
          <SpecBadge label="Heads" value="25" color={sw.pink} />
          <SpecBadge label="d_model" value="1600" color={sw.pink} />
          <SpecBadge label="Data" value="40GB" color={sw.pink} />
        </div>
      </div>

      {/* Family Tree */}
      <div style={{
        background: sw.void,
        borderRadius: '14px',
        border: `1px solid ${sw.borderSubtle}`,
        padding: '14px',
      }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: sw.text, marginBottom: '10px' }}>
          {copy.treeTitle}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {MODELS.map(m => (
            <ModelNode
              key={m.name}
              model={m}
              isHighlighted={m.name === selectedModel}
              isClickable
              onClick={() => handleModelClick(m.name)}
              showDetails={m.name === selectedModel}
              isPtBr={isPtBr}
            />
          ))}
        </div>
        <div style={{ fontSize: '10px', color: sw.textMuted, marginTop: '8px', textAlign: 'center' }}>
          {isPtBr ? 'Clique para ver detalhes' : 'Click to see details'}
        </div>
      </div>

      {/* Scale bars + toggle */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: sw.text }}>
          {copy.scaleTitle}
        </div>
        <button
          onClick={() => setShowScale(v => !v)}
          style={{
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '6px',
            border: `1px solid ${sw.surface}`,
            background: showScale ? `${sw.cyan}22` : 'transparent',
            color: sw.cyan,
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          {showScale ? (isPtBr ? 'Ocultar' : 'Hide') : (isPtBr ? 'Mostrar' : 'Show')}
        </button>
      </div>

      {showScale && (
        <div style={{
          background: sw.void,
          borderRadius: '14px',
          border: `1px solid ${sw.borderSubtle}`,
          padding: '14px',
        }}>
          {scaleModels.map(sm => (
            <ParamBar
              key={sm.name}
              model={MODELS.find(m => m.name === sm.name)!}
              maxParams={Math.max(...MODELS.filter(m => m.params > 0).map(m => m.params))}
            />
          ))}
          <div style={{ fontSize: '10px', color: sw.textMuted, marginTop: '8px', textAlign: 'center' }}>
            {isPtBr ? 'Escala logarítmica — modelos com specs desconhecidos mostram barra tracejada' : 'Logarithmic scale — models with unknown specs show dashed bar'}
          </div>
        </div>
      )}

      {/* Insight callout */}
      <div style={{
        background: `${sw.pink}11`,
        border: `1px solid ${sw.pink}33`,
        borderRadius: '10px',
        padding: '10px 14px',
        fontSize: '12px',
        color: sw.text,
        lineHeight: '1.5',
      }}>
        <strong style={{ color: sw.pink }}>{copy.insightTitle}</strong>{' '}
        {selected.params === 0
          ? (isPtBr
            ? `${selected.name}: OpenAI não divulgou os specs. A única certeza é que é maior que o anterior.`
            : `${selected.name}: OpenAI did not disclose specs. The only certainty is it's larger than the previous.`)
          : (isPtBr
            ? `${selected.name} tem ${selected.params >= 1000 ? `${(selected.params / 1000).toFixed(0)}T` : `${selected.params}B`} parâmetros. Comparado ao GPT-2 (1.5B), é ${(selected.params / 1.5 >= 1000 ? `${(selected.params / 1.5 / 1000).toFixed(0)}mil` : `${(selected.params / 1.5).toFixed(0)}`)}× maior.`
            : `${selected.name} has ${selected.params >= 1000 ? `${(selected.params / 1000).toFixed(0)}T` : `${selected.params}B`} parameters. Compared to GPT-2 (1.5B), it's ${(selected.params / 1.5 >= 1000 ? `${(selected.params / 1.5 / 1000).toFixed(0)}K` : `${(selected.params / 1.5).toFixed(0)}`)}× larger.`)}
      </div>
    </div>
  );
});
