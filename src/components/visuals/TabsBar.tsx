import React from 'react';

export interface TabsBarItem {
  label: string;
  disabled?: boolean;
}

interface TabsBarProps {
  items: TabsBarItem[];
  activeIndex: number;
  onChange: (index: number) => void;
  ariaLabel: string;
}

const tabBarStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: 8,
  padding: 8,
  borderRadius: 16,
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.05)',
};

const tabButtonStyle = (active: boolean): React.CSSProperties => ({
  minWidth: 0,
  padding: '11px 12px',
  borderRadius: 12,
  border: '1px solid transparent',
  fontSize: 13,
  fontWeight: 700,
  letterSpacing: '0.01em',
  lineHeight: 1.2,
  color: active ? '#091018' : 'var(--sw-text-dim)',
  background: active
    ? 'linear-gradient(135deg, rgba(0, 229, 255, 0.95), rgba(102, 184, 74, 0.92))'
    : 'rgba(255, 255, 255, 0.04)',
  boxShadow: active ? '0 12px 30px rgba(0, 229, 255, 0.12)' : 'none',
  cursor: 'pointer',
  transition: 'transform 180ms ease, background 180ms ease, color 180ms ease, box-shadow 180ms ease',
});

export const TabsBar: React.FC<TabsBarProps> = ({ items, activeIndex, onChange, ariaLabel }) => (
  <div role="tablist" aria-label={ariaLabel} style={tabBarStyle}>
    {items.map((item, index) => {
      const active = activeIndex === index;

      return (
        <button
          key={item.label}
          type="button"
          role="tab"
          aria-selected={active}
          aria-disabled={item.disabled || undefined}
          disabled={item.disabled}
          tabIndex={active ? 0 : -1}
          onClick={() => onChange(index)}
          style={tabButtonStyle(active)}
        >
          {item.label}
        </button>
      );
    })}
  </div>
);
