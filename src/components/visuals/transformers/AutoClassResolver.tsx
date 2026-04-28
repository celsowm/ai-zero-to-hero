import React, { useState } from 'react';
import type { AutoClassResolverCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface AutoClassResolverProps {
  copy: AutoClassResolverCopy;
}

export const AutoClassResolver = React.memo(({ copy }: AutoClassResolverProps) => {
  const [checkpoint, setCheckpoint] = useState('gpt2');

  const checkpoints = [
    { id: 'gpt2', model: 'GPT2LMHeadModel', desc: 'Causal LM (124M)' },
    { id: 'bert-base-uncased', model: 'BertModel', desc: 'Base encoder' },
    { id: 't5-small', model: 'T5ForConditionalGeneration', desc: 'Seq2seq (encoder+decoder)' },
    { id: 'roberta-base', model: 'RobertaForSequenceClassification', desc: 'Classification head' },
  ];

  const current = checkpoints.find(c => c.id === checkpoint)!;

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeeper,
      display: 'flex',
      flexDirection: 'column',
      gap: '32px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      {/* Title */}
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      {/* Checkpoint selector */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {checkpoints.map(c => (
          <button
            key={c.id}
            onClick={() => setCheckpoint(c.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: `1px solid ${c.id === checkpoint ? sw.cyan : sw.borderSubtle}`,
              background: c.id === checkpoint ? 'rgba(0, 229, 255, 0.12)' : 'rgba(26, 22, 40, 0.6)',
              color: c.id === checkpoint ? sw.cyan : sw.textDim,
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
            }}
          >
            {c.id}
          </button>
        ))}
      </div>

      {/* Resolver flow */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        padding: '24px',
        background: 'rgba(26, 22, 40, 0.6)',
        borderRadius: '16px',
        border: `1px solid ${sw.borderSubtle}`,
      }}>
        {/* Checkpoint */}
        <div style={{
          padding: '12px 24px',
          background: `linear-gradient(135deg, ${sw.pink}, ${sw.purple})`,
          borderRadius: '12px',
          fontWeight: '700',
          fontSize: '15px',
          boxShadow: `0 0 16px ${sw.pink}33`,
        }}>
          {copy.checkpointLabel}: "{checkpoint}"
        </div>

        {/* Arrow */}
        <div style={{ width: '3px', height: '24px', background: sw.cyan, boxShadow: `0 0 8px ${sw.cyan}66` }} />

        {/* Resolver */}
        <div style={{
          padding: '12px 24px',
          background: 'rgba(0, 229, 255, 0.08)',
          borderRadius: '12px',
          border: `1px solid ${sw.cyan}33`,
          fontWeight: '600',
          fontSize: '14px',
          color: sw.cyan,
        }}>
          {copy.resolverLabel} → AutoModel.from_pretrained("{checkpoint}")
        </div>

        {/* Arrow */}
        <div style={{ width: '3px', height: '24px', background: sw.purple, boxShadow: `0 0 8px ${sw.purple}66` }} />

        {/* Resolved model */}
        <div style={{
          padding: '12px 24px',
          background: 'rgba(168, 85, 247, 0.12)',
          borderRadius: '12px',
          border: `1px solid ${sw.purple}44`,
          fontWeight: '700',
          fontSize: '15px',
          color: sw.purple,
        }}>
          ✓ {current.model} — {current.desc}
        </div>
      </div>

      {/* Resolution details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px',
      }}>
        {[
          { label: copy.modelResolved, value: current.model, color: sw.purple },
          { label: copy.tokenizerResolved, value: 'GPT2Tokenizer' , color: sw.cyan },
          { label: copy.configResolved, value: 'GPT2Config', color: sw.pink },
        ].map((item, i) => (
          <div key={i} style={{
            padding: '12px',
            background: 'rgba(26, 22, 40, 0.6)',
            borderRadius: '10px',
            border: `1px solid ${sw.borderSubtle}`,
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '11px', fontWeight: '600', color: sw.textDim, textTransform: 'uppercase', marginBottom: '4px' }}>
              {item.label}
            </div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: item.color }}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Hub tooltip */}
      <div style={{
        padding: '12px 16px',
        background: 'rgba(255, 204, 0, 0.06)',
        borderRadius: '10px',
        border: `1px solid rgba(255, 204, 0, 0.2)`,
        fontSize: '12px',
        color: sw.textDim,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{ fontSize: '16px' }}>🤗</span>
        <span><strong style={{ color: '#ffcc00' }}>{copy.hubLabel}:</strong> {copy.hubTooltip}</span>
      </div>
    </div>
  );
});
