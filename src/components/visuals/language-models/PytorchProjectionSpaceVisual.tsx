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
const EMPTY_TABS: PytorchProjectionSpaceCopy['tabs'] = [];
const EMPTY_STAGES: PytorchProjectionSpaceCopy['blueprintPanel']['stages'] = [];

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

function createArrow(from: THREE.Vector3, to: THREE.Vector3, color: string) {
  const direction = new THREE.Vector3().subVectors(to, from);
  const length = direction.length();
  if (length === 0) {
    direction.set(1, 0, 0);
  } else {
    direction.normalize();
  }
  return new THREE.ArrowHelper(direction, from, Math.max(0.001, length), color, 0.28, 0.16);
}

function makeStageGroup(index: number) {
  const accent = STAGE_COLORS[index] ?? sw.cyan;
  const group = new THREE.Group();
  group.name = `stage-${index}`;

  const baseSource = new THREE.Vector3(-2.5, 0.8 - index * 0.18, 0.55 + index * 0.2);
  const projection = new THREE.Vector3(1.9, 0.9 + index * 0.08, 0.15 + index * 0.55);
  const planeWidth = 2.6 + index * 0.35;
  const planeHeight = 1.8 + index * 0.25;

  const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(planeWidth, planeHeight, 1, 1),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(accent),
      transparent: true,
      opacity: 0.08 + index * 0.02,
      side: THREE.DoubleSide,
      wireframe: index === 2,
    }),
  );
  plane.position.set(1.6, 0.3 + index * 0.12, 0.4 + index * 0.4);
  plane.rotation.y = -0.85 + index * 0.1;
  plane.rotation.x = 0.1;
  group.add(plane);

  const sourceNode = new THREE.Mesh(
    new THREE.SphereGeometry(0.16 + index * 0.02, 24, 24),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(sw.cyan), emissive: new THREE.Color(sw.cyan), emissiveIntensity: 0.22 }),
  );
  sourceNode.position.copy(baseSource);
  group.add(sourceNode);

  const projectedNode = new THREE.Mesh(
    new THREE.SphereGeometry(0.18 + index * 0.02, 24, 24),
    new THREE.MeshStandardMaterial({ color: new THREE.Color(accent), emissive: new THREE.Color(accent), emissiveIntensity: 0.25 }),
  );
  projectedNode.position.copy(projection);
  group.add(projectedNode);

  const arrow1 = createArrow(new THREE.Vector3(0, 0, 0), baseSource, sw.cyan);
  const arrow2 = createArrow(baseSource, projection, accent);
  group.add(arrow1);
  group.add(arrow2);

  const connectorPoints = new Float32Array([
    0, 0, 0,
    baseSource.x, baseSource.y, baseSource.z,
    projection.x, projection.y, projection.z,
  ]);
  const connectorGeometry = new THREE.BufferGeometry();
  connectorGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectorPoints, 3));
  const connector = new THREE.Line(
    connectorGeometry,
    new THREE.LineBasicMaterial({ color: new THREE.Color(accent), transparent: true, opacity: 0.45 }),
  );
  group.add(connector);

  const halo = new THREE.Mesh(
    new THREE.RingGeometry(0.45 + index * 0.04, 0.7 + index * 0.04, 32),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(accent),
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
    }),
  );
  halo.position.copy(projection);
  halo.rotation.x = -Math.PI / 2;
  group.add(halo);

  if (index === 2) {
    const sampleOffsets = [
      new THREE.Vector3(0.5, 0.45, 0.25),
      new THREE.Vector3(0.8, -0.25, 0.4),
      new THREE.Vector3(0.45, 0.1, 0.75),
      new THREE.Vector3(0.95, 0.2, -0.15),
    ];
    sampleOffsets.forEach((offset, sampleIndex) => {
      const sample = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 18, 18),
        new THREE.MeshStandardMaterial({
          color: new THREE.Color(sampleIndex % 2 === 0 ? sw.green : sw.pink),
          emissive: new THREE.Color(sampleIndex % 2 === 0 ? sw.green : sw.pink),
          emissiveIntensity: 0.18,
        }),
      );
      sample.position.copy(projection).add(offset);
      group.add(sample);

      const sampleArrow = createArrow(projection, sample.position, sampleIndex % 2 === 0 ? sw.green : sw.pink);
      sampleArrow.cone.scale.setScalar(0.5);
      group.add(sampleArrow);
    });
  }

  if (index === 0) {
    const entryBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.24, 0.24),
      new THREE.MeshStandardMaterial({ color: new THREE.Color(sw.cyan), roughness: 0.45, metalness: 0.15 }),
    );
    entryBlock.position.set(-3.2, 0.7, 0.8);
    group.add(entryBlock);
  }

  return group;
}

