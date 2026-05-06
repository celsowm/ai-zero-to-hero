import React, { useState } from 'react';
import type { WeightsTreeVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

// ── Data ──────────────────────────────────────────────────────────────────────

interface WeightNode {
  key: string;
  shape?: [number, number] | [number];
  description?: string;
  descriptionEn?: string;
  color: string;
  params?: string;
  children?: WeightNode[];
}

const STATE_DICT_TREE: WeightNode = {
  key: 'transformer',
  color: sw.cyan,
  children: [
    {
      key: 'wte',
      shape: [50257, 768],
      description: 'Word Token Embeddings: mapeia cada token ID para um vetor de 768 dimensões.',
      descriptionEn: 'Word Token Embeddings: maps each token ID to a 768-dimensional vector.',
      color: sw.pink,
      params: '38.6M (31%)',
    },
    {
      key: 'wpe',
      shape: [1024, 768],
      description: 'Positional Embeddings: mapeia cada posição (0-1023) para um vetor de 768 dimensões.',
      descriptionEn: 'Positional Embeddings: maps each position (0-1023) to a 768-dimensional vector.',
      color: sw.purple,
      params: '0.8M (0.6%)',
    },
    {
      key: 'h.0',
      description: 'Camada Transformer #1 — atenção multi-head + MLP',
      descriptionEn: 'Transformer Layer #1 — multi-head attention + MLP',
      color: sw.sky,
      params: '3.7M × 12 = 44.3M',
      children: [
        {
          key: 'ln_1',
          shape: [768],
          description: 'LayerNorm pré-attn: normaliza antes da atenção',
          descriptionEn: 'Pre-attention LayerNorm: normalizes before attention',
          color: sw.indigo,
        },
        {
          key: 'attn.c_attn',
          shape: [768, 2304],
          description: 'QKV combined: 3 projeções em 1 (Q,K,V = 768×3)',
          descriptionEn: 'QKV combined: 3 projections in 1 (Q,K,V = 768×3)',
          color: sw.sky,
        },
        {
          key: 'attn.c_proj',
          shape: [768, 768],
          description: 'Projeção da saída multi-head → 768',
          descriptionEn: 'Multi-head output projection → 768',
          color: sw.sky,
        },
        {
          key: 'ln_2',
          shape: [768],
          description: 'LayerNorm pré-MLP: normaliza antes do feedforward',
          descriptionEn: 'Pre-MLP LayerNorm: normalizes before feedforward',
          color: sw.indigo,
        },
        {
          key: 'mlp.c_fc',
          shape: [768, 3072],
          description: 'Expansão 4×: 768 → 3072 (feedforward)',
          descriptionEn: '4× expansion: 768 → 3072 (feedforward)',
          color: sw.green,
        },
        {
          key: 'mlp.c_proj',
          shape: [3072, 768],
          description: 'Projeção de volta: 3072 → 768',
          descriptionEn: 'Project back: 3072 → 768',
          color: sw.green,
        },
      ],
    },
    {
      key: 'h.1 ... h.11',
      description: 'Mais 11 camadas idênticas (total: 12 camadas Transformer)',
      descriptionEn: '11 more identical layers (total: 12 Transformer layers)',
      color: sw.sky,
      params: '11 × 3.7M = 40.6M',
    },
    {
      key: 'ln_f',
      shape: [768],
      description: 'LayerNorm final antes do LM Head',
      descriptionEn: 'Final LayerNorm before LM Head',
      color: sw.indigo,
      params: '0.003M',
    },
    {
      key: 'lm_head',
      shape: [768, 50257],
      description: 'Projeta hidden states → logits do vocabulário (768 → 50257)',
      descriptionEn: 'Projects hidden states → vocabulary logits (768 → 50257)',
      color: sw.yellow,
      params: '38.6M (31%)',
    },
  ],
};

// ── Sub-components ───────────────────────────────────────────────────────────

function TreeNode({
  node, depth, isPtBr,
}: {
  node: WeightNode;
  depth: number;
  isPtBr: boolean;
}) {
  const [expanded, setExpanded] = useState(depth < 2);
  const [hovered, setHovered] = useState(false);

  const hasChildren = node.children && node.children.length > 0;
  const paddingLeft = depth * 16;

  return (
    <div>
      <div
        onClick={() => hasChildren && setExpanded(!expanded)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          padding: '5px 8px',
          marginLeft: `${paddingLeft}px`,
          borderRadius: '6px',
          cursor: hasChildren ? 'pointer' : 'default',
          background: hovered && hasChildren ? 'rgba(255,255,255,0.08)' : 'transparent',
          transition: 'background 0.15s',
        }}
      >
        {hasChildren ? (
          <span style={{
            fontSize: '8px',
            color: sw.textMuted,
            transition: 'transform 0.2s',
            transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
            display: 'inline-block',
            width: '12px',
            textAlign: 'center',
          }}>▶</span>
        ) : (
          <span style={{ width: '12px' }} />
        )}
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          background: node.color,
          flexShrink: 0,
        }} />
        <span style={{
          fontSize: '11px',
          fontWeight: depth === 0 ? '700' : '500',
          color: sw.text,
          fontFamily: "'JetBrains Mono', monospace",
          flex: 1,
        }}>
          {node.key}
        </span>
        {node.shape && (
          <span style={{
            fontSize: '9px',
            color: node.color,
            fontFamily: "'JetBrains Mono', monospace",
            opacity: 0.8,
          }}>
            [{node.shape.join(', ')}]
          </span>
        )}
        {node.params && (
          <span style={{
            fontSize: '9px',
            color: sw.textMuted,
            fontFamily: "'JetBrains Mono', monospace",
            marginLeft: '4px',
          }}>
            {node.params}
          </span>
        )}
      </div>
      {expanded && node.description && (
        <div style={{
          marginLeft: `${paddingLeft + 26}px`,
          padding: '3px 8px',
          fontSize: '9px',
          color: sw.textMuted,
          lineHeight: '1.4',
          borderLeft: `1px solid ${node.color}33`,
        }}>
          {isPtBr ? node.description : node.descriptionEn}
        </div>
      )}
      {expanded && hasChildren && node.children!.map(child => (
        <TreeNode key={child.key} node={child} depth={depth + 1} isPtBr={isPtBr} />
      ))}
    </div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, ' + sw.surface + ' 0%, ' + sw.void + ' 100%)',
      borderRadius: '8px',
      padding: '8px 12px',
      textAlign: 'center',
      border: `1px solid ${sw.borderSubtle}`,
      flex: '1',
    }}>
      <div style={{ fontSize: '9px', color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '2px' }}>
        {label}
      </div>
      <div style={{ fontSize: '16px', fontWeight: '800', color, fontFamily: "'JetBrains Mono', monospace" }}>
        {value}
      </div>
    </div>
  );
}

