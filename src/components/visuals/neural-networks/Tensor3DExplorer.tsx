import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { Tensor3DExplorerCopy } from '../../../types/slide';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { CodeBlock } from '../../CodeBlock';
import { PanelCard } from '../PanelCard';

interface Props {
  copy: Tensor3DExplorerCopy;
}

type TensorRank = 'scalar' | 'vector' | 'matrix' | 'tensor3d';

/* ─── Code Panel ─── */
const CodePanel: React.FC<{ copy: Tensor3DExplorerCopy['codePanel']; eyebrowLabel: string }> = ({ copy, eyebrowLabel }) => (
  <PanelCard minHeight={0} gap={12} style={{ height: '100%', overflow: 'hidden' }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)', marginBottom: 10 }}>
      {eyebrowLabel}
    </div>
    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>{copy.title}</div>
    <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)' }}>{copy.description}</div>
    <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
      <CodeBlock
        code={copy.code ?? ''}
        language="python"
        explanations={copy.codeExplanations}
        sourceRef={copy.source}
      />
    </div>
  </PanelCard>
);

/* ─── 3D Scene (canvas only, no buttons) ─── */
const Tensor3DCanvas: React.FC<{ rank: TensorRank }> = React.memo(({ rank }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const meshGroupRef = useRef<THREE.Group | null>(null);

  const [supportsWebGL] = useState(() => {
    if (typeof document === 'undefined') return false;
    try {
      const canvas = document.createElement('canvas');
      return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  });

  const buildMeshes = useCallback((r: TensorRank, material: THREE.MeshStandardMaterial): THREE.Group => {
    const group = new THREE.Group();
    switch (r) {
      case 'scalar': {
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
        group.add(sphere);
        break;
      }
      case 'vector': {
        for (let i = 0; i < 4; i++) {
          const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.25, 24, 24), material);
          sphere.position.set((i - 1.5) * 0.7, 0, 0);
          group.add(sphere);
        }
        break;
      }
      case 'matrix': {
        for (let row = 0; row < 3; row++) {
          for (let col = 0; col < 4; col++) {
            const box = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.45, 0.45), material);
            box.position.set((col - 1.5) * 0.65, 0, (row - 1) * 0.65);
            group.add(box);
          }
        }
        break;
      }
      case 'tensor3d': {
        for (let d = 0; d < 2; d++) {
          for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 4; col++) {
              const box = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), material);
              box.position.set((col - 1.5) * 0.55, (d - 0.5) * 0.65, (row - 1) * 0.55);
              group.add(box);
            }
          }
        }
        break;
      }
    }
    return group;
  }, []);

  useEffect(() => {
    if (!supportsWebGL || !mountRef.current) return;
    const mountNode = mountRef.current;

    // Cleanup
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    if (meshGroupRef.current && sceneRef.current) {
      sceneRef.current.remove(meshGroupRef.current);
      meshGroupRef.current.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          (Array.isArray(child.material) ? child.material : [child.material]).forEach(m => m.dispose());
        }
      });
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b1020, 10, 18);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(3, 2.5, 4);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountNode.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 2.5;
    controls.maxDistance = 8;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // Lights
    scene.add(new THREE.HemisphereLight(0xbfd3ff, 0x08111d, 1.2));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(4, 6, 3);
    scene.add(keyLight);
    const cyanLight = new THREE.PointLight(0x00e5ff, 1.0, 14, 2);
    cyanLight.position.set(2, 3, -1);
    scene.add(cyanLight);
    const pinkLight = new THREE.PointLight(0xff2e97, 0.8, 12, 2);
    pinkLight.position.set(-2, 2, 2);
    scene.add(pinkLight);

    // Grid
    const grid = new THREE.GridHelper(6, 12, 0x314566, 0x23334f);
    (Array.isArray(grid.material) ? grid.material : [grid.material]).forEach(m => { m.transparent = true; m.opacity = 0.18; });
    scene.add(grid);

    // Tensor meshes
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x00e5ff,
      emissive: 0x00e5ff,
      emissiveIntensity: 0.15,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.88,
    });
    const group = buildMeshes(rank, mainMaterial);
    scene.add(group);
    meshGroupRef.current = group;

    const resize = () => {
      const w = mountNode.clientWidth;
      const h = mountNode.clientHeight;
      if (!w || !h) return;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(mountNode);

    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      controls.update();
      group.rotation.y += 0.003;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      ro.disconnect();
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      if (meshGroupRef.current && sceneRef.current) {
        sceneRef.current.remove(meshGroupRef.current);
        meshGroupRef.current.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            (Array.isArray(child.material) ? child.material : [child.material]).forEach(m => m.dispose());
          }
        });
      }
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [rank, supportsWebGL, buildMeshes]);

  if (!supportsWebGL) {
    return <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: 'var(--sw-text-muted)', fontSize: 13 }}>WebGL não suportado</div>;
  }

  return <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: 350 }} />;
});

