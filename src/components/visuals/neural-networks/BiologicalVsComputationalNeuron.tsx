import React, { useState } from 'react';
import { PanelCard } from '../PanelCard';
import { TabsBar } from '../TabsBar';
import type { BiologicalVsComputationalNeuronCopy } from '../../../types/slide';

interface Props {
  copy: BiologicalVsComputationalNeuronCopy;
}

export const BiologicalVsComputationalNeuron: React.FC<Props> = ({ copy }) => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: copy.biologyTitle },
    { label: copy.computationTitle },
  ];

  return (
    <div className="w-full h-full min-h-0 flex flex-col overflow-hidden">
      <PanelCard 
        padding={24} 
        gap={20} 
        className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden relative"
        style={{ height: '100%', overflowY: 'auto' }}
      >
        {/* Tabs */}
        <div className="flex-shrink-0">
          <TabsBar
            items={tabs}
            activeIndex={activeTab}
            onChange={setActiveTab}
            ariaLabel="Neuron type tabs"
          />
        </div>

        {/* Tab Content */}
        <div className="flex-shrink-0">
          {/* ── Tab 0: Biological Neuron ── */}
          {activeTab === 0 && (
            <div className="flex flex-col gap-6 pt-2">
              {/* SVG Diagram */}
              <div className="w-full rounded-2xl bg-black/20 border border-white/5 overflow-hidden flex items-center justify-center p-4" style={{ aspectRatio: '16/7' }}>
                <svg viewBox="0 0 560 220" className="w-full h-full drop-shadow-2xl">
                  {/* ... (SVG content stays the same) ... */}
                  <defs>
                    <marker id="bio-arrowhead" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
                      <polygon points="0 0, 7 2.5, 0 5" fill="var(--sw-text-muted)" />
                    </marker>
                  </defs>
                  <g stroke="#4ade80" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.7">
                    <path d="M 135 110 L 60 55 L 40 60 M 60 55 L 48 30" strokeWidth="5" />
                    <path d="M 135 110 L 50 100 M 135 110 L 65 165 L 35 178 M 65 165 L 80 195" strokeWidth="4" />
                    <path d="M 135 110 L 170 45 L 195 30 M 170 45 L 148 22" strokeWidth="5" />
                    <path d="M 135 110 L 175 175 L 158 198 M 175 175 L 210 188" strokeWidth="4" />
                  </g>
                  <path d="M 135 110 Q 270 125, 420 110" fill="none" stroke="#4ade80" strokeWidth="5" />
                  <g stroke="#4ade80" fill="none" strokeLinecap="round" strokeWidth="3.5" opacity="0.7">
                    <path d="M 420 110 Q 440 95, 460 55 M 442 78 Q 460 83, 478 68" />
                    <path d="M 420 110 Q 440 118, 468 103" />
                    <path d="M 420 110 Q 440 128, 450 155" />
                    <path d="M 405 112 Q 424 145, 435 160" />
                  </g>
                  <g fill="#22c55e">
                    <circle cx="460" cy="55" r="4" />
                    <circle cx="478" cy="68" r="4" />
                    <circle cx="468" cy="103" r="4" />
                    <circle cx="450" cy="155" r="4" />
                    <circle cx="435" cy="160" r="4" />
                  </g>
                  <path
                    d="M 135 78 C 162 70, 174 95, 176 112 C 172 134, 152 148, 132 143 C 105 138, 97 110, 106 87 C 114 74, 126 80, 135 78 Z"
                    fill="#16a34a"
                    stroke="#15803d"
                    strokeWidth="2"
                  />
                  <circle cx="138" cy="110" r="13" fill="var(--sw-cyan)" stroke="#0891b2" strokeWidth="2" />
                  <g fill="rgba(0,229,255,0.08)" stroke="var(--sw-cyan)" strokeWidth="1.5" opacity="0.6">
                    <rect x="196" y="107" width="32" height="11" rx="5" transform="rotate(2 212 112)" />
                    <rect x="238" y="108" width="32" height="11" rx="5" transform="rotate(1 254 113)" />
                    <rect x="280" y="108" width="32" height="11" rx="5" transform="rotate(-1 296 113)" />
                    <rect x="322" y="106" width="32" height="11" rx="5" transform="rotate(-2 338 111)" />
                    <rect x="363" y="104" width="32" height="11" rx="5" transform="rotate(-4 379 109)" />
                  </g>
                  <circle cx="505" cy="178" r="36" fill="rgba(0,229,255,0.05)" stroke="var(--sw-cyan)" strokeWidth="1" strokeDasharray="4 4" />
                  <path d="M 476 152 C 484 162, 505 162, 509 176 C 508 189, 492 193, 479 184 Z" fill="#16a34a" stroke="#15803d" strokeWidth="1.5" />
                  <path d="M 520 162 Q 498 180, 520 200" fill="none" stroke="#22c55e" strokeWidth="6" strokeLinecap="round" />
                  <g fill="var(--sw-text)" fontSize="10" fontWeight="700">
                    <text x={90} y={15} textAnchor="middle">{copy.biologicalLabels.dendrites}</text>
                    <text x={212} y={50} textAnchor="start">{copy.biologicalLabels.soma}</text>
                    <text x={212} y={61} textAnchor="start" fontSize="8.5" fill="var(--sw-text-dim)" opacity="0.8">{copy.biologicalLabels.cellBody}</text>
                    <text x={110} y={98} textAnchor="end" fontSize="9">{copy.biologicalLabels.nucleus}</text>
                    <text x={280} y={95} textAnchor="middle">{copy.biologicalLabels.axon}</text>
                    <text x={255} y={135} textAnchor="middle">{copy.biologicalLabels.myelinLine1} {copy.biologicalLabels.myelinLine2}</text>
                    <text x={454} y={178} textAnchor="end">{copy.biologicalLabels.synapse}</text>
                    <text x={454} y={189} textAnchor="end" fontSize="8.5" fill="var(--sw-text-dim)" opacity="0.8">{copy.biologicalLabels.synapseGap}</text>
                    <text x={472} y={32} textAnchor="middle">{copy.biologicalLabels.terminalsLine1} {copy.biologicalLabels.terminalsLine2}</text>
                  </g>
                </svg>
              </div>

              {/* Biology Table */}
              <div className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.02]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-green-500/10 text-green-400 font-bold uppercase tracking-wider">
                    <tr>
                      {copy.biologyTable.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 border-b border-white/5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[var(--sw-text-dim)]">
                    {copy.biologyTable.rows.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3 font-medium">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── Tab 1: Computational Neuron ── */}
          {activeTab === 1 && (
            <div className="flex flex-col gap-6 pt-2">
              <div className="w-full rounded-2xl bg-black/20 border border-white/5 overflow-hidden flex items-center justify-center p-4" style={{ aspectRatio: '16/7' }}>
                <svg viewBox="20 0 520 220" className="w-full h-full drop-shadow-2xl">
                  {/* ... (SVG content stays the same) ... */}
                  <defs>
                    <marker id="comp-arrowhead" markerWidth="7" markerHeight="5" refX="6" refY="2.5" orient="auto">
                      <polygon points="0 0, 7 2.5, 0 5" fill="var(--sw-text-muted)" />
                    </marker>
                  </defs>
                  <g fill="var(--sw-text)" fontSize="20" fontFamily="serif" fontStyle="italic">
                    <text x="40" y="85">x<tspan fontSize="13" dy="5">1</tspan></text>
                    <text x="40" y="118">x<tspan fontSize="13" dy="5">2</tspan></text>
                    <text x="42" y="160" fontSize="22" fontFamily="sans-serif" fontWeight="bold">⋮</text>
                    <text x="40" y="198">x<tspan fontSize="13" dy="5">n</tspan></text>
                  </g>
                  <g stroke="var(--sw-text-muted)" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)">
                    <line x1="70" y1="80" x2="278" y2="125" />
                    <line x1="70" y1="113" x2="278" y2="133" />
                    <line x1="70" y1="193" x2="278" y2="150" />
                  </g>
                  <g fill="var(--sw-cyan)" fontSize="15" fontFamily="serif" fontStyle="italic">
                    <text x="160" y="90">w<tspan fontSize="11" dy="4">1</tspan></text>
                    <text x="162" y="122">w<tspan fontSize="11" dy="4">2</tspan></text>
                    <text x="160" y="190">w<tspan fontSize="11" dy="4">n</tspan></text>
                  </g>
                  <circle cx="320" cy="140" r="44" fill="rgba(251,191,36,0.10)" stroke="var(--sw-yellow)" strokeWidth="2.5" />
                  <text x="320" y="147" textAnchor="middle" fill="var(--sw-text)" fontSize="20" fontFamily="serif">
                    ∑
                    <tspan fontStyle="italic" fontSize="15" dx="2" dy="-2">w</tspan>
                    <tspan fontStyle="italic" fontSize="9" dy="4">i</tspan>
                    <tspan fontStyle="italic" fontSize="15" dy="-4">x</tspan>
                    <tspan fontStyle="italic" fontSize="9" dy="4">i</tspan>
                    <tspan fontSize="14" dy="-4"> + </tspan>
                    <tspan fontStyle="italic" fontSize="15">b</tspan>
                  </text>
                  <line x1="364" y1="140" x2="406" y2="140" stroke="var(--sw-text-muted)" strokeWidth="1.5" markerEnd="url(#comp-arrowhead)" />
                  <text x="384" y="130" textAnchor="middle" fill="var(--sw-text-dim)" fontSize="17" fontFamily="serif" fontStyle="italic">z</text>
                  <circle cx="440" cy="140" r="26" fill="rgba(168,85,247,0.10)" stroke="var(--sw-purple)" strokeWidth="2.5" />
                  <text x="440" y="148" textAnchor="middle" fill="var(--sw-text)" fontSize="24" fontFamily="serif" fontStyle="italic">σ</text>
                  <line x1="466" y1="140" x2="506" y2="140" stroke="var(--sw-pink)" strokeWidth="2" markerEnd="url(#comp-arrowhead)" />
                  <text x="516" y="146" fill="var(--sw-pink)" fontSize="20" fontFamily="serif" fontStyle="italic">a</text>
                  <g fill="var(--sw-text-muted)" fontSize="10" fontWeight="700">
                    <text x={52} y={30} textAnchor="middle">{copy.computationalLabels.inputs}</text>
                    <text x={175} y={40} textAnchor="middle">{copy.computationalLabels.synapses}</text>
                    <text x={320} y={200} textAnchor="middle">{copy.computationalLabels.weightedSumBias}</text>
                    <text x={440} y={182} textAnchor="middle">{copy.computationalLabels.activationLine1} {copy.computationalLabels.activationLine2}</text>
                    <text x={508} y={172} textAnchor="middle">{copy.computationalLabels.axon}</text>
                  </g>
                </svg>
              </div>

              {/* Computation Table */}
              <div className="rounded-xl overflow-hidden border border-white/5 bg-white/[0.02]">
                <table className="w-full text-xs text-left">
                  <thead className="bg-purple-500/10 text-purple-400 font-bold uppercase tracking-wider">
                    <tr>
                      {copy.computationTable.headers.map((h, i) => (
                        <th key={i} className="px-4 py-3 border-b border-white/5">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="text-[var(--sw-text-dim)]">
                    {copy.computationTable.rows.map((row, i) => (
                      <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className="px-4 py-3 font-medium">{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="pt-3 mt-2 border-t border-white/5 text-[10px] text-center italic text-[var(--sw-text-muted)] flex-shrink-0">
          {copy.footerNote}
        </div>
      </PanelCard>
    </div>
  );
};
