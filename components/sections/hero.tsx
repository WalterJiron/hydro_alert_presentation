"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { animate, stagger } from "animejs";

import { AnimatedCounter } from "@/components/ui/animated-counter";
import { HoloCard } from "@/components/ui/holo-card";
import { Magnetic } from "@/components/ui/magnetic";
import {
  ArrowRightIcon,
  CloudRainIcon,
  DownloadIcon,
  EarthquakeIcon,
  MapPinIcon,
  ShieldIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site";

export const HydroScene = dynamic(() => import("@/components/ui/hydro-scene"), {
  ssr: false,
});

export const heroStats = [
  { decimals: 0, label: "Monitoreo continuo", suffix: "/7", value: 24 },
  {
    decimals: 1,
    label: "Umbral de alerta sísmica",
    prefix: "≥ ",
    value: 5.0,
  },
  { decimals: 0, label: "Registros para consultar", value: 0 },
];

/**
 * Barras sismográficas animadas con Anime.js que simulan telemetría en tiempo real.
 */
function SeismicEqualizer() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;

    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const bars = container.querySelectorAll("span");

    const anim = animate(bars, {
      delay: stagger(70),
      direction: "alternate",
      duration: 380,
      ease: "inOutQuad",
      loop: true,
      scaleY: [
        { duration: 240, to: 1.4 },
        { duration: 320, to: 0.35 },
        { duration: 280, to: 1.1 },
        { duration: 300, to: 0.5 },
      ],
    });

    return () => {
      anim.pause();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="flex h-3.5 items-end gap-0.5 py-0.5"
    >
      <span className="h-3 w-1 origin-bottom rounded-full bg-orange-400/80" />
      <span className="h-2 w-1 origin-bottom rounded-full bg-orange-400/90" />
      <span className="h-3.5 w-1 origin-bottom rounded-full bg-orange-300" />
      <span className="h-1.5 w-1 origin-bottom rounded-full bg-orange-400/70" />
      <span className="h-2.5 w-1 origin-bottom rounded-full bg-orange-400/85" />
    </div>
  );
}

