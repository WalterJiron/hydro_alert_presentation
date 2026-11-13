"use client";

import * as React from "react";
import Image from "next/image";
import { animate } from "animejs";
import clsx from "clsx";

import { PhoneFrame } from "@/components/ui/phone-frame";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  BellIcon,
  CheckIcon,
  CloudRainIcon,
  DownloadIcon,
  EarthquakeIcon,
  MapPinIcon,
  ShieldIcon,
  SosIcon,
  UsersIcon,
} from "@/components/icons";
import { siteConfig } from "@/config/site";

const screens = [
  {
    id: "inicio",
    label: "Inicio",
    kicker: "01 · Dashboard",
    title: "Todo lo crítico en una sola pantalla.",
    description:
      "Sismos recientes, clima local, radar en vivo y reportes cercanos. Sin menús escondidos ni pasos extra: abres la app y ya sabes qué está pasando.",
    bullets: [
      "Sismos con magnitud, epicentro, profundidad y hora exacta",
      "Condiciones climáticas y radar de lluvias en vivo",
      "Reportes comunitarios activos en tu zona",
    ],
    icon: EarthquakeIcon,
    image: "/images/app/inicio.png",
    imageAlt: "Pantalla de inicio de HydroAlert con sismos y clima",
    glow: "cyan" as const,
  },
  {
    id: "mapa",
    label: "Mapa",
    kicker: "02 · Mapa interactivo",
    title: "El territorio, con contexto.",
    description:
      "Un mapa a pantalla completa con los 100 sismos de INETER, pines por severidad y reportes comunitarios georreferenciados. Filtros rápidos y capas para leer el territorio sin ruido.",
    bullets: [
      "Sismos y reportes georreferenciados en un solo mapa",
      "Pines con color según la severidad del evento",
      "Filtros y controles de capas siempre a mano",
    ],
    icon: MapPinIcon,
    image: "/images/app/mapa.png",
    imageAlt: "Pantalla del mapa interactivo de HydroAlert",
    glow: "cyan" as const,
  },
  {
    id: "reportes",
    label: "Reportes",
    kicker: "03 · Red ciudadana",
    title: "La comunidad también reporta.",
    description:
      "Reportes comunitarios con foto y ubicación, un aviso claro de información no verificada y un acceso directo para sumar evidencia desde el terreno.",
    bullets: [
      "Aviso visible: información no verificada",
      "Fotografía, ubicación y nivel de afectación",
      "Confirmaciones de la comunidad en cada reporte",
    ],
    icon: UsersIcon,
    image: "/images/app/reportes.png",
    imageAlt: "Pantalla de reportes comunitarios de HydroAlert",
    glow: "orange" as const,
  },
  {
    id: "alertas",
    label: "Alertas",
    kicker: "04 · Monitoreo",
    title: "Alertas reales, no protocolos.",
    description:
      "Sismos y clima en una sola vista, con magnitud, profundidad, hora y fuentes oficiales. Sin listas interminables ni pasos escondidos.",
    bullets: [
      "Dos fuentes: INETER y USGS, con aviso de SINAPRED",
      "Pestañas separadas de Sismos y Clima",
      "Recordatorio de que no reemplaza canales oficiales",
    ],
    icon: ShieldIcon,
    image: "/images/app/alertas.png",
    imageAlt: "Pantalla de alertas sísmicas y climáticas de HydroAlert",
    glow: "cyan" as const,
  },
  {
    id: "sos",
    label: "SOS",
    kicker: "05 · Auxilio",
    title: "Auxilio a un toque, visible a distancia.",
    description:
      "Pantalla de emergencia con contactos directos y ubicación compartida. Un toque activa el modo emergencia oscuro, pensado para rescate en la oscuridad o bajo lluvia intensa.",
    bullets: [
      "Contactos directos: 911, Cruz Roja y Bomberos",
      "Modo emergencia a pantalla completa",
      "Ubicación en vivo y botón «Estoy a salvo»",
    ],
    icon: SosIcon,
    image: "/images/app/sos.png",
    imageAlt: "Pantalla de emergencia SOS de HydroAlert",
    glow: "orange" as const,
  },
];