export const PytorchProjectionSpaceVisual = React.memo(({ copy }: PytorchProjectionSpaceVisualProps) => {
  const tabs = copy.tabs ?? EMPTY_TABS;
  const [activeStage, setActiveStage] = useState(0);
  const stages = copy.blueprintPanel?.stages ?? EMPTY_STAGES;
  const activeAccent = useMemo(() => STAGE_COLORS[activeStage] ?? sw.cyan, [activeStage]);

  const containerRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const stageGroupsRef = useRef<THREE.Group[]>([]);

  useEffect(() => {
    const host = containerRef.current;
    if (!host || stages.length === 0) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(sw.void);
    scene.fog = new THREE.Fog(sw.void, 8, 20);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0.2, 2.3, 8.4);

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
    controls.minDistance = 5;
    controls.maxDistance = 12;
    controls.maxPolarAngle = Math.PI * 0.9;
    controls.target.set(0.5, 0.4, 0.6);

    const ambient = new THREE.AmbientLight(0xffffff, 0.9);
    const directional = new THREE.DirectionalLight(0xffffff, 1.8);
    directional.position.set(4, 8, 10);
    scene.add(ambient, directional);

    const grid = new THREE.GridHelper(10, 10, 0x334155, 0x1f2937);
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach(material => {
      material.opacity = 0.18;
      material.transparent = true;
    });
    scene.add(grid);

    const axes = new THREE.AxesHelper(3.6);
    scene.add(axes);

    const content = new THREE.Group();
    scene.add(content);
    stageGroupsRef.current = stages.map((_, index) => {
      const group = makeStageGroup(index);
      group.visible = index === 0;
      content.add(group);
      return group;
    });

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    let frame = 0;
    const render = () => {
      frame = window.requestAnimationFrame(render);
      content.rotation.y = Math.sin(performance.now() * 0.00012) * 0.08;
      controls.update();
      renderer.render(scene, camera);
    };
    render();

    cameraRef.current = camera;
    controlsRef.current = controls;

    return () => {
      window.cancelAnimationFrame(frame);
      ro.disconnect();
      controls.dispose();
      stageGroupsRef.current.forEach(disposeObject);
      stageGroupsRef.current = [];
      renderer.dispose();
      if (renderer.domElement.parentNode === host) {
        host.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [stages]);

  useEffect(() => {
    stageGroupsRef.current.forEach((group, index) => {
      group.visible = index === activeStage;
    });
    if (controlsRef.current) {
      controlsRef.current.target.set(0.5, 0.4, 0.6 + activeStage * 0.1);
      controlsRef.current.update();
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0.2 + activeStage * 0.1, 2.3, 8.4 - activeStage * 0.2);
    }
  }, [activeStage]);

  if (tabs.length === 0 || stages.length === 0) {
    return (
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-3 p-6 text-center">
        <div style={{ fontSize: 18, fontWeight: 700, color: sw.text }}>Projection space unavailable</div>
        <div style={{ fontSize: 13, lineHeight: 1.6, color: sw.textDim }}>
          This visual is missing tab or stage data for the current locale.
        </div>
      </div>
    );
  }
  const stage = stages[activeStage] ?? stages[0];

  return (
    <PytorchTabbedCodeLayout
      tabs={tabs}
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

          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 12, alignItems: 'stretch' }}>
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

            <div
              style={{
                border: `1px solid ${sw.borderSubtle}`,
                borderRadius: 18,
                background: sw.surface,
                padding: 10,
                minHeight: 320,
              }}
            >
              <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: 300, borderRadius: 14, overflow: 'hidden' }} />
            </div>
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
