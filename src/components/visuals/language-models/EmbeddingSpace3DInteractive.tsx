import React, { useState, useRef, useCallback, useMemo } from 'react';
import type { EmbeddingSpace3DInteractiveCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

// ── Data ──────────────────────────────────────────────────────────────────────

interface SemanticPoint {
  word: string;
  wordPt: string;
  x: number;
  y: number;
  z: number;
  color: string;
  cluster: string;
  clusterPt: string;
  vector: number[];
}

const POINTS: SemanticPoint[] = [
  // Animais
  { word: 'Gato', wordPt: 'Gato', x: -2, y: 3, z: 1, color: '#3b82f6', cluster: 'animals', clusterPt: 'Animais', vector: [0.2, 0.8, -0.3, 0.5] },
  { word: 'Cachorro', wordPt: 'Cachorro', x: -1, y: 2, z: -1, color: '#3b82f6', cluster: 'animals', clusterPt: 'Animais', vector: [0.3, 0.7, -0.2, 0.6] },
  { word: 'Leão', wordPt: 'Leão', x: -3, y: -1, z: 2, color: '#60a5fa', cluster: 'animals', clusterPt: 'Animais', vector: [0.4, 0.6, -0.4, 0.3] },
  { word: 'Lobo', wordPt: 'Lobo', x: -2, y: -2, z: -2, color: '#60a5fa', cluster: 'animals', clusterPt: 'Animais', vector: [0.35, 0.65, -0.35, 0.4] },
  // Realeza
  { word: 'Rei', wordPt: 'Rei', x: 2, y: 3, z: -1, color: '#f59e0b', cluster: 'royalty', clusterPt: 'Realeza', vector: [-0.5, 0.9, 0.2, 0.7] },
  { word: 'Rainha', wordPt: 'Rainha', x: 3, y: 2, z: 1, color: '#f59e0b', cluster: 'royalty', clusterPt: 'Realeza', vector: [-0.4, 0.85, 0.3, 0.75] },
  { word: 'Príncipe', wordPt: 'Príncipe', x: 1, y: 4, z: 0, color: '#fbbf24', cluster: 'royalty', clusterPt: 'Realeza', vector: [-0.3, 0.8, 0.25, 0.65] },
  // Frutas
  { word: 'Maçã', wordPt: 'Maçã', x: 3, y: -2, z: 2, color: '#10b981', cluster: 'fruits', clusterPt: 'Frutas', vector: [0.7, -0.3, 0.6, -0.1] },
  { word: 'Banana', wordPt: 'Banana', x: 4, y: -3, z: -1, color: '#10b981', cluster: 'fruits', clusterPt: 'Frutas', vector: [0.8, -0.4, 0.5, -0.2] },
  { word: 'Laranja', wordPt: 'Laranja', x: 2, y: -1, z: 3, color: '#34d399', cluster: 'fruits', clusterPt: 'Frutas', vector: [0.75, -0.35, 0.55, -0.15] },
  // Tecnologia
  { word: 'Computador', wordPt: 'Computador', x: -4, y: -3, z: -3, color: '#a855f7', cluster: 'tech', clusterPt: 'Tecnologia', vector: [-0.6, 0.1, -0.7, 0.8] },
  { word: 'Internet', wordPt: 'Internet', x: -3, y: -4, z: -2, color: '#a855f7', cluster: 'tech', clusterPt: 'Tecnologia', vector: [-0.5, 0.0, -0.8, 0.9] },
];

const CLUSTER_LABELS: Record<string, { label: string; labelPt: string; color: string }> = {
  animals: { label: 'Animals', labelPt: 'Animais', color: '#3b82f6' },
  royalty: { label: 'Royalty', labelPt: 'Realeza', color: '#f59e0b' },
  fruits: { label: 'Fruits', labelPt: 'Frutas', color: '#10b981' },
  tech: { label: 'Technology', labelPt: 'Tecnologia', color: '#a855f7' },
};

// ── 3D math ───────────────────────────────────────────────────────────────────

function project3Dto2D(
  x: number, y: number, z: number,
  rotX: number, rotY: number,
  scale: number,
  cx: number, cy: number
) {
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);

  // Rotate around Y
  const x1 = x * cosY + z * sinY;
  const z1 = -x * sinY + z * cosY;
  // Rotate around X
  const y1 = y * cosX - z1 * sinX;
  const z2 = y * sinX + z1 * cosX;

  return {
    sx: cx + x1 * scale,
    sy: cy - y1 * scale,
    z: z2,
  };
}

