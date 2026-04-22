import React from 'react';

interface TabbedPanelSurfaceProps {
  children: React.ReactNode;
  minHeight?: number;
}

const surfaceStyle = (minHeight: number): React.CSSProperties => ({
  width: '100%',
  flex: '1 1 auto',
  minHeight,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
  minWidth: 0,
});

const bodyStyle: React.CSSProperties = {
  flex: 1,
  minHeight: 0,
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
};

export const TabbedPanelSurface: React.FC<TabbedPanelSurfaceProps> = ({ children, minHeight = 0 }) => (
  <div style={surfaceStyle(minHeight)}>
    <div style={bodyStyle}>{children}</div>
  </div>
);

