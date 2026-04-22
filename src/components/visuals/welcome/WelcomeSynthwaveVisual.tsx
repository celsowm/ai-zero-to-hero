import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { WelcomeSynthwaveCopy } from '../../../types/slide';

interface WelcomeSynthwaveVisualProps {
  copy: WelcomeSynthwaveCopy;
}

/* ── Palette ── */
const SKY_TOP = new THREE.Color('#1a0a2e');
const SKY_BOTTOM = new THREE.Color('#2d1b4e');
const SUN_PINK = new THREE.Color('#ff2e97');
const SUN_ORANGE = new THREE.Color('#ff6b35');
const GRID_CYAN = new THREE.Color('#00e5ff');
const PALM_PURPLE = new THREE.Color('#4a1a6b');
const PALM_PINK = new THREE.Color('#ff2e97');

export const WelcomeSynthwaveVisual: React.FC<WelcomeSynthwaveVisualProps> = ({ copy }) => {
  const mountRef = useRef<HTMLDivElement | null>(null);
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

    const mount = mountRef.current;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(new THREE.Color('#1a0a2e'), 0.035);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 200);
    camera.position.set(0, 1.6, 6.5);
    camera.lookAt(0, 1.2, -15);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(SKY_TOP.clone(), 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const geoTrash: THREE.BufferGeometry[] = [];
    const matTrash: THREE.Material[] = [];
    const texTrash: THREE.Texture[] = [];
    const trackGeo = (g: THREE.BufferGeometry) => { geoTrash.push(g); return g; };
    const trackMat = (m: THREE.Material) => { matTrash.push(m); return m; };
    const trackTex = (t: THREE.Texture) => { texTrash.push(t); return t; };

    /* ── Sky Gradient Background ── */
    const skyGeo = trackGeo(new THREE.PlaneGeometry(200, 100));
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 2;
    skyCanvas.height = 256;
    const skyCtx = skyCanvas.getContext('2d')!;
    const skyGrad = skyCtx.createLinearGradient(0, 0, 0, 256);
    skyGrad.addColorStop(0.0, '#0f0520');
    skyGrad.addColorStop(0.35, '#1a0a2e');
    skyGrad.addColorStop(0.65, '#2d1b4e');
    skyGrad.addColorStop(0.85, '#4a1a6b');
    skyGrad.addColorStop(1.0, '#1a0a2e');
    skyCtx.fillStyle = skyGrad;
    skyCtx.fillRect(0, 0, 2, 256);
    const skyTex = trackTex(new THREE.CanvasTexture(skyCanvas));
    skyTex.colorSpace = THREE.SRGBColorSpace;
    const skyMat = trackMat(new THREE.MeshBasicMaterial({ map: skyTex, depthWrite: false, side: THREE.BackSide }));
    const skyMesh = new THREE.Mesh(skyGeo, skyMat);
    skyMesh.position.set(0, 10, -20);
    scene.add(skyMesh);

    /* ── Grid Floor ── */
    const gridVert = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const gridFrag = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uColor;
      uniform float uOpacity;
      varying vec2 vUv;

      void main() {
        float scale = 40.0;
        float speed = 2.5;
        vec2 guv = vUv * scale;
        guv.y -= uTime * speed;

        float lineW = 0.025;
        vec2 f = fract(guv) - 0.5;
        vec2 d = abs(f);

        float line = smoothstep(lineW, lineW + 0.03, d.x) * smoothstep(lineW, lineW + 0.03, d.y);
        float a = (1.0 - line) * uOpacity;

        // Perspective fade - stronger near horizon
        float horizonFade = 1.0 - smoothstep(0.7, 0.95, vUv.y);
        a *= horizonFade;

        // Glow near bottom
        float glow = exp(-vUv.y * 2.0) * 0.4;
        vec3 col = mix(uColor, vec3(1.0), glow);

        // Sun reflection on floor
        float sunRef = exp(-pow(vUv.x - 0.5, 2.0) * 30.0) * (1.0 - vUv.y) * 0.5;
        col += vec3(1.0, 0.18, 0.59) * sunRef;

        gl_FragColor = vec4(col, a);
      }
    `;

    const gridGeo = trackGeo(new THREE.PlaneGeometry(80, 80));
    const gridMat = trackMat(
      new THREE.ShaderMaterial({
        vertexShader: gridVert,
        fragmentShader: gridFrag,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: GRID_CYAN.clone() },
          uOpacity: { value: 0.85 },
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = -0.01;
    scene.add(gridMesh);

    /* ── Reflection Grid ── */
    const reflectMat = trackMat(
      new THREE.ShaderMaterial({
        vertexShader: gridVert,
        fragmentShader: gridFrag,
        uniforms: {
          uTime: { value: 0 },
          uColor: { value: GRID_CYAN.clone() },
          uOpacity: { value: 0.12 },
        },
        transparent: true,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
    );
    const reflectMesh = new THREE.Mesh(trackGeo(new THREE.PlaneGeometry(80, 80)), reflectMat);
    reflectMesh.rotation.x = -Math.PI / 2;
    reflectMesh.scale.y = -1;
    reflectMesh.position.y = -0.02;
    scene.add(reflectMesh);

    /* ── Sun ── */
    const sunCanvas = document.createElement('canvas');
    sunCanvas.width = 512;
    sunCanvas.height = 512;
    const sunCtx = sunCanvas.getContext('2d')!;

    // Sun gradient
    const sunGrad = sunCtx.createRadialGradient(256, 256, 0, 256, 256, 256);
    sunGrad.addColorStop(0.0, '#ff6b9d');
    sunGrad.addColorStop(0.4, '#ff2e97');
    sunGrad.addColorStop(0.7, '#ff6b35');
    sunGrad.addColorStop(1.0, '#ff2e97');
    sunCtx.fillStyle = sunGrad;
    sunCtx.fillRect(0, 0, 512, 512);

    // Horizontal stripes
    sunCtx.globalCompositeOperation = 'source-atop';
    const numStripes = 14;
    for (let i = 0; i < numStripes; i++) {
      const y = (i / numStripes) * 512;
      const h = (512 / numStripes) * 0.45;
      sunCtx.fillStyle = '#1a0a2e';
      sunCtx.fillRect(0, y + h * 0.5, 512, h * 0.5);
    }

    const sunTex = trackTex(new THREE.CanvasTexture(sunCanvas));
    sunTex.colorSpace = THREE.SRGBColorSpace;

    const sunGeo = trackGeo(new THREE.CircleGeometry(3.5, 64));
    const sunMatBasic = trackMat(new THREE.MeshBasicMaterial({
      map: sunTex,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    }));
    const sunMesh = new THREE.Mesh(sunGeo, sunMatBasic);
    sunMesh.position.set(0, 2.5, -16);
    scene.add(sunMesh);

    // Sun outer glow layers
    for (let i = 0; i < 3; i++) {
      const glowGeo = trackGeo(new THREE.CircleGeometry(3.8 + i * 0.6, 64));
      const glowMat = trackMat(new THREE.MeshBasicMaterial({
        color: SUN_PINK,
        transparent: true,
        opacity: 0.08 - i * 0.02,
        depthWrite: false,
        side: THREE.DoubleSide,
      }));
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.copy(sunMesh.position);
      glow.position.z += 0.1 + i * 0.05;
      scene.add(glow);
    }

    /* ── Mountains ── */
    const mountainMat = trackMat(new THREE.MeshBasicMaterial({ color: 0x0a0618, side: THREE.DoubleSide }));
    const mountainWireMat = trackMat(new THREE.MeshBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: 0.25, wireframe: true }));

    const createMountainRange = (side: 1 | -1) => {
      const positions = [
        { x: 2.5, z: -2, h: 2.5, r: 1.8 },
        { x: 4.0, z: 0, h: 3.2, r: 2.1 },
        { x: 2.0, z: 2, h: 1.8, r: 1.4 },
        { x: 5.5, z: 3, h: 2.8, r: 1.9 },
        { x: 3.5, z: 5, h: 2.0, r: 1.6 },
        { x: 6.5, z: 6, h: 3.0, r: 2.2 },
        { x: 2.8, z: 8, h: 1.5, r: 1.2 },
        { x: 7.0, z: 9, h: 2.5, r: 1.8 },
        { x: 4.0, z: 11, h: 1.8, r: 1.4 },
        { x: 5.5, z: 13, h: 2.2, r: 1.6 },
        { x: 3.0, z: 15, h: 1.2, r: 1.0 },
      ];

      positions.forEach((p) => {
        const geo = trackGeo(new THREE.ConeGeometry(p.r, p.h, 5));
        const mesh = new THREE.Mesh(geo, mountainMat);
        mesh.position.set(p.x * side, p.h / 2 - 0.3, -p.z);
        scene.add(mesh);

        const wireGeo = trackGeo(new THREE.WireframeGeometry(geo));
        const wire = new THREE.LineSegments(wireGeo, mountainWireMat);
        wire.position.copy(mesh.position);
        scene.add(wire);
      });
    };

    createMountainRange(1);
    createMountainRange(-1);

    /* ── Palm Trees ── */
    const createPalmTree = (x: number, z: number, scale: number, leanAngle: number) => {
      const group = new THREE.Group();

      // Trunk using curve
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(leanAngle * 0.1, 0.3 * scale, 0),
        new THREE.Vector3(leanAngle * 0.2, 0.6 * scale, 0),
        new THREE.Vector3(leanAngle * 0.35, 0.9 * scale, 0),
        new THREE.Vector3(leanAngle * 0.5, 1.15 * scale, 0),
      ]);

      const trunkGeo = trackGeo(new THREE.TubeGeometry(curve, 12, 0.04 * scale, 6, false));
      const trunkMat = trackMat(new THREE.MeshStandardMaterial({
        color: 0x2d1b4e,
        emissive: 0x1a0a2e,
        emissiveIntensity: 0.3,
        roughness: 0.8,
        metalness: 0.1,
      }));
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      group.add(trunk);

      // Leaves
      const leafCount = 9;
      for (let i = 0; i < leafCount; i++) {
        const angle = (i / leafCount) * Math.PI * 2 + Math.random() * 0.3;
        const leafLen = 0.5 * scale;
        const leafWid = 0.15 * scale;

        // Create palm leaf shape
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.quadraticCurveTo(leafWid * 0.5, leafLen * 0.5, 0, leafLen);
        shape.quadraticCurveTo(-leafWid * 0.5, leafLen * 0.5, 0, 0);

        const leafGeo = trackGeo(new THREE.ShapeGeometry(shape, 4));
        const leafMat = trackMat(new THREE.MeshStandardMaterial({
          color: 0x4a1a6b,
          emissive: 0xff2e97,
          emissiveIntensity: 0.15,
          roughness: 0.7,
          side: THREE.DoubleSide,
        }));
        const leaf = new THREE.Mesh(leafGeo, leafMat);

        leaf.position.y = 1.15 * scale;
        leaf.position.x = leanAngle * 0.5;
        leaf.rotation.y = angle;
        leaf.rotation.x = -Math.PI / 2.8;
        leaf.rotation.z = (Math.random() - 0.5) * 0.2;

        group.add(leaf);
      }

      group.position.set(x, 0, z);
      scene.add(group);
      return group;
    };

    const palms: THREE.Group[] = [];

    // Left side palms
    palms.push(createPalmTree(-2.8, 1.5, 1.4, -0.1));
    palms.push(createPalmTree(-3.8, 4.5, 1.6, -0.15));
    palms.push(createPalmTree(-2.2, 7.5, 1.2, -0.08));
    palms.push(createPalmTree(-4.5, 10.5, 1.5, -0.12));
    palms.push(createPalmTree(-1.8, 13.5, 1.0, -0.05));

    // Right side palms
    palms.push(createPalmTree(2.8, 2.0, 1.3, 0.1));
    palms.push(createPalmTree(3.8, 5.0, 1.5, 0.12));
    palms.push(createPalmTree(2.2, 8.0, 1.1, 0.08));
    palms.push(createPalmTree(4.5, 11.0, 1.4, 0.15));
    palms.push(createPalmTree(1.8, 14.0, 0.9, 0.05));

    // Center far palms
    palms.push(createPalmTree(-1.2, 16, 0.8, -0.03));
    palms.push(createPalmTree(1.2, 16.5, 0.8, 0.03));
    palms.push(createPalmTree(0, 17, 0.7, 0));

    /* ── Stars ── */
    const starCount = 80;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 60;
      starPositions[i * 3 + 1] = 4 + Math.random() * 10;
      starPositions[i * 3 + 2] = -5 - Math.random() * 25;
    }
    const starGeo = trackGeo(new THREE.BufferGeometry());
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = trackMat(new THREE.PointsMaterial({ color: 0xffffff, size: 0.04, transparent: true, opacity: 0.6 }));
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ── Animation ── */
    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      gridMat.uniforms.uTime.value = elapsed;
      reflectMat.uniforms.uTime.value = elapsed;

      // Sun gentle pulse
      const pulse = 1.0 + Math.sin(elapsed * 0.8) * 0.015;
      sunMesh.scale.setScalar(pulse);

      // Palm sway
      palms.forEach((p, i) => {
        p.rotation.z = Math.sin(elapsed * 0.9 + i * 1.7) * 0.025;
        p.rotation.x = Math.sin(elapsed * 0.6 + i * 2.1) * 0.015;
      });

      // Camera drift
      camera.position.x = Math.sin(elapsed * 0.1) * 0.15;
      camera.position.y = 1.6 + Math.sin(elapsed * 0.15) * 0.08;
      camera.lookAt(0, 1.2, -15);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    resize();
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      geoTrash.forEach((g) => g.dispose());
      matTrash.forEach((m) => m.dispose());
      texTrash.forEach((t) => t.dispose());
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [prefersReducedMotion]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        borderRadius: 18,
        background: 'linear-gradient(180deg, #0f0520 0%, #1a0a2e 30%, #2d1b4e 70%, #1a0a2e 100%)',
      }}
    >
      {prefersReducedMotion ? (
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            gap: 16,
            padding: 24,
            textAlign: 'center',
          }}
        >
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: '#ff2e97',
              textShadow: '0 0 20px rgba(255,46,151,0.4)',
            }}
          >
            {copy.subtitle}
          </h2>
          <p style={{ fontSize: 16, color: '#b0a8c4', maxWidth: 480 }}>{copy.instructions}</p>
        </div>
      ) : (
        <>
          <div ref={mountRef} style={{ width: '100%', height: '100%' }} aria-hidden="true" />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '32px 24px',
              pointerEvents: 'none',
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.6,
                color: 'rgba(232,228,240,0.85)',
                textShadow: '0 2px 12px rgba(0,0,0,0.6)',
                maxWidth: 520,
                marginBottom: 12,
              }}
            >
              {copy.instructions}
            </p>
            <div
              style={{
                fontSize: 12,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--sw-cyan)',
                textShadow: '0 0 12px rgba(0,229,255,0.3)',
              }}
            >
              {copy.subtitle}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