interface ParamBarProps {
  name: string;
  params: string;
  pct: number;
  maxPct: number;
  color: string;
  details: string;
}

function ParamBar({ name, params, pct, maxPct, color, details }: ParamBarProps) {
  const [hovered, setHovered] = useState(false);
  const barWidth = (pct / maxPct) * 100;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ marginBottom: '8px', position: 'relative' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
        <span style={{ color, fontWeight: '700', fontSize: '11px', fontFamily: "'JetBrains Mono', monospace" }}>{name}</span>
        <span style={{ color: sw.textMuted, fontSize: '10px', fontFamily: "'JetBrains Mono', monospace" }}>{params}</span>
      </div>
      <div style={{
        height: '10px',
        background: sw.surface,
        borderRadius: '5px',
        overflow: 'hidden',
        position: 'relative',
      }}>
        <div style={{
          height: '100%',
          width: `${barWidth}%`,
          background: `linear-gradient(90deg, ${color} 0%, ${color}aa 100%)`,
          borderRadius: '5px',
          transition: 'width 0.5s ease-out',
        }} />
      </div>
      {hovered && (
        <div style={{
          position: 'absolute',
          top: '-28px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: sw.void,
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: '4px',
          padding: '3px 8px',
          fontSize: '9px',
          color: sw.text,
          whiteSpace: 'nowrap',
          zIndex: 10,
          pointerEvents: 'none',
        }}>
          {details}
        </div>
      )}
    </div>
  );
}

