import React, { useState } from 'react';
import type { RealDatasetsPromptsCopy } from '../../../types/slide/prompt-engineering';
import { sw } from '../../../theme/tokens';

interface RealDatasetsPromptsProps {
  copy: RealDatasetsPromptsCopy;
}

interface Dataset {
  key: string;
  nameKey: string;
  count: string;
  humanOrSynthetic: 'human' | 'synthetic';
  color: string;
  categories: string[];
}

const datasets: Dataset[] = [
  {
    key: 'alpaca',
    nameKey: 'alpacaLabel',
    count: '52K',
    humanOrSynthetic: 'synthetic',
    color: 'cyan',
    categories: ['instruction', 'input', 'output'],
  },
  {
    key: 'dolly',
    nameKey: 'dollyLabel',
    count: '15K',
    humanOrSynthetic: 'human',
    color: 'green',
    categories: ['brainstorm', 'QA', 'sumário', 'classificação'],
  },
  {
    key: 'openorca',
    nameKey: 'openorcaLabel',
    count: '4.2M',
    humanOrSynthetic: 'synthetic',
    color: 'purple',
    categories: ['CoT', 'instruction', 'response'],
  },
];

export const RealDatasetsPromptsVisual = React.memo(({ copy }: RealDatasetsPromptsProps) => {
  const [selectedDataset, setSelectedDataset] = useState<string | null>(null);

  return (
    <div style={{
      width: '100%',
      padding: '32px',
      background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.96), rgba(11, 11, 18, 0.98))',
      borderRadius: '24px',
      border: '1px solid rgba(255, 255, 255, 0.07)',
      boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowDeeper}`,
      fontFamily: sw.fontSans,
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    }}>
      <h3 style={{
        margin: 0,
        fontSize: sw.fsBody,
        fontWeight: 600,
        color: sw.text,
        textAlign: 'center',
      }}>
        {copy.title}
      </h3>

      {/* Dataset cards */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        {datasets.map((ds) => {
          const isSelected = selectedDataset === ds.key;
          const color = sw[ds.color as keyof typeof sw] as string;
          return (
            <div
              key={ds.key}
              onClick={() => setSelectedDataset(isSelected ? null : ds.key)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                border: `1px solid ${isSelected ? `${color}66` : sw.borderSubtle}`,
                background: isSelected ? `${color}10` : 'transparent',
                cursor: 'pointer',
                transition: sw.transitionFast,
                textAlign: 'center',
                flex: 1,
                maxWidth: '120px',
              }}
            >
              <div style={{ fontSize: '20px', fontWeight: 700, color: color, marginBottom: '4px' }}>
                {ds.count}
              </div>
              <div style={{ fontSize: sw.fsSmall, color: sw.textDim, fontWeight: isSelected ? 600 : 400 }}>
                {(copy as unknown as Record<string, string>)[ds.nameKey]}
              </div>
              <div style={{
                marginTop: '6px',
                fontSize: '10px',
                padding: '2px 8px',
                borderRadius: '4px',
                background: ds.humanOrSynthetic === 'human' ? `${sw.green}18` : `${sw.purple}18`,
                color: ds.humanOrSynthetic === 'human' ? sw.green : sw.purple,
                display: 'inline-block',
              }}>
                {ds.humanOrSynthetic === 'human' ? copy.humanLabel : copy.syntheticLabel}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected dataset details */}
      {selectedDataset && (
        <div style={{
          padding: '16px',
          borderRadius: '10px',
          border: `1px solid ${sw.borderSubtle}`,
          background: sw.surfaceLight,
        }}>
          <div style={{ fontSize: sw.fsSmall, color: sw.textMuted, marginBottom: '8px', fontWeight: 600 }}>
            {copy.categoriesLabel}:
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {datasets.find(d => d.key === selectedDataset)?.categories.map((cat, i) => (
              <span
                key={i}
                style={{
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: `${sw.cyan}12`,
                  color: sw.cyan,
                  border: `1px solid ${sw.cyan}22`,
                }}
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Structure preview */}
          <div style={{
            marginTop: '12px',
            padding: '12px',
            borderRadius: '8px',
            background: sw.surface,
            fontFamily: sw.fontMono,
            fontSize: '10px',
            color: sw.textDim,
            lineHeight: 1.6,
          }}>
            {copy.structureLabel}:<br />
            <span style={{ color: sw.cyan }}>{`{"instruction": "..."}`}</span><br />
            <span style={{ color: sw.purple }}>{`{"input": "..."}`}</span><br />
            <span style={{ color: sw.green }}>{`{"output": "..."}`}</span>
          </div>
        </div>
      )}
    </div>
  );
});
