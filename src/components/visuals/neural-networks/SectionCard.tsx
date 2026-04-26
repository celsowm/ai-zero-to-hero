import React from 'react';
import { sw } from '../../../theme/tokens';
import { metricRowTitle } from './utils';

interface Props {
  title: string;
  color: string;
  active: boolean;
  columns?: 1 | 2;
  rows: Array<{ label: string; value: string }>;
}

export const SectionCard: React.FC<Props> = ({ title, color, active, columns = 1, rows }) => (
  <div
    style={{
      padding: '8px 10px',
      borderRadius: 12,
      background: active ? sw.tintOverlay : sw.tint,
      border: `1px solid ${active ? color : sw.borderSubtle}`,
      boxShadow: active ? `0 0 0 1px ${color}, 0 0 15px ${color}22` : 'none',
      display: 'flex',
      flexDirection: 'column',
      gap: 4,
      transition: 'all 250ms ease',
    }}
  >
    <div
      style={{
        fontSize: 9,
        fontWeight: 800,
        letterSpacing: '.06em',
        textTransform: 'uppercase',
        color,
        borderBottom: `1px solid ${color}33`,
        paddingBottom: 4,
        marginBottom: 2,
      }}
    >
      {title}
    </div>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: columns === 2 ? 'repeat(2, minmax(0, 1fr))' : '1fr',
        gap: columns === 2 ? 6 : 4,
      }}
    >
      {rows.map((row) => (
        <div
          key={row.label}
          title={metricRowTitle(row.label, row.value)}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: 10,
            padding: '4px 6px',
            borderRadius: 9,
            background: sw.tint,
            border: `1px solid ${sw.gridLine}`,
            minWidth: 0,
          }}
        >
          <span
            style={{
              color: 'var(--sw-text-dim)',
              fontSize: 9.5,
              lineHeight: 1.15,
              textTransform: 'none',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            {row.label}
          </span>
          <span
            style={{
              color: sw.text,
              fontWeight: 800,
              fontSize: 12.5,
              lineHeight: 1.1,
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {row.value}
          </span>
        </div>
      ))}
    </div>
  </div>
);
