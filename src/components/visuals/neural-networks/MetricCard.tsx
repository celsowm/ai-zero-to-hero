import React from 'react';
import { sw } from '../../../theme/tokens';

interface Props {
  label: string;
  value: string;
  accent: string;
}

export const MetricCard: React.FC<Props> = ({ label, value, accent }) => (
  <div style={{ padding: '8px 6px', borderRadius: 12, background: sw.tintStrong, border: `1px solid ${sw.borderSubtle}`, textAlign: 'center' }}>
    <div style={{ fontSize: 8, color: 'var(--sw-text-dim)', fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>{label}</div>
    <div style={{ fontSize: 14, fontWeight: 900, fontFamily: 'monospace', color: accent }}>{value}</div>
  </div>
);
