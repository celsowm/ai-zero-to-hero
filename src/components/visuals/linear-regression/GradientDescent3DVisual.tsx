import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import type { GradientDescentVisualCopy } from '../../../types/slide';
import { sw } from '../../../theme/tokens';

interface GradientDescent3DVisualProps {
  copy: GradientDescentVisualCopy;
}

type PathSample = {
  x: number;
  z: number;
  y: number;
  cost: number;
  gradX: number;
  gradZ: number;
};

const fontFamily = "'Space Grotesk', 'Inter', 'Segoe UI', Arial, sans-serif";
const learningRate = 0.72;
const surfaceCenter = { x: 0.32, z: -0.18 };
const startPoint = { x: -1.8, z: 1.45 };
const pathSteps = 20;

const surfaceHeight = (x: number, z: number) => {
  const dx = x - surfaceCenter.x;
  const dz = z - surfaceCenter.z;

  return 0.18 + 0.22 * dx * dx + 0.12 * dz * dz + 0.06 * dx * dz;
};

const surfaceGradient = (x: number, z: number) => {
  const dx = x - surfaceCenter.x;
  const dz = z - surfaceCenter.z;

  return {
    x: 0.44 * dx + 0.06 * dz,
    z: 0.24 * dz + 0.06 * dx,
  };
};

const buildPath = (): PathSample[] => {
  const samples: PathSample[] = [];
  let x = startPoint.x;
  let z = startPoint.z;

  for (let index = 0; index < pathSteps; index += 1) {
    const cost = surfaceHeight(x, z);
    const grad = surfaceGradient(x, z);

    samples.push({
      x,
      z,
      y: cost,
      cost,
      gradX: grad.x,
      gradZ: grad.z,
    });

    x -= learningRate * grad.x;
    z -= learningRate * grad.z;
  }

  const finalCost = surfaceHeight(x, z);
  const finalGrad = surfaceGradient(x, z);
  samples.push({
    x,
    z,
    y: finalCost,
    cost: finalCost,
    gradX: finalGrad.x,
    gradZ: finalGrad.z,
  });

  return samples;
};

const legendPillStyle = (accent: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 12px',
  borderRadius: 999,
  fontSize: 12.5,
  fontWeight: 700,
  letterSpacing: '0.01em',
  color: 'var(--sw-text)',
  background: `${accent}18`,
  border: `1px solid ${accent}35`,
});

const cardStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 14,
};

const titleStyle: React.CSSProperties = {
  fontSize: 18,
  fontWeight: 700,
  letterSpacing: '-0.02em',
  color: 'var(--sw-text)',
  lineHeight: 1.2,
};

const descriptionStyle: React.CSSProperties = {
  margin: 0,
  fontSize: 13.8,
  lineHeight: 1.7,
  color: 'var(--sw-text-dim)',
};

const viewportShellStyle: React.CSSProperties = {
  position: 'relative',
  flex: 1,
  minHeight: 300,
  borderRadius: '18px',
  overflow: 'hidden',
  border: sw.borderSubtle,
  background: 'radial-gradient(circle at 20% 15%, rgba(0, 229, 255, 0.16), transparent 30%), radial-gradient(circle at 85% 18%, rgba(255, 46, 151, 0.12), transparent 26%), linear-gradient(180deg, rgba(8, 12, 24, 0.95), rgba(7, 10, 20, 0.98))',
  boxShadow: `${sw.insetHighlight}, ${sw.shadowDeep}`,
};

const floatingNoteStyle: React.CSSProperties = {
  position: 'absolute',
  left: 14,
  right: 14,
  bottom: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  padding: '10px 12px',
  borderRadius: '14px',
  background: 'rgba(8, 12, 24, 0.72)',
  border: '1px solid rgba(255,255,255,0.07)',
  backdropFilter: 'blur(12px)',
};

const hudLabelStyle: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--sw-text-muted)',
};

const hudValueStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: 'var(--sw-text)',
};

const staticPath = [
  { x: 72, y: 34 },
  { x: 132, y: 64 },
  { x: 186, y: 108 },
  { x: 236, y: 154 },
  { x: 296, y: 192 },
  { x: 360, y: 210 },
];

