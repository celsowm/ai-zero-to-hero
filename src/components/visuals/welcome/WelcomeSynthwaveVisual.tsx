import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { WelcomeSynthwaveCopy } from '../../../types/slide';

interface WelcomeSynthwaveVisualProps {
  copy: WelcomeSynthwaveCopy;
}

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

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 250);
    camera.position.set(0, 2.0, 8.0);
    camera.lookAt(0, 1.6, -20);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
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

    const disposables: { geo?: THREE.BufferGeometry; mat?: THREE.Material; tex?: THREE.Texture }[] = [];
    const track = <T extends THREE.BufferGeometry | THREE.Material | THREE.Texture>(obj: T): T => {
      if (obj instanceof THREE.BufferGeometry) disposables.push({ geo: obj });
      else if (obj instanceof THREE.Material) disposables.push({ mat: obj });
      else if (obj instanceof THREE.Texture) disposables.push({ tex: obj });
      return obj;
    };

    /* ── Sky ── */
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 4;
    skyCanvas.height = 512;
    const skyCtx = skyCanvas.getContext('2d')!;
    const skyGradient = skyCtx.createLinearGradient(0, 0, 0, 512);
    skyGradient.addColorStop(0.00, '#050111');
    skyGradient.addColorStop(0.25, '#0a0520');
    skyGradient.addColorStop(0.45, '#1a0a2e');
    skyGradient.addColorStop(0.58, '#3d1566');
    skyGradient.addColorStop(0.68, '#6b1d7a');
    skyGradient.addColorStop(0.76, '#c4285e');
    skyGradient.addColorStop(0.84, '#ff6b35');
    skyGradient.addColorStop(0.92, '#ff2e97');
    skyGradient.addColorStop(1.00, '#1a0a2e');
    skyCtx.fillStyle = skyGradient;
    skyCtx.fillRect(0, 0, 4, 512);
    const skyTex = track(new THREE.CanvasTexture(skyCanvas));
    skyTex.colorSpace = THREE.SRGBColorSpace;

    const skyGeo = track(new THREE.PlaneGeometry(300, 150));
    const skyMat = track(new THREE.MeshBasicMaterial({ map: skyTex, depthWrite: false, side: THREE.DoubleSide }));
    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.position.set(0, 30, -60);
    scene.add(sky);

    /* ── Sun ── */
    const sunCanvas = document.createElement('canvas');
    sunCanvas.width = 512;
    sunCanvas.height = 512;
    const sunCtx = sunCanvas.getContext('2d')!;
    const sunGrad = sunCtx.createRadialGradient(256, 256, 0, 256, 256, 250);
    sunGrad.addColorStop(0.0, '#ffe4b5');
    sunGrad.addColorStop(0.2, '#ffb347');
    sunGrad.addColorStop(0.45, '#ff6b35');
    sunGrad.addColorStop(0.7, '#ff2e97');
    sunGrad.addColorStop(1.0, '#ff2e97');
    sunCtx.fillStyle = sunGrad;
    sunCtx.fillRect(0, 0, 512, 512);

    sunCtx.globalCompositeOperation = 'source-atop';
    const stripeCount = 18;
    const stripeStart = 0.35;
    for (let i = 0; i < stripeCount; i++) {
      const t = stripeStart + (i / stripeCount) * (1 - stripeStart);
      const y = t * 512;
      const h = (512 / stripeCount) * 0.52;
      const opacity = 0.5 + (i / stripeCount) * 0.5;
      sunCtx.fillStyle = `rgba(10, 5, 32, ${opacity})`;
      sunCtx.fillRect(0, y, 512, h);
    }
    sunCtx.globalCompositeOperation = 'source-over';

    // Cut into circle
    sunCtx.globalCompositeOperation = 'destination-in';
    sunCtx.beginPath();
    sunCtx.arc(256, 256, 250, 0, Math.PI * 2);
    sunCtx.fill();
    sunCtx.globalCompositeOperation = 'source-over';

    const sunTex = track(new THREE.CanvasTexture(sunCanvas));
    sunTex.colorSpace = THREE.SRGBColorSpace;

    const sunGeo = track(new THREE.CircleGeometry(7, 128));
    const sunMat = track(new THREE.MeshBasicMaterial({
      map: sunTex,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    }));
    const sunMesh = new THREE.Mesh(sunGeo, sunMat);
    sunMesh.position.set(0, 3.8, -40);
    scene.add(sunMesh);

    // Sun glow rings
    const glowSizes = [7.5, 8.5, 10.0];
    const glowOpacities = [0.12, 0.07, 0.035];
    for (let i = 0; i < 3; i++) {
      const gGeo = track(new THREE.CircleGeometry(glowSizes[i], 64));
      const gMat = track(new THREE.MeshBasicMaterial({
        color: 0xff2e97,
        transparent: true,
        opacity: glowOpacities[i],
        depthWrite: false,
        side: THREE.DoubleSide,
      }));
      const gMesh = new THREE.Mesh(gGeo, gMat);
      gMesh.position.set(sunMesh.position.x, sunMesh.position.y, sunMesh.position.z + 0.1 * (i + 1));
      scene.add(gMesh);
    }

    /* ── Mountains (silhouettes) ── */
    const buildMountain = (points: [number, number][], x: number, z: number): THREE.Mesh => {
      const shape = new THREE.Shape();
      shape.moveTo(points[0][0], points[0][1]);
      for (let i = 1; i < points.length; i++) {
        shape.lineTo(points[i][0], points[i][1]);
      }
      shape.lineTo(points[points.length - 1][0], -2);
      shape.lineTo(points[0][0], -2);
      shape.closePath();

      const geo = track(new THREE.ShapeGeometry(shape));
      const mat = track(new THREE.MeshBasicMaterial({
        color: 0x0a0520,
        side: THREE.DoubleSide,
        depthWrite: true,
      }));
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, 0, z);
      scene.add(mesh);
      return mesh;
    };

    // Far mountains (behind sun)
    buildMountain([[-12, 0], [-10, 2.5], [-8, 1.2], [-6, 3.5], [-4, 1.8], [-2, 4.2], [0, 2.0], [2, 4.8], [4, 2.2], [6, 3.8], [8, 1.5], [10, 3.0], [12, 0]], 0, -42);
    // Closer mountains left
    buildMountain([[-14, 0], [-12, 1.8], [-10, 3.5], [-8, 2.2], [-6, 4.5], [-4, 2.8], [-2, 1.5], [0, 0]], -7, -38);
    // Closer mountains right
    buildMountain([[0, 0], [2, 1.5], [4, 2.8], [6, 4.5], [8, 2.2], [10, 3.5], [12, 1.8], [14, 0]], 7, -38);

    // Near mountains left
    buildMountain([[-16, 0], [-14, 2.0], [-12, 3.8], [-10, 1.8], [-8, 4.5], [-6, 2.5], [-4, 1.2], [-2, 0]], -10, -34);
    // Near mountains right
    buildMountain([[2, 0], [4, 1.2], [6, 2.5], [8, 4.5], [10, 1.8], [12, 3.8], [14, 2.0], [16, 0]], 10, -34);

    /* ── Grid Floor ── */
    const gridVert = `
      varying vec2 vUv;
      varying vec3 vPos;
      void main() {
        vUv = uv;
        vPos = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const gridFrag = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vPos;

      void main() {
        float scale = 80.0;
        float speed = 3.0;
        vec2 guv = vUv * scale;
        guv.y -= uTime * speed;

        vec2 f = fract(guv) - 0.5;
        float lineWidth = 0.04;
        float halfLine = lineWidth * 0.5;

        float lineX = smoothstep(halfLine - 0.02, halfLine, abs(f.x));
        float lineY = smoothstep(halfLine - 0.02, halfLine, abs(f.y));
        float grid = 1.0 - min(lineX, lineY);

        // Perspective fade
        float horizon = 1.0 - smoothstep(0.72, 0.95, vUv.y);
        // Brightness near camera
        float nearGlow = exp(-vUv.y * 1.8) * 0.4;

        float alpha = grid * (0.55 + nearGlow) * horizon;

        // Center bright line (sun reflection)
        float centerLine = exp(-pow((vUv.x - 0.5) * 6.0, 2.0)) * (1.0 - vUv.y) * 0.6;
        vec3 col = uColor + vec3(1.0, 0.18, 0.59) * centerLine;

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const gridGeo = track(new THREE.PlaneGeometry(200, 200, 1, 1));
    const gridMat = track(new THREE.ShaderMaterial({
      vertexShader: gridVert,
      fragmentShader: gridFrag,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00e5ff') },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    }));
    const gridMesh = new THREE.Mesh(gridGeo, gridMat);
    gridMesh.rotation.x = -Math.PI / 2;
    gridMesh.position.y = -0.02;
    scene.add(gridMesh);

    const reflectFrag = `
      precision highp float;
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;
      varying vec3 vPos;

      void main() {
        float scale = 80.0;
        float speed = 3.0;
        vec2 guv = vUv * scale;
        guv.y -= uTime * speed;

        vec2 f = fract(guv) - 0.5;
        float lineWidth = 0.04;
        float halfLine = lineWidth * 0.5;

        float lineX = smoothstep(halfLine - 0.02, halfLine, abs(f.x));
        float lineY = smoothstep(halfLine - 0.02, halfLine, abs(f.y));
        float grid = 1.0 - min(lineX, lineY);

        float horizon = 1.0 - smoothstep(0.72, 0.95, vUv.y);
        float nearGlow = exp(-vUv.y * 1.8) * 0.3;

        float alpha = grid * (0.1 + nearGlow * 0.25) * horizon;

        float centerLine = exp(-pow((vUv.x - 0.5) * 6.0, 2.0)) * vUv.y * 0.2;
        vec3 col = uColor + vec3(1.0, 0.18, 0.59) * centerLine;

        gl_FragColor = vec4(col, alpha);
      }
    `;

    const reflectMat = track(new THREE.ShaderMaterial({
      vertexShader: gridVert,
      fragmentShader: reflectFrag,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#00e5ff') },
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
    }));

    const reflectGeo = track(new THREE.PlaneGeometry(200, 200, 1, 1));
    const reflectMesh = new THREE.Mesh(reflectGeo, reflectMat);
    reflectMesh.rotation.x = -Math.PI / 2;
    reflectMesh.scale.z = -1;
    reflectMesh.position.y = -0.03;
    scene.add(reflectMesh);

    /* ── Palm Trees (silhouettes) ── */
    const palmMat = track(new THREE.MeshBasicMaterial({ color: 0x080316, side: THREE.DoubleSide }));

    const createPalmSilhouette = (x: number, z: number, scale: number, lean: number, flipX: number) => {
      const group = new THREE.Group();
      const s = scale;

      // Trunk using CatmullRom curve
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(lean * 0.15 * s, 0.5 * s, 0),
        new THREE.Vector3(lean * 0.25 * s, 1.0 * s, 0),
        new THREE.Vector3(lean * 0.4 * s, 1.6 * s, 0),
        new THREE.Vector3(lean * 0.5 * s, 2.2 * s, 0),
      ]);

      const tubeGeo = track(new THREE.TubeGeometry(curve, 16, 0.07 * s, 8, false));
      const trunk = new THREE.Mesh(tubeGeo, palmMat);
      group.add(trunk);

      // Coconut cluster at top
      const coconutGeo = track(new THREE.SphereGeometry(0.1 * s, 8, 8));
      for (let ci = 0; ci < 3; ci++) {
        const coconut = new THREE.Mesh(coconutGeo, palmMat);
        const angle = (ci / 3) * Math.PI * 2;
        coconut.position.set(
          lean * 0.5 * s + Math.cos(angle) * 0.08 * s,
          2.15 * s,
          Math.sin(angle) * 0.08 * s,
        );
        group.add(coconut);
      }

      // Fronds via elongated shapes
      const frondCount = 7;
      for (let i = 0; i < frondCount; i++) {
        const angle = (i / frondCount) * Math.PI * 2;
        const hang = 0.5 + Math.random() * 0.3;

        const frondShape = new THREE.Shape();
        const frondLen = 1.4 * s;
        const frondWid = 0.12 * s;

        frondShape.moveTo(0, 0);
        frondShape.bezierCurveTo(
          frondWid * 0.5, frondLen * 0.3,
          frondWid * 0.3, frondLen * 0.65,
          0, frondLen * hang
        );
        frondShape.bezierCurveTo(
          -frondWid * 0.3, frondLen * 0.65,
          -frondWid * 0.5, frondLen * 0.3,
          0, 0
        );

        const frondGeo = track(new THREE.ShapeGeometry(frondShape, 3));
        const frond = new THREE.Mesh(frondGeo, palmMat);

        frond.position.set(lean * 0.5 * s, 2.2 * s, 0);
        frond.rotation.order = 'YXZ';
        frond.rotation.y = angle;
        frond.rotation.x = -Math.PI / 2.5;

        group.add(frond);
      }

      group.scale.x = flipX;
      group.position.set(x, 0, z);
      scene.add(group);
      return group;
    };

    const palmGroups: THREE.Group[] = [];
    // Left palms
    palmGroups.push(createPalmSilhouette(-3.5, 2, 1.3, -0.5, 1));
    palmGroups.push(createPalmSilhouette(-4.2, 5, 1.5, -0.6, 1));
    palmGroups.push(createPalmSilhouette(-2.8, 8, 1.1, -0.3, 1));
    palmGroups.push(createPalmSilhouette(-5.0, 12, 1.6, -0.7, 1));
    palmGroups.push(createPalmSilhouette(-3.0, 16, 1.0, -0.4, 1));
    // Right palms
    palmGroups.push(createPalmSilhouette(3.5, 3, 1.2, 0.5, 1));
    palmGroups.push(createPalmSilhouette(4.2, 6, 1.4, 0.6, 1));
    palmGroups.push(createPalmSilhouette(2.8, 9, 1.0, 0.3, 1));
    palmGroups.push(createPalmSilhouette(5.0, 13, 1.5, 0.7, 1));
    palmGroups.push(createPalmSilhouette(3.0, 17, 0.9, 0.4, 1));

    /* ── Stars ── */
    const starCount = 120;
    const starPos = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);
    for (let i = 0; i < starCount; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 100;
      starPos[i * 3 + 1] = 8 + Math.random() * 30;
      starPos[i * 3 + 2] = -10 - Math.random() * 50;
      starSizes[i] = 0.03 + Math.random() * 0.06;
    }
    const starGeo = track(new THREE.BufferGeometry());
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starMat = track(new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.08,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    }));
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ── Animation ── */
    let raf = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      gridMat.uniforms.uTime.value = elapsed;
      reflectMat.uniforms.uTime.value = elapsed;

      // Sun pulse
      const pulse = 1.0 + Math.sin(elapsed * 0.7) * 0.012;
      sunMesh.scale.setScalar(pulse);

      // Palm sway
      palmGroups.forEach((p, i) => {
        p.rotation.z = Math.sin(elapsed * 0.8 + i * 1.5) * 0.02;
        p.rotation.x = Math.sin(elapsed * 0.5 + i * 2.0) * 0.01;
      });

      // Subtle camera drift
      camera.position.x = Math.sin(elapsed * 0.08) * 0.12;
      camera.position.y = 2.0 + Math.sin(elapsed * 0.12) * 0.06;
      camera.lookAt(0, 1.6, -20);

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    resize();
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      disposables.forEach((d) => {
        d.geo?.dispose();
        d.mat?.dispose();
        d.tex?.dispose();
      });
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
        background: '#050111',
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
          <h2 style={{ fontSize: 28, fontWeight: 700, color: '#ff2e97', textShadow: '0 0 20px rgba(255,46,151,0.4)' }}>
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
              padding: '28px 24px',
              pointerEvents: 'none',
              textAlign: 'center',
              zIndex: 2,
            }}
          >
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: 'rgba(232,228,240,0.88)',
                textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.5)',
                maxWidth: 500,
                marginBottom: 10,
              }}
            >
              {copy.instructions}
            </p>
            <div
              style={{
                fontSize: 11,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--sw-cyan)',
                textShadow: '0 0 12px rgba(0,229,255,0.4)',
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
