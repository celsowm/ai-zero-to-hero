import React, { useMemo, useState } from 'react';
import type {
  Gpt2AttentionQkvXrayCopy,
  Gpt2AttentionQkvXrayPhrase,
  Gpt2AttentionQkvXrayStep,
} from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { CodeBlock } from '../../CodeBlock';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface Gpt2AttentionQkvXrayProps {
  copy: Gpt2AttentionQkvXrayCopy;
}

const panelStyle: React.CSSProperties = {
  border: `1px solid ${sw.borderSubtle}`,
  borderRadius: 12,
  background: 'rgba(255,255,255,0.04)',
  minWidth: 0,
};

function NumberPill({ label, value, accent }: { label: string; value: string; accent: string }) {
  return (
    <div style={{ ...panelStyle, padding: '9px 10px' }}>
      <div style={{ color: sw.textDim, fontSize: 10.5, fontWeight: 850 }}>{label}</div>
      <div style={{ marginTop: 2, color: accent, fontFamily: sw.fontMono, fontSize: 16, fontWeight: 950 }}>{value}</div>
    </div>
  );
}

function TokenStrip({
  phrase,
  targetLabel,
  positionLabel,
}: {
  phrase: Gpt2AttentionQkvXrayPhrase;
  targetLabel: string;
  positionLabel: string;
}) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ color: sw.cyan, fontWeight: 950, fontSize: 12 }}>{phrase.label}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8 }}>
        {phrase.tokens.map((token, index) => {
          const active = index === phrase.targetIndex;
          return (
            <div key={`${phrase.label}-${token}-${index}`} style={{ minWidth: 0 }}>
              <div style={{
                minHeight: 34,
                display: 'grid',
                placeItems: 'center',
                padding: '7px 6px',
                borderRadius: 9,
                border: `1px solid ${active ? sw.cyan : 'rgba(255,255,255,0.13)'}`,
                background: active ? 'rgba(0,229,255,0.13)' : 'rgba(0,0,0,0.16)',
                color: active ? sw.text : sw.textMuted,
                fontFamily: sw.fontMono,
                fontSize: 12,
                fontWeight: 900,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {token}
              </div>
              <div style={{ marginTop: 4, color: active ? sw.cyan : sw.textDim, textAlign: 'center', fontSize: 10, fontWeight: 850 }}>
                {active ? `${targetLabel} · ${positionLabel} ${index}` : `${positionLabel} ${index}`}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function VectorPreview({ title, values, accent }: { title: string; values: number[]; accent: string }) {
  return (
    <div style={{ ...panelStyle, padding: 11 }}>
      <div style={{ color: accent, fontSize: 12, fontWeight: 950, marginBottom: 8 }}>{title}</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {values.map((value, index) => (
          <span
            key={`${title}-${index}`}
            style={{
              padding: '5px 7px',
              borderRadius: 8,
              background: 'rgba(0,0,0,0.22)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: sw.text,
              fontFamily: sw.fontMono,
              fontSize: 11,
              fontWeight: 850,
            }}
          >
            {value >= 0 ? '+' : ''}{value.toFixed(3)}
          </span>
        ))}
        <span style={{ color: sw.textDim, fontFamily: sw.fontMono, fontSize: 12, alignSelf: 'center' }}>...</span>
      </div>
    </div>
  );
}

function AttentionTable({ phrase, copy }: { phrase: Gpt2AttentionQkvXrayPhrase; copy: Gpt2AttentionQkvXrayCopy['visualPanel'] }) {
  return (
    <div style={{ ...panelStyle, padding: 11 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 76px 76px 76px', gap: 8, color: sw.textDim, fontSize: 10.5, fontWeight: 900, marginBottom: 8 }}>
        <div>j</div>
        <div>token</div>
        <div>{copy.scoreTitle}</div>
        <div>{copy.weightTitle}</div>
        <div>{copy.valueTitle}</div>
      </div>
      <div style={{ display: 'grid', gap: 7 }}>
        {phrase.rows.map((row, index) => (
          <div key={`${phrase.label}-${row.token}-${index}`} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 76px 76px 76px', gap: 8, alignItems: 'center' }}>
            <div style={{ color: sw.textDim, fontFamily: sw.fontMono, fontSize: 11, fontWeight: 850 }}>{index}</div>
            <div style={{ color: sw.text, fontFamily: sw.fontMono, fontSize: 11, fontWeight: 900, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{row.token}</div>
            <div style={{ color: sw.yellow, fontFamily: sw.fontMono, fontSize: 11, fontWeight: 900 }}>{row.score.toFixed(2)}</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 34px', gap: 6, alignItems: 'center' }}>
              <div style={{ height: 9, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
                <div style={{ width: `${row.weight * 100}%`, height: '100%', borderRadius: 99, background: sw.cyan }} />
              </div>
              <div style={{ color: sw.text, fontFamily: sw.fontMono, fontSize: 10.5, fontWeight: 900, textAlign: 'right' }}>{row.weight.toFixed(2)}</div>
            </div>
            <div style={{ color: sw.green, fontFamily: sw.fontMono, fontSize: 11, fontWeight: 900 }}>{row.valueNorm.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CosineTable({ copy }: { copy: Gpt2AttentionQkvXrayCopy['visualPanel'] }) {
  return (
    <div style={{ ...panelStyle, padding: 11 }}>
      <div style={{ color: sw.text, fontSize: 13, fontWeight: 950, marginBottom: 8 }}>{copy.cosineTitle}</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 64px 64px 64px', gap: 8, color: sw.textDim, fontSize: 10.5, fontWeight: 900, marginBottom: 7 }}>
        <div>block</div>
        <div>cos(Q)</div>
        <div>cos(K)</div>
        <div>cos(V)</div>
      </div>
      <div style={{ display: 'grid', gap: 6 }}>
        {copy.cosines.map((row) => (
          <div key={row.block} style={{ display: 'grid', gridTemplateColumns: '1fr 64px 64px 64px', gap: 8, alignItems: 'center' }}>
            <div style={{ color: sw.textMuted, fontFamily: sw.fontMono, fontSize: 11, fontWeight: 850 }}>{row.block}</div>
            {[row.q, row.k, row.v].map((value, index) => (
              <div key={`${row.block}-${index}`} style={{ color: value > 0.9 ? sw.green : value > 0.75 ? sw.yellow : sw.orange, fontFamily: sw.fontMono, fontSize: 11, fontWeight: 950 }}>
                {value.toFixed(2)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function StepFocus({
  step,
  phrase,
  copy,
}: {
  step: Gpt2AttentionQkvXrayStep;
  phrase: Gpt2AttentionQkvXrayPhrase;
  copy: Gpt2AttentionQkvXrayCopy['visualPanel'];
}) {
  if (step.focus === 'check') {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <NumberPill label={copy.checkTitle} value={phrase.hfDiff} accent={sw.green} />
        <NumberPill label={copy.blockHeadLabel} value="block 00 / head 00" accent={sw.cyan} />
      </div>
    );
  }

  if (step.focus === 'cosine') {
    return <CosineTable copy={copy} />;
  }

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <AttentionTable phrase={phrase} copy={copy} />
      {step.focus === 'qkv' && <VectorPreview title={copy.qkvTitle} values={phrase.qPreview} accent={sw.pink} />}
      {step.focus === 'weighted' && <VectorPreview title={copy.outputTitle} values={phrase.contextPreview} accent={sw.green} />}
      {step.focus === 'mask' && (
        <div style={{ ...panelStyle, padding: 11, color: sw.textDim, fontSize: 12.5, lineHeight: 1.45 }}>
          {copy.maskTitle}: j &lt;= i. i = {phrase.targetIndex}; j = 0, 1, 2.
        </div>
      )}
    </div>
  );
}

function VisualPanel({ copy }: { copy: Gpt2AttentionQkvXrayCopy['visualPanel'] }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const step = copy.steps[stepIndex] ?? copy.steps[0];
  const phrase = copy.phrases[phraseIndex] ?? copy.phrases[0];
  const stepTabs = useMemo(() => copy.steps.map(({ label }) => ({ label })), [copy.steps]);
  const phraseTabs = useMemo(() => copy.phrases.map(({ label }) => ({ label })), [copy.phrases]);

  return (
    <div style={{ height: '100%', minHeight: 0, display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 12, color: sw.text }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 250px', gap: 12, alignItems: 'start' }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ color: sw.cyan, fontSize: 11, fontWeight: 950, letterSpacing: sw.lsSmall, textTransform: 'uppercase' }}>{copy.title}</div>
          <div style={{ marginTop: 4, color: sw.textDim, fontSize: 13, lineHeight: 1.45 }}>{copy.description}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <NumberPill label={copy.shapeTitle} value="Q/K/V: (1,12,3,64)" accent={sw.yellow} />
          <NumberPill label={copy.blockHeadLabel} value="b0 / h0" accent={sw.cyan} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 10 }}>
        <div>
          <div style={{ color: sw.textMuted, fontSize: 11, fontWeight: 900, marginBottom: 7 }}>{copy.phraseControlLabel}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 7 }}>
            {phraseTabs.map((item, index) => {
              const active = phraseIndex === index;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setPhraseIndex(index)}
                  aria-pressed={active}
                  style={{
                    minHeight: 34,
                    borderRadius: 9,
                    border: `1px solid ${active ? sw.cyan : 'rgba(255,255,255,0.10)'}`,
                    background: active ? 'rgba(0,229,255,0.16)' : 'rgba(255,255,255,0.035)',
                    color: active ? sw.text : sw.textMuted,
                    fontFamily: sw.fontMono,
                    fontSize: 12,
                    fontWeight: 900,
                    cursor: 'pointer',
                  }}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div style={{ color: sw.textMuted, fontSize: 11, fontWeight: 900, marginBottom: 7 }}>{copy.stepControlLabel}</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 6 }}>
            {stepTabs.map((item, index) => {
              const active = stepIndex === index;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setStepIndex(index)}
                  aria-pressed={active}
                  style={{
                    minHeight: 34,
                    minWidth: 0,
                    borderRadius: 9,
                    border: `1px solid ${active ? sw.pink : 'rgba(255,255,255,0.10)'}`,
                    background: active ? 'linear-gradient(135deg, rgba(255,46,151,0.9), rgba(0,229,255,0.72))' : 'rgba(255,255,255,0.035)',
                    color: active ? '#090b12' : sw.textMuted,
                    fontSize: 11,
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
      </div>

      <div style={{ minHeight: 0, overflow: 'auto', display: 'grid', gridTemplateColumns: '0.78fr 1fr', gap: 12 }}>
        <div style={{ display: 'grid', gap: 10, alignContent: 'start', minWidth: 0 }}>
          <div style={{ ...panelStyle, padding: 12 }}>
            <TokenStrip phrase={phrase} targetLabel={copy.targetLabel} positionLabel={copy.positionLabel} />
          </div>
          <div style={{ ...panelStyle, padding: 12 }}>
            <div style={{ color: sw.pink, fontSize: 18, fontWeight: 950, lineHeight: 1.12 }}>{step.title}</div>
            <div style={{ marginTop: 8, color: sw.textDim, fontSize: 13, lineHeight: 1.45 }}>{step.body}</div>
            <div style={{
              marginTop: 10,
              padding: 10,
              borderRadius: 10,
              background: 'rgba(0,0,0,0.20)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: sw.text,
              fontFamily: sw.fontMono,
              fontSize: 12,
              fontWeight: 850,
              lineHeight: 1.45,
            }}>
              {step.formula}
            </div>
          </div>
          <div style={{ ...panelStyle, padding: 12, color: sw.textDim, fontSize: 12.5, lineHeight: 1.45 }}>
            {copy.measuredNote}
          </div>
        </div>
        <div style={{ minWidth: 0, display: 'grid', gap: 10, alignContent: 'start' }}>
          <StepFocus step={step} phrase={phrase} copy={copy} />
        </div>
      </div>
    </div>
  );
}

export const Gpt2AttentionQkvXray = React.memo(({ copy }: Gpt2AttentionQkvXrayProps) => {
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
