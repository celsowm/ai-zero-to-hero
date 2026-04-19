import React, { useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import type { LinearRegression2DChartCopy, LinearRegression3DChartVisualCopy } from '../../../types/slide';
import { TabsBar } from '../TabsBar';
import { TabbedPanelSurface } from '../TabbedPanelSurface';

interface LinearRegression3DChartVisualProps {
  copy: LinearRegression3DChartVisualCopy;
}

const fontFamily = "'Space Grotesk', 'Inter', 'Segoe UI', Arial, sans-serif";

const cardStyle: React.CSSProperties = {
  width: '100%',
  height: '100%',
  minHeight: 560,
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
  minHeight: 360,
  borderRadius: 18,
  overflow: 'hidden',
  border: '1px solid rgba(255,255,255,0.06)',
  background:
    'radial-gradient(circle at 18% 18%, rgba(0, 229, 255, 0.16), transparent 28%), radial-gradient(circle at 84% 12%, rgba(255, 46, 151, 0.14), transparent 26%), linear-gradient(180deg, rgba(8, 12, 24, 0.95), rgba(7, 10, 20, 0.98))',
  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.03), 0 24px 42px rgba(0,0,0,0.24)',
};

const overlayCardStyle: React.CSSProperties = {
  position: 'absolute',
  left: 16,
  right: 16,
  bottom: 14,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 10,
  padding: '7px 10px',
  borderRadius: 12,
  background: 'rgba(8, 12, 24, 0.62)',
  border: '1px solid rgba(255,255,255,0.07)',
  backdropFilter: 'blur(12px)',
};

const badgeStyle = (accent: string): React.CSSProperties => ({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '6px 10px',
  borderRadius: 999,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '0.01em',
  color: 'var(--sw-text)',
  background: `${accent}18`,
  border: `1px solid ${accent}35`,
});

const metricStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'baseline',
  gap: 6,
  minWidth: 0,
};

const metricLabelStyle: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--sw-text-muted)',
};

const metricValueStyle: React.CSSProperties = {
  fontSize: 11.5,
  fontWeight: 700,
  color: 'var(--sw-text)',
};

const overlayGroupStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  minWidth: 0,
  flexWrap: 'wrap',
};

const symbolOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  top: 14,
  left: 14,
  width: 240,
  padding: 12,
  borderRadius: 14,
  background: 'rgba(8, 12, 24, 0.72)',
  border: '1px solid rgba(255,255,255,0.08)',
  backdropFilter: 'blur(12px)',
  display: 'grid',
  gap: 10,
};

const symbolOverlayTitleStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 700,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: 'var(--sw-cyan)',
};

const symbolChipRowStyle: React.CSSProperties = {
  display: 'grid',
  gap: 8,
};

const symbolChipStyle: React.CSSProperties = {
  display: 'grid',
  gap: 4,
  padding: '9px 10px',
  borderRadius: 12,
  background: 'rgba(255,255,255,0.035)',
  border: '1px solid rgba(255,255,255,0.06)',
};

const symbolChipLabelStyle: React.CSSProperties = {
  fontSize: 12.5,
  fontWeight: 700,
  color: 'var(--sw-text)',
  lineHeight: 1.25,
};

const symbolChipDescriptionStyle: React.CSSProperties = {
  fontSize: 11.5,
  lineHeight: 1.45,
  color: 'var(--sw-text-dim)',
};

const controlsHintStyle: React.CSSProperties = {
  position: 'absolute',
  top: 14,
  right: 14,
  padding: '8px 10px',
  borderRadius: 12,
  background: 'rgba(8, 12, 24, 0.58)',
  border: '1px solid rgba(255,255,255,0.08)',
  fontSize: 11.5,
  fontWeight: 700,
  letterSpacing: '0.03em',
  color: 'var(--sw-text-muted)',
  backdropFilter: 'blur(10px)',
};

const guideGridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
  gap: 10,
};

const guideCardStyle: React.CSSProperties = {
  padding: '12px 12px 11px',
  borderRadius: 14,
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.06)',
};

type Bounds = {
  heightMin: number;
  heightMax: number;
  ageMin: number;
  ageMax: number;
  weightMin: number;
  weightMax: number;
  floorY: number;
};

