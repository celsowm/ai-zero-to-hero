import React, { useState } from 'react';
import type { ZeroShotPromptingCopy } from '../../../types/slide/prompt-engineering';
import { sw } from '../../../theme/tokens';

interface ZeroShotPromptingProps {
  copy: ZeroShotPromptingCopy;
}

export const ZeroShotPromptingVisual = React.memo(({ copy }: ZeroShotPromptingProps) => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const worksItems = [
    { label: copy.genericLabel, icon: '📝' },
    { label: copy.largeModelLabel, icon: '🧠' },
    { label: copy.simpleLabel, icon: '✅' },
  ];

  const failsItems = [
    { label: copy.specificLabel, icon: '📐' },
    { label: copy.reasoningLabel, icon: '🔀' },
    { label: copy.nicheLabel, icon: '🔬' },
  ];

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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Works column */}
        <div>
          <div style={{
            padding: '8px 12px',
            borderRadius: '8px',
            background: `${sw.green}14`,
            border: `1px solid ${sw.green}33`,
            marginBottom: '12px',
            textAlign: 'center',
            fontSize: sw.fsSmall,
            fontWeight: 600,
            color: sw.green,
          }}>
            {copy.worksLabel}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {worksItems.map((item, i) => (
              <div
                key={i}
                onMouseOver={() => setHoveredCard(`works-${i}`)}
                onMouseOut={() => setHoveredCard(null)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${hoveredCard === `works-${i}` ? `${sw.green}55` : sw.borderSubtle}`,
                  background: hoveredCard === `works-${i}` ? `${sw.green}10` : 'transparent',
                  transition: sw.transitionFast,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'default',
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ fontSize: sw.fsSmall, color: sw.textDim }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fails column */}
        <div>
          <div style={{
            padding: '8px 12px',
            borderRadius: '8px',
            background: `${sw.pink}14`,
            border: `1px solid ${sw.pink}33`,
            marginBottom: '12px',
            textAlign: 'center',
            fontSize: sw.fsSmall,
            fontWeight: 600,
            color: sw.pink,
          }}>
            {copy.failsLabel}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {failsItems.map((item, i) => (
              <div
                key={i}
                onMouseOver={() => setHoveredCard(`fails-${i}`)}
                onMouseOut={() => setHoveredCard(null)}
                style={{
                  padding: '12px',
                  borderRadius: '8px',
                  border: `1px solid ${hoveredCard === `fails-${i}` ? `${sw.pink}55` : sw.borderSubtle}`,
                  background: hoveredCard === `fails-${i}` ? `${sw.pink}10` : 'transparent',
                  transition: sw.transitionFast,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'default',
                }}
              >
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ fontSize: sw.fsSmall, color: sw.textDim }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
