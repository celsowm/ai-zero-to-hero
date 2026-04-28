import React, { useState } from 'react';
import type { SglangIntroCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface SglangIntroProps {
  copy: SglangIntroCopy;
}

export const SglangIntroVisual = React.memo(({ copy }: SglangIntroProps) => {
  const [expandedNode, setExpandedNode] = useState<string | null>(null);

  // Radix tree visualization
  const treeNodes = [
    { id: 'root', label: '[root]', children: ['conv1', 'conv2', 'conv3'], color: sw.textDim },
    { id: 'conv1', label: '"User: o que é"', children: ['child1a', 'child1b'], color: sw.cyan },
    { id: 'conv2', label: '"User: explique"', children: [], color: sw.purple },
    { id: 'conv3', label: '"System: você é"', children: [], color: sw.pink },
    { id: 'child1a', label: '"...RAG?"', children: [], color: '#10b981' },
    { id: 'child1b', label: '"...LLM?"', children: [], color: '#f59e0b' },
  ];

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
      gap: '28px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.titleLabel}
      </div>

      {/* Radix Tree */}
      <div style={{
        padding: '20px',
        background: 'rgba(168, 85, 247, 0.06)',
        borderRadius: '12px',
        border: `1px solid ${sw.purple}22`,
      }}>
        <div style={{ fontSize: '13px', fontWeight: '700', color: sw.purple, marginBottom: '16px' }}>
          {copy.treeLabel} — Prefix Cache
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px' }}>
          {treeNodes.map(node => (
            <div
              key={node.id}
              onClick={() => setExpandedNode(expandedNode === node.id ? null : node.id)}
              style={{
                padding: '10px 16px',
                borderRadius: '8px',
                border: `1px solid ${expandedNode === node.id ? node.color : sw.borderSubtle}`,
                background: expandedNode === node.id ? `${node.color}12` : 'rgba(26, 22, 40, 0.6)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                marginLeft: node.id === 'root' ? 0
                  : node.id.startsWith('conv') ? '24px'
                  : '48px',
              }}
            >
              <span style={{ fontSize: '13px', fontFamily: sw.fontMono, color: node.color }}>
                {node.label}
              </span>
              {expandedNode === node.id && node.children.length > 0 && (
                <div style={{ fontSize: '11px', color: sw.textDim, marginTop: '4px' }}>
                  {node.children.length === 2 ? copy.sharedLabel : copy.uniqueLabel}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div style={{
          padding: '16px',
          background: 'rgba(16, 185, 129, 0.08)',
          borderRadius: '10px',
          border: `1px solid rgba(16, 185, 129, 0.2)`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: '#10b981' }}>5x</div>
          <div style={{ fontSize: '12px', color: sw.textDim }}>{copy.speedupLabel}</div>
          <div style={{ fontSize: '11px', color: sw.textDim }}>multi-turn conversations</div>
        </div>
        <div style={{
          padding: '16px',
          background: 'rgba(0, 229, 255, 0.08)',
          borderRadius: '10px',
          border: `1px solid ${sw.cyan}22`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '13px', fontWeight: '700', color: sw.cyan }}>{copy.cacheHitLabel}</div>
          <div style={{ fontSize: '11px', color: sw.textDim }}>prefix shared → skip compute</div>
        </div>
      </div>

      <div style={{
        padding: '14px',
        background: 'rgba(26, 22, 40, 0.6)',
        borderRadius: '10px',
        border: `1px solid ${sw.borderSubtle}`,
        fontSize: '12px',
        fontFamily: sw.fontMono,
        color: sw.textDim,
      }}>
        python -m sglang.launch_server --model-path meta-llama/Llama-3.1-8B
      </div>
    </div>
  );
});
