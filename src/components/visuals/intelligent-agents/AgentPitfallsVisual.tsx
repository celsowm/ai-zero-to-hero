import React, { useState } from 'react';
import type { AgentPitfallsVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface Props { copy: AgentPitfallsVisualCopy }

const pitfalls = [
  { titleKey: 'pitfall1Title', descKey: 'pitfall1Desc', fixKey: 'pitfall1Fix', icon: '⚠️' },
  { titleKey: 'pitfall2Title', descKey: 'pitfall2Desc', fixKey: 'pitfall2Fix', icon: '🔒' },
  { titleKey: 'pitfall3Title', descKey: 'pitfall3Desc', fixKey: 'pitfall3Fix', icon: '🔄' },
  { titleKey: 'pitfall4Title', descKey: 'pitfall4Desc', fixKey: 'pitfall4Fix', icon: '🔧' },
];

function getField(item: typeof pitfalls[0], copy: AgentPitfallsVisualCopy, field: 'titleKey' | 'descKey' | 'fixKey') {
  switch (field) {
    case 'titleKey': return copy[item.titleKey as keyof AgentPitfallsVisualCopy] as string;
    case 'descKey': return copy[item.descKey as keyof AgentPitfallsVisualCopy] as string;
    case 'fixKey': return copy[item.fixKey as keyof AgentPitfallsVisualCopy] as string;
    default: return '';
  }
}

export const AgentPitfallsVisual = React.memo(({ copy }: Props) => {
  const [expandedFix, setExpandedFix] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <h4 style={{ margin: 0, fontSize: '14px', color: sw.text, textAlign: 'center' }}>{copy.title}</h4>
      <p style={{ margin: 0, fontSize: '11px', color: sw.textMuted, textAlign: 'center' }}>{copy.subtitle}</p>

      {pitfalls.map((pitfall, i) => {
        const isExpanded = expandedFix === i;
        const colors = [sw.pink, sw.amber, sw.purple, sw.sky];
        return (
          <div
            key={i}
            style={{
              padding: '8px 10px', borderRadius: '10px',
              border: `1px solid ${isExpanded ? colors[i] : sw.borderSubtle}33`,
              background: sw.surface,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '14px' }}>{pitfall.icon}</span>
                <strong style={{ fontSize: '11px', color: colors[i], marginLeft: '4px' }}>
                  {getField(pitfall, copy, 'titleKey')}
                </strong>
              </div>
              <button
                onClick={() => setExpandedFix(isExpanded ? null : i)}
                style={{
                  fontSize: '9px', fontWeight: '700', padding: '2px 8px', borderRadius: '6px',
                  border: `1px solid ${colors[i]}44`, background: `${colors[i]}11`,
                  color: colors[i], cursor: 'pointer',
                }}
              >
                {isExpanded ? copy.hideFix : copy.showFix}
              </button>
            </div>
            <div style={{ fontSize: '10px', color: sw.textMuted, marginTop: '4px', lineHeight: '1.4' }}>
              {getField(pitfall, copy, 'descKey')}
            </div>
            {isExpanded && (
              <div style={{
                fontSize: '10px', color: sw.emerald, marginTop: '6px', padding: '6px 8px',
                borderRadius: '8px', background: `${sw.emerald}08`,
                border: `1px solid ${sw.emerald}22`, lineHeight: '1.4',
              }}>
                ✅ {getField(pitfall, copy, 'fixKey')}
              </div>
            )}
          </div>
        );
      })}

      <div style={{
        background: `${sw.sky}08`, border: `1px solid ${sw.sky}22`,
        borderRadius: '8px', padding: '8px 10px', fontSize: '10px', color: sw.text, lineHeight: '1.4',
      }}>
        <strong style={{ color: sw.sky }}>{copy.insightTitle}</strong> {copy.insightText}
      </div>
    </div>
  );
});
