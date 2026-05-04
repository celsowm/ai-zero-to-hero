import React, { useState } from 'react';
import type { Gpt2BlockAnatomyCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Gpt2BlockAnatomyProps {
  copy: Gpt2BlockAnatomyCopy;
}

type OpKey = 'input' | 'embedding' | 'dropout' | 'layernorm' | 'conv1d' | 'newgelu' | 'add' | 'linear' | 'output';
type CopyOpKey = 'input' | 'embedding' | 'dropout' | 'layerNorm' | 'conv1d' | 'newGelu' | 'add' | 'linear' | 'output';

// Map from internal OpKey to copy interface key
const opToCopyKey: Record<OpKey, CopyOpKey> = {
  input: 'input',
  embedding: 'embedding',
  dropout: 'dropout',
  layernorm: 'layerNorm',
  conv1d: 'conv1d',
  newgelu: 'newGelu',
  add: 'add',
  linear: 'linear',
  output: 'output',
};

// Color map for operations
const opColors: Record<OpKey, { bg: string; border: string; text: string; glow: string }> = {
  input: { bg: 'rgba(0,229,255,0.12)', border: 'rgba(0,229,255,0.4)', text: '#00e5ff', glow: '0 0 12px rgba(0,229,255,0.2)' },
  embedding: { bg: 'rgba(168,85,247,0.12)', border: 'rgba(168,85,247,0.4)', text: '#a855f7', glow: '0 0 12px rgba(168,85,247,0.2)' },
  dropout: { bg: 'rgba(251,146,60,0.12)', border: 'rgba(251,146,60,0.4)', text: '#fb923c', glow: '0 0 12px rgba(251,146,60,0.2)' },
  layernorm: { bg: 'rgba(56,189,248,0.12)', border: 'rgba(56,189,248,0.4)', text: '#38bdf8', glow: '0 0 12px rgba(56,189,248,0.2)' },
  conv1d: { bg: 'rgba(250,204,21,0.12)', border: 'rgba(250,204,21,0.4)', text: '#facc15', glow: '0 0 12px rgba(250,204,21,0.2)' },
  newgelu: { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.4)', text: '#4ade80', glow: '0 0 12px rgba(74,222,128,0.2)' },
  add: { bg: 'rgba(192,132,252,0.12)', border: 'rgba(192,132,252,0.4)', text: '#c084fc', glow: '0 0 12px rgba(192,132,252,0.2)' },
  linear: { bg: 'rgba(74,222,128,0.12)', border: 'rgba(74,222,128,0.4)', text: '#4ade80', glow: '0 0 12px rgba(74,222,128,0.2)' },
  output: { bg: 'rgba(255,46,151,0.12)', border: 'rgba(255,46,151,0.4)', text: '#ff2e97', glow: '0 0 12px rgba(255,46,151,0.2)' },
};

const NodeBlock = React.memo(({ op, label, detail, onClick, isSelected, indent = false }: {
  op: OpKey;
  label: string;
  detail?: string;
  onClick: () => void;
  isSelected: boolean;
  indent?: boolean;
}) => {
  const colors = opColors[op] ?? opColors.input;
  return (
    <div
      onClick={onClick}
      style={{
        padding: '8px 14px',
        background: isSelected ? `${colors.bg}dd` : colors.bg,
        border: `1.5px solid ${isSelected ? colors.text : colors.border}`,
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: isSelected ? colors.glow : 'none',
        marginLeft: indent ? '24px' : '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2px',
      }}
    >
      <span style={{
        fontSize: '11px',
        fontWeight: 700,
        color: colors.text,
        textTransform: 'uppercase',
        letterSpacing: '0.04em',
      }}>
        {label}
      </span>
      {detail && (
        <span style={{
          fontSize: '9px',
          color: sw.textMuted,
          fontWeight: 500,
        }}>
          {detail}
        </span>
      )}
    </div>
  );
});

const Connector = React.memo(({ label }: { label?: string }) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2px',
  }}>
    <div style={{ width: '2px', height: '16px', background: sw.tintStrong }} />
    {label && (
      <span style={{ fontSize: '9px', color: sw.textMuted, fontWeight: 600 }}>
        {label}
      </span>
    )}
  </div>
));

