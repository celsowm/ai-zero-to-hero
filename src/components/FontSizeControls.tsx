import React from 'react';
import { useUI } from '../hooks/useUI';
import { useLocale } from '../hooks/useLocale';
import { getUiMessages } from '../i18n/uiMessages';

export const FontSizeControls: React.FC = () => {
  const { increaseFontScale, decreaseFontScale, fontScale } = useUI();
  const { language } = useLocale();
  const ui = getUiMessages(language);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <button
        type="button"
        onClick={decreaseFontScale}
        aria-label={ui.fontDecrease}
        title={ui.fontDecrease}
        style={{
          width: 34,
          height: 28,
          borderRadius: 8,
          border: '1px solid rgba(168, 85, 247, 0.12)',
          background: 'rgba(26, 22, 40, 0.65)',
          color: 'var(--sw-text)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        A-
      </button>
      <button
        type="button"
        onClick={increaseFontScale}
        aria-label={ui.fontIncrease}
        title={ui.fontIncrease}
        style={{
          width: 34,
          height: 28,
          borderRadius: 8,
          border: '1px solid rgba(0, 229, 255, 0.18)',
          background: 'linear-gradient(135deg, rgba(255, 46, 151, 0.22), rgba(168, 85, 247, 0.18))',
          color: '#fff',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          boxShadow: '0 6px 16px rgba(255, 46, 151, 0.16)',
        }}
      >
        A+
      </button>
      <span style={{ fontSize: 11, color: 'var(--sw-text-muted)', minWidth: 34, textAlign: 'right' }}>
        {Math.round(fontScale * 100)}%
      </span>
    </div>
  );
};