function dist3D(a: SemanticPoint, b: SemanticPoint): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

// ── Component ─────────────────────────────────────────────────────────────────

interface EmbeddingSpace3DInteractiveProps {
  copy: EmbeddingSpace3DInteractiveCopy;
}

export const EmbeddingSpace3DInteractive = React.memo(({ copy }: EmbeddingSpace3DInteractiveProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [rotX, setRotX] = useState(0.35);
  const [rotY, setRotY] = useState(0.6);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hoveredPoint, setHoveredPoint] = useState<SemanticPoint | null>(null);
  const [selectedA, setSelectedA] = useState<SemanticPoint | null>(null);
  const [selectedB, setSelectedB] = useState<SemanticPoint | null>(null);
  const [showVectors, setShowVectors] = useState(false);
  const [lang] = useState<'pt-br' | 'en-us'>('pt-br');

  const isPtBr = lang === 'pt-br';

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;
    setRotY(prev => prev + dx * 0.008);
    setRotX(prev => Math.max(-Math.PI / 2, Math.min(Math.PI / 2, prev + dy * 0.008)));
    setDragStart({ x: e.clientX, y: e.clientY });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handlePointClick = useCallback((point: SemanticPoint) => {
    if (!selectedA) {
      setSelectedA(point);
    } else if (!selectedB && point !== selectedA) {
      setSelectedB(point);
    } else {
      setSelectedA(point);
      setSelectedB(null);
    }
  }, [selectedA, selectedB]);

  const projectedPoints = useMemo(() => {
    const scale = 35;
    const cx = 200;
    const cy = 180;
    return POINTS.map(p => {
      const { sx, sy, z } = project3Dto2D(p.x, p.y, p.z, rotX, rotY, scale, cx, cy);
      return { ...p, sx, sy, z };
    });
  }, [rotX, rotY]);

  const sortedPoints = useMemo(() => {
    return [...projectedPoints].sort((a, b) => a.z - b.z);
  }, [projectedPoints]);

  const distance = useMemo(() => {
    if (selectedA && selectedB) return dist3D(selectedA, selectedB).toFixed(2);
    return null;
  }, [selectedA, selectedB]);

  const resetSelection = useCallback(() => {
    setSelectedA(null);
    setSelectedB(null);
  }, []);

  return (
    <div style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      {/* Title */}
      <div style={{
        fontSize: '13px',
        color: sw.textMuted,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontWeight: '600',
        textAlign: 'center',
      }}>
        {copy.title}
      </div>

      {/* 3D Canvas */}
      <div
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{
          position: 'relative',
          width: '100%',
          height: '360px',
          background: sw.void,
          borderRadius: '20px',
          border: `1px solid ${sw.surface}`,
          cursor: isDragging ? 'grabbing' : 'grab',
          overflow: 'hidden',
          userSelect: 'none',
        }}
      >
        {/* Grid floor */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
          {/* Floor grid */}
          {Array.from({ length: 9 }, (_, i) => {
            const pos = -4 + i;
            const a = project3Dto2D(pos, -4.5, -4.5, rotX, rotY, 35, 200, 180);
            const b = project3Dto2D(pos, -4.5, 4.5, rotX, rotY, 35, 200, 180);
            const c = project3Dto2D(-4.5, -4.5, pos, rotX, rotY, 35, 200, 180);
            const d = project3Dto2D(4.5, -4.5, pos, rotX, rotY, 35, 200, 180);
            return (
              <React.Fragment key={i}>
                <line x1={a.sx} y1={a.sy} x2={b.sx} y2={b.sy} stroke={sw.textMuted} strokeWidth="0.5" opacity="0.3" />
                <line x1={c.sx} y1={c.sy} x2={d.sx} y2={d.sy} stroke={sw.textMuted} strokeWidth="0.5" opacity="0.3" />
              </React.Fragment>
            );
          })}
          {/* Axes */}
          {(() => {
            const origin = project3Dto2D(0, 0, 0, rotX, rotY, 35, 200, 180);
            const xEnd = project3Dto2D(5, 0, 0, rotX, rotY, 35, 200, 180);
            const yEnd = project3Dto2D(0, 5, 0, rotX, rotY, 35, 200, 180);
            const zEnd = project3Dto2D(0, 0, 5, rotX, rotY, 35, 200, 180);
            return (
              <>
                <line x1={origin.sx} y1={origin.sy} x2={xEnd.sx} y2={xEnd.sy} stroke="#ef4444" strokeWidth="1.5" opacity="0.5" />
                <line x1={origin.sx} y1={origin.sy} x2={yEnd.sx} y2={yEnd.sy} stroke="#22c55e" strokeWidth="1.5" opacity="0.5" />
                <line x1={origin.sx} y1={origin.sy} x2={zEnd.sx} y2={zEnd.sy} stroke="#3b82f6" strokeWidth="1.5" opacity="0.5" />
              </>
            );
          })()}

          {/* Connection line between selected points */}
          {selectedA && selectedB && (() => {
            const pa = projectedPoints.find(p => p.word === selectedA.word);
            const pb = projectedPoints.find(p => p.word === selectedB.word);
            if (!pa || !pb) return null;
            return (
              <>
                <line
                  x1={pa.sx} y1={pa.sy} x2={pb.sx} y2={pb.sy}
                  stroke="#f43f5e" strokeWidth="2" strokeDasharray="6 3" opacity="0.7"
                />
              </>
            );
          })()}
        </svg>

        {/* Points */}
        {sortedPoints.map(p => {
          const isHovered = hoveredPoint?.word === p.word;
          const isSelected = selectedA?.word === p.word || selectedB?.word === p.word;
          const size = isHovered ? 16 : isSelected ? 14 : 10;
          const opacity = 0.4 + ((p.z + 5) / 10) * 0.6;

          return (
            <div
              key={p.word}
              onClick={() => handlePointClick(p)}
              onMouseEnter={() => setHoveredPoint(p)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{
                position: 'absolute',
                left: p.sx,
                top: p.sy,
                transform: `translate(-50%, -50%) translateZ(${p.z * 5}px)`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                opacity,
                transition: 'opacity 0.15s, transform 0.15s',
                zIndex: Math.round(p.z + 5),
              }}
            >
              {/* Glow */}
              {(isHovered || isSelected) && (
                <div style={{
                  position: 'absolute',
                  width: size * 2.5,
                  height: size * 2.5,
                  borderRadius: '50%',
                  background: p.color,
                  opacity: 0.15,
                  filter: 'blur(8px)',
                }} />
              )}
              {/* Dot */}
              <div style={{
                width: size,
                height: size,
                borderRadius: '50%',
                background: p.color,
                boxShadow: isHovered || isSelected ? `0 0 12px ${p.color}` : 'none',
                border: isSelected ? '2px solid #fff' : 'none',
                transition: 'all 0.15s',
              }} />
              {/* Label */}
              {(isHovered || isSelected) && (
                <div style={{
                  fontSize: '12px',
                  fontWeight: '700',
                  color: '#e2e8f0',
                  background: 'rgba(15, 23, 42, 0.85)',
                  padding: '2px 8px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  border: `1px solid ${p.color}44`,
                }}>
                  {isPtBr ? p.wordPt : p.word}
                </div>
              )}
            </div>
          );
        })}

        {/* Hover tooltip */}
        {hoveredPoint && (
          <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '12px',
            background: 'rgba(15, 23, 42, 0.92)',
            border: `1px solid ${hoveredPoint.color}66`,
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '12px',
            color: '#e2e8f0',
            maxWidth: '220px',
            backdropFilter: 'blur(8px)',
          }}>
            <div style={{ fontWeight: '700', fontSize: '14px', color: hoveredPoint.color, marginBottom: '4px' }}>
              {isPtBr ? hoveredPoint.wordPt : hoveredPoint.word}
            </div>
            <div style={{ color: sw.textMuted, marginBottom: '4px' }}>
              {isPtBr ? hoveredPoint.clusterPt : hoveredPoint.cluster}
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: sw.textMuted }}>
              [{hoveredPoint.vector.join(', ')}]
            </div>
          </div>
        )}

        {/* Drag hint */}
        {!isDragging && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '12px',
            fontSize: '11px',
            color: sw.textMuted,
            opacity: 0.6,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}>
            <span>🖱️</span> {isPtBr ? 'Arraste para girar' : 'Drag to rotate'}
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        {/* Cluster legend */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {Object.entries(CLUSTER_LABELS).map(([key, val]) => (
            <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: sw.textMuted }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: val.color }} />
              {isPtBr ? val.labelPt : val.label}
            </div>
          ))}
        </div>

        {/* Show vectors toggle */}
        <button
          onClick={() => setShowVectors(v => !v)}
          style={{
            fontSize: '12px',
            padding: '4px 12px',
            borderRadius: '8px',
            border: `1px solid ${sw.surface}`,
            background: showVectors ? sw.cyan : 'transparent',
            color: showVectors ? '#fff' : sw.textMuted,
            cursor: 'pointer',
            fontWeight: '600',
          }}
        >
          {isPtBr ? 'Ver vetores' : 'Show vectors'}
        </button>
      </div>

      {/* Vector panel */}
      {showVectors && (
        <div style={{
          background: sw.void,
          borderRadius: '14px',
          border: `1px solid ${sw.surface}`,
          padding: '14px',
          fontSize: '12px',
        }}>
          <div style={{ fontWeight: '700', marginBottom: '8px', color: '#e2e8f0' }}>
            {isPtBr ? 'Vetores de exemplo (4 dimensões de 768):' : 'Sample vectors (4 of 768 dims):'}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '6px' }}>
            {POINTS.slice(0, 6).map(p => (
              <div key={p.word} style={{ fontFamily: 'monospace', fontSize: '11px', color: p.color }}>
                {isPtBr ? p.wordPt : p.word}: [{p.vector.join(', ')}]
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Distance measurement */}
      {distance && (
        <div style={{
          background: sw.void,
          borderRadius: '14px',
          border: `1px solid #f43f5e44`,
          padding: '12px 16px',
          fontSize: '13px',
          color: '#e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <span style={{ color: selectedA!.color, fontWeight: '700' }}>
              {isPtBr ? selectedA!.wordPt : selectedA!.word}
            </span>
            <span style={{ color: sw.textMuted, margin: '0 8px' }}>↔</span>
            <span style={{ color: selectedB!.color, fontWeight: '700' }}>
              {isPtBr ? selectedB!.wordPt : selectedB!.word}
            </span>
            <span style={{ color: sw.textMuted, margin: '0 8px' }}>=</span>
            <span style={{ color: '#f43f5e', fontWeight: '700', fontFamily: 'monospace' }}>
              {distance}
            </span>
          </div>
          <div style={{ fontSize: '11px', color: sw.textMuted }}>
            {isPtBr ? copy.distanceLabel : 'Semantic distance'}
          </div>
          <button
            onClick={resetSelection}
            style={{
              fontSize: '11px',
              padding: '2px 8px',
              borderRadius: '6px',
              border: `1px solid ${sw.surface}`,
              background: 'transparent',
              color: sw.textMuted,
              cursor: 'pointer',
            }}
          >
            {isPtBr ? 'Limpar' : 'Clear'}
          </button>
        </div>
      )}

      {/* Instruction */}
      <div style={{
        fontSize: '11px',
        color: sw.textMuted,
        textAlign: 'center',
        lineHeight: '1.5',
      }}>
        {isPtBr
          ? 'Clique em 2 pontos para medir a distância semântica. Pontos do mesmo cluster ficam próximos.'
          : 'Click 2 points to measure semantic distance. Points in the same cluster stay close.'}
      </div>
    </div>
  );
});
