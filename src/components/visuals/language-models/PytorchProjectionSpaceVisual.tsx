import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { PytorchProjectionSpaceCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface PytorchProjectionSpaceVisualProps {
  copy: PytorchProjectionSpaceCopy;
}

const STAGE_COLORS = [sw.cyan, sw.purple, sw.pink];

function disposeObject(object: THREE.Object3D) {
  object.traverse(node => {
    const mesh = node as THREE.Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach(item => item.dispose());
    } else if (material) {
      material.dispose();
    }
  });
}

interface SceneRefs {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  renderer: THREE.WebGLRenderer;
  inputGroup: THREE.Group;
  matrixGroup: THREE.Group;
  outputGroup: THREE.Group;
  beams: THREE.Line[];
  pulses: THREE.Mesh[];
  destroy: () => void;
}

/**
 * Build a Three.js scene that visualizes the (B, T, C) -> (B, T, V) projection
 * performed by `nn.Linear`. The input tensor is rendered as a grid of small
 * C-width vector bars on the left, the weight matrix W as a cell-grid plane in
 * the middle, and the resulting V-width logits as bars on the right. Animated
 * pulses run along bezier beams from input through the matrix to output to make
 * the matmul tangible.
 */
function buildScene(host: HTMLDivElement): SceneRefs {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(sw.void);
  scene.fog = new THREE.Fog(sw.void, 14, 30);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
  camera.position.set(0, 4.5, 13);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(new THREE.Color(sw.void), 1);
  renderer.domElement.style.width = '100%';
  renderer.domElement.style.height = '100%';
  renderer.domElement.style.display = 'block';
  host.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.enablePan = false;
  controls.minDistance = 7;
  controls.maxDistance = 22;
  controls.maxPolarAngle = Math.PI * 0.55;
  controls.target.set(0, 1.2, 0);

  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  const directional = new THREE.DirectionalLight(0xffffff, 1.1);
  directional.position.set(6, 12, 8);
  scene.add(ambient, directional);

  const grid = new THREE.GridHelper(20, 20, 0x334155, 0x1f2937);
  const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
  gridMaterials.forEach(material => {
    material.opacity = 0.16;
    material.transparent = true;
  });
  grid.position.y = -0.01;
  scene.add(grid);

  const B = 2;
  const T = 4;
  const C = 4;
  const V = 6;

  // INPUT (B, T, C)
  const inputGroup = new THREE.Group();
  inputGroup.name = 'input';
  const inputX = -5.4;
  for (let b = 0; b < B; b++) {
    for (let t = 0; t < T; t++) {
      for (let c = 0; c < C; c++) {
        const h = 0.25 + Math.random() * 0.6;
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(0.22, h, 0.22),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(sw.cyan),
            emissive: new THREE.Color(sw.cyan),
            emissiveIntensity: 0.22,
            roughness: 0.4,
            metalness: 0.2,
          }),
        );
        cube.position.set(
          inputX + c * 0.28,
          h / 2,
          -1.6 + t * 0.4 + b * 1.6,
        );
        inputGroup.add(cube);
      }
    }
  }
  scene.add(inputGroup);

  // MATRIX W (C x V)
  const matrixGroup = new THREE.Group();
  matrixGroup.name = 'matrix';
  const cellSize = 0.34;
  const matrixCenterY = 1.8;
  for (let c = 0; c < C; c++) {
    for (let v = 0; v < V; v++) {
      const x = -((V - 1) * cellSize) / 2 + v * cellSize;
      const y = matrixCenterY + ((C - 1) * cellSize) / 2 - c * cellSize;
      const intensity = 0.4 + Math.random() * 0.6;
      const cell = new THREE.Mesh(
        new THREE.BoxGeometry(cellSize * 0.9, cellSize * 0.9, 0.06),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(sw.purple),
          emissive: new THREE.Color(sw.purple),
          emissiveIntensity: 0.08 + intensity * 0.3,
          roughness: 0.6,
          metalness: 0.05,
        }),
      );
      cell.position.set(x, y, 0);
      matrixGroup.add(cell);
    }
  }
  const frame = new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(V * cellSize + 0.1, C * cellSize + 0.1, 0.08)),
    new THREE.LineBasicMaterial({ color: new THREE.Color(sw.purple) }),
  );
  frame.position.set(0, matrixCenterY, 0);
  matrixGroup.add(frame);
  scene.add(matrixGroup);

  // OUTPUT (B, T, V)
  const outputGroup = new THREE.Group();
  outputGroup.name = 'output';
  const outputX = 5.4;
  for (let b = 0; b < B; b++) {
    for (let t = 0; t < T; t++) {
      for (let v = 0; v < V; v++) {
        const h = 0.2 + Math.random() * 0.9;
        const cube = new THREE.Mesh(
          new THREE.BoxGeometry(0.22, h, 0.22),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(sw.pink),
            emissive: new THREE.Color(sw.pink),
            emissiveIntensity: 0.22,
            roughness: 0.4,
            metalness: 0.2,
          }),
        );
        cube.position.set(
          outputX + v * 0.28,
          h / 2,
          -1.6 + t * 0.4 + b * 1.6,
        );
        outputGroup.add(cube);
      }
    }
  }
  scene.add(outputGroup);

  // BEAMS through the matrix
  const beams: THREE.Line[] = [];
  const beamColors = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b', '#38bdf8'];
  const beamCount = 8;
  for (let i = 0; i < beamCount; i++) {
    const startX = inputX + Math.random() * (C - 1) * 0.28;
    const startZ = -1.6 + Math.random() * (T * 0.4 + 1.6);
    const startY = 0.3 + Math.random() * 0.5;
    const start = new THREE.Vector3(startX, startY, startZ);
    const mid = new THREE.Vector3(0, matrixCenterY, 0);
    const endX = outputX + Math.random() * (V - 1) * 0.28;
    const endZ = -1.6 + Math.random() * (T * 0.4 + 1.6);
    const endY = 0.3 + Math.random() * 0.9;
    const end = new THREE.Vector3(endX, endY, endZ);

    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
    const points = curve.getPoints(48);
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(beamColors[i % beamColors.length]),
      transparent: true,
      opacity: 0.55,
    });
    const line = new THREE.Line(geom, mat);
    line.userData.curve = curve;
    line.userData.color = beamColors[i % beamColors.length];
    scene.add(line);
    beams.push(line);
  }

  const pulses: THREE.Mesh[] = beams.map(beam => {
    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.09, 12, 12),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(beam.userData.color),
        emissive: new THREE.Color(beam.userData.color),
        emissiveIntensity: 0.9,
      }),
    );
    pulse.userData.beam = beam;
    pulse.userData.t = Math.random();
    scene.add(pulse);
    return pulse;
  });

  let frame_id = 0;
  let lastResizeKey = '';
  const renderLoop = () => {
    frame_id = window.requestAnimationFrame(renderLoop);

    for (const pulse of pulses) {
      const beam = pulse.userData.beam as THREE.Line;
      const curve = beam.userData.curve as THREE.QuadraticBezierCurve3;
      pulse.userData.t = (pulse.userData.t + 0.006) % 1;
      const point = curve.getPoint(pulse.userData.t);
      pulse.position.copy(point);
    }

    const t = performance.now() * 0.00012;
    inputGroup.rotation.y = Math.sin(t) * 0.05;
    outputGroup.rotation.y = -Math.sin(t) * 0.05;
    matrixGroup.rotation.y = Math.sin(t) * 0.12;

    controls.update();
    renderer.render(scene, camera);
  };

  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (width === 0 || height === 0) return;
    const key = `${width}x${height}`;
    if (key === lastResizeKey) return;
    lastResizeKey = key;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
  };
  resize();
  const ro = new ResizeObserver(resize);
  ro.observe(host);

  renderLoop();

  const destroy = () => {
    window.cancelAnimationFrame(frame_id);
    ro.disconnect();
    controls.dispose();
    [inputGroup, matrixGroup, outputGroup, ...beams, ...pulses].forEach(disposeObject);
    renderer.dispose();
    if (renderer.domElement.parentNode === host) {
      host.removeChild(renderer.domElement);
    }
    scene.clear();
  };

  return { scene, camera, controls, renderer, inputGroup, matrixGroup, outputGroup, beams, pulses, destroy };
}

