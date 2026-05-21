import React, { useState } from 'react';
import type { PytorchShapeTraceFlowCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface VocabExplorerProps {
  copy: PytorchShapeTraceFlowCopy['vocabPanel'];
}

const VocabExplorer: React.FC<VocabExplorerProps> = ({ copy }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = copy.examples[selectedIndex];
  const barCount = copy.examples.length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16, height: '100%', overflow: 'auto' }}>
      <div>
        <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.title}</div>
        <div style={{ marginTop: 3, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.subtitle}</div>
        <div style={{ marginTop: 8, fontSize: 12, color: sw.textMuted }}>{copy.axisLegend}</div>
      </div>

      <svg viewBox="0 0 760 320" style={{ width: '100%', maxHeight: 320, flexShrink: 0 }}>
        <defs>
          <linearGradient id="vg" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00e5ff" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
          <linearGradient id="logitsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#00e5ff" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {copy.examples.map((ex, i) => {
          const y = 34 + i * 38;
          const isSelected = selectedIndex === i;
          const rectFill = isSelected ? 'rgba(0, 229, 255, 0.15)' : 'rgba(255,255,255,0.03)';
          const rectStroke = isSelected ? '#00e5ff' : '#2a3a5c';
          return (
            <g key={ex.token} onClick={() => setSelectedIndex(i)} style={{ cursor: 'pointer' }}>
              <rect x="20" y={y - 15} width="160" height="28" rx="8" fill={rectFill} stroke={rectStroke} strokeWidth={isSelected ? 1.5 : 1} />
              <text x="40" y={y + 4} fill={isSelected ? '#fff' : '#94a3b8'} fontSize="13" fontWeight={isSelected ? 700 : 400}>
                {ex.token}
              </text>

              <line x1="182" y1={y} x2="220" y2={y} stroke={isSelected ? '#00e5ff99' : '#2a3a5c'} strokeWidth="1.5" strokeDasharray="4,4" />

              <rect x="222" y={y - 15} width="60" height="28" rx="8" fill={isSelected ? 'rgba(124, 58, 237, 0.2)' : 'rgba(255,255,255,0.03)'} stroke={isSelected ? '#7c3aed' : '#2a3a5c'} strokeWidth={isSelected ? 1.5 : 1} />
              <text x="252" y={y + 4} textAnchor="middle" fill={isSelected ? '#a78bfa' : '#94a3b8'} fontSize="13" fontFamily="monospace" fontWeight={isSelected ? 700 : 400}>
                {ex.id}
              </text>

              <line x1="284" y1={y} x2="338" y2={y} stroke={isSelected ? '#a78bfa99' : '#2a3a5c'} strokeWidth="1.5" />
              <rect x="340" y={y - 15} width="70" height="28" rx="8" fill={isSelected ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)'} stroke={isSelected ? '#f59e0b' : '#2a3a5c'} strokeWidth={isSelected ? 1.5 : 1} />
              <text x="375" y={y + 4} textAnchor="middle" fill={isSelected ? '#fbbf24' : '#94a3b8'} fontSize="12" fontFamily="monospace" fontWeight={isSelected ? 700 : 400}>
                E[{ex.id}]
              </text>
            </g>
          );
        })}

        <text x="100" y="16" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1.2" style={{ textTransform: 'uppercase' }}>{copy.tokenLabel}</text>
        <text x="252" y="16" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1.2" style={{ textTransform: 'uppercase' }}>{copy.idLabel}</text>
        <text x="375" y="16" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="700" letterSpacing="1.2" style={{ textTransform: 'uppercase' }}>{copy.embeddingRowLabel}</text>

        <rect x="450" y="34" width="280" height="228" rx="12" fill="rgba(15,23,42,0.5)" stroke="#1e293b" />
        <text x="470" y="58" fill="#94a3b8" fontSize="11" fontWeight="700">{copy.logitsAxisLabel}</text>
        {Array.from({ length: barCount }).map((_, i) => {
          const x = 475 + i * 48;
          const isSelected = i === selectedIndex;
          const height = isSelected ? 140 : 70;
          const y = 232 - height;
          return (
            <g key={`logit-${i}`}>
              <rect x={x} y={y} width="28" height={height} rx="6" fill={isSelected ? 'url(#logitsFill)' : 'rgba(51,65,85,0.7)'} stroke={isSelected ? '#00e5ff' : '#334155'} />
              <text x={x + 14} y="248" textAnchor="middle" fill={isSelected ? '#00e5ff' : '#94a3b8'} fontSize="10" fontFamily={sw.fontMono}>
                {i}
              </text>
            </g>
          );
        })}
        <text x="470" y="278" fill="#94a3b8" fontSize="12">
          {copy.projectionHint.replace('{token}', selected.token).replace('{id}', String(selected.id))}
        </text>
        <text x="470" y="297" fill="#64748b" fontSize="10">
          {copy.animationLabel}
        </text>

        <line x1="20" y1={34 + copy.examples.length * 38 + 6} x2="730" y2={34 + copy.examples.length * 38 + 6} stroke="#1e293b" strokeWidth="1" />

        <text x="20" y={34 + copy.examples.length * 38 + 28} fill="#64748b" fontSize="11">
          {copy.shapeLabel}
        </text>
      </svg>

      <div style={{
        border: `1px solid ${sw.borderSubtle}`,
        borderRadius: 16,
        background: sw.surface,
        padding: 16,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
        gap: 12,
      }}>
        {copy.dimensionCards.map((card) => {
          const color = card.tone === 'cyan' ? '#00e5ff' : card.tone === 'violet' ? '#a78bfa' : '#f59e0b';
          return (
            <div key={card.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 10, fontWeight: 800, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>{card.label}</div>
              <div style={{ fontFamily: sw.fontMono, fontSize: 14, fontWeight: 700, color: sw.text }}>{card.value}</div>
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
