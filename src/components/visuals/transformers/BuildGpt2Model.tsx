import React, { useState } from 'react';
import { sw } from '../../../theme/tokens';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';
import type { BuildGpt2ModelCopy } from '../../../types/slide';

interface BuildGpt2ModelProps {
  copy: BuildGpt2ModelCopy;
}

const Gpt2ArchitectureDiagram = React.memo(({ copy }: { copy: BuildGpt2ModelCopy['diagramPanel'] }) => {
  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const blocks = 12;

  return (
    <div style={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 0',
      fontFamily: "'Inter', sans-serif",
    }}>
      <div style={{
        padding: '10px 20px',
        background: 'rgba(0,229,255,0.1)',
        border: `1px solid ${sw.cyan}44`,
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 700,
        color: sw.cyan,
        textAlign: 'center',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.5s ease-out 0.1s',
      }}>
        {copy.inputLabel}
      </div>

      <div style={{
        padding: '10px 20px',
        background: 'rgba(168,85,247,0.1)',
        border: `1px solid rgba(168,85,247,0.3)`,
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 600,
        color: '#a855f7',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(-10px)',
        transition: 'all 0.5s ease-out 0.2s',
      }}>
        {copy.embedLabel} (wte + wpe)
      </div>

      <div style={{ color: sw.textMuted, fontSize: '16px' }}>↓</div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        width: '100%',
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.5s ease-out 0.3s',
      }}>
        <div style={{
          flex: 1,
          height: '3px',
          background: `linear-gradient(90deg, ${sw.green}, ${sw.green}22)`,
          borderRadius: '2px',
        }} />
        <span style={{
          fontSize: '10px',
          fontWeight: 700,
          color: sw.green,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}>
          {copy.residualLabel}
        </span>
        <div style={{
          flex: 1,
          height: '3px',
          background: `linear-gradient(270deg, ${sw.green}, ${sw.green}22)`,
          borderRadius: '2px',
        }} />
      </div>

      <div style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.5s ease-out 0.4s',
      }}>
        <div style={{
          padding: '12px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '10px',
          border: `1px solid ${sw.borderSubtle}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
        }}>
          <div style={{
            textAlign: 'center',
            fontSize: '11px',
            fontWeight: 700,
            color: sw.yellow,
            textTransform: 'uppercase',
            marginBottom: '4px',
          }}>
            {copy.blockLabel}
          </div>

          <div style={{
            padding: '8px 12px',
            background: 'rgba(0,229,255,0.08)',
            border: `1px solid ${sw.cyan}22`,
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            color: sw.cyan,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: sw.cyan }}>⊗</span>
            {copy.attentionLabel}
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 700,
            color: sw.green,
          }}>
            +
          </div>

          <div style={{
            padding: '6px 12px',
            background: 'rgba(251,191,36,0.08)',
            border: `1px solid rgba(251,191,36,0.2)`,
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#fbbf24',
            textAlign: 'center',
          }}>
            {copy.normLabel}
          </div>

          <div style={{
            padding: '8px 12px',
            background: 'rgba(168,85,247,0.08)',
            border: `1px solid rgba(168,85,247,0.2)`,
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#a855f7',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <span style={{ color: '#a855f7' }}>⊙</span>
            {copy.mlpLabel}
          </div>

          <div style={{
            textAlign: 'center',
            fontSize: '14px',
            fontWeight: 700,
            color: sw.green,
          }}>
            +
          </div>

          <div style={{
            padding: '6px 12px',
            background: 'rgba(251,191,36,0.08)',
            border: `1px solid rgba(251,191,36,0.2)`,
            borderRadius: '6px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#fbbf24',
            textAlign: 'center',
          }}>
            {copy.normLabel}
          </div>
        </div>

        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          fontWeight: 700,
          color: sw.textMuted,
          padding: '4px',
        }}>
          {copy.blocksLabel.replace('N', String(blocks))}
        </div>
      </div>

      <div style={{ color: sw.textMuted, fontSize: '16px' }}>↓</div>

      <div style={{
        padding: '10px 20px',
        background: 'rgba(255,46,151,0.1)',
        border: `1px solid rgba(255,46,151,0.3)`,
        borderRadius: '8px',
        fontSize: '12px',
        fontWeight: 700,
        color: '#ff2e97',
        textAlign: 'center',
        opacity: mounted ? 1 : 0,
        transform: mounted ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all 0.5s ease-out 0.6s',
      }}>
        {copy.outputLabel} (lm_head)
      </div>
    </div>
  );
});

export const BuildGpt2Model = React.memo(({ copy }: BuildGpt2ModelProps) => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      background: sw.shellBackground,
      borderRadius: sw.shellBorderRadius,
      border: sw.shellBorder,
      boxShadow: sw.shellShadow,
      padding: '16px',
    }}>
      <TabsBar
        items={copy.tabs}
        activeIndex={tabIndex}
        onChange={setTabIndex}
        ariaLabel="Build GPT-2 tabs"
      />

      {tabIndex === 0 ? (
        <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
          <CodeBlock
            sourceRef={copy.codePanel.source}
            language="python"
          />
        </div>
      ) : (
        <Gpt2ArchitectureDiagram copy={copy.diagramPanel} />
      )}
    </div>
  );
});