export function Hero() {
  const rootRef = React.useRef<HTMLElement>(null);
  const chipLeftRef = React.useRef<HTMLDivElement>(null);
  const chipRightRef = React.useRef<HTMLDivElement>(null);
  const chipBottomRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const root = rootRef.current;

    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = root.querySelectorAll("[data-hero]");

    animate(items, {
      delay: stagger(90, { start: 120 }),
      duration: 950,
      ease: "outExpo",
      opacity: [0, 1],
      translateY: [26, 0],
    });

    // Animación de levitación orbital independiente para los 3 chips de telemetría con Anime.js
    const animLeft = chipLeftRef.current
      ? animate(chipLeftRef.current, {
        direction: "alternate",
        duration: 3400,
        ease: "inOutSine",
        loop: true,
        translateY: [-7, 7],
      })
      : null;

    const animRight = chipRightRef.current
      ? animate(chipRightRef.current, {
        delay: 400,
        direction: "alternate",
        duration: 4200,
        ease: "inOutSine",
        loop: true,
        translateY: [6, -6],
      })
      : null;

    const animBottom = chipBottomRef.current
      ? animate(chipBottomRef.current, {
        delay: 800,
        direction: "alternate",
        duration: 3800,
        ease: "inOutSine",
        loop: true,
        translateY: [-5, 5],
      })
      : null;

    return () => {
      animLeft?.pause();
      animRight?.pause();
      animBottom?.pause();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 lg:min-h-svh lg:pb-28 lg:pt-40"
      id="top"
    >
      {/* Fondo */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_18%_8%,rgba(34,211,238,0.16),transparent_60%),radial-gradient(60%_50%_at_85%_20%,rgba(30,144,255,0.14),transparent_65%),radial-gradient(50%_45%_at_62%_92%,rgba(255,106,19,0.08),transparent_70%)]" />
        <div className="hydro-grid absolute inset-0 opacity-70" />
        <div className="hydro-noise absolute inset-0" />
        <div className="absolute left-1/2 top-1/2 h-144 w-xl -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/8 sm:h-184 sm:w-184" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10 sm:h-128 sm:w-lg" />
      </div>

      <div className="absolute inset-0 z-[-5] hidden lg:block">
        <HydroScene className="opacity-70" />
      </div>

      <div className="container-hydro relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div className="max-w-2xl">
          <div
            data-hero
            className="flex flex-wrap items-center gap-3 opacity-100"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-400/8 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-300" />
              </span>
              Hecho para Nicaragua
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/30">
              Prevención · Monitoreo · Respuesta
            </span>
          </div>

          <h1
            data-hero
            className="mt-7 text-balance text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.03em] text-white sm:text-6xl lg:text-[4.4rem]"
          >
            Información que <span className="text-gradient-hydro">protege</span>{" "}
            en tiempo real.
          </h1>

          <p
            data-hero
            className="mt-6 max-w-xl text-sm leading-relaxed text-white/60 sm:text-base"
          >
            HydroAlert unifica el monitoreo sísmico de INETER y USGS, el radar
            de lluvias en vivo y los reportes de tu comunidad en una sola app.
            Sin registro, sin fricción y con datos que sí puedes usar.
          </p>

          <div
            data-hero
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Magnetic>
              <a
                className="group inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-cyan-400 px-6 text-sm font-semibold text-[#02141b] shadow-[0_0_40px_-10px_rgba(34,211,238,0.8)] transition-all hover:bg-cyan-300 hover:shadow-[0_0_46px_-8px_rgba(34,211,238,0.9)]"
                download={siteConfig.apk.filename}
                href={siteConfig.apk.href}
              >
                <DownloadIcon
                  className="transition-transform group-hover:translate-y-0.5"
                  size={17}
                />
                Descargar APK
                <span className="rounded-full bg-[#02141b]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em]">
                  {siteConfig.apk.size}
                </span>
              </a>
            </Magnetic>
            <Magnetic>
              <a
                className="group inline-flex h-13 items-center justify-center gap-2 rounded-full border border-white/12 bg-white/4 px-6 text-sm font-semibold text-white/80 backdrop-blur transition-colors hover:border-cyan-300/30 hover:bg-white/6 hover:text-white"
                href="#funciones"
              >
                Explorar funciones
                <ArrowRightIcon
                  className="text-cyan-300 transition-transform group-hover:translate-x-1"
                  size={16}
                />
              </a>
            </Magnetic>
          </div>

          <div data-hero className="mt-8 flex flex-col gap-4">
            <div className="flex flex-wrap gap-x-5 gap-y-2 text-[11px] text-white/45">
              <span className="inline-flex items-center gap-1.5">
                <ShieldIcon className="text-cyan-400/70" size={13} />
                Acceso libre como invitado
              </span>
              <span className="inline-flex items-center gap-1.5">
                <EarthquakeIcon className="text-cyan-400/70" size={13} />
                INETER + USGS
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CloudRainIcon className="text-cyan-400/70" size={13} />
                Radar en vivo
              </span>
            </div>

            <div className="grid max-w-lg grid-cols-3 gap-3 border-t border-white/8 pt-5">
              {heroStats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    <AnimatedCounter
                      decimals={stat.decimals}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      value={stat.value}
                    />
                  </p>
                  <p className="mt-1 text-[10px] leading-snug text-white/35">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tarjeta holográfica + telemetría flotante (sin solapamiento) */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-104 w-104 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/15"
            >
              <span className="absolute inset-6 rounded-full border border-cyan-400/10" />
              <span className="absolute inset-12 rounded-full border border-cyan-400/10" />
            </div>

            <HoloCard
              activateOnHover={false}
              className="mx-auto"
              gradient="radial-gradient(120% 80% at 12% 0%, #0e5a78 0%, transparent 52%), radial-gradient(80% 70% at 92% 100%, #4a1c05 0%, transparent 55%), linear-gradient(155deg, #071b2c 0%, #030b14 58%, #08212e 100%)"
              hoverScale={1.04}
              maxTilt={10}
              patternSize="18px 18px"
              shineOpacity={0.9}
              style={
                {
                  "--holo-card-width": "clamp(260px, 23vw, 330px)",
                  "--holo-card-height": "clamp(400px, 34vw, 470px)",
                } as React.CSSProperties
              }
            >
              <HoloCard.Rotator>
                <HoloCard.Frame>
                  <HoloCard.Surface>
                    <HoloCard.Pattern />
                    <HoloCard.Inset />
                    <HoloCard.Content className="flex-col justify-between p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-cyan-200/80">
                            HydroAlert
                          </p>
                          <p className="mt-1 text-[7px] uppercase tracking-[0.2em] text-white/35">
                            Early warning network
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-300/25 bg-emerald-400/10 px-2 py-0.5 text-[7px] font-bold uppercase tracking-[0.12em] text-emerald-300">
                          <span className="h-1 w-1 rounded-full bg-emerald-300 animate-hydro-blink" />
                          Live
                        </span>
                      </div>

                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-full bg-cyan-400/25 blur-2xl" />
                          <Image
                            alt="Símbolo de HydroAlert"
                            className="relative h-24 w-24 object-contain sm:h-28 sm:w-28"
                            height={112}
                            src="/images/logo_mark.png"
                            width={112}
                          />
                        </div>
                        <div className="text-center">
                          <p className="text-[9px] font-semibold uppercase tracking-[0.3em] text-cyan-300/80">
                            Alerta temprana
                          </p>
                          <p className="mt-1 text-[11px] font-medium text-white/75">
                            Información que protege
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="mb-3 h-px w-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-[7px] uppercase tracking-[0.18em] text-white/30">
                              Acceso
                            </p>
                            <p className="mt-1 text-[9px] font-semibold text-white/85">
                              Invitado · Libre
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[7px] uppercase tracking-[0.18em] text-white/30">
                              Cobertura
                            </p>
                            <p className="mt-1 text-[9px] font-semibold text-white/85">
                              Nicaragua
                            </p>
                          </div>
                        </div>
                        <div
                          aria-hidden="true"
                          className="mt-3 h-4 w-full rounded-sm opacity-40 bg-[repeating-linear-gradient(90deg,rgba(255,255,255,0.85)_0_1px,transparent_1px_4px,rgba(255,255,255,0.5)_4px_5px,transparent_5px_9px)]"
                        />
                        <p className="mt-1.5 text-center font-mono text-[6px] uppercase tracking-[0.28em] text-white/25">
                          HA · 2026 · NIC · 001
                        </p>
                      </div>
                    </HoloCard.Content>
                    <HoloCard.Shine />
                  </HoloCard.Surface>
                </HoloCard.Frame>
              </HoloCard.Rotator>
            </HoloCard>

            {/* Chips de telemetría flotantes (posicionados fuera de la tarjeta para no taparla) */}
            <div
              ref={chipLeftRef}
              className="absolute -left-12 top-8 hidden w-44 rounded-xl border border-orange-400/25 bg-[#0d0d0f]/92 p-2.5 shadow-2xl backdrop-blur-md min-[1360px]:block lg:-left-24 xl:-left-28"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="grid h-5 w-5 place-items-center rounded bg-orange-500/15 text-orange-300">
                    <EarthquakeIcon size={11} />
                  </span>
                  <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-orange-300">
                    Sismo M 5.2
                  </p>
                </div>
                <SeismicEqualizer />
              </div>
              <p className="mt-1.5 text-[9px] font-medium text-white/80">
                Chinandega · Prof. 12 km
              </p>
              <div className="mt-1 flex items-center justify-between text-[7px] text-white/40">
                <span>Hace 4 min</span>
                <span className="font-mono text-orange-400/75">
                  INETER · USGS
                </span>
              </div>
            </div>

            <div
              ref={chipRightRef}
              className="absolute -right-4 top-1/3 hidden w-36 rounded-xl border border-cyan-400/20 bg-[#071522]/90 p-2.5 shadow-2xl backdrop-blur-md min-[1360px]:block lg:-right-10 xl:-right-14"
            >
              <div className="flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded bg-cyan-400/15 text-cyan-300">
                  <CloudRainIcon size={11} />
                </span>
                <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-cyan-300">
                  Radar
                </p>
              </div>
              <div className="relative mt-2 h-9 overflow-hidden rounded-md bg-cyan-400/5">
                <div className="absolute left-1/2 top-1/2 h-9 w-9 -translate-x-1/2 -translate-y-1/2 animate-hydro-radar rounded-full bg-[conic-gradient(from_0deg,rgba(34,211,238,0.4),transparent_60%)]" />
                <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/30" />
                <div className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300" />
              </div>
              <p className="mt-1.5 text-[7px] text-white/40">Lluvia · 12 km</p>
            </div>

            <div
              ref={chipBottomRef}
              className="absolute -bottom-6 left-2 hidden w-44 rounded-xl border border-emerald-400/20 bg-[#07150f]/90 p-2.5 shadow-2xl backdrop-blur-md min-[1360px]:block lg:-left-12"
            >
              <div className="flex items-center gap-1.5">
                <span className="grid h-5 w-5 place-items-center rounded bg-emerald-400/15 text-emerald-300">
                  <MapPinIcon size={11} />
                </span>
                <p className="text-[8px] font-bold uppercase tracking-[0.14em] text-emerald-300">
                  Reporte verificado
                </p>
              </div>
              <p className="mt-1.5 text-[9px] font-medium text-white/80">
                Barrio San Judas
              </p>
              <p className="text-[7px] text-white/40">
                Inundación · evidencia GPS
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-hydro mt-16 hidden items-center justify-between border-t border-white/6 pt-5 lg:flex">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/25">
          Desliza para explorar
        </p>
        <div className="flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
          <span>Datos abiertos</span>
          <span className="h-1 w-1 rounded-full bg-cyan-400/50" />
          <span>Android · Flutter</span>
          <span className="h-1 w-1 rounded-full bg-cyan-400/50" />
          <span>Nicaragua</span>
        </div>
      </div>
    </section>
  );
}
