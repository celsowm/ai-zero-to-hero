import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface LlamaComparisonTableCopy {
  title: string;
  subtitle: string;
  categoryLabel: string;
  gpt2Label: string;
  llama1Label: string;
  llama2Label: string;
  changeLabel: string;
  clickHint: string;
  // Row labels
  rowYear: string;
  rowObjective: string;
  rowArchitecture: string;
  rowPositional: string;
  rowParams: string;
  rowTokens: string;
  rowDataset: string;
  rowTokenizer: string;
  rowContext: string;
  rowAttention: string;
  rowOptimization: string;
  rowAlignment: string;
  rowInstruction: string;
  rowCoherence: string;
  rowCoding: string;
  rowHallucination: string;
  rowMultiTurn: string;
  rowLicense: string;
  rowLocalDeploy: string;
  rowQuantization: string;
  rowEcosystem: string;
  rowRealUse: string;
  // Detail descriptions (pt-br and en-us mixed in one interface)
  details: Record<string, { gpt2: string; llama1: string; llama2: string }>;
}

interface Props {
  copy: LlamaComparisonTableCopy;
}

type RowDef = { key: string; labelKey: string; gpt2: string; llama1: string; llama2: string; highlight?: boolean };

const ROWS: RowDef[] = [
  { key: 'year', labelKey: 'rowYear', gpt2: '2019', llama1: '2023', llama2: '2023' },
  { key: 'objective', labelKey: 'rowObjective', gpt2: 'Prova de conceito', llama1: 'Pesquisa eficiente', llama2: 'Produção/open' },
  { key: 'architecture', labelKey: 'rowArchitecture', gpt2: 'Decoder-only', llama1: 'Decoder-only', llama2: 'Decoder-only', highlight: true },
  { key: 'positional', labelKey: 'rowPositional', gpt2: 'Sinusoidal', llama1: 'RoPE', llama2: 'RoPE', highlight: true },
  { key: 'params', labelKey: 'rowParams', gpt2: 'até 1.5B', llama1: '7B–65B', llama2: '7B–70B', highlight: true },
  { key: 'tokens', labelKey: 'rowTokens', gpt2: '~40B', llama1: '~1–1.4T', llama2: '~2T' },
  { key: 'dataset', labelKey: 'rowDataset', gpt2: 'WebText (Reddit)', llama1: 'Curado (papers+web)', llama2: 'Melhor filtrado' },
  { key: 'tokenizer', labelKey: 'rowTokenizer', gpt2: 'BPE (50k)', llama1: 'SentencePiece (32k)', llama2: 'Refinado' },
  { key: 'context', labelKey: 'rowContext', gpt2: '1024', llama1: '~2048–4096', llama2: '~4096' },
  { key: 'attention', labelKey: 'rowAttention', gpt2: 'Full O(n²)', llama1: 'Full O(n²)', llama2: 'Full O(n²)' },
  { key: 'optimization', labelKey: 'rowOptimization', gpt2: 'Adam', llama1: 'AdamW + melhorias', llama2: 'Melhor tuning' },
  { key: 'alignment', labelKey: 'rowAlignment', gpt2: '❌ Nenhum', llama1: '❌ Quase nenhum', llama2: '✅ RLHF (chat)', highlight: true },
  { key: 'instruction', labelKey: 'rowInstruction', gpt2: 'Ruim', llama1: 'Médio', llama2: 'Bom' },
  { key: 'coherence', labelKey: 'rowCoherence', gpt2: 'Fraca', llama1: 'Boa', llama2: 'Melhor' },
  { key: 'coding', labelKey: 'rowCoding', gpt2: 'Fraco', llama1: 'Ok', llama2: 'Melhor' },
  { key: 'hallucination', labelKey: 'rowHallucination', gpt2: 'Muito alta', llama1: 'Alta', llama2: 'Menor' },
  { key: 'multiTurn', labelKey: 'rowMultiTurn', gpt2: 'Não', llama1: 'Limitado', llama2: 'Funcional' },
  { key: 'license', labelKey: 'rowLicense', gpt2: 'Open (cautela)', llama1: 'Restrita', llama2: 'Comercial (limitada)' },
  { key: 'localDeploy', labelKey: 'rowLocalDeploy', gpt2: 'Fácil (leve)', llama1: 'Mais pesado', llama2: 'Mais pesado' },
  { key: 'quantization', labelKey: 'rowQuantization', gpt2: 'Sim', llama1: 'Sim', llama2: 'Melhor suporte' },
  { key: 'ecosystem', labelKey: 'rowEcosystem', gpt2: 'Pequeno', llama1: 'Crescendo', llama2: 'Explodiu' },
  { key: 'realUse', labelKey: 'rowRealUse', gpt2: 'Demo / research', llama1: 'Research sério', llama2: 'Apps reais' },
];

