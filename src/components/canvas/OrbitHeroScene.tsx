'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitHeroFallback } from './OrbitHeroFallback';
import { sound } from '@/utils/audio';
import { Sparkles, Compass, Eye, Zap, RefreshCw } from 'lucide-react';

interface OrbitHeroSceneProps {
  className?: string;
}

export const OrbitHeroScene: React.FC<OrbitHeroSceneProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);
  const [isHyperdrive, setIsHyperdrive] = useState<boolean>(false);
  const [isWireframe, setIsWireframe] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // References to Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number | null>(null);
  const coreGroupRef = useRef<THREE.Group | null>(null);
  const ringsRef = useRef<THREE.Mesh[]>([]);
  const satellitesRef = useRef<{ mesh: THREE.Mesh; radius: number; speed: number; angle: number; tilt: number }[]>([]);
  const particlesRef = useRef<THREE.Points | null>(null);
  const materialsRef = useRef<THREE.Material[]>([]);

  // Mouse & Scroll state
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef<number>(0);
  const dragStart = useRef({ x: 0, y: 0 });
  const manualRotation = useRef({ x: 0, y: 0 });

  // WebGL support check
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setHasWebGL(!!gl);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  // Main Three.js Scene Setup
  useEffect(() => {
    if (hasWebGL === false) return;
    const container = containerRef.current;
    if (!container) return;

    // Check window dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    // Append canvas
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Master Group
    const masterGroup = new THREE.Group();
    coreGroupRef.current = masterGroup;
    scene.add(masterGroup);

    // ==========================================
    // 1. LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0a1435, 1.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f0ff, 3.5, 30);
    cyanLight.position.set(3, 4, 5);
    scene.add(cyanLight);

    const goldLight = new THREE.PointLight(0xffdf00, 2.5, 25);
    goldLight.position.set(-4, -3, 4);
    scene.add(goldLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.8);
    rimLight.position.set(0, 8, -6);
    scene.add(rimLight);

    // ==========================================
    // 2. CENTRAL CYBERNETIC NUCLEUS (Core)
    // ==========================================
    const coreGeo = new THREE.IcosahedronGeometry(1.6, 1);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.15,
      wireframe: false,
      envMapIntensity: 1.5,
    });
    materialsRef.current.push(goldMat);

    const coreMesh = new THREE.Mesh(coreGeo, goldMat);
    masterGroup.add(coreMesh);

    // Inner Glowing Wireframe Core
    const innerGeo = new THREE.IcosahedronGeometry(1.2, 2);
    const cyanWireMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    materialsRef.current.push(cyanWireMat);
    const innerMesh = new THREE.Mesh(innerGeo, cyanWireMat);
    masterGroup.add(innerMesh);

    // Glowing Core Sphere
    const glowSphereGeo = new THREE.SphereGeometry(0.8, 16, 16);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.5,
    });
    materialsRef.current.push(glowMat);
    const glowSphere = new THREE.Mesh(glowSphereGeo, glowMat);
    masterGroup.add(glowSphere);

    // ==========================================
    // 3. ORBITAL LANES / CONCENTRIC RINGS
    // ==========================================
    ringsRef.current = [];

    // Lane 1: Inner Fast Metallic Gold Torus
    const ring1Geo = new THREE.TorusGeometry(3.2, 0.045, 24, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0xffdf00,
      metalness: 0.98,
      roughness: 0.1,
      wireframe: false,
    });
    materialsRef.current.push(ring1Mat);
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.y = Math.PI / 8;
    masterGroup.add(ring1);
    ringsRef.current.push(ring1);

    // Lane 2: Middle Electric Cyan Segmented Torus
    const ring2Geo = new THREE.TorusGeometry(4.7, 0.04, 24, 120);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x00f0ff,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0070f3,
      emissiveIntensity: 0.4,
    });
    materialsRef.current.push(ring2Mat);
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 5;
    masterGroup.add(ring2);
    ringsRef.current.push(ring2);

    // Lane 3: Outer Wide Orbital Ring
    const ring3Geo = new THREE.TorusGeometry(6.4, 0.03, 20, 140);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.25,
      transparent: true,
      opacity: 0.85,
    });
    materialsRef.current.push(ring3Mat);
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.x = Math.PI / 5;
    ring3.rotation.y = -Math.PI / 6;
    masterGroup.add(ring3);
    ringsRef.current.push(ring3);

    // Lane 4: Celestial Meridian Orbit
    const ring4Geo = new THREE.TorusGeometry(8.0, 0.02, 16, 120);
    const ring4Mat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.4,
      wireframe: true,
    });
    materialsRef.current.push(ring4Mat);
    const ring4 = new THREE.Mesh(ring4Geo, ring4Mat);
    ring4.rotation.x = Math.PI / 2.3;
    masterGroup.add(ring4);
    ringsRef.current.push(ring4);

    // ==========================================
    // 4. ORBITING SATELLITE NODES
    // ==========================================
    satellitesRef.current = [];
    const satelliteConfigs = [
      { radius: 3.2, speed: 0.018, tilt: Math.PI / 3, color: 0xffdf00, size: 0.22 },
      { radius: 3.2, speed: -0.015, tilt: Math.PI / 3, color: 0x00f0ff, size: 0.16 },
      { radius: 4.7, speed: 0.012, tilt: -Math.PI / 4, color: 0x00f0ff, size: 0.26 },
      { radius: 4.7, speed: -0.009, tilt: -Math.PI / 4, color: 0xffdf00, size: 0.18 },
      { radius: 6.4, speed: 0.007, tilt: Math.PI / 5, color: 0x38bdf8, size: 0.28 },
      { radius: 6.4, speed: -0.006, tilt: Math.PI / 5, color: 0xffffff, size: 0.15 },
      { radius: 8.0, speed: 0.004, tilt: Math.PI / 2.3, color: 0xd4af37, size: 0.25 },
    ];

    satelliteConfigs.forEach((cfg) => {
      const satGeo = new THREE.OctahedronGeometry(cfg.size, 0);
      const satMat = new THREE.MeshStandardMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.6,
        metalness: 0.9,
        roughness: 0.1,
      });
      materialsRef.current.push(satMat);
      const satMesh = new THREE.Mesh(satGeo, satMat);
      masterGroup.add(satMesh);

      satellitesRef.current.push({
        mesh: satMesh,
        radius: cfg.radius,
        speed: cfg.speed,
        angle: Math.random() * Math.PI * 2,
        tilt: cfg.tilt,
      });
    });

    // ==========================================
    // 5. STARDUST & ATMOSPHERIC NEBULA
    // ==========================================
    const particleCount = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const goldColor = new THREE.Color(0xffdf00);
    const navyColor = new THREE.Color(0x38bdf8);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const radius = 3.5 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.9;

      positions[idx] = radius * Math.cos(theta) * Math.cos(phi);
      positions[idx + 1] = radius * Math.sin(phi);
      positions[idx + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const mixVal = Math.random();
      const pColor = mixVal < 0.4 ? cyanColor : mixVal < 0.75 ? goldColor : navyColor;
      colors[idx] = pColor.r;
      colors[idx + 1] = pColor.g;
      colors[idx + 2] = pColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    materialsRef.current.push(particleMat);

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // ==========================================
    // 6. EVENT LISTENERS
    // ==========================================
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // ==========================================
    // 7. ANIMATION LOOP
    // ==========================================
    let clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Lerp mouse follow
      mouse.current.x += (mouse.current.targetX - mouse.current.x) * 0.05;
      mouse.current.y += (mouse.current.targetY - mouse.current.y) * 0.05;

      const speedMultiplier = isHyperdrive ? 3.0 : 1.0;

      // Rotate Master Group
      if (masterGroup) {
        masterGroup.rotation.y = time * 0.12 * speedMultiplier + mouse.current.x * 0.4 + manualRotation.current.x;
        masterGroup.rotation.x = Math.sin(time * 0.08) * 0.15 + mouse.current.y * 0.35 + manualRotation.current.y;
        
        // Scroll coupling: tilt and position shift
        const scrollFactor = Math.min(scrollRef.current / 1200, 1.5);
        masterGroup.rotation.z = scrollFactor * 0.5;
        masterGroup.position.y = -scrollFactor * 1.5;
        masterGroup.position.z = -scrollFactor * 2.5;
      }

      // Rotate Core
      if (coreMesh) {
        coreMesh.rotation.x = time * 0.3 * speedMultiplier;
        coreMesh.rotation.y = time * 0.4 * speedMultiplier;
      }
      if (innerMesh) {
        innerMesh.rotation.x = -time * 0.4 * speedMultiplier;
        innerMesh.rotation.z = time * 0.25 * speedMultiplier;
      }

      // Spin Rings individually
      ringsRef.current.forEach((ring, idx) => {
        const dir = idx % 2 === 0 ? 1 : -1;
        ring.rotation.z += 0.003 * dir * speedMultiplier;
      });

      // Orbit Satellites
      satellitesRef.current.forEach((sat) => {
        sat.angle += sat.speed * speedMultiplier;
        const x = sat.radius * Math.cos(sat.angle);
        const z = sat.radius * Math.sin(sat.angle);
        const y = Math.sin(sat.angle * 2) * 0.4;

        sat.mesh.position.set(x, y, z);
        sat.mesh.rotation.x += 0.03;
        sat.mesh.rotation.y += 0.04;
      });

      // Swirl Particles
      if (particles) {
        particles.rotation.y = -time * 0.04 * speedMultiplier;
        particles.rotation.x = Math.sin(time * 0.02) * 0.05;
      }

      // Render
      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      // Dispose materials & geometries
      materialsRef.current.forEach((m) => m.dispose());
      scene.clear();
      renderer.dispose();
    };
  }, [hasWebGL, isHyperdrive]);

  // Toggle wireframe mode
  const handleToggleWireframe = useCallback(() => {
    sound.playWarp();
    setIsWireframe((prev) => {
      const next = !prev;
      materialsRef.current.forEach((mat) => {
        if ('wireframe' in mat) {
          (mat as THREE.MeshStandardMaterial).wireframe = next;
        }
      });
      return next;
    });
  }, []);

  // Toggle hyperdrive speed
  const handleToggleHyperdrive = useCallback(() => {
    sound.playWarp();
    setIsHyperdrive((prev) => !prev);
  }, []);

  // Reset rotation
  const handleReset = useCallback(() => {
    sound.playClick();
    manualRotation.current = { x: 0, y: 0 };
    if (coreGroupRef.current) {
      coreGroupRef.current.rotation.set(0, 0, 0);
    }
  }, []);

  // Mouse drag for 3D exploration
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMoveInteractive = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = (e.clientX - dragStart.current.x) * 0.005;
    const deltaY = (e.clientY - dragStart.current.y) * 0.005;
    manualRotation.current.x += deltaX;
    manualRotation.current.y += deltaY;
    dragStart.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  if (hasWebGL === false) {
    return <OrbitHeroFallback />;
  }

  return (
    <div
      className={`relative w-full h-full select-none cursor-grab active:cursor-grabbing ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMoveInteractive}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="w-full h-full" />

      {/* Futuristic Orbit HUD Controls Overlay */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 p-1.5 rounded-full glass-panel border border-cyan-500/30 shadow-[0_0_20px_rgba(0,240,255,0.15)]">
        <button
          onClick={handleToggleHyperdrive}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
            isHyperdrive
              ? 'bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(255,223,0,0.5)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Toggle Warp Speed"
        >
          <Zap className={`w-3.5 h-3.5 ${isHyperdrive ? 'fill-current animate-bounce' : ''}`} />
          <span>{isHyperdrive ? 'WARP ACTIVE' : 'HYPERDRIVE'}</span>
        </button>

        <button
          onClick={handleToggleWireframe}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 ${
            isWireframe
              ? 'bg-cyan-400 text-slate-950 shadow-[0_0_15px_rgba(0,240,255,0.5)]'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
          }`}
          title="Toggle Wireframe Architecture"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{isWireframe ? 'WIREFRAME' : 'SURFACE'}</span>
        </button>

        <button
          onClick={handleReset}
          className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          title="Reset Orbit Angle"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Orbitlane Real-Time Telemetry Badge */}
      <div className="absolute bottom-6 left-6 z-20 hidden lg:flex items-center gap-3 px-3.5 py-1.5 rounded-full glass-panel border border-white/10 text-[11px] font-mono text-slate-400">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="text-slate-200">ORBIT ENGINE v3.4</span>
        <span className="text-cyan-400">60 FPS</span>
        <span className="text-amber-400">INTERACTIVE 3D</span>
      </div>
    </div>
  );
};
