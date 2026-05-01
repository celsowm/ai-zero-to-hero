import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface BrowserInferenceComparisonCopy {
  title: string;
  subtitle: string;
  serverLabel: string;
  browserLabel: string;
  categoryLabel: string;
  clickHint: string;
  privacyLabel: string;
  costLabel: string;
  latencyLabel: string;
  offlineLabel: string;
  scaleLabel: string;
  modelSizeLabel: string;
  complexityLabel: string;
  compatibilityLabel: string;
  details: Record<string, { server: string; browser: string }>;
}

interface Props {
  copy: BrowserInferenceComparisonCopy;
}

type RowDef = { key: string; labelKey: string; server: string; browser: string; highlight?: boolean };

const ROWS: RowDef[] = [
  { key: 'privacy', labelKey: 'privacyLabel', server: 'Dados vão ao servidor', browser: '100% local, zero envio', highlight: true },
  { key: 'cost', labelKey: 'costLabel', server: 'GPU server + API calls', browser: 'Zero infra', highlight: true },
  { key: 'latency', labelKey: 'latencyLabel', server: 'Network round-trip (50-500ms)', browser: 'Local (< 50ms)', highlight: true },
  { key: 'offline', labelKey: 'offlineLabel', server: 'Requer internet', browser: 'Funciona offline após load', highlight: true },
  { key: 'scale', labelKey: 'scaleLabel', server: 'Auto: multi-GPU cluster', browser: 'Limitado ao device' },
  { key: 'modelSize', labelKey: 'modelSizeLabel', server: 'Sem limite (70B+)', browser: '~7B máximo (Q4_0)' },
  { key: 'complexity', labelKey: 'complexityLabel', server: 'Deploy + monitor + infra', browser: 'HTML + JS + modelo' },
  { key: 'compatibility', labelKey: 'compatibilityLabel', server: 'Qualquer client', browser: 'Chrome/Edge com WebGPU' },
];

const HIGHLIGHT_KEYS = new Set(['privacy', 'cost', 'latency', 'offline']);

export const BrowserInferenceComparison = React.memo(({ copy }: Props) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const details = copy.details;

  return (
    <TabbedPanelSurface minHeight={0}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, minHeight: 0, flex: 1 }}>

        {/* Header */}
        <PanelCard padding={14} style={{ background: sw.tintStrong }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontSize: 10, color: '#06b6d4', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase' }}>
              {copy.clickHint}
            </span>
            <span style={{ fontSize: 9, color: 'var(--sw-text-dim)' }}>
              {copy.subtitle}
            </span>
          </div>
        </PanelCard>

        {/* Table header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 2 }}>
          <div style={{ padding: '8px 10px', background: sw.tintStronger, borderRadius: '6px 0 0 0', fontSize: 9, color: 'var(--sw-text-dim)', fontWeight: 900, textTransform: 'uppercase' }}>
            {copy.categoryLabel}
          </div>
          <div style={{ padding: '8px 10px', background: '#ff5da220', borderRadius: '0 6px 0 0', fontSize: 9, color: '#ff5da2', fontWeight: 900, textAlign: 'center' }}>
            {copy.serverLabel}
          </div>
          <div style={{ padding: '8px 10px', background: '#06b6d420', borderRadius: '0 0 6px 0', fontSize: 9, color: '#06b6d4', fontWeight: 900, textAlign: 'center' }}>
            {copy.browserLabel}
          </div>
        </div>

        {/* Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1, overflow: 'auto' }}>
          {ROWS.map((row) => {
            const isSelected = selectedRow === row.key;
            const isHighlight = HIGHLIGHT_KEYS.has(row.key);

            return (
              <React.Fragment key={row.key}>
                <button
                  onClick={() => setSelectedRow(isSelected ? null : row.key)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1.4fr 1fr 1fr',
                    gap: 2,
                    background: isSelected ? 'rgba(255,255,255,0.06)' : isHighlight ? 'rgba(6,182,212,0.04)' : 'transparent',
                    border: isSelected ? `1px solid rgba(255,255,255,0.15)` : '1px solid transparent',
                    borderRadius: 6,
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ padding: '6px 10px', fontSize: 10, color: isHighlight ? '#06b6d4' : 'var(--sw-text)', fontWeight: isHighlight ? 800 : 600, textAlign: 'left' }}>
                    {copy[row.labelKey as keyof typeof copy] as string}
                    {isHighlight && ' ⚡'}
                  </div>
                  <Cell value={row.server} color="#ff5da2" />
                  <Cell value={row.browser} color="#06b6d4" />
                </button>

                {isSelected && details[row.key] && (
                  <PanelCard
                    padding={12}
                    style={{ background: 'linear-gradient(180deg, rgba(20,18,31,0.96), rgba(13,13,22,0.98))', border: `1px solid ${sw.borderSubtle}` }}
                  >
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <DetailBlock label={copy.serverLabel} value={details[row.key].server} color="#ff5da2" />
                      <DetailBlock label={copy.browserLabel} value={details[row.key].browser} color="#06b6d4" />
                    </div>
                  </PanelCard>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Summary */}
        <PanelCard padding={12} style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.22)' }}>
          <div style={{ fontSize: 10, color: '#06b6d4', fontWeight: 900, letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 6 }}>
            ⚡ Quando Escolher Browser Inference
          </div>
          <div style={{ fontSize: 11, color: 'var(--sw-text-dim)', lineHeight: 1.6 }}>
            <strong>Privacidade é prioridade</strong> — dados médicos, financeiros ou pessoais nunca saem do device.
            <br />
            <strong>Custo zero de infra</strong> — sem GPU server, sem API calls. O device do usuário é o servidor.
            <br />
            <strong>Demos e POCs</strong> — compartilhar um modelo em uma URL, sem deploy.
          </div>
        </PanelCard>
      </div>
    </TabbedPanelSurface>
  );
});

const Cell: React.FC<{ value: string; color: string }> = ({ value, color }) => (
  <div style={{ padding: '6px 8px', fontSize: 10, color, fontWeight: 700, textAlign: 'center' }}>{value}</div>
);

const DetailBlock: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div style={{ padding: '8px 10px', borderRadius: 6, background: `${color}10`, border: `1px solid ${color}25` }}>
    <div style={{ fontSize: 9, color, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 10.5, color: 'var(--sw-text-dim)', lineHeight: 1.55 }}>{value}</div>
  </div>
);
