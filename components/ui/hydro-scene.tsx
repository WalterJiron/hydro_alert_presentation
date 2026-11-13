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

    // Ondas sísmicas concéntricas de epicentro (ondas P y S)
    const shockwaveCount = 4;
    const shockwaveMeshes: {
      mesh: THREE.Mesh;
      baseRadius: number;
      offset: number;
      speed: number;
    }[] = [];

    // Epicentro principal (zona del Pacífico / Nicaragua)
    const epicenterNorm = new THREE.Vector3(0.52, 0.45, 0.72).normalize();
    const epicenterPos = epicenterNorm.clone().multiplyScalar(2.06);

    for (let i = 0; i < shockwaveCount; i += 1) {
      const ringGeo = new THREE.RingGeometry(0.04, 0.08, 36);
      const ringMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xff6a13 : 0x22d3ee,
        transparent: true,
        opacity: 0.8,
        side: THREE.DoubleSide,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const shockwaveMesh = new THREE.Mesh(ringGeo, ringMat);

      shockwaveMesh.position.copy(epicenterPos);
      shockwaveMesh.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        epicenterNorm,
      );

      group.add(shockwaveMesh);
      shockwaveMeshes.push({
        mesh: shockwaveMesh,
        baseRadius: 0.06,
        offset: i * 0.25,
        speed: 0.42,
      });
    }

    // Baliza luminosa en el epicentro
    const beaconGeo = new THREE.SphereGeometry(0.045, 12, 12);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xff8a3d,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
    });
    const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);

    beaconMesh.position.copy(epicenterPos);
    group.add(beaconMesh);

    // Arco de telemetría entre estaciones (curva 3D cuadrática)
    const stationPos = new THREE.Vector3(-0.75, 0.88, 1.45)
      .normalize()
      .multiplyScalar(2.06);
    const midPoint = epicenterPos
      .clone()
      .add(stationPos)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(2.75); // Se eleva en el espacio

    const arcCurve = new THREE.QuadraticBezierCurve3(
      epicenterPos,
      midPoint,
      stationPos,
    );
    const arcPoints = arcCurve.getPoints(50);
    const arcGeometry = new THREE.BufferGeometry().setFromPoints(arcPoints);
    const arcMaterial = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const arcLine = new THREE.Line(arcGeometry, arcMaterial);

    group.add(arcLine);

    // Paquete de datos que viaja por el arco de telemetría
    const packetGeo = new THREE.SphereGeometry(0.038, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({
      color: 0x9df5ff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const packetMesh = new THREE.Mesh(packetGeo, packetMat);

    group.add(packetMesh);

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

      // Animación de ondas sísmicas del epicentro
      shockwaveMeshes.forEach((item) => {
        const progress = (elapsed * item.speed + item.offset) % 1;
        const scale = 1 + progress * 8.5;

        item.mesh.scale.set(scale, scale, scale);
        const mat = item.mesh.material as THREE.MeshBasicMaterial;

        mat.opacity = Math.max(0, (1 - progress) * 0.75);
      });

      // Pulso de la baliza del epicentro
      beaconMat.opacity = 0.5 + Math.sin(elapsed * 4) * 0.45;

      // Movimiento del paquete de datos por el arco de telemetría
      const packetProgress = (elapsed * 0.35) % 1;
      const packetPosition = arcCurve.getPoint(packetProgress);

      packetMesh.position.copy(packetPosition);

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
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Points ||
          object instanceof THREE.Line
        ) {
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
