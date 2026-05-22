import React from 'react';
import type { Gpt2BlackboxDiagramCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Gpt2BlackboxDiagramProps {
  copy: Gpt2BlackboxDiagramCopy;
}

export const Gpt2BlackboxDiagram = React.memo(({ copy }: Gpt2BlackboxDiagramProps) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      padding: 24,
      borderRadius: 24,
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      background: 'radial-gradient(circle at 18% 18%, rgba(0,229,255,0.1), transparent 30%), radial-gradient(circle at 82% 16%, rgba(255,46,151,0.1), transparent 30%), linear-gradient(180deg, rgba(11,13,24,0.98), rgba(6,8,14,0.99))',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gap: 18,
      fontFamily: sw.fontSans,
    }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: sw.cyan }}>
          {copy.title}
        </div>
        <div style={{ marginTop: 6, display: 'inline-flex', gap: 8, alignItems: 'center', padding: '7px 12px', borderRadius: 999, background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.22)' }}>
          <span style={{ fontSize: 10, fontWeight: 900, color: sw.textMuted, textTransform: 'uppercase' }}>{copy.objectiveLabel}</span>
          <span style={{ fontSize: 13, fontWeight: 850, color: sw.text }}>{copy.objective}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1.2fr auto 1fr', gap: 12, alignItems: 'center', minHeight: 0 }}>
        <ContractCard label={copy.inputLabel} shape={copy.inputShape} color={sw.cyan} lines={['We', ' the', ' people']} />
        <Arrow />
        <ContractCard label={copy.modelLabel} shape={copy.modelShape} color={sw.purple} lines={copy.configRows.map((row) => `${row.label}: ${row.value}`)} strong />
        <Arrow />
        <ContractCard label={copy.outputLabel} shape={copy.outputShape} color={sw.pink} lines={copy.topK.map((row) => `${row.token} · ${row.probability}`)} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <InfoPanel title={copy.configTitle} items={copy.configRows.map((row) => `${row.label} = ${row.value}`)} color={sw.purple} />
        <InfoPanel title={copy.topKTitle} items={copy.topK.map((row) => `${row.token}: ${row.probability}`)} color={sw.pink} />
      </div>
    </div>
  );
});

function ContractCard({ label, shape, color, lines, strong = false }: { label: string; shape: string; color: string; lines: string[]; strong?: boolean }) {
  return (
    <div style={{
      minHeight: 210,
      padding: 16,
      borderRadius: 20,
      background: strong ? `linear-gradient(135deg, ${color}24, rgba(255,255,255,0.04))` : 'rgba(255,255,255,0.035)',
      border: `1px solid ${color}55`,
      boxShadow: strong ? `0 0 28px ${color}24` : 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: 12,
    }}>
      <div>
        <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase', color }}>
          {label}
        </div>
        <div style={{ marginTop: 8, fontSize: strong ? 19 : 16, fontWeight: 950, color: sw.text }}>
          {shape}
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {lines.map((line) => (
          <div key={line} style={{
            padding: '6px 8px',
            borderRadius: 10,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.06)',
            fontSize: 12,
            fontWeight: 750,
            color: sw.textDim,
            fontFamily: sw.fontMono,
          }}>
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function Arrow() {
  return <div style={{ fontSize: 28, fontWeight: 900, color: sw.textMuted }}>→</div>;
}

function InfoPanel({ title, items, color }: { title: string; items: string[]; color: string }) {
  return (
    <div style={{ padding: '12px 14px', borderRadius: 16, background: 'rgba(255,255,255,0.035)', border: `1px solid ${color}33` }}>
      <div style={{ marginBottom: 8, fontSize: 10, fontWeight: 900, letterSpacing: '0.11em', textTransform: 'uppercase', color }}>
        {title}
      </div>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {items.map((item) => (
          <span key={item} style={{ padding: '5px 9px', borderRadius: 999, background: `${color}12`, color: sw.textDim, fontSize: 11.5, fontWeight: 750 }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