type ScenePoint = {
  x: number;
  y: number;
  z: number;
};

type ChartPoint = LinearRegression3DChartVisualCopy['dataset'][number];
type ComparisonChartPoint = LinearRegression2DChartCopy['dataset'][number];

const buildBounds = (copy: LinearRegression3DChartVisualCopy): Bounds => {
  const heights = copy.dataset.map(point => point.height);
  const ages = copy.dataset.map(point => point.age);
  const predictedWeights = copy.dataset.map(
    point => copy.coefficients.beta0 + copy.coefficients.beta1 * point.height + copy.coefficients.beta2 * point.age,
  );
  const realWeights = copy.dataset.map(point => point.realWeight);
  const allWeights = [...realWeights, ...predictedWeights];

  return {
    heightMin: Math.min(...heights),
    heightMax: Math.max(...heights),
    ageMin: Math.min(...ages),
    ageMax: Math.max(...ages),
    weightMin: Math.min(...allWeights),
    weightMax: Math.max(...allWeights),
    floorY: -1.6,
  };
};

const normalize = (value: number, min: number, max: number, size: number, offset = 0) => {
  if (max === min) {
    return offset;
  }

  return ((value - min) / (max - min)) * size - size / 2 + offset;
};

const weightToScene = (weight: number, bounds: Bounds) => {
  if (bounds.weightMax === bounds.weightMin) {
    return 0;
  }

  return ((weight - bounds.weightMin) / (bounds.weightMax - bounds.weightMin)) * 2.8 - 0.2;
};

const toScenePoint = (height: number, age: number, weight: number, bounds: Bounds): ScenePoint => ({
  x: normalize(height, bounds.heightMin, bounds.heightMax, 4.8),
  y: weightToScene(weight, bounds),
  z: normalize(age, bounds.ageMin, bounds.ageMax, 4),
});

const predictWeight = (point: ChartPoint, copy: LinearRegression3DChartVisualCopy) =>
  copy.coefficients.beta0 + copy.coefficients.beta1 * point.height + copy.coefficients.beta2 * point.age;

const makeLabelSprite = (text: string, accent: string, fontSize = 28) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) {
    return null;
  }

  canvas.width = 320;
  canvas.height = 96;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = `700 ${fontSize}px ${fontFamily}`;
  context.textBaseline = 'middle';

  const textWidth = context.measureText(text).width;
  const paddingX = 18;
  const boxWidth = Math.min(canvas.width - 24, textWidth + paddingX * 2);
  const boxHeight = 58;
  const x = (canvas.width - boxWidth) / 2;
  const y = (canvas.height - boxHeight) / 2;

  context.fillStyle = 'rgba(8, 12, 24, 0.82)';
  context.strokeStyle = `${accent}66`;
  context.lineWidth = 2;
  context.beginPath();
  context.roundRect(x, y, boxWidth, boxHeight, 16);
  context.fill();
  context.stroke();

  context.fillStyle = accent;
  context.fillText(text, canvas.width / 2 - textWidth / 2, canvas.height / 2 + 1);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;

  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
  });

  const sprite = new THREE.Sprite(material);
  sprite.scale.set(1.35, 0.4, 1);
  return sprite;
};

const projectPoint = (point: ScenePoint) => ({
  x: 260 + point.x * 54 - point.z * 30,
  y: 258 - point.y * 56 - point.z * 24,
});

const build2DPoint = (value: number, min: number, max: number, start: number, end: number) => {
  if (max === min) {
    return (start + end) / 2;
  }

  return start + ((value - min) / (max - min)) * (end - start);
};

