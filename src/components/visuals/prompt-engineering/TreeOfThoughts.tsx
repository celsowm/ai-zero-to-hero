import React, { useState } from 'react';
import type { TreeOfThoughtsCopy } from '../../../types/slide/prompt-engineering';
import { sw } from '../../../theme/tokens';

interface TreeOfThoughtsProps {
  copy: TreeOfThoughtsCopy;
}

interface TreeNode {
  id: string;
  label: string;
  score?: number;
  children?: TreeNode[];
  status?: 'active' | 'backtracked' | 'selected';
}

const treeData: TreeNode = {
  id: 'root',
  label: 'Problema',
  children: [
    {
      id: 'a',
      label: 'Caminho A',
      score: 0.3,
      status: 'backtracked',
      children: [
        { id: 'a1', label: 'A→1', score: 0.2, status: 'backtracked' },
      ],
    },
    {
      id: 'b',
      label: 'Caminho B',
      score: 0.8,
      status: 'selected',
      children: [
        { id: 'b1', label: 'B→1', score: 0.7 },
        { id: 'b2', label: 'B→2', score: 0.9, status: 'active' },
      ],
    },
    {
      id: 'c',
      label: 'Caminho C',
      score: 0.5,
      children: [
        { id: 'c1', label: 'C→1', score: 0.4 },
      ],
    },
  ],
};

export const TreeOfThoughtsVisual = React.memo(({ copy }: TreeOfThoughtsProps) => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const toggleNode = (id: string) => {
    const next = new Set(expandedNodes);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setExpandedNodes(next);
  };

  const renderNode = (node: TreeNode, depth: number): React.ReactNode => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;
    const nodeColor = node.status === 'backtracked' ? sw.pink
      : node.status === 'selected' ? sw.green
      : node.status === 'active' ? sw.cyan
      : sw.textDim;

    return (
      <div key={node.id} style={{ marginLeft: depth === 0 ? 0 : '24px' }}>
        <div
          onClick={() => { if (hasChildren) toggleNode(node.id); }}
          onMouseOver={() => setSelectedNode(node.id)}
          onMouseOut={() => setSelectedNode(null)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            borderRadius: '8px',
            border: `1px solid ${selectedNode === node.id ? nodeColor : sw.borderSubtle}`,
            background: selectedNode === node.id ? `${nodeColor}12` : 'transparent',
            cursor: hasChildren ? 'pointer' : 'default',
            transition: sw.transitionFast,
            marginBottom: '4px',
          }}
        >
          {hasChildren && (
            <span style={{ fontSize: '10px', color: sw.textMuted, transition: sw.transitionFast, transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
              ▶
            </span>
          )}
          <span style={{
            fontSize: sw.fsSmall,
            color: nodeColor,
            fontWeight: node.status === 'selected' ? 700 : 500,
          }}>
            {node.label}
          </span>
          {node.score !== undefined && (
            <span style={{
              fontSize: '10px',
              color: nodeColor,
              background: `${nodeColor}18`,
              padding: '2px 6px',
              borderRadius: '4px',
            }}>
              {node.score.toFixed(1)}
            </span>
          )}
          {node.status === 'backtracked' && (
            <span style={{ fontSize: '10px' }}>↩</span>
          )}
        </div>

        {isExpanded && hasChildren && (
          <div style={{ borderLeft: `1px solid ${sw.borderSubtle}44`, paddingLeft: '0px' }}>
            {node.children!.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <h3 style={{
        margin: 0,
        fontSize: sw.fsBody,
        fontWeight: 600,
        color: sw.text,
        textAlign: 'center',
      }}>
        {copy.title}
      </h3>

      {/* Tree */}
      <div style={{ overflowX: 'auto' }}>
        {renderNode(treeData, 0)}
      </div>

      {/* Voting result */}
      <div style={{
        marginTop: '12px',
        padding: '14px 16px',
        borderRadius: '10px',
        border: `1px solid ${sw.green}44`,
        background: `${sw.green}08`,
        textAlign: 'center',
      }}>
        <span style={{ fontSize: sw.fsSmall, color: sw.green, fontWeight: 600 }}>
          {copy.voteLabel}: {copy.branch2Label} (score: 0.9) → {copy.answerLabel}
        </span>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', fontSize: '11px', color: sw.textMuted }}>
        <span style={{ color: sw.cyan }}>● {copy.evalLabel}</span>
        <span style={{ color: sw.green }}>● {copy.voteLabel}</span>
        <span style={{ color: sw.pink }}>● {copy.backtrackLabel}</span>
      </div>
    </div>
  );
});
