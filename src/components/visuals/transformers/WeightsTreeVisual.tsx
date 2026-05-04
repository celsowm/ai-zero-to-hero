import React, { useState, useMemo } from 'react';
import type { WeightsTreeVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

// ── Data ──────────────────────────────────────────────────────────────────────

interface WeightNode {
  key: string;
  shape?: [number, number] | [number];
  description?: string;
  descriptionEn?: string;
  color: string;
  children?: WeightNode[];
}

const STATE_DICT_TREE: WeightNode = {
  key: 'transformer',
  color: sw.cyan,
  children: [
    {
      key: 'wte (word token embeddings)',
      shape: [50257, 768],
      description: 'Mapeia cada token ID (0-50256) para um vetor de 768 dimensões.',
      descriptionEn: 'Maps each token ID (0-50256) to a 768-dimensional vector.',
      color: sw.pink,
    },
    {
      key: 'wpe (positional embeddings)',
      shape: [1024, 768],
      description: 'Mapeia cada posição (0-1023) para um vetor de 768 dimensões.',
      descriptionEn: 'Maps each position (0-1023) to a 768-dimensional vector.',
      color: sw.purple,
    },
    {
      key: 'h.0 (e h.1...h.11 — 12 camadas)',
      description: '12 camadas idênticas de Transformer decoder, cada uma com atenção + MLP.',
      descriptionEn: '12 identical Transformer decoder layers, each with attention + MLP.',
      color: sw.sky,
      children: [
        {
          key: 'ln_1 (LayerNorm pré-attn)',
          shape: [768],
          description: 'Normaliza as ativações antes da atenção.',
          descriptionEn: 'Normalizes activations before attention.',
          color: sw.indigo,
        },
        {
          key: 'attn.c_attn (Q, K, V combinados)',
          shape: [2304, 768],
          description: 'Projeção linear que gera Query, Key e Value juntos. 768×3=2304.',
          descriptionEn: 'Linear projection that produces Q, K, V together. 768×3=2304.',
          color: sw.sky,
        },
        {
          key: 'attn.c_proj (saída da atenção)',
          shape: [768, 768],
          description: 'Projeta a saída multi-head de volta para dimensão do modelo.',
          descriptionEn: 'Projects multi-head output back to model dimension.',
          color: sw.sky,
        },
        {
          key: 'ln_2 (LayerNorm pré-MLP)',
          shape: [768],
          description: 'Normaliza as ativações antes do MLP.',
          descriptionEn: 'Normalizes activations before MLP.',
          color: sw.indigo,
        },
        {
          key: 'mlp.c_fc (expansão)',
          shape: [3072, 768],
          description: 'Expande de 768 para 3072 (4x) — a "camada feedforward".',
          descriptionEn: 'Expands from 768 to 3072 (4x) — the "feedforward layer".',
          color: sw.green,
        },
        {
          key: 'mlp.c_proj (projeção de volta)',
          shape: [768, 3072],
          description: 'Projeta de volta de 3072 para 768.',
          descriptionEn: 'Projects back from 3072 to 768.',
          color: sw.green,
        },
      ],
    },
    {
      key: 'ln_f (normalização final)',
      shape: [768],
      description: 'Última LayerNorm antes do LM Head.',
      descriptionEn: 'Final LayerNorm before the LM Head.',
      color: sw.indigo,
    },
    {
      key: 'lm_head (vocab projection)',
      shape: [50257, 768],
      description: 'Projeta hidden states de volta para logits sobre o vocabulário.',
      descriptionEn: 'Projects hidden states back to logits over vocabulary.',
      color: sw.yellow,
    },
  ],
};

// ── Sub-components ────────────────────────────────────────────────────────────

function TreeNode({
  node, depth, isPtBr,
}: {
  node: WeightNode;
  depth: number;
  isPtBr: boolean;
}) {
  const [expanded, setExpanded] = useState(depth < 2);

  const hasChildren = node.children && node.children.length > 0;
  const paddingLeft = depth * 20;

  return (
    <div style={{ marginLeft: `${paddingLeft}px` }}>
      <div
        onClick={() => hasChildren && setExpanded(!expanded)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 8px',
          borderRadius: '6px',
          cursor: hasChildren ? 'pointer' : 'default',
          background: 'rgba(255,255,255,0.03)',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
        }}
      >
        {hasChildren ? (
          <span style={{
            fontSize: '10px',
            color: sw.textMuted,
            transition: 'transform 0.2s',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            display: 'inline-block',
          }}>▶</span>
        ) : (
          <span style={{ width: '10px' }} />
        )}
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: node.color,
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: '12px',
          fontWeight: '600',
          color: sw.text,
          fontFamily: "'JetBrains Mono', monospace",
        }}>
          {node.key}
        </span>
        {node.shape && (
          <span style={{
            fontSize: '10px',
            color: node.color,
            fontFamily: "'JetBrains Mono', monospace",
            marginLeft: 'auto',
          }}>
            [{node.shape.join(', ')}]
          </span>
        )}
      </div>
      {expanded && hasChildren && node.children!.map(child => (
        <TreeNode key={child.key} node={child} depth={depth + 1} isPtBr={isPtBr} />
      ))}
      {expanded && node.shape && depth >= 1 && node.description && (
        <div style={{
          marginLeft: '26px',
          padding: '4px 8px',
          fontSize: '10px',
          color: sw.textMuted,
          lineHeight: '1.4',
        }}>
          {isPtBr ? node.description : node.descriptionEn}
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: sw.surface,
      borderRadius: '10px',
      padding: '10px 14px',
      textAlign: 'center',
      border: `1px solid ${sw.borderSubtle}`,
      flex: '1',
    }}>
      <div style={{ fontSize: '10px', color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
        {label}
      </div>
      <div style={{ fontSize: '18px', fontWeight: '800', color, fontFamily: "'JetBrains Mono', monospace" }}>
        {value}
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface WeightsTreeVisualProps {
  copy: WeightsTreeVisualCopy;
}

export const WeightsTreeVisual = React.memo(({ copy }: WeightsTreeVisualProps) => {
  const [showParams, setShowParams] = useState(true);

  const paramBreakdown = useMemo(() => {
    // GPT-2 small: 124M params
    const breakdown = [
      { name: 'wte', params: '38.6M', pct: '31%', color: sw.pink },
      { name: 'wpe', params: '0.8M', pct: '0.6%', color: sw.purple },
      { name: '12× attn', params: '44.3M', pct: '36%', color: sw.sky },
      { name: '12× mlp', params: '35.5M', pct: '29%', color: sw.green },
      { name: 'ln + lm_head', params: '4.3M', pct: '3.5%', color: sw.yellow },
    ];
    return breakdown;
  }, []);

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
    }}>
      {/* Stats */}
      <div style={{ display: 'flex', gap: '8px' }}>
        <StatCard label="Parâmetros" value="124M" color={sw.cyan} />
        <StatCard label="Camadas" value="12" color={sw.purple} />
        <StatCard label="Tamanho" value="500MB" color={sw.green} />
      </div>

      {/* Tree */}
      <div style={{
        background: sw.void,
        borderRadius: '14px',
        border: `1px solid ${sw.borderSubtle}`,
        padding: '12px',
        maxHeight: '300px',
        overflowY: 'auto',
      }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: sw.text, marginBottom: '10px' }}>
          {copy.treeTitle}
        </div>
        <TreeNode node={STATE_DICT_TREE} depth={0} isPtBr={true} />
      </div>

      {/* Param breakdown toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '12px', fontWeight: '700', color: sw.text }}>
          Distribuição de parâmetros
        </div>
        <button
          onClick={() => setShowParams(v => !v)}
          style={{
            fontSize: '11px',
            padding: '3px 10px',
            borderRadius: '6px',
            border: `1px solid ${sw.surface}`,
            background: showParams ? `${sw.cyan}22` : 'transparent',
            color: sw.cyan,
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          {showParams ? 'Ocultar' : 'Mostrar'}
        </button>
      </div>

      {showParams && (
        <div style={{
          background: sw.void,
          borderRadius: '14px',
          border: `1px solid ${sw.borderSubtle}`,
          padding: '14px',
        }}>
          {paramBreakdown.map(item => (
            <div key={item.name} style={{ marginBottom: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '3px' }}>
                <span style={{ color: item.color, fontWeight: '600', fontFamily: "'JetBrains Mono', monospace" }}>
                  {item.name}
                </span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: sw.textMuted }}>
                  {item.params} ({item.pct})
                </span>
              </div>
              <div style={{ height: '5px', background: sw.surface, borderRadius: '3px', overflow: 'hidden' }}>
                <div
                  style={{
                    height: '100%',
                    width: `${parseFloat(item.pct) / 0.4}%`,
                    background: item.color,
                    borderRadius: '3px',
                    transition: 'width 0.4s ease',
                  }}
                />
              </div>
            </div>
          ))}
          <div style={{ fontSize: '10px', color: sw.textMuted, marginTop: '6px', textAlign: 'center' }}>
            Total: 124,744,704 parâmetros (GPT-2 small)
          </div>
        </div>
      )}

      {/* Insight */}
      <div style={{
        background: `${sw.cyan}11`,
        border: `1px solid ${sw.cyan}33`,
        borderRadius: '10px',
        padding: '10px 14px',
        fontSize: '12px',
        color: sw.text,
        lineHeight: '1.5',
      }}>
        <strong style={{ color: sw.cyan }}>Note:</strong>{' '}
        Cada matriz no state_dict é um <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', background: `${sw.cyan}22`, padding: '1px 4px', borderRadius: '3px' }}>torch.nn.Linear</code> ou <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', background: `${sw.cyan}22`, padding: '1px 4px', borderRadius: '3px' }}>torch.nn.Embedding</code>.
        Os próximos slides mostram como cada um se encaixa na arquitetura.
      </div>
    </div>
  );
});