export const Gpt2BlockAnatomy = React.memo(({ copy }: Gpt2BlockAnatomyProps) => {
  const [selectedOp, setSelectedOp] = useState<OpKey | null>(null);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      padding: '20px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      fontFamily: "'Inter', sans-serif",
      color: '#fff',
    }}>
      {/* Title */}
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '16px', fontWeight: 800, color: sw.cyan }}>{copy.title}</div>
        <div style={{ fontSize: '11px', color: sw.textMuted, marginTop: '4px' }}>{copy.subtitle}</div>
      </div>

      {/* Main content: diagram + info panel */}
      <div style={{ display: 'flex', gap: '16px', flex: 1, minHeight: 0 }}>
        {/* Diagram column */}
        <div style={{
          flex: '1.2',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          padding: '16px',
          background: 'rgba(15,23,42,0.6)',
          borderRadius: '16px',
          border: `1px solid ${sw.borderSubtle}`,
          overflowY: 'auto',
        }}>
          {/* Input */}
          <NodeBlock
            op="input"
            label={copy.operations.input}
            detail="[batch, seq, d_model]"
            onClick={() => setSelectedOp('input')}
            isSelected={selectedOp === 'input'}
          />

          <Connector />

          {/* Embeddings (x2: wte + wpe) */}
          <NodeBlock
            op="embedding"
            label={copy.operations.embedding}
            detail="wte (token)"
            onClick={() => setSelectedOp('embedding')}
            isSelected={selectedOp === 'embedding'}
          />
          <NodeBlock
            op="embedding"
            label={copy.operations.embedding}
            detail="wpe (posição)"
            onClick={() => setSelectedOp('embedding')}
            isSelected={selectedOp === 'embedding'}
          />

          <Connector />

          {/* Dropout */}
          <NodeBlock
            op="dropout"
            label={copy.operations.dropout}
            detail="p=0.1"
            onClick={() => setSelectedOp('dropout')}
            isSelected={selectedOp === 'dropout'}
          />

          <Connector />

          {/* === GPT2Block === */}
          <div style={{
            width: '100%',
            padding: '12px',
            background: 'rgba(168,85,247,0.06)',
            border: `2px solid rgba(168,85,247,0.3)`,
            borderRadius: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            position: 'relative',
          }}>
            {/* Block label */}
            <div style={{
              textAlign: 'center',
              fontSize: '12px',
              fontWeight: 800,
              color: '#a855f7',
              marginBottom: '4px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              GPT2Block <span style={{ fontSize: '18px', fontWeight: 400 }}>×12</span>
            </div>

            {/* LayerNorm 1 */}
            <NodeBlock
              op="layernorm"
              label={copy.operations.layerNorm}
              detail="ln_1 (eps=1e-5)"
              onClick={() => setSelectedOp('layernorm')}
              isSelected={selectedOp === 'layernorm'}
            />

            <Connector />

            {/* Attention sub-block */}
            <div style={{
              padding: '8px',
              background: 'rgba(0,229,255,0.05)',
              border: `1px solid rgba(0,229,255,0.2)`,
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <div style={{
                textAlign: 'center',
                fontSize: '10px',
                fontWeight: 700,
                color: sw.cyan,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                {copy.sections.attention.title}
              </div>

              <NodeBlock
                op="conv1d"
                label={copy.operations.conv1d}
                detail="q_proj (768→768)"
                onClick={() => setSelectedOp('conv1d')}
                isSelected={selectedOp === 'conv1d'}
                indent
              />
              <NodeBlock
                op="conv1d"
                label={copy.operations.conv1d}
                detail="k_proj (768→768)"
                onClick={() => setSelectedOp('conv1d')}
                isSelected={selectedOp === 'conv1d'}
                indent
              />
              <NodeBlock
                op="conv1d"
                label={copy.operations.conv1d}
                detail="v_proj (768→768)"
                onClick={() => setSelectedOp('conv1d')}
                isSelected={selectedOp === 'conv1d'}
                indent
              />

              <Connector label="Split + Scale (1/√64)" />

              <NodeBlock
                op="dropout"
                label={copy.operations.dropout}
                detail="attn_dropout"
                onClick={() => setSelectedOp('dropout')}
                isSelected={selectedOp === 'dropout'}
                indent
              />
            </div>

            <Connector />

            {/* Residual Add */}
            <NodeBlock
              op="add"
              label={copy.operations.add}
              detail="x + attn(x)"
              onClick={() => setSelectedOp('add')}
              isSelected={selectedOp === 'add'}
            />

            <Connector />

            {/* LayerNorm 2 */}
            <NodeBlock
              op="layernorm"
              label={copy.operations.layerNorm}
              detail="ln_2 (eps=1e-5)"
              onClick={() => setSelectedOp('layernorm')}
              isSelected={selectedOp === 'layernorm'}
            />

            <Connector />

            {/* MLP sub-block */}
            <div style={{
              padding: '8px',
              background: 'rgba(74,222,128,0.05)',
              border: `1px solid rgba(74,222,128,0.2)`,
              borderRadius: '10px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
            }}>
              <div style={{
                textAlign: 'center',
                fontSize: '10px',
                fontWeight: 700,
                color: '#4ade80',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}>
                {copy.sections.mlp.title}
              </div>

              <NodeBlock
                op="conv1d"
                label={copy.operations.conv1d}
                detail="fc_in (768→3072)"
                onClick={() => setSelectedOp('conv1d')}
                isSelected={selectedOp === 'conv1d'}
                indent
              />

              <NodeBlock
                op="newgelu"
                label={copy.operations.newGelu}
                detail="GELU(x) = x·Φ(x)"
                onClick={() => setSelectedOp('newgelu')}
                isSelected={selectedOp === 'newgelu'}
                indent
              />

              <NodeBlock
                op="conv1d"
                label={copy.operations.conv1d}
                detail="fc_out (3072→768)"
                onClick={() => setSelectedOp('conv1d')}
                isSelected={selectedOp === 'conv1d'}
                indent
              />

              <NodeBlock
                op="dropout"
                label={copy.operations.dropout}
                detail="resid_dropout"
                onClick={() => setSelectedOp('dropout')}
                isSelected={selectedOp === 'dropout'}
                indent
              />
            </div>

            <Connector />

            {/* Residual Add */}
            <NodeBlock
              op="add"
              label={copy.operations.add}
              detail="x + mlp(x)"
              onClick={() => setSelectedOp('add')}
              isSelected={selectedOp === 'add'}
            />
          </div>

          <Connector />

          {/* Final LayerNorm */}
          <NodeBlock
            op="layernorm"
            label={copy.operations.layerNorm}
            detail="ln_f (final)"
            onClick={() => setSelectedOp('layernorm')}
            isSelected={selectedOp === 'layernorm'}
          />

          <Connector />

          {/* LM Head */}
          <NodeBlock
            op="linear"
            label={copy.operations.linear}
            detail="lm_head (768→50257)"
            onClick={() => setSelectedOp('linear')}
            isSelected={selectedOp === 'linear'}
          />

          <Connector />

          {/* Output */}
          <NodeBlock
            op="output"
            label={copy.operations.output}
            detail="Softmax → Vocab"
            onClick={() => setSelectedOp('output')}
            isSelected={selectedOp === 'output'}
          />
        </div>

        {/* Info panel column */}
        <div style={{
          flex: '0.8',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          {/* Legend */}
          <div style={{
            padding: '12px',
            background: 'rgba(15,23,42,0.6)',
            borderRadius: '12px',
            border: `1px solid ${sw.borderSubtle}`,
          }}>
            <div style={{
              fontSize: '11px',
              fontWeight: 700,
              color: sw.textMuted,
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '8px',
            }}>
              {copy.legendTitle}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {(Object.keys(opColors) as OpKey[]).map((op) => (
                <div key={op} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '3px',
                    background: opColors[op].bg,
                    border: `1px solid ${opColors[op].border}`,
                  }} />
                  <span style={{ fontSize: '10px', color: sw.textMuted }}>
                    {copy.operations[opToCopyKey[op]]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div style={{
            flex: 1,
            padding: '12px',
            background: 'rgba(15,23,42,0.6)',
            borderRadius: '12px',
            border: `1px solid ${sw.borderSubtle}`,
            overflowY: 'auto',
          }}>
            {selectedOp ? (
              <div>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 700,
                  color: opColors[selectedOp]?.text ?? sw.cyan,
                  marginBottom: '8px',
                  textTransform: 'uppercase',
                }}>
                  {copy.operations[opToCopyKey[selectedOp]]}
                </div>
                <div style={{
                  fontSize: '11px',
                  color: sw.text,
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                }}>
                  {copy.descriptions[opToCopyKey[selectedOp]]}
                </div>
              </div>
            ) : (
              <div style={{
                fontSize: '11px',
                color: sw.textMuted,
                textAlign: 'center',
                padding: '20px 0',
              }}>
                {copy.clickHint}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});
