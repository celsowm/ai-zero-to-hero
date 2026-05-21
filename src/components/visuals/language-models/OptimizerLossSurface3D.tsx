import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { sw } from '../../../theme/tokens';

interface OptimizerLossSurface3DProps {
  weight: number;
  target: number;
  updatedWeight: number;
}

const SURFACE_HALF_X = 4;
const SURFACE_HALF_Z = 3;
const GRID_RES = 40;
const Y_SCALE = 0.18;

function lossAt(w1: number, w2: number, target: number): number {
  return (w1 - target) ** 2 + w2 * w2;
}

function buildSurfaceGeometry(target: number): THREE.PlaneGeometry {
  const geo = new THREE.PlaneGeometry(
    SURFACE_HALF_X * 2,
    SURFACE_HALF_Z * 2,
    GRID_RES,
    GRID_RES,
  );
  const positions = geo.attributes.position;
  for (let i = 0; i < positions.count; i += 1) {
    const lx = positions.getX(i);
    const lz = positions.getY(i);
    const y = lossAt(lx, lz, target) * Y_SCALE;
    positions.setZ(i, y);
  }
  positions.needsUpdate = true;
  geo.rotateX(-Math.PI / 2);
  geo.computeVertexNormals();
  return geo;
}

interface SceneHandles {
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  controls: OrbitControls;
  surfaceMesh: THREE.Mesh;
  wireframeMesh: THREE.LineSegments;
  currentMarker: THREE.Mesh;
  currentHalo: THREE.Mesh;
  updatedMarker: THREE.Mesh;
  minimumMarker: THREE.Mesh;
  minimumHalo: THREE.Mesh;
  gradientArrow: THREE.ArrowHelper;
  stepLine: THREE.Line;
  resizeObserver: ResizeObserver;
  rafId: number;
}

