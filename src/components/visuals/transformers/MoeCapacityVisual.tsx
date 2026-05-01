import React, { useMemo, useState } from 'react';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface MoeCapacityVisualCopy {
  title: string;
  subtitle: string;
  batchSizeLabel: string;
  seqLenLabel: string;
  capacityFactorLabel: string;
  numExpertsLabel: string;
  tokenLabel: string;
  expertLabel: string;
  capacityLabel: string;
  droppedLabel: string;
  processedLabel: string;
  overflowLabel: string;
  totalTokensLabel: string;
  droppedCountLabel: string;
  efficiencyLabel: string;
  warningTitle: string;
  warningLowCapacity: string;
  warningHighCapacity: string;
  warningOptimal: string;
}

interface Props {
  copy: MoeCapacityVisualCopy;
}

const EXPERT_COLORS = ['#06b6d4', '#0891b2', '#8b5cf6', '#7c3aed', '#f59e0b', '#d97706', '#10b981', '#059669'];

// Deterministic routing simulation
function simulateRouting(batchSize: number, seqLen: number, numExperts: number, capacityFactor: number): {
  expertLoads: number[];
  expertCapacities: number[];
  totalDropped: number;
  totalProcessed: number;
} {
  const totalTokens = batchSize * seqLen;
  const capacityPerExpert = Math.floor(capacityFactor * (totalTokens / numExperts));

  // Simulate realistic routing: some experts get more traffic
  // Use a skewed distribution to make it interesting
  const baseLoad = totalTokens / numExperts;
  const expertLoads = Array(numExperts).fill(0).map((_, i) => {
    // Create skew: first few experts get more tokens
    const skew = 1.0 + 0.3 * Math.sin(i * 1.5 + 0.7);
    return Math.floor(baseLoad * skew);
  });

  // Normalize to total
  const sumLoads = expertLoads.reduce((a, b) => a + b, 0);
  const normalized = expertLoads.map((load) => Math.round((load / sumLoads) * totalTokens));

  // Adjust to match total
  const diff = totalTokens - normalized.reduce((a, b) => a + b, 0);
  normalized[0] += diff;

  const expertCapacities = Array(numExperts).fill(capacityPerExpert);
  let totalDropped = 0;
  let totalProcessed = 0;

  for (let i = 0; i < numExperts; i++) {
    if (normalized[i] > expertCapacities[i]) {
      totalDropped += normalized[i] - expertCapacities[i];
      totalProcessed += expertCapacities[i];
    } else {
      totalProcessed += normalized[i];
    }
  }

  return {
    expertLoads: normalized,
    expertCapacities,
    totalDropped,
    totalProcessed,
  };
}

function fmt(v: number): string {
  return v.toFixed(1);
}

