import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import type { WelcomeSynthwaveCopy } from '../../../types/slide';

interface WelcomeSynthwaveVisualProps {
  copy: WelcomeSynthwaveCopy;
}

export const WelcomeSynthwaveVisual = React.memo(({ copy }: WelcomeSynthwaveVisualProps) => {
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

    /* ── Colors ── */
    const COLORS = {
      fog: 0x1a053a,
      grid: 0x00ffff,
      sunTop: '#ff007f',
      sunBottom: '#ffaa00',
      mountainBody: 0x0c0414,
      mountainEdge: 0x0033aa,
      palmBody: 0x05010a,
      palmTrunkGlow: 0xff00a0,
      palmLeafGlow: 0x00ffff,
    };

    const TERRAIN_LENGTH = 800;
    const MOUNTAIN_START_X = 155;
    const speed = 0.8;

    /* ── Scene ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(COLORS.fog, 150, 750);
    scene.background = new THREE.Color(COLORS.fog);

    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1500);
    camera.position.set(0, 3.5, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    mount.appendChild(renderer.domElement);

    /* ── Post-processing ── */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let composer: any = null;
    // Dynamic imports for post-processing (tree-shakeable in Vite)
    Promise.all([
      import('three/addons/postprocessing/EffectComposer.js'),
      import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/UnrealBloomPass.js'),
      import('three/addons/objects/Reflector.js'),
    ]).then(([
      { EffectComposer },
      { RenderPass },
      { UnrealBloomPass },
      { Reflector },
    ]) => {
      const renderScene = new RenderPass(scene, camera);
      const bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.6,   // strength — mais suave
        0.6,   // radius — mais focado
        0.35,  // threshold — só brilha o que é realmente quente
      );
      composer = new EffectComposer(renderer);
      composer.addPass(renderScene);
      composer.addPass(bloomPass);

      createFloorAndGrid(Reflector);
    }).catch(() => {
      // Fallback: no post-processing, just grid
      createFloorAndGridFallback();
    });

    /* ── Disposables ── */
    const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture | THREE.Object3D)[] = [];
    const track = <T extends THREE.BufferGeometry | THREE.Material | THREE.Texture>(obj: T): T => {
      disposables.push(obj);
      return obj;
    };

    /* ── Lights ── */
    function createLights() {
      const ambientLight = new THREE.AmbientLight(0x0044ff, 1.5);
      scene.add(ambientLight);
      const sunLight = new THREE.PointLight(0xff007f, 800000, 2000);
      sunLight.position.set(0, 150, -750);
      scene.add(sunLight);
    }
    createLights();

    /* ── Sun ── */
    let sun: THREE.Mesh | null = null;
    function createSunTexture() {
      const canvas = document.createElement('canvas');
      canvas.width = 1024;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;
      const grad = ctx.createLinearGradient(0, 0, 0, 1024);
      grad.addColorStop(0, COLORS.sunTop);
      grad.addColorStop(1, COLORS.sunBottom);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(512, 512, 510, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalCompositeOperation = 'destination-out';
      let y = 600;
      let thickness = 5;
      let gap = 16;
      while (y < 1024) {
        ctx.fillRect(0, y, 1024, thickness);
        y += gap;
        thickness += 2.0;
        gap += 3.5;
      }
      return new THREE.CanvasTexture(canvas);
    }

    function createSun() {
      const sunTexture = track(createSunTexture());
      const sunMaterial = track(new THREE.MeshBasicMaterial({
        map: sunTexture,
        transparent: true,
        fog: false,
      }));
      const sunGeometry = track(new THREE.PlaneGeometry(250, 250));
      sun = new THREE.Mesh(sunGeometry, sunMaterial);
      sun.position.set(0, 150, -750);
      scene.add(sun);
    }
    createSun();

    /* ── Mountains ── */
    const terrains: THREE.Mesh[] = [];
    function createTerrain() {
      const terrainWidth = 1000;
      const roadWidth = MOUNTAIN_START_X;
      const mat = track(new THREE.MeshStandardMaterial({
        color: COLORS.mountainBody,
        roughness: 0.8,
        metalness: 0.2,
        flatShading: true,
        fog: true,
      }));
      const lineMat = track(new THREE.LineBasicMaterial({
        color: COLORS.mountainEdge,
        linewidth: 1,
        transparent: true,
        opacity: 0.3,
      }));
      for (let i = 0; i < 2; i++) {
        const geom = track(new THREE.PlaneGeometry(terrainWidth, TERRAIN_LENGTH, 80, 50));
        geom.rotateX(-Math.PI / 2);
        const pos = geom.attributes.position;
        for (let j = 0; j < pos.count; j++) {
          const x = pos.getX(j);
          const z = pos.getZ(j);
          const absX = Math.abs(x);
          if (absX < roadWidth) {
            pos.setY(j, -10);
          } else {
            const dist = absX - roadWidth;
            const norm = dist / ((terrainWidth / 2) - roadWidth);
            let h = Math.pow(norm, 1.4) * 180;
            const zFactor = z * (Math.PI * 2 / TERRAIN_LENGTH);
            h += Math.abs(Math.sin(x * 0.05 + zFactor * 6)) * 30;
            h += Math.abs(Math.cos(x * 0.1 - zFactor * 10)) * 15;
            pos.setY(j, h - 5);
          }
        }
        geom.computeVertexNormals();
        const mesh = new THREE.Mesh(geom, mat);
        const edges = track(new THREE.EdgesGeometry(geom));
        const lines = new THREE.LineSegments(edges, lineMat);
        mesh.add(lines);
        mesh.position.z = -i * TERRAIN_LENGTH;
        scene.add(mesh);
        terrains.push(mesh);
      }
    }
    createTerrain();

    /* ── Palms ── */
    const palms: THREE.Group[] = [];
    const PALM_LANE_X = 112;

    function createOutlinedMesh(
      geometry: THREE.BufferGeometry,
      material: THREE.Material,
      edgeColor: THREE.ColorRepresentation,
      edgeOpacity = 0.85,
    ) {
      const mesh = new THREE.Mesh(geometry, material);
      const edgeMat = track(new THREE.LineBasicMaterial({
        color: edgeColor,
        transparent: true,
        opacity: edgeOpacity,
        depthWrite: false,
        fog: false,
      }));
      const edges = track(new THREE.EdgesGeometry(geometry, 18));
      const lines = new THREE.LineSegments(edges, edgeMat);
      mesh.add(lines);
      return mesh;
    }

    function createPalmFrond(
      leafMat: THREE.Material,
      spineMat: THREE.Material,
      length = 18,
      droop = 0.42,
      useDetails = true,
    ) {
      const frond = new THREE.Group();
      const spineGeo = track(new THREE.CylinderGeometry(0.08, 0.14, length, 4, 4));
      spineGeo.rotateZ(-Math.PI / 2);
      spineGeo.translate(length * 0.47, 0, 0);
      const spine = createOutlinedMesh(spineGeo, spineMat, COLORS.palmLeafGlow, 0.22);
      frond.add(spine);

      const leafletCount = useDetails ? 5 : 3;
      for (let i = 0; i < leafletCount; i++) {
        const t = i / Math.max(1, leafletCount - 1);
        const x = 2.7 + t * (length * 0.68);
        const baseLen = 5.0 - t * 1.7;
        for (const sideSign of [-1, 1]) {
          const leafletLen = baseLen * (0.98 + Math.random() * 0.04);
          const leafletGeo = track(new THREE.ConeGeometry(0.32, leafletLen, 3, 1));
          leafletGeo.rotateZ(-Math.PI / 2);
          leafletGeo.translate(leafletLen * 0.44, 0, 0);
          const leaflet = new THREE.Mesh(leafletGeo, leafMat);
          leaflet.position.set(x, sideSign * (0.42 + t * 1.42), sideSign * 0.08);
          leaflet.rotation.z = sideSign * (0.92 - t * 0.26);
          leaflet.rotation.y = sideSign * 0.10;
          leaflet.rotation.x = -0.05 - t * 0.08;
          frond.add(leaflet);
        }
      }
      frond.rotation.z = -droop;
      return frond;
    }

    function createPalm(side = 1, useDetails = true) {
      const group = new THREE.Group();
      const trunkMat = track(new THREE.MeshStandardMaterial({
        color: 0x13030f,
        emissive: 0x3f0030,
        emissiveIntensity: 0.72,
        roughness: 0.58,
        metalness: 0.04,
        flatShading: true,
      }));
      const spineMat = track(new THREE.MeshStandardMaterial({
        color: 0x07131a,
        emissive: 0x00536a,
        emissiveIntensity: 0.82,
        roughness: 0.40,
        metalness: 0.08,
        flatShading: true,
      }));
      const leafMat = track(new THREE.MeshStandardMaterial({
        color: 0x05141a,
        emissive: 0x007f9a,
        emissiveIntensity: 0.96,
        roughness: 0.34,
        metalness: 0.08,
        flatShading: true,
      }));
      const coconutMat = track(new THREE.MeshStandardMaterial({
        color: 0x11050d,
        emissive: 0x330022,
        emissiveIntensity: 0.58,
        flatShading: true,
      }));

      const trunkHeight = 35;
      const segmentCount = 6;
      let prevX = 0;
      let prevZ = 0;
      const crown = new THREE.Group();

      for (let i = 0; i < segmentCount; i++) {
        const t0 = i / segmentCount;
        const t1 = (i + 1) / segmentCount;
        const y0 = t0 * trunkHeight;
        const y1 = t1 * trunkHeight;
        const radiusBottom = 1.32 - t0 * 0.62;
        const radiusTop = 1.32 - t1 * 0.62;
        const segHeight = y1 - y0;
        const curveX = side * Math.sin(t1 * Math.PI * 0.85) * 1.65;
        const curveZ = Math.sin(t1 * Math.PI * 1.2) * 0.38;
        const segGeo = track(new THREE.CylinderGeometry(radiusTop, radiusBottom, segHeight, 6, 1));
        const seg = createOutlinedMesh(segGeo, trunkMat, COLORS.palmTrunkGlow, 0.42);
        seg.position.set((prevX + curveX) * 0.5, y0 + segHeight * 0.5, (prevZ + curveZ) * 0.5);
        seg.rotation.z = (curveX - prevX) / segHeight;
        seg.rotation.x = -(curveZ - prevZ) / segHeight;
        group.add(seg);
        prevX = curveX;
        prevZ = curveZ;
      }

      const crownY = trunkHeight - 0.4;
      crown.position.set(prevX, crownY, prevZ);
      group.add(crown);

      const frondCount = 6;
      for (let i = 0; i < frondCount; i++) {
        const angle = (i / frondCount) * Math.PI * 2;
        const frondPivot = new THREE.Group();
        frondPivot.rotation.order = 'YXZ';
        frondPivot.rotation.y = angle + (i % 2 === 0 ? 0.04 : -0.04);
        frondPivot.rotation.z = -0.40 - Math.cos(angle * 2.0) * 0.07;
        frondPivot.rotation.x = Math.sin(angle * 1.3) * 0.10;
        const length = 15.5 + (i % 3) * 1.6;
        const droop = 0.34 + (i % 4) * 0.045;
        const frond = createPalmFrond(leafMat, spineMat, length, droop, useDetails);
        frondPivot.add(frond);
        crown.add(frondPivot);
      }

      for (let i = 0; i < 2; i++) {
        const spearPivot = new THREE.Group();
        spearPivot.rotation.order = 'YXZ';
        spearPivot.rotation.y = i * (Math.PI * 2 / 3) + 0.18;
        spearPivot.rotation.z = -0.08 - i * 0.03;
        spearPivot.rotation.x = 0.03;
        const spear = createPalmFrond(leafMat, spineMat, 10.5 + i * 0.7, 0.08 + i * 0.03, useDetails);
        spear.scale.set(0.62, 0.62, 0.62);
        spearPivot.add(spear);
        crown.add(spearPivot);
      }

      const coconutGeo = track(new THREE.SphereGeometry(0.68, 7, 6));
      const coconutOffsets = [[0.15, -1.15, 0.35], [0.9, -1.45, -0.25], [-0.35, -1.6, -0.1]];
      coconutOffsets.forEach(([x, y, z]) => {
        const coconut = createOutlinedMesh(coconutGeo, coconutMat, COLORS.palmTrunkGlow, 0.20);
        coconut.position.set(x, y, z);
        crown.add(coconut);
      });

      group.position.y = -5;
      group.rotation.z = -side * 0.06;
      return group;
    }

    function createPalmsPool() {
      const pairCount = 5;
      const spacing = TERRAIN_LENGTH / pairCount;
      const palmLaneX = PALM_LANE_X;
      for (let pairIndex = 0; pairIndex < pairCount; pairIndex++) {
        for (const side of [-1, 1]) {
          const palm = createPalm(side, pairIndex < 4);
          const sideOffset = side * spacing * 0.10;
          palm.position.z = -(pairIndex * spacing + spacing * 0.65 + sideOffset);
          palm.position.x = side * (palmLaneX + ((pairIndex % 3) - 1) * 2.5);
          palm.rotation.y = side * 0.08 + Math.sin(pairIndex * 1.7) * 0.04;
          palm.rotation.z += Math.sin(pairIndex * 2.1 + side) * 0.025;
          const scale = 0.88 + ((pairIndex % 4) * 0.035);
          palm.scale.set(scale, scale, scale);
          scene.add(palm);
          palms.push(palm);
        }
      }
    }
    createPalmsPool();

    /* ── Stars ── */
    function createStars() {
      const starsGeometry = track(new THREE.BufferGeometry());
      const starsCount = 400;
      const posArray = new Float32Array(starsCount * 3);
      for (let i = 0; i < starsCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 800;
        posArray[i + 1] = Math.random() * 200 + 30;
        posArray[i + 2] = (Math.random() - 0.5) * 800;
      }
      starsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
      const starsMaterial = track(new THREE.PointsMaterial({
        size: 0.8,
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
        fog: true,
      }));
      const starMesh = new THREE.Points(starsGeometry, starsMaterial);
      scene.add(starMesh);
    }
    createStars();

    /* ── Grid & Mirror (with post-processing) ── */
    let groundMirror: any = null;
    let gridHelper: THREE.GridHelper | null = null;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function createFloorAndGrid(Reflector: any) {
      const mirrorGeo = new THREE.PlaneGeometry(1000, 2000);
      groundMirror = new Reflector(mirrorGeo, {
        clipBias: 0.003,
        textureWidth: window.innerWidth * window.devicePixelRatio,
        textureHeight: window.innerHeight * window.devicePixelRatio,
        color: 0x444444,
      });
      groundMirror.position.set(0, -5.05, -500);
      groundMirror.rotation.x = -Math.PI / 2;
      scene.add(groundMirror);
      disposables.push(groundMirror);

      const gridSize = 1000;
      const gridDivisions = 100;
      gridHelper = new THREE.GridHelper(gridSize, gridDivisions, COLORS.grid, COLORS.grid);
      gridHelper.position.set(0, -5, -400);
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.8;
      scene.add(gridHelper);
    }

    function createFloorAndGridFallback() {
      const gridSize = 1000;
      const gridDivisions = 100;
      gridHelper = new THREE.GridHelper(gridSize, gridDivisions, COLORS.grid, COLORS.grid);
      gridHelper.position.set(0, -5, -400);
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.8;
      scene.add(gridHelper);
    }

    /* ── Resize ── */
    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      if (composer) composer.setSize(w, h);
    });
    ro.observe(mount);

    /* ── Animation ── */
    let raf = 0;
    const animate = () => {
      camera.lookAt(0, 3.5, -100);

      const gridSquareSize = 1000 / 100;
      if (gridHelper) {
        gridHelper.position.z += speed;
        if (gridHelper.position.z >= gridSquareSize - 400) {
          gridHelper.position.z = -400;
        }
      }

      terrains.forEach((terrain) => {
        terrain.position.z += speed;
        if (terrain.position.z >= TERRAIN_LENGTH) {
          terrain.position.z -= TERRAIN_LENGTH * 2;
        }
      });

      palms.forEach((palm) => {
        palm.position.z += speed;
        if (palm.position.z > camera.position.z + 20) {
          palm.position.z -= TERRAIN_LENGTH;
        }
      });

      if (composer) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      disposables.forEach((d) => {
        if (d instanceof THREE.BufferGeometry) d.dispose();
        else if (d instanceof THREE.Material) d.dispose();
        else if (d instanceof THREE.Texture) d.dispose();
        else if (d instanceof THREE.Object3D) {
          // For Reflector and complex objects
          const obj = d as any;
          if (obj.dispose && typeof obj.dispose === 'function') {
            obj.dispose();
          }
        }
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
        background: '#0b0118',
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
          <h2 style={{
            fontSize: 28,
            fontWeight: 700,
            color: '#fff',
            textShadow: '0 0 10px #ff00a0, 0 0 20px #ff00a0, 0 0 40px #ff00a0',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '5px',
          }}>
            {copy.subtitle}
          </h2>
          <p style={{ fontSize: 16, color: '#00ffff', textShadow: '0 0 10px #00ffff' }}>
            {copy.instructions}
          </p>
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
              alignItems: 'flex-start',
              justifyContent: 'flex-end',
              padding: '40px',
              pointerEvents: 'none',
              textAlign: 'left',
              zIndex: 2,
            }}
          >
            <h1
              style={{
                color: '#fff',
                textShadow: '0 0 10px #ff00a0, 0 0 20px #ff00a0, 0 0 40px #ff00a0',
                margin: 0,
                fontSize: '3rem',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                fontFamily: "'Orbitron', sans-serif",
              }}
            >
              {copy.subtitle}
            </h1>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.7,
                color: 'rgba(232,228,240,0.88)',
                textShadow: '0 2px 16px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.5)',
                marginTop: 8,
                maxWidth: 500,
              }}
            >
              {copy.instructions}
            </p>
          </div>
        </>
      )}
    </div>
  );
});