function buildScene(host: HTMLDivElement): SceneHandles {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(sw.void);
  scene.fog = new THREE.Fog(sw.void, 16, 32);

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
  camera.position.set(6.5, 5.2, 7.2);

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
  controls.maxDistance = 18;
  controls.maxPolarAngle = Math.PI * 0.48;
  controls.target.set(0, 0.5, 0);

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
  dirLight.position.set(5, 12, 7);
  scene.add(dirLight);

  const cyanLight = new THREE.PointLight(new THREE.Color(sw.cyan).getHex(), 1.3, 18, 2);
  cyanLight.position.set(3, 3.5, 0);
  scene.add(cyanLight);

  const pinkLight = new THREE.PointLight(new THREE.Color(sw.pink).getHex(), 1.0, 14, 2);
  pinkLight.position.set(-3, 2.5, 2);
  scene.add(pinkLight);

  const grid = new THREE.GridHelper(12, 24, 0x334155, 0x1f2937);
  const gridMats = Array.isArray(grid.material) ? grid.material : [grid.material];
  gridMats.forEach((m) => {
    m.opacity = 0.18;
    m.transparent = true;
  });
  grid.position.y = 0.01;
  scene.add(grid);

  const surfaceGeo = buildSurfaceGeometry(0);
  const surfaceMat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(sw.purple),
    metalness: 0.05,
    roughness: 0.82,
    transparent: true,
    opacity: 0.58,
    side: THREE.DoubleSide,
  });
  const surfaceMesh = new THREE.Mesh(surfaceGeo, surfaceMat);
  scene.add(surfaceMesh);

  const wireframeMesh = new THREE.LineSegments(
    new THREE.WireframeGeometry(surfaceGeo),
    new THREE.LineBasicMaterial({
      color: new THREE.Color(sw.purple),
      transparent: true,
      opacity: 0.22,
    }),
  );
  scene.add(wireframeMesh);

  const currentMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.14, 24, 24),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(sw.cyan),
      emissive: new THREE.Color(sw.cyan),
      emissiveIntensity: 0.55,
      roughness: 0.3,
      metalness: 0.2,
    }),
  );
  scene.add(currentMarker);

  const currentHalo = new THREE.Mesh(
    new THREE.RingGeometry(0.19, 0.25, 28),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(sw.cyan),
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide,
    }),
  );
  currentHalo.rotation.x = -Math.PI / 2;
  scene.add(currentHalo);

  const updatedMarker = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 20, 20),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(sw.green),
      emissive: new THREE.Color(sw.green),
      emissiveIntensity: 0.5,
      roughness: 0.35,
      metalness: 0.2,
    }),
  );
  scene.add(updatedMarker);

  const minimumMarker = new THREE.Mesh(
    new THREE.TorusGeometry(0.16, 0.045, 12, 32),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color(sw.yellow),
      emissive: new THREE.Color(sw.yellow),
      emissiveIntensity: 0.55,
      roughness: 0.25,
      metalness: 0.25,
    }),
  );
  minimumMarker.rotation.x = Math.PI / 2;
  scene.add(minimumMarker);

  const minimumHalo = new THREE.Mesh(
    new THREE.RingGeometry(0.18, 0.28, 28),
    new THREE.MeshBasicMaterial({
      color: new THREE.Color(sw.yellow),
      transparent: true,
      opacity: 0.28,
      side: THREE.DoubleSide,
    }),
  );
  minimumHalo.rotation.x = -Math.PI / 2;
  scene.add(minimumHalo);

  const gradientArrow = new THREE.ArrowHelper(
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(),
    1,
    new THREE.Color(sw.pink).getHex(),
    0.18,
    0.12,
  );
  scene.add(gradientArrow);

  const stepLineGeo = new THREE.BufferGeometry();
  const stepLinePositions = new Float32Array(6);
  stepLineGeo.setAttribute('position', new THREE.BufferAttribute(stepLinePositions, 3));
  const stepLine = new THREE.Line(
    stepLineGeo,
    new THREE.LineBasicMaterial({
      color: new THREE.Color(sw.green),
      transparent: true,
      opacity: 0.9,
    }),
  );
  scene.add(stepLine);

  const onResize = () => {
    const w = host.clientWidth;
    const h = host.clientHeight;
    if (!w || !h) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  onResize();
  const resizeObserver = new ResizeObserver(onResize);
  resizeObserver.observe(host);

  let rafId = 0;
  const renderLoop = () => {
    rafId = window.requestAnimationFrame(renderLoop);
    const t = performance.now() * 0.001;
    controls.update();

    const pulse = 1 + Math.sin(t * 3.2) * 0.08;
    currentMarker.scale.setScalar(pulse);
    currentHalo.scale.setScalar(pulse);

    const minPulse = 1 + Math.sin(t * 2.0 + 0.5) * 0.06;
    minimumHalo.scale.setScalar(minPulse);

    renderer.render(scene, camera);
  };
  renderLoop();

  return {
    renderer, scene, camera, controls,
    surfaceMesh, wireframeMesh,
    currentMarker, currentHalo, updatedMarker,
    minimumMarker, minimumHalo,
    gradientArrow, stepLine,
    resizeObserver, rafId,
  };
}

function updateMarkers(
  handles: SceneHandles,
  weight: number,
  target: number,
  updatedWeight: number,
) {
  const lossCurrent = lossAt(weight, 0, target);
  const lossUpdated = lossAt(updatedWeight, 0, target);
  const lossMin = lossAt(target, 0, target);

  const currentY = lossCurrent * Y_SCALE + 0.08;
  const updatedY = lossUpdated * Y_SCALE + 0.08;
  const minY = lossMin * Y_SCALE + 0.02;

  handles.currentMarker.position.set(weight, currentY, 0);
  handles.currentHalo.position.set(weight, 0.02, 0);

  handles.updatedMarker.position.set(updatedWeight, updatedY, 0);

  handles.minimumMarker.position.set(target, minY, 0);
  handles.minimumHalo.position.set(target, 0.02, 0);

  const grad = 2 * (weight - target);
  const gradMag = Math.abs(grad);
  const dirX = grad === 0 ? 0 : -Math.sign(grad);
  const arrowLen = Math.min(0.4 + gradMag * 0.35, 2.2);
  const arrowDir = new THREE.Vector3(dirX, 0.15, 0).normalize();
  handles.gradientArrow.setDirection(arrowDir);
  handles.gradientArrow.setLength(arrowLen, 0.18, 0.12);
  handles.gradientArrow.position.set(weight, lossCurrent * Y_SCALE + 0.02, 0);

  const posAttr = handles.stepLine.geometry.getAttribute('position') as THREE.BufferAttribute;
  posAttr.setXYZ(0, weight, currentY - 0.02, 0);
  posAttr.setXYZ(1, updatedWeight, updatedY - 0.02, 0);
  posAttr.needsUpdate = true;
}