const Static2DComparison: React.FC<{ copy: LinearRegression2DChartCopy }> = ({ copy }) => {
  const heights = copy.dataset.map(point => point.height);
  const weights = copy.dataset.map(point => point.realWeight);
  const minHeight = Math.min(...heights);
  const maxHeight = Math.max(...heights);
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);

  const toPoint = (point: ComparisonChartPoint) => ({
    x: build2DPoint(point.height, minHeight, maxHeight, 92, 438),
    y: build2DPoint(point.realWeight, minWeight, maxWeight, 232, 72),
  });

  const lineStart = copy.lineStart;
  const lineEnd = copy.lineEnd;

  return (
    <div style={{ width: '100%', height: '100%', display: 'grid', gap: 14 }}>
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
            {copy.eyebrow}
          </div>
          <div style={titleStyle}>{copy.title}</div>
        </div>

        <div style={{ ...badgeStyle('#fbbf24'), flexShrink: 0 }}>{copy.lineLabel}</div>
      </div>

      <p style={descriptionStyle}>{copy.description}</p>

      <div
        style={{
          borderRadius: 18,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.06)',
          background:
            'radial-gradient(circle at 20% 18%, rgba(0, 229, 255, 0.10), transparent 30%), radial-gradient(circle at 86% 10%, rgba(255, 46, 151, 0.10), transparent 28%), linear-gradient(180deg, rgba(8, 12, 24, 0.96), rgba(7, 10, 20, 0.98))',
        }}
      >
        <svg viewBox="0 0 520 320" width="100%" height="auto" role="img" aria-label={copy.title} style={{ display: 'block' }}>
          <defs>
            <linearGradient id="lr2d-line-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00e5ff" />
              <stop offset="100%" stopColor="#ff2e97" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="520" height="320" fill="rgba(255,255,255,0.015)" />

          {[92, 152, 212, 272, 332, 392, 452].map(x => (
            <line key={x} x1={x} y1="52" x2={x} y2="258" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}
          {[72, 112, 152, 192, 232].map(y => (
            <line key={y} x1="92" y1={y} x2="452" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}

          <line x1="92" y1="258" x2="452" y2="258" stroke="rgba(255,255,255,0.34)" strokeWidth="2.2" />
          <line x1="92" y1="258" x2="92" y2="52" stroke="rgba(255,255,255,0.34)" strokeWidth="2.2" />

          <line x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y} stroke="url(#lr2d-line-gradient)" strokeWidth="4" strokeLinecap="round" />

          {copy.dataset.map(point => {
            const projected = toPoint(point);
            return (
              <g key={point.label}>
                <circle cx={projected.x} cy={projected.y} r="6.5" fill="rgba(0,0,0,0.2)" />
                <circle cx={projected.x} cy={projected.y} r="5" fill={point.accent} />
                <text x={projected.x} y={projected.y + 20} textAnchor="middle" fontSize="11.5" fontFamily="Space Grotesk, Inter, sans-serif" fill="rgba(232,228,240,0.86)">
                  {point.label}
                </text>
              </g>
            );
          })}

          <text x="470" y="86" textAnchor="end" fontSize="12" fontFamily="Space Grotesk, Inter, sans-serif" fill="rgba(232,228,240,0.78)">
            {copy.lineLabel}
          </text>
          <text x="272" y="304" textAnchor="middle" fontSize="12.5" fontFamily="Space Grotesk, Inter, sans-serif" fill="rgba(232,228,240,0.78)">
            {copy.xLabel}
          </text>
          <text x="22" y="162" transform="rotate(-90 22 162)" textAnchor="middle" fontSize="12.5" fontFamily="Space Grotesk, Inter, sans-serif" fill="rgba(232,228,240,0.78)">
            {copy.yLabel}
          </text>
        </svg>
      </div>

      <div
        style={{
          paddingTop: 2,
          fontSize: 12.5,
          lineHeight: 1.6,
          color: 'var(--sw-text-muted)',
        }}
      >
        {copy.footer}
      </div>

      <div style={{ display: 'grid', gap: 8 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sw-cyan)' }}>
          {copy.symbolGuideTitle}
        </div>
        <div style={guideGridStyle}>
          {copy.symbolGuide.map(item => (
            <div key={item.symbol} style={guideCardStyle}>
              <div style={{ ...badgeStyle(item.accent), display: 'inline-flex', marginBottom: 8 }}>
                {item.symbol}
              </div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--sw-text)', lineHeight: 1.35, marginBottom: 5 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 11.5, lineHeight: 1.55, color: 'var(--sw-text-dim)' }}>{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StaticFallback: React.FC<{ copy: LinearRegression3DChartVisualCopy }> = ({ copy }) => {
  const bounds = buildBounds(copy);
  const planeCorners = [
    toScenePoint(bounds.heightMin, bounds.ageMin, copy.coefficients.beta0 + copy.coefficients.beta1 * bounds.heightMin + copy.coefficients.beta2 * bounds.ageMin, bounds),
    toScenePoint(bounds.heightMax, bounds.ageMin, copy.coefficients.beta0 + copy.coefficients.beta1 * bounds.heightMax + copy.coefficients.beta2 * bounds.ageMin, bounds),
    toScenePoint(bounds.heightMax, bounds.ageMax, copy.coefficients.beta0 + copy.coefficients.beta1 * bounds.heightMax + copy.coefficients.beta2 * bounds.ageMax, bounds),
    toScenePoint(bounds.heightMin, bounds.ageMax, copy.coefficients.beta0 + copy.coefficients.beta1 * bounds.heightMin + copy.coefficients.beta2 * bounds.ageMax, bounds),
  ].map(projectPoint);

  const axisOrigin = projectPoint({ x: -2.5, y: bounds.floorY, z: -2.2 });
  const xAxisEnd = projectPoint({ x: 2.5, y: bounds.floorY, z: -2.2 });
  const yAxisEnd = projectPoint({ x: -2.5, y: 3.25, z: -2.2 });
  const zAxisEnd = projectPoint({ x: -2.5, y: bounds.floorY, z: 2.2 });

  return (
    <svg
      viewBox="0 0 520 380"
      width="100%"
      height="100%"
      role="img"
      aria-label={copy.title}
      style={{ display: 'block', width: '100%', height: '100%' }}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="lr3d-fallback-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b1020" />
          <stop offset="100%" stopColor="#090d18" />
        </linearGradient>
        <linearGradient id="lr3d-plane" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00e5ff" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#ff2e97" stopOpacity="0.24" />
        </linearGradient>
      </defs>

      <rect width="520" height="380" rx="18" fill="url(#lr3d-fallback-bg)" />

      <polygon
        points={planeCorners.map(point => `${point.x},${point.y}`).join(' ')}
        fill="url(#lr3d-plane)"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="2"
      />

      <line x1={axisOrigin.x} y1={axisOrigin.y} x2={xAxisEnd.x} y2={xAxisEnd.y} stroke="#00e5ff" strokeWidth="3" />
      <line x1={axisOrigin.x} y1={axisOrigin.y} x2={yAxisEnd.x} y2={yAxisEnd.y} stroke="#fbbf24" strokeWidth="3" />
      <line x1={axisOrigin.x} y1={axisOrigin.y} x2={zAxisEnd.x} y2={zAxisEnd.y} stroke="#ff2e97" strokeWidth="3" />

      <text x={xAxisEnd.x + 10} y={xAxisEnd.y + 4} fill="#00e5ff" fontFamily={fontFamily} fontSize="12" fontWeight="700">
        {copy.axisLabels.x}
      </text>
      <text x={yAxisEnd.x - 8} y={yAxisEnd.y - 8} fill="#fbbf24" fontFamily={fontFamily} fontSize="12" fontWeight="700">
        {copy.axisLabels.y}
      </text>
      <text x={zAxisEnd.x - 8} y={zAxisEnd.y + 18} fill="#ff2e97" fontFamily={fontFamily} fontSize="12" fontWeight="700">
        {copy.axisLabels.z}
      </text>

      {copy.dataset.map(point => {
        const predictedWeight = predictWeight(point, copy);
        const realPoint = projectPoint(toScenePoint(point.height, point.age, point.realWeight, bounds));
        const predictedPoint = projectPoint(toScenePoint(point.height, point.age, predictedWeight, bounds));

        return (
          <g key={point.label}>
            <line
              x1={predictedPoint.x}
              y1={predictedPoint.y}
              x2={realPoint.x}
              y2={realPoint.y}
              stroke={point.accent}
              strokeWidth="2.4"
              strokeDasharray="6 6"
              opacity="0.95"
            />
            <circle cx={predictedPoint.x} cy={predictedPoint.y} r="4.5" fill="#111827" stroke="#f8fafc" strokeWidth="1.6" />
            <circle cx={realPoint.x} cy={realPoint.y} r="6" fill={point.accent} />
            <text x={realPoint.x + 10} y={realPoint.y - 8} fill="rgba(232,228,240,0.86)" fontFamily={fontFamily} fontSize="10.5">
              {point.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

const LinearRegression3DScene: React.FC<{ copy: LinearRegression3DChartVisualCopy }> = ({ copy }) => {
  const mountRef = React.useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion] = useState(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return false;
    }

    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });
  const [supportsWebGL] = useState(() => {
    if (typeof document === 'undefined') {
      return false;
    }

    try {
      const canvas = document.createElement('canvas');
      return Boolean(
        canvas.getContext('webgl2') ||
          canvas.getContext('webgl') ||
          canvas.getContext('experimental-webgl'),
      );
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (prefersReducedMotion || !supportsWebGL || !mountRef.current) {
      return;
    }

    const mountNode = mountRef.current;
    const bounds = buildBounds(copy);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x0b1020, 8.5, 16);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(5.2, 4.6, 5.4);
    camera.lookAt(0, 0.9, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mountNode.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = true;
    controls.screenSpacePanning = true;
    controls.panSpeed = 0.8;
    controls.minDistance = 4.4;
    controls.maxDistance = 10;
    controls.minPolarAngle = 0.45;
    controls.maxPolarAngle = Math.PI / 2.05;
    controls.target.set(0, 0.72, 0);

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

    const planeGeometry = new THREE.PlaneGeometry(4.6, 3.8, 18, 18);
    const planePositions = planeGeometry.attributes.position;
    for (let index = 0; index < planePositions.count; index += 1) {
      const xLocal = planePositions.getX(index);
      const zLocal = planePositions.getY(index);
      const height = ((xLocal + 2.3) / 4.6) * (bounds.heightMax - bounds.heightMin) + bounds.heightMin;
      const age = ((zLocal + 1.9) / 3.8) * (bounds.ageMax - bounds.ageMin) + bounds.ageMin;
      const weight = copy.coefficients.beta0 + copy.coefficients.beta1 * height + copy.coefficients.beta2 * age;
      planePositions.setZ(index, weightToScene(weight, bounds));
    }
    planePositions.needsUpdate = true;
    planeGeometry.rotateX(-Math.PI / 2);
    planeGeometry.computeVertexNormals();

    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0x163456,
      emissive: 0x0a1b2f,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.66,
      roughness: 0.5,
      metalness: 0.18,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(plane);

    const planeWireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(planeGeometry),
      new THREE.LineBasicMaterial({
        color: 0x82b6d9,
        transparent: true,
        opacity: 0.18,
      }),
    );
    scene.add(planeWireframe);

    const grid = new THREE.GridHelper(6.2, 10, 0x314566, 0x23334f);
    grid.position.y = bounds.floorY;
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach(material => {
      material.transparent = true;
      material.opacity = 0.22;
    });
    scene.add(grid);

    const ambient = new THREE.HemisphereLight(0xbfd3ff, 0x08111d, 1.15);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.75);
    keyLight.position.set(5, 7, 4);
    scene.add(keyLight);

    const cyanLight = new THREE.PointLight(0x00e5ff, 1.2, 18, 2);
    cyanLight.position.set(1.4, 3.4, -0.6);
    scene.add(cyanLight);

    const pinkLight = new THREE.PointLight(0xff2e97, 1.0, 16, 2);
    pinkLight.position.set(-2.5, 2.8, 2);
    scene.add(pinkLight);

    const axisOrigin = new THREE.Vector3(-2.55, bounds.floorY, -2.15);
    const xAxis = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), axisOrigin, 5.1, 0x00e5ff, 0.2, 0.12);
    const yAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), axisOrigin, 5.45, 0xfbbf24, 0.2, 0.12);
    const zAxis = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), axisOrigin, 4.6, 0xff2e97, 0.2, 0.12);
    scene.add(xAxis);
    scene.add(yAxis);
    scene.add(zAxis);

    const axisSprites = [
      { text: copy.axisLabels.x, accent: '#00e5ff', position: new THREE.Vector3(2.95, bounds.floorY + 0.16, -2.15) },
      { text: copy.axisLabels.y, accent: '#fbbf24', position: new THREE.Vector3(-2.55, 4.0, -2.15) },
      { text: copy.axisLabels.z, accent: '#ff2e97', position: new THREE.Vector3(-2.55, bounds.floorY + 0.16, 2.55) },
    ];
    const createdSprites: THREE.Sprite[] = [];
    axisSprites.forEach(item => {
      const sprite = makeLabelSprite(item.text, item.accent, 26);
      if (sprite) {
        sprite.position.copy(item.position);
        scene.add(sprite);
        createdSprites.push(sprite);
      }
    });

    const createdMaterials: THREE.Material[] = [];
    const createdGeometries: THREE.BufferGeometry[] = [planeGeometry];

    copy.dataset.forEach(point => {
      const predictedWeight = predictWeight(point, copy);
      const realScenePoint = toScenePoint(point.height, point.age, point.realWeight, bounds);
      const predictedScenePoint = toScenePoint(point.height, point.age, predictedWeight, bounds);

      const residualGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(predictedScenePoint.x, predictedScenePoint.y, predictedScenePoint.z),
        new THREE.Vector3(realScenePoint.x, realScenePoint.y, realScenePoint.z),
      ]);
      const residualMaterial = new THREE.LineDashedMaterial({
        color: new THREE.Color(point.accent),
        dashSize: 0.15,
        gapSize: 0.09,
        transparent: true,
        opacity: 0.95,
      });
      const residual = new THREE.Line(residualGeometry, residualMaterial);
      residual.computeLineDistances();
      scene.add(residual);
      createdGeometries.push(residualGeometry);
      createdMaterials.push(residualMaterial);

      const realMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(point.accent),
        emissive: new THREE.Color(point.accent).multiplyScalar(0.22),
        emissiveIntensity: 1,
        roughness: 0.26,
        metalness: 0.12,
      });
      const realMarker = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 24), realMaterial);
      realMarker.position.set(realScenePoint.x, realScenePoint.y, realScenePoint.z);
      scene.add(realMarker);
      createdGeometries.push(realMarker.geometry);
      createdMaterials.push(realMaterial);

      const predictedMaterial = new THREE.MeshStandardMaterial({
        color: 0xf8fafc,
        emissive: 0x44505f,
        emissiveIntensity: 0.24,
        roughness: 0.38,
        metalness: 0.12,
      });
      const predictedMarker = new THREE.Mesh(new THREE.SphereGeometry(0.08, 20, 20), predictedMaterial);
      predictedMarker.position.set(predictedScenePoint.x, predictedScenePoint.y, predictedScenePoint.z);
      scene.add(predictedMarker);
      createdGeometries.push(predictedMarker.geometry);
      createdMaterials.push(predictedMaterial);

      const stemGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(realScenePoint.x, bounds.floorY, realScenePoint.z),
        new THREE.Vector3(realScenePoint.x, realScenePoint.y, realScenePoint.z),
      ]);
      const stemMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(point.accent),
        transparent: true,
        opacity: 0.24,
      });
      const stem = new THREE.Line(stemGeometry, stemMaterial);
      scene.add(stem);
      createdGeometries.push(stemGeometry);
      createdMaterials.push(stemMaterial);
    });

    resize();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    observer?.observe(mountNode);

    let raf = 0;
    const render = () => {
      controls.update();
      renderer.render(scene, camera);
      raf = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(raf);
      controls.dispose();
      observer?.disconnect();
      createdSprites.forEach(sprite => {
        if (sprite.material instanceof THREE.SpriteMaterial) {
          sprite.material.map?.dispose();
          sprite.material.dispose();
        }
      });
      createdMaterials.forEach(material => material.dispose());
      createdGeometries.forEach(geometry => geometry.dispose());
      planeMaterial.dispose();
      planeWireframe.geometry.dispose();
      (planeWireframe.material as THREE.Material).dispose();
      (xAxis.line.material as THREE.Material).dispose();
      (xAxis.cone.material as THREE.Material).dispose();
      (yAxis.line.material as THREE.Material).dispose();
      (yAxis.cone.material as THREE.Material).dispose();
      (zAxis.line.material as THREE.Material).dispose();
      (zAxis.cone.material as THREE.Material).dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mountNode) {
        mountNode.removeChild(renderer.domElement);
      }
    };
  }, [copy, prefersReducedMotion, supportsWebGL]);

  if (prefersReducedMotion || !supportsWebGL) {
    return <StaticFallback copy={copy} />;
  }

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} aria-hidden="true" />;
};

