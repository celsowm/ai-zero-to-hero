import React from 'react';
import { useLinearScale, generateTicks } from './useLinearScale';

export interface ChartFrameProps {
  width: number;
  height: number;
  padding?: { top: number; right: number; bottom: number; left: number };
  xDomain: [number, number];
  yDomain: [number, number];
  xLabel?: string;
  yLabel?: string;
  children: (ctx: ChartContext) => React.ReactNode;
  tickCount?: number;
}

export interface ChartContext {
  xScale: (v: number) => number;
  yScale: (v: number) => number;
  plotWidth: number;
  plotHeight: number;
  xTicks: { value: number; label: string; position: number }[];
  yTicks: { value: number; label: string; position: number }[];
}

const defaultPadding = { top: 20, right: 20, bottom: 40, left: 50 };

/**
 * Shared chart frame that renders axes, grid, labels, and exposes
 * xScale/yScale to children via render props.
 */
export const ChartFrame: React.FC<ChartFrameProps> = ({
  width,
  height,
  padding = defaultPadding,
  xDomain,
  yDomain,
  xLabel,
  yLabel,
  children,
  tickCount = 6,
}) => {
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const { scale: xScale } = useLinearScale(xDomain, [0, plotWidth]);
  const { scale: yScaleRaw } = useLinearScale(yDomain, [plotHeight, 0]);

  // SVG y is inverted (top = 0), so yScale maps high values to low pixels
  const yScale = (v: number) => yScaleRaw(v);

  const xTicks = generateTicks(xDomain, tickCount);
  const yTicks = generateTicks(yDomain, tickCount);

  const ctx: ChartContext = {
    xScale,
    yScale,
    plotWidth,
    plotHeight,
    xTicks,
    yTicks,
  };

  return (
    <svg width={width} height={height} className="block">
      {/* Grid lines */}
      {xTicks.map((tick, i) => (
        <line
          key={`xg-${i}`}
          x1={padding.left + xScale(tick.value)}
          y1={padding.top}
          x2={padding.left + xScale(tick.value)}
          y2={padding.top + plotHeight}
          stroke="rgba(255,255,255,0.06)"
        />
      ))}
      {yTicks.map((tick, i) => (
        <line
          key={`yg-${i}`}
          x1={padding.left}
          y1={padding.top + yScale(tick.value)}
          x2={padding.left + plotWidth}
          y2={padding.top + yScale(tick.value)}
          stroke="rgba(255,255,255,0.06)"
        />
      ))}

      {/* Axes */}
      <line
        x1={padding.left}
        y1={padding.top + plotHeight}
        x2={padding.left + plotWidth}
        y2={padding.top + plotHeight}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1}
      />
      <line
        x1={padding.left}
        y1={padding.top}
        x2={padding.left}
        y2={padding.top + plotHeight}
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1}
      />

      {/* X ticks + labels */}
      {xTicks.map((tick, i) => (
        <g key={`xt-${i}`}>
          <line
            x1={padding.left + xScale(tick.value)}
            y1={padding.top + plotHeight}
            x2={padding.left + xScale(tick.value)}
            y2={padding.top + plotHeight + 4}
            stroke="rgba(255,255,255,0.3)"
          />
          <text
            x={padding.left + xScale(tick.value)}
            y={padding.top + plotHeight + 18}
            textAnchor="middle"
            fill="rgba(255,255,255,0.5)"
            fontSize={10}
          >
            {tick.label}
          </text>
        </g>
      ))}

      {/* Y ticks + labels */}
      {yTicks.map((tick, i) => (
        <g key={`yt-${i}`}>
          <line
            x1={padding.left - 4}
            y1={padding.top + yScale(tick.value)}
            x2={padding.left}
            y2={padding.top + yScale(tick.value)}
            stroke="rgba(255,255,255,0.3)"
          />
          <text
            x={padding.left - 8}
            y={padding.top + yScale(tick.value) + 4}
            textAnchor="end"
            fill="rgba(255,255,255,0.5)"
            fontSize={10}
          >
            {tick.label}
          </text>
        </g>
      ))}

      {/* Axis labels */}
      {xLabel && (
        <text
          x={padding.left + plotWidth / 2}
          y={height - 4}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize={11}
          fontWeight={600}
        >
          {xLabel}
        </text>
      )}
      {yLabel && (
        <text
          x={12}
          y={padding.top + plotHeight / 2}
          textAnchor="middle"
          fill="rgba(255,255,255,0.6)"
          fontSize={11}
          fontWeight={600}
          transform={`rotate(-90, 12, ${padding.top + plotHeight / 2})`}
        >
          {yLabel}
        </text>
      )}

      {/* Chart content */}
      <g transform={`translate(${padding.left}, ${padding.top})`}>{children(ctx)}</g>
    </svg>
  );
};