export const OptimizerLossSurface3D = React.memo(
  ({ weight, target, updatedWeight }: OptimizerLossSurface3DProps) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const handlesRef = useRef<SceneHandles | null>(null);
    const prevTargetRef = useRef(target);

    useEffect(() => {
      const host = mountRef.current;
      if (!host) return;
      const handles = buildScene(host);
      handlesRef.current = handles;
      updateMarkers(handles, weight, target, updatedWeight);
      prevTargetRef.current = target;

      return () => {
        window.cancelAnimationFrame(handles.rafId);
        handles.resizeObserver.disconnect();
        handles.controls.dispose();
        const scene = handles.scene;
        scene.traverse((node) => {
          const mesh = node as THREE.Mesh;
          if (mesh.geometry) mesh.geometry.dispose();
          const mat = mesh.material;
          if (Array.isArray(mat)) {
            mat.forEach((m) => m.dispose());
          } else if (mat) {
            mat.dispose();
          }
        });
        handles.renderer.dispose();
        if (handles.renderer.domElement.parentNode === host) {
          host.removeChild(handles.renderer.domElement);
        }
        handlesRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const handles = handlesRef.current;
      if (!handles) return;

      if (target !== prevTargetRef.current) {
        const newGeo = buildSurfaceGeometry(target);

        handles.surfaceMesh.geometry.dispose();
        handles.surfaceMesh.geometry = newGeo;

        handles.wireframeMesh.geometry.dispose();
        handles.wireframeMesh.geometry = new THREE.WireframeGeometry(newGeo);

        prevTargetRef.current = target;
      }

      updateMarkers(handles, weight, target, updatedWeight);
    }, [weight, target, updatedWeight]);

    return (
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 320,
          minHeight: 260,
          borderRadius: 18,
          overflow: 'hidden',
          border: `1px solid ${sw.borderSubtle}`,
          background: `radial-gradient(circle at 20% 15%, rgba(0, 229, 255, 0.12), transparent 30%), radial-gradient(circle at 85% 18%, rgba(168, 85, 247, 0.10), transparent 26%), linear-gradient(180deg, rgba(8, 12, 24, 0.95), rgba(7, 10, 20, 0.98))`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 8,
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            zIndex: 1,
          }}
        >
          <span
            style={{
              fontSize: 10,
              fontWeight: 800,
              color: sw.cyan,
              fontFamily: sw.fontMono,
              padding: '4px 8px',
              borderRadius: 6,
              background: 'rgba(0,0,0,0.45)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
            }}
          >
            L(w) = (w - target)²
          </span>
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: sw.textMuted,
              padding: '4px 8px',
              borderRadius: 6,
              background: 'rgba(0,0,0,0.45)',
            }}
          >
            drag to orbit · scroll to zoom
          </span>
        </div>
        <div
          ref={mountRef}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 14,
            overflow: 'hidden',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: 14,
            right: 14,
            bottom: 14,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 10,
            padding: '10px 12px',
            borderRadius: 14,
            background: 'rgba(8, 12, 24, 0.72)',
            border: '1px solid rgba(255,255,255,0.07)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <LegendDot color={sw.cyan} label="current w" />
          <LegendDot color={sw.green} label="w after step()" />
          <LegendDot color={sw.pink} label="-grad direction" />
          <LegendDot color={sw.yellow} label="minimum" />
          <LegendDot color={sw.purple} label="loss surface" />
        </div>
      </div>
    );
  },
);

OptimizerLossSurface3D.displayName = 'OptimizerLossSurface3D';

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        fontSize: 11,
        color: sw.text,
        fontWeight: 700,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: color,
          boxShadow: `0 0 14px ${color}77`,
          flexShrink: 0,
        }}
      />
      {label}
    </span>
  );
}
