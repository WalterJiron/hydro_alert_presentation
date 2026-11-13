"use client";

import * as React from "react";
import { animate } from "animejs";

import { cn } from "@/lib/cn";

interface SeismographTraceProps {
  className?: string;
  magnitude?: string;
  source?: string;
}

export function SeismographTrace({
  className,
  magnitude = "M 5.2",
  source = "INETER · Estación Chinandega",
}: SeismographTraceProps) {
  const pathRef = React.useRef<SVGPathElement>(null);
  const scanLineRef = React.useRef<SVGGElement>(null);

  React.useEffect(() => {
    const path = pathRef.current;
    const scan = scanLineRef.current;

    if (!path || !scan) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    // Trazado continuo de la señal sísmica
    const traceAnim = animate(path, {
      strokeDashoffset: [length, 0],
      duration: 3200,
      ease: "linear",
      loop: true,
    });

    // Barrido horizontal del láser sismográfico
    const scanAnim = animate(scan, {
      translateX: [0, 240],
      duration: 3200,
      ease: "linear",
      loop: true,
    });

    return () => {
      traceAnim.pause();
      scanAnim.pause();
    };
  }, []);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl border border-cyan-400/20 bg-[#040e18]/85 p-3 backdrop-blur-md",
        className,
      )}
    >
      <div className="flex items-center justify-between text-[8px] font-mono uppercase tracking-[0.18em]">
        <span className="flex items-center gap-1.5 text-cyan-300">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
          </span>
          {source}
        </span>
        <span className="font-bold text-orange-400">{magnitude}</span>
      </div>

      <div className="relative mt-2 h-14 w-full">
        <svg
          className="h-full w-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 240 50"
        >
          {/* Cuadrícula de referencia */}
          <line
            stroke="rgba(34,211,238,0.12)"
            strokeDasharray="2 4"
            x1="0"
            x2="240"
            y1="25"
            y2="25"
          />
          <line
            stroke="rgba(34,211,238,0.06)"
            x1="0"
            x2="240"
            y1="10"
            y2="10"
          />
          <line
            stroke="rgba(34,211,238,0.06)"
            x1="0"
            x2="240"
            y1="40"
            y2="40"
          />

          {/* Sombra de la onda */}
          <path
            d="M0,25 L35,25 L45,23 L55,27 L65,25 L75,22 L82,31 L88,14 L94,38 L100,5 L106,44 L114,12 L122,34 L130,20 L140,28 L155,24 L175,26 L195,25 L240,25"
            fill="none"
            opacity="0.3"
            stroke="#ff6a13"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
          />

          {/* Trazo activo */}
          <path
            ref={pathRef}
            d="M0,25 L35,25 L45,23 L55,27 L65,25 L75,22 L82,31 L88,14 L94,38 L100,5 L106,44 L114,12 L122,34 L130,20 L140,28 L155,24 L175,26 L195,25 L240,25"
            fill="none"
            stroke="#22d3ee"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />

          {/* Línea de escaneo láser */}
          <g ref={scanLineRef}>
            <line
              stroke="#67e8f9"
              strokeWidth="1.2"
              x1="0"
              x2="0"
              y1="4"
              y2="46"
            />
            <circle
              cx="0"
              cy="25"
              fill="#22d3ee"
              filter="drop-shadow(0 0 6px rgba(34,211,238,0.9))"
              r="2"
            />
          </g>
        </svg>
      </div>

      <div className="mt-1 flex items-center justify-between text-[7px] font-mono text-white/35">
        <span>Ondas P (Primarias)</span>
        <span className="text-orange-300/80">Ondas S (Corte)</span>
        <span>Velocidad: 6.8 km/s</span>
      </div>
    </div>
  );
}