const StaticGradientFallback: React.FC<{ copy: GradientDescentVisualCopy }> = ({ copy }) => (
  <svg
    viewBox="0 0 520 360"
    width="100%"
    height="100%"
    role="img"
    aria-label={copy.diagramTitle}
    style={{ display: 'block', width: '100%', height: '100%' }}
    preserveAspectRatio="none"
  >
    <defs>
      <linearGradient id="gd-fallback-bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#0b1020" />
        <stop offset="100%" stopColor="#090d18" />
      </linearGradient>
      <radialGradient id="gd-fallback-glow" cx="50%" cy="45%" r="55%">
        <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.20" />
        <stop offset="100%" stopColor="#00e5ff" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="gd-fallback-trail" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00e5ff" />
        <stop offset="100%" stopColor="#ff2e97" />
      </linearGradient>
      <marker id="gd-fallback-arrow" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#ff2e97" />
      </marker>
      <marker id="gd-fallback-step-arrow" markerWidth="10" markerHeight="10" refX="7" refY="5" orient="auto">
        <path d="M0,0 L10,5 L0,10 z" fill="#a855f7" />
      </marker>
    </defs>

    <rect width="520" height="360" rx="18" fill="url(#gd-fallback-bg)" />
    <ellipse cx="168" cy="90" rx="126" ry="92" fill="url(#gd-fallback-glow)" />

    {[74, 114, 154, 194, 234, 274, 314, 354, 394, 434].map(x => (
      <line key={`vx-${x}`} x1={x} y1="36" x2={x} y2="314" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    ))}
    {[58, 96, 134, 172, 210, 248, 286].map(y => (
      <line key={`hy-${y}`} x1="56" y1={y} x2="464" y2={y} stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
    ))}

    <path
      d="M 76 254 C 126 214, 166 164, 198 142 C 234 118, 256 110, 286 108 C 318 106, 350 120, 388 144"
      fill="none"
      stroke="rgba(255,255,255,0.16)"
      strokeWidth="3"
      strokeLinecap="round"
    />

    <path
      d="M 76 254 C 112 226, 142 190, 166 168 C 191 145, 213 136, 230 128 C 256 117, 285 111, 314 114"
      fill="none"
      stroke="url(#gd-fallback-trail)"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
      markerEnd="url(#gd-fallback-arrow)"
    />

    <path
      d="M 166 168 L 214 138"
      fill="none"
      stroke="#a855f7"
      strokeWidth="4"
      strokeLinecap="round"
      markerEnd="url(#gd-fallback-step-arrow)"
    />

    <circle cx="166" cy="168" r="5" fill="#a855f7" />
    <circle cx="214" cy="138" r="5" fill="#a855f7" />

    {staticPath.map((point, index) => (
      <circle
        key={`pt-${index}`}
        cx={point.x}
        cy={point.y}
        r={index === 0 ? 7 : 5}
        fill={index === 0 ? '#ff2e97' : index === staticPath.length - 1 ? '#fbbf24' : '#00e5ff'}
        opacity={index === staticPath.length - 1 ? 1 : 0.92}
      />
    ))}

    <text x="74" y="34" fontFamily={fontFamily} fontSize="12" fontWeight="700" fill="#ff2e97">
      {copy.startLabel}
    </text>
    <text x="304" y="104" fontFamily={fontFamily} fontSize="12" fontWeight="700" fill="#fbbf24">
      {copy.minimumLabel}
    </text>

    <text x="260" y="338" textAnchor="middle" fontFamily={fontFamily} fontSize="12" fontWeight="500" fill="rgba(232,228,240,0.75)">
      {copy.diagramDescription}
    </text>
  </svg>
);