const CodePanel: React.FC<{ copy: WeightsTreeVisualCopy['codePanel']; eyebrowLabel: string }> = ({ copy, eyebrowLabel }) => (
  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0, overflow: 'hidden' }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: sw.cyan, marginBottom: 10 }}>
      {eyebrowLabel}
    </div>
    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: sw.text }}>{copy.title}</div>
    <div style={{ fontSize: 13.5, lineHeight: 1.65, color: sw.textDim, marginBottom: 10 }}>{copy.description}</div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <CodeBlock
        code={copy.code ?? ''}
        language="python"
        explanations={copy.codeExplanations}
        sourceRef={copy.source}
      />
    </div>
  </div>
);

// ─ Main component ────────────────────────────────────────────────────────────

interface WeightsTreeVisualProps {
  copy: WeightsTreeVisualCopy;
}

const PARAM_BREAKDOWN = [
  { name: 'wte', params: '38.6M', pct: 31, color: sw.pink, details: 'Token embeddings — cada palavra vira um vetor' },
  { name: 'wpe', params: '0.8M', pct: 0.6, color: sw.purple, details: 'Position embeddings — posição do token na sequência' },
  { name: '12× attn', params: '44.3M', pct: 36, color: sw.sky, details: 'Atenção multi-head: Q, K, V + projeção de saída' },
  { name: '12× mlp', params: '35.5M', pct: 29, color: sw.green, details: 'Feedforward: expansão 4× + projeção de volta' },
  { name: 'ln + lm_head', params: '4.3M', pct: 3.5, color: sw.yellow, details: 'LayerNorms + projeção final para vocabulário' },
];

const MAX_PCT = Math.max(...PARAM_BREAKDOWN.map(b => b.pct));

export const WeightsTreeVisual = React.memo(({ copy }: WeightsTreeVisualProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col h-full min-h-0">
      <TabsBar ariaLabel={copy.tabs[0]?.label ?? ''} items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />
      <div className="flex-1 min-h-0 overflow-auto">
        {activeTab === 0 ? (
          <div className="flex flex-col gap-3 p-3">
            {/* Stat cards */}
            <div className="flex gap-2">
              <StatCard label="Parâmetros" value="124M" color={sw.cyan} />
              <StatCard label="Camadas" value="12" color={sw.purple} />
              <StatCard label="Tamanho" value="500MB" color={sw.green} />
            </div>

            {/* Parameter distribution chart */}
            <div style={{
              background: sw.void,
              borderRadius: '10px',
              border: `1px solid ${sw.borderSubtle}`,
              padding: '12px',
            }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: sw.text, marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: sw.cyan }} />
                Distribuição de parâmetros
              </div>
              {PARAM_BREAKDOWN.map(item => (
                <ParamBar
                  key={item.name}
                  name={item.name}
                  params={item.params}
                  pct={item.pct}
                  maxPct={MAX_PCT}
                  color={item.color}
                  details={item.details}
                />
              ))}
            </div>

            {/* Tree structure */}
            <div style={{
              background: sw.void,
              borderRadius: '10px',
              border: `1px solid ${sw.borderSubtle}`,
              padding: '12px',
              flex: 1,
              overflowY: 'auto',
            }}>
              <div style={{ fontSize: '11px', fontWeight: '700', color: sw.text, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: sw.sky }} />
                {copy.treePanel.title}
              </div>
              <TreeNode node={STATE_DICT_TREE} depth={0} isPtBr={true} />
            </div>
          </div>
        ) : (
          <CodePanel copy={copy.codePanel} eyebrowLabel={copy.tabs[1]?.label ?? 'Code'} />
        )}
      </div>
    </div>
  );
});
