import React, { useState } from 'react';
import type { QuantizationSetupCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import { CodeBlock } from '../../CodeBlock';

interface Props {
  copy: QuantizationSetupCopy;
}

const FORMAT_COLORS: Record<string, string> = {
  FP32: sw.pink,
  FP16: sw.cyan,
  INT8: sw.cyan,
  NF4: sw.cyan,
};

const VisualPanel: React.FC<{ copy: QuantizationSetupCopy }> = ({ copy }) => {
  const maxVram = Math.max(...copy.formats.map((f) => f.vram7b));

  return (
    <div style={{ fontFamily: sw.fontSans, color: sw.text }}>
      <div
        style={{
          fontSize: sw.fsEyebrow,
          fontWeight: 700,
          letterSpacing: sw.lsEyebrow,
          textTransform: 'uppercase',
          color: sw.cyan,
          marginBottom: 4,
        }}
      >
        {copy.subtitle}
      </div>
      <h4 style={{ fontSize: 15, fontWeight: 700, color: sw.text, margin: '0 0 14px' }}>
        {copy.title}
      </h4>

      {/* Format table */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {copy.formats.map((fmt) => {
          const color = FORMAT_COLORS[fmt.name] ?? sw.cyan;
          const pct = (fmt.vram7b / maxVram) * 100;
          return (
            <div key={fmt.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <span style={{ fontWeight: 700, fontSize: 12, fontFamily: sw.fontMono, color }}>
                  {fmt.name}
                </span>
                <span style={{ fontSize: 11, color: sw.textDim }}>
                  {fmt.vram7b} {copy.gbUnit} — {fmt.bytes} {copy.bytesLabel}
                </span>
              </div>
              <div
                style={{
                  height: 22,
                  borderRadius: 5,
                  background: sw.tintStronger,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    left: 0, top: 0, height: '100%',
                    width: `${pct}%`,
                    borderRadius: 5,
                    background: `${color}40`,
                    border: `1px solid ${color}60`,
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    left: 8, top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 10,
                    color: sw.textDim,
                  }}
                >
                  {fmt.note}
                </div>
              </div>
              {/* Requires badges */}
              <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                {fmt.requires.map((req) => (
                  <span
                    key={req}
                    style={{
                      fontSize: 9,
                      padding: '2px 6px',
                      borderRadius: 4,
                      background: sw.tintStronger,
                      border: `1px solid ${sw.borderSubtle}`,
                      color: sw.textMuted,
                      fontFamily: sw.fontMono,
                    }}
                  >
                    {req}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Install checklist */}
      <div style={{ borderTop: `1px solid ${sw.borderSubtle}`, paddingTop: 12 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: sw.text, marginBottom: 10 }}>
          {copy.checklistTitle}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {copy.checks.map((check) => (
            <div
              key={check.label}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 10px',
                borderRadius: 7,
                background: `${sw.cyan}10`,
                border: `1px solid ${sw.cyan}30`,
              }}
            >
              <div
                style={{
                  width: 16, height: 16,
                  borderRadius: 999,
                  background: `${sw.cyan}30`,
                  border: `1px solid ${sw.cyan}80`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 9,
                  color: sw.cyan,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
              >
                ✓
              </div>
              <div>
                <div style={{ fontSize: 11, fontFamily: sw.fontMono, color: sw.text }}>{check.label}</div>
                <div style={{ fontSize: 10, color: sw.textDim }}>{check.ok}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const QuantizationSetupVisual = React.memo(({ copy }: Props) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <PanelCard minHeight={0} padding={20} gap={12}>
      <TabsBar
        items={copy.tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
        ariaLabel="Quantization setup tabs"
      />
      <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
        {activeTab === 0 ? (
          <VisualPanel copy={copy} />
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: sw.text, marginBottom: 4 }}>
              {copy.codePanel.title}
            </div>
            <div style={{ fontSize: 12, color: sw.textDim, marginBottom: 10, lineHeight: 1.5 }}>
              {copy.codePanel.description}
            </div>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <CodeBlock
                sourceRef={copy.codePanel.source}
                language="python"
                explanations={copy.codePanel.codeExplanations}
              />
            </div>
          </div>
        )}
      </div>
    </PanelCard>
  );
});
