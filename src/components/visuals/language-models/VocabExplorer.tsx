import React, { useState } from 'react';
import type { PytorchShapeTraceFlowCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface VocabExplorerProps {
  copy: PytorchShapeTraceFlowCopy['vocabPanel'];
}

const VocabExplorer: React.FC<VocabExplorerProps> = ({ copy }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16, height: '100%', overflow: 'auto' }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.title}</div>
        <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.subtitle}</div>
      </div>

      <svg viewBox="0 0 520 280" style={{ width: '100%', maxHeight: 280, flexShrink: 0 }}>
        <defs>
          <linearGradient id="vg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>

        {copy.examples.map((ex, i) => {
          const y = 24 + i * 32;
          const isSelected = selectedIndex === i;
          const rectFill = isSelected ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255,255,255,0.03)';
          const rectStroke = isSelected ? '#00e5ff' : '#2a3a5c';
          return (
            <g key={ex.token} onClick={() => setSelectedIndex(i)} style={{ cursor: 'pointer' }}>
              <rect x="20" y={y - 14} width="140" height="26" rx="8" fill={rectFill} stroke={rectStroke} strokeWidth={isSelected ? 1.5 : 1} />
              <text x="40" y={y + 5} fill={isSelected ? '#fff' : '#94a3b8'} fontSize="13" fontWeight={isSelected ? 700 : 400}>
                {ex.token}
              </text>

              {selectedIndex === i && (
                <line x1="162" y1={y} x2="188" y2={y} stroke="#00e5ff66" strokeWidth="1.5" strokeDasharray="4,4" />
              )}

              <rect x="190" y={y - 14} width="50" height="26" rx="8" fill={isSelected ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.03)'} stroke={isSelected ? '#7c3aed' : '#2a3a5c'} strokeWidth={isSelected ? 1.5 : 1} />
              <text x="215" y={y + 5} textAnchor="middle" fill={isSelected ? '#a78bfa' : '#94a3b8'} fontSize="13" fontFamily="monospace" fontWeight={isSelected ? 700 : 400}>
                {ex.id}
              </text>
            </g>
          );
        })}

        <text x="90" y="14" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1.2" style={{ textTransform: 'uppercase' }}>{copy.tokenLabel}</text>
        <text x="215" y="14" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1.2" style={{ textTransform: 'uppercase' }}>{copy.idLabel}</text>

        <line x1="20" y1={24 + copy.examples.length * 32 + 8} x2="520" y2={24 + copy.examples.length * 32 + 8} stroke="#1e293b" strokeWidth="1" />

        <text x="20" y={24 + copy.examples.length * 32 + 30} fill="#64748b" fontSize="11">
          {copy.shapeLabel}
        </text>
      </svg>

      <div style={{
        border: `1px solid ${sw.borderSubtle}`,
        borderRadius: 16,
        background: sw.surface,
        padding: 16,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 12,
      }}>
        {copy.dimensionCard.shapes.map((shape, i) => {
          const labels = [copy.dimensionCard.embedLabel, copy.dimensionCard.vocabLabel, copy.dimensionCard.dimLabel];
          const shapeValues = [copy.dimensionCard.embedShape, copy.dimensionCard.vocabShape, copy.dimensionCard.dimShape];
          const colors = ['#00e5ff', '#7c3aed', '#f59e0b'];
          return (
            <div key={shape} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: colors[i], textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{labels[i]}</div>
              <div style={{ fontFamily: sw.fontMono, fontSize: 14, fontWeight: 700, color: sw.text }}>{shapeValues[i]}</div>
            </div>
          );
        })}
      </div>

      {copy.footer && (
        <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.footer}</div>
      )}
    </div>
  );
};

export default VocabExplorer;
