import React from 'react';
import { Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';

interface HintSectionProps {
  hints: string[];
  hintLabel: string;
  showHints: boolean;
  onToggle: () => void;
}

export const HintSection: React.FC<HintSectionProps> = ({
  hints,
  hintLabel,
  showHints,
  onToggle,
}) => {
  if (hints.length === 0) return null;

  return (
    <div style={{ marginTop: 10 }}>
      <button
        type="button"
        onClick={onToggle}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 12,
          fontWeight: 700,
          color: 'var(--sw-purple)',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <Lightbulb size={14} />
        {hintLabel}
        {showHints ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
      </button>
      {showHints && (
        <ul
          style={{
            marginTop: 8,
            paddingLeft: 18,
            fontSize: 12.5,
            lineHeight: 1.6,
            color: 'var(--sw-text-dim)',
          }}
        >
          {hints.map((hint, idx) => (
            <li key={idx}>{hint}</li>
          ))}
        </ul>
      )}
    </div>
  );
};
