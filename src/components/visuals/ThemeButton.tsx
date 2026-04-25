import React from 'react';
import { sw } from '../../theme/tokens';

export type ThemeButtonVariant = 'ghost' | 'active' | 'tab' | 'primary';

interface ThemeButtonProps {
  children: React.ReactNode;
  variant?: ThemeButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
  ariaLabel?: string;
}

const variantStyles: Record<ThemeButtonVariant, React.CSSProperties> = {
  ghost: {
    background: 'transparent',
    border: `1px solid ${sw.borderSubtle}`,
    color: sw.textDim,
    borderRadius: sw.cardBorderRadius,
    padding: '6px 14px',
    fontSize: sw.fsSmall,
    fontWeight: 500,
    cursor: 'pointer',
    transition: sw.transitionFast,
  },
  active: {
    background: 'linear-gradient(135deg, rgba(0, 229, 255, 0.15), rgba(168, 85, 247, 0.15))',
    border: `1px solid ${sw.borderActiveCyan}`,
    color: sw.text,
    borderRadius: sw.cardBorderRadius,
    padding: '6px 14px',
    fontSize: sw.fsSmall,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: sw.insetHighlight,
    transition: sw.transitionFast,
  },
  tab: {
    background: 'transparent',
    border: 'none',
    borderBottom: `2px solid transparent`,
    color: sw.textMuted,
    borderRadius: '8px 8px 0 0',
    padding: '8px 16px',
    fontSize: sw.fsSmall,
    fontWeight: 500,
    cursor: 'pointer',
    transition: sw.transitionFast,
  },
  primary: {
    background: `linear-gradient(135deg, ${sw.pink}, ${sw.purple})`,
    border: 'none',
    color: '#fff',
    borderRadius: sw.cardBorderRadius,
    padding: '8px 20px',
    fontSize: sw.fsBody,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: sw.shadowSoft,
    transition: sw.transitionFast,
  },
};

export const ThemeButton = React.memo(
  ({
    children,
    variant = 'ghost',
    onClick,
    disabled,
    className,
    style,
    ariaLabel,
  }: ThemeButtonProps) => (
    <button
      className={className}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        ...variantStyles[variant],
        opacity: disabled ? 0.4 : 1,
        ...style,
      }}
    >
      {children}
    </button>
  ),
);
