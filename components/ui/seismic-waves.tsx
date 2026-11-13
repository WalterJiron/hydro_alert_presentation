"use client";

import * as React from "react";
import * as THREE from "three";

import { cn } from "@/lib/cn";

interface SeismicWavesProps {
  className?: string;
}

/**
 * Lienzo 3D con Three.js que simula una cuadrícula topográfica de ondas sísmicas
 * y corrientes hidrológicas con deformación en tiempo real y respuesta al cursor.
 */
export default function SeismicWaves({ className }: SeismicWavesProps) {
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
      45,
      container.clientWidth / Math.max(container.clientHeight, 1),
      0.1,
      100,
    );

    camera.position.set(0, 3.2, 5.2);
    camera.lookAt(0, 0, 0);

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

    const gridX = isCompact ? 32 : 46;
    const gridY = isCompact ? 32 : 46;
    const sizeX = 7.5;
    const sizeY = 7.5;

    const planeGeometry = new THREE.PlaneGeometry(
      sizeX,
      sizeY,
      gridX - 1,
      gridY - 1,
    );

    planeGeometry.rotateX(-Math.PI / 2.3);

    const positionAttr = planeGeometry.attributes.position;
    const count = positionAttr.count;
    const initialZ = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const colorCyan = new THREE.Color(0x22d3ee);
    const colorOrange = new THREE.Color(0xff6a13);
    const colorDeep = new THREE.Color(0x0e3a52);

    for (let i = 0; i < count; i += 1) {
      initialZ[i] = positionAttr.getY(i);
      const x = positionAttr.getX(i);
      const z = positionAttr.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      const t = Math.min(dist / 3.6, 1);

      const vertexColor = colorCyan.clone().lerp(colorDeep, t * 0.7);

      if (dist < 1.2 && Math.random() > 0.6) {
        vertexColor.lerp(colorOrange, 0.65);
      }

      colors[i * 3] = vertexColor.r;
      colors[i * 3 + 1] = vertexColor.g;
      colors[i * 3 + 2] = vertexColor.b;
    }

    planeGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: isCompact ? 0.045 : 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const pointsMesh = new THREE.Points(planeGeometry, pointsMaterial);

    scene.add(pointsMesh);

    // Malla alámbrica suave
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x164e63,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const wireframeMesh = new THREE.Mesh(planeGeometry, wireframeMaterial);

    scene.add(wireframeMesh);

    const pointer = { x: 0, y: 0 };
    const smoothPointer = { x: 0, y: 0 };
    const clock = new THREE.Clock();
    let frameId = 0;
    let running = true;
    let visible = true;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = event.clientX - rect.left;
      const clientY = event.clientY - rect.top;

      pointer.x = (clientX / rect.width - 0.5) * 4;
      pointer.y = (clientY / rect.height - 0.5) * -4;
    };

    const render = () => {
      if (!running) return;

      const elapsed = clock.getElapsedTime();

      smoothPointer.x += (pointer.x - smoothPointer.x) * 0.04;
      smoothPointer.y += (pointer.y - smoothPointer.y) * 0.04;

      for (let i = 0; i < count; i += 1) {
        const x = positionAttr.getX(i);
        const z = positionAttr.getZ(i);

        // Ondas compuestas de frecuencia sísmica y flujo de agua
        const wave1 = Math.sin(x * 1.2 + elapsed * 1.6) * 0.18;
        const wave2 = Math.cos(z * 1.4 + elapsed * 1.3) * 0.16;
        const wave3 =
          Math.sin(Math.sqrt(x * x + z * z) * 2.2 - elapsed * 2.4) * 0.12;

        // Perturbación del cursor
        const dx = x - smoothPointer.x;
        const dz = z - smoothPointer.y;
        const mouseDist = Math.sqrt(dx * dx + dz * dz);
        const mouseWave =
          Math.sin(mouseDist * 4 - elapsed * 4) *
          Math.exp(-mouseDist * 1.2) *
          0.3;

        positionAttr.setY(i, initialZ[i] + wave1 + wave2 + wave3 + mouseWave);
      }

      positionAttr.needsUpdate = true;

      // Rotación suave continua
      pointsMesh.rotation.y = Math.sin(elapsed * 0.2) * 0.08;
      wireframeMesh.rotation.y = pointsMesh.rotation.y;

      camera.position.x = smoothPointer.x * 0.35;
      camera.position.y = 3.2 + smoothPointer.y * 0.2;
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
      { threshold: 0.05 },
    );

    intersectionObserver.observe(container);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

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
      scene.remove(pointsMesh, wireframeMesh);
      planeGeometry.dispose();
      pointsMaterial.dispose();
      wireframeMaterial.dispose();
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
