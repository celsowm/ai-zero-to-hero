import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';

interface PytorchArchitecturePreviewProps {
  copy: {
    title: string;
    layers: Array<{ name: string; shape: string; role: string }>;
  };
}

const LAYER_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, sw.amber];

/**
 * Internal operation details for each layer type — adds didactic depth
 * beyond just colored rectangles. Shows *what happens inside* each block.
 */
const LAYER_INTERNALS: Record<string, { op: string; detail: string; formula?: string }> = {
  'wte (Embedding)': {
    op: 'lookup table[E]',
    detail: 'Cada ID inteiro vira índice de linha na tabela de embedding',
    formula: '(B,T) → (B,T,C)',
  },
  'LayerNorm': {
    op: 'normalize + scale + shift',
    detail: 'Subtrai média, divide pelo desvio, aplica γ e β treináveis',
    formula: 'μ,σ por token',
  },
  'Linear (C->C)': {
    op: 'Wx + b',
    detail: 'Projeção linear: matriz de pesos C×C multiplica cada hidden state',
    formula: 'W ∈ R^(C×C)',
  },
  'Dropout': {
    op: 'mask aleatório',
    detail: 'Zera fração p dos neurons no treino; identity no eval()',
    formula: 'p × mask',
  },
  'lm_head (Linear)': {
    op: 'Wx + b → logits',
    detail: 'Projeta de C para V (vocabulário), produzindo score por token candidato',
    formula: 'W ∈ R^(C×V)',
  },
};

/**
 * Redesigned PytorchArchitecturePreview — bigger blocks, data flow visualization,
 * internal operation details, and interactive hover/click to explore each layer.
 */
