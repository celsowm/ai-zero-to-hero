import React from 'react';

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
  borderRadius: 18,
  background: 'linear-gradient(180deg, rgba(20, 18, 31, 0.92), rgba(14, 13, 24, 0.94))',
  border: '1px solid rgba(255, 255, 255, 0.06)',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04), 0 20px 40px rgba(0,0,0,0.24)',
  boxSizing: 'border-box',
  overflow: 'hidden',
});

export const PanelCard: React.FC<PanelCardProps> = ({ children, minHeight = 0, padding = 20, gap = 14, style, className }) => (
  <div className={className} style={{ ...baseStyle(minHeight, padding, gap), ...style }}>{children}</div>
);