export const LinearRegression3DChartVisual: React.FC<LinearRegression3DChartVisualProps> = ({ copy }) => {
  const [activeTab, setActiveTab] = useState(0);
  const showComparison = Boolean(copy.tabs && copy.comparisonChart);
  const safeIndex = showComparison && activeTab === 1 ? 1 : 0;

  const renderTabs = () =>
    showComparison ? (
      <TabsBar
        ariaLabel="Linear regression views"
        items={copy.tabs!}
        activeIndex={safeIndex}
        onChange={setActiveTab}
      />
    ) : null;

  if (safeIndex === 1 && copy.comparisonChart) {
    return (
      <div style={cardStyle}>
        {renderTabs()}
        <TabbedPanelSurface minHeight={560}>
          <Static2DComparison copy={copy.comparisonChart} />
        </TabbedPanelSurface>
      </div>
    );
  }

  return (
    <div style={cardStyle}>
      {renderTabs()}

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
            {copy.eyebrow}
          </div>
          <div style={titleStyle}>{copy.title}</div>
        </div>

        <div style={{ ...badgeStyle('#fbbf24'), flexShrink: 0 }}>{copy.coefficients.formula}</div>
      </div>

      <p style={descriptionStyle}>{copy.description}</p>

      <TabbedPanelSurface minHeight={560}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={viewportShellStyle}>
            <LinearRegression3DScene copy={copy} />

            <div style={symbolOverlayStyle}>
              <div style={symbolOverlayTitleStyle}>{copy.symbolGuideTitle}</div>
              <div style={symbolChipRowStyle}>
                {copy.symbolGuide.map(item => (
                  <div key={item.symbol} style={symbolChipStyle}>
                    <div style={{ ...badgeStyle(item.accent), alignSelf: 'flex-start' }}>{item.symbol}</div>
                    <div style={symbolChipLabelStyle}>{item.label}</div>
                    <div style={symbolChipDescriptionStyle}>{item.description}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={overlayCardStyle}>
              <div style={overlayGroupStyle}>
                <span style={badgeStyle('#00e5ff')}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#00e5ff', boxShadow: '0 0 18px rgba(0,229,255,0.55)' }} />
                  {copy.planeLabel}
                </span>
                <span style={badgeStyle('#34d399')}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#34d399', boxShadow: '0 0 18px rgba(52,211,153,0.55)' }} />
                  {copy.realLabel}
                </span>
                <span style={badgeStyle('#f8fafc')}>
                  <span style={{ width: 8, height: 8, borderRadius: 999, background: '#f8fafc', boxShadow: '0 0 18px rgba(248,250,252,0.4)' }} />
                  {copy.predictedLabel}
                </span>
              </div>

              <div style={{ ...overlayGroupStyle, justifyContent: 'flex-end' }}>
                <div style={metricStyle}>
                  <div style={metricLabelStyle}>X</div>
                  <div style={metricValueStyle}>{copy.axisLabels.x}</div>
                </div>
                <div style={metricStyle}>
                  <div style={metricLabelStyle}>Y</div>
                  <div style={metricValueStyle}>{copy.axisLabels.y}</div>
                </div>
                <div style={metricStyle}>
                  <div style={metricLabelStyle}>Z</div>
                  <div style={metricValueStyle}>{copy.axisLabels.z}</div>
                </div>
              </div>
            </div>

            <div style={controlsHintStyle}>arraste para girar, scroll para zoom</div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <span style={badgeStyle('#fbbf24')}>β₀ = {copy.coefficients.beta0}</span>
            <span style={badgeStyle('#00e5ff')}>β₁ = {copy.coefficients.beta1}</span>
            <span style={badgeStyle('#ff2e97')}>β₂ = {copy.coefficients.beta2}</span>
            <span style={badgeStyle('#a855f7')}>y = {copy.realLabel}</span>
            <span style={badgeStyle('#34d399')}>ŷ = {copy.predictedLabel}</span>
          </div>

          <div style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--sw-text-muted)' }}>{copy.footer}</div>
        </div>
      </TabbedPanelSurface>
    </div>
  );
};
