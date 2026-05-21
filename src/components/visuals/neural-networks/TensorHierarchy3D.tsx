import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { sw } from '../../../theme/tokens';

export type TensorLevel = 0 | 1 | 2 | 3 | 4;

interface Props {
  activeLevel: TensorLevel;
  copy: {
    dimensionLabel: string;
    shapeLabel: string;
    physicsLabel: string;
    mlLabel: string;
    footer: string;
  };
}

interface LevelData {
  shape: string;
  dim: string;
  physics: string;
  ml: string;
}

const levels: TensorLevel[] = [0, 1, 2, 3, 4];

function getLevelData(level: TensorLevel): LevelData {
  switch (level) {
    case 0:
      return { shape: '()', dim: '0D', physics: 'Temperatura em um ponto (25°C)', ml: 'Loss scalar: tensor(0.42)' };
    case 1:
      return { shape: '(3,)', dim: '1D', physics: 'Velocidade: [x, y, z]', ml: 'Embedding: [0.2, -0.5, 0.8]' };
    case 2:
      return { shape: '(2, 3)', dim: '2D', physics: 'Stress em um material (σᵢⱼ)', ml: 'Batch de embeddings: [[...], [...]]' };
    case 3:
      return { shape: '(2, 2, 3)', dim: '3D', physics: 'Curvatura do espaço-tempo (Rᵢⱼₖₗ)', ml: 'Batch de imagens RGB: [N, C, H, W]' };
    case 4:
      return { shape: '(8, 2, 3, 4)', dim: '4D', physics: 'Tensor de curvatura de Riemann (4 índices)', ml: 'Batch de vídeos: [frames, batch, canais, altura]' };
  }
}

const levelLabels = ['Escalar', 'Vetor', 'Matriz', 'Tensor 3D', 'Tensor 4D'];
const levelShapes = ['()', '(3,)', '(2, 3)', '(2, 2, 3)', '(8, 2, 3, 4)'];

function getColorForLevel(idx: number): string {
  const colors = ['#00e5ff', '#00e5ff', '#00e5ff', '#a855f7', '#fbbf24'];
  return colors[idx] ?? '#00e5ff';
}

/* ─── Three.js scene ─── */
const Hierarchy3DCanvas: React.FC<{ level: TensorLevel }> = React.memo(({ level }) => {
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

  const hexColor = getColorForLevel(level);

  const buildMeshes = useCallback((l: TensorLevel, material: THREE.MeshStandardMaterial): THREE.Group => {
    const group = new THREE.Group();
    switch (l) {
      case 0: {
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
        group.add(sphere);
        break;
      }
      case 1: {
        for (let i = 0; i < 3; i++) {
          const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 24), material);
          sphere.position.set((i - 1) * 0.9, 0, 0);
          group.add(sphere);
        }
        break;
      }
      case 2: {
        for (let row = 0; row < 2; row++) {
          for (let col = 0; col < 3; col++) {
            const box = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), material);
            box.position.set((col - 1) * 0.75, 0, (row - 0.5) * 0.75);
            group.add(box);
          }
        }
        break;
      }
      case 3: {
        for (let d = 0; d < 2; d++) {
          for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 3; col++) {
              const box = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.4), material);
              box.position.set((col - 1) * 0.65, (d - 0.5) * 0.75, (row - 0.5) * 0.65);
              group.add(box);
            }
          }
        }
        break;
      }
      case 4: {
        for (let t = 0; t < 2; t++) {
          const subGroup = new THREE.Group();
          for (let d = 0; d < 2; d++) {
            for (let row = 0; row < 3; row++) {
              for (let col = 0; col < 4; col++) {
                const box = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.25, 0.25), material);
                box.position.set((col - 1.5) * 0.45, (d - 0.5) * 0.55, (row - 1) * 0.4);
                subGroup.add(box);
              }
            }
          }
          subGroup.position.x = (t - 0.5) * 1.6;
          group.add(subGroup);
        }
        break;
      }
    }
    return group;
  }, []);

  useEffect(() => {
    if (!supportsWebGL || !mountRef.current) return;
    const mountNode = mountRef.current;

    // Cleanup previous
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
    camera.position.set(3.5, 2.5, 4);
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
    controls.maxDistance = 9;
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

    // Material
    const colorInt = parseInt(hexColor.replace('#', ''), 16);
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: colorInt,
      emissive: colorInt,
      emissiveIntensity: 0.15,
      roughness: 0.3,
      metalness: 0.2,
      transparent: true,
      opacity: 0.88,
    });
    const group = buildMeshes(level, mainMaterial);
    scene.add(group);
    meshGroupRef.current = group;

    const resize = () => {
      const w = mountNode.clientWidth;
      const h = mountNode.clientHeight;
      if (!w || !h) return;
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
  }, [level, supportsWebGL, buildMeshes, hexColor]);

  if (!supportsWebGL) {
    return <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', color: 'var(--sw-text-muted)', fontSize: 13 }}>WebGL não suportado</div>;
  }

  return <div ref={mountRef} style={{ width: '100%', height: 220, minHeight: 220 }} />;
});

