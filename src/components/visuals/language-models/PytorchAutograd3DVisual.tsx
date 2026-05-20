import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { PytorchExecutionPipelineCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';
import { PytorchTabbedCodeLayout } from './PytorchTabbedCodeLayout';

interface PytorchAutograd3DVisualProps {
  copy: PytorchExecutionPipelineCopy;
}

const STEP_COLORS = [sw.cyan, sw.purple, sw.pink, sw.green, '#f59e0b'];

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

interface AutogradNode {
  id: string;
  label: string;
  position: THREE.Vector3;
  color: string;
}

interface AutogradEdge {
  from: string;
  to: string;
  gradLabel: string;
}

interface SceneHandles {
  destroy: () => void;
  setMode: (mode: 'forward' | 'backward') => void;
  setProgress: (t: number) => void;
}

function buildScene(host: HTMLDivElement, onReady?: () => void): SceneHandles {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(sw.void);
  scene.fog = new THREE.Fog(sw.void, 18, 38);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
  camera.position.set(0, 4.5, 14);

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
  controls.minDistance = 8;
  controls.maxDistance = 22;
  controls.maxPolarAngle = Math.PI * 0.6;
  controls.target.set(0, 1.0, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const directional = new THREE.DirectionalLight(0xffffff, 1.1);
  directional.position.set(6, 14, 8);
  scene.add(directional);

  const grid = new THREE.GridHelper(22, 22, 0x334155, 0x1f2937);
  const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
  gridMaterials.forEach(material => {
    material.opacity = 0.16;
    material.transparent = true;
  });
  scene.add(grid);

  // Computation graph node layout (depth axis = pipeline stages)
  const nodes: AutogradNode[] = [
    { id: 'x',     label: 'x',     position: new THREE.Vector3(-5.5, 1.0, -1.4), color: sw.cyan },
    { id: 'W1',    label: 'W1',    position: new THREE.Vector3(-5.5, 1.0,  1.4), color: sw.cyan },
    { id: 'mm1',   label: 'matmul', position: new THREE.Vector3(-2.5, 1.6,  0),  color: sw.purple },
    { id: 'relu',  label: 'ReLU',  position: new THREE.Vector3(-0.2, 1.0,  0),   color: sw.green },
    { id: 'W2',    label: 'W2',    position: new THREE.Vector3( 1.6, 1.0,  1.4), color: sw.cyan },
    { id: 'mm2',   label: 'matmul', position: new THREE.Vector3( 3.0, 1.6,  0),  color: sw.purple },
    { id: 'loss',  label: 'loss',  position: new THREE.Vector3( 5.6, 1.4,  0),   color: sw.pink },
  ];

  const edges: AutogradEdge[] = [
    { from: 'x',    to: 'mm1',  gradLabel: '∂L/∂x' },
    { from: 'W1',   to: 'mm1',  gradLabel: '∂L/∂W1' },
    { from: 'mm1',  to: 'relu', gradLabel: '∂L/∂z1' },
    { from: 'relu', to: 'mm2',  gradLabel: '∂L/∂a1' },
    { from: 'W2',   to: 'mm2',  gradLabel: '∂L/∂W2' },
    { from: 'mm2',  to: 'loss', gradLabel: '∂L/∂z2' },
  ];

  const nodeMeshes = new Map<string, THREE.Mesh>();
  const nodeHalos = new Map<string, THREE.Mesh>();

  // Build node spheres + halos
  for (const node of nodes) {
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.42, 28, 28),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(node.color),
        emissive: new THREE.Color(node.color),
        emissiveIntensity: 0.35,
        roughness: 0.4,
        metalness: 0.25,
      }),
    );
    sphere.position.copy(node.position);
    sphere.userData.nodeId = node.id;
    scene.add(sphere);
    nodeMeshes.set(node.id, sphere);

    const halo = new THREE.Mesh(
      new THREE.RingGeometry(0.55, 0.7, 28),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: 0.25,
        side: THREE.DoubleSide,
      }),
    );
    halo.position.copy(node.position);
    halo.rotation.x = -Math.PI / 2;
    scene.add(halo);
    nodeHalos.set(node.id, halo);
  }

  // Edges + animated pulses
  interface EdgeHandle {
    line: THREE.Line;
    curve: THREE.QuadraticBezierCurve3;
    pulse: THREE.Mesh;
    edge: AutogradEdge;
    direction: 1 | -1;
  }
  const edgeHandles: EdgeHandle[] = [];

  for (const edge of edges) {
    const fromNode = nodes.find(n => n.id === edge.from);
    const toNode = nodes.find(n => n.id === edge.to);
    if (!fromNode || !toNode) continue;

    const start = fromNode.position.clone();
    const end = toNode.position.clone();
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    mid.y += 1.4; // arc upward
    const curve = new THREE.QuadraticBezierCurve3(start, mid, end);

    const points = curve.getPoints(48);
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color(sw.cyan),
      transparent: true,
      opacity: 0.45,
    });
    const line = new THREE.Line(geom, mat);
    scene.add(line);

    const pulse = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 14, 14),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(sw.cyan),
        emissive: new THREE.Color(sw.cyan),
        emissiveIntensity: 1.0,
      }),
    );
    scene.add(pulse);

    edgeHandles.push({ line, curve, pulse, edge, direction: 1 });
  }

  // Gradient surface: a curving "loss landscape" floor near the loss node hint
  const surfaceGeo = new THREE.PlaneGeometry(6, 4, 32, 24);
  const positions = surfaceGeo.attributes.position;
  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);
    const z = 0.55 * Math.exp(-((x * x + y * y) / 4)) - 0.05;
    positions.setZ(i, z);
  }
  surfaceGeo.computeVertexNormals();
  const surface = new THREE.Mesh(
    surfaceGeo,
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(sw.pink),
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    }),
  );
  surface.rotation.x = -Math.PI / 2;
  surface.position.set(5.6, 0.05, 0);
  scene.add(surface);

  let progress = 0;
  let frame_id = 0;
  let lastResizeKey = '';

  const setMode = (next: 'forward' | 'backward') => {
    const color = next === 'forward' ? sw.cyan : sw.pink;
    edgeHandles.forEach(h => {
      (h.line.material as THREE.LineBasicMaterial).color.set(color);
      (h.pulse.material as THREE.MeshStandardMaterial).color.set(color);
      (h.pulse.material as THREE.MeshStandardMaterial).emissive.set(color);
      h.direction = next === 'forward' ? 1 : -1;
    });
  };

  const setProgress = (t: number) => {
    progress = Math.max(0, Math.min(1, t));
  };

  setMode('forward');
  setProgress(1);

  const renderLoop = () => {
    frame_id = window.requestAnimationFrame(renderLoop);

    const time = performance.now() * 0.001;

    // Animate pulses
    edgeHandles.forEach((h, idx) => {
      const offset = (idx * 0.13 + time * 0.35) % 1;
      const t = h.direction === 1 ? offset : 1 - offset;
      const point = h.curve.getPoint(t);
      h.pulse.position.copy(point);
      // Pulse visibility tied to progress
      (h.pulse.material as THREE.MeshStandardMaterial).opacity = Math.min(1, progress + 0.2);
    });

    // Halos pulse
    nodeHalos.forEach(halo => {
      const scale = 1 + Math.sin(time * 2) * 0.07;
      halo.scale.set(scale, scale, 1);
    });

    // Slight scene rotation
    scene.rotation.y = Math.sin(time * 0.05) * 0.08;

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
  onReady?.();

  const destroy = () => {
    window.cancelAnimationFrame(frame_id);
    ro.disconnect();
    controls.dispose();
    nodeMeshes.forEach(disposeObject);
    nodeHalos.forEach(disposeObject);
    edgeHandles.forEach(h => {
      disposeObject(h.line);
      disposeObject(h.pulse);
    });
    disposeObject(surface);
    renderer.dispose();
    if (renderer.domElement.parentNode === host) {
      host.removeChild(renderer.domElement);
    }
    scene.clear();
  };

  return { destroy, setMode, setProgress };
}

