"use client";

import * as React from "react";
import * as THREE from "three";

import { cn } from "@/lib/cn";

interface HydroSceneProps {
  className?: string;
}

/**
 * Escena 3D ligera: globo wireframe, anillos de radar y partículas.
 * Se pausa cuando sale del viewport o la pestaña queda oculta.
 */
export default function HydroScene({ className }: HydroSceneProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCompact = window.innerWidth < 768;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100,
    );

    camera.position.set(0, 0.35, 8.4);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isCompact,
      powerPreference: "low-power",
    });

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.pointerEvents = "none";

    const group = new THREE.Group();

    group.rotation.set(0.25, -0.4, -0.08);
    scene.add(group);

    // Globo wireframe principal
    const globeGeometry = new THREE.SphereGeometry(
      2.05,
      isCompact ? 24 : 38,
      isCompact ? 16 : 26,
    );
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.075,
      depthWrite: false,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);

    group.add(globe);

    // Puntos sobre la superficie (nodos de sensores)
    const pointCount = isCompact ? 260 : 620;
    const positions = new Float32Array(pointCount * 3);

    for (let i = 0; i < pointCount; i += 1) {
      const radius = 2.07;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi);
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const pointsGeometry = new THREE.BufferGeometry();

    pointsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3),
    );

    const pointsMaterial = new THREE.PointsMaterial({
      color: 0x9df5ff,
      size: isCompact ? 0.028 : 0.022,
      transparent: true,
      opacity: 0.8,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pointsGeometry, pointsMaterial);

    group.add(points);

    // Anillos orbitales
    const ringDefinitions = [
      { radius: 2.65, color: 0x22d3ee, opacity: 0.6, tilt: 1.12 },
      { radius: 3.12, color: 0xff6a13, opacity: 0.34, tilt: 1.42 },
      { radius: 3.58, color: 0x1e90ff, opacity: 0.22, tilt: 0.88 },
    ];

    const rings: THREE.Mesh[] = [];

    ringDefinitions.forEach((definition) => {
      const geometry = new THREE.TorusGeometry(
        definition.radius,
        0.0045,
        6,
        160,
      );
      const material = new THREE.MeshBasicMaterial({
        color: definition.color,
        transparent: true,
        opacity: definition.opacity,
        depthWrite: false,
      });
      const ring = new THREE.Mesh(geometry, material);

      ring.rotation.x = definition.tilt;
      ring.rotation.y = definition.tilt * 0.36;
      group.add(ring);
      rings.push(ring);
    });

    // Puntos de fondo (profundidad)
    const dustCount = isCompact ? 280 : 700;
    const dustPositions = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i += 1) {
      const radius = 4.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      dustPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      dustPositions[i * 3 + 1] = radius * Math.cos(phi);
      dustPositions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    const dustGeometry = new THREE.BufferGeometry();

    dustGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(dustPositions, 3),
    );

    const dustMaterial = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.018,
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const dust = new THREE.Points(dustGeometry, dustMaterial);

    scene.add(dust);

    const pointer = { x: 0, y: 0 };
    const smoothPointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    let frameId = 0;
    let visible = true;
    let running = true;

    const handlePointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const render = () => {
      if (!running) return;

      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;

      smoothPointer.x += (pointer.x - smoothPointer.x) * 0.035;
      smoothPointer.y += (pointer.y - smoothPointer.y) * 0.035;

      group.rotation.y += delta * 0.085;
      group.rotation.x = 0.25 + smoothPointer.y * 0.12;
      group.rotation.z = -0.08 + smoothPointer.x * 0.035;

      rings[0].rotation.z += delta * 0.12;
      rings[1].rotation.z -= delta * 0.08;
      rings[2].rotation.z += delta * 0.05;

      dust.rotation.y -= delta * 0.012;

      pointsMaterial.opacity = 0.65 + Math.sin(elapsed * 1.2) * 0.15;

      camera.position.x = smoothPointer.x * 0.28;
      camera.position.y = 0.35 - smoothPointer.y * 0.18;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    };

    const start = () => {
      if (running || reducedMotion) return;
      running = true;
      clock.getDelta();
      frameId = requestAnimationFrame(render);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };

    const resize = () => {
      const width = container.clientWidth;
      const height = Math.max(container.clientHeight, 1);

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    };

    const resizeObserver = new ResizeObserver(resize);

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries[0]?.isIntersecting ?? true;
        if (visible && !document.hidden) start();
        else stop();
      },
      { threshold: 0.02 },
    );

    intersectionObserver.observe(container);

    const handleVisibility = () => {
      if (document.hidden) stop();
      else if (visible) start();
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("visibilitychange", handleVisibility);

    renderer.render(scene, camera);

    if (!reducedMotion) {
      running = false;
      start();
    }

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibility);
      scene.remove(group, dust);
      group.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach((material) => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      dustGeometry.dispose();
      dustMaterial.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0", className)}
    />
  );
}