const GradientDescentScene: React.FC<{ copy: GradientDescentVisualCopy }> = ({ copy }) => {
  const mountRef = React.useRef<HTMLDivElement | null>(null);
  const trailMeshRef = React.useRef<THREE.Line | null>(null);
  const learningRateSegmentRef = React.useRef<THREE.Line | null>(null);
  const learningRateTargetRef = React.useRef<THREE.Mesh | null>(null);
  const currentMarkerRef = React.useRef<THREE.Mesh | null>(null);
  const gradientArrowRef = React.useRef<THREE.ArrowHelper | null>(null);
  const minimumMarkerRef = React.useRef<THREE.Mesh | null>(null);
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (prefersReducedMotion || !mountRef.current) {
      return;
    }

    const mountNode = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b1020, 9, 18);

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(4.8, 4.2, 5.2);
    camera.lookAt(surfaceCenter.x, 0.32, surfaceCenter.z);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountNode.appendChild(renderer.domElement);

    const resize = () => {
      const width = mountNode.clientWidth;
      const height = mountNode.clientHeight;

      if (!width || !height) {
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const surfaceGeometry = new THREE.PlaneGeometry(5.8, 5.8, 44, 44);
    const positions = surfaceGeometry.attributes.position;
    for (let index = 0; index < positions.count; index += 1) {
      const x = positions.getX(index);
      const z = positions.getY(index);
      positions.setZ(index, surfaceHeight(x, z));
    }
    positions.needsUpdate = true;
    surfaceGeometry.rotateX(-Math.PI / 2);
    surfaceGeometry.computeVertexNormals();

    const surfaceMaterial = new THREE.MeshStandardMaterial({
      color: 0x122043,
      metalness: 0.1,
      roughness: 0.78,
      transparent: true,
      opacity: 0.82,
      side: THREE.DoubleSide,
    });
    const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
    scene.add(surface);

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(surfaceGeometry),
      new THREE.LineBasicMaterial({
        color: 0x5c77a6,
        transparent: true,
        opacity: 0.22,
      }),
    );
    scene.add(wireframe);

    const grid = new THREE.GridHelper(8, 16, 0x30405f, 0x1f2c45);
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach(material => {
      material.transparent = true;
      material.opacity = 0.2;
    });
    grid.position.y = 0.03;
    scene.add(grid);

    const ambient = new THREE.HemisphereLight(0xbfd3ff, 0x0a1020, 1.2);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 7, 4);
    scene.add(keyLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 1.4, 18, 2);
    cyanLight.position.set(0, 2.8, 0.2);
    scene.add(cyanLight);

    const pinkLight = new THREE.PointLight(0xff2e97, 1.1, 12, 2);
    pinkLight.position.set(-1.8, 2.2, 1.8);
    scene.add(pinkLight);

    const pathSamples = buildPath();
    const trailGeometry = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(pathSamples.length * 3);
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    const trail = new THREE.Line(
      trailGeometry,
      new THREE.LineBasicMaterial({
        color: 0x00e5ff,
        transparent: true,
        opacity: 0.92,
      }),
    );
    scene.add(trail);
    trailMeshRef.current = trail;

    const learningRateGeometry = new THREE.BufferGeometry();
    const learningRatePositions = new Float32Array(6);
    learningRateGeometry.setAttribute('position', new THREE.BufferAttribute(learningRatePositions, 3));
    const learningRateSegment = new THREE.Line(
      learningRateGeometry,
      new THREE.LineBasicMaterial({
        color: 0xa855f7,
        transparent: true,
        opacity: 0.95,
      }),
    );
    scene.add(learningRateSegment);
    learningRateSegmentRef.current = learningRateSegment;

    const currentMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.12, 24, 24),
      new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0x5f4300,
        emissiveIntensity: 0.65,
        roughness: 0.35,
        metalness: 0.2,
      }),
    );
    scene.add(currentMarker);
    currentMarkerRef.current = currentMarker;

    const learningRateTarget = new THREE.Mesh(
      new THREE.SphereGeometry(0.055, 18, 18),
      new THREE.MeshStandardMaterial({
        color: 0xa855f7,
        emissive: 0x4c1d95,
        emissiveIntensity: 0.75,
        roughness: 0.28,
        metalness: 0.18,
      }),
    );
    scene.add(learningRateTarget);
    learningRateTargetRef.current = learningRateTarget;

    const minimumMarker = new THREE.Mesh(
      new THREE.TorusGeometry(0.14, 0.045, 12, 32),
      new THREE.MeshStandardMaterial({
        color: 0xfbbf24,
        emissive: 0x735100,
        emissiveIntensity: 0.5,
        roughness: 0.22,
        metalness: 0.3,
      }),
    );
    minimumMarker.rotation.x = Math.PI / 2;
    scene.add(minimumMarker);
    minimumMarkerRef.current = minimumMarker;

    const arrow = new THREE.ArrowHelper(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(),
      1,
      0xff2e97,
      0.24,
      0.14,
    );
    scene.add(arrow);
    gradientArrowRef.current = arrow;

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(mountNode);

    let raf = 0;
    const cycleSeconds = 12;

    const render = (time: number) => {
      const elapsed = time * 0.001;
      const cycleProgress = (elapsed % cycleSeconds) / cycleSeconds;
      const travelProgress = Math.min(cycleProgress / 0.82, 1);
      const sampleIndex = Math.min(pathSamples.length - 2, Math.floor(travelProgress * (pathSamples.length - 1)));
      const sampleT = travelProgress * (pathSamples.length - 1) - sampleIndex;
      const currentSample = pathSamples[sampleIndex];
      const nextSample = pathSamples[Math.min(sampleIndex + 1, pathSamples.length - 1)];

      const currentX = THREE.MathUtils.lerp(currentSample.x, nextSample.x, sampleT);
      const currentZ = THREE.MathUtils.lerp(currentSample.z, nextSample.z, sampleT);
      const currentY = surfaceHeight(currentX, currentZ);
      const currentGrad = surfaceGradient(currentX, currentZ);
      const gradientMagnitude = Math.sqrt(currentGrad.x * currentGrad.x + currentGrad.z * currentGrad.z);

      const holdProgress = cycleProgress > 0.82 ? (cycleProgress - 0.82) / 0.18 : 0;
      const pulse = 1 + Math.sin(elapsed * 4.2) * 0.08;

      currentMarker.position.set(currentX, currentY + 0.11, currentZ);
      currentMarker.scale.setScalar(pulse);

      const nextStepX = currentX - learningRate * currentGrad.x;
      const nextStepZ = currentZ - learningRate * currentGrad.z;
      const nextStepY = surfaceHeight(nextStepX, nextStepZ);

      const learningRatePositions = (learningRateSegment.geometry.getAttribute('position') as THREE.BufferAttribute);
      learningRatePositions.setXYZ(0, currentX, currentY + 0.09, currentZ);
      learningRatePositions.setXYZ(1, nextStepX, nextStepY + 0.09, nextStepZ);
      learningRatePositions.needsUpdate = true;
      learningRateTarget.position.set(nextStepX, nextStepY + 0.09, nextStepZ);
      learningRateTarget.scale.setScalar(0.92 + Math.sin(elapsed * 4.2 + 0.5) * 0.06);

      const minimumY = surfaceHeight(surfaceCenter.x, surfaceCenter.z);
      minimumMarker.position.set(surfaceCenter.x, minimumY + 0.02, surfaceCenter.z);

      const descentDirection = new THREE.Vector3(-currentGrad.x, 0.28, -currentGrad.z).normalize();
      gradientArrowRef.current?.setDirection(descentDirection);
      gradientArrowRef.current?.setLength(1.0 + Math.min(gradientMagnitude * 0.8, 0.75), 0.22, 0.14);
      gradientArrowRef.current?.position.set(currentX, currentY + 0.02, currentZ);

      const visibleSamples = Math.max(2, Math.floor((pathSamples.length - 1) * Math.min(travelProgress + holdProgress * 0.1, 1)));
      const positionsAttribute = trail.geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let index = 0; index < visibleSamples; index += 1) {
        const sample = pathSamples[index];
        positionsAttribute.setXYZ(index, sample.x, sample.y + 0.03, sample.z);
      }
      if (visibleSamples < pathSamples.length) {
        positionsAttribute.setXYZ(visibleSamples, currentX, currentY + 0.03, currentZ);
      }
      positionsAttribute.needsUpdate = true;
      trail.geometry.setDrawRange(0, Math.max(2, visibleSamples + 1));

      const cameraAngle = elapsed * 0.15;
      const orbitRadius = 6.1;
      camera.position.x = Math.cos(cameraAngle) * orbitRadius;
      camera.position.z = Math.sin(cameraAngle) * orbitRadius;
      camera.position.y = 4.2 + Math.sin(elapsed * 0.7) * 0.18;
      camera.lookAt(surfaceCenter.x, 0.32, surfaceCenter.z);

      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(render);
    };

    raf = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(raf);
      observer.disconnect();
      trailGeometry.dispose();
      learningRateGeometry.dispose();
      surfaceGeometry.dispose();
      surfaceMaterial.dispose();
      (trail.material as THREE.Material).dispose();
      (learningRateSegment.material as THREE.Material).dispose();
      (wireframe.material as THREE.Material).dispose();
      (currentMarker.material as THREE.Material).dispose();
      (learningRateTarget.material as THREE.Material).dispose();
      (minimumMarker.material as THREE.Material).dispose();
      const arrow = gradientArrowRef.current;
      if (arrow) {
        (arrow.line.material as THREE.Material).dispose();
        (arrow.cone.material as THREE.Material).dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div style={cardStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--sw-cyan)',
              marginBottom: 10,
            }}
          >
            {copy.surfaceLabel}
          </div>
          <div style={titleStyle}>{copy.diagramTitle}</div>
        </div>

        <div style={{ ...legendPillStyle('#fbbf24'), flexShrink: 0 }}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: '#fbbf24', boxShadow: '0 0 18px rgba(251,191,36,0.55)' }} />
          <span>{copy.minimumLabel}</span>
        </div>
      </div>

      <p style={descriptionStyle}>{copy.diagramDescription}</p>

      <div style={viewportShellStyle}>
        {prefersReducedMotion ? <StaticGradientFallback copy={copy} /> : <div ref={mountRef} style={{ width: '100%', height: '100%' }} aria-hidden="true" />}

        <div style={floatingNoteStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: '#ff2e97',
                boxShadow: '0 0 18px rgba(255,46,151,0.55)',
                flexShrink: 0,
              }}
            />
            <div style={{ minWidth: 0 }}>
              <div style={hudLabelStyle}>{copy.gradientLabel}</div>
              <div style={hudValueStyle}>oposto ao sentido mais inclinado</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: '#a855f7',
                boxShadow: '0 0 18px rgba(168,85,247,0.55)',
                flexShrink: 0,
              }}
            />
            <div>
              <div style={hudLabelStyle}>{copy.learningRateLabel}</div>
              <div style={hudValueStyle}>passos curtos e controlados</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <span style={legendPillStyle('#ff2e97')}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: '#ff2e97', boxShadow: '0 0 18px rgba(255,46,151,0.55)' }} />
          {copy.gradientLabel}
        </span>
        <span style={legendPillStyle('#a855f7')}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: '#a855f7', boxShadow: '0 0 18px rgba(168,85,247,0.55)' }} />
          {copy.learningRateLabel}
        </span>
        <span style={legendPillStyle('#00e5ff')}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: '#00e5ff', boxShadow: '0 0 18px rgba(0,229,255,0.55)' }} />
          {copy.pathLabel}
        </span>
        <span style={legendPillStyle('#fbbf24')}>
          <span style={{ width: 8, height: 8, borderRadius: 999, background: '#fbbf24', boxShadow: '0 0 18px rgba(251,191,36,0.55)' }} />
          {copy.minimumLabel}
        </span>
      </div>

      <div
        style={{
          paddingTop: 2,
          fontSize: 12.5,
          lineHeight: 1.6,
          color: 'var(--sw-text-muted)',
        }}
      >
        {copy.footerLabel}
      </div>
    </div>
  );
};

export const GradientDescent3DVisual = React.memo(({ copy }: GradientDescent3DVisualProps) => {
  return <GradientDescentScene copy={copy} />;
});