export const PytorchProjectionSpaceVisual = React.memo(({ copy }: PytorchProjectionSpaceVisualProps) => {
  const [activeStage, setActiveStage] = useState(0);
  const stages = copy.blueprintPanel.stages;
  const stage = stages[activeStage] ?? stages[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<SceneRefs | null>(null);

  const activeAccent = useMemo(() => STAGE_COLORS[activeStage] ?? sw.cyan, [activeStage]);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;

    const refs = buildScene(host);
    sceneRef.current = refs;

    return () => {
      refs.destroy();
      sceneRef.current = null;
    };
  }, []);

  // React to active stage: highlight the relevant group, dim the others
  useEffect(() => {
    const refs = sceneRef.current;
    if (!refs) return;
    const groups = [refs.inputGroup, refs.matrixGroup, refs.outputGroup];
    groups.forEach((g, i) => {
      const isActive = i === activeStage;
      g.traverse(node => {
        const mesh = node as THREE.Mesh;
        const material = mesh.material as THREE.MeshStandardMaterial | undefined;
        if (material && 'emissiveIntensity' in material) {
          material.emissiveIntensity = isActive ? 0.55 : 0.12;
          material.opacity = isActive ? 1 : 0.55;
          material.transparent = !isActive;
        }
      });
    });
    const targets = [
      new THREE.Vector3(-5, 1.2, 0),
      new THREE.Vector3(0, 1.8, 0),
      new THREE.Vector3(5, 1.2, 0),
    ];
    refs.controls.target.copy(targets[activeStage] ?? targets[0]);
    refs.controls.update();
  }, [activeStage]);

  return (
    <PytorchTabbedCodeLayout
      tabs={copy.tabs}
      codePanel={copy.codePanel}
      altPanel={(
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.blueprintPanel.title}</div>
            {copy.blueprintPanel.subtitle && (
              <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.blueprintPanel.subtitle}</div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${stages.length}, minmax(0, 1fr))`, gap: 8 }}>
            {stages.map((item, index) => {
              const accent = STAGE_COLORS[index % STAGE_COLORS.length];
              const isActive = index === activeStage;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setActiveStage(index)}
                  style={{
                    border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                    borderRadius: 14,
                    background: isActive ? `${accent}18` : sw.surface,
                    padding: '10px 12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    color: isActive ? accent : sw.textDim,
                    boxShadow: isActive ? `0 10px 24px ${accent}12` : 'none',
                  }}
                >
                  <div style={{ fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.label}</div>
                  <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, lineHeight: 1.35, color: isActive ? sw.text : sw.textDim }}>
                    {item.title}
                  </div>
                </button>
              );
            })}
          </div>

          <div style={{ height: 8, borderRadius: 999, background: sw.surfaceLight, overflow: 'hidden' }}>
            <div
              style={{
                width: `${stages.length > 1 ? (activeStage / (stages.length - 1)) * 100 : 100}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${STAGE_COLORS[0]}, ${STAGE_COLORS[2]})`,
                transition: 'width 220ms ease',
              }}
            />
          </div>

          <div
            style={{
              border: `1px solid ${sw.borderSubtle}`,
              borderRadius: 18,
              background: sw.surface,
              padding: 10,
              minHeight: 340,
              position: 'relative',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 8,
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                zIndex: 1,
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: sw.cyan, fontFamily: sw.fontMono, padding: '4px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.4)' }}>
                  (B, T, C)
                </span>
                <span style={{ fontSize: 10, fontWeight: 800, color: sw.purple, fontFamily: sw.fontMono, padding: '4px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.4)' }}>
                  W: C × V
                </span>
                <span style={{ fontSize: 10, fontWeight: 800, color: sw.pink, fontFamily: sw.fontMono, padding: '4px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.4)' }}>
                  (B, T, V)
                </span>
              </div>
              <div style={{ alignSelf: 'flex-end', fontSize: 10, fontWeight: 700, color: sw.textMuted, padding: '4px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.4)' }}>
                arraste para girar · scroll para zoom
              </div>
            </div>
            <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 340, borderRadius: 14, overflow: 'hidden' }} />
          </div>

          <div
            style={{
              border: `1px solid ${activeAccent}33`,
              borderRadius: 18,
              background: `linear-gradient(180deg, ${activeAccent}10, rgba(255,255,255,0.01))`,
              padding: 16,
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: activeAccent }}>
              Etapa ativa
            </div>
            <div style={{ marginTop: 6, fontSize: 16, fontWeight: 700, lineHeight: 1.35, color: sw.text }}>{stage.title}</div>
            <div
              style={{
                marginTop: 10,
                padding: '8px 10px',
                borderRadius: 10,
                background: `${activeAccent}14`,
                border: `1px solid ${activeAccent}33`,
                fontFamily: sw.fontMono,
                fontSize: 12,
                fontWeight: 700,
                color: activeAccent,
                display: 'inline-flex',
              }}
            >
              {stage.shape}
            </div>
            <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.65, color: sw.text }}>{stage.body}</div>
            <div style={{ marginTop: 10, fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{stage.reading}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.pink, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {copy.blueprintPanel.invariantsTitle}
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.blueprintPanel.invariants.map(item => (
                  <div key={item} style={{ fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.cyan, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {copy.blueprintPanel.diagnosticsTitle}
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.blueprintPanel.diagnostics.map(item => (
                  <div key={item} style={{ fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {copy.blueprintPanel.footer && (
            <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.blueprintPanel.footer}</div>
          )}
        </div>
      )}
    />
  );
});