export const PytorchAutograd3DVisual = React.memo(({ copy }: PytorchAutograd3DVisualProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [mode, setMode] = useState<'forward' | 'backward'>('forward');
  const steps = copy.pipelinePanel.steps;
  const step = steps[activeStep] ?? steps[0];
  const containerRef = useRef<HTMLDivElement>(null);
  const handlesRef = useRef<SceneHandles | null>(null);

  useEffect(() => {
    const host = containerRef.current;
    if (!host) return;
    const handles = buildScene(host);
    handlesRef.current = handles;
    return () => {
      handles.destroy();
      handlesRef.current = null;
    };
  }, []);

  useEffect(() => {
    handlesRef.current?.setMode(mode);
  }, [mode]);

  useEffect(() => {
    const progress = steps.length > 1 ? (activeStep + 1) / steps.length : 1;
    handlesRef.current?.setProgress(progress);
    // Switch mode based on step naming heuristic: anything containing "backward"
    // or referencing .grad triggers backward visualization
    const lower = (steps[activeStep]?.label ?? '').toLowerCase();
    if (lower.includes('backward') || lower.includes('grad')) {
      setMode('backward');
    } else {
      setMode('forward');
    }
  }, [activeStep, steps]);

  const activeAccent = STEP_COLORS[activeStep % STEP_COLORS.length];

  return (
    <PytorchTabbedCodeLayout
      tabs={copy.tabs}
      codePanel={copy.codePanel}
      altPanel={(
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: 16 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>{copy.pipelinePanel.title}</div>
            {copy.pipelinePanel.subtitle && (
              <div style={{ marginTop: 4, fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>{copy.pipelinePanel.subtitle}</div>
            )}
          </div>

          {/* Mode switch */}
          <div style={{ display: 'flex', gap: 8 }}>
            {(['forward', 'backward'] as const).map(m => {
              const isActive = m === mode;
              const color = m === 'forward' ? sw.cyan : sw.pink;
              return (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  style={{
                    padding: '6px 14px',
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    borderRadius: 999,
                    border: `1px solid ${isActive ? color : sw.borderSubtle}`,
                    background: isActive ? `${color}22` : 'transparent',
                    color: isActive ? color : sw.textDim,
                    cursor: 'pointer',
                  }}
                >
                  {m === 'forward' ? '▶ forward' : '◀ backward'}
                </button>
              );
            })}
          </div>

          {/* 3D scene */}
          <div
            style={{
              border: `1px solid ${sw.borderSubtle}`,
              borderRadius: 18,
              background: sw.surface,
              padding: 10,
              minHeight: 320,
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: sw.cyan, fontFamily: sw.fontMono, padding: '4px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.4)' }}>
                  forward trace
                </span>
                <span style={{ fontSize: 10, fontWeight: 800, color: sw.pink, fontFamily: sw.fontMono, padding: '4px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.4)' }}>
                  ∂L/∂· (chain rule)
                </span>
              </div>
              <div style={{ alignSelf: 'flex-end', fontSize: 10, fontWeight: 700, color: sw.textMuted, padding: '4px 8px', borderRadius: 6, background: 'rgba(0,0,0,0.4)' }}>
                arraste para girar · scroll para zoom
              </div>
            </div>
            <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 320, borderRadius: 14, overflow: 'hidden' }} />
          </div>

          {/* Stepper */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))`, gap: 8 }}>
            {steps.map((item, index) => {
              const accent = STEP_COLORS[index % STEP_COLORS.length];
              const isActive = index === activeStep;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveStep(index)}
                  style={{
                    border: `1px solid ${isActive ? accent : sw.borderSubtle}`,
                    borderRadius: 12,
                    background: isActive ? `${accent}18` : sw.surface,
                    padding: '10px 8px',
                    cursor: 'pointer',
                    color: isActive ? accent : sw.textDim,
                    fontSize: 11,
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    lineHeight: 1.25,
                  }}
                >
                  {index + 1}. {item.label}
                </button>
              );
            })}
          </div>

          <div
            style={{
              border: `1px solid ${activeAccent}33`,
              borderRadius: 18,
              background: `linear-gradient(180deg, ${activeAccent}10, rgba(255,255,255,0.01))`,
              padding: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, color: activeAccent, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  {copy.pipelinePanel.title}
                </div>
                <div style={{ marginTop: 4, fontSize: 16, fontWeight: 700, color: sw.text }}>{step.title ?? step.label}</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, color: activeAccent, fontFamily: sw.fontMono }}>
                {String(activeStep + 1).padStart(2, '0')} / {String(steps.length).padStart(2, '0')}
              </div>
            </div>

            {step.shape && (
              <div
                style={{
                  marginTop: 12,
                  padding: '8px 10px',
                  borderRadius: 10,
                  border: `1px solid ${activeAccent}44`,
                  background: `${activeAccent}14`,
                  fontFamily: sw.fontMono,
                  fontSize: 12,
                  fontWeight: 700,
                  color: activeAccent,
                  display: 'inline-flex',
                }}
              >
                {step.shape}
              </div>
            )}

            <div style={{ marginTop: 12, fontSize: 13, lineHeight: 1.65, color: sw.text }}>{step.body}</div>
            <div style={{ marginTop: 12, fontSize: 12, lineHeight: 1.6, color: sw.textMuted }}>
              <strong style={{ color: sw.pink }}>Risco:</strong> {step.risk}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: sw.surface, padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.pink, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {copy.pipelinePanel.failureTitle}
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.pipelinePanel.failureModes.map(item => (
                  <div key={item.label} style={{ display: 'grid', gridTemplateColumns: '92px 1fr', gap: 10, alignItems: 'start' }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: sw.text }}>{item.label}</div>
                    <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textDim }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ border: `1px solid ${sw.borderSubtle}`, borderRadius: 16, background: 'linear-gradient(180deg, rgba(0,229,255,0.08), rgba(255,255,255,0.01))', padding: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: sw.cyan, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {copy.pipelinePanel.mentalModelTitle}
              </div>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {copy.pipelinePanel.mentalModel.map(item => (
                  <div key={item} style={{ fontSize: 12, lineHeight: 1.55, color: sw.text }}>{item}</div>
                ))}
              </div>
            </div>
          </div>

          {copy.pipelinePanel.footer && (
            <div style={{ fontSize: 12, lineHeight: 1.55, color: sw.textMuted }}>{copy.pipelinePanel.footer}</div>
          )}
        </div>
      )}
    />
  );
});
