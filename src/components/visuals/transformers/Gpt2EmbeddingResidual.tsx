import React from 'react';
import type { Gpt2EmbeddingResidualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Gpt2EmbeddingResidualProps {
  copy: Gpt2EmbeddingResidualCopy;
}

export const Gpt2EmbeddingResidual = React.memo(({ copy }: Gpt2EmbeddingResidualProps) => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      padding: 22,
      borderRadius: 24,
      border: `1px solid ${sw.borderSubtle}`,
      boxShadow: sw.shadowDeep,
      background: 'linear-gradient(180deg, rgba(10,12,20,0.97), rgba(8,10,18,0.99))',
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gap: 16,
      fontFamily: sw.fontSans,
      overflow: 'hidden',
    }}>
      <div>
        <div style={{ fontSize: 11, fontWeight: 900, letterSpacing: '0.14em', textTransform: 'uppercase', color: sw.cyan }}>
          {copy.title}
        </div>
        <div style={{ marginTop: 5, fontSize: 15, fontWeight: 750, color: sw.text, lineHeight: 1.3 }}>
          {copy.subtitle}
        </div>
      </div>

      <div style={{ minHeight: 0, display: 'grid', gridTemplateColumns: '0.9fr 1fr 1fr 0.42fr 1fr', gap: 10, alignItems: 'stretch' }}>
        <Column title={copy.idxLabel} color={sw.cyan}>
          {copy.tokens.map((token, index) => (
            <TokenRow key={token} token={token} value={copy.tokenIds[index]} suffix={`pos ${copy.positions[index]}`} />
          ))}
        </Column>
        <Column title={copy.tokenEmbeddingLabel} color={sw.purple}>
          {copy.tokenVectors.map((values, index) => <VectorRow key={copy.tokens[index]} values={values} color={sw.purple} />)}
        </Column>
        <Column title={copy.positionEmbeddingLabel} color={sw.amber}>
          {copy.positionVectors.map((values, index) => <VectorRow key={copy.positions[index]} values={values} color={sw.amber} />)}
        </Column>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 24, alignItems: 'center', color: sw.textMuted, fontSize: 24, fontWeight: 900 }}>
          <div>+</div>
          <div>=</div>
        </div>
        <Column title={copy.outputLabel} color={sw.green}>
          {copy.outputVectors.map((values, index) => <VectorRow key={copy.tokens[index]} values={values} color={sw.green} strong />)}
        </Column>
      </div>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {copy.takeaways.map((takeaway, index) => (
          <span key={takeaway} style={{
            flex: 1,
            minWidth: 160,
            padding: '8px 10px',
            borderRadius: 999,
            background: 'rgba(255,255,255,0.045)',
            border: '1px solid rgba(255,255,255,0.08)',
            color: sw.textDim,
            fontSize: 11.5,
            fontWeight: 750,
          }}>
            <span style={{ color: [sw.purple, sw.amber, sw.green][index % 3] }}>●</span> {takeaway}
          </span>
        ))}
      </div>
    </div>
  );
});

function Column({ title, color, children }: { title: string; color: string; children: React.ReactNode }) {
  return (
    <div style={{ padding: 12, borderRadius: 18, background: 'rgba(255,255,255,0.03)', border: `1px solid ${color}33`, display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color }}>
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {children}
      </div>
    </div>
  );
}

function TokenRow({ token, value, suffix }: { token: string; value: number; suffix: string }) {
  return (
    <div style={{ padding: '8px 9px', borderRadius: 12, background: 'rgba(0,229,255,0.07)', border: '1px solid rgba(0,229,255,0.18)' }}>
      <div style={{ fontSize: 12, fontWeight: 900, color: sw.text }}>{token}</div>
      <div style={{ marginTop: 3, display: 'flex', justifyContent: 'space-between', gap: 8, color: sw.textMuted, fontFamily: sw.fontMono, fontSize: 10.5 }}>
        <span>{value}</span>
        <span>{suffix}</span>
      </div>
    </div>
  );
}

function VectorRow({ values, color, strong = false }: { values: number[]; color: string; strong?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${values.length}, 1fr)`, gap: 4, padding: 6, borderRadius: 12, background: strong ? `${color}12` : 'rgba(255,255,255,0.035)', border: `1px solid ${color}22` }}>
      {values.map((value, index) => (
        <div key={index} style={{ padding: '5px 0', borderRadius: 7, background: `${color}18`, color, textAlign: 'center', fontFamily: sw.fontMono, fontSize: 10.5, fontWeight: 850 }}>
          {value.toFixed(1)}
        </div>
      ))}
    </div>
  );
}
