'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface FloatingTechArtifactProps {
  type?: 'dodecahedron' | 'torusKnot' | 'octahedron';
  color?: string;
  wireframeColor?: string;
  size?: number;
  className?: string;
}

export const FloatingTechArtifact: React.FC<FloatingTechArtifactProps> = ({
  type = 'dodecahedron',
  color = '#D4AF37',
  wireframeColor = '#00F0FF',
  size = 180,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let renderer: THREE.WebGLRenderer;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
      camera.position.z = 4.5;

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'low-power',
      });
      renderer.setSize(size, size);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // Light
      const ambient = new THREE.AmbientLight(0xffffff, 0.8);
      scene.add(ambient);

      const pLight = new THREE.PointLight(new THREE.Color(wireframeColor).getHex(), 2.5, 10);
      pLight.position.set(2, 3, 2);
      scene.add(pLight);

      // Geometry
      let geo: THREE.BufferGeometry;
      if (type === 'torusKnot') {
        geo = new THREE.TorusKnotGeometry(0.8, 0.25, 64, 16);
      } else if (type === 'octahedron') {
        geo = new THREE.OctahedronGeometry(1.2, 0);
      } else {
        geo = new THREE.DodecahedronGeometry(1.2, 0);
      }

      // Solid Metallic mesh
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color).getHex(),
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: 0.85,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);

      // Wireframe overlay
      const wireMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(wireframeColor).getHex(),
        wireframe: true,
        transparent: true,
        opacity: 0.75,
      });
      const wireMesh = new THREE.Mesh(geo, wireMat);
      wireMesh.scale.setScalar(1.02);
      scene.add(wireMesh);

      // Animation
      let clock = new THREE.Clock();
      const animate = () => {
        const time = clock.getElapsedTime();
        mesh.rotation.x = time * 0.4;
        mesh.rotation.y = time * 0.6;
        wireMesh.rotation.x = time * 0.4;
        wireMesh.rotation.y = time * 0.6;

        mesh.position.y = Math.sin(time * 1.5) * 0.15;
        wireMesh.position.y = mesh.position.y;

        renderer.render(scene, camera);
        animId = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        cancelAnimationFrame(animId);
        geo.dispose();
        mat.dispose();
        wireMat.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    } catch {
      // Fallback
    }
  }, [type, color, wireframeColor, size]);

  return <div ref={containerRef} className={`inline-block pointer-events-none select-none ${className}`} style={{ width: size, height: size }} />;
};
