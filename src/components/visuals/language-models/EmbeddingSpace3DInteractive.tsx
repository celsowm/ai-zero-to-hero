import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import type { EmbeddingSpace3DInteractiveCopy } from '../../../types/slide';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';
import { PanelCard } from '../PanelCard';
import { CodeBlock } from '../../CodeBlock';
import { sw } from '../../../theme/tokens';

interface Props {
  copy: EmbeddingSpace3DInteractiveCopy;
}

interface SemanticPoint {
  label: string;
  color: string;
  cluster: string;
  vector: number[];
}

const BASE_POINTS: SemanticPoint[] = [
  { label: 'cat', color: '#3b82f6', cluster: 'animals', vector: [0.91, 0.74, -0.31, 0.44, 0.58, -0.19, 0.38, 0.67, -0.53, 0.21, 0.35, -0.12] },
  { label: 'dog', color: '#3b82f6', cluster: 'animals', vector: [0.87, 0.78, -0.28, 0.49, 0.61, -0.14, 0.41, 0.62, -0.49, 0.24, 0.31, -0.09] },
  { label: 'wolf', color: '#60a5fa', cluster: 'animals', vector: [0.82, 0.69, -0.35, 0.38, 0.56, -0.27, 0.36, 0.58, -0.55, 0.18, 0.28, -0.17] },
  { label: 'king', color: '#f59e0b', cluster: 'royalty', vector: [-0.41, 0.95, 0.27, 0.83, -0.23, 0.71, -0.44, 0.19, 0.51, -0.36, 0.66, 0.22] },
  { label: 'queen', color: '#f59e0b', cluster: 'royalty', vector: [-0.36, 0.89, 0.33, 0.78, -0.18, 0.75, -0.39, 0.24, 0.47, -0.31, 0.63, 0.27] },
  { label: 'prince', color: '#fbbf24', cluster: 'royalty', vector: [-0.28, 0.84, 0.21, 0.69, -0.11, 0.63, -0.33, 0.13, 0.41, -0.23, 0.54, 0.18] },
  { label: 'apple', color: '#10b981', cluster: 'fruits', vector: [0.67, -0.32, 0.76, -0.08, 0.28, 0.49, 0.14, -0.53, 0.39, 0.55, -0.27, 0.64] },
  { label: 'banana', color: '#10b981', cluster: 'fruits', vector: [0.72, -0.41, 0.69, -0.13, 0.31, 0.42, 0.09, -0.58, 0.43, 0.49, -0.22, 0.59] },
  { label: 'orange', color: '#34d399', cluster: 'fruits', vector: [0.64, -0.27, 0.81, -0.02, 0.24, 0.52, 0.19, -0.46, 0.36, 0.57, -0.31, 0.67] },
  { label: 'laptop', color: '#a855f7', cluster: 'tech', vector: [-0.73, 0.11, -0.68, 0.59, 0.87, 0.16, -0.52, 0.48, -0.24, 0.92, -0.39, 0.31] },
  { label: 'internet', color: '#a855f7', cluster: 'tech', vector: [-0.65, 0.05, -0.74, 0.63, 0.79, 0.12, -0.46, 0.53, -0.18, 0.88, -0.34, 0.36] },
];

function projectTo3D(vector: number[], activeDims: number): THREE.Vector3 {
  let x = 0;
  let y = 0;
  let z = 0;
  for (let i = 0; i < activeDims; i++) {
    const v = vector[i] ?? 0;
    x += v * Math.cos(0.41 * i);
    y += v * Math.sin(0.37 * i);
    z += v * ((i % 2 === 0 ? 1 : -1) * 0.6 + Math.cos(0.23 * i) * 0.2);
  }
  const norm = Math.sqrt(activeDims);
  return new THREE.Vector3((x / norm) * 3.2, (y / norm) * 3.2, (z / norm) * 3.2);
}

function retainedSignalPercent(activeDims: number): number {
  // Intuition proxy: in a D-dimensional space, a fixed 3D projection keeps roughly 3/D axes of freedom.
  const ratio = Math.min(1, 3 / Math.max(3, activeDims));
  return Math.round(ratio * 100);
}

const pointLegendStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: 10,
  alignItems: 'center',
};

