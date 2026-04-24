import React from 'react';
import { sw } from '../../theme/tokens';

interface PanelCardProps {
  children: React.ReactNode;
  minHeight?: number;
  padding?: number;
  gap?: number;
  style?: React.CSSProperties;
  className?: string;
}

const baseStyle = (minHeight: number, padding: number, gap: number): React.CSSProperties => ({
  width: '100%',
  minHeight,
  display: 'flex',
  flexDirection: 'column',
  gap,
  padding,
  borderRadius: '16px',
  background: sw.panelBackground,
  border: sw.panelBorder,
  boxShadow: `${sw.insetHighlightStrong}, ${sw.shadowSoft}`,
  boxSizing: 'border-box',
  overflow: 'hidden',
});

export const PanelCard = React.memo(({ children, minHeight = 0, padding = 20, gap = 14, style, className }: PanelCardProps) => (
  <div className={className} style={{ ...baseStyle(minHeight, padding, gap), ...style }}>{children}</div>
));
