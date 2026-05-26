import React, { useEffect, useMemo, useState } from 'react';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';
import type { OptimizerComparisonChartCopy } from '../../../types/slide/language-models';

interface OptimizerComparisonChartVisualProps {
  copy: OptimizerComparisonChartCopy;
}

type Point = { x: number; y: number };
type OptimizerVariant = 'sgd' | 'adamw';

function getSgdPath(): Point[] {
  return [
    { x: 24, y: 160 },
    { x: 58, y: 138 },
    { x: 90, y: 121 },
    { x: 122, y: 105 },
    { x: 151, y: 91 },
    { x: 179, y: 78 },
    { x: 205, y: 66 },
    { x: 229, y: 56 },
    { x: 251, y: 48 },
    { x: 272, y: 42 },
  ];
}

function getAdamWPath(): Point[] {
  return [
    { x: 24, y: 160 },
    { x: 64, y: 112 },
    { x: 102, y: 80 },
    { x: 142, y: 59 },
    { x: 181, y: 48 },
    { x: 219, y: 42 },
    { x: 252, y: 39 },
    { x: 272, y: 38 },
  ];
}

function GradientField({ variant }: { variant: OptimizerVariant }) {
  const points = variant === 'sgd' ? getSgdPath() : getAdamWPath();
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const accent = variant === 'adamw' ? '#00f5ff' : '#ff3df2';

  return (
    <div className="relative overflow-hidden rounded-2xl border border-fuchsia-400/40 bg-[#080218] p-4" style={{ boxShadow: '0 0 35px rgba(236,72,153,0.25)' }}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(0,245,255,0.22),transparent_30%),radial-gradient(circle_at_18%_15%,rgba(255,61,242,0.28),transparent_28%),linear-gradient(180deg,rgba(10,2,31,0.2),rgba(6,0,18,0.95))]" />
      <svg viewBox="0 0 300 190" className="relative h-56 w-full">
        <defs>
          <linearGradient id={`${variant}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#240046" /><stop offset="48%" stopColor="#10002b" /><stop offset="100%" stopColor="#030014" />
          </linearGradient>
          <linearGradient id={`${variant}-grid`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ff3df2" /><stop offset="50%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#00f5ff" />
          </linearGradient>
          <filter id={`${variant}-glow`} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <rect x="0" y="0" width="300" height="190" rx="18" fill={`url(#${variant}-sky)`} />
        <circle cx="246" cy="43" r="23" fill="#ff3df2" opacity="0.88" filter={`url(#${variant}-glow)`}>
          <animate attributeName="opacity" values="0.75;1;0.75" dur="2.2s" repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="scale" values="1;1.08;1" dur="2.2s" repeatCount="indefinite" additive="sum" />
        </circle>
        {[0,1,2,3,4].map(i => (
          <ellipse key={i} cx="245" cy="42" rx={42+i*24} ry={20+i*13} fill="none"
            stroke={i%2===0?'#00f5ff':'#ff3df2'} strokeWidth="1.2" opacity={0.72-i*0.09} filter={`url(#${variant}-glow)`}
          />
        ))}
        {[0,1,2,3,4,5].map(i => (
          <line key={`h-${i}`} x1="0" y1={106+i*14} x2="300" y2={106+i*14} stroke="#ff3df2" strokeWidth="0.8" opacity={0.65-i*0.07} />
        ))}
        {[-5,-3,-1,1,3,5].map(o => (
          <line key={`p-${o}`} x1="150" y1="98" x2={150+o*42} y2="190" stroke="#00f5ff" strokeWidth="0.8" opacity="0.45" />
        ))}
        <text x="211" y="31" className="fill-cyan-200 text-[10px] font-bold tracking-wider">MÍNIMO</text>
        <path d={pathD} fill="none" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.16" filter={`url(#${variant}-glow)`} />
        <path d={pathD} fill="none" stroke={`url(#${variant}-grid)`} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" opacity="0.75" filter={`url(#${variant}-glow)`} />
        {points.map((p, i) => (
          <circle key={`d-${i}`} cx={p.x} cy={p.y} r="4.5" fill={i%2===0?'#00f5ff':'#ff3df2'} filter={`url(#${variant}-glow)`} />
        ))}
        <circle r="8" fill="#ffffff" stroke={accent} strokeWidth="3" filter={`url(#${variant}-glow)`}>
          <animate attributeName="cx" values={points.map(p=>p.x).join(';')} dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="cy" values={points.map(p=>p.y).join(';')} dur="3.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
}

function BarAnimation({ variant }: { variant: OptimizerVariant }) {
  const isAdamW = variant === 'adamw';
  const bars = isAdamW ? [62, 42, 31, 24, 19, 16, 14] : [62, 55, 49, 44, 39, 35, 32];
  return (
    <div className="rounded-2xl border border-cyan-300/30 bg-[#080218] p-4" style={{ boxShadow: '0 0 35px rgba(34,211,238,0.18)' }}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-cyan-100">Loss ao longo dos passos</span>
        <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-500/10 px-3 py-1 text-xs text-fuchsia-100">
          {isAdamW ? 'passos adaptativos' : 'passos diretos'}
        </span>
      </div>
      <div className="relative flex h-36 items-end gap-3 overflow-hidden rounded-xl bg-[linear-gradient(180deg,rgba(36,0,70,0.25),rgba(3,0,20,0.95))] p-3">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,61,242,0.1)_1px,transparent_1px)] bg-[size:100%_24px,28px_100%]" />
        {bars.map((h, i) => (
          <div
            key={`b-${i}`}
            className="relative z-10 flex-1 rounded-t-xl bg-gradient-to-t from-fuchsia-500 via-violet-500 to-cyan-300"
            style={{
              boxShadow: '0 0 18px rgba(0,245,255,0.55)',
              animation: `bar-grow-${i} 0.75s ease-in-out ${i * 0.18}s infinite`,
            }}
          >
            <style>{`
              @keyframes bar-grow-${i} {
                0%, 100% { height: 10px; opacity: 0.45; }
                50% { height: ${h}px; opacity: 1; }
              }
            `}</style>
          </div>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs text-cyan-200/70">
        <span>início</span>
        <span>treino</span>
        <span>fim</span>
      </div>
    </div>
  );
}

function OptimizerCard({ title, subtitle, variant, bullets }: {
  title: string; subtitle: string; variant: OptimizerVariant; bullets: string[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border-fuchsia-400/30 bg-[#0a021f]/90 p-5 space-y-5" style={{ boxShadow: '0 0 45px rgba(168,85,247,0.2)' }}>
      <div>
        <div className="text-2xl font-black tracking-tight text-transparent bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-200 bg-clip-text">
          {title}
        </div>
        <p className="mt-1 text-sm" style={{ color: 'rgba(236, 254, 255, 0.75)' }}>{subtitle}</p>
      </div>
      <GradientField variant={variant} />
      <BarAnimation variant={variant} />
      <div className="space-y-2 rounded-2xl border border-fuchsia-300/20 p-4" style={{ background: 'rgba(255,61,242,0.1)' }}>
        {bullets.map(item => (
          <div key={item} className="flex gap-2 text-sm" style={{ color: 'rgba(236, 254, 255, 0.85)' }}>
            <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-300" style={{ boxShadow: '0 0 12px rgba(0,245,255,0.8)' }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonChartPanel({ copy }: { copy: OptimizerComparisonChartCopy }) {
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setAnimationKey(k => k + 1), 5200);
    return () => window.clearInterval(id);
  }, []);

  const cards = useMemo(() => [
    {
      title: 'SGD',
      subtitle: 'Atualização direta: peso = peso − lr × gradiente',
      variant: 'sgd' as OptimizerVariant,
      bullets: copy.sgdBullets,
    },
    {
      title: 'AdamW',
      subtitle: 'Adam adaptativo com weight decay desacoplado',
      variant: 'adamw' as OptimizerVariant,
      bullets: copy.adamwBullets,
    },
  ], [copy]);

  return (
    <div className="p-4 space-y-4 overflow-auto" style={{ minHeight: 0 }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(236, 72, 153, 0.8)' }}>
            {copy.eyebrow}
          </p>
          <h2 className="text-xl font-black tracking-tight text-transparent bg-gradient-to-r from-fuchsia-300 via-violet-200 to-cyan-200 bg-clip-text">
            {copy.title}
          </h2>
          <p className="mt-1 text-sm" style={{ color: 'rgba(236, 254, 255, 0.75)' }}>
            {copy.description}
          </p>
        </div>
        <button
          onClick={() => setAnimationKey(k => k + 1)}
          className="rounded-xl border border-cyan-300/40 px-4 py-2 text-xs font-semibold text-cyan-50 cursor-pointer"
          style={{ background: 'rgba(0, 229, 255, 0.15)', boxShadow: '0 0 22px rgba(0,245,255,0.28)' }}
        >
          {copy.restartLabel}
        </button>
      </div>
      <div key={animationKey} className="grid gap-4 md:grid-cols-2">
        {cards.map(card => <OptimizerCard key={card.title} {...card} />)}
      </div>
      <div className="rounded-2xl border border-cyan-300/25 p-4" style={{ background: 'rgba(10, 2, 31, 0.8)', boxShadow: '0 0 45px rgba(0,245,255,0.12)' }}>
        <h3 className="text-base font-black text-transparent bg-gradient-to-r from-fuchsia-200 to-cyan-200 bg-clip-text">
          {copy.summaryTitle}
        </h3>
        <p className="mt-2 text-sm" style={{ color: 'rgba(236, 254, 255, 0.8)' }}>
          {copy.summaryText}
        </p>
      </div>
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
