import React, { useState, useMemo } from 'react';
import type { Int8OutlierDetectorCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Int8OutlierDetectorProps {
  copy: Int8OutlierDetectorCopy;
}

// Generate pseudo-random weights following normal distribution
function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function boxMuller(rng: () => number): number {
  const u1 = rng();
  const u2 = rng();
  return Math.sqrt(-2 * Math.log(u1 + 0.001)) * Math.cos(2 * Math.PI * u2);
}

export const Int8OutlierDetector = React.memo(({ copy }: Int8OutlierDetectorProps) => {
  const [threshold, setThreshold] = useState(4.0);

  // Generate 200 weights with a few outliers
  const weights = useMemo(() => {
    const rng = seededRandom(42);
    const vals: number[] = [];
    for (let i = 0; i < 180; i++) vals.push(boxMuller(rng));
    // Add outliers
    for (let i = 0; i < 20; i++) vals.push(boxMuller(rng) * 8 + (i % 2 === 0 ? 12 : -12));
    return vals;
  }, []);

  // Classify
  const normal = weights.filter(w => Math.abs(w) <= threshold);
  const outliers = weights.filter(w => Math.abs(w) > threshold);

  // Histogram
  const binCount = 24;
  const minVal = -20;
  const maxVal = 20;
  const binWidth = (maxVal - minVal) / binCount;

  const histBins = Array.from({ length: binCount }, () => ({ normal: 0, outlier: 0 }));
  for (const w of normal) {
    const idx = Math.floor((w - minVal) / binWidth);
    if (idx >= 0 && idx < binCount) histBins[idx].normal++;
  }
  for (const w of outliers) {
    const idx = Math.floor((w - minVal) / binWidth);
    if (idx >= 0 && idx < binCount) histBins[idx].outlier++;
  }

  const maxCount = Math.max(...histBins.map(b => b.normal + b.outlier), 1);

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
      gap: '24px',
      fontFamily: sw.fontSans,
      color: sw.text,
    }}>
      {/* Title + threshold slider */}
      <div style={{ fontWeight: '700', fontSize: '18px', color: sw.cyan, textAlign: 'center' }}>
        {copy.title}
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span style={{ fontWeight: '600', fontSize: '13px' }}>{copy.thresholdLabel} (σ)</span>
          <span style={{ fontWeight: '700', fontSize: '15px', color: sw.purple }}>±{threshold.toFixed(1)}σ</span>
        </div>
        <input
          type="range"
          min="1" max="8" step="0.5"
          value={threshold}
          onChange={(e) => setThreshold(Number(e.target.value))}
          style={{ width: '100%' }}
        />
      </div>

      {/* Histogram */}
      <div style={{ display: 'flex', alignItems: 'flex-end', height: '160px', gap: '2px', padding: '0 4px', borderBottom: `2px solid ${sw.borderSubtle}` }}>
        {histBins.map((bin, i) => {
          const val = (minVal + i * binWidth);
          const barH = ((bin.normal + bin.outlier) / maxCount) * 140;
          const isOutlierCol = Math.abs(val) > threshold;
          return (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: '100%',
                height: `${barH}px`,
                background: bin.outlier > 0
                  ? `linear-gradient(180deg, ${sw.pink}, ${sw.cyan})`
                  : `linear-gradient(180deg, ${sw.cyan}, ${sw.cyan}88)`,
                borderRadius: '3px 3px 0 0',
                transition: 'height 0.2s ease',
                opacity: isOutlierCol && bin.outlier === 0 ? 0.3 : 1,
              }} />
            </div>
          );
        })}
      </div>

      {/* Threshold lines on histogram */}
      <div style={{ position: 'relative', height: '0' }}>
        <div style={{ fontSize: '10px', color: sw.textDim, textAlign: 'center' }}>
          -20σ ← {copy.weightDistLabel} → +20σ
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        <div style={{
          padding: '14px',
          background: 'rgba(0, 229, 255, 0.06)',
          borderRadius: '10px',
          border: `1px solid ${sw.cyan}33`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: sw.cyan, marginBottom: '4px' }}>
            ✓ {copy.quantizeToInt8}
          </div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: sw.cyan }}>
            {normal.length}
          </div>
          <div style={{ fontSize: '10px', color: sw.textDim }}>{copy.int8Label}</div>
        </div>

        <div style={{
          padding: '14px',
          background: 'rgba(255, 46, 151, 0.06)',
          borderRadius: '10px',
          border: `1px solid ${sw.pink}33`,
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '11px', fontWeight: '600', color: sw.pink, marginBottom: '4px' }}>
            ⚠ {copy.keepInFp16}
          </div>
          <div style={{ fontSize: '22px', fontWeight: '800', color: sw.pink }}>
            {outliers.length}
          </div>
          <div style={{ fontSize: '10px', color: sw.textDim }}>{copy.fp16Label}</div>
        </div>
      </div>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', fontSize: '11px' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: sw.cyan, display: 'inline-block' }} />
          {copy.normalLabel} (|x| ≤ {threshold.toFixed(1)}σ)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '3px', background: sw.pink, display: 'inline-block' }} />
          {copy.outlierLabel} (|x| {'>'} {threshold.toFixed(1)}σ)
        </span>
      </div>
    </div>
  );
});