export const MoeCapacityVisual = React.memo(({ copy }: Props) => {
  const [batchSize, setBatchSize] = useState(4);
  const [seqLen, setSeqLen] = useState(16);
  const [capacityFactor, setCapacityFactor] = useState(1.25);
  const [numExperts, setNumExperts] = useState(8);

  const result = useMemo(
    () => simulateRouting(batchSize, seqLen, numExperts, capacityFactor),
    [batchSize, seqLen, numExperts, capacityFactor]
  );

  const totalTokens = batchSize * seqLen;
  const dropRate = totalTokens > 0 ? (result.totalDropped / totalTokens) * 100 : 0;
  const efficiency = totalTokens > 0 ? ((totalTokens - result.totalDropped) / totalTokens) * 100 : 100;

  const warningType = dropRate > 8 ? 'low' : dropRate > 3 ? 'medium' : dropRate === 0 && capacityFactor > 1.5 ? 'high' : 'optimal';
  const warningText = {
    low: copy.warningLowCapacity,
    medium: copy.warningLowCapacity,
    high: copy.warningHighCapacity,
    optimal: copy.warningOptimal,
  }[warningType];

  const warningColor = {
    low: '#ff5da2',
    medium: '#f59e0b',
    high: '#16e0ff',
    optimal: '#66b84a',
  }[warningType];

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* ── Controls ─────────────────────────────────────────────── */}
        <PanelCard padding={14} gap={14} style={{ background: sw.tintStrong }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {/* Batch Size */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  {copy.batchSizeLabel}
                </span>
                <span style={{ fontSize: 13, color: '#16e0ff', fontFamily: 'monospace', fontWeight: 900 }}>
                  {batchSize}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="16"
                step="1"
                value={batchSize}
                onChange={(e) => setBatchSize(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#16e0ff' }}
              />
            </div>

            {/* Seq Length */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: '#a855f7', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  {copy.seqLenLabel}
                </span>
                <span style={{ fontSize: 13, color: '#a855f7', fontFamily: 'monospace', fontWeight: 900 }}>
                  {seqLen}
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="64"
                step="4"
                value={seqLen}
                onChange={(e) => setSeqLen(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#a855f7' }}
              />
            </div>

            {/* Capacity Factor */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: '#f59e0b', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  {copy.capacityFactorLabel}
                </span>
                <span style={{ fontSize: 13, color: '#f59e0b', fontFamily: 'monospace', fontWeight: 900 }}>
                  {fmt(capacityFactor)}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="3.0"
                step="0.05"
                value={capacityFactor}
                onChange={(e) => setCapacityFactor(parseFloat(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b' }}
              />
            </div>

            {/* Num Experts */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: '#10b981', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
                  {copy.numExpertsLabel}
                </span>
                <span style={{ fontSize: 13, color: '#10b981', fontFamily: 'monospace', fontWeight: 900 }}>
                  {numExperts}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="16"
                step="2"
                value={numExperts}
                onChange={(e) => setNumExperts(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981' }}
              />
            </div>
          </div>
        </PanelCard>

        {/* ── Stats Bar ────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          <PanelCard padding={12} style={{ textAlign: 'center', background: sw.tintStrong }}>
            <div style={{ fontSize: 9, color: 'var(--sw-text-dim)', textTransform: 'uppercase' }}>
              {copy.totalTokensLabel}
            </div>
            <div style={{ fontSize: 22, color: '#16e0ff', fontFamily: 'monospace', fontWeight: 900 }}>
              {totalTokens}
            </div>
          </PanelCard>
          <PanelCard padding={12} style={{ textAlign: 'center', background: sw.tintStrong }}>
            <div style={{ fontSize: 9, color: 'var(--sw-text-dim)', textTransform: 'uppercase' }}>
              {copy.droppedCountLabel}
            </div>
            <div style={{ fontSize: 22, color: dropRate > 5 ? '#ff5da2' : '#66b84a', fontFamily: 'monospace', fontWeight: 900 }}>
              {result.totalDropped}
            </div>
            <div style={{ fontSize: 10, color: dropRate > 5 ? '#ff5da2' : '#66b84a', fontFamily: 'monospace' }}>
              ({fmt(dropRate)}%)
            </div>
          </PanelCard>
          <PanelCard padding={12} style={{ textAlign: 'center', background: sw.tintStrong }}>
            <div style={{ fontSize: 9, color: 'var(--sw-text-dim)', textTransform: 'uppercase' }}>
              {copy.efficiencyLabel}
            </div>
            <div style={{ fontSize: 22, color: efficiency > 95 ? '#66b84a' : '#f59e0b', fontFamily: 'monospace', fontWeight: 900 }}>
              {fmt(efficiency)}%
            </div>
          </PanelCard>
        </div>

        {/* ── Expert Capacity Bars ─────────────────────────────────── */}
        <PanelCard
          padding={14}
          style={{
            background: `linear-gradient(180deg, ${sw.tintStronger}, ${sw.tint})`,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 10, color: '#16e0ff', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.expertLabel} Loads vs Capacity
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {result.expertLoads.map((load, i) => {
              const cap = result.expertCapacities[i];
              const overflow = load > cap;
              const loadPct = Math.min((load / Math.max(...result.expertLoads)) * 100, 100);
              const capPct = (cap / Math.max(...result.expertLoads)) * 100;

              return (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ width: 28, fontSize: 10, color: EXPERT_COLORS[i], fontWeight: 800, fontFamily: 'monospace' }}>
                    E{i}
                  </span>
                  <div style={{ flex: 1, position: 'relative', height: 20 }}>
                    {/* Capacity line */}
                    <div
                      style={{
                        position: 'absolute',
                        left: `${capPct}%`,
                        top: 0,
                        bottom: 0,
                        width: 2,
                        background: 'rgba(255,255,255,0.5)',
                      }}
                    />
                    {/* Load bar */}
                    <div
                      style={{
                        width: `${loadPct}%`,
                        height: '100%',
                        background: overflow
                          ? `linear-gradient(90deg, ${EXPERT_COLORS[i]}88, #ff5da2)`
                          : `linear-gradient(90deg, ${EXPERT_COLORS[i]}, ${EXPERT_COLORS[i]}66)`,
                        borderRadius: 4,
                        transition: 'width 0.4s ease',
                      }}
                    />
                  </div>
                  <span style={{ width: 60, fontSize: 9, fontFamily: 'monospace', textAlign: 'right', color: overflow ? '#ff5da2' : sw.textMuted }}>
                    {load}/{cap}
                    {overflow ? ' ⚠' : ''}
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ fontSize: 9, color: 'var(--sw-text-dim)', marginTop: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ display: 'inline-block', width: 12, height: 2, background: 'rgba(255,255,255,0.5)' }} />
            Linha branca = capacity
          </div>
        </PanelCard>

        {/* ── Warning ──────────────────────────────────────────────── */}
        <PanelCard
          padding={12}
          style={{
            background: `${warningColor}12`,
            border: `1px solid ${warningColor}30`,
          }}
        >
          <div style={{ fontSize: 10, color: warningColor, fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
            ⚡ {copy.warningTitle}
          </div>
          <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', lineHeight: 1.55 }}>
            {warningText}
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
});