/* ─── Shared styles ─── */
const viewportShellStyle: React.CSSProperties = {
  position: 'relative',
  flex: 1,
  minHeight: 350,
  borderRadius: 18,
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.06)',
  background:
    'radial-gradient(circle at 18% 18%, rgba(0, 229, 255, 0.16), transparent 28%), radial-gradient(circle at 84% 12%, rgba(255, 46, 151, 0.14), transparent 26%), linear-gradient(180deg, rgba(8, 12, 24, 0.95), rgba(7, 10, 20, 0.98))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 24px 42px rgba(0,0,0,0.24)',
};

const infoCardStyle: React.CSSProperties = {
  padding: '10px 14px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.03)',
  border: '1px solid rgba(255,255,255,0.06)',
};

const infoLabelStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--sw-text-muted)',
  marginBottom: 4,
};

const infoValueStyle: React.CSSProperties = {
  fontSize: 14,
  fontWeight: 700,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  color: 'var(--sw-cyan)',
};

function getShapeValue(rank: TensorRank): string {
  switch (rank) { case 'scalar': return '()'; case 'vector': return '(4,)'; case 'matrix': return '(3, 4)'; case 'tensor3d': return '(2, 3, 4)'; }
}

function getRankValue(rank: TensorRank): string {
  switch (rank) { case 'scalar': return '0D'; case 'vector': return '1D'; case 'matrix': return '2D'; case 'tensor3d': return '3D'; }
}

function getRankLabel(rank: TensorRank, copy: Tensor3DExplorerCopy['interactivePanel']): string {
  switch (rank) { case 'scalar': return copy.scalarLabel; case 'vector': return copy.vectorLabel; case 'matrix': return copy.matrixLabel; case 'tensor3d': return copy.tensor3dLabel; }
}

const rankOptions: TensorRank[] = ['scalar', 'vector', 'matrix', 'tensor3d'];

/* ─── Main Component ─── */
export const Tensor3DExplorer = React.memo(({ copy }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeRank, setActiveRank] = useState<TensorRank>('scalar');

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 16, minHeight: 0 }}>
      <TabsBar ariaLabel={copy.interactivePanel.title} items={copy.tabs} activeIndex={activeTab} onChange={setActiveTab} />

      <TabbedPanelSurface>
        {activeTab === 0 ? (
          <CodePanel copy={copy.codePanel} eyebrowLabel={copy.tabs[0]?.label ?? 'Code'} />
        ) : (
          <PanelCard minHeight={0} gap={14} style={{ height: '100%', overflow: 'hidden' }}>
            {/* Eyebrow */}
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--sw-cyan)' }}>
              {copy.interactivePanel.eyebrow}
            </div>
            {/* Title */}
            <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em', color: 'var(--sw-text)' }}>
              {copy.interactivePanel.title}
            </div>
            {/* Description */}
            <div style={{ fontSize: 13.5, lineHeight: 1.65, color: 'var(--sw-text-dim)' }}>
              {copy.interactivePanel.description}
            </div>

            {/* Rank selector buttons — ONLY ONE SET */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {rankOptions.map(r => {
                const active = r === activeRank;
                return (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setActiveRank(r)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: 12,
                      border: active ? '1px solid #00e5ff88' : '1px solid rgba(255,255,255,0.06)',
                      background: active
                        ? 'linear-gradient(135deg, rgba(0, 229, 255, 0.22), rgba(255,255,255,0.04))'
                        : 'rgba(255,255,255,0.03)',
                      color: active ? 'var(--sw-text)' : 'var(--sw-text-dim)',
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 180ms ease',
                    }}
                  >
                    {getRankLabel(r, copy.interactivePanel)}
                  </button>
                );
              })}
            </div>

            {/* 3D Canvas */}
            <div style={viewportShellStyle}>
              <Tensor3DCanvas rank={activeRank} />
            </div>

            {/* Shape / Rank info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <div style={infoCardStyle}>
                <div style={infoLabelStyle}>{copy.interactivePanel.shapeLabel}</div>
                <div style={infoValueStyle}>{getShapeValue(activeRank)}</div>
              </div>
              <div style={infoCardStyle}>
                <div style={infoLabelStyle}>{copy.interactivePanel.rankLabel}</div>
                <div style={infoValueStyle}>{getRankValue(activeRank)}</div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--sw-text-muted)', paddingTop: 2 }}>
              {copy.interactivePanel.footer}
            </div>
          </PanelCard>
        )}
      </TabbedPanelSurface>
    </div>
  );
});
