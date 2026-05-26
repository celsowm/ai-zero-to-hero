import React, { useMemo, useState } from 'react';
import type { Gpt2LayerXrayCopy, Gpt2LayerXrayLayer } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { CodeBlock } from '../../CodeBlock';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface Gpt2LayerXrayProps {
  copy: Gpt2LayerXrayCopy;
}

const cardStyle: React.CSSProperties = {
  border: `1px solid ${sw.borderSubtle}`,
  borderRadius: 12,
  background: 'rgba(255,255,255,0.045)',
  minWidth: 0,
};

function TokenRow({
  label,
  tokens,
  targetLabel,
  positionLabel,
  accent,
}: {
  label: string;
  tokens: string[];
  targetLabel: string;
  positionLabel: string;
  accent: string;
}) {
  return (
    <div style={{ ...cardStyle, padding: 10 }}>
      <div style={{ color: accent, fontWeight: 900, fontSize: 12, marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
        {tokens.map((token, index) => {
          const isTarget = index === 2;
          return (
            <div key={`${label}-${token}-${index}`} style={{ minWidth: 0 }}>
              <div style={{
                padding: '8px 6px',
                minHeight: 36,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 10,
                border: `1px solid ${isTarget ? accent : 'rgba(255,255,255,0.16)'}`,
                background: isTarget ? `${accent}22` : 'rgba(0,0,0,0.18)',
                color: isTarget ? sw.text : sw.textMuted,
                fontFamily: sw.fontMono,
                fontWeight: 900,
                fontSize: 12,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {token}
              </div>
              <div style={{
                marginTop: 4,
                color: isTarget ? accent : sw.textDim,
                fontSize: 10,
                fontWeight: 800,
                textAlign: 'center',
              }}>
                {isTarget ? `${targetLabel} · ${positionLabel} ${index}` : `${positionLabel} ${index}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SimilarityMeter({ layer, title }: { layer: Gpt2LayerXrayLayer; title: string }) {
  const pct = Math.round(layer.similarity * 100);
  const color = layer.similarity > 0.86 ? sw.cyan : layer.similarity > 0.68 ? sw.green : sw.yellow;

  return (
    <div style={{ ...cardStyle, padding: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, alignItems: 'baseline' }}>
        <div style={{ color: sw.text, fontSize: 13, fontWeight: 900 }}>{title}</div>
        <div style={{ color, fontFamily: sw.fontMono, fontSize: 22, fontWeight: 950 }}>{layer.similarity.toFixed(2)}</div>
      </div>
      <div style={{ marginTop: 8, height: 12, borderRadius: 99, overflow: 'hidden', background: 'rgba(255,255,255,0.08)' }}>
        <div style={{ width: `${pct}%`, height: '100%', borderRadius: 99, background: color, boxShadow: `0 0 18px ${color}66` }} />
      </div>
      <div style={{ marginTop: 8, color: sw.textDim, lineHeight: 1.45, fontSize: 12.5 }}>{layer.note}</div>
    </div>
  );
}

function AttentionBars({
  title,
  tokens,
  weights,
  accent,
}: {
  title: string;
  tokens: string[];
  weights: [number, number, number];
  accent: string;
}) {
  return (
    <div style={{ ...cardStyle, padding: 12 }}>
      <div style={{ color: accent, fontSize: 12, fontWeight: 900, marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'grid', gap: 7 }}>
        {tokens.map((token, index) => (
          <div key={`${title}-${token}-${index}`} style={{ display: 'grid', gridTemplateColumns: '72px 1fr 42px', gap: 8, alignItems: 'center' }}>
            <div style={{ color: sw.textMuted, fontFamily: sw.fontMono, fontSize: 11, fontWeight: 850, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {token}
            </div>
            <div style={{ height: 10, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ width: `${weights[index] * 100}%`, height: '100%', borderRadius: 99, background: accent }} />
            </div>
            <div style={{ color: sw.text, fontFamily: sw.fontMono, fontSize: 11, fontWeight: 900, textAlign: 'right' }}>
              {weights[index].toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopTokenPanel({
  title,
  tokens,
  accent,
}: {
  title: string;
  tokens: Gpt2LayerXrayLayer['topTokensA'];
  accent: string;
}) {
  return (
    <div style={{ ...cardStyle, padding: 12 }}>
      <div style={{ color: accent, fontSize: 12, fontWeight: 900, marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'grid', gap: 7 }}>
        {tokens.map((item) => (
          <div key={`${title}-${item.token}`} style={{ display: 'grid', gridTemplateColumns: '68px 1fr 44px', gap: 8, alignItems: 'center' }}>
            <div style={{ color: sw.text, fontFamily: sw.fontMono, fontSize: 11, fontWeight: 900, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {item.token}
            </div>
            <div style={{ height: 9, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ width: `${item.probability * 100}%`, height: '100%', borderRadius: 99, background: accent }} />
            </div>
            <div style={{ color: sw.textMuted, fontFamily: sw.fontMono, fontSize: 10.5, fontWeight: 850, textAlign: 'right' }}>
              {item.probability.toFixed(2)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pipeline({ parts }: { parts: string[] }) {
  return (
    <div style={{ display: 'flex', gap: 5, alignItems: 'center', flexWrap: 'wrap' }}>
      {parts.map((part, index) => (
        <React.Fragment key={part}>
          <span style={{
            minHeight: 24,
            padding: '4px 8px',
            borderRadius: 999,
            border: `1px solid ${sw.cyan}55`,
            background: 'rgba(0,229,255,0.075)',
            color: sw.text,
            fontFamily: /[()[\]:]/.test(part) ? sw.fontMono : sw.fontSans,
            fontSize: 11,
            fontWeight: 850,
          }}>
            {part}
          </span>
          {index < parts.length - 1 && <span style={{ color: sw.cyan, fontWeight: 950 }}>→</span>}
        </React.Fragment>
      ))}
    </div>
  );
}

function VisualPanel({ copy }: { copy: Gpt2LayerXrayCopy['visualPanel'] }) {
  const [layerIndex, setLayerIndex] = useState(0);
  const layer = copy.layers[layerIndex] ?? copy.layers[0];
  const layerOptions = useMemo(() => copy.layers.map(({ label }) => ({ label })), [copy.layers]);

  return (
    <div style={{ height: '100%', minHeight: 0, display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 12, color: sw.text }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 12, alignItems: 'start' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: sw.cyan, fontSize: 11, fontWeight: 900, letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            {copy.title}
          </div>
          <div style={{ marginTop: 4, color: sw.textDim, fontSize: 13, lineHeight: 1.45 }}>{copy.description}</div>
        </div>
        <div style={{ ...cardStyle, padding: '9px 12px', minWidth: 154 }}>
          <div style={{ color: sw.textDim, fontSize: 10.5, fontWeight: 850 }}>{copy.shapeTitle}</div>
          <div style={{ color: sw.green, fontFamily: sw.fontMono, fontSize: 18, fontWeight: 950 }}>(1, 3, 768)</div>
          <div style={{ color: sw.textDim, fontSize: 10.5, lineHeight: 1.3 }}>{copy.shapeCaption}</div>
        </div>
      </div>

      <div style={{ ...cardStyle, padding: 10 }}>
        <div style={{ color: sw.textMuted, fontSize: 11, fontWeight: 900, marginBottom: 8 }}>{copy.layerControlLabel}</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(13, minmax(42px, 1fr))', gap: 5 }}>
          {layerOptions.map((item, index) => {
            const active = index === layerIndex;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => setLayerIndex(index)}
                aria-pressed={active}
                style={{
                  minHeight: 34,
                  minWidth: 0,
                  borderRadius: 9,
                  border: `1px solid ${active ? sw.cyan : 'rgba(255,255,255,0.10)'}`,
                  background: active ? 'linear-gradient(135deg, rgba(0,229,255,0.92), rgba(102,184,74,0.86))' : 'rgba(255,255,255,0.035)',
                  color: active ? '#081018' : sw.textMuted,
                  fontSize: 10.5,
                  fontWeight: 950,
                  cursor: 'pointer',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ minHeight: 0, overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr 0.95fr', gap: 12 }}>
        <div style={{ minWidth: 0, display: 'grid', gap: 12, alignContent: 'start' }}>
          <div style={{ ...cardStyle, padding: 12 }}>
            <div style={{ color: sw.text, fontSize: 13, fontWeight: 900, marginBottom: 10 }}>{copy.tokenTitle}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              <TokenRow label={copy.phraseALabel} tokens={copy.tokensA} targetLabel={copy.targetLabel} positionLabel={copy.positionLabel} accent={sw.cyan} />
              <TokenRow label={copy.phraseBLabel} tokens={copy.tokensB} targetLabel={copy.targetLabel} positionLabel={copy.positionLabel} accent={sw.yellow} />
            </div>
          </div>

          <SimilarityMeter layer={layer} title={copy.similarityTitle} />

          <div style={{ ...cardStyle, padding: 12 }}>
            <div style={{ color: sw.pink, fontWeight: 950, fontSize: 18, lineHeight: 1.1 }}>{layer.phase}</div>
            <div style={{ marginTop: 10 }}>
              <Pipeline parts={copy.pipeline} />
            </div>
          </div>
        </div>

        <div style={{ minWidth: 0, display: 'grid', gap: 12, alignContent: 'start' }}>
          <div style={{ ...cardStyle, padding: 12 }}>
            <div style={{ color: sw.text, fontSize: 13, fontWeight: 900, marginBottom: 10 }}>{copy.attentionTitle}</div>
            <div style={{ display: 'grid', gap: 10 }}>
              <AttentionBars title={copy.phraseALabel} tokens={copy.tokensA} weights={layer.attentionA} accent={sw.cyan} />
              <AttentionBars title={copy.phraseBLabel} tokens={copy.tokensB} weights={layer.attentionB} accent={sw.yellow} />
            </div>
          </div>

          <div style={{ ...cardStyle, padding: 12 }}>
            <div style={{ color: sw.text, fontSize: 13, fontWeight: 900, marginBottom: 10 }}>{copy.logitsTitle}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <TopTokenPanel title={copy.phraseALabel} tokens={layer.topTokensA} accent={sw.cyan} />
              <TopTokenPanel title={copy.phraseBLabel} tokens={layer.topTokensB} accent={sw.yellow} />
            </div>
          </div>

          <div style={{ ...cardStyle, padding: 12, color: sw.textDim, fontSize: 12.5, lineHeight: 1.45 }}>
            {copy.measuredNote}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Gpt2LayerXray = React.memo(({ copy }: Gpt2LayerXrayProps) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: 0,
      padding: 16,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      background: sw.shellBackground,
      boxShadow: sw.shellShadow,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      fontFamily: sw.fontSans,
    }}>
      <TabsBar items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} ariaLabel={copy.visualPanel.ariaLabel} />
      <TabbedPanelSurface>
        {activeTab === 0 ? (
          <div style={{ height: '100%', minHeight: 0, display: 'flex', flexDirection: 'column', gap: 10, padding: 12 }}>
            <div>
              <div style={{ color: sw.text, fontSize: 15, fontWeight: 900 }}>{copy.codePanel.title}</div>
              <div style={{ marginTop: 3, color: sw.textDim, fontSize: 12.5, lineHeight: 1.45 }}>{copy.codePanel.description}</div>
            </div>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <CodeBlock
                sourceRef={copy.codePanel.source}
                language={copy.codePanel.source.language}
                explanations={copy.codePanel.codeExplanations}
                compact
              />
            </div>
          </div>
        ) : (
          <div style={{ height: '100%', minHeight: 0, padding: 12 }}>
            <VisualPanel copy={copy.visualPanel} />
          </div>
        )}
      </TabbedPanelSurface>
    </div>
  );
});
