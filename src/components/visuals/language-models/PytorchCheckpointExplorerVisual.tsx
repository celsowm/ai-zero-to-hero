import React, { useState } from 'react';
import type { PytorchCheckpointExplorerCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface PytorchCheckpointExplorerVisualProps {
  copy: PytorchCheckpointExplorerCopy;
}

const SECTION_COLORS = [sw.cyan, sw.purple, sw.green, sw.pink];

export const PytorchCheckpointExplorerVisual = React.memo(({ copy }: PytorchCheckpointExplorerVisualProps) => {
  const [activeSection, setActiveSection] = useState(0);
  const [activeTimeline, setActiveTimeline] = useState(1);
  const { sections, timelineSteps } = copy.explorerPanel;
  const section = sections[activeSection] ?? sections[0];
  const tlStep = timelineSteps[activeTimeline] ?? timelineSteps[0];
  const sectionAccent = SECTION_COLORS[activeSection % SECTION_COLORS.length];

  return (
    <PytorchTabbedCodeLayout
      tabs={copy.tabs}
      codePanel={copy.codePanel}
      altPanel={(
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.explorerPanel.title}</div>
            {copy.explorerPanel.subtitle && (
              <div style={{ marginTop: 2, fontSize: 12, lineHeight: 1.5, color: sw.textDim }}>{copy.explorerPanel.subtitle}</div>
            )}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '8px 0' }}>
            <div style={{
              padding: '6px 14px',
              borderRadius: 10,
              border: `2px solid ${sw.pink}`,
              background: `${sw.pink}18`,
              fontFamily: sw.fontMono,
              fontSize: 14,
              fontWeight: 800,
              color: sw.pink,
            }}>
              {copy.explorerPanel.fileLabel}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${sections.length}, minmax(0, 1fr))`, gap: 8 }}>
            {sections.map((item, index) => {
              const accent = SECTION_COLORS[index % SECTION_COLORS.length];
              const isActive = index === activeSection;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveSection(index)}
                  style={{
                    border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                    borderRadius: 14,
                    background: isActive ? `${accent}20` : sw.surface,
                    padding: '10px 12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: isActive ? accent : sw.textDim,
                    fontSize: 12,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    lineHeight: 1.25,
                    boxShadow: isActive ? `0 8px 20px ${accent}14` : 'none',
                  }}
                >
                  {index + 1}. {item.label}
                </button>
              );
            })}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: 10, alignItems: 'stretch' }}>
            <div
              style={{
                border: `1px solid ${sectionAccent}33`,
                borderRadius: 16,
                background: `linear-gradient(180deg, ${sectionAccent}10, rgba(255,255,255,0.01))`,
                padding: 14,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, color: sectionAccent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Active section
              </div>
              <div style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: sw.text }}>{section.label}</div>

              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Content</div>
                <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.text, fontFamily: sw.fontMono }}>{section.content}</div>
              </div>

              <div style={{ marginTop: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 800, color: sw.cyan, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{copy.explorerPanel.whyLabel}</div>
                <div style={{ marginTop: 4, fontSize: 12, lineHeight: 1.6, color: sw.textDim }}>{section.whyItMatters}</div>
              </div>
            </div>

            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.pink, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {copy.explorerPanel.missingLabel}
              </div>
              <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.text }}>
                {section.breaksWithout}
              </div>

              <div style={{ marginTop: 'auto' }}>
                  <div style={{ fontSize: 10, fontWeight: 800, color: sw.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {copy.explorerPanel.allSectionsLabel}
                  </div>
                {sections.map((s, idx) => {
                  const accent = SECTION_COLORS[idx % SECTION_COLORS.length];
                  const isActive = idx === activeSection;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => setActiveSection(idx)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        padding: '5px 0',
                        cursor: 'pointer',
                        textAlign: 'left',
                        opacity: isActive ? 1 : 0.55,
                      }}
                    >
                      <div style={{
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        background: isActive ? accent : sw.surfaceLight,
                        border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                        flexShrink: 0,
                      }} />
                      <span style={{ fontSize: 12, color: isActive ? sw.text : sw.textDim, fontWeight: isActive ? 700 : 400 }}>
                        {s.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: sw.purple, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
              {copy.explorerPanel.timelineLabel}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${timelineSteps.length}, minmax(0, 1fr))`, gap: 6 }}>
              {timelineSteps.map((tl, index) => {
                const isActive = index === activeTimeline;
                const accent = SECTION_COLORS[index % SECTION_COLORS.length];
                return (
                  <React.Fragment key={tl.label}>
                    {index > 0 && (
                      <div style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        gridColumn: 'span 0',
                      }} />
                    )}
                    <button
                      type="button"
                      onClick={() => setActiveTimeline(index)}
                      style={{
                        border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                        borderRadius: 12,
                        background: isActive ? `${accent}18` : sw.surface,
                        padding: '8px 10px',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: isActive ? accent : sw.textMuted,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                      }}>
                        {index + 1}
                      </div>
                      <div style={{
                        marginTop: 3,
                        fontSize: 12,
                        fontWeight: 700,
                        color: isActive ? sw.text : sw.textDim,
                        lineHeight: 1.3,
                      }}>
                        {tl.label}
                      </div>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
            <div style={{
              marginTop: 8,
              padding: '10px 14px',
              borderRadius: 12,
              border: `1px solid ${sw.borderSubtle}`,
              background: sw.surface,
              fontSize: 12,
              lineHeight: 1.6,
              color: sw.text,
            }}>
              <strong style={{ color: SECTION_COLORS[activeTimeline % SECTION_COLORS.length] }}>{tlStep.label}:</strong> {tlStep.description}
            </div>
          </div>

          {copy.explorerPanel.footer && (
            <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.explorerPanel.footer}</div>
          )}
        </div>
      )}
    />
  );
});