export const PytorchArchitecturePreview = React.memo(({ copy }: PytorchArchitecturePreviewProps) => {
  const layers = copy.layers;
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const blockHeight = 62;
  const blockWidth = 120;
  const arrowLength = 30;
  const gap = blockWidth + arrowLength;
  const padding = 22;
  const svgHeight = blockHeight + 90;
  const svgWidth = padding * 2 + layers.length * blockWidth + (layers.length - 1) * arrowLength;

  return (
    <div
      style={{
        border: `1px solid ${sw.borderSubtle}`,
        borderRadius: 16,
        background: 'linear-gradient(180deg, rgba(0,229,255,0.04), rgba(255,255,255,0.01))',
        padding: '10px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.06em', textTransform: 'uppercase', color: sw.cyan }}>
          {copy.title}
        </div>
        <div style={{ fontSize: 11, color: sw.textMuted }}>
          clique num bloco para ver detalhes
        </div>
      </div>

      {/* Main SVG diagram */}
      <div style={{ overflowX: 'auto' }}>
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          style={{ width: '100%', minWidth: Math.max(svgWidth, 400), height: svgHeight, display: 'block' }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            {/* Glow filter for active block */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            {/* Arrow marker */}
            <marker id="flowArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M 0 0 L 8 4 L 0 8 Z" fill={sw.textMuted} />
            </marker>
            {/* Gradient for data flow line */}
            <linearGradient id="flowLine" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={sw.cyan} stopOpacity="0.6" />
              <stop offset="50%" stopColor={sw.purple} stopOpacity="0.6" />
              <stop offset="100%" stopColor={sw.pink} stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Background data flow line */}
          {layers.length > 1 && (
            <line
              x1={padding + blockWidth}
              y1={30 + blockHeight / 2}
              x2={padding + (layers.length - 1) * gap + blockWidth}
              y2={30 + blockHeight / 2}
              stroke="url(#flowLine)"
              strokeWidth={2}
              strokeDasharray="6 4"
              opacity={0.3}
            />
          )}

          {/* Layer blocks */}
          {layers.map((layer, index) => {
            const color = LAYER_COLORS[index % LAYER_COLORS.length];
            const x = padding + index * gap;
            const y = 30;
            const isActive = activeIndex === index;
            const isHovered = activeIndex !== null && activeIndex !== index;
            const internals = LAYER_INTERNALS[layer.name];

            return (
              <g
                key={`layer-${index}`}
                onClick={() => setActiveIndex(isActive ? null : index)}
                style={{ cursor: 'pointer' }}
              >
                {/* Block shadow */}
                <rect
                  x={x + 2}
                  y={y + 3}
                  width={blockWidth}
                  height={blockHeight}
                  rx={12}
                  fill={`${color}08`}
                />

                {/* Block body */}
                <rect
                  x={x}
                  y={y}
                  width={blockWidth}
                  height={blockHeight}
                  rx={12}
                  fill={`${color}${isActive ? '22' : '14'}`}
                  stroke={color}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  filter={isActive ? 'url(#glow)' : undefined}
                  opacity={isHovered ? 0.6 : 1}
                />

                {/* Layer type badge */}
                <rect
                  x={x + 8}
                  y={y + 8}
                  width={56}
                  height={16}
                  rx={4}
                  fill={`${color}30`}
                />
                <text
                  x={x + 36}
                  y={y + 20}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="800"
                  fill={color}
                  fontFamily="monospace"
                >
                  {layer.name.includes('Embedding') ? 'Embed' : layer.name.includes('LayerNorm') ? 'Norm' : layer.name.includes('Dropout') ? 'Drop' : 'Linear'}
                </text>

                {/* Layer name */}
                <text
                  x={x + blockWidth / 2}
                  y={y + 40}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="700"
                  fill={sw.text}
                >
                  {layer.name.split('(')[0].trim()}
                </text>

                {/* Shape */}
                <text
                  x={x + blockWidth / 2}
                  y={y + 58}
                  textAnchor="middle"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="700"
                  fill={color}
                >
                  {layer.shape}
                </text>

                {/* Role label below block */}
                <text
                  x={x + blockWidth / 2}
                  y={y + blockHeight + 20}
                  textAnchor="middle"
                  fontSize="10"
                  fill={sw.textDim}
                >
                  {layer.role}
                </text>

                {/* Active detail panel */}
                {isActive && internals && (
                  <g>
                    <rect
                      x={x - 10}
                      y={y + blockHeight + 32}
                      width={blockWidth + 20}
                      height={52}
                      rx={8}
                      fill={sw.surface}
                      stroke={`${color}44`}
                      strokeWidth={1}
                    />
                    <text
                      x={x + blockWidth / 2}
                      y={y + blockHeight + 50}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fill={sw.cyan}
                      fontFamily="monospace"
                    >
                      {internals.op}
                    </text>
                    <text
                      x={x + blockWidth / 2}
                      y={y + blockHeight + 66}
                      textAnchor="middle"
                      fontSize="9"
                      fill={sw.textDim}
                    >
                      {internals.detail.length > 50 ? internals.detail.slice(0, 50) + '…' : internals.detail}
                    </text>
                    {internals.formula && (
                      <text
                        x={x + blockWidth / 2}
                        y={y + blockHeight + 80}
                        textAnchor="middle"
                        fontSize="9"
                        fontWeight="700"
                        fill={sw.purple}
                        fontFamily="monospace"
                      >
                        {internals.formula}
                      </text>
                    )}
                  </g>
                )}

                {/* Flow arrow to next layer */}
                {index < layers.length - 1 && (
                  <g>
                    <line
                      x1={x + blockWidth + 2}
                      y1={y + blockHeight / 2}
                      x2={x + blockWidth + arrowLength - 4}
                      y2={y + blockHeight / 2}
                      stroke={sw.textMuted}
                      strokeWidth={2}
                      markerEnd="url(#flowArrow)"
                      opacity={0.5}
                    />
                    {/* Shape transition label on arrow */}
                    <text
                      x={x + blockWidth + arrowLength / 2}
                      y={y + blockHeight / 2 - 8}
                      textAnchor="middle"
                      fontSize="8"
                      fill={sw.textMuted}
                      fontFamily="monospace"
                    >
                      →
                    </text>
                  </g>
                )}
              </g>
            );
          })}

          {/* Input label */}
          <text
            x={padding}
            y={18}
            fontSize="10"
            fontWeight="700"
            fill={sw.cyan}
            fontFamily="monospace"
          >
            entrada
          </text>
          {/* Output label */}
          <text
            x={padding + (layers.length - 1) * gap + blockWidth}
            y={18}
            fontSize="10"
            fontWeight="700"
            fill={sw.pink}
            fontFamily="monospace"
          >
            saída
          </text>
        </svg>
      </div>

      {/* Legend / summary below diagram */}
      <div
        style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${layers.length}, minmax(0, 1fr))`,
        gap: 4,
      }}
      >
        {layers.map((layer, index) => {
          const color = LAYER_COLORS[index % LAYER_COLORS.length];
          const internals = LAYER_INTERNALS[layer.name];
          const isActive = activeIndex === index;
          return (
            <button
              key={`legend-${index}`}
              type="button"
              onClick={() => setActiveIndex(isActive ? null : index)}
              style={{
                border: `1px solid ${isActive ? color : sw.borderSubtle}`,
                borderRadius: 10,
                background: isActive ? `${color}14` : sw.surface,
                padding: '6px 8px',
                textAlign: 'left',
                cursor: 'pointer',
                transition: 'all 150ms ease',
              }}
            >
              <div style={{ fontSize: 9, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {layer.name.split('(')[0].trim()}
              </div>
              <div style={{ marginTop: 3, fontSize: 10, color: sw.textDim, lineHeight: 1.4 }}>
                {internals?.op ?? layer.role}
              </div>
              {internals?.formula && (
                <div style={{ marginTop: 2, fontSize: 9, fontFamily: 'monospace', color: sw.purple, fontWeight: 700 }}>
                  {internals.formula}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
});
