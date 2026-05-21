import React, { useMemo, useState } from 'react';
import type { PytorchEcosystemMermaidCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface PytorchEcosystemMermaidVisualProps {
  copy: PytorchEcosystemMermaidCopy;
}

const MODULE_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b', '#38bdf8'];

type Node = {
  module: string;
  role: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const ELLIPSIS = (text: string, max = 34) => (text.length > max ? `${text.slice(0, max - 1)}…` : text);

const EcosystemDiagram: React.FC<{
  nodes: Node[];
  activeIndex: number;
  onSelect: (index: number) => void;
}> = ({ nodes, activeIndex, onSelect }) => {
  const core = nodes[0];
  const satellites = nodes.slice(1);

  return (
    <svg viewBox="0 0 900 460" style={{ width: '100%', height: '100%' }}>
      <defs>
        <filter id="nodeGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {satellites.map((node, i) => {
        const idx = i + 1;
        const isActive = activeIndex === idx;
        return (
          <g key={`edge-${node.module}`}>
            <line
              x1={core.x + core.w / 2}
              y1={core.y + core.h / 2}
              x2={node.x + node.w / 2}
              y2={node.y + node.h / 2}
              stroke={isActive ? node.color : '#334155'}
              strokeWidth={isActive ? 3 : 1.5}
              strokeDasharray={isActive ? '0' : '6 4'}
              opacity={0.9}
            />
          </g>
        );
      })}

      {nodes.map((node, index) => {
        const isActive = activeIndex === index;
        return (
          <g key={node.module} style={{ cursor: 'pointer' }} onClick={() => onSelect(index)}>
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx={14}
              fill={isActive ? `${node.color}22` : 'rgba(17,24,39,0.78)'}
              stroke={isActive ? node.color : '#334155'}
              strokeWidth={isActive ? 2.2 : 1}
              filter={isActive ? 'url(#nodeGlow)' : undefined}
            />
            <text
              x={node.x + 14}
              y={node.y + 28}
              fill={isActive ? node.color : '#cbd5e1'}
              fontFamily={sw.fontMono}
              fontSize="20"
              fontWeight="800"
            >
              {node.module}
            </text>
            <text x={node.x + 14} y={node.y + 53} fill="#94a3b8" fontSize="12">
              {ELLIPSIS(node.role, 50)}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const PytorchEcosystemMermaidVisual = React.memo(({ copy }: PytorchEcosystemMermaidVisualProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = copy.legend[activeIndex] ?? copy.legend[0];
  const activeColor = MODULE_COLORS[activeIndex % MODULE_COLORS.length];

  const nodes = useMemo<Node[]>(() => {
    const base = copy.legend.slice(0, 6);
    if (base.length === 0) return [];
    const core = {
      module: base[0].module,
      role: base[0].role,
      color: MODULE_COLORS[0],
      x: 338,
      y: 172,
      w: 224,
      h: 96,
    };
    const ring = [
      { x: 96, y: 82 },
      { x: 628, y: 82 },
      { x: 640, y: 302 },
      { x: 350, y: 330 },
      { x: 74, y: 302 },
    ];
    const satellites = base.slice(1).map((entry, i) => ({
      module: entry.module,
      role: entry.role,
      color: MODULE_COLORS[(i + 1) % MODULE_COLORS.length],
      x: ring[i]?.x ?? 80 + i * 120,
      y: ring[i]?.y ?? 300,
      w: 210,
      h: 82,
    }));
    return [core, ...satellites];
  }, [copy.legend]);

  return (
    <div style={{ display: 'grid', gap: 10, height: '100%' }}>
      <div
        style={{
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: 14,
          background: sw.surface,
          padding: '10px 14px',
        }}
      >
        <div style={{ color: sw.text, fontSize: 17, fontWeight: 800 }}>{copy.title}</div>
        <div style={{ color: sw.textDim, fontSize: 12.5, marginTop: 4, lineHeight: 1.5 }}>{copy.subtitle}</div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(320px, 1.6fr) minmax(240px, 1fr)',
          gap: 10,
          flex: 1,
          minHeight: 0,
        }}
      >
        <div
          style={{
            border: `1px solid ${sw.borderSubtle}`,
            borderRadius: 14,
            background: sw.surface,
            padding: 10,
            overflow: 'hidden',
            minHeight: 220,
          }}
        >
          {nodes.length > 0 ? (
            <EcosystemDiagram nodes={nodes} activeIndex={activeIndex} onSelect={setActiveIndex} />
          ) : null}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            minHeight: 0,
            overflow: 'auto',
          }}
        >
          <div style={{
            border: `1px solid ${sw.borderSubtle}`,
            borderRadius: 14,
            background: sw.surface,
            padding: '10px 14px',
            color: sw.text,
            fontSize: 13,
            fontWeight: 800,
          }}>{copy.legendTitle}</div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
            {copy.legend.map((item, index) => {
              const color = MODULE_COLORS[index % MODULE_COLORS.length];
              const isActive = index === activeIndex;
              return (
                <button
                  key={item.module}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  style={{
                    fontFamily: sw.fontMono,
                    fontSize: 11,
                    fontWeight: 800,
                    padding: '5px 9px',
                    borderRadius: 999,
                    border: `1px solid ${isActive ? color : sw.borderSubtle}`,
                    background: isActive ? `${color}18` : sw.surfaceLight,
                    color: isActive ? color : sw.textDim,
                    cursor: 'pointer',
                  }}
                >
                  {item.module}
                </button>
              );
            })}
          </div>

          <div
            aria-live="polite"
            style={{
              border: `1px solid ${activeColor}55`,
              borderRadius: 12,
              background: `linear-gradient(180deg, ${activeColor}10, rgba(255,255,255,0.01))`,
              padding: 14,
            }}
          >
            <div style={{ fontSize: 15, fontWeight: 800, color: activeColor, fontFamily: sw.fontMono, marginBottom: 8 }}>
              {active.module}
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.65, color: sw.text }}>{active.role}</div>
          </div>
        </div>
      </div>

      <div
        style={{
          border: `1px solid ${sw.borderSubtle}`,
          borderRadius: 12,
          background: sw.surface,
          color: sw.textMuted,
          fontSize: 12,
          lineHeight: 1.5,
          padding: '8px 12px',
        }}
      >
        {copy.footer}
      </div>
    </div>
  );
});

