import React, { useState } from 'react';
import type { WeightsTreeVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';

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

const CodePanel: React.FC<{ copy: WeightsTreeVisualCopy['codePanel']; eyebrowLabel: string }> = ({ copy, eyebrowLabel }) => (
  <div className="flex flex-col h-full min-h-0">
    <div className="text-[10px] font-bold tracking-wider uppercase mb-1" style={{ color: sw.textMuted }}>{eyebrowLabel}</div>
    <div className="text-sm font-bold mb-1" style={{ color: sw.text }}>{copy.title}</div>
    <div className="text-[11px] mb-2" style={{ color: sw.textMuted }}>{copy.description}</div>
    <pre className="flex-1 overflow-x-auto rounded-lg border border-white/10 bg-white/5 p-3 text-[11px] leading-relaxed font-mono" style={{ color: sw.textDim }}>
      {copy.code}
    </pre>
  </div>
);

// ── Main component ────────────────────────────────────────────────────────────

interface WeightsTreeVisualProps {
  copy: WeightsTreeVisualCopy;
}

export const WeightsTreeVisual = React.memo(({ copy }: WeightsTreeVisualProps) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showParams, setShowParams] = useState(true);

  const paramBreakdown = [
    { name: 'wte', params: '38.6M', pct: '31%', color: sw.pink },
    { name: 'wpe', params: '0.8M', pct: '0.6%', color: sw.purple },
    { name: '12× attn', params: '44.3M', pct: '36%', color: sw.sky },
    { name: '12× mlp', params: '35.5M', pct: '29%', color: sw.green },
    { name: 'ln + lm_head', params: '4.3M', pct: '3.5%', color: sw.yellow },
  ];

  return (
    <div className="flex flex-col h-full min-h-0">
      <TabsBar ariaLabel={copy.tabs[0]?.label ?? ''} items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />
      <div className="flex-1 min-h-0 overflow-auto">
        {activeTab === 0 ? (
          <div className="flex flex-col gap-2 p-2">
            <div className="flex gap-2">
              <StatCard label="Parâmetros" value="124M" color={sw.cyan} />
              <StatCard label="Camadas" value="12" color={sw.purple} />
              <StatCard label="Tamanho" value="500MB" color={sw.green} />
            </div>
            <div style={{ background: sw.void, borderRadius: '10px', border: `1px solid ${sw.borderSubtle}`, padding: '10px', maxHeight: '200px', overflowY: 'auto' }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: sw.text, marginBottom: '8px' }}>
                {copy.treePanel.title}
              </div>
              <TreeNode node={STATE_DICT_TREE} depth={0} isPtBr={true} />
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: '11px', fontWeight: '700', color: sw.text }}>Distribuição de parâmetros</span>
              <button onClick={() => setShowParams(v => !v)} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '6px', border: `1px solid ${sw.surface}`, background: showParams ? `${sw.cyan}22` : 'transparent', color: sw.cyan, cursor: 'pointer', fontWeight: '600' }}>
                {showParams ? 'Ocultar' : 'Mostrar'}
              </button>
            </div>
            {showParams && (
              <div style={{ background: sw.void, borderRadius: '10px', border: `1px solid ${sw.borderSubtle}`, padding: '10px' }}>
                {paramBreakdown.map(item => (
                  <div key={item.name} style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', marginBottom: '2px' }}>
                      <span style={{ color: item.color, fontWeight: '600', fontFamily: "'JetBrains Mono', monospace" }}>{item.name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", color: sw.textMuted }}>{item.params} ({item.pct})</span>
                    </div>
                    <div style={{ height: '4px', background: sw.surface, borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${parseFloat(item.pct) / 0.4}%`, background: item.color, borderRadius: '2px' }} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <CodePanel copy={copy.codePanel} eyebrowLabel={copy.tabs[1]?.label ?? 'Code'} />
        )}
      </div>
    </div>
  );
});
