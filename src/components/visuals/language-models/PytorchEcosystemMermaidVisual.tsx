import React, { useMemo, useState } from 'react';
import type { PytorchEcosystemMermaidCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface PytorchEcosystemMermaidVisualProps {
  copy: PytorchEcosystemMermaidCopy;
}

const MODULE_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b', '#38bdf8'];

const clampLabel = (text: string, max = 44) => (text.length > max ? `${text.slice(0, max - 1)}...` : text);

type ParsedRole = {
  responsibility: string;
  boundary: string;
  anchors: string;
  raw: string;
  parsed: boolean;
};

type Node = {
  module: string;
  micro: string;
  color: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const parseRole = (role: string): ParsedRole => {
  const lines = role
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const readField = (prefixes: string[]) => {
    const hit = lines.find((line) => prefixes.some((prefix) => line.toLowerCase().startsWith(prefix)));
    if (!hit) return '';
    const idx = hit.indexOf(':');
    return idx >= 0 ? hit.slice(idx + 1).trim() : '';
  };

  const responsibility = readField(['responsabilidade:', 'responsibility:']);
  const boundary = readField(['limite:', 'boundary:']);
  const anchors = readField(['apis:', 'api anchors:']);

  if (responsibility && boundary && anchors) {
    return { responsibility, boundary, anchors, raw: role, parsed: true };
  }

  return {
    responsibility: '',
    boundary: '',
    anchors: '',
    raw: role,
    parsed: false,
  };
};

const microLabelFromRole = (parsed: ParsedRole) => {
  if (parsed.parsed) return clampLabel(parsed.responsibility, 30);
  return clampLabel(parsed.raw, 30);
};

const summaryFromRole = (parsed: ParsedRole) => {
  if (parsed.parsed) return parsed.responsibility;
  return parsed.raw;
};

const buildPath = (from: Node, to: Node) => {
  const x1 = from.x + from.w / 2;
  const y1 = from.y + from.h / 2;
  const x2 = to.x + to.w / 2;
  const y2 = to.y + to.h / 2;
  const cx1 = x1 + (x2 - x1) * 0.36;
  const cy1 = y1;
  const cx2 = x1 + (x2 - x1) * 0.68;
  const cy2 = y2;
  return `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;
};

const RadialDiagram: React.FC<{
  nodes: Node[];
  activeIndex: number;
  onSelect: (index: number) => void;
}> = ({ nodes, activeIndex, onSelect }) => {
  const core = nodes[0];
  const satellites = nodes.slice(1);

  return (
    <svg viewBox="0 0 1000 560" style={{ width: '100%', height: '100%' }}>
      <defs>
        <radialGradient id="diagramBackdrop" cx="50%" cy="48%" r="62%">
          <stop offset="0%" stopColor="rgba(14,165,233,0.14)" />
          <stop offset="55%" stopColor="rgba(168,85,247,0.09)" />
          <stop offset="100%" stopColor="rgba(15,23,42,0.06)" />
        </radialGradient>

        <filter id="activeGlow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" width="1000" height="560" fill="url(#diagramBackdrop)" />

      {satellites.map((node, i) => {
        const idx = i + 1;
        const isActive = activeIndex === idx;
        const dimmed = activeIndex !== 0 && !isActive;
        return (
          <path
            key={`edge-${node.module}`}
            d={buildPath(core, node)}
            fill="none"
            stroke={isActive ? node.color : '#334155'}
            strokeWidth={isActive ? 3.6 : 1.9}
            strokeLinecap="round"
            opacity={dimmed ? 0.28 : isActive ? 0.95 : 0.6}
            style={{ transition: 'all 260ms ease' }}
          />
        );
      })}

      {nodes.map((node, index) => {
        const isActive = activeIndex === index;
        const dimmed = activeIndex !== index && activeIndex !== 0;

        return (
          <g
            key={node.module}
            style={{ cursor: 'pointer', transition: 'all 220ms ease' }}
            onClick={() => onSelect(index)}
          >
            <rect
              x={node.x}
              y={node.y}
              width={node.w}
              height={node.h}
              rx={14}
              fill={isActive ? `${node.color}1c` : 'rgba(15,23,42,0.88)'}
              stroke={isActive ? node.color : '#334155'}
              strokeWidth={isActive ? 2.5 : 1.2}
              opacity={dimmed ? 0.4 : 1}
              filter={isActive ? 'url(#activeGlow)' : undefined}
              style={{ transition: 'all 220ms ease' }}
            />

            <rect
              x={node.x + 1.5}
              y={node.y + 1.5}
              width={4}
              height={node.h - 3}
              rx={2}
              fill={node.color}
              opacity={isActive ? 1 : 0.45}
              style={{ transition: 'all 220ms ease' }}
            />

            <text
              x={node.x + 16}
              y={node.y + 30}
              fill={isActive ? node.color : '#cbd5e1'}
              fontFamily={sw.fontMono}
              fontSize="24"
              fontWeight="800"
            >
              {node.module}
            </text>

            <text x={node.x + 16} y={node.y + 62} fill="#94a3b8" fontSize="14" opacity={dimmed ? 0.65 : 1}>
              {node.micro}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export const PytorchEcosystemMermaidVisual = React.memo(({ copy }: PytorchEcosystemMermaidVisualProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const enriched = useMemo(
    () => copy.legend.slice(0, 6).map((item) => ({ ...item, parsed: parseRole(item.role) })),
    [copy.legend]
  );

  const nodes = useMemo<Node[]>(() => {
    if (enriched.length === 0) return [];

    const ring = [
      { x: 86, y: 76 },
      { x: 704, y: 78 },
      { x: 734, y: 372 },
      { x: 392, y: 428 },
      { x: 56, y: 366 },
    ];

    const core = {
      module: enriched[0].module,
      micro: microLabelFromRole(enriched[0].parsed),
      color: MODULE_COLORS[0],
      x: 372,
      y: 228,
      w: 260,
      h: 112,
    };

    const satellites = enriched.slice(1).map((entry, i) => ({
      module: entry.module,
      micro: microLabelFromRole(entry.parsed),
      color: MODULE_COLORS[(i + 1) % MODULE_COLORS.length],
      x: ring[i]?.x ?? 110 + i * 120,
      y: ring[i]?.y ?? 320,
      w: 238,
      h: 98,
    }));

    return [core, ...satellites];
  }, [enriched]);

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
          gridTemplateColumns: 'minmax(380px, 1.7fr) minmax(280px, 1fr)',
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
            minHeight: 280,
          }}
        >
          {nodes.length > 0 ? <RadialDiagram nodes={nodes} activeIndex={activeIndex} onSelect={setActiveIndex} /> : null}
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
          <div
            style={{
              border: `1px solid ${sw.borderSubtle}`,
              borderRadius: 14,
              background: sw.surface,
              padding: '10px 14px',
              color: sw.text,
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            {copy.legendTitle}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {enriched.map((item, index) => {
              const isActive = activeIndex === index;
              const color = MODULE_COLORS[index % MODULE_COLORS.length];

              return (
                <section
                  key={item.module}
                  style={{
                    border: `1px solid ${isActive ? color : sw.borderSubtle}`,
                    borderRadius: 12,
                    background: isActive ? `linear-gradient(160deg, ${color}12, rgba(15,23,42,0.75))` : sw.surfaceLight,
                    overflow: 'hidden',
                    transition: 'all 220ms ease',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    style={{
                      width: '100%',
                      border: 0,
                      background: 'transparent',
                      color: sw.text,
                      display: 'grid',
                      gridTemplateColumns: '4px 1fr auto',
                      alignItems: 'center',
                      gap: 10,
                      textAlign: 'left',
                      padding: '10px 12px 10px 0',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ width: 4, alignSelf: 'stretch', borderRadius: 99, background: color, opacity: isActive ? 1 : 0.55 }} />
                      <span style={{ display: 'grid', gap: 3 }}>
                      <span style={{ fontFamily: sw.fontMono, fontSize: 15, fontWeight: 800, color: isActive ? color : sw.text }}>{item.module}</span>
                      <span style={{ fontSize: 12, color: sw.textDim, lineHeight: 1.4, whiteSpace: 'normal', overflowWrap: 'anywhere' }}>{summaryFromRole(item.parsed)}</span>
                    </span>
                    <span style={{ color: isActive ? color : sw.textDim, fontSize: 16, fontWeight: 800 }}>{isActive ? '-' : '+'}</span>
                  </button>

                  {isActive ? (
                    <div
                      aria-live="polite"
                      style={{
                        padding: '0 12px 12px 14px',
                        display: 'grid',
                        gap: 8,
                      }}
                    >
                      {item.parsed.parsed ? (
                        <>
                          <div style={{ borderTop: `1px solid ${color}44`, paddingTop: 9 }}>
                            <div style={{ color: color, fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                              Responsabilidade
                            </div>
                            <div style={{ color: sw.text, fontSize: 13, lineHeight: 1.6 }}>{item.parsed.responsibility}</div>
                          </div>
                          <div>
                            <div style={{ color: color, fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                              Limite do módulo
                            </div>
                            <div style={{ color: sw.text, fontSize: 13, lineHeight: 1.6 }}>{item.parsed.boundary}</div>
                          </div>
                          <div>
                            <div style={{ color: color, fontSize: 11, fontWeight: 800, letterSpacing: 0.6, textTransform: 'uppercase' }}>
                              APIs âncora
                            </div>
                            <div style={{ color: sw.text, fontSize: 13, lineHeight: 1.6, fontFamily: sw.fontMono }}>{item.parsed.anchors}</div>
                          </div>
                        </>
                      ) : (
                        <div
                          style={{
                            borderTop: `1px solid ${color}44`,
                            paddingTop: 9,
                            color: sw.text,
                            fontSize: 12.5,
                            lineHeight: 1.6,
                          }}
                        >
                          {item.parsed.raw}
                        </div>
                      )}
                    </div>
                  ) : null}
                </section>
              );
            })}
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