export const EmbeddingSpace3DInteractive = React.memo(({ copy }: Props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [activeDims, setActiveDims] = useState(12);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const pointsGroupRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<number | null>(null);
  const hoverLabelRef = useRef<HTMLDivElement | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const pointerRef = useRef(new THREE.Vector2());

  const projected = useMemo(
    () => BASE_POINTS.map((p) => ({ ...p, pos: projectTo3D(p.vector, activeDims) })),
    [activeDims],
  );
  const retained = useMemo(() => retainedSignalPercent(activeDims), [activeDims]);

  useEffect(() => {
    const host = mountRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.Fog(0x0a0f1a, 12, 26);
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(7, 5.8, 7.2);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    host.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 4;
    controls.maxDistance = 18;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    scene.add(new THREE.HemisphereLight(0xbfd3ff, 0x080b14, 1.25));
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(5, 7, 4);
    scene.add(keyLight);
    const cyan = new THREE.PointLight(0x00e5ff, 0.9, 20, 2);
    cyan.position.set(-4, 3, 2);
    scene.add(cyan);
    const pink = new THREE.PointLight(0xff2e97, 0.9, 18, 2);
    pink.position.set(4, 2, -2);
    scene.add(pink);

    const grid = new THREE.GridHelper(12, 12, 0x334a6b, 0x223148);
    (Array.isArray(grid.material) ? grid.material : [grid.material]).forEach((m) => {
      m.transparent = true;
      m.opacity = 0.2;
    });
    scene.add(grid);

    const axes = new THREE.AxesHelper(3.5);
    (axes.material as THREE.Material).transparent = true;
    (axes.material as THREE.Material).opacity = 0.6;
    scene.add(axes);

    const label = document.createElement('div');
    label.style.position = 'absolute';
    label.style.pointerEvents = 'none';
    label.style.transform = 'translate(-50%, -140%)';
    label.style.padding = '4px 8px';
    label.style.borderRadius = '8px';
    label.style.fontSize = '11px';
    label.style.fontWeight = '700';
    label.style.background = 'rgba(6,10,20,0.86)';
    label.style.color = '#e2e8f0';
    label.style.border = '1px solid rgba(148,163,184,0.32)';
    label.style.display = 'none';
    host.appendChild(label);
    hoverLabelRef.current = label;

    const resize = () => {
      if (!rendererRef.current || !cameraRef.current || !mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      if (!w || !h) return;
      rendererRef.current.setSize(w, h, false);
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const onPointerMove = (event: PointerEvent) => {
      if (!rendererRef.current || !cameraRef.current || !pointsGroupRef.current || !mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      pointerRef.current.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointerRef.current.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycasterRef.current.setFromCamera(pointerRef.current, cameraRef.current);
      const hits = raycasterRef.current.intersectObjects(pointsGroupRef.current.children, false);
      if (!hits.length || !hoverLabelRef.current) {
        hoverLabelRef.current!.style.display = 'none';
        return;
      }
      const hit = hits[0].object as THREE.Mesh;
      const point = hit.userData.point as SemanticPoint | undefined;
      if (!point) return;
      const screen = hit.position.clone().project(cameraRef.current);
      const x = ((screen.x + 1) / 2) * rect.width;
      const y = ((-screen.y + 1) / 2) * rect.height;
      hoverLabelRef.current.textContent = `${point.label} · ${point.cluster}`;
      hoverLabelRef.current.style.left = `${x}px`;
      hoverLabelRef.current.style.top = `${y}px`;
      hoverLabelRef.current.style.display = 'block';
    };
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('pointerleave', () => {
      if (hoverLabelRef.current) hoverLabelRef.current.style.display = 'none';
    });

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      ro.disconnect();
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      controls.dispose();
      renderer.dispose();
      if (label.parentNode) label.parentNode.removeChild(label);
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, []);

  useEffect(() => {
    if (!sceneRef.current) return;
    if (pointsGroupRef.current) {
      sceneRef.current.remove(pointsGroupRef.current);
      pointsGroupRef.current.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
    }

    const group = new THREE.Group();
    const sphereGeo = new THREE.SphereGeometry(0.24, 24, 24);

    projected.forEach((point) => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(point.color),
        emissive: new THREE.Color(point.color),
        emissiveIntensity: 0.18,
        roughness: 0.32,
        metalness: 0.24,
      });
      const sphere = new THREE.Mesh(sphereGeo, mat);
      sphere.position.copy(point.pos);
      sphere.userData.point = point;
      group.add(sphere);
    });

    // connect nearest same-cluster neighbor
    const clusters = new Map<string, Array<{ pos: THREE.Vector3; color: string }>>();
    projected.forEach((p) => {
      const arr = clusters.get(p.cluster) ?? [];
      arr.push({ pos: p.pos, color: p.color });
      clusters.set(p.cluster, arr);
    });
    clusters.forEach((pts) => {
      for (let i = 0; i < pts.length - 1; i++) {
        const a = pts[i].pos;
        const b = pts[i + 1].pos;
        const geo = new THREE.BufferGeometry().setFromPoints([a, b]);
        const mat = new THREE.LineBasicMaterial({ color: new THREE.Color(pts[i].color), transparent: true, opacity: 0.35 });
        const line = new THREE.Line(geo, mat);
        group.add(line);
      }
    });

    pointsGroupRef.current = group;
    sceneRef.current.add(group);
  }, [projected]);

  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
      <TabsBar
        ariaLabel={copy.tabs[activeTab]?.label ?? 'Embedding tabs'}
        items={copy.tabs}
        activeIndex={activeTab}
        onChange={setActiveTab}
      />

      <TabbedPanelSurface>
        {activeTab === 0 ? (
          <PanelCard minHeight={0} gap={12} style={{ height: '100%', overflow: 'hidden' }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.codePanel.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.codePanel.description}</div>
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <CodeBlock
                code=""
                language="python"
                sourceRef={copy.codePanel.source}
                explanations={copy.codePanel.codeExplanations}
              />
            </div>
          </PanelCard>
        ) : (
          <PanelCard minHeight={0} gap={12} style={{ height: '100%', overflow: 'hidden' }}>
            <div style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: sw.cyan, fontWeight: 800 }}>
              {copy.interactivePanel.eyebrow}
            </div>
            <div style={{ fontSize: 19, fontWeight: 700, color: sw.text }}>{copy.interactivePanel.title}</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.interactivePanel.description}</div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 10, alignItems: 'center' }}>
              <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span style={{ fontSize: 11, color: sw.textMuted, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 700 }}>
                  {copy.interactivePanel.dimensionsLabel}: {activeDims}
                </span>
                <input
                  type="range"
                  min={3}
                  max={48}
                  step={1}
                  value={activeDims}
                  onChange={(e) => setActiveDims(Number(e.target.value))}
                  style={{ accentColor: sw.cyan }}
                />
              </label>
              <div style={{ fontSize: 12, color: sw.textDim, fontFamily: sw.fontMono }}>
                {copy.interactivePanel.projectionLabel}: 3D
              </div>
            </div>

            <div
              ref={mountRef}
              style={{
                position: 'relative',
                flex: '1 1 auto',
                minHeight: 280,
                borderRadius: 16,
                overflow: 'hidden',
                border: sw.borderSubtle,
                background:
                  'radial-gradient(circle at 15% 15%, rgba(0,229,255,0.16), transparent 28%), radial-gradient(circle at 85% 15%, rgba(255,46,151,0.14), transparent 26%), linear-gradient(180deg, rgba(8,12,24,0.95), rgba(7,10,20,0.98))',
              }}
            />

            <div style={pointLegendStyle}>
              <div style={{ fontSize: 12, color: sw.textDim }}>
                {copy.interactivePanel.retainedLabel}: <strong style={{ color: sw.cyan }}>{retained}%</strong>
              </div>
              <div style={{ fontSize: 12, color: sw.textMuted }}>{copy.interactivePanel.hint}</div>
            </div>

            <div style={{ border: sw.borderSubtle, borderRadius: 12, padding: '10px 12px', background: sw.tintStrong }}>
              <div style={{ fontSize: 12, fontWeight: 800, color: sw.pink, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {copy.interactivePanel.beyond3dTitle}
              </div>
              <div style={{ marginTop: 6, fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>
                {copy.interactivePanel.beyond3dBody}
              </div>
            </div>
          </PanelCard>
        )}
      </TabbedPanelSurface>
    </div>
  );
});