export function Showcase() {
  const [activeId, setActiveId] = React.useState(screens[0].id);
  const [emergency, setEmergency] = React.useState(false);
  const activeScreen =
    screens.find((screen) => screen.id === activeId) ?? screens[0];
  const panelRef = React.useRef<HTMLDivElement>(null);
  const phoneRef = React.useRef<HTMLDivElement>(null);
  const isEmergency = activeScreen.id === "sos" && emergency;
  const phoneLabel = isEmergency
    ? "Modo emergencia · HydroAlert"
    : `${activeScreen.label} · HydroAlert`;
  const screenImage = isEmergency
    ? "/images/app/emergencia.png"
    : activeScreen.image;
  const screenAlt = isEmergency
    ? "Modo emergencia de HydroAlert a pantalla completa"
    : activeScreen.imageAlt;

  const selectScreen = (id: string) => {
    setActiveId(id);
    setEmergency(false);
  };

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (panelRef.current) {
      animate(panelRef.current, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 560,
        ease: "outExpo",
      });
    }

    if (phoneRef.current) {
      animate(phoneRef.current, {
        opacity: [0.35, 1],
        scale: [0.97, 1],
        duration: 620,
        ease: "outExpo",
      });
    }
  }, [activeId]);

  return (
    <section
      className="relative overflow-hidden border-y border-white/6 bg-[#040d17] py-24 sm:py-28"
      id="app"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_35%,rgba(34,211,238,0.1),transparent_60%),radial-gradient(50%_50%_at_10%_80%,rgba(255,106,19,0.06),transparent_65%)]"
      />
      <div
        aria-hidden="true"
        className="hydro-grid absolute inset-0 opacity-25"
      />

      <div className="container-hydro relative">
        <SectionHeading
          description="Una app móvil completa, pensada para leerse en segundos. Explora las pantallas que forman el ciclo de prevención, monitoreo y respuesta."
          eyebrow="La app"
          title={
            <>
              Así se siente{" "}
              <span className="text-gradient-cyan">tener el control.</span>
            </>
          }
        />

        <div
          aria-label="Pantallas de HydroAlert"
          className="mt-8 flex flex-wrap gap-2 pb-1"
          role="tablist"
        >
          {screens.map((screen, index) => (
            <button
              key={screen.id}
              aria-controls={`panel-${screen.id}`}
              aria-selected={activeId === screen.id}
              className={clsx(
                "group flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-[12px] font-medium transition-all",
                activeId === screen.id
                  ? "border-cyan-300/35 bg-cyan-400/12 text-cyan-200"
                  : "border-white/8 bg-white/3 text-white/45 hover:border-white/15 hover:text-white/75",
              )}
              id={`tab-${screen.id}`}
              role="tab"
              type="button"
              onClick={() => selectScreen(screen.id)}
            >
              <span className="font-mono text-[9px] opacity-50">
                0{index + 1}
              </span>
              {screen.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div ref={phoneRef} className="relative flex justify-center">
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/8"
            />
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/10"
            />

            <div className="animate-hydro-float">
              <PhoneFrame
                glow={isEmergency ? "orange" : activeScreen.glow}
                label={phoneLabel}
                showStatusBar={false}
                theme={isEmergency ? "dark" : "light"}
              >
                <div className="relative flex-1">
                  <Image
                    fill
                    alt={screenAlt}
                    className="object-cover"
                    priority={activeScreen.id === "inicio"}
                    sizes="(min-width: 640px) 286px, 268px"
                    src={screenImage}
                  />
                </div>
              </PhoneFrame>
            </div>

            <div className="absolute -left-2 top-16 hidden rounded-xl border border-cyan-400/20 bg-[#071522]/90 p-2.5 shadow-xl backdrop-blur lg:block">
              <div className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
                <span className="h-1 w-1 rounded-full bg-emerald-300 animate-hydro-blink" />
                Datos en vivo
              </div>
              <p className="mt-1 text-[7px] text-white/35">
                WebSocket conectado
              </p>
            </div>

            <div className="absolute -right-3 bottom-24 hidden rounded-xl border border-orange-400/20 bg-[#100c08]/90 p-2.5 shadow-xl backdrop-blur lg:block">
              <div className="flex items-center gap-1.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-orange-300">
                <BellIcon size={9} />
                Alerta sísmica
              </div>
              <p className="mt-1 text-[7px] text-white/35">Magnitud ≥ 5.0</p>
            </div>
          </div>

          <div
            ref={panelRef}
            aria-labelledby={`tab-${activeScreen.id}`}
            id={`panel-${activeScreen.id}`}
            role="tabpanel"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/20 bg-cyan-400/10 text-cyan-300">
                <activeScreen.icon size={20} />
              </span>
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-300/60">
                  {activeScreen.kicker}
                </p>
                <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/30">
                  HydroAlert mobile
                </p>
              </div>
            </div>

            <h3 className="mt-6 max-w-lg text-balance text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
              {activeScreen.title}
            </h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/50">
              {activeScreen.description}
            </p>

            <ul className="mt-6 flex flex-col gap-3">
              {activeScreen.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border border-cyan-300/20 bg-cyan-400/8 text-cyan-300">
                    <CheckIcon size={10} strokeWidth={2.4} />
                  </span>
                  <span className="text-[13px] leading-relaxed text-white/60">
                    {bullet}
                  </span>
                </li>
              ))}
            </ul>

            {activeScreen.id === "sos" ? (
              <div
                aria-label="Estado de la pantalla SOS"
                className="mt-6 inline-flex rounded-full border border-white/10 bg-white/4 p-1"
                role="group"
              >
                <button
                  aria-pressed={!emergency}
                  className={clsx(
                    "rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-colors",
                    emergency
                      ? "text-white/45 hover:text-white/75"
                      : "bg-cyan-400/15 text-cyan-200",
                  )}
                  type="button"
                  onClick={() => setEmergency(false)}
                >
                  Pantalla SOS
                </button>
                <button
                  aria-pressed={emergency}
                  className={clsx(
                    "rounded-full px-3.5 py-1.5 text-[11px] font-medium transition-colors",
                    emergency
                      ? "bg-orange-500/20 text-orange-200"
                      : "text-white/45 hover:text-white/75",
                  )}
                  type="button"
                  onClick={() => setEmergency(true)}
                >
                  Modo emergencia
                </button>
              </div>
            ) : null}

            <div className="mt-7 flex flex-wrap items-center gap-2">
              {[
                { icon: CloudRainIcon, label: "Radar satelital" },
                { icon: MapPinIcon, label: "GPS" },
                { icon: ShieldIcon, label: "Cero fricción" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-white/4 px-2.5 py-1 text-[10px] text-white/45"
                >
                  <item.icon className="text-cyan-400/70" size={11} />
                  {item.label}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-white/8 pt-6">
              <a
                className="inline-flex h-11 items-center gap-2 rounded-full bg-cyan-400 px-5 text-[13px] font-semibold text-[#02141b] transition-colors hover:bg-cyan-300"
                download={siteConfig.apk.filename}
                href={siteConfig.apk.href}
              >
                <DownloadIcon size={15} />
                Probar en Android
              </a>
              <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-white/30">
                {siteConfig.apk.format} · {siteConfig.apk.size}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