/* ─── Main Component ─── */
export const TensorHierarchy3D: React.FC<{
  activeLevel: TensorLevel;
  onLevelChange: (level: TensorLevel) => void;
  copy: Props['copy'];
}> = ({ activeLevel, onLevelChange, copy }) => {
  const data = getLevelData(activeLevel);
  const accentColor = getColorForLevel(activeLevel);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, height: '100%', overflow: 'auto' }}>
      {/* Level selector buttons */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {levels.map(l => {
          const active = l === activeLevel;
          const color = getColorForLevel(l);
          return (
            <button
              key={l}
              type="button"
              onClick={() => onLevelChange(l)}
              style={{
                padding: '8px 14px',
                borderRadius: sw.cardBorderRadius,
                border: active ? `1px solid ${color}88` : sw.borderSubtle,
                background: active
                  ? `linear-gradient(135deg, ${color}38, rgba(255,255,255,0.04))`
                  : 'rgba(255, 255, 255, 0.03)',
                color: active ? 'var(--sw-text)' : 'var(--sw-text-dim)',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                transition: sw.transitionFast,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              {levelLabels[l]} {levelShapes[l]}
            </button>
          );
        })}
      </div>

      {/* 3D Container */}
      <div style={{
        borderRadius: 18,
        overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.06)',
        background: `radial-gradient(circle at 18% 18%, ${accentColor}28, transparent 28%), radial-gradient(circle at 84% 12%, rgba(168, 85, 247, 0.1), transparent 26%), linear-gradient(180deg, rgba(8, 12, 24, 0.95), rgba(7, 10, 20, 0.98))`,
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 24px 42px rgba(0,0,0,0.24)',
      }}>
        <Hierarchy3DCanvas level={activeLevel} />
      </div>

      {/* Info cards: Dimension, Shape, Physics, ML */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{
          padding: '10px 14px', borderRadius: sw.cardBorderRadius,
          background: 'rgba(0, 229, 255, 0.06)', border: '1px solid rgba(0, 229, 255, 0.15)',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 4 }}>
            {copy.dimensionLabel}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: 'var(--sw-cyan)' }}>
            {data.dim}
          </div>
        </div>
        <div style={{
          padding: '10px 14px', borderRadius: sw.cardBorderRadius,
          background: 'rgba(168, 85, 247, 0.06)', border: '1px solid rgba(168, 85, 247, 0.15)',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 4 }}>
            {copy.shapeLabel}
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", color: 'var(--sw-purple)' }}>
            {data.shape}
          </div>
        </div>
        <div style={{
          padding: '10px 14px', borderRadius: sw.cardBorderRadius,
          background: 'rgba(74, 222, 128, 0.06)', border: '1px solid rgba(74, 222, 128, 0.15)',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 4 }}>
            {copy.physicsLabel}
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, fontWeight: 600, color: '#4ade80' }}>
            {data.physics}
          </div>
        </div>
        <div style={{
          padding: '10px 14px', borderRadius: sw.cardBorderRadius,
          background: 'rgba(0, 229, 255, 0.06)', border: '1px solid rgba(0, 229, 255, 0.15)',
        }}>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-text-muted)', marginBottom: 4 }}>
            {copy.mlLabel}
          </div>
          <div style={{ fontSize: 12, lineHeight: 1.5, fontWeight: 600, color: 'var(--sw-cyan)' }}>
            {data.ml}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--sw-text-muted)', paddingTop: 2 }}>
        {copy.footer}
      </div>
    </div>
  );
};
