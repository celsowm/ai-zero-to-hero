import React, { useEffect, useMemo, useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';
import type { OptimizerComparisonChartCopy } from '../../../types/slide/language-models';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface OptimizerComparisonChartVisualProps {
  copy: OptimizerComparisonChartCopy;
}

type Point = { x: number; y: number };
type OptimizerVariant = 'sgd' | 'adamw';

interface OptimizerData {
  variant: OptimizerVariant;
  title: string;
  subtitle: string;
  color: string;
  softColor: string;
  path: Point[];
  loss: number[];
  metrics: Array<{ label: string; value: string }>;
  bullets: string[];
  badge: string;
  startLabel: string;
  endLabel: string;
}

const CHART_W = 360;
const PATH_H = 190;
const LOSS_H = 96;

const sgdPath: Point[] = [
  { x: 42, y: 144 },
  { x: 76, y: 119 },
  { x: 109, y: 99 },
  { x: 141, y: 82 },
  { x: 171, y: 69 },
  { x: 199, y: 58 },
  { x: 225, y: 50 },
  { x: 249, y: 44 },
  { x: 271, y: 40 },
  { x: 291, y: 38 },
];

const adamwPath: Point[] = [
  { x: 42, y: 144 },
  { x: 83, y: 99 },
  { x: 124, y: 70 },
  { x: 166, y: 53 },
  { x: 207, y: 44 },
  { x: 244, y: 39 },
  { x: 273, y: 37 },
  { x: 291, y: 37 },
];

function pathD(points: Point[]) {
  return points.map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`).join(' ');
}

function curveD(values: number[]) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const spread = Math.max(1, max - min);

  return values
    .map((value, index) => {
      const x = 26 + index * ((CHART_W - 52) / (values.length - 1));
      const y = 16 + ((max - value) / spread) * (LOSS_H - 34);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');
}

function TrajectoryPlot({ data, animationKey }: { data: OptimizerData; animationKey: number }) {
  const d = pathD(data.path);
  const duration = data.variant === 'adamw' ? '2.5s' : '3.4s';
  const gridLines = [42, 73, 104, 135, 166];
  const contours = [
    { rx: 34, ry: 18 },
    { rx: 62, ry: 31 },
    { rx: 92, ry: 46 },
    { rx: 123, ry: 61 },
  ];

  return (
    <svg
      viewBox={`0 0 ${CHART_W} ${PATH_H}`}
      style={{ display: 'block', width: '100%', height: '100%' }}
      role="img"
      aria-label={`${data.title} trajectory`}
    >
      <defs>
        <linearGradient id={`${data.variant}-path`} x1="40" y1="150" x2="300" y2="38" gradientUnits="userSpaceOnUse">
          <stop stopColor={data.color} stopOpacity="0.35" />
          <stop offset="1" stopColor={data.color} />
        </linearGradient>
        <filter id={`${data.variant}-soft-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width={CHART_W} height={PATH_H} rx="8" fill="rgba(255,255,255,0.025)" />
      {gridLines.map(y => (
        <line key={y} x1="22" y1={y} x2="332" y2={y} stroke={sw.gridLineAlt} strokeWidth="1" />
      ))}
      {contours.map((contour, index) => (
        <ellipse
          key={`${contour.rx}-${contour.ry}`}
          cx="292"
          cy="37"
          rx={contour.rx}
          ry={contour.ry}
          fill="none"
          stroke={index % 2 === 0 ? sw.cyan : sw.purple}
          strokeWidth="1.5"
          opacity={0.66 - index * 0.09}
        />
      ))}
      <circle cx="292" cy="37" r="11" fill={sw.green} opacity="0.22" />
      <text x="276" y="26" fill={sw.textDim} fontSize="10" fontWeight="700">min</text>

      <path d={d} fill="none" stroke={data.softColor} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" opacity="0.18" />
      <path d={d} fill="none" stroke={`url(#${data.variant}-path)`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      {data.path.map((point, index) => (
        <circle
          key={`${point.x}-${point.y}`}
          cx={point.x}
          cy={point.y}
          r={index === 0 ? 5 : 4}
          fill={index === 0 ? sw.text : data.color}
          opacity={index === 0 ? 0.95 : 0.82}
        />
      ))}
      <circle key={animationKey} r="7" fill={data.color} filter={`url(#${data.variant}-soft-glow)`}>
        <animateMotion dur={duration} repeatCount="indefinite" path={d} />
      </circle>
    </svg>
  );
}

function LossCurve({ data }: { data: OptimizerData }) {
  return (
    <svg
      viewBox={`0 0 ${CHART_W} ${LOSS_H}`}
      style={{ display: 'block', width: '100%', height: '100%' }}
      role="img"
      aria-label={`${data.title} loss curve`}
    >
      <rect width={CHART_W} height={LOSS_H} rx="8" fill="rgba(0,0,0,0.18)" />
      {[22, 46, 70].map(y => (
        <line key={y} x1="24" y1={y} x2="334" y2={y} stroke={sw.gridLineAlt} strokeWidth="1" />
      ))}
      <path d={curveD(data.loss)} fill="none" stroke={data.color} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <path d={`${curveD(data.loss)} L 334 ${LOSS_H - 14} L 26 ${LOSS_H - 14} Z`} fill={data.color} opacity="0.08" />
      <text x="26" y="86" fill={sw.textMuted} fontSize="10">{data.startLabel}</text>
      <text x="309" y="86" fill={sw.textMuted} fontSize="10">{data.endLabel}</text>
    </svg>
  );
}

function OptimizerPanel({ data, animationKey }: { data: OptimizerData; animationKey: number }) {
  return (
    <PanelCard
      minHeight={0}
      padding={14}
      gap={10}
      style={{
        display: 'grid',
        gridTemplateRows: '102px 116px 68px 58px 54px',
        gap: 8,
        overflow: 'hidden',
        borderRadius: 18,
        background:
          `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint}), radial-gradient(circle at 72% 18%, ${data.color}1f, rgba(10,12,19,0.94) 54%)`,
        borderColor: data.softColor,
        boxShadow: `${sw.insetHighlightStrong}, 0 18px 34px rgba(0,0,0,0.2), 0 0 22px ${data.color}14`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-bold" style={{ color: sw.text }}>{data.title}</h3>
          <p className="mt-1 text-xs leading-relaxed" style={{ color: sw.textDim }}>{data.subtitle}</p>
        </div>
        <div
          className="rounded-md px-2 py-1 text-xs font-bold"
          style={{ color: data.color, background: `${data.color}12`, border: `1px solid ${data.softColor}` }}
        >
          {data.badge}
        </div>
      </div>

      <div
        className="rounded-xl border p-2"
        style={{
          borderColor: sw.borderSubtle,
          background:
            `linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.01)), radial-gradient(circle at 70% 20%, ${data.color}18, transparent 38%)`,
        }}
      >
        <TrajectoryPlot data={data} animationKey={animationKey} />
      </div>

      <div className="grid grid-cols-3 gap-2">
        {data.metrics.map(metric => (
          <div
            key={metric.label}
            className="rounded-xl border px-2 py-1.5"
            style={{
              borderColor: `${data.color}22`,
              background: sw.tintStrong,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.03)`,
              minWidth: 0,
            }}
          >
            <div className="text-[10px] uppercase" style={{ color: sw.textMuted, letterSpacing: '.06em' }}>{metric.label}</div>
            <div className="mt-0.5 text-xs font-bold leading-snug" style={{ color: sw.text }}>{metric.value}</div>
          </div>
        ))}
      </div>

      <div
        className="rounded-xl border p-2"
        style={{
          borderColor: sw.borderSubtle,
          background: 'linear-gradient(180deg, rgba(9,8,18,0.72), rgba(9,8,18,0.42))',
        }}
      >
        <LossCurve data={data} />
      </div>

      <ul
        className="grid content-center gap-1 rounded-xl border px-3 py-2"
        style={{
          borderColor: `${data.color}20`,
          background: `${data.color}0d`,
          margin: 0,
        }}
      >
        {data.bullets.map(item => (
          <li key={item} className="flex gap-2 text-[11px] leading-snug" style={{ color: sw.textDim }}>
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: data.color, boxShadow: sw.dotGlow(data.color) }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </PanelCard>
  );
}

function ComparisonChartPanel({ copy }: { copy: OptimizerComparisonChartCopy }) {
  const [animationKey, setAnimationKey] = useState(0);
  const isPtBr = copy.eyebrow.toLocaleLowerCase('pt-BR').includes('comparação');

  useEffect(() => {
    const id = window.setInterval(() => setAnimationKey(key => key + 1), 5600);
    return () => window.clearInterval(id);
  }, []);

  const panels = useMemo<OptimizerData[]>(() => [
    {
      variant: 'sgd',
      title: 'SGD',
      subtitle: isPtBr ? 'Atualização direta: peso = peso - lr x gradiente' : 'Direct update: weight = weight - lr x gradient',
      color: sw.pink,
      softColor: 'rgba(255, 46, 151, 0.26)',
      path: sgdPath,
      loss: [1.0, 0.82, 0.69, 0.59, 0.51, 0.45, 0.4, 0.36],
      metrics: [
        { label: isPtBr ? 'passo' : 'step', value: isPtBr ? 'fixo por lr' : 'fixed by lr' },
        { label: isPtBr ? 'convergência' : 'convergence', value: isPtBr ? 'gradual' : 'gradual' },
        { label: isPtBr ? 'estado interno' : 'internal state', value: isPtBr ? 'nenhum' : 'none' },
      ],
      bullets: copy.sgdBullets,
      badge: isPtBr ? 'direto' : 'direct',
      startLabel: isPtBr ? 'início' : 'start',
      endLabel: isPtBr ? 'fim' : 'end',
    },
    {
      variant: 'adamw',
      title: 'AdamW',
      subtitle: isPtBr ? 'Adam adaptativo com decaimento de pesos desacoplado' : 'Adaptive Adam with decoupled weight decay',
      color: sw.cyan,
      softColor: 'rgba(0, 229, 255, 0.26)',
      path: adamwPath,
      loss: [1.0, 0.62, 0.39, 0.26, 0.18, 0.13, 0.1, 0.09],
      metrics: [
        { label: isPtBr ? 'passo' : 'step', value: isPtBr ? 'ajustado por parâmetro' : 'adjusted per parameter' },
        { label: isPtBr ? 'convergência' : 'convergence', value: isPtBr ? 'mais rápida' : 'faster' },
        { label: isPtBr ? 'estado interno' : 'internal state', value: isPtBr ? 'médias m e v' : 'm and v averages' },
      ],
      bullets: copy.adamwBullets,
      badge: isPtBr ? 'adaptativo' : 'adaptive',
      startLabel: isPtBr ? 'início' : 'start',
      endLabel: isPtBr ? 'fim' : 'end',
    },
  ], [copy, isPtBr]);

  return (
    <div className="h-full min-h-0 overflow-auto p-3">
      <TabbedPanelSurface minHeight={0}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
            padding: '10px 14px',
            borderRadius: 16,
            background: sw.tintStrong,
            border: `1px solid ${sw.borderMediumStrong}`,
          }}
        >
          <div>
            <p style={{ margin: 0, color: sw.pink, fontSize: 10, fontWeight: 900, letterSpacing: '.14em', textTransform: 'uppercase' }}>
              {copy.eyebrow}
            </p>
            <h2 style={{ margin: '3px 0 0', color: sw.text, fontSize: 22, fontWeight: 900, lineHeight: 1.1 }}>
              {copy.title}
            </h2>
            <p style={{ margin: '6px 0 0', maxWidth: 720, color: sw.textDim, fontSize: 13, lineHeight: 1.45 }}>
              {copy.description}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setAnimationKey(key => key + 1)}
            className="inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-xs font-bold"
            style={{
              color: '#091018',
              borderColor: 'transparent',
              background: 'linear-gradient(135deg, rgba(0,229,255,0.95), rgba(102,184,74,0.92))',
              boxShadow: '0 12px 30px rgba(0,229,255,0.12)',
            }}
          >
            <RotateCcw size={14} aria-hidden="true" />
            {copy.restartLabel}
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            gap: 12,
            minHeight: 0,
          }}
        >
          {panels.map(panel => (
            <OptimizerPanel key={panel.variant} data={panel} animationKey={animationKey} />
          ))}
        </div>

        <PanelCard
          minHeight={0}
          padding={14}
          gap={8}
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            borderRadius: 16,
            background:
              'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98)), radial-gradient(circle at top left, rgba(255,79,160,0.08), transparent 36%)',
          }}
        >
          <h3 className="shrink-0 text-sm font-bold" style={{ width: 124, color: sw.text }}>{copy.summaryTitle}</h3>
          <p className="text-xs leading-relaxed" style={{ color: sw.textDim }}>{copy.summaryText}</p>
        </PanelCard>
      </TabbedPanelSurface>
    </div>
  );
}

export const OptimizerComparisonChartVisual = React.memo(({ copy }: OptimizerComparisonChartVisualProps) => {
  return (
    <PytorchTabbedCodeLayout
      tabs={copy.tabs}
      codePanel={copy.codePanel}
      altPanel={<ComparisonChartPanel copy={copy} />}
    />
  );
});
