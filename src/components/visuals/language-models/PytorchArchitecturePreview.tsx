import React from 'react';
import { sw } from '../../../theme/tokens';

interface PytorchArchitecturePreviewProps {
  copy: {
    title: string;
    layers: Array<{ name: string; shape: string; role: string }>;
  };
}

const LAYER_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b'];

/**
 * Compact architecture preview that renders the model layers as stacked blocks
 * with arrows between them. Designed for the bottom half of the Code tab on slides
 * like `neural-network-pytorch-nn-layers`, so the reader sees both the source and
 * the resulting network skeleton at once.
 */
export const PytorchArchitecturePreview = React.memo(({ copy }: PytorchArchitecturePreviewProps) => {
  const layers = copy.layers;
  const totalWidth = 100;
  const blockHeight = 36;
  const gap = 18;
  const blockWidth = Math.max(72, Math.floor(420 / Math.max(layers.length, 1)));
  const svgWidth = layers.length * (blockWidth + gap) + 40;
  const svgHeight = blockHeight + 70;

  return (
    <div
      style={{
        border: `1px solid ${sw.borderSubtle}`,
        borderRadius: 14,
        background: 'linear-gradient(180deg, rgba(0,229,255,0.04), rgba(255,255,255,0.01))',
        padding: 14,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
    >
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: sw.cyan }}>
        {copy.title}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ width: '100%', minWidth: svgWidth / 2, height: svgHeight, display: 'block' }}>
          <defs>
            <marker id="archArrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 Z" fill={sw.textMuted} />
            </marker>
          </defs>

          {layers.map((layer, index) => {
            const color = LAYER_COLORS[index % LAYER_COLORS.length];
            const x = 20 + index * (blockWidth + gap);
            const y = 24;
            return (
              <g key={`layer-${index}`}>
                {/* Block */}
                <rect
                  x={x}
                  y={y}
                  width={blockWidth}
                  height={blockHeight}
                  rx={8}
                  ry={8}
                  fill={`${color}22`}
                  stroke={color}
                  strokeWidth={1.5}
                />
                <text
                  x={x + blockWidth / 2}
                  y={y + 14}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="800"
                  fill={color}
                >
                  {layer.name}
                </text>
                <text
                  x={x + blockWidth / 2}
                  y={y + 28}
                  textAnchor="middle"
                  fontSize="9"
                  fontFamily="monospace"
                  fill={sw.text}
                >
                  {layer.shape}
                </text>
                <text
                  x={x + blockWidth / 2}
                  y={y + blockHeight + 16}
                  textAnchor="middle"
                  fontSize="9"
                  fill={sw.textMuted}
                >
                  {layer.role}
                </text>

                {/* Arrow to next */}
                {index < layers.length - 1 && (
                  <line
                    x1={x + blockWidth + 1}
                    y1={y + blockHeight / 2}
                    x2={x + blockWidth + gap - 2}
                    y2={y + blockHeight / 2}
                    stroke={sw.textMuted}
                    strokeWidth={1.5}
                    markerEnd="url(#archArrow)"
                  />
                )}
              </g>
            );
          })}
          {/* hidden anchor to make totalWidth reference exist if needed */}
          <rect x={0} y={0} width={totalWidth} height={0} fillOpacity={0} />
        </svg>
      </div>
    </div>
  );
});