const HIGHLIGHT_KEYS = new Set(['positional', 'params', 'alignment', 'architecture']);

export const LlamaComparisonTable = React.memo(({ copy }: Props) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  const details: Record<string, { gpt2: string; llama1: string; llama2: string }> = copy.details;

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* Header */}
        <PanelCard padding={14} style={{ background: sw.tintStrong }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 10, color: '#06b6d4', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.clickHint}
            </span>
            <span style={{ fontSize: 9, color: 'var(--sw-text-dim)' }}>
              {copy.subtitle}
            </span>
          </div>
        </PanelCard>

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr', gap: 2 }}>
          <div style={{ padding: '8px 10px', background: sw.tintStronger, borderRadius: '6px 0 0 0', fontSize: 9, color: 'var(--sw-text-dim)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.08em' }}>
            {copy.categoryLabel}
          </div>
          <div style={{ padding: '8px 10px', background: '#06b6d420', borderRadius: '0 6px 0 0', fontSize: 9, color: '#06b6d4', fontWeight: 900, textAlign: 'center' }}>
            {copy.gpt2Label}
          </div>
          <div style={{ padding: '8px 10px', background: '#a855f720', fontSize: 9, color: '#a855f7', fontWeight: 900, textAlign: 'center' }}>
            {copy.llama1Label}
          </div>
          <div style={{ padding: '8px 10px', background: '#ff5da220', borderRadius: '0 0 6px 0', fontSize: 9, color: '#ff5da2', fontWeight: 900, textAlign: 'center' }}>
            {copy.llama2Label}
          </div>
        </div>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflow: 'auto' }}>
          {ROWS.map((row) => {
            const isSelected = selectedRow === row.key;
            const isHighlight = HIGHLIGHT_KEYS.has(row.key);

            return (
              <React.Fragment key={row.key}>
                <button
                  onClick={() => setSelectedRow(isSelected ? null : row.key)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
                    gap: 2,
                    background: isSelected ? 'rgba(255,255,255,0.06)' : isHighlight ? 'rgba(168,85,247,0.04)' : 'transparent',
                    border: isSelected ? `1px solid rgba(255,255,255,0.15)` : '1px solid transparent',
                    borderRadius: 6,
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ padding: '6px 10px', fontSize: 10, color: isHighlight ? '#a855f7' : 'var(--sw-text)', fontWeight: isHighlight ? 800 : 600, textAlign: 'left' }}>
                    {copy[row.labelKey as keyof typeof copy] as string}
                    {isHighlight && ' ⚡'}
                  </div>
                  <Cell value={row.gpt2} color="#06b6d4" />
                  <Cell value={row.llama1} color="#a855f7" />
                  <Cell value={row.llama2} color="#ff5da2" />
                </button>

                {/* Detail panel */}
                {isSelected && details[row.key] && (
                  <PanelCard
                    padding={12}
                    style={{
                      background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))',
                      border: `1px solid ${sw.borderSubtle}`,
                    }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                      <DetailBlock label={copy.gpt2Label} value={details[row.key].gpt2} color="#06b6d4" />
                      <DetailBlock label={copy.llama1Label} value={details[row.key].llama1} color="#a855f7" />
                      <DetailBlock label={copy.llama2Label} value={details[row.key].llama2} color="#ff5da2" />
                    </div>
                  </PanelCard>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Summary */}
        <PanelCard
          padding={12}
          style={{
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.22)',
          }}
        >
          <div style={{ fontSize: 10, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
            ⚡ 3 Mudanças Arquiteturais Reais
          </div>
          <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', lineHeight: 1.6 }}>
            <strong>RoPE</strong> (positional encoding) — o foco do próximo slide.
            <br />
            <strong>Escala</strong> (1.5B → 70B) — mais dados + mais params = mais inteligência emergente.
            <br />
            <strong>RLHF</strong> (alignment) — o que transforma "texto gerado" em "assistente útil".
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
});

// ── Sub-components ─────────────────────────────────────────────────────────

const Cell: React.FC<{ value: string; color: string }> = ({ value, color }) => (
  <div style={{ padding: '6px 8px', fontSize: 10, color, fontWeight: 700, textAlign: 'center' }}>
    {value}
  </div>
);

const DetailBlock: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ padding: '8px 10px', borderRadius: 6, background: `${color}10`, border: `1px solid ${color}25` }}>
    <div style={{ fontSize: 9, color, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 10.5, color: 'var(--sw-text-dim)', lineHeight: 1.55 }}>{value}</div>
  </div>
);
